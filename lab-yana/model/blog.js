'use strict';

const storage = require('../lib/storage.js');
const randomID = require('node-uuid');
const debug = require('debug')('blog:blog');
const createError = require('http-errors');

const Blog = module.exports = function (name, content) {
  if (!name) throw createError(400, 'name expected');
  if (!content) throw createError(400, 'content expecte');

  this.id = randomID.v1();
  this.name = name;
  this.content = content;
};

Blog.createBlog = function(_blog) {
  debug('createBlog');
  try {
    let blog = new Blog(_blog.name, _blog.content);
    return storage.createItem('blog', blog);
  } catch(err) {
    return Promise.reject(createError(400, err.message));
  }
};

Blog.fetchBlog = function(id) {
  debug('fetchBlog');
  return storage.fetchItem('blog', id);
};

Blog.removeBlog = function(id) {
  debug('removeBlog');
  return storage.deleteItem('blog', id);
};

Blog.getBlogList = function() {
  debug('getBlogList');
  return storage.getItemList('blog');
};

Blog.updateBlog = function(id, content) {
  debug('updateBlog');
  return storage.fetchItem('blog', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(blog => {
    if(!content.name && !content.content) return Promise.reject(createError(400, 'bad request')); //to make sure we're being given a valid update that has either a name or content property
    for (var key in blog) {
      if (key === 'id') continue;
      if (content[key]) blog[key] = content[key];
    }
    return storage.createItem('blog', blog);
  });
};
