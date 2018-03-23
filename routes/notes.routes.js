const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', notesController.create);
router.get('/', notesController.showAll);
router.get('/stars', notesController.showOutstanding);
router.get('/:id', notesController.showOne);
router.put('/:id', notesController.giveStar);

module.exports = router;
