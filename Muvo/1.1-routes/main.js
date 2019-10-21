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

router.get('/dash', isAuthorized, function (req, res) {
  res.render('dash.html', { title: 'Dash' });
});

router.get('/add', function (req, res) {
  res.render('add.html', { title: 'Add' });
});

module.exports = router;
