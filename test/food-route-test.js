'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Food = require('../model/food.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleFood = {
  name: 'example name',
  meal: 'example meal'
};


describe('Food Routes', function() {
  describe('GET: /api/food', function() {
    before( done => {
      Food.createFood(exampleFood)
      .then( food => {
        this.tempFood = food;
        done();
      })
      .catch( err => done(err));
    });
    after(done => {
      Food.deleteFood(this.tempFood.id)
      .then( () => done())
      .catch( err => done(err));
    });
    it('should respond with 200 status and res.body[props] should = tempFood[props]', done => {
      request.get(`${url}/api/food/${this.tempFood.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempFood.id);
        expect(res.body.name).to.equal(this.tempFood.name);
        expect(res.body.meal).to.equal(this.tempFood.meal);
        done();
      });
    });
    describe('with an invalid id', function() {
      it('should respond with a 404 status', done => {
        request.get(`${url}/api/food/123456789`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('POST: /api/food', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempFood) {
          Food.deleteFood(this.tempFood.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });


      it('should return a food', done => {
        request.post(`${url}/api/food`)
        .send(exampleFood)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleFood.name);
          expect(res.body.meal).to.equal(exampleFood.meal);
          this.tempFood = res.body;
          done();
        });
      });
    });
  });
  describe('PUT: /api/food', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Food.createFood(exampleFood)
        .then( food => {
          this.tempFood = food;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        if (this.tempFood) {
          Food.deleteFood(this.tempFood.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });
      it('should return a food', done => {
        let updateFood = {name: 'new name', meal: 'new contnt'};
        request.put(`${url}/api/food?id=${this.tempFood.id}`)
        .send(updateFood)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempFood.id);
          for (var prop in updateFood) {
            expect(res.body[prop]).to.equal(updateFood[prop]);
          }
          done();
        });
      });
    });
  });
});
