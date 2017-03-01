'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('bike:bike-model');

const storage = require('../lib/storage.js');


const Bike = module.exports = function(name, content) {
  debug('Bike constructor');

  if(!name) throw createError(400, 'name required');
  if(!content) throw createError(400, 'description required');

  this.id = uuid.v4();
  this.name = name;
  this.description = content;
};

Bike.createBike = function(_bike){
  debug ('createBike');

  try {
    let bike = new Bike(_bike.name, _bike.description);
    return storage.createItem('bike', bike);
  } catch (err) {
    return Promise.reject(err);
  }
};

Bike.fetchBike = function(id){
  debug ('fetchBike');

  return storage.fetchItem('bike', id);
};

Bike.deleteBike = function(id){
  debug ('deleteBike');

  return storage.deleteItem('bike', id);
};

Bike.fetchAllBikes = function(){
  debug ('fetchAllBikes');

  return storage.availableIDs('bike');
};

Bike.updateBike = function(id, _bike) {
  debug('updateBike');

  return storage.fetchItem('bike', id)
  .then( bike =>{
    if(_bike.name) bike.name = _bike.name;
    if(_bike.description) bike.description = _bike.description;
    return storage.createItem('bike', bike);
  }).catch( err => Promise.reject(createError(400, err.message)));
};