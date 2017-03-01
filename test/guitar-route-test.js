'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Guitar = require('../model/guitar.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleGuitar = {
  name: 'les paul',
  type: 'electric',
  make: 'gibson'
};

describe('Guitar Routes', function() {

  describe('GET: api/guitar', function() {

    describe('with a valid id', function() {
      before( done => {
        Guitar.createGuitar(exampleGuitar)
        .then( guitar => {
          this.tempGuitar = guitar;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Guitar.deleteGuitar(this.tempGuitar.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a guitar object', done => {
        request.get(`${url}/api/guitar/${this.tempGuitar.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempGuitar.id);
          expect(res.body.name).to.equal(this.tempGuitar.name);
          expect(res.body.type).to.equal(this.tempGuitar.type);
          expect(res.body.make).to.equal(this.tempGuitar.make);
          done();
        });
      });
    });
    describe('with an invalid id', function() {
      it('should respond with a 404 error', done => {
        request.get(`${url}/api/guitar/invalidID`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('POST: /api/guitar', function() {
    describe('with a valid response body', function() {
      after( done => {
        if(this.tempGuitar) {
          Guitar.deleteGuitar(this.tempGuitar.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });
      it('should return a guitar object', done => {
        request.post(`${url}/api/guitar`)
        .send(exampleGuitar)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleGuitar.name);
          expect(res.body.type).to.equal(exampleGuitar.type);
          expect(res.body.make).to.equal(exampleGuitar.make);
          this.tempGuitar = res.body;
          done();
        });
      });
    });
  });
  describe('PUT: /api/guitar', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Guitar.createGuitar(exampleGuitar)
        .then( guitar => {
          this.tempGuitar = guitar;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Guitar.deleteGuitar(this.tempGuitar.id)
        .then( () => done())
        .catch( err => done(err));
      });
      it('should return a guitar object', done => {
        let updateGuitar = { name: 'stratocaster', type: 'electric', make: 'fender'};
        request.put(`${url}/api/guitar/${this.tempGuitar.id}`)
        .send(updateGuitar)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempGuitar.id);
          for(var prop in updateGuitar) {
            expect(res.body[prop]).to.equal(updateGuitar[prop]);
          }
          done();
        });
      });
    });
  });
});
