const mysql = require('mysql');
const config = require('../config');
const db = mysql.createConnection(config.db);
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
			Sex varchar(10) default 'man',
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
			fuid int unsigned,
			CreateAt date,
			foreign key(uid) references User(id), 
			foreign key(fuid) references User(id))
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
			LikeCount int default 0,
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
			CreateAt datetime,
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
			LikeCount int default 0,
			primary key(id))
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
			id int unsigned auto_increment,
			uid int unsigned,
			aid int unsigned,
			primary key(id))
			charset=utf8`;
db.query(table10, (err, result) => {
	if (err) return console.log(err);
});

let table11 = `
			create table if not exists Article_Comment_Like(
			id int unsigned auto_increment,
			aid int unsigned,
			uid int unsigned,
			acid int unsigned,
			primary key(id))
			charset=utf8`;
db.query(table11, (err, result) => {
	if (err) return console.log(err);
});

let table12 = `
			create table if not exists Topic_Comment_Like(
			id int unsigned auto_increment,
			tid int unsigned,
			uid int unsigned,
			tcid int unsigned,
			primary key(id))
			charset=utf8`;
db.query(table12, (err, result) => {
	if (err) return console.log(err);
});

let table13 = `
			create table if not exists Message(
			id int unsigned auto_increment,
			fid int unsigned,
			tid int unsigned,
			Message longtext,
			CreateAt date,
			primary key(id),
			foreign key(fid) references User(id),
			foreign key(tid) references User(id))
			charset=utf8`;
db.query(table13, (err) => {
	if (err) return console.log(err);
});

let table14 = `
			create table if not exists Event(
			id int unsigned auto_increment,
			Body longtext,
			Title varchar(100),
			CreateAt date,
			Poster varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table14, err => {
	if (err) return console.log(err);
});

let table15 = `
			create table if not exists Home_Poster(
			id int unsigned auto_increment,
			Poster varchar(100),
			CreateAt date,
			primary key(id))
			charset=utf8`;
db.query(table15, (err) => {
	if (err) return console.log(err);
});
module.exports = db;