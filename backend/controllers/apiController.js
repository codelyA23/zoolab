const pool = require('../config/db');

exports.testConnection = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({ status: 'success', message: 'Connected to AWS RDS Aurora' });
  } catch (error) {
    console.error('DB Connection Error:', error);
    res.status(500).json({ status: 'error', message: 'Database connection failed', error: error.message });
  }
};

exports.getTables = async (req, res) => {
  try {
    const [rows] = await pool.query('SHOW TABLES');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Failed to fetch tables', error: error.message });
  }
};
