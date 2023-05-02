"use strict";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


let _db;
async function getDb()
    {
    if (!_db)
        {
        await client.connect();
        _db = await client.db("cookies");
        }
    return _db;
    }



function startSurvey(req, res)
    {
    if (req.session.surveyDone)
        {
        let data = { name: req.session.name, monster: req.session.monster, web: req.session.web, sess: JSON.stringify(req.session, null, 4) };
        res.render("cookieresults", data);
        }
    else
        {
        req.session.surveyDone = false;
        res.redirect('/cookiename.html');
        }
    }


function answerQ0(req, res)
    {
    req.session.name = req.body.name;
    res.redirect('/cookiemonster.html');
    }


function answerQ1(req, res)
    {
    req.session.monster = req.body.choice;
    res.redirect('/cookieweb.html');
    }


function answerQ2(req, res)
    {
    req.session.web = req.body.choice;
    req.session.surveyDone = true;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    storeAnswers(req.session, ip);
    res.redirect('/cookies');
    }


async function storeAnswers(sess, ip)
    {
    let db = await getDb();
    let collection = db.collection("cookiesurvey");
    let obj = { name: sess.name, monster: sess.monster, web: sess.web, ipaddr: ip, timestamp: Date() };
    collection.insertOne(obj, function (err,result) {
        if (err) { throw err; }
        });
    }


async function summary(req, res)
    {
    let db = await getDb();
    let collection = db.collection("cookiesurvey");
    collection.find({}).toArray(function (err,result) {
        if (err) { throw err; }
        res.render("cookiesummary", { allResults: result });
        });
    }


const express = require('express');
let router = express.Router();

router.get('/', startSurvey);
router.post('/q0', answerQ0);
router.post('/q1', answerQ1);
router.post('/q2', answerQ2);
router.get('/summary', summary);

module.exports = router;
