const db = require('../model/db');
const moment = require('moment');
exports.createEvent = async (req, res) => {
	let body = req.body;
	let CreateAt = moment().format('YYYY-MM-DD HH:MM');
	try {
		await new Promise((resolve, reject) => {
			let sql = 'insert into Event(Text, Poster, Link, CreateAt)values(?, ?, ?, ?)';
			db.query(sql, [body.Text, body.Poster, body.Link, CreateAt], err => {
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

exports.getEvents = async (req, res) => {
	try {
		let events = await new Promise((resolve, reject) => {
			let sql = 'select * from Event';
			db.query(sql, (err, events) => {
				if (err) {
					reject(err);
				} else {
					resolve(events);
				}
			});
		});
		res.json({
			err: 0,
			events
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};