'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('cat:cat');
const storage = require('../lib/storage.js');

const Cat = module.exports = function(name, content) {
  debug('cat constructor');

  if(!name) throw createError(400, 'expected name');
  if(!content) throw createError(400, 'expected name');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Cat.createCat = function(_cat) {
  debug('createCat');

  try{
    let cat = new Cat(_cat.name, _cat.content);
    return storage.createItem('cat', cat);
  } catch (err) {
    return Promise.reject(err);
  }
};

Cat.fetchCat = function(id) {
  debug('fetchCat');
  return storage.fetchItem('cat', id);
}

Cat.updateCat = function(id, _cat) {
  debug('updateCat');

  return storage.fetchItem('cat', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  then( cat => {
    for (var prop in cat) {
      if (prop === id) continue;
      if (_cat[prop]) cat[prop] = _cat[prop];
    }
    return storage.createItem('cat', cat);
  });
}

Cat.deleteCat = function(id) {
  debug('deleteCat');
  return storage.deleteItem('cat', id);
}

Cat.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('cat');
}
