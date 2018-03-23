const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', notesController.create);
router.get('/', notesController.showAll);
router.get('/:id', notesController.showOne);

module.exports = router;
