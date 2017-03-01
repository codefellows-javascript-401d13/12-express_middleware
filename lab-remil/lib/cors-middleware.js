'use strict';

const debug = require('debug')('sneaker:cors-middleware');

module.exports = function(req, res, next) {
  debug('cors middleware');

  res.append('Access-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  next();
};
