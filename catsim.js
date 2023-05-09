"use strict";

let catBreeds = [ 
        { breedname: "tabby cat", breedprice: 10, image: "cat1.png" },
        { breedname: "white cat", breedprice: 8, image: "cat2.png" },
        ];

function index(req, res)
    {
    if (req.session.username)
        {
        let message = req.session.message;
        req.session.message = '';
        res.render('catsim_index', { session: req.session, message: message });
        }
    else
        {
        res.redirect(req.baseUrl+'/start');
        }
    }


function deepcopy(a)
    {
    return JSON.parse(JSON.stringify(a));
    }


function setname(req, res)
    {
    req.session.username = req.body.name;
    req.session.money = 100;
    req.session.food = 100;
    req.session.catlist = [];
    req.session.turn = 1;
    req.session.catbreeds = deepcopy(catBreeds);
    req.session.message = '';
    req.session.url = req.baseUrl;
    res.redirect(req.baseUrl);
    }


function restartconfirm(req, res)
    {
    res.render('catsim_restart_confirm', { session: req.session });
    }

function choosecat(req, res)
    {
    res.render('catsim_choosecat', { session: req.session });
    }

function buycat(req, res)
    {
    let breed = req.session.catbreeds[req.params.num];
    req.session.money -= breed.breedprice;
    req.session.catlist.push(req.params.num);
    res.redirect(req.baseUrl);
    }

function nextturn(req, res)
    {
    req.session.turn++;
    req.session.food -= req.session.catlist.length;
    req.session.message += `Your cats ate ${req.session.catlist.length} units of food<br>`;
    if ((req.session.catlist.length > 0) && (Math.random() < 0.33))
        {
        let runaway = Math.floor(Math.random() * req.session.catlist.length);
        req.session.message += `<em>Cat #${runaway} ran away!</em>`;
        req.session.catlist.splice(runaway, 1);
        }
    res.redirect(req.baseUrl);
    }

function restartconfirm(req, res)
    {
    res.render('catsim_restart_confirm', { session: req.session });
    }


function restart(req, res)
    {
    req.session.username = null;
    req.session.url = req.baseUrl;
    res.render('catsim_start', { session: req.session });
    }

const express = require('express');
let router = express.Router();

router.get('/', index);
router.get('/start', restart);
router.get('/restart', restart);
router.post('/setname', setname);
router.get('/restartconfirm', restartconfirm);
router.get('/choosecat', choosecat);
router.get('/buycat/:num', buycat);
router.get('/nextturn', nextturn);

module.exports = router;

