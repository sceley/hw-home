const db = require('../model/db');
const moment = require('moment');
exports.createArticle = async (req, res) => {
	let body = req.body;
	let uid = req.session.uid;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		let user = await new Promise((resolve, reject) => {
			let sql = 'select * from User where id=?';
			db.query(sql, [uid], (err, uses) => {
				if (err) {
					reject(err);
				} else {
					resolve(uses[0]);
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "insert into Article(Title, Categories, Poster, Body, Author, CreateAt, uid) values(?, ?, ?, ?, ?, ?, ?)";
			db.query(sql, [body.Title, body.Categories, body.Poster, body.Body, user.Username, CreateAt, uid], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '创作成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务出错了'
		});
	}
};
exports.getArticles = async (req, res) => {
	let page = req.query.page;
	if (!page)
		page = 1;
	try {
		let uid = req.session.uid;
		let articles = await new Promise((resolve, reject) => {
			let sql = 'select * from Article limit ?, ?';
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
			articles,
			uid
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.getArticle = async (req, res) => {
	let id = req.params.id;
	let uid = req.session.uid;
	try {
		await new Promise((resolve, reject) => {
			let sql = "update Article set VisitCount=VisitCount+1 where id=?";
			db.query(sql, [id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		let collected = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Collect where uid=? and aid=?';
			db.query(sql, [uid, id], (err, collects) => {
				if (err) {
					reject(err);
				} else {
					resolve(collects.length);
				}
			});
		});
		let article = await new Promise((resolve, reject) => {
			let sql = "select * from Article where id=?";
			db.query(sql, [id], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles[0]);
				}
			});
		});
		let comment = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Comment where aid=?';
			db.query(sql, [id], (err, comment) => {
				if (err) {
					reject(err);
				} else {
					resolve(comment);
				}
			});
		});
		res.json({
			err: 0,
			msg: '成功',
			article,
			comment,
			uid,
			collected
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.articleComment = async (req, res) => {
	let id = req.params.id;
	let uid = req.session.uid;
	let body = req.body;
	let CreateAt = moment().format("YYYY-MM-DD");
	try {
		await new Promise((resolve, reject) => {
			let sql = "insert into Article_Comment(Author, Body, aid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [Author, body.Body, id, body.Mentioner, CreateAt], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "update Article set CommentCount=CommentCount+1 where id=?";
			db.query(sql, [id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0
		})
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.getArticlesCount = async(req, res) => {
	try {
		let count = await new Promise((resolve, reject) => {
			let sql = "select * from Article";
			db.query(sql, (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles.length);
				}
			});
		});
		res.json({
			err: 0,
			count
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.articleLike = async (req, res) => {
	let id = req.params.id;
	let uid = req.session.uid;
	try {
		let article = await new Promise((resolve, reject) => {
			let sql = 'select Likes, LikeCount from Article where id=?';
			db.query(sql, [id], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles[0]);
				}
			});
		});
		let Likes = JSON.parse(article.Likes);
		let LikeCount = article.LikeCount;
		if (Likes instanceof Array === false) {
			Likes = [];
		}
		if (Likes.indexOf(uid) === -1) {
			Likes.push(uid);
			LikeCount++;
		} else {
			Likes.splice(Likes.indexOf(uid), 1);
			LikeCount--;
		}
		await new Promise((resolve, reject) => {
			let sql = 'update Article set Likes=?, LikeCount=? where id=?';
			db.query(sql, [JSON.stringify(Likes), LikeCount, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			err: 0
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.articleCommentLike = async (req, res) => {
	let id = req.params.id;
	let uid = req.session.uid;
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = 'select Likes, LikeCount from Article_Comment where id=?';
			db.query(sql, [id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		let Likes = JSON.parse(result.Likes);
		let LikeCount = result.LikeCount;
		if (Likes instanceof Array === false) {
			Likes = [];
		}
		if (Likes.indexOf(uid) === -1) {
			Likes.push(uid);
			LikeCount++;
		} else {
			Likes.splice(Likes.indexOf(uid), 1);
			LikeCount--;
		}
		await new Promise((resolve, reject) => {
			let sql = 'update Article_Comment set Likes=?, LikeCount=? where id=?';
			db.query(sql, [JSON.stringify(Likes), LikeCount, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			err: 0
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.articleCollect = async(req, res) => {
	let id = req.params.id;
	let uid = req.session.uid;
	try {
		let collected = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Collect where uid=? and aid=?';
			db.query(sql, [uid, id], (err, articlecollects) => {
				if (err) {
					reject(err);
				} else {
					resolve(articlecollects.length);
				}
			});
		});
		if (collected) {
			await new Promise((resolve, reject) => {
				let sql = 'delete from Article_Collect where uid and aid';
				db.query(sql, [uid, id], (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
			res.json({
				err: 0
			});
		} else {
			await new Promise((resolve, reject) => {
				let sql = 'insert into Article_Collect(uid, aid) values(?, ?)';
				db.query(sql, [uid, id], (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			});
			res.json({
				err: 0
			});
		}
	} catch (e) {
		res.json({
			err:　1,
			msg: '服务器出错了'
		});
	}
};