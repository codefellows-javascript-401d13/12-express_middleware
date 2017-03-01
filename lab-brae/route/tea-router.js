'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('tea:tea-router');
const Tea = require('../model/tea.js');
const teaRouter = new Router();

teaRouter.post('/api/tea', jsonParser, function(req, res, next) {
    debug('POST: /api/tea');

    Tea.createTea(req.body)
    .then( tea => res.json(tea))
    .catch( err => next(err));
});

teaRouter.get('/api/tea/:id', function(req, res, next) {
    debug('GET: /api/tea/:id');

    Tea.fetchTea(req.params.id)
    .then( tea => res.json(tea))
    .catch( err => next(err));
});

teaRouter.get('/api/tea', function(req, res, next) {
    debug('GET: /api/tea')

    Tea.fetchIDs()
    .then( ids => res.json(ids))
    .catch(next);
});

teaRouter.put('/api/tea', jsonParser, function(req, res, next) {
    debug('PUT: /api/tea');

    Tea.updateTea(req.query.id, req.body)
    .then( tea => res.json(tea))
    .catch(next);
});

module.exports = teaRouter;