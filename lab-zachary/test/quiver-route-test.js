'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Quiver = require('../model/quiver.js');

const PORT = process.env.PORT || 3000;
const url = `http://localhost:${PORT}`;
const exampleQuiver = {
  title : 'test title'
};

require('../server.js');

describe('Quiver route test', function(){
  describe('GET api/quiver/:quiverID', function(){
    describe('with a valid ID', function() {
      before( done => {
        exampleQuiver.timestamp = new Date();
        new Quiver(exampleQuiver).save()
        .then( quiver => {
          this.tempQuiver = quiver;
          done();
        })
        .catch(done);
      });
      after( done => {
        delete exampleQuiver.timestamp;
        Quiver.findByIdAndRemove(this.tempQuiver._id)
        .then(() => done()).catch(done);
        return;
      });
      it('should return a 200', done => {
        request.get(`${url}/api/quiver/${this.tempQuiver._id}`)
        .end((err, res) =>{
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body._id).to.equal(this.tempQuiver._id.toString());
          done();
        });
      });
    });
    describe('with an invalid ID', function(){
      it('should return a 404 error', done =>{
        request.get(`${url}/api/quiver/youMadeaBadIdPetey`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(err.message).to.equal('Not Found');
          done();
        });
      });
    });
  });
  describe('POST route tests', function(){
    describe('with proper post data', function() {
      after( done => {
        if(this.tempQuiver){
          delete exampleQuiver.timestamp;
          Quiver.findByIdAndRemove(this.tempQuiver._id)
          .then(() => done()).catch(done);
          return;
        }
        done();
      });
      it('should return a new quiver', done => {
        request.post(`${url}/api/quiver/`)
        .send(exampleQuiver)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.title).to.equal(exampleQuiver.title);
          this.tempQuiver = res.body;
          done();
        });
      });
    });
    describe('with malformed post data ', function() {
      it('should return a 400 error', done => {
        request.post(`${url}/api/quiver/`)
        .send('bad data')
        .end((err, res) => {
          expect(err.message).to.equal('Bad Request');
          expect(res.status).to.equal(400);
          done();
        });
      });
    });
  });
  describe('PUT route tests', function() {
    describe('PUT api/quiver/:quiverID', function() {
      describe('With a valid ID', function() {
        before( done => {
          exampleQuiver.timestamp = new Date();
          new Quiver(exampleQuiver).save()
          .then( quiver => {
            this.tempQuiver = quiver;
            done();
          })
          .catch(done);
        });
        after( done => {
          delete exampleQuiver.timestamp;
          Quiver.findByIdAndRemove(this.tempQuiver._id)
          .then(() => done()).catch(done);
          return;
        });
        describe('With valid body data', () => {
          it('should return the updated Quiver',done => {
            request.put(`${url}/api/quiver/${this.tempQuiver._id}`)
            .send({title:'updated title'})
            .end((err, res) => {
              if (err) return done(err);
              expect(res.status).to.equal(200);
              expect(res.body.title).to.equal('updated title');
              done();
            });
          });
        });
        describe('With invalid body data', () => {
          it('should return with a 400 error', done => {
            request.put(`${url}/api/quiver/${this.tempQuiver._id}`)
            .send('bad data')
            .end((err, res) => {
              expect(err.message).to.equal('Bad Request');
              expect(res.status).to.equal(400);
              done();
            });
          });
        });
      });
      describe('With incorrect ID', function(){
        it('should return 404', function (done){
          request.put(`${url}/api/quiver/badIDgoesHere`)
          .send(exampleQuiver)
          .end((err, res) => {
            expect(err.message).to.equal('Not Found');
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });
});
