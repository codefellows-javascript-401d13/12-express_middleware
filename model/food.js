'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('food:food');
const storage = require('../lib/storage.js');

const Food = module.exports = function(name, meal) {
  debug('food constructor');

  if(!name) throw createError(400, 'expected name');
  if(!meal) throw createError(400, 'expected meal');

  this.id = uuid.v1();
  this.name = name;
  this.meal = meal;
};

Food.createFood = function(_food) {
  debug('createFood');

  try {
    let food = new Food(_food.name, _food.meal);
    return storage.createItem('food', food);
  } catch(err){
    return Promise.reject(err);
  }
};

Food.fetchFood = function(id) {
  debug('fetchfood');
  return storage.fetchItem('food', id);
};

// will stop usign this logic tomorrow when using mongodb
Food.updateFood = function(id, _food) {
  debug('updateFood');

  return storage.fetchItem('food', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( food => {
    for(var prop in food) {
      if(prop === 'id') continue;
      if(_food[prop]) food[prop] = _food[prop];
    }
    return storage.createItem('food', food);
  });
};

Food.deleteFood = function(id) {
  debug('deleteFood');
  return storage.deleteItem('food', id);
};

Food.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('food');
};

// started by making pagkacge.json and NM
// install dependencies
// work in food.js
//  create schema constructor
// Create Storage file
// Setup server
// makme data/schema folder
