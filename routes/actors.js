var express = require('express');
var Router = new express.Router();
var Actor = require('../models/actor');

Router.route('/')
  .get(function(req, res) {
    Actor.find()
    .populate('films')
    .exec(function(err, actors) {
      if(err){
        console.log(err, "error getting all actors")
      } else {
        res.json(actors)
      }
    })
  })
  .post(function(req, res) {
    var actor = new Actor({
      name: req.body.name
    });
    actor.save(function(err, data) {
      if(err){
        console.log(err, "Error creating new actor");
      } else {
        res.json(data);
      }
    })
  });

Router.route('/:actor_id')
  .get(function(req, res) {
    Actor.findById(req.params.actor_id)
    .populate('films')
    .exec(function(err, actor) {
      if(err){
        console.log(err, "error finding that actor");
      } else {
        res.json(actor)
      }
    })
  })
  .delete(function(req, res) {
    Actor.remove({ _id: req.params.actor_id }, function(err) {
      if(err){
        console.log(err, "Could not delete that actor");
      } else {
        res.json({ message: "actor deleted" })
      }
    })
  })
  .put(function(req, res) {
    Actor.findById(req.params.actor_id, function(err, actor) {
      if(err){
        console.log(err, "error finding that actor")
      } else {
        actor.name = req.body.name ? req.body.name : actor.name;
        actor.save(function(e, a) {
          if(e){
            console.log(e, "couldnt update actor")
          } else {
            res.json(a);
          }
        })
      }
    })
  });

module.exports = Router;
