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
      .done( () => done())
      .catch( err => done(err));
    });

    it('should return a note', done => {
      request.get(`${url}/api/family/${this.tempFamily.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.name).to.equal(this.tempFamily.name);
        expect(res.relation).to.equal(this.tempFamily.relation);
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
