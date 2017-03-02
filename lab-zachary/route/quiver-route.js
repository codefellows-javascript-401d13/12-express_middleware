'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('bike:quiver-route');
const Quiver = require('../model/quiver.js');
const createError = require('http-errors');

const quiverRouter = module.exports = new Router();

quiverRouter.get('/api/quiver/:quiverID', function(req, res, next) {
  debug('GET /api/quiver/:quiverID route');
  Quiver.findById(req.params.quiverID)
  .then( quiver => res.json(quiver))
  .catch(err => {
    if(err.kind === 'ObjectId' && err.name === 'CastError') return next(createError(404, 'ID not found'));
    next(err);
  });

});

quiverRouter.post('/api/quiver/', jsonParser, (req, res, next) => {
  debug('POST /api/quiver', req.body.title);
  if(!req.body.title) return next(createError(400, 'title required'));
  req.body.timestamp = new Date();
  new Quiver(req.body).save()
  .then( quiver => res.json(quiver))
  .catch(next);
});

quiverRouter.put('/api/quiver/:quiverID', jsonParser, (req, res, next) => {
  debug('PUT /api/quiver/:quiverID');
  if(!req.body.title) return next(createError(400, 'title required'));
  Quiver.findByIdAndUpdate(req.params.quiverID, req.body, {new:true})
  .then( quiver => res.json(quiver))
  .catch(err => {
    if(err.kind === 'ObjectId' && err.name === 'CastError') return next(createError(404, 'ID not found'));
    next(err);
  });
});

quiverRouter.delete('/api/quiver/:quiverID', (req, res, next) => {
  debug('DELETE /api/quiver/:quiverID');
  Quiver.findByIdAndRemove(req.params.quiverID)
  .then( quiver => {
    if(!quiver) return next(createError(404, 'ID not found'));
    res.sendStatus(204);
  })
  .catch(err => {
    if(err.kind === 'ObjectId' && err.name === 'CastError') return next(createError(404, 'ID not found'));
  });
});

