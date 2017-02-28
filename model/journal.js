'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('journal:journal');
const storage = require('../lib/storage.js');

const Journal = module.exports = function(author, entry) {
  debug('journal constructor');

  if(!author) throw createError(400, 'expected author');
  if (!entry) throw createError(400, 'expected entry');

  this.id = uuid.v1();
  this.author = author;
  this.entry = entry;
};

Journal.createJournal = function(_journal){
  debug('createJournal');

  try {
    let journal = new
    Journal(_journal.author, _journal.entry);
    return storage.createItem('journal', journal);
  } catch (err) {
    return Promise.reject(err);
  }
};

Journal.fetchJournal = function(id) {
  debug('fetchJournal');
  return storage.fetchItem('journal', id);
};

Journal.updateJournal = function(id, _journal) {
  debug('updateJournal');

  return storage.fetchItem('journal', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( journal => {
    for(var prop in journal) {
      if(prop === 'id') continue;
      if(_journal[prop]) journal[prop] = _journal[prop];
    }
    return storage.createItem('journal', journal);
  });
};

Journal.deleteJournal = function(id) {
  debug('deleteJournal');
  return storage.deleteItem('journal', id);
};

Journal.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('journal');
};
