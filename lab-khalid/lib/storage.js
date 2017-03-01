'use strict';
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix:'Prom'});
const createError = require('http-errors');
const debug = require('debug')('employee:storage');

module.exports = exports = {};

exports.createItem = function(schemaname, item){
  debug('createItem');

  if(!schemaname) return Promise.reject(createError(400, 'Schemaname notn provided'));
  if(!item) return Promise.reject(createError(400, 'Item not provided'));
  let json = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaname}/${item.id}.json`, json)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(schemaname, id){
  debug('fetchItem');

  if(!schemaname) return Promise.reject(createError(400, 'schemaname not provided'));
  if(!id) return Promise.reject(createError(400, 'Id not provided'));

  return fs.readFileProm(`${__dirname}/../data/${schemaname}/${id}.json`)
  .then(data => {
    try{
      let item = JSON.parse(data.toString());
      return item;
    } catch(err){
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaname, id){
  debug('deleteItem');

  if(!schemaname) return Promise.reject(createError(400, 'Schemaname not provided'));
  if(!id) return Promise.reject(createError(400, 'Id not provided'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaname}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.fetchIDs = function(schemaname){
  debug('fetchIDs');
  return fs.readdirProm(`${__dirname}/../data/${schemaname}`)
  .then(files => files.map(name => name.split('.json')[0]))
  .catch(err => Promise.reject(createError(404, err.message)));
};
