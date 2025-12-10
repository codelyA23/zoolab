const pool = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required' });
  }

  try {
    // In a real app, use bcrypt.compare(password, user.password)
    // For this prototype, we are using simple string comparison as seeded
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const user = users[0];

    // Simple password check (Replace with bcrypt for production)
    if (user.password !== password) {
       return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    // Login successful
    // Return user info sans password
    const { password: _, ...userSafe } = user;
    
    res.json({
        status: 'success',
        message: 'Login successful',
        data: {
            user: userSafe,
            token: 'mock-jwt-token-12345' // Ideally issue a real JWT here
        }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};
