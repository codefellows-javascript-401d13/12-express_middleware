'use strict';

const storage = require('../lib/storage.js');
const randomID = require('note-uuid');
const debug = require('debug')('blog:blog');

function Blog(name, content) {
  this.id = randomID.v1();
  this.name = name;
  this.content = content;
}

Blog.removeBlog = function(id) {
  debug('removeBlog');
  return storage.deleteItem('blog', id);
};

Blog.fetchBlog = function(id) {
  debug('fetchBlog');
  return storage.fetchItem('blog', id);
};

Blog.createBlog = function(blog) {
  debug('createBlog');
  return storage.createItem('blog', blog);
};

Blog.getBlogList = function() {
  debug('getBlogList');
  return storage.getItemList('schemaName');
};

Blog.updateBlog = function(id, content) {
  debug('updateBlog');
  let blog = storage.fetchItem('blog', id);
  blog.id = id;
  for (var key in blog) {
    blog[key] = content[key];
  }
  return storage.createItem('blog', blog);
};

module.exports = Blog;
