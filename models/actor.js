var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: String,
  films: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Film' } ]
});

module.exports = mongoose.model('Actor', ActorSchema);
