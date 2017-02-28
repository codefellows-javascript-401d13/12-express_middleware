'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');

const debug = require('debug')('music:music');
const storage = require('../lib/storage.js');

const Music = module.exports = function(genre, artist) {
  debug('music constructor');

  if (!genre) throw createError(400, 'expected genre');
  if (!artist) throw createError(400, 'expected artist');

  this.id = uuid.v1();
  this.genre = genre;
  this.artist = artist;
};

Music.createMusic = function(_music){
  debug('createMusic');

  try{
    let music = new Music(_music.genre, _music.artist);
    return storage.createItem('music', music);
  } catch (err) {
    return Promise.reject(err);
  }
};

Music.fetchMusic = function(id){
  debug('fetchMusic');
  return storage.fetchItem('music', id);
};

Music.updateMusic = function(id, _music){
  debug('updateMusic');

  return storage.fetchItem('music', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( music => {
    for ( var prop in music) {
      if(prop === 'id') continue;
      if(_music[prop]) music[prop] = _music[prop];
    }
    return storage.createItem('music', music);
  });
};

Music.deleteMusic = function(id) {
  debug('deleteMusic');
  return storage.deleteItem('music', id);
};

Music.fetchIDs = function(){
  debug('fetchIDs');
  return storage.availIDs('music');
};
