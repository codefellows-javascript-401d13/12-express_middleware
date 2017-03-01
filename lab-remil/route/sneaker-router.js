'use strict';

const Router = require('express').Router;
const debug = require('debug')('sneaker:sneaker-router');
const createError = require('http-errors');
const jsonParser = require('body-parser').json();

const Sneaker = require('../model/sneaker.js');

const sneakerRouter = new Router();

sneakerRouter.post('/api/sneaker', jsonParser, function(req, res, next) {
  debug('POST: /api/sneaker');

  Sneaker.createSneaker(req.body)
  .then( sneaker => res.json(sneaker))
  .catch( err => next(err));
});

module.exports = sneakerRouter;
