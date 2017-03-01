'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('note:server');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(`server up: ${PORT}`);
});
