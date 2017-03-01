'use strict';

const debug = require('debug')('blog:server');
const express = require('express');
const morgan = require('morgan');

const blogRouter = require('./route/blog-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = 3003;
const app = express();

//sequence is important for next() to work as intended!
app.use(morgan('dev'));
app.use(cors);
app.use(blogRouter);
app.use(errors);

app.listen(PORT, () => { debug(`server up: ${PORT}`); } );
