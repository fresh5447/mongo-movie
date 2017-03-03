var mongoose = require('mongoose');
Schema = mongoose.Schema;

var ActorSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Actor', ActorSchema);
