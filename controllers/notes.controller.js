const mongoose = require('mongoose');
const Note = require('../models/note.model');
const ApiError = require('../models/api-error.model');

module.exports.create = (req, res, next) => {
  const {title, content}  = req.body;
  const data = {
    title: title ? title : 'No título',
    content: content ? content : 'No content'
  };
  const newNote = new Note(data);
  newNote.save()
  .then(note => res.status(201).json(note))
  .catch(error => next(new ApiError(error.message, 503)));
};

module.exports.showAll = (req, res, next) => {
  Note.find()
  .then(notes =>  res.json(notes))
  .catch(error => next(new ApiError(error.message, 503)));
};
