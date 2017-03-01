
'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('blog:blog');
const storage = require('../lib/storage.js');

const Blog = module.exports = function(name, content) {
  debug('blog constructor');

  if (!name) throw createError(400, 'expected name');
  if (!content) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Blog.createBlog = function(_blog) {
  debug('createBlog');

  try {
    let blog = new Blog(_blog.name, _blog.content);
    return storage.createItem('blog', blog);
  } catch (err) {
    return Promise.reject(err);
  }
};

Blog.fetchBlog = function(id) {
  debug('fetchBlog');
  return storage.fetchItem('blog', id);
};

Blog.updateBlog = function(id, _blog) {
  debug('updateBlog');

  return storage.fetchItem('blog', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( blog => {
    for (var prop in blog) {
      if (prop === 'id') continue;
      if (_blog[prop]) blog[prop] = _blog[prop];
    }
    return storage.createItem('blog', blog);
  });
};

Blog.deleteBlog = function(id) {
  debug('deleteBlog');
  return storage.deleteItem('blog', id);
};

Blog.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('blog');
};
