var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var filmRouter = require('./routes/films');
var actorRouter = require('./routes/actors');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/mongoMovie");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/test', function(req, res){
  res.send("it works!!");
});

app.use('/api/films', filmRouter);
app.use('/api/actors', actorRouter);

app.listen(app.get('port'), function(){
  console.log(`🔥🔥🔥🔥🔥🔥 at: http://localhost:${app.get('port')}/`);
});
