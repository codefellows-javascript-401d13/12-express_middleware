'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Bike = require('../model/bike.js');

const url = 'http://localhost:8000/api/bike';
require ('../server.js');

const sampleBike = {
  'name': 'sample name',
  'description': 'sample description'
};

describe('Bike Routes', function(){
  describe('get api/bike', function(){
    before( done => {
      Bike.createBike(sampleBike)
      .then( bike => {
        this.tempBike = bike;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      Bike.deleteBike(this.tempBike.id)
      .then( () => done())
      .catch( err => done(err));
    });
    it('should return with a 200 response if proper id is passed', done => {
      request.get(`${url}/${this.tempBike.id}`)
      .end((err, res) =>{
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(sampleBike.name);
        expect(res.body.description).to.equal(sampleBike.description);
        done();
      });
    });
    it('should return all ids if no id param is passed', done => {
      request.get(`${url}/`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.contain(this.tempBike.id);
        done();
      });
    });
    it('should return a 404 error if a bad id name is passed', done => {
      request.get(`${url}/thisisabadidname`)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(err.message).to.equal('Not Found');
        done();
      });
    });
  });
  describe('PUT api/bike', function(){
    var newBikeContent = {'name':'updated name', 'description':'updated description'};
    before( done => {
      Bike.createBike(sampleBike)
      .then( bike => {
        this.tempBike = bike;
        done();
      })
      .catch( err => done(err));
    });

    after( done => {
      Bike.deleteBike(this.tempBike.id)
      .then( () => done())
      .catch( err => done(err));
    });
    it('should update note content with proper request', done => {
      request.put(`${url}/${this.tempBike.id}`)
      .send(newBikeContent)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(newBikeContent.name);
        expect(res.body.description).to.equal(newBikeContent.description);
        done();
      });
    });
    it('should return a 400 with an incorrect id', done => {
      request.put(`${url}/badIdPetey`)
      .send(newBikeContent)
      .end((err, res) => {
        expect(err.message).to.equal('Bad Request');
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should return a 404 with a missing id', done => {
      request.put(`${url}/`)
      .send(newBikeContent)
      .end((err, res) => {
        expect(err.message).to.equal('Not Found');
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('POST route test', function() {
    after( done => {
      if (this.tempBike) {
        Bike.deleteBike(this.tempBike.id)
        .then( () => done())
        .catch( err => done(err));
      }
    });
    it('should create a new note', done => {
      request.post(url)
      .send(sampleBike)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(sampleBike.name);
        expect(res.body.description).to.equal(sampleBike.description);
        this.tempBike = res.body;
        done();
      });
    });
    it('should respond with a 400 error if malformed body content is passed', done => {
      request.post(url)
      .send('bad data')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(err.message).to.equal('Bad Request');
        done();
      });
    });
  });
});
