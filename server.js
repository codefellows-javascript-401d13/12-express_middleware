'use strict';

const morgan = require('morgan');
const express = require('express');
// const createError = require('http-errors');
const debug = require('debug')('journal:server');

const journalRouter = require('./route/journal-route.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(journalRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
