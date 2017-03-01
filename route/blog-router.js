'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('blog:blog-router');
const Blog = require('../model/blog.js');
const blogRouter = new Router();

blogRouter.post('/api/blog', jsonParser, function(req, res, next) {
  debug('POST: /api/blog');

  Blog.createBlog(req.body)
  .then( blog => res.json(blog))
  .catch( err => next(err));
});

blogRouter.get('/api/blog/:id', function(req, res, next) {
  debug('GET: /api/blog/:id');

  Blog.fetchBlog(req.params.id)
  .then( blog => res.json(blog))
  .catch( err => next(err));
});

blogRouter.get('/api/blog', function(req, res, next) {
  debug('GET: /api/blog')

  Blog.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

blogRouter.put('/api/blog', jsonParser, function(req, res, next) {
  debug('PUT: /api/blog');

  Blog.updateBlog(req.query.id, req.body)
  .then( blog => res.json(blog))
  .catch(next);
});

module.exports = blogRouter;
