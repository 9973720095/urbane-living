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

app.get('/', (req, res) => {
    res.send(`🚀 Urbane Living Backend is active [${process.env.NODE_ENV}]`);
});

/* ---------- LEAD APIs ---------- */

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

/* ---------- DESIGN APIs (Updated Filtering Logic) ---------- */

app.get('/api/designs', async (req, res) => {
    try {
        const { category, style, platform } = req.query;
        let filter = {};

        // Saban, ye logic ensure karega ki agar 'platform=app' nahi bheja gaya, 
        // toh 'AppGallery' wali photos hamesha filter out rahegi.
        if (platform !== 'app') {
            filter.category = { $ne: 'AppGallery' };
        }

        // Agar specific category requested hai
        if (category) {
            // Security Check: Agar website manually AppGallery maang rahi hai
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
    console.log(`🚀 Professional Server running on port ${PORT}`);
});