'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('journal:journal-router');
const Journal = require('../model/journal.js');
const journalRouter = new Router();

journalRouter.post('/api/journal', jsonParser, function(req, res, next){
  debug('POST: /api/journal');

  Journal.createJournal(req.body)
  .then( journal => res.json(journal))
  .catch( err => next(err));
});

journalRouter.get('/api/journal/:id', function(req, res, next) {
  debug('GET: /api/journal/:id');

  Journal.fetchJournal(req.params.id)
  .then( journal => res.json(journal))
  .catch( err => next(err));
});

journalRouter.put('/api/journal', jsonParser, function(req, res, next){
  debug('PUT: /api/journal');

  Journal.updateJournal(req.query.id, req.body)
  .then(journal => res.json(journal))
  .catch(next);
});

module.exports = journalRouter;
