// Handles routes to index, dash, add, settings, and other 1 level get requests excepe signout

'use strict';

var express = require('express');
var router = express.Router();

const isAuthorized = require('../1.3-middlewares/is-authorized');

/* GET home page. */
router.get('/', function (req, res) {
	if (req.session.isAuthorized)
		res.redirect("/dash");
	else
		res.render("home.html", { title: 'Welcome' });
});

// Requires authorization here onwards
router.get('/dash', isAuthorized, function (req, res) {
  res.render('dash.html', { title: 'Dash' });
});

router.get('/add', isAuthorized, function (req, res) {
  res.render('add.html', { title: 'Add' });
});

router.get('/settings', isAuthorized, function (req, res) {
    res.render('settings.html', { title: 'Settings' });
});

module.exports = router;
