const mongoose = require('mongoose');

module.exports = {
  start() {
    return mongoose.connect('mongodb://localhost:27017');
  }
}
