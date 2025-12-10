const fs = require('fs');
const path = require('path');
// Load .env from backend root explicitly before requiring db config
const envPath = path.join(__dirname, '../.env');
console.log('Loading .env from:', envPath);
require('dotenv').config({ path: envPath });

console.log('DB Config Check:');
console.log('HOST:', process.env.DB_HOST);
console.log('USER:', process.env.DB_USER);
// console.log('PASS:', process.env.DB_PASSWORD); // Don't log password

const pool = require('../config/db');

async function initDb() {
  try {
    console.log('🔌 Connecting to the database...');
    const connection = await pool.getConnection();
    
    console.log('📄 Reading schema file...');
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Split queries by semicolon to execute them one by one
    // Note: This is a simple splitter and might fail on complex stored procs, 
    // but works for standard CREATE TABLE statements.
    const queries = schemaSql
      .split(';')
      .map(q => q.trim())
      .filter(q => q.length > 0);

    console.log(`🚀 Executing ${queries.length} queries...`);

    for (const query of queries) {
      await connection.query(query);
    }

    console.log('✅ Database initialized successfully!');
    connection.release();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

initDb();
