'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('leader:leader-router');
const Leader = require('../model/leader.js');
const leaderRouter = new Router();

leaderRouter.post('/api/leader', jsonParser, function(req, res, next) {
  debug('POST: /api/leader');

  Leader.createLeader(req.body)
  .then( leader => res.json(leader))
  .catch( err => next(err));
});

leaderRouter.get('/api/leader/:id', function(req, res, next) {
  debug('GET: /api/leader/:id');

  Leader.fetchLeader(req.params.id)
  .then( leader => res.json(leader))
  .catch( err => next(err));
});

leaderRouter.get('/api/leader', function(req, res, next) {
  debug('GET: /api/leader');

  Leader.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

leaderRouter.put('/api/leader', jsonParser, function(req, res, next) {
  debug('PUT: /api/leader');

  Leader.updateLeader(req.query.id, req.body)
  .then( leader => res.json(leader))
  .catch(next);
});

module.exports = leaderRouter;
