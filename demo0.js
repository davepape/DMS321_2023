"use strict";

let count = 0;

function index(req, res)
    {
    count = count + 1;
    res.render('demo_index', { visits: count });
    }

const express = require('express');
let router = express.Router();

router.get('/', index);

module.exports = router;

