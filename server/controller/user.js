const db = require('../model/db');
const fs =require('fs');
const moment = require('moment');
// const cdnStore = require('../common/store').cdnStore;
const localStore = require('../common/store').localStore;

exports.getUserByLogin = async (req, res) => {
	let uid = req.session.uid;
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
		let topicCount = await new Promise((resolve, reject) => {
			let sql = 'select * from Topic where uid=?';
			db.query(sql, [uid], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics.length);
				}
			});
		});
		let articleCount = await new Promise((resolve, reject) => {
			let sql = 'select * from Article where uid=?';
			db.query(sql, [uid], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles.length);
				}
			});
		});
		let fansCount = await new Promise((resolve, reject) => {
			let sql = 'select count(*) as fansCount from Fans where uid=?';
			db.query(sql, [uid], (err, fans) =>{
				if (err) {
					reject(err);
				} else {
					resolve(fans[0].fansCount);
				}
			});
		});
		user.topicCount = topicCount;
		user.articleCount = articleCount;
		user.fansCount = fansCount;
		res.json({
			err: 0,
			user
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.getUserById = async (req, res) => {
	let id = req.params.id;
	try {
		let user = await new Promise((resolve, reject) => {
			let sql = 'select * from User where id=?';
			db.query(sql, [id], (err, uses) => {
				if (err) {
					reject(err);
				} else {
					resolve(uses[0]);
				}
			});
		});
		let topicCount = await new Promise((resolve, reject) => {
			let sql = 'select * from Topic where uid=?';
			db.query(sql, [id], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics.length);
				}
			});
		});
		let articleCount = await new Promise((resolve, reject) => {
			let sql = 'select * from Article where uid=?';
			db.query(sql, [id], (err, articles) => {
				if (err) {
					reject(err);
				} else {
					resolve(articles.length);
				}
			});
		});
		let fansCount = await new Promise((resolve, reject) => {
			let sql = 'select count(*) as fansCount from Fans where uid=?';
			db.query(sql, [id], (err, fans) =>{
				if (err) {
					reject(err);
				} else {
					resolve(fans[0].fansCount);
				}
			});
		});
		user.topicCount = topicCount;
		user.articleCount = articleCount;
		user.fansCount = fansCount;
		res.json({
			user,
			err: 0
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.editUser = async (req, res) => {
	let body = req.body;
	let uid = req.session.uid;
	if ((!body.Username) || (body.Username && (body.Username.length > 10 || body.Username.length < 4))) {
		return res.json({
			err: 1,
			msg: '用户名必须为4-6位字符'
		});
	}
	let pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (body.Email && !pattern.test(body.Email)) {
		return res.json({
			err: 1,
			msg: '邮箱格式不正确'
		});
	}
	if (body.Website && body.Website.length > 50) {
		return res.json({
			err: 1,
			msg: "网站过长"
		});
	}
	if (body.Location && body.Location.length > 10) {
		return res.json({
			err: 1,
			msg: "城市过长"
		});
	}
	if (body.Github && body.Github.length > 10) {
		return res.json({
			err: 1,
			msg: "Github过长"
		});
	}
	if (body.Introduction && body.Introduction.length > 50) {
		return res.json({
			err: 1,
			msg: "个人简介过长"
		});
	}
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
		if (user.Username !== body.Username) {
			let users = await new Promise((resolve, reject) => {
				let sql = "select * from User where Username=?";
				db.query(sql, [body.Username], (err, users) => {
					if (err) {
						reject(err);
					} else {
						resolve(users);
					}
				});
			});
			if (users.length > 0) {
				return res.json({
					err: 1,
					msg: '用户名已经被使用'
				});
			}
		}
		await new Promise((resolve, reject) => {
			let sql = "update User set Email=?, Username=?, Sex=?, Website=?, Github=?, Location=?, Introduction=? where Username=?";
			db.query(sql, [body.Email, body.Username, body.Sex, body.Website, body.Github, body.Location, body.Introduction, user.Username], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '更新成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.uploadAvatar = async (req, res) => {
	let uid = req.session.uid;
	try {
		let store = await localStore(req.file.buffer);
		let sql = 'update User set Avatar=? where id=?';
		await new Promise((resolve, reject) => {
			db.query(sql, [store.url, uid], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '上传成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.careUser = async (req, res) => {
	let id = req.params.id;
	let fuid = req.session.uid;
	let CreateAt = moment().format('YYYY-MM-DD');
	try {
		let fansCount = await new Promise((resolve, reject) => {
			let sql = 'select * from Fans where uid=? and fuid=?';
			db.query(sql, [id, fuid], (err, fans) => {
				if (err) {
					reject(err);
				} else {
					resolve(fans.length);
				}
			});
		}); 
		if (fansCount > 0)
			await new Promise((resolve, reject) => {
				let sql = 'delete from Fans where uid=? and fuid=?';
				db.query(sql, [id, fuid], (err) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			}); 
		else 
			await new Promise((resolve, reject) => {
				let sql = 'insert into Fans(uid, fuid, CreateAt) values(?, ?, ?)';
				db.query(sql, [id, fuid, CreateAt], (err) => {
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
}