const db = require('../model/db');
const redis = require('../model/redis');

exports.checkUsername = async (req, res) => {
	let body = req.body;
	let sql = 'select Username from User where Username=?';
	try {
		let result = await new Promise((resolve, reject) => {
			db.query(sql, [body.Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		if (result.length === 0) {
			res.json({
				errorcode: 444,
				msg: '该用户名没被使用'
			});
		} else {
			res.json({
				errorcode: 111,
				msg: '该用户名已经被使用'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};

exports.checkMobile = async (req, res) => {
	let body = req.body;
	let sql = 'select mobile from User where mobile=?';
	try {
		let result = await new Promise((resolve, reject) => {
			db.query(sql, [body.mobile], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		if (result.length === 0) {
			res.json({
				errorcode: 444,
				msg: '该手机号还没被注册'
			});
		} else {
			res.json({
				errorcode: 111,
				msg: '该手机号已经被注册'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};

exports.checkCaptcha = async (req, res) => {
	let body = req.body;
	try {
		let result = await new Promise((resolve, reject) => {
			redis.get(body.mobile, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		console.log(result);
		if (body.captcha == result) {
			res.json({
				errorcode: 0,
				msg: '验证码正确'
			});
		} else {
			res.json({
				errorcode: 222,
				msg: '验证码不正确'
			});
		}
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};