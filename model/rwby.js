'use strict';

const debug = require('debug')('rwby:Rwby');
const uuid = require('node-uuid');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Rwby = module.exports = function(name, weapon, symbol){
  debug('Rwby Constructor');
  if(!name) throw createError(400, 'expected name');
  if(!weapon) throw createError(400, 'expected weapon');
  if(!symbol) throw createError(400, 'expected symbol');
  this.id = uuid.v1();
  this.name = name;
  this.weapon = weapon;
  this.symbol = symbol;
};


Rwby.createRwby = function(_rwby){
  debug('create Rwby');
  try{
    let rwby = new Rwby(_rwby.name, _rwby.weapon, _rwby.symbol);
    return storage.createItem('rwby', rwby);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

Rwby.fetchRwby = function(id){
  debug('Fetch RWBY');
  return storage.fetchItem('rwby', id);
};

Rwby.updateRwby = function(id, _rwby){
  debug('updateRwby');
  return storage.fetchItem('rwby', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( rwby => {
    for(var prop in rwby){
      if(prop === 'id') continue;
      if(_rwby[prop]) rwby[prop] = _rwby[prop];
    }
    return storage.createItem('rwby', rwby);
  });
};

Rwby.deleteRwby = function(id) {
  debug('deleteRwby');
  return storage.deleteItem('rwby', id);
};

Rwby.fetchIDs = function(){
  debug('fetchIds');
  return storage.availIDs('rwby');
};
