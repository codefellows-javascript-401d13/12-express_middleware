'use strict';

const express = require('express');
const debug = require('debug')('rwby:server');
const morgan = require('morgan');

const noteRouter = require('./route/rwby-router.js');
const error = require('./lib/error-middleware.js');
const cors = require('./lib/cors-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(noteRouter);
app.use(error);


app.listen(PORT, function(){
  debug(`Server up on ${PORT}`);
});
