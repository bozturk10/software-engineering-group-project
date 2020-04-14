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

let userdb = {};

userdb.all = () => {

    return new Promise((resolve, reject) => {

        pool.query(`SELECT * FROM Users`, (err, results) => {
            if(err){
                console.log('DB ERROR');
                return reject(err);
            }

            return resolve(results);
        });
    });
};

module.exports = userdb;