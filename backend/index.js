const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();

// Use the Render-assigned port or default to 5000 for local dev
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Smart Connection: Checks if we are on Render (Cloud) or Local (WSL)
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
        password: 'your_password_here', // Use your local WSL DB password
        port: 5432,
      }
);

app.get('/api/players', async (req, res) => {
  try {
    const { country } = req.query;
    // Selecting * now includes all the new fields we just added
    const result = await pool.query(
      'SELECT * FROM players WHERE country = $1', 
      [country]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});