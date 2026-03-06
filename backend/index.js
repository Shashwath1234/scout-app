const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// 1. Allow your Frontend (React) to talk to this Backend
app.use(cors());
app.use(express.json());

// 2. Connect to your PostgreSQL Database
// This checks if we are on Render (DATABASE_URL exists) or Local
const isProduction = process.env.DATABASE_URL;

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: 'shash_linux',
        host: 'localhost',
        database: 'hiring_db',
        password: 'your_password_here', // Keep your local password
        port: 5432,
      }
);

// Also, update the port to be dynamic for Render
const port = process.env.PORT || 5000;

// 3. The "Scout" Endpoint: Get players by country
app.get('/api/players', async (req, res) => {
  try {
    const { country } = req.query; // Get the country from the URL (e.g., ?country=Japan)
    const result = await pool.query(
      'SELECT * FROM players WHERE country = $1', 
      [country]
    );
    res.json(result.rows); // Send the list of players to the frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});