'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const Music = require('../model/music.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleMusic = {
  genre: 'example genre',
  artist: 'example artist'
};

describe('testing music route', function(){
  describe('GET: /api/music', function(){
    before(done => {
      Music.createMusic(exampleMusic)
          .then(music => {
            this.tempMusic = music;
            done();
          })
          .catch(err => done(err));
    });

    after( done => {
      Music.deleteMusic(this.tempMusic.id)
         .then( () => done())
         .catch( err => done(err));
    });

    it('should return music', done => {
      request.get(`${url}/api/music/${this.tempMusic.id}`)
          .end((err, res) => {
            if(err) return done(err);
            expect(res.status).to.equal(200);
            expect(res.body.id).to.equal(this.tempMusic.id);
            expect(res.body.genre).to.equal(this.tempMusic.genre);
            expect(res.body.artist).to.equal(this.tempMusic.artist);
            done();
          });
    });
     
    describe('with an invalid id',function(){
      it('should respond with a 404 status code', done => {
        request.get(`${url}/api/music/6574`)
              .end((err, res) => {
                expect(res.status).to.equal(404);
                done();
              });
      });
    });
  });

  describe('POST: /api/music', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempMusic){
          Music.deleteMusic(this.tempMusic.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return an updated music', done => {
        request.post(`${url}/api/music`)
        .send(exampleMusic)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.genre).to.equal(exampleMusic.genre);
          expect(res.body.artist).to.equal(exampleMusic.artist);
          this.tempMusic = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/music', function(){
    describe('valid id and body', function(){
      before( done => {
        Music.createMusic(exampleMusic)
        .then( music => {
          this.tempMusic = music;
          done();
        })
        .catch(err => done(err));
      });
     
      after( done => {
        if(this.tempMusic){
          Music.deleteMusic(this.tempMusic.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a music', done => {
        let updateMusic = { genre: 'new genre', artist: 'new artist' };
        request.put(`${url}/api/music?id=${this.tempMusic.id}`)
        .send(updateMusic)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempMusic.id);
          for (var prop in updateMusic) {
            expect(res.body[prop]).to.equal(updateMusic[prop]);
          }
          done();
        });
      });

    });
  });
});
