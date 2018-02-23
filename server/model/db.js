const mysql = require('mysql');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '16051223',
	database : 'hw'
});
db.connect();

let table1 = 'create table if not exists `User`(`user_id` int unsigned auto_increment, `Username` varchar(10), `Password` varchar(100), `Mobile` varchar(11), `Email` varchar(20), `Member` boolean default false, `Avatar` varchar(100), `Sex` varchar(5) default "none", `Website` varchar(50), `City` varchar(10), `Introduction` varchar(50) default "这家伙很懒，什么个性签名都没有留下", `Github` varchar(10), primary key(`user_id`)) charset=utf8';
db.query(table1, (err, result) => {
	if (err) return console.log(err);
});

let table2 = 'create table if not exists `Fans`(`Star` varchar(10), `Follower` varchar(10)) charset=utf8';
db.query(table2, (err, result) => {
	if (err) return console.log(err);
});

let table3 = 'create table if not exists `Blog`(`blog_id` int unsigned auto_increment, `Author` varchar(10), `Title` varchar(50), `Categories` varchar(10), `Date` date, `Poster` varchar(100), `Body` longtext, `View` int, `Like` int, primary key(blog_id)) charset=utf8';
db.query(table3, (err,result) => {
	if (err) return console.log(err);
});

let table4 = 'create table if not exists `Blog_Comment`(`pid` int unsigned, `Author` varchar(10), `Mentioner` varchar(10), `Body` longtext, `Date` date, foreign key(`pid`) references `Blog`(`blog_id`)) charset=utf8';
db.query(table4, (err, result) => {
	if (err) return console.log(err);
});

let table5 = 'create table if not exists `Member`(`mid` int unsigned, `Name` varchar(10), `Team` varchar(10), `SchoolNumber` varchar(8), `Active` boolean default false, `Description` varchar(100), foreign key(`mid`) references `User`(`user_id`)) charset=utf8';
db.query(table5, (err, result) => {
	if (err) return console.log(err);
});

let table6 = 'create table if not exists `Topic`(`topic_id` int unsigned auto_increment, `Title` varchar(50), `Body` longtext, `Author` varchar(10), `Date` date, primary key(topic_id)) charset=utf8';
db.query(table6, (err, result) => {
	if (err) return console.log(err);
});

let table7 = 'create table if not exists `Topic_Comment`(`pid` int unsigned, `Author` varchar(10), `Mentioner` varchar(10), `Body` longtext, `Date` date, foreign key(`pid`) references `Topic`(`topic_id`)) charset=utf8';
db.query(table7, (err, result) => {
	if (err) return console.log(err);
});

module.exports = db;