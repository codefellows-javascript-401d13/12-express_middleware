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
  this.name = name;
  this.weapon = weapon;
  this.symbol = symbol;
};


Rwby.createRwby = function(_rwby){
  debug('create Rwby');
  try{
    let rwby = new Rwby(_rwby.name, _rwby.weapon, _rwby.symbol)
    storage.create
  }
}

Rwby.fetchRwby = function(id){
  debug('Fetch RWBY')
  storage.fetchItem('rwby', id)
}
