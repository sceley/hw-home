const db = require('../model/db');
const fs =require('fs');
// const cdnStore = require('../common/store').cdnStore;
const localStore = require('../common/store').localStore;

exports.getUser = async (req, res) => {
	let Username = req.session.Username;
	let sql = 'select * from User where Username=?';
	try {
		let user = await new Promise((resolve, reject) => {
			db.query(sql, [Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		res.json({
			err: 0,
			user
		});
	} catch (e) {
		res.json({
			err: 555,
			msg: '服务器错误'
		});
	}
};

exports.postUser = async (req, res) => {

};

exports.editUser = async (req, res) => {
	let body = req.body;
	if ((!body.Username) || (body.Username && (body.Username.length > 10 || body.Username.length < 4))) {
		return res.json({
			err: 222,
			msg: '用户名必须为4-6位字符'
		});
	}
	let pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (body.Email && !pattern.test(body.Email)) {
		return res.json({
			err: 222,
			msg: '邮箱格式不正确'
		});
	}
	if (body.Website && body.Website.length > 50) {
		return res.json({
			err: 222,
			msg: "网站过长"
		});
	}
	if (body.Location && body.Location.length > 10) {
		return res.json({
			err: 222,
			msg: "城市过长"
		});
	}
	if (body.Github && body.Github.length > 10) {
		return res.json({
			err: 222,
			msg: "Github过长"
		});
	}
	if (body.Introduction && body.Introduction.length > 50) {
		return res.json({
			err: 222,
			msg: "个人简介过长"
		});
	}
	try {
		if (body.Username !== req.session.Username) {
			let sql = "select Username from User where Username=?";
			let result = await new Promise((resolve, reject) => {
				db.query(sql, [body.Username], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			if (result.length > 0) {
				return res.json({
					err: 222,
					msg: '用户名已经被使用'
				});
			}
		} else {
			let sql = "update User set Email=?, Username=?, Sex=?, Website=?, Github=?, Location=?, Introduction=? where Username=?";
			let result = await new Promise((resolve, reject) => {
				db.query(sql, [body.Email, body.Username, body.Sex, body.Website, body.Github, body.Location, body.Introduction, req.session.Username], (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
					}
				});
			});
			res.json({
				err: 0,
				msg: '更新成功'
			});
		}
	} catch (e) {
		res.json({
			err: 555,
			msg: '服务器错误'
		});
	}
};

exports.uploadAvatar = async (req, res) => {
	try {
		let store = await localStore(req.file.buffer);
		let sql = 'update User set Avatar=? where Username=?';
		let result = await new Promise((resolve, reject) => {
			db.query(sql, [store.url, req.session.Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			err: 0,
			msg: '上传成功'
		});
	} catch (e) {
		res.json({
			err: 555,
			msg: '服务器出错了'
		});
	}
};