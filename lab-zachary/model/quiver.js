'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quiverSchema = new Schema({
  title: {type: String, required: true},
  timestamp: {type: Date, required: true},
});

module.exports =  mongoose.model('quiver', quiverSchema);