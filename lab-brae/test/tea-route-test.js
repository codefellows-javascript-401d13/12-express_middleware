'use strict';

const expect = require('chai').expect;
const request = require('superagent');
const Tea = require('../model/tea.js');
const url = 'http://localhost:8000';

require('../server.js');

const exampleTea = {
    type: 'example type',
    flavor: 'example flavor'
};

describe('Tea Routes', function() {

    describe('GET: /api/tea', function() {
        describe('with a valid id', function() {
            before( done => {
                Tea.createTea(exampleTea)
                .then( tea => {
                    this.tempTea = tea;
                    done();
                })
                .catch( err => done(err));
            });

            after( done => {
                Tea.deleteTea(this.tempTea.id)
                .then( () => done())
                .catch( err => done(err));
            });

            it('should return tea', done => {
                request.get(`${url}/api/tea/${this.tempTea.id}`)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.id).to.equal(this.tempTea.id);
                    expect(res.body.type).to.equal(this.tempTea.type);
                    expect(res.body.flavor).to.equal(this.tempTea.flavor);
                    done();
                });
            });

            describe('with an invalid id', function() {
                it('should respond with a 404 status code', done => {
                    request.get(`${url}/api/tea/123456789`)
                    .end((err, res) => {
                        expect(res.status).to.equal(404);
                        done();
                    });
                });
            });
        });
    });

    describe('POST: /api/tea', function() {
        describe('with a valid body', function() {
            after( done => {
                if (this.tempTea) {
                    Tea.deleteTea(this.tempTea.id)
                    .then( ()=> done())
                    .catch( err => done(err));
                }
            });

            it('should return tea', done => {
                request.post(`${url}/api/tea`)
                .send(exampleTea)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.type).to.equal(exampleTea.type);
                    expect(res.body.flavor).to.equal(exampleTea.flavor);
                    this.tempTea = res.body;
                    done();
                });
            });
        });
    });

    describe('PUT: /api/tea', function() {
        describe('with a valid id and body', function() {
            before( done => {
                Tea.createTea(exampleTea)
                .then( tea => {
                    this.tempTea = tea;
                    done();
                })
                .catch( err => done(err));
            });

            after( done => {
                if (this.tempTea) {
                    Tea.deleteTea(this.tempTea.id)
                    .then( () => done())
                    .catch(done);
                }
            });

            it('should return tea', done => {
                let updateTea = { type: 'new type', flavor: 'new flavor '};
                request.put(`${url}/api/tea?id=${this.tempTea.id}`)
                .send(updateTea)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.equal(200);
                    expect(res.body.id).to.equal(this.tempTea.id);
                    for (var prop in updateTea) {
                        expect(res.body[prop]).to.equal(updateTea[prop])
                    }
                    done();
                });
            });
        });
    });
});