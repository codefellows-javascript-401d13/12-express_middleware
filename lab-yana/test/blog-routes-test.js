'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Blog = require('../model/blog.js');
const url = 'http://localhost:3003';
const testBlog = { name: 'test name', content: 'test content' };
const exec = require('child_process').exec;

var list = [];
var cmd = 'rm data/blog/*';

//run to clear data/blog directory for list tests
before(done =>
  { exec(cmd, err =>
    { if (err) done(err);
    done();
  });
});

require('../server.js');

describe('Blog Routes', function() {
  describe('ALL METHODS /someEntirelyWrongRoute', function() {
    it('should return a 404 not found error with GET', function(done) {
      request.get(`${url}/reallyWrongRoute`)
      .end(err => {
        expect(err.status).to.equal(404);
        done();
      });
    });
    it('should return a 404 not found error with PUT', function(done) {
      request.put(`${url}/reallyWrongRoute`)
      .end(err => {
        expect(err.status).to.equal(404);
        done();
      });
    });
    it('should return a 404 not found with POST', function(done) {
      request.post(`${url}/reallyWrongRoute`)
      .end(err => {
        expect(err.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET: /api/blog/:id', function() {
    before(done => {
      Blog.createBlog(testBlog)
      .then(blog => {
        this.tempBlog = blog;
        done();
      }).catch(err => done(err));
    });
    after(done => {
      Blog.removeBlog(this.tempBlog.id).then( () => done()).catch(err => done(err));
    });
    it('should return a blog entry', done => {
      request.get(`${url}/api/blog/${this.tempBlog.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(this.tempBlog.name);
        expect(res.body.content).to.equal(this.tempBlog.content);
        expect(res.body.id).to.equal(this.tempBlog.id);
        done();
      });
    });
  });
  describe('GET: /api/blog/wrongID', function() {
    it('should return a 404 not found error', function(done) {
      request.get(`${url}/api/blog/terriblyWrongID`)
      .end(err => {
        expect(err.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET: /api/blog', function() {
    before(done => {
      request.post(`${url}/api/blog`)
      .send(testBlog)
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id);
      });
      request.post(`${url}/api/blog`)
      .send(testBlog)
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id);
      });
      request.post(`${url}/api/blog`)
      .send(testBlog)
      .end((err, res) => {
        if (err) return done(err);
        list.push(res.body.id);
      });
      done();
    });
    after(done => {
      exec(cmd, err =>
        { if (err) done(err);
        done();
      });
    });
    it('should return a list of available blog IDs', done => {
      request.get(`${url}/api/blog`)
      .end((err, res) => {
        if (err) return done(err);
        console.log('res body', res.body);
        console.log('list', list);
        expect(res.body).to.be.an('array');
        expect(list.indexOf(res.body[0])).to.not.equal(-1); //async is killing me!!!!! ;-)
        expect(list.indexOf(res.body[1])).to.not.equal(-1); //these three statements make sure that the IDs generated from the get are present in the comparison list, since they are not necessarily in the same order, so I can't just compare the two arrays
        expect(list.indexOf(res.body[2])).to.not.equal(-1);
        done();
      });
    });
  });
  describe('POST: /api/blog', function() {
    it('should return a blog entry', function(done) {
      request.post(`${url}/api/blog`)
      .send(testBlog)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.content).to.equal(testBlog.content);
        expect(res.body.name).to.equal(testBlog.name);
        done();
      });
    });
    describe('without a valid name property', function() {
      it('should return a 400 error', function(done) {
        request.post(`${url}/api/blog/`)
        .send( { content: 'nameless content' } )
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
    describe('without a valid content property', function() {
      it('should return a 400 error', function(done) {
        request.post(`${url}/api/blog`)
        .send( { name: 'contentless name'} )
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('PUT: /api/blog', function() {
    var updatedBlog = { name: 'new name', content: 'new content' };
    describe('with a valid id and body', () => {
      before(done => {
        Blog.createBlog(testBlog)
        .then(blog => {
          this.tempBlog = blog;
          done();
        }).catch(err => done(err));
      });
      after(done => {
        Blog.removeBlog(this.tempBlog.id)
        .then( () => done()).catch(err => done(err));
      });
      it('should return an updated blog entry', done => {
        request.put(`${url}/api/blog?id=${this.tempBlog.id}`)
        .send(updatedBlog)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(updatedBlog.name);
          expect(res.body.content).to.equal(updatedBlog.content);
          expect(res.body.id).to.equal(this.tempBlog.id);
          done();
        });
      });
    });
    describe('without a valid id', function() {
      it('should return a 404 not found', function(done) {
        request.put(`${url}/api/blog?id="oops"`)
        .send(updatedBlog)
        .end(err => {
          expect(err.status).to.equal(404);
          done();
        });
      });
    });
    describe('without a valid body', () => {
      before(done => {
        Blog.createBlog(testBlog)
        .then(blog => {
          this.tempBlog = blog;
          done();
        }).catch(err => done(err));
      });
      after(done => {
        Blog.removeBlog(this.tempBlog.id)
        .then( () => done()).catch(err => done(err));
      });
      let badObject = 'bob';
      it('should return a 400 bad request', done => {
        request.put(`${url}/api/blog?id=${this.tempBlog.id}`)
        .send(badObject)
        .end(err => {
          expect(err.status).to.equal(400);
          done();
        });
      });
    });
  });
});
