'use strict';

const express = require('express');
const debug = require('debug')('bike:server');
const cors = require('cors');
const morgan = require('morgan');
const Promise = require('bluebird').Promise;
const errors = require('./lib/error-middleware.js');
const quiverRouter = require('./route/quiver-route.js');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/quiverappdev';
const app = express();

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(quiverRouter);
app.use(errors);

app.listen(PORT, () => {
  debug('server up', PORT);
});