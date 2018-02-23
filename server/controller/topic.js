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
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = 'select Title, Body, Author, Avatar, Date from Topic, User where Topic.Author=User.Username';
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
};