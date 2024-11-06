const express = require('express');
const router = express.Router();

// Importamos los controladores de la carpeta controllers
const filmsController = require('../controllers/films.controller');

// http://http://localhost:3000/
router.get('/', filmsController.renderHome);

// http://http://localhost:3000/film/
router.get('/film/:title', filmsController.getfilms);
 // Importa la funcion getfilms del archivo controller '../controllers/films.controller'

// http://http://localhost:3000/film
router.post('/film', filmsController.postfilms);
// Importa la funcion getfilms del archivo controller '../controllers/films.controller'

module.exports = router;


