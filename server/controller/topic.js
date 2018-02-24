const db = require('../model/db');
exports.createTopic = async (req, res) => {
	let body = req.body;
	try {
		let Author = req.session.Username;
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Topic(Title, Body, Author, Date) values(?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Body, Author, body.Date], (err, result) => {
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

exports.getTopics = async (req, res) => {
	let tab = req.query.tab;
	try {
		let result = await new Promise((resolve, reject) => {
			let sql;
			if (tab === 'all' || tab === undefined) {
				sql = 'select Title, topic_id, Author, Avatar, Date from Topic, User where Topic.Author=User.Username';
			} else {
				sql = `select Title, topic_id, Author, Avatar, Date from Topic, User where Topic.Author=User.Username where tab=${tab}`;
			}
			db.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '话题',
			topics: result
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.getTopic = async (req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			let sql = "select * from Topic where topic_id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		let comment = await new Promise((resolve, reject) => {
			let sql = 'select * from Topic_Comment where pid=?';
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
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Topic_Comment(Author, Body, pid, Mentioner, Date) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, body.Date], (err, result) => {
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

exports.getTopicsCount = async (req, res) => {
	let tab = req.query.tab;
	try {
		let sql;
		if (tab === 'all' || tab === undefined) {
			sql = 'select * from Topic';
		} else {
			sql = `select * from Topic where tab=${tab}`;
		}
		let count = await new Promise((resolve, reject) => {
			db.query(sql, (err, result) => {
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