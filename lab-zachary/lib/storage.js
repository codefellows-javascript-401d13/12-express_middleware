'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('bike:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

//create, fetch delete

module.exports = exports = {};

exports.createItem = function(schemaName, item){
  debug('createItem');

  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
  .then( () => item) //whuck? look into this format. return item implied with function.
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaName, id){
  debug('fetchItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch (err => Promise.reject(createError(404, err.message)));
};

exports.fetchAllItems = function(schemaName){
  if(!schemaName) return Promise.reject(new Error('expected schema name'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( data => {return data;})
  .catch (err => Promise.reject(createError(404, err.message)));
};
exports.deleteItem1 = function(schemaName, id){
  if(!schemaName) return Promise.reject(createError(400,'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( () => id)
  .catch( err => Promise.reject(err));
};
exports.deleteItem = function(schemaName, id){
  debug ('deleteItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));//then not necessary
};

exports.availableIDs = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( files => files.map (name => name.split('.json')[0]))
  .catch( err => Promise.reject(createError(404, err.message)));
};


