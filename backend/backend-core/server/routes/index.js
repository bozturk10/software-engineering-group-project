const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

const db = require('../db');
const router = express.Router();

//Login Auth Api




// CRUD Apis
router.get('/users/', async (req, res, next) => {
   
    try{
        let results = await db.getAllUsers();
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }

});

router.get('/users/:id', async (req, res, next) => {
    try{
        let results = await db.getUserById(req.params.id);
        res.json(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/events/', async (req, res, next) => {
    try {
        let results = await db.getEvents();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/events/:id', async (req, res, next) => {
    try {
        let results = await db.getEventById(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})
 
module.exports = router;