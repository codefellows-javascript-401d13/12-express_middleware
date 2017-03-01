'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('bike:server');

const cors = require('./lib/cors-middleware.js');
const errorMiddleware = require('./lib/error-middleware.js');
const bikeRouter = require('./route/bike-route.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors);
app.use(bikeRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  debug('server up', PORT);
});