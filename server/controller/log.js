const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../model/db');
const redis = require('../model/redis');

exports.logup = async (req, res) => {
	let body = req.body;
	try {
		if ((!body.Username) || (body.Username && (body.Username.length > 10 || body.Username.length < 4))) {
			return res.json({
				err: 1,
				msg: '用户名必须为4-6位字符'
			});
		}
		if ((!body.Password) || (body.Password && (body.Password.length > 16 || body.Password.length < 6))) {
			return res.json({
				err: 1,
				msg: '用户名必须为6-16位字符'
			});
		}
		let pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if ((!body.Email) || (body.Email && !pattern.test(body.Email))) {
			res.json({
				err: 1,
				msg: '邮箱格式不正确'
			});
		}
		// if ((!body.Mobile) || (body.Mobile && body.Mobile.length !== 11)) {
		// 	return res.json({
		// 		err: 1,
		// 		msg: '手机号码必须为11位'
		// 	});
		// }
		if ((!body.Captcha) || (body.Captcha && body.Captcha.length !== 6)) {
			return res.json({
				err: 1,
				msg: '验证码必须为6位'
			});
		}
		let UsernameCount = await new Promise((resolve, reject) => {
			let sql = 'select Username from User where Username=?';
			db.query(sql, [body.Username], (err, Usernames) => {
				if (err) {
					reject(err);
				} else {
					resolve(Usernames.length);
				}
			});
		});

		if (UsernameCount > 0) {
			return res.json({
				err: 1,
				msg: '该用户名已经被使用'
			});
		}

		// let Mobilecount = await new Promise((resolve, reject) => {
		// 	let sql = 'select Mobile from User where Mobile=?';
		// 	db.query(sql, [body.Mobile], (err, Mobiles) => {
		// 		if (err) {
		// 			reject(err);
		// 		} else {
		// 			resolve(Mobiles.length);
		// 		}
		// 	});
		// });

		// if (Mobilecount > 0) {
		// 	return res.json({
		// 		err: 1,
		// 		msg: '该手机号已经被注册'
		// 	});
		// }

		let EmailCount = await new Promise((resolve, reject) => {
			let sql = 'select Email from User where Email=?';
			db.query(sql, [body.Email], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users.length);
				}
			})
		});
		if (EmailCount > 0) {
			res.json({
				err: 1,
				msg: '该邮箱已经被注册'
			});
		}
		let Captcha = await new Promise((resolve, reject) => {
			redis.get(body.Email, (err, Captcha) => {
				if (err) {
					reject(err);
				} else {
					resolve(Captcha);
				}
			});
		});
		if (body.Captcha !== Captcha) {
			return res.json({
				err: 1,
				msg: '验证码错误'
			});
		}
		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(body.Password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		body.Password = hash;
		await new Promise((resolve, reject) => {
			let sql = 'insert into User (Username, Password, Email) values (?, ?, ?)';
			db.query(sql, [body.Username, body.Password, body.Email], (err) => {
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
			msg: '服务器错误'
		});
	}
};

exports.login = async(req, res) => {
	let body = req.body;
	try {
		if (!body.Account) {
			return res.json({
				err: 1,
				msg: '帐号不能为空'
			});
		}
		if ((!body.Password) || (body.Password && (body.Password.length > 16 || body.Password.length < 6))) {
			return res.json({
				err: 1,
				msg: '密码长度必须为6-16个字符'
			});
		}
		let users = await new Promise((resolve, reject) => {
			let sql = 'select * from User where Username=? or Mobile=? or Email=?';
			db.query(sql, [body.Account, body.Account, body.Account], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
		if (!users.length) {
			return res.json({
				err: 1,
				msg: '该户名不存在或密码错误'
			});
		} 
		let corrected = await new Promise((resolve, reject) => {
			bcrypt.compare(body.Password, users[0].Password, function(err, corrected) {
				if (err) {
					reject(err);
				} else {
					resolve(corrected);
				} 
			});
		});
		if (corrected) {
			req.session.member = users[0].Member;
			req.session.uid = users[0].id;
			return res.json({
				err: 0
			});
		} else {
			return res.json({
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
	req.session.uid = null;
	res.json({
		err: 0
	});
};