"use strict";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

var _db;
async function getDb() {
    if (!_db)
        {
        await client.connect();
        _db = await client.db("ajaxdemo");
        }
    return _db;
    }


function increment(req, res)
    {
    let answer = { 'value': parseInt(req.params.num)+1 };
    res.json(answer);
    }

/* save a player's score in the database */
/* note that this uses the "upsert" option, which says: if a record matching the query already exists, update it, otherwise insert a new one */
async function saveinfo(req, res)
    {
    let db = await getDb();
    let collection = db.collection("scoreboard");
    let query = { name: req.body.name };
    let update = { $set: { name: req.body.name, score: req.body.value } };
    let options = { upsert: true };
    collection.updateOne(query, update, options);
    res.send('saved');
    }

/* get all the entries from the "scoreboard" and return them as an array (in JSON) */
async function getinfo(req, res)
    {
    let db = await getDb();
    let collection = db.collection("scoreboard");
    collection.find({}).toArray(function(err,result) {
        res.json(result);
        });
    }

const express = require('express');
let router = express.Router();

router.get('/increment/:num', increment);
router.post('/saveinfo', saveinfo);
router.get('/getinfo', getinfo);

module.exports = router;
