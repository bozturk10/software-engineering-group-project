const express = require('express');
const session = require('express-session');
const apiRouter = require('./routes/api');
const db = require('./db');
var path = require('path');
// TO-DO Encrypt password before sending to database
//const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();

//Servin api calls
app.use('/api', apiRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

const staticPath = path.resolve(__dirname, '..', 'static');
//Html static file root 
app.use(express.static(process.cwd() + '/static'));

console.log("Current directory:", __dirname); 
console.log('static path: ', staticPath);


app.get('/check', async (req, res) => {
    try {
        res.send({status: 'ok'});
    } catch (error) {
        console.log(e);
        res.sendStatus(500);
    }
});

//Call admin dashboard page TO ADD NEW EVENT
app.get('/new-event', (req, res) => {
    try{
        res.sendFile(path.resolve('static/web-pages/admin-dashboard/add_event.html'));
    }catch(er){
        throw er;
    }
});

//App
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true,
    //Session expires after a minute
    cookie: { maxAge: 3600000 },
}));

app.get('/', (req, res) => {
    try {
        res.sendFile(path.resolve('static/web-pages/home.html'));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.get('/home', (req, res) => {
    try {
        res.sendFile(path.resolve('static/web-pages/home.html'));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.get('/login', (req, res) => {
    try{
        res.sendFile(path.resolve('static/web-pages/login-signup/login-user.html'));
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

app.post('/auth', async function(request, response) {
    console.log('Authentication request: ',request.body);
    var username = request.body.username;
    var password = request.body.password;

	if (username && password) {
        //Validation
        try {

            let results = await db.authLogin(username, password);

            if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = username;
                //response.json(results);
				response.redirect('/events');
			} else {
                //response.json({warning: "Incorrect credentials"});
				response.send('Incorrect Username and/or Password!');
            }
            			
            response.end();

        } catch (e) {
            console.log(e);
        }
    }
    else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//TO-DO app.post('/logout')

app.get('/events', function (req, res) {
    try{
        if(req.session.loggedin){
            //res.send('Welcome back, ' + req.session.username + '!');
            res.sendFile(path.resolve('static/web-pages/event-pages/events.html'));
        }
        else {
            res.send('Please login to view this page!');
        } 
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || '3000' }`);
}); 