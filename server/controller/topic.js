const db = require('../model/db');
const moment = require('moment');
exports.createTopic = async (req, res) => {
	let body = req.body;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		let Author = req.session.Username;
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Topic(Title, Body, Author, CreateAt) values(?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Body, Author, CreateAt], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '发表成功'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务出错了'
		});
	}
};

exports.getTopic = async (req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			let sql = "select * from Topic where id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		let comment = await new Promise((resolve, reject) => {
			let sql = 'select * from Topic_Comment where tid=?';
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			topic,
			comment
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.topicComment = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let Author = req.session.Username;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Topic_Comment(Author, Body, pid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, CreateAt], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	} catch (e) {
		res.json({
			errorcode: 0,
			msg: '服务器出错了'
		});
	}
};

exports.getTopics = async (req, res) => {
	let tab = req.query.tab;
	let page = req.query.page;
	if (page === undefined)
		page = 1;
	try {
		let topics = await new Promise((resolve, reject) => {
			let sql = `select Title, topic_id, Author, Avatar, CreateAt from Topic, User where Topic.Author=User.Username and Tab=? limit ?, ?`;
			db.query(sql, [tab, 5 * (page - 1), 5], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			topics
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.getTopicsCount = async (req, res) => {
	let tab = req.query.tab;
	try {
		let count = await new Promise((resolve, reject) => {
			let sql = `select * from Topic where Tab=?`;
			db.query(sql, [tab], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.length);
				}
			});
		});
		res.json({
			errorcode: 0,
			count
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};