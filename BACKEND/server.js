// Step 1: Configuration for Path & Environment
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes Import
const blogRoutes = require('./routes/blogRoutes'); 
const bedroomRoutes = require('./routes/bedroomRoutes'); 
const livingRoutes = require('./routes/livingRoutes');
const wardrobeRoutes = require('./routes/wardrobeRoutes');
const kitchenRoutes = require('./routes/kitchenRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Google Sheet sync
const Blog = require('./models/Blog');
const Review = require('./models/Review');
const { startSheetSync, syncAll, getLastSyncResult } = require('./sheetSync');
const { sendLeadsToSheet, syncAllLeadsToSheet } = require('./leadsToSheet');

const app = express();

// Automatic Environment Detection
const currentEnv = process.env.NODE_ENV || 'development';

/* =========================
   MIDDLEWARES
========================= */
app.use(cors({
  origin: [
    "https://urbaneliving.in",
    "https://www.urbaneliving.in",
    "https://ncr.urbaneliving.in",
    "http://ncr.urbaneliving.in",
    "https://urbane-living.vercel.app",
    /^https:\/\/urbane-living[a-z0-9-]*\.vercel\.app$/,
    /^http:\/\/localhost:\d+$/ // any local port (3000, 5001, ...) for development
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


/* =========================
   MONGODB CONNECTION 
========================= */
// Laptop par LOCAL_MONGO_URI use karega, Hostinger par PROD_MONGO_URI
const mongoURI = process.env.MONGO_URI || (currentEnv === 'production' ? process.env.PROD_MONGO_URI : process.env.LOCAL_MONGO_URI);

if (!mongoURI) {
    console.error(`❌ MONGO_URI missing for ${currentEnv} mode!`);
    process.exit(1);
}

mongoose.connect(mongoURI, { dbName: 'UrbaneLiving' })
    .then(() => {
        console.log(`✅ MongoDB Connected | Mode: ${currentEnv}`);
        startSheetSync({ designs: Design, blogs: Blog, reviews: Review }); // Google Sheet -> website (every SHEET_SYNC_MINUTES)
    })
    .catch(err => console.error("❌ DB Error:", err.message));

/* =========================
   SCHEMAS & MODELS
========================= */
const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    state: String,
    propertyType: String,
    message: String,
    date: { type: Date, default: Date.now }
}, { collection: 'leads' });
const Lead = mongoose.model('Lead', leadSchema);

const designSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String, 
    style: String,    
    image: String,
    sheetKey: { type: String, index: true }, // Google Sheet "ID" column (empty for admin-added designs)
    source: String,                          // 'sheet' when it came from Google Sheet
    createdAt: { type: Date, default: Date.now }
}, { collection: 'designs' });
const Design = mongoose.model("Design", designSchema);

/* =========================
   ROUTES
========================= */
app.use('/api/blogs', blogRoutes);
app.use('/api/bedroom', bedroomRoutes);
app.use('/api/living', livingRoutes);
app.use('/api/wardrobe', wardrobeRoutes);
app.use('/api/kitchen', kitchenRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/', (req, res) => {
    res.send(`🚀 Urbane Living Backend is active [${currentEnv}]`);
});

/* ---------- LEAD APIs ---------- */
app.post('/api/save-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        sendLeadsToSheet([savedLead]).catch(err => console.error('Lead -> Sheet failed:', err.message)); // copy to Google Sheet, never blocks the form
        res.status(200).json({ success: true, message: "✅ Lead saved", id: savedLead._id });
    } catch (err) {
        res.status(500).json({ success: false, error: "Database save failed" });
    }
});

app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ date: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.put('/api/leads/:id', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedLead) sendLeadsToSheet([updatedLead]).catch(err => console.error('Lead -> Sheet failed:', err.message));
        res.json({ success: true, message: "✅ Lead updated", data: updatedLead });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.delete('/api/leads/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "🗑️ Lead deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Copy ALL leads to Google Sheet (first time, or to re-sync). Header x-sync-key = SHEET_SYNC_KEY when it is set
app.post('/api/leads/sync-sheet', async (req, res) => {
    try {
        if (process.env.SHEET_SYNC_KEY && req.get('x-sync-key') !== process.env.SHEET_SYNC_KEY) {
            return res.status(401).json({ error: 'Invalid sync key' });
        }
        const result = await syncAllLeadsToSheet(Lead);
        res.json({ message: '✅ Leads copied to sheet', result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------- DESIGN APIs ---------- */
app.get('/api/designs', async (req, res) => {
    try {
        const { category, style, platform } = req.query;
        let filter = {};
        if (platform !== 'app') { filter.category = { $ne: 'AppGallery' }; }
        if (category) {
            if (platform !== 'app' && category === 'AppGallery') { return res.json([]); }
            filter.category = category;
        }
        if (style) filter.style = style;
        const designs = await Design.find(filter).sort({ createdAt: -1 });
        res.json(designs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------- GOOGLE SHEET SYNC APIs ---------- */
// "Sync Now" (instant sync instead of waiting SHEET_SYNC_MINUTES)
app.post('/api/sheet-sync', async (req, res) => {
    try {
        if (process.env.SHEET_SYNC_KEY && req.get('x-sync-key') !== process.env.SHEET_SYNC_KEY) {
            return res.status(401).json({ error: 'Invalid sync key' });
        }
        const results = await syncAll({ designs: Design, blogs: Blog, reviews: Review });
        res.json({ message: '✅ Sheet synced', results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Last sync result per tab (time, new / updated / removed, row errors)
app.get('/api/sheet-sync/status', (req, res) => {
    res.json({ last: getLastSyncResult() });
});

app.post('/api/designs/add', async (req, res) => {
    try {
        const newDesign = new Design(req.body);
        await newDesign.save();
        res.status(200).json({ message: "✅ Design added successfully", data: newDesign });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/designs/:id', async (req, res) => {
    try {
        const updatedDesign = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: "✅ Design updated", data: updatedDesign });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/designs/:id', async (req, res) => {
    try {
        await Design.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Design deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------- DASHBOARD STATS API ---------- */
app.get('/api/admin/stats', async (req, res) => {
    try {
        const designCount = await Design.countDocuments();
        const leadCount = await Lead.countDocuments();
        res.json({
            totalDesigns: designCount,
            totalLeads: leadCount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${currentEnv} mode`);
});