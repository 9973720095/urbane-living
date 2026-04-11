require('dotenv').config({ path: '../.env' }); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI; 

if (!mongoURI) {
    console.error("Error: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log("Atlas Connected: InteriorLeadsDB setup complete!"))
    .catch(err => console.error("Database Connection Error:", err.message));

// Schema Definition - Sare fields add kiye hain jo frontend bhej raha hai
const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    state: String,
    propertyType: String,
    date: { type: Date, default: Date.now }
});

const Lead = mongoose.model('Lead', leadSchema);

// GET route for testing in browser
app.get('/api/save-lead', (req, res) => {
    res.send("Backend is working and ready to receive POST requests!");
});

// API Route to save leads
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server successfully running on port ${PORT}`));