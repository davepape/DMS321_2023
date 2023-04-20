"use strict";

const express = require('express');
let app = express();

app.set('view engine', 'ejs');
app.use(function (req,res,next) { res.set('Cache-Control','no-store'); next(); });
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

/* note: the returned page is not a valid, complete HTML page, but it's enough for testing */
app.get('/', function (req, res) {
    res.send('<p>Hello World, from express</p>');
    });

app.use('/demo', require('./demo1.js'));

let port = process.env.NODE_PORT;

let server = app.listen(port, function () {
                console.log(`server started on port ${port}`);
                });

