const db = require('../model/db');
const moment = require('moment');
exports.showMessageInput = async (req, res) => {
	let id = req.params.id;
	try {
		let user = await new Promise((resolve, reject) => {
			let sql = 'select Avatar, Username from User where id=?';
			db.query(sql, [id], (err, users) => {
				if (err)
					reject(err);
				else 
					resolve(users[0]);
			});
		});
		res.json({
			err: 0,
			user
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务出错了'
		});
	}
};
exports.createMessage = async (req, res) => {
	let tid = req.params.id;
	let fid = req.session.uid;
	let body = req.body;
	let CreateAt = moment().format('YYYY-MM-DD');
	try {
		await new Promise((resolve, reject) => {
			let sql = 'insert into Message(Message, fid, tid, CreateAt) values(?, ?, ?, ?)';
			db.query(sql, [body.Message, fid, tid, CreateAt], (err) => {
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
			msg: '服务器出错了'
		});
	}
};
exports.getMessage = async (req, res) => {
	let uid = req.session.uid;
	try {
		let messages = await new Promise((resolve, reject) => {
			let sql = 'select Username, Message from Message left join User on User.id=Message.tid where tid=?';
			db.query(sql, [uid], (err, messages) => {
				if (err) {
					reject(err);
				} else {
					resolve(messages);
				}
			});
		});
		res.json({
			err: 0,
			messages
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};