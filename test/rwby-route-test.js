'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Rwby = require('../model/rwby.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleRwby = {
  name: 'Weiss Schnee',
  weapon: 'rapier',
  symbol: 'snowflake'
};

describe('Rwby Routes', function(){
  describe('GET: /api/rwby', function(){
    before( done => {
      Rwby.createRwby(exampleRwby)
      .then( rwby => {
        this.tempRwby = rwby;
        done();
      })
      .catch(err => done(err));
    });
    after( done => {
      Rwby.deleteRwby(this.tempRwby.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a rwby', done => {
      request.get(`${url}/api/rwby/${this.tempRwby.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempRwby.id);
        expect(res.body.name).to.equal(this.tempRwby.name);
        done();
      });
    });
    describe('with an invalid id', function() {
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/rwby/wrongid`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('POST:/api/rwby', function() {
    describe('with a valid body', function(){
      after(done => {
        if(this.tempRwby) {
          Rwby.deleteRwby(this.tempRwby.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });
      it('should return a rwby', done => {
        request.post(`${url}/api/rwby`)
        .send(exampleRwby)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleRwby.name);
          expect(res.body.content).to.equal(exampleRwby.content);
          this.tempRwby = res.body;
          done();
        });
      });
    });
  });
  describe('Put: /api/rwby', function(){
    describe('with a valid id and body', function(){
      before( done => {
        Rwby.createRwby(exampleRwby)
        .then( rwby => {
          this.tempRwby = rwby;
          done();
        })
        .catch(err => done(err));
      });
      after(done => {
        if(this.tempRwby) {
          Rwby.deleteRwby(this.tempRwby.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });
      it(' should return a rwby', done => {
        let updateRwby = {name :'new name', content : 'new content'};
        request.put(`${url}/api/rwby?id=${this.tempRwby.id}`)
        .send(updateRwby)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempRwby.id);
          for(var prop in updateRwby) {
            expect(res.body[prop]).to.equal(updateRwby[prop]);
          }
          done();
        });
      });
    });
  });
});
