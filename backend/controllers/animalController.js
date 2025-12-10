const pool = require('../config/db');

// Get all animals with their species and habitat/enclosure info
exports.getAnimals = async (req, res) => {
  try {
    const query = `
      SELECT a.*, s.common_name as species_name, s.conservation_status, h.name as habitat_name 
      FROM animals a
      LEFT JOIN species s ON a.species_id = s.id
      LEFT JOIN habitats h ON a.habitat_id = h.id
      ORDER BY a.created_at DESC
    `;
    const [rows] = await pool.query(query);
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Error fetching animals:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch animals' });
  }
};

// Get all species list (for dropdowns etc)
exports.getSpecies = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM species ORDER BY common_name');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Error fetching species:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch species' });
  }
};

// Get all habitats
exports.getHabitats = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM habitats ORDER BY name');
    res.json({ status: 'success', data: rows });
  } catch (error) {
    console.error('Error fetching habitats:', error);
    res.status(500).json({ status: 'error', message: 'Failed to fetch habitats' });
  }
};

// Add a new animal
exports.addAnimal = async (req, res) => {
  let { name, species_id, habitat_id, gender, date_of_birth, microchip_id } = req.body;
  
  if (!name || !species_id) {
    return res.status(400).json({ status: 'error', message: 'Name and Species are required' });
  }

  // Sanitize inputs: Convert empty strings to NULL for DB compatibility
  if (!habitat_id) habitat_id = null;
  if (!date_of_birth) date_of_birth = null;
  if (!microchip_id) microchip_id = null;

  try {
    const query = `
      INSERT INTO animals (name, species_id, habitat_id, gender, date_of_birth, microchip_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [name, species_id, habitat_id, gender, date_of_birth, microchip_id]);
    
    res.status(201).json({ 
      status: 'success', 
      message: 'Animal added successfully',
      data: { id: result.insertId, ...req.body }
    });
  } catch (error) {
    console.error('Error adding animal:', error);
    res.status(500).json({ status: 'error', message: 'Failed to add animal' });
  }
};

// Update an animal
exports.updateAnimal = async (req, res) => {
  const { id } = req.params;
  let { name, species_id, habitat_id, gender, date_of_birth, microchip_id } = req.body;

  // Sanitize: Convert empty strings to NULL for DB compatibility
  if (!habitat_id) habitat_id = null;
  if (!date_of_birth) date_of_birth = null;
  if (!microchip_id) microchip_id = null;

  try {
    const animalQuery = `
      UPDATE animals 
      SET name = ?, species_id = ?, habitat_id = ?, gender = ?, date_of_birth = ?, microchip_id = ?
      WHERE id = ?
    `;
    await pool.query(animalQuery, [name, species_id, habitat_id, gender, date_of_birth, microchip_id, id]);

    // 2. Ideally, conservation status belongs to Species, but if we are tracking individual status override 
    // or if the simplified schema put it on animals, we'd update it here.
    // Based on the 'getAnimals' query earlier, conservation_status comes from 'species' table.
    // So we can't update it per animal unless we change the species record (which affects all) 
    // OR if the schema allows override. For now, we'll assume we are just updating animal details.

    res.json({ status: 'success', message: 'Animal updated successfully' });
  } catch (error) {
    console.error('Error updating animal:', error);
    res.status(500).json({ status: 'error', message: 'Failed to update animal' });
  }
};

// Delete an animal
exports.deleteAnimal = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM animals WHERE id = ?', [id]);
    res.json({ status: 'success', message: 'Animal deleted successfully' });
  } catch (error) {
    console.error('Error deleting animal:', error);
    res.status(500).json({ status: 'error', message: 'Failed to delete animal' });
  }
};
