'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('family:routes');
const Family = require('../model/family.js');
const familyRouter = new Router();

familyRouter.post('/api/family', jsonParser, function(req, res, next) {
  debug('POST: /api/family');

  Family.createFamily(req.body)
  .then( family => res.json(family))
  .catch( err => next(err));
});

familyRouter.get('/api/family/:id', function(req, res, next) {
  debug('GET: /api/family/:id');

  Family.fetchFamily(req.params.id)
  .then( family => res.json(family))
  .catch( err => next(err));
});

familyRouter.get('/api/family', function(req, res, next) {
  debug('GET: api/family');

  Family.fetchIDs()
  .then( ids => res.json(ids))
  .catch (err => next(err));
});

familyRouter.put('/api/family/:id', function(req, res, next) {
  debug('PUT: api/family');

  Family.updateFamily(req.query.id, req.body)
  .then( family => res.json(family))
  .catch(next);
});

module.exports = familyRouter;
