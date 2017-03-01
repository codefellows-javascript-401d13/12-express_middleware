'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('rwby:router');
const Rwby = require('../model/rwby.js');
const rwbyRouter = new Router();

rwbyRouter.post('/api/rwby', jsonParser, function(req, res, next){
  debug('post api/rwby');

  Rwby.createRwby(req.body)
  .then( rwby => res.json(rwby))
  .catch( err => next(err));
});

rwbyRouter.get('/api/rwby/:id', function(req, res, next){
  debug('get api/rwby/:id');

  Rwby.fetchRwby(req.params.id)
  .then( rwby => res.json(rwby))
  .catch( err => next(err));
});

rwbyRouter.put('/api/rwby/:id', function(req, res, next){
  debug('put api/rwby/:id');

  Rwby.updateRwby(req.params.id, req.body)
  .then( rwby => res.json(rwby))
  .catch(next);
});

rwbyRouter.get('/api/rwby', jsonParser, function(req, res, next){
  debug('get api/rwby');

  Rwby.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

module.exports = rwbyRouter;
