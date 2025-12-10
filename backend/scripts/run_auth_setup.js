const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });
const pool = require('../config/db');

async function setupAuth() {
  try {
    console.log('🔒 Setting up authentication tables...');
    const sqlPath = path.join(__dirname, '../database/setup_auth.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon to run multiple statements if needed, though query() usually handles one
    // mysql2 query() might handle multiple statements if configured, but safest to split
    const statements = sql.split(';').filter(s => s.trim());

    for (const stmt of statements) {
        await pool.query(stmt);
    }
    
    console.log('✅ Users table created and admin seeded.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Auth setup failed:', error);
    process.exit(1);
  }
}

setupAuth();
