const mysql = require('mysql');

const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '16051223',
	database : 'club'
});


db.connect();

let table1 = 'create table if not exists `User` (`user_id` int unsigned auto_increment, `mobile` varchar(11), `userName` text, `password` varchar(10), `email` varchar(15), `member` boolean default false, `avatar` varchar(20), primary key(`user_id`))';
db.query(table1, (err, result) => {
	if (err) return console.log(err);
	console.log(result);
});


module.exports = db;