'use strict';

const debug = require('debug')('blog:blog-router');
const Blog = require('../model/blog.js');
const parseJSON = require('body-parser').json();
const Router = require('express').Router;
const blogRouter = new Router();

blogRouter.get('/api/blog/:id', function(req, res, next) {
  debug('GET: /api/blog/:id');
  Blog.fetchBlog(req.params.id)
  .then(blog => res.json(blog))
  .catch(next);
});

blogRouter.get('/api/blog', function(req, res, next) {
  debug('GET: /api/blog/:id');
  Blog.getBlogList()
  .then(list => res.json(list))
  .catch(next);
});

blogRouter.post('/api/blog', parseJSON, function(req, res, next) {
  debug('POST: /api/blog');
  Blog.createBlog(req.body)
  .then(blog => res.json(blog))
  .catch(next);
});

blogRouter.put('/api/blog', parseJSON, function(req, res, next) {
  debug('PUT: /api/blog');
  Blog.updateBlog(req.query.id, req.body)
  .then(blog => res.json(blog))
  .catch(next);
});

blogRouter.delete('/api/blog/:id', function(req, res, next) {
  debug('DELETE: /api/blog/:id');
  Blog.removeBlog(req.params.id)
  .then( () => req.params.id)
  .catch(next);
});

module.exports = blogRouter;
