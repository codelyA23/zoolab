require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('--- Database Connection Test ---');
  console.log('Host:', process.env.DB_HOST);
  console.log('User:', process.env.DB_USER);
  console.log('Database:', process.env.DB_NAME);
  const password = process.env.DB_PASSWORD || '';
  console.log('Password Length:', password.length);
  console.log('Password (first 2 chars):', password.substring(0, 2) + '***');

  try {
    console.log('\nAttempting to connect...');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('✅ SUCCESS: Connected to database!');
    await connection.end();
  } catch (error) {
    console.error('\n❌ FAILED: Connection error');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n--> DIAGNOSIS: Authentication Failed.');
      console.error('    Please verify DB_PASSWORD in backend/.env matches exactly what you use in Workbench.');
    }
  }
}

testConnection();
