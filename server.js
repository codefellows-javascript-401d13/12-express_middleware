'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('family:server');

const familyRouter = require('./route/family-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(familyRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`Server's up on port: ${PORT}`);
});
