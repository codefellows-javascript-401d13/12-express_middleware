'use strict';
//cross origin resouce sharing from any endpoint
module.exports = function(req, res, next) {
  res.append('Acces-Control-Allow-Origin', '*');
  res.append('Access-Control-Allow-Headers', '*');
  next();
};