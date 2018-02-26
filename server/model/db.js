const mysql = require('mysql');
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '16051223',
	database : 'hw'
});
db.connect();

let table1 = `
			create table if not exists User(
			id int unsigned auto_increment, 
			Username varchar(10),
			Password varchar(100),
			Mobile varchar(11),
			Email varchar(20),
			Avatar varchar(100),
			Member boolean default false,
			Sex varchar(5) default 'man',
			Website varchar(50),
			Location varchar(10),
			Introduction varchar(50) default '这家伙很懒，什么个性签名都没有留下',
			Github varchar(10),
			CreateAt date,
			UpdateAt date,
			primary key(id))
			charset=utf8`;
db.query(table1, (err, result) => {
	if (err) return console.log(err);
});

let table2 = `
			create table if not exists Member(
			uid int unsigned, 
			Name varchar(10), 
			Team varchar(10), 
			SchoolNumber varchar(8),
			Active boolean default false,
			Description varchar(100), 
			foreign key(uid) references User(id))
			charset=utf8`;
db.query(table2, (err, result) => {
	if (err) return console.log(err);
});

let table3 = `
			create table if not exists Fans(
			uid int unsigned,
			Follower varchar(10),
			CreateAt date,
			foreign key(uid) references User(id))
			charset=utf8`;
db.query(table3, (err, result) => {
	if (err) return console.log(err);
});

let table4 = `
			create table if not exists Article(
			id int unsigned auto_increment, 
			uid int unsigned,
			Author varchar(10),
			Title varchar(50), 
			Categories varchar(10), 
			Poster varchar(100), 
			Body longtext, 
			VisitCount int default 0,
			CommentCount int default 0,
			LikeCount int default 0,
			CreateAt date,
			primary key(id),
			foreign key(uid) references User(id))
			charset=utf8`;
db.query(table4, (err,result) => {
	if (err) return console.log(err);
});

let table5 = `
			create table if not exists Article_Comment(
			id int unsigned auto_increment,
			aid int unsigned, 
			Author varchar(10), 
			Mentioner varchar(10),
			Body longtext, 
			CreateAt date, 
			primary key(id),
			foreign key(aid) references Article(id))
			charset=utf8`;
db.query(table5, (err, result) => {
	if (err) return console.log(err);
});

let table6 = `
			create table if not exists Article_Collect(
			uid int unsigned,
			aid int unsigned,
			CreateAt date,
			foreign key(uid) references User(id),
			foreign key(aid) references Article(id))
			charset=utf8`;
db.query(table6, (err, result) => {
	if (err) return console.log(err);
});

let table7 = `
			create table if not exists Topic(
			id int unsigned auto_increment, 
			uid int unsigned,
			Title varchar(50), 
			Body longtext, 
			Author varchar(10),
			good boolean default false,
			top boolean default false, 
			Tab varchar(10),
			CreateAt date,
			primary key(id),
			foreign key(uid) references User(id))
			charset=utf8`;
db.query(table7, (err, result) => {
	if (err) return console.log(err);
});

let table8 = `
			create table if not exists Topic_Comment(
			id int unsigned auto_increment,
			tid int unsigned, 
			Author varchar(10),
			Mentioner varchar(10),
			Body longtext,
			CreateAt date,
			primary key(id),
			foreign key(tid) references Topic(id))
			charset=utf8`;
db.query(table8, (err, result) => {
	if (err) return console.log(err);
});

let table9 =`
			create table if not exists Topic_Collect(
			uid int unsigned,
			tid int unsigned,
			CreateAt date,
			foreign key(uid) references User(id),
			foreign key(tid) references Topic(id))
			charset=utf8`;
db.query(table9, (err, result) => {
	if (err) return console.log(err);
});

let table10 = `
				create table if not exists Article_Like(
				aid int unsigned,
				uid int unsigned,
				foreign key(aid) references Article(id),
				foreign key(uid) references User(id))
				charset=utf8`;
db.query(table10, (err, result) => {
	if (err) return console.log(err);
});

let table11 = `
				create table if not exists Article_Comment_Like(
				acid int unsigned,
				uid int unsigned,
				foreign key(acid) references Article_Comment(id),
				foreign key(uid) references User(id))
				charset=utf8`
db.query(table11, (err, result) => {
	if (err) return console.log(err);
});

let table12 = `
				create table if not exists Topic_Comment_Like(
				tcid int unsigned,
				uid int unsigned,
				foreign key(tcid) references Topic_Comment(id),
				foreign key(uid) references User(id))
				charset=utf8`;

db.query(table12, (err, result) => {
	if (err) return console.log(err);
});

module.exports = db;