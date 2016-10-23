var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var config       = require('./config.js');
var mongoose     = require('mongoose');
var passport     = require('passport');
var userModel    = require('./models/userModel.js');
var flash        = require('connect-flash');


var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// connect to MongoDB database
mongoose.connect(config.database);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({resave : true , saveUninitialized : false , secret : config.secret}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./auth.js')(passport , app , userModel);


app.get('/' , function(req,res){
  return res.render('index');
});

app.use('/', isLoggedIn,routes);
app.use('/api',passport.authenticate('jwt', { session: false , failureRedirect : '/401'}) ,api);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('auth' , 'unauthorized Routes');
  res.redirect('/#/login');
}



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
