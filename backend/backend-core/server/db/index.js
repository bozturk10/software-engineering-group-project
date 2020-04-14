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
        pool.query(`SELECT * FROM Users WHERE id = ?`, [id] ,(err, results) => {
            if(err){
                console.log('ERROR: .getUserById()');
                return reject(err);
            }

            return resolve(results[0]);
        });
    } );
};

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
                console.log('ERROR: .getUserById()');
                return reject(err);
            }

            return resolve(results[0]);
        });
    });
};

db.authLogin = (uname, pass) =>{
    console.log(uname, pass);
    return new Promise( (resolve, reject) => {
        pool.query(`SELECT * FROM Users WHERE name = ? AND password = ?`, [uname, pass] ,(err, results) => {
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