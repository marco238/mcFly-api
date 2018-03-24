const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', secureMiddleware.isAuthenticated, notesController.create);
router.get('/', secureMiddleware.isAuthenticated, notesController.showAll);
router.get('/stars', secureMiddleware.isAuthenticated, notesController.showOutstanding);
router.get('/:id', secureMiddleware.isAuthenticated, notesController.showOne);
router.put('/:id', secureMiddleware.isAuthenticated, notesController.giveStar);
router.delete('/:id', secureMiddleware.isAuthenticated, notesController.destroy);

module.exports = router;
