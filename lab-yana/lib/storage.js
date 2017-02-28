'use strict';

const debug = require('debug');
const createError = require('http-error');
const Promise = require('bluebird');
const fs = require('fs').promisifyAll( {suffix: 'Prom'} );

module.exports = exports = {}

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`../data/${schemaName}/${id}.json`)
  .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`../data/${schemaName}/${id}.json`)
    .then(file => { return JSON.parse(file); })
    .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.createItem = function(schemaName, item) {
  debug('createItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400, 'expected item'));

  return fs.writeFileProm(`../data/${schemaName}/${item.id}.json`)
    .then(item => { return JSON.parse(item); })
    .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.getItemList = function(schemaName) {
  debug('getItemList');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  return fs.readdirProm(`../data/${schemaName}`)
    .then(list => { return list.map(filename => filename.split('.json')[0]); })
    .catch(err => { return Promise.reject(createError(404, err.message)); });
};
