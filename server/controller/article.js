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
			let sql = `insert into Article
						(Title, Categories, Poster, Body, 
						Author, CreateAt, uid)
						values(?, ?, ?, ?, ?, ?, ?)`;
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
			let sql = `select Article.id as id, Article_Like.id as lid,
						User.id as uid, Poster, Author, Body, User.CreateAt, 
						Categories, LikeCount, CommentCount, VisitCount
						from Article left join Article_Like on
						Article_Like.aid=Article.id and Article_Like.uid=? 
						left join User on User.Username=Article.Author
						order by Article.CreateAt desc limit ?, ?`;
			db.query(sql, [uid, 5 * (page - 1), 5], (err, articles) => {
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
		console.log(e);
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
			let sql = `select Article_Comment.id, Article_Comment_Like.id as lid, 
						Avatar, LikeCount, Article_Comment.CreateAt,
						Body, Author from Article_Comment 
						left join User on User.Username=Article_Comment.Author
						left join Article_Comment_Like 
						on Article_Comment_Like.aid=Article_Comment.aid 
						and Article_Comment_Like.acid=Article_Comment.id 
						and Article_Comment_Like.uid=? 
						where Article_Comment.aid=?`;
			db.query(sql, [uid, id], (err, comment) => {
				if (err) {
					reject(err);
				} else {
					resolve(comment);
				}
			});
		});
		let cared = await new Promise((resolve, reject) => {
			let sql = 'select * from Fans where uid=? and fuid=?';
			db.query(sql, [article.uid, uid], (err, fans) => {
				if (err) {
					reject(err);
				} else {
					resolve(fans.length);
				}
			});
		});
		res.json({
			err: 0,
			msg: '成功',
			article,
			comment,
			uid,
			collected,
			cared
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
			let sql = "insert into Article_Comment(Author, Body, aid, Mentioner, CreateAt) values(?, ?, ?, ?, ?)";
			db.query(sql, [user.Username, body.Body, id, body.Mentioner, CreateAt], (err) => {
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
		console.log(e);
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
		let isLiked = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Like where aid=? and uid=?';
			db.query(sql, [id, uid], (err, articleLikes) => {
				if (err) {
					reject(err);
				} else {
					resolve(articleLikes.length);
				}
			});
		});
		let sql1;
		let sql2;
		if (isLiked) {
			sql1 = 'update Article set LikeCount=LikeCount-1 where id=?';
			sql2 = 'delete from Article_Like where aid=? and uid=?';
		} else {
			sql1 = 'update Article set LikeCount=LikeCount+1 where id=?';
			sql2 = 'insert into Article_Like(aid, uid) values(?, ?)';
		}
		await new Promise((resolve, reject) => {
			db.query(sql1, [id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			db.query(sql2, [id, uid], (err) => {
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
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.articleCommentLike = async (req, res) => {
	let aid = req.params.aid;
	let acid = req.params.acid;
	let uid = req.session.uid;
	try {
		let isLiked = await new Promise((resolve, reject) => {
			let sql = 'select * from Article_Comment_Like where acid=? and uid=? and aid';
			db.query(sql, [acid, uid, aid], (err, articleLikes) => {
				if (err) {
					reject(err);
				} else {
					resolve(articleLikes.length);
				}
			});
		});
		let sql1;
		let sql2;
		if (isLiked) {
			sql1 = 'update Article_Comment set LikeCount=LikeCount-1 where id=? and aid=?';
			sql2 = 'delete from Article_Comment_Like where acid=? and uid=? and aid=?';
		} else {
			sql1 = 'update Article_Comment set LikeCount=LikeCount+1 where id=? and aid=?';
			sql2 = 'insert into Article_Comment_Like(acid, uid, aid) values(?, ?, ?)';
		}
		await new Promise((resolve, reject) => {
			db.query(sql1, [acid, aid], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			db.query(sql2, [acid, uid, aid], (err) => {
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