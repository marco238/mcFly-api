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
  .then(notes =>  res.status(200).json(notes))
  .catch(error => next(new ApiError(error.message, 503)));
};

module.exports.showOne = (req, res, next) => {
  const noteId = req.params.id;

  Note.findById(noteId)
    .then(note => res.status(200).json(note))
    .catch(error => next(new ApiError(error.message, 404)));
};

module.exports.giveStar = (req, res, next) => {
  const id = req.params.id;

  Note.findByIdAndUpdate(id, { $set: {outstanding: true} }, { new: true })
   .then(note => {
     if (note) {
       res.status(200).json(note);
     } else {
       next(new ApiError(`Note not found`, 404));
     }
   }).catch(error => next(error));
 };

 module.exports.showOutstanding = (req, res, next) => {
   Note.find( {outstanding: true} )
   .then(notes =>  res.status(200).json(notes))
   .catch(error => next(new ApiError(error.message, 503)));
 };

 module.exports.destroy = (req, res, next) => {
   const noteId = req.params.id;

   Note.findByIdAndRemove(noteId)
   .then(note => res.status(204).json())
   .catch(error => next(new ApiError(error.message, 404)));
};
