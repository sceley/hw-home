const bcrypt = require('bcrypt');
const fs =require('fs');
const db = require('../model/db');
const saltRounds = 10;

exports.logup = async (req, res) => {
	try {
		const body = req.body;
		const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (!body.username) {
			return res.json({
				err: 1,
				msg: '用户名不能为空'
			});
		}
		if (!(body.password && body.password.length <= 16 && body.password.length >= 6)) {
			return res.json({
				err: 1,
				msg: '密码必须为6-16位字符'
			});
		}
		if (!(body.email && pattern.test(body.email))) {
			return res.json({
				err: 1,
				msg: '邮箱格式不正确'
			});
		}
		const users_count = await new Promise((resolve, reject) => {
			const sql = 'select count(id) as count from User where username=?';
			db.query(sql, [body.username], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].count);
				}
			});
		});

		if (users_count > 0) {
			return res.json({
				err: 1,
				msg: '该用户名已经被使用'
			});
		}
		const email_count = await new Promise((resolve, reject) => {
			const sql = 'select count(id) as count from User where email=?';
			db.query(sql, [body.email], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0].count);
				}
			})
		});
		if (email_count > 0) {
			return res.json({
				err: 1,
				msg: '该邮箱已经被注册'
			});
		}
		const hash = await new Promise((resolve, reject) => {
			bcrypt.hash(body.password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		body.password = hash;
		await new Promise((resolve, reject) => {
			let sql = 'insert into User (username, password, email) values (?, ?, ?)';
			db.query(sql, [body.username, body.password, body.email], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '注册成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.login = async(req, res) => {
	try {
		const body = req.body;
		if (!body.account) {
			return res.json({
				err: 1,
				msg: '帐号不能为空'
			});
		}
		if (!(body.password && body.password.length <= 16 && body.password.length >= 6)) {
			return res.json({
				err: 1,
				msg: '密码必须为6-16个字符'
			});
		}
		const user = await new Promise((resolve, reject) => {
			const sql = 'select * from User where username=? or email=? or mobile=?';
			db.query(sql, [body.account, body.account, body.account], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0]);
				}
			});
		});
		if (!user) {
			return res.json({
				err: 1,
				msg: '该户名不存在或密码错误'
			});
		} 
		const corrected = await new Promise((resolve, reject) => {
			bcrypt.compare(body.password, user.password, function(err, corrected) {
				if (err) {
					reject(err);
				} else {
					resolve(corrected);
				} 
			});
		});
		if (corrected) {
			req.session.user_id = user.id;
			res.json({
				err: 0,
				msg: '登陆成功'
			});
		} else {
			res.json({
				err: 1,
				msg: '该户名不存在或密码错误'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.logout = async (req, res) => {
	try {
		req.session.user_id = null;
		res.json({
			err: 0,
			msg: '退出登陆成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.getUserInfo = async (req, res) => {
	try {
		const user_id = req.session.user_id;
		const user = await new Promise((resolve, reject) => {
			const sql = 'select * from User where id=?';
			db.query(sql, [user_id], (err, uses) => {
				if (err) {
					reject(err);
				} else {
					resolve(uses[0]);
				}
			});
		});
		delete user.password;
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

exports.editUserInfo = async (req, res) => {
	try {
		const body = req.body;
		const user_id = req.session.user_id;
		const pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (!(body.email && pattern.test(body.email))) {
			return res.json({
				err: 1,
				msg: '邮箱格式不正确'
			});
		}
		if (body.website && body.website.length > 50) {
			return res.json({
				err: 1,
				msg: "网站过长"
			});
		}
		if (body.mobile && body.mobile.length !== 11) {
			return res.json({
				err: 1,
				msg: '手机号码必须为11位'
			});
		}
		if (body.password && (body.password.length > 16 || body.password.length < 6)) {
			return res.json({
				err: 1,
				msg: '密码必须为6-16个字符'
			});
		}
		const user = await new Promise((resolve, reject) => {
			const sql = 'select mobile, email from User where id=?';
			db.query(sql, [user_id], (err, users) => {
				if (err)
					reject(err);
				else
					resolve(users[0]);
			});
		});
		if (user.email != body.email) {
			const users_count = await new Promise((resolve, reject) => {
				const sql = 'select count(id) as count from User where Email=?';
				db.query(sql, [body.email], (err, uses) => {
					if (err) {
						reject(err);
					} else {
						resolve(uses[0].count);
					}
				});
			});
			if (users_count > 0) {
				return res.json({
					err: 1,
					msg: '邮箱已经被注册'
				});
			}
		}
		if (user.mobile != body.mobile) {
			const mobiles_count = await new Promise((resolve, reject) => {
				const sql = 'select count(id) as count from User where mobile=?';
				db.query(sql, [body.mobile], (err, uses) => {
					if (err) {
						reject(err);
					} else {
						resolve(uses[0].count);
					}
				});
			});
			if (mobiles_count > 0) {
				return res.json({
					err: 1,
					msg: '手机号已经被注册'
				});
			}
		}
		if (body.password) {
			const hash = await new Promise((resolve, reject) => {
				bcrypt.hash(body.password, saltRounds, function(err, hash) {
					if (err) {
						reject(err);
					} else {
						resolve(hash);
					}
				});
			});
			body.password = hash;
		} else {
			body.password = user.password;
		}
		await new Promise((resolve, reject) => {
			const sql = "update User set password=?, email=?, mobile=?, website=?, introduction=? where id=?";
			db.query(sql, [body.password, body.email, body.mobile, body.website, body.introduction, user_id], (err) => {
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