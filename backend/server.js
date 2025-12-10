const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = require('./config/db');

const apiRoutes = require('./routes/apiRoutes');

app.use('/api', apiRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Zoolab API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
