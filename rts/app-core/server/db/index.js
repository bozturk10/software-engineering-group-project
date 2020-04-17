/*
Remote db properties:

username = doadmin
password = lomdyrob8p6pb56g hide
host = cs308db-do-user-7358055-0.a.db.ondigitalocean.com
port = 25060
database = reservations
sslmode = REQUIRED

*/

const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'lomdyrob8p6pb56g',
    user: 'doadmin',
    database: 'reservations',
    host: 'cs308db-do-user-7358055-0.a.db.ondigitalocean.com',
    port: '25060'
});

let db = {};

db.getAllUsers = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM Users`, (err, results) => {
            if(err){
                console.log('ERROR: .all()');
                return reject(err);
            }

            return resolve(results);
        });
    });
};

db.getUserById = (id) => {
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Users WHERE uid = ?`, [id] ,(err, results) => {
            if(err){
                console.log('ERROR: .getUserById()');
                return reject(err);
            }

            return resolve(results[0]);
        });
    } );
};

db.getUserByUname = (uname) => {
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Users WHERE username = ?`, [uname] ,(err, results) => {
            if(err){
                console.log('ERROR: .getUserById()');
                return reject(err);
            }

            return resolve(results[0]);
        });
    });
};

db.addNewUser = (uname, password, email,name, surname) =>{

    return new Promise( (resolve, reject) => {

        pool.query(`INSERT INTO Users (username, password, email, name, surname)VALUES (?, ?, ?, ?, ?);`, [uname, password, email, name, surname], (err) => {
            if(err){
                console.log('ERROR: .addNewUser()');
                return reject(err);
            }
            
            return resolve({ message: 'new user added successfully'});
        });
    });
}

//---TO-DO---
//db.addNewLocalAdmin = () => {}


db.getEvents = () => {
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Events`, (err, results) => {
            if(err){
                console.log('ERROR: .getEvents()');
                return reject(err);
            }

            return resolve(results);
        });
    });
};

db.getEventById = (id) => {
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Events WHERE eId = ?`, [id] ,(err, results) => {
            if(err){
                console.log('ERROR: .getEventById()');
                return reject(err);
            }

            return resolve(results[0]);
        });
    });
};

db.addNewEvent = (title, detail, address, date, capacity, imagePath) => {
    return new Promise( (resolve, reject)=> {
        //TO-DO Check If the required parameters are empty or not. If so send NUll
        pool.query(`INSERT INTO Events (title, detail, address, date, capacity, imagePath, status)
                    VALUES( ?, ?, ?, ?, ?, ?, 'ACTIVE');`
                    , [title, detail, address, date, capacity, imagePath], (err, results) => {
            
                if(err){
                    console.log('ERROR: .addNewEvent()');
                    return reject(err);
                }

                return resolve({ message: 'new event added successfully'});
        });
    });
};
/*

*/
/* ****************  Login Authentication    ***************** */
//

db.authLogin = (uname, pass) =>{
    
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Users WHERE username = ? AND password = ?`, [uname, pass] ,(err, results) => {
            if(err){
                console.log('ERROR: .authLogin()');
                return reject(err);
            }
            //console.log(results);
            return resolve(results);
        });
    });
};


module.exports = db;