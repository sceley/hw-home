const db = require('../model/db');
const redis = require('../model/redis');

exports.checkUsername = async (req, res) => {
	let body = req.body;
	try {
		let users = await new Promise((resolve, reject) => {
			let sql = 'select Username from User where Username=?';
			db.query(sql, [body.Username], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
		if (users.length === 0) {
			res.json({
				err: 0,
				msg: '该用户名没被使用'
			});
		} else {
			res.json({
				err: 1,
				msg: '该用户名已经被使用'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.checkMobile = async (req, res) => {
	let body = req.body;
	try {
		let users = await new Promise((resolve, reject) => {
			let sql = 'select Mobile from User where Mobile=?';
			db.query(sql, [body.Mobile], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
		if (users.length === 0) {
			res.json({
				err: 0,
				msg: '该手机号还没被注册'
			});
		} else {
			res.json({
				err: 1,
				msg: '该手机号已经被注册'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.checkCaptcha = async (req, res) => {
	let body = req.body;
	try {
		let Captcha = await new Promise((resolve, reject) => {
			redis.get(body.Email, (err, Captcha) => {
				if (err) {
					reject(err);
				} else {
					resolve(Captcha);
				}
			});
		});
		if (body.Captcha === Captcha) {
			res.json({
				err: 0,
				msg: '验证码正确'
			});
		} else {
			res.json({
				err: 1,
				msg: '验证码不正确'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};

exports.checkEditEmail = async (req, res) => {
	let uid = req.session.uid;
	let body = req.body;
	try {
		let user = await new Promise((resolve, reject) => {
			let sql = 'select * from User where id=?';
			db.query(sql, [uid], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users[0]);
				}
			});
		});
		if (body.Email === user.Email) {
			res.json({
				err: 0
			});
		}
		let	users = await new Promise((resolve, reject) => {
			let sql = 'select * from User where Email=?';
			db.query(sql, [body.Email], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
		if (users.length) {
			res.json({
				err: 1,
				msg: '该Email已经被注册'
			});
		} else {
			res.json({
				err: 0,
				msg: '该Email还没被注册'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}

};

exports.checkEmail = async (req, res) => {
	let body = req.body;
	try {
		let	users = await new Promise((resolve, reject) => {
			let sql = 'select * from User where Email=?';
			db.query(sql, [body.Email], (err, users) => {
				if (err) {
					reject(err);
				} else {
					resolve(users);
				}
			});
		});
		if (users.length) {
			res.json({
				err: 1,
				msg: '该Email已经被注册'
			});
		} else {
			res.json({
				err: 0,
				msg: '该Email还没被注册'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}
};