const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const animalController = require('../controllers/animalController');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get('/test-db', apiController.testConnection);
router.get('/tables', apiController.getTables);

// Animal Routes
router.get('/animals', animalController.getAnimals);
router.post('/animals', animalController.addAnimal);
router.put('/animals/:id', animalController.updateAnimal);
router.delete('/animals/:id', animalController.deleteAnimal);
router.get('/species', animalController.getSpecies);
router.get('/habitats', animalController.getHabitats);

module.exports = router;
