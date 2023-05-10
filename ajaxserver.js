"use strict";

function increment(req, res)
    {
    let answer = { 'value': parseInt(req.params.num)+1 };
    res.json(answer);
    }

const express = require('express');
let router = express.Router();

router.get('/increment/:num', increment);

module.exports = router;
