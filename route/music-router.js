'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('music:music-router');
const Music = require('../model/music.js');
const musicRouter = new Router();

musicRouter.post('/api/music', jsonParser, function(req, res, next) {
  debug('POST: /api/music');

  Music.createMusic(req.body)
  .then( music => res.json(music))
  .catch( err=> next(err));
});

musicRouter.get('/api/music/:id', function( req, res, next) {
  debug('GET: /api/music/:id');

  Music.fetchMusic(req.params.id)
    .then( music => res.json(music))
    .catch(err => next(err));
});

musicRouter.get('api/music', function( req, res, next) {
  debug('GET: /api/music');

  Music.fetchIDs()
    .then( ids => res.json(ids))
    .catch(next);
});


musicRouter.put('/api/music', jsonParser, function(req, res, next) {
  debug('PUT: /api/music');

  Music.updateMusic(req.query.id, req.body)
    .then( music => res.json(music))
    .catch(next);
});

module.exports = musicRouter;