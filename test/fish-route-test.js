'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Fish = require('../model/fish.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleFish = {
  name : 'example name',
  color : 'example color',
  age : 'example age'
};

describe('Fish Routes', function() {

  describe('GET: /api/fish', function() {
    before( done => {
      Fish.createFish(exampleFish)
      .then(fish => {
        this.tempFish = fish;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      Fish.deleteFish(this.tempFish.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a fish', done => {
      request.get(`${url}/api/fish/${this.tempFish.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempFish.id);
        expect(res.body.name).to.equal(this.tempFish.name);
        expect(res.body.color).to.equal(this.tempFish.color);
        expect(res.body.age).to.equal(this.tempFish.age);
        done();
      });
    });

    describe('with an invalid id', function() {
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/fish/7362`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });


  describe('POST: /api/fish', function() {
    describe('with a valid body', function() {
      after( done => {
        if(this.tempFish) {
          Fish.deleteFish(this.tempFish.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a fish', done => {
        request.post(`${url}/api/fish`)
        .send(exampleFish)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleFish.name);
          expect(res.body.color).to.equal(exampleFish.color);
          expect(res.body.age).to.equal(exampleFish.age);
          this.tempFish = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/fish', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Fish.createFish(exampleFish)
        .then( fish => {
          this.tempFish = fish;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if(this.tempFish) {
          Fish.deleteFish(this.tempFish.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a fish', done => {
        let updateFish = {name: 'new name', color: 'new color', age: 'new age'};
        request.put(`${url}/api/fish/:${this.tempFish.id}`)
        .send(updateFish)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempFish.id);
          for(var prop in updateFish) {
            expect(res.body[prop]).to.equal(updateFish[prop])
          }
          done();
        });
      });
    });
  });
});
