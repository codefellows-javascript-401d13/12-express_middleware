'use strict';

const Router = require('express').router;
const jsonParser = require('body-parser').json();
const debug = require('debug');
const Guitar = require('../model/guitar.js');

const guitarRouter = new Router();

guitarRouter.post('/api/guitar', jsonParser, function(req, res, next) {
  debug('POST: api/guitar');

  Guitar.createGuitar(req.body)
  .then( guitar => res.json(guitar))
  .catch( err => next(err));
});

guitarRouter.get('/api/guitar', function(req, res, next) {
  debug('GET /api/guitar');

  Guitar.fetchIds()
  .then( ids => res.json(ids))
  .catch( err => next(err));
});

guitarRouter.get('/api/guitar/:id', function(req, res, next) {
  debug('GET: /api/guitar/:id');

  Guitar.fetchGuitar(req.params.id)
  .then( guitar => res.json(guitar))
  .catch( err => next(err));
});

guitarRouter.put('/api/guitar/:id', function(req, res, next) {
  debug('PUT: api/guitar/:id');

  Guitar.updateGuitar(req.params.id, req.body)
  .then( guitar => res.json(guitar))
  .catch( err => next(err));
});

guitarRouter.delete('/api/guitar/:id', function(req, res, next) {
  debug('DELETE: api/guitar/:id');

  Guitar.deleteGuitar(req.params.id)
  .then(res.status(204).send('no content'))
  .catch( err => next(err));
});

module.exports = guitarRouter;
