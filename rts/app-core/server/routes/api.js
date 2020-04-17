const express = require('express');
const db = require('../db');
const router = express.Router();
const bodyParser = require('body-parser');

/*  //Image Upload Api

const multer = require('multer');

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({   dest:'uploads/',
                        storage: Storage
                    }).array("imgUploader", 3); //Field name and max count

 */

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : true}));

// CRUD Apis

//users/
router.get('/users/', async (req, res) => {
   
    try{
        let results = await db.getAllUsers();
        res.sendFile
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
        
        let result = await db.addNewUser(req.body.uname, req.body.password, req.body.email, req.body.name, req.body.surname);
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
});


//image upload api

/* router.post('/event/upload/image', upload.single(eventImage), async (req, res) => {
    console.log(req.file);
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });

}); */


module.exports = router;