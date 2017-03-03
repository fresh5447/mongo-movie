var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  name:   String,
  genre:  String,
  rating: Number,
});

module.exports = mongoose.model('Film', FilmSchema);
