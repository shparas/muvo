'use strict';

// modules import
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
var csrf = require('csurf');
var flash = require('connect-flash');
// var multer = require('multer');
var debug = require('debug');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');

// helper functions 
var helpers = require('./utils/helpers');

// routes import 
var routeDir = './1.1-routes/';
var index = require(routeDir + 'index');
// controllers import
var controllerDir = './1.2-controllers/';
// middlewares import
var middlewareDir = './1.3-middlewares/';
var isAuth = require(middlewareDir + 'is-authorized');


// BEGIN //
var app = express();

// DB Settings
// Run this in MongoCLI: use Movo; db.createUser({ user: "dbadmin", pwd: "2aanR0Hta8nycE5C", roles: [{ role: "readWrite", db: "Muvo" }] })
const MONGODB_URI = process.env.MONGODB_URI ||
  (app.get('env') === 'development') ?
  'mongodb://dbadmin:2aanR0Hta8nycE5C@127.0.0.1:27017/Muvo' :
  'mongodb+srv://dbadmin:2aanR0Hta8nycE5C@maincluster-tcbpf.mongodb.net/test?retryWrites=true&w=majority';

// session storage setup
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

//var csrfProtection = csrf();

// view engine
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views'));

// MIDDLEWARES //
// basic configs
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.locals.helpers = helpers;

// static files
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(
  session({
    secret: 'a98zs9vJK8rDpi',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// flash session messages00
app.use(flash());

// authentication local var
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// use routes
app.use(index);



// ERRORS
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
	
// Error Handler
if (app.get('env') === 'development') {
	// Dev error handler (print stacktrace)
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
} else {
	// Production error handler (no stacktraces leaked to user)
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error.html', {
			message: err.message,
			error: {}
		});
	});
}

app.set('port', process.env.PORT || 80);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(app.get('port'), function () {
      console.log('Express server listening on port ' + app.get('port') + " on " + app.get('env') + " evironment");
    });
  })
  .catch(err => {
    console.log(err);
  });
