'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('family:family');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Family = module.exports = function(name, relation) {
  debug('family constuctor');

  if (!name) return new createError(400, 'expected name');
  if (!relation) return new createError(400, 'expected relation');

  this.id = uuid.v1();
  this.name = name;
  this.relation = relation;
};

Family.createFamily = function(_family) {
  debug('createFamily');

  try {
    let family = new Family(_family.name, _family.relation);
    return storage.createItem('family', family);
  } catch (err) {
    return Promise.reject(err);
  }
};

Family.fetchFamily = function(id) {
  debug('fetchFamily');
  return storage.fetchItem('family', id);
};

Family.updateFamily = function(id, _family) {
  debug('updateFamily');

  return storage.fetchItem('family', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( family => {
    for (var prop in family) {
      if (prop === 'id') continue;
      if (_family[prop]) family[prop] = _family[prop];
    }
    return storage.createItem('family', family);
  });
};

Family.deleteFamily = function(id) {
  debug('deleteFamily');
  return storage.deleteItem('family', id);
};

Family.fetchIDs = function() {
  debug('fetchIDs');
  return storage.fetchAllItems('family');
};
