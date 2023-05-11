"use strict";

let savedInfo = { dummy: 1 };

function increment(req, res)
    {
    let answer = { 'value': parseInt(req.params.num)+1 };
    res.json(answer);
    }

function saveinfo(req, res)
    {
    console.log('saveinfo');
    console.log(req.body);
    savedInfo[req.body.name] = req.body.value;
    let answer = { 'value': parseInt(req.params.num)+1 };
    res.send('saved');
    }

function getinfo(req, res)
    {
    console.log('got request for info');
    res.json(savedInfo);
    }

const express = require('express');
let router = express.Router();

router.get('/increment/:num', increment);
router.post('/saveinfo', saveinfo);
router.get('/getinfo', getinfo);

module.exports = router;
