'use strict';

const request = ('superagent');
const expect = require('chai').expect;
const Rwby = require('../model/rwby.js');
const url = 'https://localhost:3000';

require('../server.js');

const exampleRwby = {
  name: 'Weiss Schnee',
  weapon: 'rapier'
};

describe('RWBY Routes', function(){
  describe('GET api/rwby', function(){
    before(done => {
      Rwby.createRwby(exampleRwby)
      .then( rwby => {
        this.tempRwby = rwby;
        done();
      })
      .catch(err => done(err));
    });
    after(done => {
      Rwby.deleteNote(this.tempRwby.id)
      .then(() => done())
      .catch(err => done(err));
    });
    it('should return a rwby character', done => {
      request.get(`${url}/api/rwby/${this.tempRwby.id}`)
      .end((res, err) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(this.tempRwby.name);
        expect(res.body.weapon).to.equal(this.tempRwby.weapon);
      });
    });
  });
});
