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