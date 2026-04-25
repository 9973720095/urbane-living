require('dotenv').config({ path: '../.env' }); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Yahan Blog Routes ko import kiya
const blogRoutes = require('./routes/blogRoutes'); 

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECTION
========================= */
const isProduction = process.env.NODE_ENV === 'production';
let mongoURI = isProduction ? process.env.PROD_MONGO_URI : process.env.LOCAL_MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI missing!");
    process.exit(1);
}

// Force database to 'UrbaneLiving'
if (!mongoURI.includes('UrbaneLiving')) {
    mongoURI = mongoURI.replace(/\/?(\?.*)?$/, '/UrbaneLiving$1');
}

mongoose.connect(mongoURI)
    .then(() => console.log(`✅ MongoDB Connected to: UrbaneLiving (Env: ${process.env.NODE_ENV})`))
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
});
const Lead = mongoose.model('Lead', leadSchema);

const designSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String, 
    style: String,    
    image: String,
    createdAt: { type: Date, default: Date.now }
});
const Design = mongoose.model("Design", designSchema);

/* =========================
   ROUTES
========================= */

// Yahan Blog API ko register kiya
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send(`🚀 Urbane Living Backend is active [${process.env.NODE_ENV}]`);
});

/* ---------- LEAD APIs ---------- */

// Save Lead
app.post('/api/save-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.status(200).json({ success: true, message: "✅ Lead saved", id: savedLead._id });
    } catch (err) {
        console.error("❌ Lead Save Error:", err);
        res.status(500).json({ success: false, error: "Database save failed" });
    }
});

// Get All Leads
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await Lead.find().sort({ date: -1 });
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/* ---------- DESIGN APIs ---------- */

app.get('/api/designs', async (req, res) => {
    try {
        const { category, style, platform } = req.query;
        let filter = {};

        if (platform !== 'app') {
            filter.category = { $ne: 'AppGallery' };
        }

        if (category) {
            if (platform !== 'app' && category === 'AppGallery') {
                return res.json([]); 
            }
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

// Update Design
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
    console.log(`🚀 Professional Server running on port ${PORT}`);
});