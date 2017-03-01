'use strict';

const expect = require('chai').expect;
const request = require('superagent');

require('../server.js');
const Sneaker = require('../model/sneaker.js');
const url = `http://localhost:${process.env.PORT}`;

const exampleSneaker = {
  model: 'Air Swag 90',
  brand: 'Nike',
};

describe('Sneaker Routes', function() {
  describe('POST: /api/sneaker', function() {
    describe('with a valid request body', function() {
      it('should return a sneaker', function(done) {
        request.post(`${url}/api/sneaker`)
        .send(exampleSneaker)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.model).to.equal(exampleSneaker.model);
          expect(res.body.brand).to.equal(exampleSneaker.brand);
          // NOTE: set up temp variable for deleteSneaker
          done();
        });
      });
    });
  });
});
