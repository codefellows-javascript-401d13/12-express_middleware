'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug= require('debug')('food:food-router');
const Food = require('../model/food.js');
const foodRouter = new Router();

foodRouter.post('/api/food', jsonParser, function(req, res, next) {
  debug('POST: /api/food');

  Food.createFood(req.body)
  .then( food => res.json(food))
  .catch(err => next(err));
});

foodRouter.get('/api/food/:id', jsonParser, function(req, res, next) {
  debug('GET: /api/food/:id');

  Food.fetchFood(req.params.id)
  .then( food => res.json(food))
  .catch( err => next(err));
});

foodRouter.get('/api/food/', function(req, res, next) {
  debug('GET: /api/food');

  Food.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

foodRouter.put('/api/food', jsonParser, function(req, res, next) {
  debug('PUT: /api/food');

  Food.updateFood(req.query.id, req.body)
  .then( food => res.json(food))
  .catch(next);
});

module.exports = foodRouter;
