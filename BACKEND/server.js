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
   MONGODB CONNECTION (Professional Way)
========================= */
const isProduction = process.env.NODE_ENV === 'production';
let mongoURI = isProduction ? process.env.PROD_MONGO_URI : process.env.LOCAL_MONGO_URI;

if (!mongoURI) {
    console.error("❌ MONGO_URI missing!");
    process.exit(1);
}

// Saban, ye line ensure karegi ki data hamesha 'UrbaneLiving' mein jaye
// Hum connection string ke end mein database name force kar rahe hain
if (!mongoURI.includes('UrbaneLiving')) {
    // Agar URI ke end mein / hai toh hata kar UrbaneLiving add karein
    mongoURI = mongoURI.replace(/\/?(\?.*)?$/, '/UrbaneLiving$1');
}

mongoose.connect(mongoURI)
    .then(() => console.log(`✅ MongoDB Connected to: UrbaneLiving (Environment: ${process.env.NODE_ENV})`))
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
    res.send(`🚀 Urbane Living Backend is active [${process.env.NODE_ENV}]`);
});

/* ---------- LEAD APIs ---------- */

app.post('/api/save-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.status(200).json({ success: true, message: "✅ Lead saved to UrbaneLiving", id: savedLead._id });
    } catch (err) {
        console.error("❌ Lead Save Error:", err);
        res.status(500).json({ success: false, error: "Database save failed" });
    }
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
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/designs/add', async (req, res) => {
    try {
        const newDesign = new Design(req.body);
        await newDesign.save();
        res.status(200).json({ message: "✅ Design added to UrbaneLiving", data: newDesign });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/designs/:id', async (req, res) => {
    try {
        await Design.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Design deleted from UrbaneLiving" });
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