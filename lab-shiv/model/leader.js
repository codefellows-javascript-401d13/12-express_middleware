'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('leader:leader');
const storage = require('../lib/storage.js');

const Leader = module.exports = function(name, purpose) {
  debug('leader constructor');

  if (!name) throw createError(400, 'expected name');
  if (!purpose) throw createError(400, 'expected purpose');

  this.id = uuid.v1();
  this.name = name;
  this.purpose = purpose;
};

Leader.createLeader = function(_leader) {
  debug('createLeader');

  try {
    let leader = new Leader(_leader.name, _leader.purpose);
    return storage.createItem('leader', leader);
  } catch (err) {
    return Promise.reject(err);
  }
};

Leader.fetchLeader = function(id) {
  debug('fetchLeader');
  return storage.fetchItem('leader', id);
};

Leader.updateLeader = function(id, _leader) {
  debug('updateLeader');

  return storage.fetchItem('leader', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( leader => {
    for (var prop in leader) {
      if (prop === 'id') continue;
      if (_leader[prop]) leader[prop] = _leader[prop];
    }
    return storage.createItem('leader', leader);
  });
};

Leader.deleteLeader = function(id) {
  debug('deleteLeader');
  return storage.deleteItem('leader', id);
};

Leader.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('leader');
};
