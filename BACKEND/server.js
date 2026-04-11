require('dotenv').config({ path: '../.env' }); // Root folder ki .env file load karne ke liye
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection (Using Environment Variable for Security)
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in .env file. Check your Root folder.");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log("Atlas Connected: InteriorLeadsDB setup complete!"))
    .catch(err => console.error("Database Connection Error:", err.message));

// Schema Definition
const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// API Route to save leads from Frontend
app.post('/api/save-lead', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        await newLead.save();
        res.status(200).json({ message: "Data saved successfully!" });
    } catch (err) {
        console.error("Save Error:", err);
        res.status(500).json({ error: "Save failed" });
    }
});

// Port setting from .env or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server successfully running on port ${PORT}`));