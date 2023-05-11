"use strict";

let savedInfo = { dummy: 1 };

function increment(req, res)
    {
    let answer = { 'value': parseInt(req.params.num)+1 };
    res.json(answer);
    }

function saveinfo(req, res)
    {
    savedInfo[req.body.name] = req.body.value;
    res.send('saved');
    }

function getinfo(req, res)
    {
    res.json(savedInfo);
    }

const express = require('express');
let router = express.Router();

router.get('/increment/:num', increment);
router.post('/saveinfo', saveinfo);
router.get('/getinfo', getinfo);

module.exports = router;
