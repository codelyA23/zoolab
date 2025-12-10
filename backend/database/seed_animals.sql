-- Seed an animal if none exist
INSERT IGNORE INTO animals (name, species_id, habitat_id, gender, date_of_birth, microchip_id)
SELECT 'Dumbo', id, 1, 'Male', '2010-01-01', 'mc-123456'
FROM species 
WHERE common_name = 'African Elephant'
LIMIT 1;
