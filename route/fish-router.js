'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('fish:fish-router');
const Fish = require('../model/fish.js');
const fishRouter = new Router();
debug('inside fish router');

fishRouter.post('/api/fish', jsonParser, function(req, res, next) {
  debug('POST: /api/fish');

  Fish.createFish(req.body)
  .then( fish => res.json(fish))
  .catch( err => next(err));
});

fishRouter.get('/api/fish/:id', jsonParser, function(req, res, next) {
  debug('GET: /api/fish/:id');

  Fish.fetchFish(req.params.id)
  .then( fish => res.json(fish))
  .catch( err => next(err));
});

fishRouter.get('/api/fish', function(req, res, next) {
  debug('GET: api/fish');

  Fish.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

fishRouter.put('/api/fish/:id', jsonParser, function(req, res, next) {
  debug('PUT: /api/fish');

  Fish.updateFish(req.query.id, req.body)
  .then( fish => res.json(fish))
  .catch(next);
})

module.exports = fishRouter;
