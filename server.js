'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

const guitarRouter = require('./route/guitar-router.js');
const errors = require('./lib/error-middleware.js');
const cors = require('./lib/cors-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);

app.use(guitarRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`yo my server is lit ${PORT}`);
});
