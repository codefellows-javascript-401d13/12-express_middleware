'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Leader = require('../model/leader.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleLeader = {
  name: 'shivvy',
  purpose: 'to culitvate superintelligence'
};

describe('leader Routes', function() {

  describe('GET: /api/leader', function() {
    describe('with a valid id', function() {
      before( done => {
        Leader.createLeader(exampleLeader)
        .then(leader => {
          this.tempLeader = leader;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Leader.deleteLeader(this.tempLeader.id)
        .then( ()=> done())
        .catch( err => done(err));
      });

      it('should return a leader', done => {
        request.get(`${url}/api/leader/${this.tempLeader.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempLeader.id);
          expect(res.body.name).to.equal(this.tempLeader.name);
          expect(res.body.purpose).to.equal(this.tempLeader.purpose);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should respond with a 404 status code', done => {
          request.get(`${url}/api/leader/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/leader', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempLeader) {
          Leader.deleteLeader(this.tempLeader.id)
          .then( ()=> done())
          .catch( err => done(err));
        }
      });

      it('should return a leader', done => {
        request.post(`${url}/api/leader`)
        .send(exampleLeader)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleLeader.name);
          expect(res.body.purpose).to.equal(exampleLeader.purpose);
          this.tempLeader = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/leader', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Leader.createLeader(exampleLeader)
        .then( leader => {
          this.tempLeader = leader;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempLeader) {
          Leader.deleteLeader(this.tempLeader.id)
          .then( ()=> done())
          .catch(done);
        }
      });

      it('should return a leader', done => {
        let updateLeader = { name: 'new name', purpose: 'new purpose' };
        request.put(`${url}/api/leader?id=${this.tempLeader.id}`)
        .send(updateLeader)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempLeader.id);
          for (var prop in updateLeader) {
            expect(res.body[prop]).to.equal(updateLeader[prop]);
          }
          done();
        });
      });
    });
  });
});
