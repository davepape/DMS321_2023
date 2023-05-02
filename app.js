"use strict";

const express = require('express');
let app = express();

/* Set up to use sessions; ATLAS_SESSION_URI and SESSION_SECRET should be defined in your .bashrc */
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sess_uri = process.env.ATLAS_SESSION_URI;
app.use(session({ secret: process.env.SESSION_SECRET,
                  store: MongoStore.create({ mongoUrl: sess_uri }),
                  resave: false,
                  saveUninitialized: false,
                  cookie: { maxAge: 24*60*60*1000 }}))

/* Misc configuration */
app.set('view engine', 'ejs');
app.use(function (req,res,next) { res.set('Cache-Control','no-store'); next(); });

/* Enable serving of static files (html, css, images, etc) when not using Passenger */
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

/* Use body-parser for any input forms on the site */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

/* note: the returned page is not a valid, complete HTML page, but it's enough for testing */
app.get('/', function (req, res) {
    res.send('<p>Hello World, from express</p>');
    });

/* Uncomment any of the following lines as needed, to include the different bits of example code that you might be using: */
//app.use('/demo', require('./demo.js'));
//app.use('/chat', require('./chat.js'));
//app.use('/movie', require('./movie.js'));
//app.use('/cookies', require('./cookies.js'));
app.use('/session', require('./sessiondemo.js'));

/* Change this port number to something unique; everyone must use a different port for testing */
let port = 18702;

let server = app.listen(port, function () {
                console.log(`server started on port ${port}`);
                });

