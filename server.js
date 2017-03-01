'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('fish:server');

const fishRouter = require('./route/fish-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();
debug('server');
app.use(morgan('dev'));
app.use(cors);
app.use(fishRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`server up at: ${PORT}`);
});
