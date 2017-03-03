var express = require('express');
var Router = new express.Router();
var Film = require('../models/film');
var Actor = require('../models/actor');

// 58b9b456e7fce376c789e0aa
// 58b9b45ce7fce376c789e0ab

Router.route('/')
  .get(function(req, res) {
    Film.find()
    .populate('actors')
    .exec(function(err, films) {
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
      rating: req.body.rating,
      actors: req.body.actors
    });
    film.save(function(err, film) {
      if(err){
        console.log(err, "Error creating a new film");
      } else {
        film.actors.forEach(function(item) {
          return Actor.findById(item, function(er, act) {
            if(er){
              console.log(er, "can not find actor")
            } else {
              act.films.push(film._id);
              act.save();
            }
          })
        })
        res.json(film);
      }
    })
  });


Router.route('/:film_id')
  .get(function(req, res) {
    Film.findById(req.params.film_id)
    .populate('actors')
    .exec(function(err, film) {
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
        film.actors = req.body.actors ? req.body.actors : film.actors;
        film.save(function(er, f) {
          if(er){
            console.log(er, "Could not update film.")
          } else {
            film.actors.forEach(function(item) {
              return Actor.findById(item, function(er, act) {
                if(er){
                  console.log(er, "can not find actor")
                } else {
                  act.films.push(film._id);
                  act.save();
                }
              })
            })
            res.json(f);
          }
        })
      }
    })
  })

module.exports = Router;
