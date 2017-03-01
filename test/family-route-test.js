'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Family = require('../model/family.js');
const url = `http://localhost:${process.env.PORT}`;

require('../server.js');

const exampleFamily = {
  name: 'Jennifer',
  relation: 'sister'
};

describe('Family Routes', function() {

  describe('GET: /api/family', function() {
    describe('with a valid id', function() {
      before( done => {
        Family.createFamily(exampleFamily)
        .then( family => {
          this.tempFamily = family;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        Family.deleteFamily(this.tempFamily.id)
        .then( () => done())
        .catch( err => done(err));
      });

      it('should return a note', done => {
        request.get(`${url}/api/family/${this.tempFamily.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempFamily.id);
          expect(res.body.name).to.equal(this.tempFamily.name);
          expect(res.body.relation).to.equal(this.tempFamily.relation);
          done();
        });
      });

      describe('with an invalid id', function() {
        it('should return a 404 error', done => {
          request.get(`${url}/api/family/123456789`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            done();
          });
        });
      });
    });
  });

  describe('POST: /api/family', function() {
    describe('with a valid body', function() {
      after( done => {
        if (this.tempFamily) {
          Family.deleteFamily(this.tempFamily.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a note', done => {
        request.post(`${url}/api/family`)
        .send(exampleFamily)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleFamily.name);
          expect(res.body.relation).to.equal(exampleFamily.relation);
          this.tempFamily = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/family', function() {
    describe('with a valid id and body', function() {
      before( done => {
        Family.createFamily(exampleFamily)
        .then( family => {
          this.tempFamily = family;
          done();
        })
        .catch( err => done(err));
      });

      after( done => {
        if (this.tempFamily) {
          Family.deleteFamily(this.tempFamily.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return an updated family', done => {
        let updatedFamily = { name: 'Jill', relation: 'mom' };
        request.put(`${url}/api/family/?id=${this.tempFamily.id}`)
        .send(updatedFamily)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempFamily.id);
          for (var prop in updatedFamily) {
            expect(res.body[prop]).to.equal(updatedFamily[prop]);
          }
          done();
        });
      });
    });
  });

  // describe('GET: /api/family', function() {
  //   describe('without a specific id parameter', function() {
  //     it('should return a list of ids', function(done) {
  //       let fam = [
  //         { name: 'Devin', relation: 'cousin'},
  //         { name: 'Nicholas', relation: 'cousin'},
  //         { name: 'Andrea', relation: 'cousin'}
  //       ];
  //       let famObjs = [];
  //
  //       before( done => {
  //         for (var cuz in fam) {
  //           Family.createFamily(cuz)
  //           .then( obj => {
  //             famObjs.push(obj);
  //           })
  //           .catch( err => done(err));
  //         }
  //         done();
  //       });
  //
  //       after( done => {
  //         if (famObjs.length > 0) {
  //           for (var objs in famObjs) {
  //             Family.deleteFamily(objs)
  //             .catch( err => done(err));
  //           }
  //           done();
  //         }
  //       });
  //     });
  //   });
  // });
});
