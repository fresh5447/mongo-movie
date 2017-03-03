var express = require('express');
var Router = new express.Router();
var Film = require('../models/film');

Router.route('/')
  .get(function(req, res) {
    Film.find(function(err, films) {
      if(err){
        console.log(err, "error finding all films");
      } else {
        res.json(films);
      }
    })
  })
  .post(function(req, res) {
    var film = new Film({
      name: req.body.name,
      genre: req.body.genre,
      rating: req.body.rating
    });
    film.save(function(err, film) {
      if(err){
        console.log(err, "Error creating a new film");
      } else {
        res.json(film)
      }
    })
  });


Router.route('/:film_id')
  .get(function(req, res) {
    Film.findById(req.params.film_id, function(err, film) {
      if(err){
        console.log(err, "Error getting a single film");
      } else {
        res.json(film);
      }
    })
  })
  .delete(function(req, res) {
    Film.remove({ _id: req.params.film_id }, function(err, msg) {
      if(err){
        console.log(err, "Could not delete that film.")
      } else {
        res.json({ message: "Successfully deleted that film!" })
      }
    })
  })
  .put(function(req, res) {
    Film.findById(req.params.film_id, function(err, film) {
      if(err){
        console.log(err, "Having trouble finding the right film to update.")
      } else {
        film.name = req.body.name ? req.body.name : film.name;
        film.genre = req.body.genre ? req.body.genre : film.genre;
        film.rating = req.body.rating ? req.body.rating : film.rating;
        film.save(function(er, f) {
          if(er){
            console.log(er, "Could not update film.")
          } else {
            res.json(f)
          }
        })
      }
    })
  })

module.exports = Router;
