'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('employee:employee');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Employee = module.exports = function(name, title){
  debug('Employee constructor')
  if(!name) throw createError(400, 'Name not provided');
  if(!title) throw createError(400, 'Title not provided');

  this.name = name;
  this.title = title;
  this.id = uuid.v1();
}

Employee.createEmployee = function(_employee){
  debug('createEmployee');
  try{
    var employee = new Employee(_employee.name, _employee.title);
    return storage.createItem('employee', employee);
  } catch(err){
    return Promise.reject(err);
  }
};

Employee.fetchEmployee = function(id){
  debug('fetchEmployee');
  return storage.fetchItem('employee', id);
};

Employee.deleteEmployee = function(id){
  debug('deleteEmployee');
  return storage.deleteItem('employee', id);
};

Employee.updateEmployee = function(id, _employee){
  debug('updateEmployee');
  storage.fetchItem('employee', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then(employee => {
    for(var prop in employee){
      if(prop === 'id') continue;
      if(_employee[prop]) employee[prop] = _employee[prop]
    }
    return storage.createItem('employee', employee)
  });
};

Employee.fetchEmployeeIDs = function(){
  debug('fetchIDs');
  return storage.fetchIDs('employee');
}
