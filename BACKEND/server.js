require('dotenv').config({ path: '../.env' }); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

/* =========================
   MIDDLEWARES
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   MONGODB CONNECTION (Environment Based)
========================= */
// NODE_ENV check karega ki production hai ya development
const isProduction = process.env.NODE_ENV === 'production';
const mongoURI = isProduction ? process.env.PROD_MONGO_URI : process.env.LOCAL_MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI missing for current environment!");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log(`✅ MongoDB Connected to: ${isProduction ? 'UrbaneLiving (PROD)' : 'InteriorLeadsDB (LOCAL)'}`))
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

app.get('/', (req, res) => {
    res.send(`🚀 Backend is running in ${process.env.NODE_ENV} mode...`);
});

/* ---------- LEAD APIs ---------- */

// POST (save lead) - Optimized & Single Route
app.post('/api/save-lead', async (req, res) => {
    console.log("📥 Received Lead Data:", req.body);
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        console.log("✅ Lead Saved:", savedLead._id);
        res.status(200).json({ message: "✅ Lead saved successfully" });
    } catch (err) {
        console.error("❌ Lead Save Error:", err);
        res.status(500).json({ error: "Save failed" });
    }
});

app.get('/api/save-lead', (req, res) => {
    res.send("✅ Lead API Ready");
});

/* ---------- DESIGN APIs ---------- */

app.get('/api/designs', async (req, res) => {
    try {
        const { category, style } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (style) filter.style = style;
        const designs = await Design.find(filter).sort({ createdAt: -1 });
        res.json(designs);
    } catch (err) {
        console.error("❌ Fetch Error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/designs/add', async (req, res) => {
    console.log("📥 Adding New Design:", req.body.title);
    try {
        const newDesign = new Design(req.body);
        await newDesign.save();
        res.status(200).json({ message: "✅ Design added successfully", data: newDesign });
    } catch (err) {
        console.error("❌ Add Error:", err);
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

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
});