const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkUser() {
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', ['admin@zoolab.io']);
        console.log('User found:', rows.length > 0);
        if (rows.length > 0) {
            console.log('User details:', rows[0]);
        } else {
            console.log('User admin@zoolab.io NOT found');
        }
    } catch (error) {
        console.error('Query failed:', error);
    } finally {
        await pool.end();
    }
}

checkUser();
