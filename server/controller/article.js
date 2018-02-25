const db = require('../model/db');
exports.createArticle = async (req, res) => {
	let body = req.body;
	try {
		let Author = req.session.Username;
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Article(Title, Categories, Poster, Body, Author, CreateAt) values(?, ?, ?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Categories, body.Poster, body.Body, Author, body.CreateAt], (err, result) => {
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
	let page = req.query.page;
	if (page === undefined)
		page = 1;
	try {
		let articles = await new Promise((resolve, reject) => {
			let sql = `select * from Article limit ?, ?`;
			db.query(sql, [5 * (page - 1), 5], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '成功',
			articles: articles
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.getArticle = async (req, res) => {
	let id = req.params.id;
	try {
		let article = await new Promise((resolve, reject) => {
			let sql = "select * from Article where id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		let comment = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Comment where aid=?';
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
			msg: '成功',
			article,
			comment
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};
exports.articleComment = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let Author = req.session.Username;
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Article_Comment(Author, Body, aid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, body.CreateAt], (err, result) => {
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

exports.getArticlesCount = async (req, res) => {
	try {
		let count = await new Promise((resolve, reject) => {
			let sql = "select * from Article";
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
			errorcode: 0,
			msg: '服务器出错了'
		});
	}
};