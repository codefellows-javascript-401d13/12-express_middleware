'use strict';

const Router = require('express').Router;
const empRouter = new Router();
const jsonParser = require('body-parser').json();
const debug = require('debug')('employee:employee_routes');
const Employee = require('../model/employee.js');

module.exports = empRouter;

empRouter.post('/api/employee', jsonParser, function(req, res, next){
  debug('POST /api/employee');
  Employee.createEmployee(req.body)
  .then(employee => res.json(employee))
  .catch(err => next(err));
});

empRouter.get('/api/employee/:id', function(req, res, next){
  debug('GET /api/employee/:id');
  Employee.fetchEmployee(req.params.id)
  .then(employee => res.json(employee))
  .catch(err => next(err));
});

empRouter.get('/api/employee', function(req, res, next){
  debug('GET /api/employee');
  Employee.fetchEmployeeIDs()
  .then(id => res.json(id))
  .catch(err => next(err));
});

empRouter.put('/api/employee',jsonParser, function(req, res, next){
  debug('PUT /api/employee');
  Employee.updateEmployee(req.query.id, req.body)
  .then(employee => res.json(employee))
  .catch(err => next(err));
})
