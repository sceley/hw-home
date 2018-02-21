const mysql = require('mysql');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '16051223',
	database : 'hw'
});
db.connect();

let table1 = 'create table if not exists `User`(`user_id` int unsigned auto_increment, `Username` varchar(10), `Password` varchar(100), `Mobile` varchar(11), `Email` varchar(20), `Member` boolean default false, `Avatar` varchar(50), `Sex` varchar(5) default "none", `Website` varchar(50), `City` varchar(10), `Introduction` varchar(50) default "这家伙很懒，什么个性签名都没有留下", `Github` varchar(50), primary key(`user_id`)) charset=utf8';
db.query(table1, (err, result) => {
	if (err) return console.log(err);
});

let table2 = 'create table if not exists `Fans`(`Star` varchar(10), `Follower` varchar(10))';
db.query(table2, (err, result) => {
	if (err) return console.log(err);
});

module.exports = db;