const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: envPath });
const pool = require('../config/db');

async function seedDb() {
  try {
    console.log('🌱 Seeding animals...');
    const seedPath = path.join(__dirname, '../database/seed_animals.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    const result = await pool.query(seedSql);
    console.log('✅ Seed executed:', result);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDb();
