// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to your backend server!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mount user routes
const userRoutes = require('./routes/user.route.js');
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
