'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('music:storage');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });

module.exports = exports = {};
exports.createItem = function(schemaName, item) {
  debug('createItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(createError(500, err.message)));     
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));  

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = (schemaName, id) => {
  debug('deleteItem');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name but its absent'));
  if(!id) return Promise.reject(createError(400, 'expected id but its absent'));
  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch((err) => Promise.reject(createError(404, err.message)));
};

exports.availIDs = function(schemaName){
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
    .then( files => files.map( name => name.split('.json')[0]))
    .catch(err => Promise.reject(createError(404, err.message)));
};
