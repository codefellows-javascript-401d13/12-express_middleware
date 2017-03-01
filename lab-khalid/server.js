'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const createError = require('http-errors');
const debug = require('debug')('employee:server');
const morgan = require('morgan');
const employeeRouter = require('./route/employee_routes.js');
const cors = require('./lib/cors-middleware.js');
const error = require('./lib/error-middleware.js');
app.use(morgan('dev'));
app.use(cors);
app.use(employeeRouter);
app.use(error);

app.listen(PORT, () => debug('SERVER UP AT ', PORT));
