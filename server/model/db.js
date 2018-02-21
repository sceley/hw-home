const mysql = require('mysql');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '16051223',
	database : 'hw'
});
db.connect();

let table1 = 'create table if not exists `User` (`user_id` int unsigned auto_increment, `Username` text, `Password` varchar(100), `mobile` varchar(11), `email` varchar(15), `member` boolean default false, `avatar` varchar(20), primary key(`user_id`)) charset=utf8';
db.query(table1, (err, result) => {
	if (err) return console.log(err);
	console.log(result);
});

module.exports = db;
// db.query('insert into User(Password, Username) values(?, ?)', ["覃永利", '16051223'], (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('success', result);
// 	}
// });




// const mongoose = require('mongoose');
// const config = require('../config');

// mongoose.createConnection(`mongodb://${config.dbhost}:${config.dbport}`);