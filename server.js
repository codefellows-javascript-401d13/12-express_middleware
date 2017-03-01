'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('music:server');

const musicRouter = require('./route/music-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(musicRouter);
app.use(errors);

app.listen(PORT, ()  => {
  debug(`server up: ${PORT}`);
});