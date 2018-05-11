const mysql = require('mysql');
const config = require('../config');
const db = mysql.createConnection(config.db);
db.connect();

const table1 = `
			create table if not exists User(
			id int unsigned auto_increment, 
			username varchar(10),
			password varchar(100),
			mobile varchar(11),
			email varchar(20),
			website varchar(50),
			introduction longtext,
			primary key(id))
			charset=utf8`;
db.query(table1, err => {
	if (err) return console.log(err);
});
const table2 = `
			create table if not exists Admin(
			id int unsigned auto_increment,
			account varchar(10),
			password varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table2, err => {
	if (err) return console.log(err);
});
const table3 = `
			create table if not exists Comment(
			id int unsigned auto_increment,
			author_id int unsigned not null,
			event_id int unsigned not null,
			text longtext,
			createAt datetime,
			primary key(id))
			charset=utf8`;
db.query(table3, err => {
	if (err) return console.log(err);
});
const table4 = `
			create table if not exists RecentEvent(
			id int unsigned auto_increment,
			poster varchar(100),
			text longtext,
			link varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table4, err => {
	if (err) return console.log(err);
});
const table5 = `
			create table if not exists Banner(
			id int unsigned auto_increment,
			poster varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table5, err => {
	if (err) return console.log(err);
});
const table6 = `
			create table if not exists History(
			id int unsigned auto_increment,
			date date,
			title varchar(50),
			primary key(id))
			charset=utf8`;
db.query(table6, err => {
	if (err) return console.log(err);
});
const table7 = `
			create table if not exists Achievement(
			id int unsigned auto_increment,
			title varchar(50),
			poster varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table7, err => {
	if (err) return console.log(err);
});
const table8 = `
			create table if not exists DepartmentIntr(
			id int unsigned auto_increment,
			title varchar(20),
			subtitle varchar(20),
			text longtext,
			primary key(id))
			charset=utf8`
db.query(table8, err => {
	if (err) return console.log(err);
});
const table9 = `
			create table if not exists Diary (
			id int unsigned auto_increment,
			poster varchar(100),
			title varchar(20),
			text longtext,
			primary key(id))
			charset=utf8`;
db.query(table9, err => {
	if (err) return console.log(err);
});
const table10 = `
			create table if not exists Event (
			id int unsigned auto_increment,
			title varchar(50),
			text longtext,
			primary key(id))
			charset=utf8`;
db.query(table10, err => {
	if (err) return console.log(err);
});
const table11 = `
			create table if not exists Photo (
			id int unsigned auto_increment,
			event_id int unsigned,
			url varchar(100),
			primary key(id))
			charset=utf8`;
db.query(table11, err => {
	if (err) return console.log(err);
});
module.exports = db;