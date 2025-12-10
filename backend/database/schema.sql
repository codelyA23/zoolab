-- Zoolab Database Schema

-- 1. Species: Catalog of animal species being studied
CREATE TABLE IF NOT EXISTS species (
    id INT AUTO_INCREMENT PRIMARY KEY,
    common_name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100) NOT NULL UNIQUE,
    conservation_status ENUM('Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Habitats: Research environments or enclosures
CREATE TABLE IF NOT EXISTS habitats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL, -- e.g., 'Rainforest', 'Savanna', 'Aquatic'
    capacity INT NOT NULL,
    temperature_celsius DECIMAL(5, 2),
    humidity_percent DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Animals: Individual animals under management
CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species_id INT NOT NULL,
    habitat_id INT,
    gender ENUM('Male', 'Female', 'Unknown') NOT NULL,
    date_of_birth DATE,
    microchip_id VARCHAR(50) UNIQUE,
    admission_date DATE DEFAULT (CURRENT_DATE),
    FOREIGN KEY (species_id) REFERENCES species(id) ON DELETE RESTRICT,
    FOREIGN KEY (habitat_id) REFERENCES habitats(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Research Logs: Daily observations and health checks
CREATE TABLE IF NOT EXISTS research_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    animal_id INT NOT NULL,
    researcher_name VARCHAR(100) NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activity_type ENUM('Observation', 'Health Check', 'Feeding', 'Behavioral Study') NOT NULL,
    notes TEXT,
    FOREIGN KEY (animal_id) REFERENCES animals(id) ON DELETE CASCADE
);

-- 5. Users: Staff authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store plain text for prototype, hash for production
    role ENUM('admin', 'researcher', 'staff') DEFAULT 'staff',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEED DATA (Optional - for testing)
-- SEED DATA
-- 1. Species
INSERT IGNORE INTO species (common_name, scientific_name, conservation_status) VALUES 
('African Elephant', 'Loxodonta africana', 'Endangered'),
('Bengal Tiger', 'Panthera tigris tigris', 'Endangered'),
('Emperor Penguin', 'Aptenodytes forsteri', 'Near Threatened'),
('Koala', 'Phascolarctos cinereus', 'Vulnerable'),
('Western Gorilla', 'Gorilla gorilla', 'Critically Endangered'),
('Red Panda', 'Ailurus fulgens', 'Endangered');

-- 2. Habitats
INSERT IGNORE INTO habitats (name, type, capacity, temperature_celsius, humidity_percent) VALUES
('Savanna Zone A', 'Savanna', 5, 28.5, 40.0),
('Rainforest Hall', 'Rainforest', 10, 26.0, 85.0),
('Polar Exhibit', 'Aquatic', 15, -2.0, 60.0),
('Bamboo Forest', 'Temperate', 8, 18.0, 50.0);

-- 3. Users
INSERT IGNORE INTO users (name, email, password, role) VALUES
('System Admin', 'admin@zoolab.io', 'admin123', 'admin'),
('Jane Doe', 'jane@zoolab.io', 'pass123', 'researcher'),
('John Smith', 'john@zoolab.io', 'pass123', 'researcher');

-- 4. Animals (Linking to Headers)
-- Ensure IDs align with auto-increment, assuming fresh DB
INSERT IGNORE INTO animals (name, species_id, habitat_id, gender, date_of_birth, microchip_id) VALUES
('Dumbo', 1, 1, 'Male', '2015-05-15', 'MICRO-001'),
('Nala', 2, 2, 'Female', '2018-08-20', 'MICRO-002'),
('Pingu', 3, 3, 'Male', '2020-01-10', 'MICRO-003'),
('Buster', 4, 4, 'Male', '2019-11-05', 'MICRO-004'),
('Koko', 5, 2, 'Female', '2010-06-30', 'MICRO-005'),
('Simba', 2, 2, 'Male', '2017-04-12', 'MICRO-006'),
('Mei', 6, 4, 'Female', '2021-03-22', 'MICRO-007'),
('Ellie', 1, 1, 'Female', '2012-09-14', 'MICRO-008');

-- 5. Research Logs
INSERT IGNORE INTO research_logs (animal_id, researcher_name, activity_type, notes) VALUES
(1, 'John Smith', 'Health Check', 'Weight stable, tusks healthy.'),
(2, 'Jane Doe', 'Observation', 'Active behavior during morning feed.'),
(3, 'John Smith', 'Feeding', 'Consumed 2kg of fish supplement.'),
(5, 'Jane Doe', 'Behavioral Study', 'Showing intelligence in puzzle solving task.');
