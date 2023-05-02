"use strict";

const { MongoClient, ServerApiVersion, ObjectID } = require('mongodb');
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let _db;
async function getDb()
    {
    if (!_db)
        {
        await client.connect();
        _db = await client.db("sample_mflix");
        }
    return _db;
    }


async function index(req, res)
    {
    if (req.body.title)
        {
        let db = await getDb();
        let collection = db.collection("movies");
        let query = { title: new RegExp(req.body.title, "i") };
        collection.find(query).limit(10).toArray(function (err,result) {
            if (err) { console.log(err); res.send(500); return; }
            res.render('moviesearch', { movies: result });
            });
        }
    else
        {
        res.render('moviesearch', { movies: [] });
        }
    }

const express = require('express');
let router = express.Router();

router.get('/', index);
router.post('/', index);

module.exports = router;
