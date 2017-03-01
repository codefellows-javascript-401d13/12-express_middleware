'use strict';

const debug = require('debug')('blog:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'} );
const url = `${__dirname}/../data/`;

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('createItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!item) return Promise.reject(createError(400, 'expected item'));

  return fs.writeFileProm(`${url}${schemaName}/${item.id}.json`, JSON.stringify(item))
  .then( () => item)
  .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.fetchItem = function(schemaName, id) {
  debug('fetchItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.readFileProm(`${url}${schemaName}/${id}.json`)
    .then(file => {
      try { return JSON.parse(file.toString()); }
      catch (err) {return Promise.reject(createError(400, err.message)); }
    })
    .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.deleteItem = function(schemaName, id) {
  debug('deleteItem');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${url}${schemaName}/${id}.json`)
  .catch(err => { return Promise.reject(createError(404, err.message)); });
};

exports.getItemList = function(schemaName) {
  debug('getItemList');
  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  return fs.readdirProm(`${url}${schemaName}`)
    .then(list => { return list.map(filename => filename.split('.json')[0]); })
    .catch(err => { return Promise.reject(createError(404, err.message)); });
};
