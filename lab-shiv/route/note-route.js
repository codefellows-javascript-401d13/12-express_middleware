'use strict';

const Router = require('express').Router;
const jsonParser = require('bodyParser').json();
const debug = require('debug')('note:note-router');
const Note = require('../model/note.js');
const noteRouter = new Router();

noteRouter.post('/api/note', jsonParser, function(res, req, next) {
  debug ('POST: /api/note');

  Note.createNote(req.body)
  .then( note => res.json(note))
  .catch(next);
});

noteRouter.get('/api/note/:id', function(res, req, next) {
  debug('GET: /api/note/:id');

  Note.fetchNote(req.params.id)
  .then( note => res.json(note))
  .catch(next);
});

noteRouter.get('/api/note', function(res, req, next) {
  debug('GET: /api/note');

  Note.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

noteRouter.put('/api/note', jsonParser, function(res, req, next) {
  debug('PUT: /api/note');

  Note.updateNote(req.query.id, req.body)
  .then( note => res.json(note))
  .catch(next);
});

module.exports = noteRouter;
