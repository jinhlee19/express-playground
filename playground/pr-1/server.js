const express = require('express');
const connectDB = require('./config/db');
const app = express();

// Connect DB
connectDB();

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`));
