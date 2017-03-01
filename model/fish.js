'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('fish:fish');
const storage = require('../lib/storage.js');

const Fish = module.exports = function(name, color, age) {
  debug('fish construtor');

  if(!name) throw createError(400, 'expected name');
  if(!color) throw createError(400, 'expected color');
  if(!age) throw createError(400, 'expected age');

  this.id = uuid.v4();
  this.name = name;
  this.color = color;
  this.age = age;
};

Fish.createFish = function(_fish) {
  debug('createFish!!');

  try {
    let fish = new Fish(_fish.name, _fish.color, _fish.age);
    return storage.createItem('fish', fish);
  } catch (err) {
    return Promise.reject(err);
  }
};

Fish.fetchFish = function(id) {
  debug('fetchFish');
  return storage.fetchItem('fish', id);
};

Fish.updateFish = function(id, _fish) {
  debug('updateFish');

  return storage.fetchItem('fish', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( fish => {
    for(var prop in fish) {
      if(prop === 'id') continue;
      if(_fish[prop]) fish[prop] =_fish[prop];
    }
    return storage.createItem('fish', fish);
  });
};

Fish.deleteFish = function(id) {
  debug('deleteFish');

  return storage.deleteItem('fish', id);
}

Fish.fetchIDs =function() {
  debug('fetchIDs');
  return storage.availIDs('fish');
};
