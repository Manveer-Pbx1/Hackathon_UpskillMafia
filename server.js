// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB');

// Create user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    age: Number,
    city: String,
    sports: [String]
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve HTML file for sports page
app.get('/:sport', (req, res) => {
    const sport = req.params.sport.toLowerCase();
    res.sendFile(__dirname + '/sport.html');
});

// API endpoint to fetch users for a specific sport
app.get('/api/:sport', async (req, res) => {
    const sport = req.params.sport.toLowerCase();
    try {
        const players = await User.find({ sports: sport });
        res.json(players);
    } catch (error) {
        console.error(`Error fetching ${sport} players:`, error);
        res.status(500).send(`Error fetching ${sport} players`);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
