"use strict";

let count = 0;

function index(req, res)
    {
    if (req.session.username)
        {
        req.session.count = req.session.count + 1;
        res.render('session_index', { name: req.session.username, visits: req.session.count, url: req.baseUrl });
        }
    else
        {
        res.render('session_start');
        }
    }


function setname(req, res)
    {
    req.session.username = req.body.name;
    req.session.count = 0;
    res.redirect(req.baseUrl);
    }


const express = require('express');
let router = express.Router();

router.get('/', index);
router.post('/name', setname);

module.exports = router;

