'use strict';

const PORT = 3003;
const debug = require('debug')('blog:server');
const express = require('express');
const morgan = require('morgan');

const blogRouter = require('./route/blog-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const app = express();

debug(morgan('dev'));

app.use(blogRouter);
app.use(cors);
app.use(errors);

app.listen(PORT, () => { debug(`server up: ${PORT}`); } );
