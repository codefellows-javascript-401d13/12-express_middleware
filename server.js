'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('note:server');

const foodRouter = require('./route/food-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(morgan('dev'));
app.use(cors);

app.use(foodRouter);

app.use(errors);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
