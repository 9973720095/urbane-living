// Step 1: Configuration for Path & Environment
const path = require('path');
// Path fix: Ye root folder se .env file ko pick karega
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

const app = express();

// Automatic Environment Detection
const currentEnv = process.env.NODE_ENV || 'development';

/* =========================
   MIDDLEWARES
========================= */
app.use(cors({
    origin: ["https://urbaneliving.in", "http://urbaneliving.in", "http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
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
    .then(() => console.log(`✅ MongoDB Connected | Mode: ${currentEnv}`))
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
    date: { type: Date, default: Date.now }
}, { collection: 'leads' });
const Lead = mongoose.model('Lead', leadSchema);

const designSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String, 
    style: String,    
    image: String,
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

app.get('/', (req, res) => {
    res.send(`🚀 Urbane Living Backend is active [${currentEnv}]`);
});

/* ---------- LEAD APIs ---------- */
app.post('/api/save-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
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

// Added Update Route for Leads
app.put('/api/leads/:id', async (req, res) => {
    try {
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, message: "✅ Lead updated", data: updatedLead });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Added Delete Route for Leads
app.delete('/api/leads/:id', async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "🗑️ Lead deleted" });
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