var express = require('express');
var Router = new express.Router();
var Film = require('../models/film');

Router.route('/')
  .get(function(req, res) {
    res.json({ message: 'You have found the film routes!' })
  });

module.exports = Router;
