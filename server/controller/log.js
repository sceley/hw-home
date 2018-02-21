const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../model/db');
const redis = require('../model/redis');

exports.logup = async (req, res) => {
	let body = req.body;
	try {
		if ((!body.Username) || (body.Username && (body.Username.length > 10 || body.Username.length < 4))) {
			return res.json({
				errorcode: 222,
				msg: '用户名必须为4-6位字符'
			});
		}
		if ((!body.Password) || (body.Password && (body.Password.length > 16 || body.Password.length < 6))) {
			return res.json({
				errorcode: 222,
				msg: '用户名必须为6-16位字符'
			});
		}
		if ((!body.mobile) || (body.mobile && body.mobile.length !== 11)) {
			return res.json({
				errorcode: 222,
				msg: '手机号码必须为11位'
			});
		}
		if ((!body.captcha) || (body.captcha && body.captcha.length !== 6)) {
			return res.json({
				errorcode: 222,
				msg: '验证码必须为6位'
			});
		}
		let ucount = await new Promise((resolve, reject) => {
			let sql = 'select Username from `User` where `Username`=?';
			db.query(sql, [body.Username], (err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user.length);
				}
			});
		});

		if (ucount >= 1) {
			return res.json({
				errorcode: 111,
				msg: '该用户名已经被使用'
			});
		}

		let mcount = await new Promise((resolve, reject) => {
			let sql = 'select mobile from `User` where `mobile`=?';
			db.query(sql, [body.mobile], (err, user) => {
				if (err) {
					reject(err);
				} else {
					resolve(user.length);
				}
			});
		});

		if (mcount >= 1) {
			return res.json({
				errorcode: 1111,
				msg: '该手机号已经被注册'
			});
		}

		let captcha = await new Promise((resolve, reject) => {
			redis.get(body.mobile, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});

		if (body.captcha !== captcha) {
			return res.json({
				errorcode: 222,
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
		let result = await new Promise((resolve, reject) => {
			let sql = 'insert into `User` (`Username`, `Password`, `mobile`) values (?, ?, ?)';
			db.query(sql, [body.Username, body.Password, body.mobile], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '正确'
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};

exports.login = async (req, res) => {
	let body = req.body;
	try {
		if (!(body.Password || body.Username || body.email)) {
			return res.json({
				errorcode: 222,
				msg: '帐号不能为空'
			});
		}
		if ((!body.Password) || (body.Password && (body.Password.length > 16 || body.Password.length < 6))) {
			return res.json({
				errorcode: 222,
				msg: '密码长度必须为6-16个字符'
			});
		}
		// console.log(body.Username);
		let hash = await new Promise((resolve, reject) => {
			let sql = 'select `Password` from User where `Username`=? or `mobile`=? or `email`=?';
			db.query(sql, [body.Username, body.mobile, body.email], (err, result) => {
				if (err) {
					reject(err);
				} else {
					console.log("result", result);
					resolve(result);
				}
			});
		});
		let result = await new Promise((resolve, reject) => {
			bcrypt.compare(body.Password, hash, function(err, result) {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				} 
			});
		});
		console.log(hash);
		if (result) {
			req.session.Username = body.Username;
			return res.json({
				errorcode: 0,
				msg: '登录成功'
			});
		} else {
			return res.json({
				errorcode: 222,
				msg: '该户名不存在或密码错误'
			});
		}
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};