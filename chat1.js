"use strict";

const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const MAX_POSTS_TO_SHOW=3

let _db;
async function getDb()
    {
    if (!_db)
        {
        await client.connect();
        _db = await client.db("chat");
        }
    return _db;
    }


async function index(req, res)
    {
    let username = '';
    if (req.query.username)
        username = req.query.username;
    let db = await getDb();
    let collection = db.collection("postings");
    collection.find({}).sort({timestamp: -1}).limit(MAX_POSTS_TO_SHOW).toArray(function (err,result) {
        result.reverse();
        res.render('chat', { postings: result, username: username });
        });
    }

async function newposting(req,res)
    {
    let newpost = { name: req.body.yourname, message: req.body.yourmessage, timestamp: Date.now() };
    let db = await getDb();
    db.collection("postings").insertOne(newpost, function (err, result) {
        if (err) { console.log(err); return; }
        res.redirect(req.baseUrl + `?username=${req.body.yourname}`);
        });
    }


const express = require('express');
let router = express.Router();

router.get('/', index);
router.post('/post', newposting);

module.exports = router;
