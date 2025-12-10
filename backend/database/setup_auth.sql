CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Storing generic hash/string for now
    role ENUM('Admin', 'Researcher', 'Staff') DEFAULT 'Staff',
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Default Admin
-- Password is 'admin123' (In a real app, this would be bcrypt hashed)
INSERT IGNORE INTO users (email, password, role, name) 
VALUES ('admin@zoolab.io', 'admin123', 'Admin', 'Chief Administrator');
