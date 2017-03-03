var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mongoMovie");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/test', function(req, res){
  res.send("it works!!");
});

app.listen(app.get('port'), function(){
  console.log(`🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`);
});
