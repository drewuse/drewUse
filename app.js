var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var createError = require('http-errors');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var sellRouter = require('./routes/sellForm');
var profileRouter = require('./routes/profile')
var chatRouter = require('./routes/chat');
var googleAuthRouter = require('./routes/authentication')
var logoutRouter = require('./routes/logout')

var hbs = require('express-handlebars');
var expressValidator = require('express-validator');
const expressSession = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

// view engine setup
var handlebars = hbs.create({
  helpers: {
    ifEquals: function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    },
  },
  extname: 'hbs',
  defaultLayout:'layout.hbs',
  layoutsDir:__dirname+'/views/layouts/'
});

app.use(function(req,res,next){
  res.io =io;
  next();
});



app.engine('hbs', handlebars.engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(expressSession({secret:'max', saveUninitialized:false, resave:false}));
app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'default_session_secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/sell', sellRouter);
app.use('/profile', profileRouter);
app.use('/chat',chatRouter);
app.use('/auth/google/callback', googleAuthRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'DrewUse'});
});


module.exports = {app:app, server:server};
