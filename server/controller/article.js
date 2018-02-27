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
			articles,
			uid
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
	let Username = req.session.Username;
	try {
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
		let uid = await new Promise((resolve, reject) => {
			let sql = 'select id from User where Username=?';
			db.query(sql, [Username], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].id);
				}
			});
		});
		let collected = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Collect where uid=? and aid=?';
			db.query(sql, [uid, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.length);
				}
			});
		});
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
			err: 0,
			msg: '成功',
			article,
			comment,
			uid,
			collected
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
		await new Promise((resolve, reject) => {
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
		let result = await new Promise((resolve, reject) => {
			let sql = 'select Likes, LikeCount from Article where id=?';
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
			err: 555,
			msg: '服务器出错了'
		});
	}
};

exports.articleCommentLike = async (req, res) => {
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
			err: 555,
			msg: '服务器出错了'
		});
	}
};

exports.articleCollect = async(req, res) => {
	let id = req.params.id;
	let Username = req.session.Username;
	try {
		let uid = await new Promise((resolve, reject) => {
			let sql = 'select id from User where Username=?';
			db.query(sql, [Username], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].id);
				}
			});
		});
		let collected = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Collect where uid=? and aid=?';
			db.query(sql, [uid, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result.length);
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
			return res.json({
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
		console.log(e);
		res.json({
			err:555,
			msg: '服务器出错了'
		});
	}
};