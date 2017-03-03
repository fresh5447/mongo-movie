var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FilmSchema = new Schema({
  name:   String,
  genre:  String,
  rating: Number,
  actors: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Actor' } ]
});

module.exports = mongoose.model('Film', FilmSchema);
