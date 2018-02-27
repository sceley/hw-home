const db = require('../model/db');
const moment = require('moment');
exports.createTopic = async (req, res) => {
	let body = req.body;
	let CreateAt = moment().format("YYYY-MM-DD");
	let uid = req.session.uid;
	try {
		let Author = await new Promise((resolve, reject) => {
			let sql = 'select Username from User where id=?';
			db.query(sql, [uid], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].Username);
				}
			})
		});
		await new Promise((resolve, reject) => {
			let sql = "insert into Topic(Title, Body, Author, CreateAt) values(?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Body, Author, CreateAt], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '发表成功'
		});
	} catch (e) {
		res.json({
			errorcode: 0,
			msg: '服务出错了'
		});
	}
};

exports.getTopic = async (req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			let sql = "select * from Topic where id=?";
			db.query(sql, [id], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics[0]);
				}
			});
		});
		let comments = await new Promise((resolve, reject) => {
			let sql = 'select * from Topic_Comment where tid=?';
			db.query(sql, [id], (err, comments) => {
				if (err) {
					reject(err);
				} else {
					resolve(comments);
				}
			});
		});
		res.json({
			err: 0,
			topic,
			comments
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.topicComment = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let uid = req.session.uid;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		let Author = await new Promise((resolve, reject) => {
			let sql = 'select Username from User where id=?';
			db.query(sql, [uid], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].Username);
				}
			})
		});
		await new Promise((resolve, reject) => {
			let sql = "insert into Topic_Comment(Author, Body, pid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, CreateAt], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.getTopics = async (req, res) => {
	let tab = req.query.tab;
	let page = req.query.page;
	let uid = req.session.uid;
	let sql;
	if (!page)
		page = 1;
	if (!tab)
		sql= 'select * from Topic limit ?, ?';
	else 
		sql= 'select * from Topic where good=true limit ?, ?';
	try {
		let topics = await new Promise((resolve, reject) => {
			db.query(sql, [5 * (page - 1), 5], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics);
				}
			});
		});
		res.json({
			err: 0,
			topics
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.getTopicsCount = async (req, res) => {
	let tab = req.query.tab;
	let sql;
	if (tab)
		sql = 'select * from Topic';
	else 
		sql = 'select * from Topic where good=true';
	try {
		let count = await new Promise((resolve, reject) => {
			db.query(sql, (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics.length);
				}
			});
		});
		res.json({
			err: 0,
			count
		});
	} catch (e) {
		res.json({
			err: 555,
			msg: '服务器出错了'
		});
	}
};