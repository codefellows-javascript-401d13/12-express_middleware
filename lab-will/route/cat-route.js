'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('cat:cat-router');
const Cat = require('../model/cat.js');
const catRouter = new Router();

catRouter.post('/api/cat', jsonParser, function(req, res, next) {
  debug('POST: /api/cat');

  Cat.createCat(req.body)
  .then( cat => res.json(cat))
  .catch( err => next(err));
});

catRouter.get('/api/cat/:id', function(req, res, next) {
  debug('GET: api/cat/:id');

  Cat.fetchCat(req.params.id)
  .then( cat => res.json(cat))
  .catch( err => next(err));
});

catRouter.get('/api/cat', function(req, res, next) {
  debug('GET: api/cat');

  Cat.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

catRouter.put('/api/cat', jsonParser, function(req, res, next) {
  debug('PUT: /api/cat');

  Cat.updateCat(req.query.id, req.body)
  .then( cat =. res.json(cat))
  .catch(next);
});

module.exports = catRouter;
