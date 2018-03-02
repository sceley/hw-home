const db = require('../model/db');
const config = require('../config');
const moment = require('moment');
exports.allowMember = async (req, res) => {
	let id = req.params.id;
	try {
		let Member = await new Promise((resolve, reject) => {
			let sql = 'select Member from User where id=?';
			db.query(sql, [id], (err, Members) => {
				if (err) {
					reject(err);
				} else {
					resolve(Members[0]);
				}
			})
		});
		if (!Member) {
			return res.json({
				err: 1,
				msg: '用户不存在'
			});
		}
		await new Promise((resolve, reject) => {
			let sql = "update Member set Active=? where uid=?";
			db.query(sql, [!Member.Member, id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "update User set Member=? where id=?";
			db.query(sql, [!Member.Member, id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '成功'
		});
	} catch (e) {
		console.log(e);
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.adminLogin = async (req, res) => {
	let body = req.body;
	if (body.Account == config.admin.user && body.Password === config.admin.pass) {
		req.session.admin = true;
		res.json({
			err: 0
		});
	} else {
		res.json({
			err: 1,
			msg: '用户不存或密码错误'
		});
	}
};

exports.PutTop = async (req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			let sql = 'select top from Topic where id=?';
			db.query(sql, [id], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics[0]);
				}
			});
		});
		if (!topic) {
			return res.json({
				err: 1,
				msg: '话题不存在'
			});
		}
		await new Promise((resolve, reject) => {
			let sql = 'update Topic set top=? where id=?';
			db.query(sql, [!topic.top, id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		});
		res.json({
			err: 0
		});

	} catch (e) {
		res.json({
			err: 1,
			msg: '用户不存或密码错误'
		});
	}
};

exports.PutGood = async (req, res) => {
	let id = req.params.id;
	try {
		let topic = await new Promise((resolve, reject) => {
			let sql = 'select good from Topic where id=?';
			db.query(sql, [id], (err, topics) => {
				if (err) {
					reject(err);
				} else {
					resolve(topics[0]);
				}
			});
		});
		if (!topic) {
			return res.json({
				err: 1,
				msg: '话题不存在'
			});
		}
		await new Promise((resolve, reject) => {
			let sql = 'update Topic set good=? where id=?';
			db.query(sql, [!topic.good, id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			})
		});
		res.json({
			err: 0
		});

	} catch (e) {
		res.json({
			err: 1,
			msg: '用户不存或密码错误'
		});
	}
};

exports.showHomePoster = async (req, res) => {
	try {
		let posters = await new Promise((resolve, reject) => {
			let sql = 'select * from Home_Poster';
			db.query(sql, (err, posters) => {
				if (err) {
					reject(err);
				} else {
					resolve(posters);
				}
			});
		});
		res.json({
			err: 0,
			posters
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.deleteHomePoster = async (req, res) => {
	let id = req.params.id;
	try {
		await new Promise((resolve, reject) => {
			let sql = 'delete from Home_Poster where id=?';
			db.query(sql, [id], err => {
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
exports.addHomePoster = async (req, res) => {
	let body = req.body;
	let CreateAt = moment().format('YYYY-MM-DD');
	try {
		await new Promise((resolve, reject) => {
			let sql = 'insert into Home_Poster(Poster, CreateAt) values(?, ?)';
			db.query(sql, [body.poster, CreateAt], err => {
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
		console.log(e);
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};