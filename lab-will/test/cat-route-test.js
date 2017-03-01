'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Cat = require('../model/cat.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleCat = {
  name: 'example name',
  content: 'example content'
};

describe('Cat Routes', function() {

  describe('GET /api/cat', function() {
    describe('with a valid id', function() {
      before( done => {
        Cat.createCat(exampleCat)
        .then(cat => {
          this.tempCat = cat;
          done();
        })
        .catch (err => done(err));
      });

      after( done => {
        Cat.deleteCat(this.tempCat.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a cat', done => {
        request.get(`${url}/api/cat/${this.tempCat.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempCat.id);
          expect(res.body.name).to.equal(this.tempCat.name);
          expect(res.body.content).to.equal(this.tempCat.content);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/cat/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/cat', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempCat) {
          Cat.deleteCat(this.tempCat.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a cat', done => {
        request.post(`${url}/api/cat`)
        .send*exampleCat)
        .end((err, res) => {
          iff(err)return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleCat.name);
          expect(res.body.content).to.equal(exampleCat.content);
          this.tempCat = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/cat', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Cat.createCat(exampleCat)
        .then( cat => {
          this.tempCat = cat;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if(this.tempCat) {
          Cat.deleteCat(this.tempCat.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a cat', done => {
        let updateCat = { name: 'new name', content: 'new content' };
        request.put(`${url}/api/cat?id=${this.tempCat.id}`)
        .send(updateCat)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tmpct.id);
          for (var prop in updateCat) {
            expect(res.body[prop]).to.equal(updateCat[prop])
          }
          done();
        });
      });
    });
  });
});
