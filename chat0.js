"use strict";

let postings = [];

function index(req, res)
    {
    res.render('chat', { postings: postings });
    }

function newposting(req,res)
    {
    let newpost = { name: req.body.yourname, message: req.body.yourmessage };
    postings.push(newpost);
    res.redirect(req.baseUrl);
    }

const express = require('express');
let router = express.Router();

router.get('/', index);
router.post('/post', newposting);

module.exports = router;

