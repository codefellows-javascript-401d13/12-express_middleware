'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('guitar:guitar');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Guitar = module.exports = function(name, type, make) {
  if(!name) throw createError(400, 'bad request');
  if(!type) throw createError(400, 'bad request');
  if(!make) throw createError(400, 'bad request');

  this.name = name;
  this.type = type;
  this.make = make;
  this.id = uuid.v1();
};

Guitar.createGuitar = function(_guitar) {
  debug('createGuitar');
  try {
    let guitar = new Guitar(_guitar.name, _guitar.type, _guitar.make);
    return storage.createItem('guitar', guitar);
  } catch (err) {
    return Promise.reject(err);
  }
};

Guitar.fetchGuitar = function(id) {
  debug('fetchGuitar');
  try {
    return storage.fetchItem('guitar',id);
  } catch (err) {
    return Promise.reject(err);
  }
};

Guitar.updateGuitar = function(id, _guitar) {
  debug('updateGuitar');

  return storage.fetchItem('guitar', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( guitar => {
    for (var prop in guitar) {
      if(_guitar[prop]) guitar[prop] = _guitar[prop];
    }
    return storage.createItem('guitar', guitar);
  });
};

Guitar.deleteGuitar = function(id) {
  debug('deleteGuitar');
  try {
    return storage.deleteItem('guitar', id);
  } catch (err) {
    return Promise.reject(err);
  }
};

Guitar.fetchIDs = function() {
  debug('fetchIds');
  return storage.availIDs('guitar');
};
