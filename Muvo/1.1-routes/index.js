'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('home.html', { title: 'Welcome' });
});
router.get('/dash', function (req, res) {
  res.render('dash.html', { title: 'Dash' });
});
router.get('/add', function (req, res) {
  res.render('add.html', { title: 'Add' });
});

module.exports = router;
