const db = require('../model/db');
const moment = require('moment');
exports.createArticle = async (req, res) => {
	let body = req.body;
	try {
		let Author = req.session.Username;
		let CreateAt = moment().format("YYYY-MM-DD");
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Article(Title, Categories, Poster, Body, Author, CreateAt) values(?, ?, ?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Categories, body.Poster, body.Body, Author, CreateAt], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			err: 0,
			msg: '创作成功'
		});
	} catch (e) {
		res.json({
			err: 555,
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
			err: 0,
			msg: '成功',
			articles: articles
		});
	} catch (e) {
		res.json({
			err: 555,
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
		await new Promise((resolve, reject) => {
			let sql = "update Article set VisitCount=VisitCount+1 where id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
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
			err: 0,
			msg: '成功',
			article,
			comment
		});
	} catch (e) {
		console.log(e);
		res.json({
			err: 555,
			msg: '服务器出错了'
		});
	}
};
exports.articleComment = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let Author = req.session.Username;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "insert into Article_Comment(Author, Body, aid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, CreateAt], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "update Article set CommentCount=CommentCount+1 where id=?";
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			err: 0
		})
	} catch (e) {
		res.json({
			err: 555,
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

exports.articleLike = async (req, res) => {
	let id = req.params.id;
	try {
		let Username = req.session.Username;
		let uid = await new Promise((resolve, reject) => {
			let sql = "select id from User where Username=?";
			db.query(sql, [Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0].id);
				}
			});
		});
		let al = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Like where uid=?';
			db.query(sql, [uid], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		if (al.length > 0) {
			await new Promise((resolve, reject) => {
				let sql = 'delete from Article_Like where uid=?';
				db.query(sql, [uid], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			await new Promise((resolve, reject) => {
				let sql = 'update Article set LikeCount=LikeCount-1 where id=?';
				db.query(sql, [id], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		} else {
			await new Promise((resolve, reject) => {
				let sql = 'insert into Article_Like(uid, aid) values(?, ?)';
				db.query(sql, [uid, id], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			await new Promise((resolve, reject) => {
				let sql = 'update Article set LikeCount=LikeCount+1 where id=?';
				db.query(sql, [id], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
		}
	} catch (e) {
		console.log(e);
		res.json({
			err: 555,
			msg: '服务器出错了'
		});
	}
}