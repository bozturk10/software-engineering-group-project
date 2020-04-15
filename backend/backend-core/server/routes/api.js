const express = require('express');
const db = require('../db');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

// CRUD Apis

//users/
router.get('/users/', async (req, res) => {
   
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

router.post('/users/add', async (req, res) => {
    try {
        console.log('Request Body: ', req.body );
        let result = await db.addNewUser(req.body.username, req.body.password, req.body.email);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

//events/
router.get('/events/', async (req, res, next) => {
    try {
        let results = await db.getEvents();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        let results = await db.getEventById(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
 
router.post('/events/add', async (req, res) => {
    try {
        console.log('Request Body: ', req.body );
        let result = await db.addNewEvent(req.body.title, req.body.detail, req.body.address, req.body.date, 
                                            req.body.capacity, req.body.imagePath)
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

module.exports = router;