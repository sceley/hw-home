const db = require('../model/db');
exports.createArticle = async (req, res) => {
	let body = req.body;
	try {
		let Author = req.session.Username;
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Blog(Title, Categories, Poster, Body, Author) values(?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Categories, body.Poster, body.Body, Author], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '创作成功'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务出错了'
		});
	}
};
exports.getArticles = async (req, res) => {
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "select * from Blog";
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
			msg: '成功',
			articles: result
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.getArticle = async (req, res) => {
	try {
		let id = req.params.id;
		let article = await new Promise((resolve, reject) => {
			let sql = "select * from Blog where blog_id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '成功',
			article
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};