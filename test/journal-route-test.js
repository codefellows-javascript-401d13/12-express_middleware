'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Journal = require('../model/journal.js');
const url = 'http://localhost:3000';

require('../server.js');

const exampleJournal = {
  author: 'example author',
  entry: 'example entry'
};

describe('Journal Routes', function(){
  describe('GET: /api/journal', function(){
    before( done => {
      Journal.createJournal(exampleJournal)
      .then( journal => {
        this.tempJournal = journal;
        done();
      })
      .catch( err => done(err));
    });
    after ( done => {
      Journal.deleteJournal(this.tempJournal.id)
      .then( () => done())
      .catch( err => done(err));
    });

    it('should return a journal', done => {
      request.get(`${url}/api/journal/${this.tempJournal.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(this.tempJournal.id);
        expect(res.body.author).to.equal(this.tempJournal.author);
        expect(res.body.entry).to.equal(this.tempJournal.entry);
        done();
      });
    });

    describe('with an invalid id', function() {
      it('should respond witha a 404 status code', done => {
        request.get(`${url}/journal/123456789`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST: /api/journal', function() {
    describe('with a valid body', function(){
      after( done => {
        if (this.tempJournal) {
          Journal.deleteJournal(this.tempJournal.id)
          .then( () => done())
          .catch( err => done(err));
        }
      });

      it('should return a journal', done => {
        request.post(`${url}/api/journal`)
        .send(exampleJournal)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.author).to.equal(exampleJournal.author);
          expect(res.body.entry).to.equal(exampleJournal.entry);
          this.tempJournal = res.body;
          done();
        });
      });
    });
  });

  describe('PUT: /api/journal/', function(){
    describe('with a valid id and body', function(){
      before( done => {
        Journal.createJournal(exampleJournal)
        .then( journal => {
          this.tempJournal = journal;
          done();
        })
        .catch( err => done(err));
      });
      after( done => {
        if(this.tempJournal) {
          Journal.deleteJournal(this.tempJournal.id)
          .then( () => done())
          .catch(done);
        }
      });

      it('should return a journal', done => {
        let updateJournal = { author: 'new author', entry: 'new entry' };
        request.put(`${url}/api/journal?id=${this.tempJournal.id}`)
        .send(updateJournal)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempJournal.id);
          for (var prop in updateJournal) {
            expect(res.body[prop]).to.equal(updateJournal[prop]);
          }
          done();
        });
      });
    });
  });
});
