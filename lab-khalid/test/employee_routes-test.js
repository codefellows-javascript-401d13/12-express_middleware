'use strict';
const expect = require('chai').expect;
const request = require('superagent');
const Employee = require('../model/employee.js');
const url = 'http://localhost:8000';
require('../server.js');

const exampleEmployee = {
  name: 'khalid',
  title: 'Developer'
}

describe('Employee routes', function(){

  describe('GET /api/employee', function(){
    describe('With a valid id', function(){
      before( done => {
        Employee.createEmployee(exampleEmployee)
        .then(employee => {
          this.tempEmployee = employee;
          done();
        })
        .catch(err => done(err));
      });
      after( done => {
        Employee.deleteEmployee(this.tempEmployee.id)
        .then(() => done())
        .catch(err => done(err));
      });
      it('Should get an employee', done => {
        request.get(`${url}/api/employee/${this.tempEmployee.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.id).to.equal(this.tempEmployee.id);
          expect(res.body.name).to.equal(this.tempEmployee.name);
          expect(res.body.title).to.equal(this.tempEmployee.title);
          done();
        });
      });
    });
    describe('with an invalid Id ', function(){
      it('Should respond with a 404 status error', done => {
        request.get(`${url}/api/employee/83492834`)
        .end((err, res) => {
          console.log('THIS IS THE STAT :', res.status);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST /api/employee', function(){
    describe('with a valid body', function(){
      after( done => {
        if(this.tempEmployee){
          Employee.deleteEmployee(this.tempEmployee.id)
          .then(() => done())
          .catch(err => done(err));
        }
      });
      it('should return an employee', done => {
        request.post(`${url}/api/employee`)
        .send(exampleEmployee)
        .end((err, res) =>{
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(exampleEmployee.name);
          expect(res.body.title).to.equal(exampleEmployee.title);
          this.tempEmployee = res.body;
          done();
        });
      });
    });
  });

  describe('PUT /api/employee', function(){
    describe('with a valid id and body', function(){
      before( done => {
        Employee.createEmployee(exampleEmployee)
        .then(employee => {
          this.tempEmployee = employee;
          done();
        })
        .catch(err => done(err));
      });
      after( done => {
        if(this.tempEmployee){
          Employee.deleteEmployee(this.tempEmployee.id)
          .then(done())
          .catch(done());
        }
      });
      it('should return an employee', done => {
        let update = {name : 'Homer Simpson', title : 'Nuclear engineer'};
        request.put(`${url}/api/employee?id=${this.tempEmployee.id}`)
        .send(update)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(this.tempEmployee.name)
          for(var prop in update){
            expect(res.body[prop]).to.equal(update[prop]);
          }
          done();
        });
      });
    });
  });
});
