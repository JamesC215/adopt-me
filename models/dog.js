const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSchema = new Schema({
  image: String,
  name: String,
  age : Number,
  description: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Dog', dogSchema);