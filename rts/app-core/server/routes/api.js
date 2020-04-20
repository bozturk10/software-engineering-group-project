const express = require('express');
const db = require('../db');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destPath = path.resolve('./static/uploads');
        console.log("Destination path:  ", destPath );
        cb(null, destPath);
    },
    filename: (req, file, cb) => {
        let ts = Date.now();
        cb(null, ts + '_' + file.originalname );  
    }
  });
   
var upload = multer({ storage: storage });

//Image Upload Api


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

//get event by id
router.get('/events/:id',  async (req, res) => {
    try {
        let result =  await db.getEventById(req.params.id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Add event without image upload
/* router.post('/events/add', async (req, res) => {
    try {
        console.log('Request Body: ', req.body );
        let result = await db.addNewEvent(req.body.title, req.body.detail, req.body.address, req.body.date, 
                                            req.body.capacity, req.body.imagePath)
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}); */

//company
router.post('/company/add', upload.single('myFile') ,async (req, res, next) => {

    try {
        console.log("Attached file: ", req.file); 
        console.log("Request body: ",req.body);       
        const file = req.file;
        
        if (!file) {
            console.log("No file received");
            res.send("No File is attached. Please add a file");
        }

        //Relative to static directory
        let filePath = 'uploads/'+ file.filename;
        console.log("file received: ", filePath);

        var atype="LOCAL";
        let db_result1= await db.addNewLocalAdmin(req.body.companyusername,req.body.companypassword,req.body.companyemail,atype);
        let db_result = await db.addNewCompany(req.body.companyusername,req.body.companyname,req.body.companyaddress,filePath);
        res.json({message:'event is added'});
  
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//tickets
router.post('/ticket/buy/:eid', async (req, res) => {
    try {
        console.log('berko' );   
        console.log('Request Body: ', req.body );   
        let event= await db.getEventById(req.params.eid);
        if(event.remainingseat < req.body.peoplenumber   ){
            res.send("no seats left for this event");
        }
        else {

            let result = await db.addNewTicket(req.body.userid,req.body.peoplenumber,req.params.eid);
            res.json(result);

        }

    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})












// Add events with image upload
router.post('/events/add', upload.single('myFile') ,async (req, res, next) => {

    try {
        console.log("Attached file: ", req.file); 
        console.log("Request body: ",req.body);       
        const file = req.file;
        
        if (!file) {
            console.log("No file received");
            res.send("No File is attached. Please add a file");
        }

        //Relative to static directory
        let filePath = 'uploads/'+ file.filename;
        console.log("file received: ", filePath);

        var title = ((req.body.title == '') ? 'NULL' : req.body.title);
        var detail = ((req.body.detail == '') ? 'NULL' : req.body.detail);
        var address = ((req.body.address == '') ? 'NULL' : req.body.address);
        var date = ((req.body.date == '') ? '2020-10-10' : req.body.date);
        var capacity = ((req.body.capacity == '') ? 0 : req.body.capacity);
        console.log(title, detail, address, date, capacity, filePath);

        let db_result = await db.addNewEvent(title, detail, address, date, capacity, filePath);
        res.json({message:'event is added'});
  
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});


//Generic file upload request
/* 
    const multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve('./<yor destination path>'));
        },
        filename: function (req, file, cb) {
            let ts = Date.now();
            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();
            cb(null,  year + "-" + month + "-" + date + "_" + file.originalname);  
        }
    });   
    var uploader = multer({ storage: storage });
    router.post('/uploadfile', uploader.single('filename') ,async (req, res) => {
        try {
            const file = req.file;
            console.log("Attached file: ", file);
            if (!file) {
                console.log("No file received");
                const error = new Error('Please upload a file')
                error.httpStatusCode = 400
                return next(error)
            }
            console.log('file received');
            res.send(file);
    
        } catch (error) {
            console.log(error);
            throw error;
        }
    }) 

*/

module.exports = router;