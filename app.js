const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');


// create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder where we keep our pug files
app.set('view engine', 'pug'); // we use the engine pug, mustache or EJS work great too

//! app.use shows that I am using middleware
// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser.urlencoded means anytime somebody submits data via a form tag what will happen is that i will get that data that has been submitted on my req.body and it is all going to be url encoded, and I do not have to worry about dissecting it from the request at all. That is part of express bodyParser package. 
//
// Exposes a bunch of methods for validating data and email stuff. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());


// Sessions allow us to store data on visitors from request to request, how long they have been  logged in, (their logged in state) any info I need to go from request to request, all that is going to be stored in the session. Sessions are stored in MongoDB Database, 
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));


//  Passport JS is what is used to handle the logins
app.use(passport.initialize());
app.use(passport.session());

// ! The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());

// below this middleware will give me all of my local helpers, 
// pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers; // that is what allows me to use the local variable H i used
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// After all that above middleware, i finally handle my own routes!
app.use('/', routes); // injection routers 

// if there is no routers found, then it is just going to keep moving on to the next middleware
// If that above routes didn't work, i 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of the error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// if I am in development 
// Otherwise this was a really bad error i didn't expect! Shoot 
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints/shows the stack trace, all the info about what is happened */
  app.use(errorHandlers.developmentErrors);
}

// in production I do not want to show the user "Oh, there is an error that happened on this line of code"
// production error handler
app.use(errorHandlers.productionErrors);

// done! export it so we can start the site in start.js
module.exports = app;
