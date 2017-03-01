'use strict';
'use strict';

const express = require('express');
const debug = require('debug')('sneaker:server');
const morgan = require('morgan');

const sneakerRouter = require('./route/sneaker-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const app = express();
const PORT = process.env.PORT || 3000;

////// req midwarez \\\\\\
app.use(morgan('dev'));
app.use(cors);

////// rizzoutes \\\\\\
app.use(sneakerRouter);

////// dem errrrz \\\\\\
app.use(errors);

app.listen(PORT, () => debug(`Servin' it up on ${PORT}`));
