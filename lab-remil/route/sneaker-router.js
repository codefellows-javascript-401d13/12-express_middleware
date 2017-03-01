'use strict';

const Router = require('express').Router;
const debug = require('debug')('sneaker:sneaker-router');
const jsonParser = require('body-parser').json();

const Sneaker = require('../model/sneaker.js');

const sneakerRouter = new Router();

sneakerRouter.get('/api/sneaker/:id', function(req, res, next) {
  debug('GET: /api/sneaker/:id');

  Sneaker.fetchSneaker(req.params.id)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

sneakerRouter.post('/api/sneaker', jsonParser, function(req, res, next) {
  debug('POST: /api/sneaker');

  Sneaker.createSneaker(req.body)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

sneakerRouter.put('/api/sneaker/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/sneaker');

  Sneaker.updateSneaker(req.params.id, req.body)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

module.exports = sneakerRouter;
