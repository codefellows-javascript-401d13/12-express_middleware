'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bike:bike-route');
const Bike = require('../model/bike.js');

const bikeRouter = new Router();

bikeRouter.post('/api/bike', jsonParser, function(req, res, next){
  debug('bikeRouter POST route', req.body);

  Bike.createBike(req.body)
  .then( bike => res.json(bike))
  .catch( err => next(err));
});

bikeRouter.get('/api/bike/:bikeId', function(req, res, next){
  debug('bikeRouter GET route');

  Bike.fetchBike(req.params.bikeId)
  .then( bike => res.json(bike))
  .catch( err => next(err));
});

bikeRouter.delete('/api/bike/:bikeId', function( req, res, next){
  debug( 'bikeRouter DELETE route');

  Bike.deleteBike(req.params.bikeId)
  .then( () => res.sendStatus(204))
  .catch( err => next(err));
});

bikeRouter.get('/api/bike(/)?', function(req, res, next){
  debug( 'bikeRouter GET all route');

  Bike.fetchAllBikes()
  .then( bikes => res.json(bikes))
  .catch( err => next(err));
});

bikeRouter.put('/api/bike/:bikeId', jsonParser, function(req, res, next){
  debug ('bikeRouter PUT route');

  Bike.updateBike(req.params.bikeId, req.body)
  .then( bike => res.json(bike))
  .catch( err => next(err));
});

module.exports = bikeRouter;
