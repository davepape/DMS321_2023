"use strict";

let count = 0;

function index(req, res)
    {
    count = count + 1;
    res.render('demo_index', { visits: count });
    }

/* Code adapted from ExpressJS community examples - https://github.com/expressjs/express/tree/master/examples/ejs */
// Dummy users
var users = [
  { name: 'tobi', email: 'tobi@learnboost.com' },
  { name: 'loki', email: 'loki@learnboost.com' },
  { name: 'jane', email: 'jane@learnboost.com' }
];

function listusers (req, res)
    {
    res.render('demo_users', {
        users: users,
        title: "EJS example",
        header: "Some users"
        });
    }

const express = require('express');
let router = express.Router();

router.get('/', index);
router.get('/users', listusers);

module.exports = router;

