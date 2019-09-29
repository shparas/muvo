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

// helper functions 
var helpers = require('./utils/helpers');

// routes import 
var routeDir = './1.1-routes/';
var signedInRoutes = require(routeDir + 'index');
var authRoutes = require(routeDir + 'users');

// controllers import
var controllerDir = './1.2-controllers/';
var errorController = require(controllerDir + 'error');

// middlewares import
var middlewareDir = './1.3-middlewares/';
var isAuth = require(middlewareDir + 'is-auth');


// constants to be used
const MONGODB_URI = "mongodb+srv://dbadmin:2aanR0Hta8nycE5C@maincluster-tcbpf.mongodb.net/test?retryWrites=true&w=majority";


// BEGIN //

// few setup
var app = express();
var store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

//var csrfProtection = csrf();

// view engine
app.set('view engine', 'ejs');
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

// flash session messages
app.use(flash());

// authentication local var
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// ERRORS
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Dev error handler (print stacktrace)
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler (no stacktraces leaked to user)
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.set('port', process.env.PORT || 3000);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(app.get('port'), function () {
			debug('Express server listening on port ' + app.get('port'));
		});
  })
  .catch(err => {
    console.log(err);
  });
