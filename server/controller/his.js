const db = require('../model/db');
exports.hisTopic = async (req, res) => {
	let id = req.params.id;
	try {
		let topics = await new Promise((resolve, reject) => {
			let sql = 'select id, Title, CreateAt from Topic where uid=?';
			db.query(sql, [id], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics);
				}
			});
		});
		res.json({
			err: 0,
			topics: topics
		});
	} catch (e) {
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
};
exports.hisArticle = async (req, res) => {
	let id = req.params.id;
	try {
		let articles = await new Promise((resolve, reject) => {
			let sql = 'select id, Title, CreateAt from Article where uid=?';
			db.query(sql, [id], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles);
				}
			});
		});
		res.json({
			err: 0,
			articles: articles
		});
	} catch (e) {
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
};
exports.hisCaring = async (req, res) => {
	let id = req.params.id;
	try {
		let followers = await new Promise((resolve, reject) => {
			let sql = 'select id, Avatar, Username from Fans left join User on Fans.uid=User.id where Fans.fuid=?';
			db.query(sql, [id], (err, followers) => {
				if (err) {
					reject(err);
				} else {
					resolve(followers);
				}
			});
		});
		res.json({
			err: 0,
			followers
		});
	} catch (e) {
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
};
exports.follower = async (req, res) => {
	let id = req.params.id;
	try {
		let followers = await new Promise((resolve, reject) => {
			let sql = 'select id, Avatar, Username from Fans left join User on Fans.fuid=User.id where Fans.uid=?';
			db.query(sql, [id], (err, followers) => {
				if (err) {
					reject(err);
				} else {
					resolve(followers);
				}
			});
		});
		res.json({
			err: 0,
			followers
		});
	} catch (e) {
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
};

exports.colTopic = async (req, res) => {
	let id = req.params.id;
	try {
		let topics = await new Promise((resolve, reject) => {
			let sql = 'select Title, Topic.id, Topic.CreateAt from Topic_Collect left join Topic on Topic.id=Topic_Collect.tid where Topic_Collect.uid=?';
			db.query(sql, [id], (err, topics) => {
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
		console.log(e);
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
};

exports.colArticle = async (req, res) => {
	let id = req.params.id;
	try {
		let articles = await new Promise((resolve, reject) => {
			let sql = 'select Title, Article.id, Article.CreateAt from Article_Collect left join Article on Article.id=Article_Collect.aid where Article_Collect.uid=?';
			db.query(sql, [id], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles);
				}
			});
		});
		res.json({
			err: 0,
			articles
		});
	} catch (e) {
		console.log(e);
		res.json({
			err: 1,
			msg:'服务器出错了'
		});
	}
}