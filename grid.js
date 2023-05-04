"use strict";

let defaultGameboard = [
                [ 0, 0, 0, 0],
                [ 0, 0, 0, 0],
                [ 0, 0, 0, 0]
                ];

let boardAssets = [ "blank.png", "cat1.png", "cat2.png" ];

let catPrices = [ 0, 20, 25];

function index(req, res)
    {
    if (req.session.username)
        {
        res.render('grid_index', { session: req.session });
        }
    else
        {
        req.session.url = req.baseUrl;
        res.render('grid_start', { session: req.session });
        }
    }


function deepcopy(a)
    {
    return JSON.parse(JSON.stringify(a));
    }


function setname(req, res)
    {
    req.session.username = req.body.name;
    req.session.board = deepcopy(defaultGameboard);
    req.session.boardAssets = deepcopy(boardAssets);
    req.session.money = 100;
    req.session.url = req.baseUrl;
    res.redirect(req.baseUrl);
    }


function restartconfirm(req, res)
    {
    res.render('grid_restart_confirm', { session: req.session });
    }


function restart(req, res)
    {
    res.render('grid_start', { session: req.session });
    }


function chooseplace(req, res)
    {
    res.render('grid_chooseplace', { session: req.session, toPlace: req.params.num });
    }


function placecat(req,res)
    {
    req.session.board[req.params.row][req.params.col] = req.params.num;
    req.session.money -= catPrices[req.params.num];
    res.redirect(req.session.url);
    }


function choosesell(req, res)
    {
    res.render('grid_choosesell', { session: req.session });
    }


function sellcat(req,res)
    {
    let num = req.session.board[req.params.row][req.params.col];
    req.session.money += catPrices[num]/2;
    req.session.board[req.params.row][req.params.col] = 0;
    res.redirect(req.session.url);
    }

const express = require('express');
let router = express.Router();

router.get('/', index);
router.post('/setname', setname);
router.get('/restart', restart);
router.get('/restartconfirm', restartconfirm);
router.get('/chooseplace/:num', chooseplace);
router.get('/place/:num/:row/:col', placecat);
router.get('/choosesell', choosesell);
router.get('/sell/:row/:col', sellcat);

module.exports = router;

