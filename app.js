var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session      = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var config = require( './config' );
config.db.user = config.db.username;

var sessionStore = new MySQLStore( config.db );


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   key: config.cookieName,
//   secret: config.cookieSecret,
//   store: sessionStore,
//   resave: true,
//   saveUninitialized: true
// }));

// console.log(config.cookieName , "------------------");
app.use(session({
    resave: true,
    saveUninitialized: true,
    key: config.cookieName,
    secret: config.cookieSecret,
    store: new MySQLStore({
      host: config.db.host,
      user: config.db.username,
      password: config.db.password,
      database: config.db.database,
      useConnectionPooling: true,
      autoReconnect: true,
      reconnectDelay: 500,
    })
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
