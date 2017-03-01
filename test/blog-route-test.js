'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Blog = require('../model/blog.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleBlog = {
  name: 'example name',
  content: 'example content'
};

describe('Blog Routes', function() {

  describe('GET: /api/blog', function() {
    describe('with a valid id', function() {
      before( done => {
        Blog.createBlog(exampleBlog)
        .then(blog => {
          this.tempBlog = blog;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Blog.deleteBlog(this.tempBlog.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a blog', done => {
        request.get(`${url}/api/blog/${this.tempBlog.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempBlog.id);
          expect(res.body.name).to.equal(this.tempBlog.name);
          expect(res.body.content).to.equal(this.tempBlog.content);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/blog/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/blog', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempBlog) {
          Blog.deleteBlog(this.tempBlog.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a blog', done => {
        request.post(`${url}/api/blog`)
        .send(exampleBlog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleBlog.name);
          expect(res.body.content).to.equal(exampleBlog.content);
          this.tempBlog = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/blog', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Blog.createBlog(exampleBlog)
        .then( blog => {
          this.tempBlog = blog;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempBlog) {
          Blog.deleteBlog(this.tempBlog.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a blog', done => {
        let updateBlog = { name: 'new name', content: 'new content' };
        request.put(`${url}/api/blog?id=${this.tempBlog.id}`)
        .send(updateBlog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempBlog.id);
          for (var prop in updateBlog) {
            expect(res.body[prop]).to.equal(updateBlog[prop])
          }
          done();
        });
      });
    });
  });
});
