const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
  });

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;