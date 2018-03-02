const db = require('../model/db');
const moment = require('moment');
exports.createEvent = async (req, res) => {
	let body = req.body;
	let CreateAt = moment().format('YYYY-MM-DD');
	try {
		await new Promise((resolve, reject) => {
			let sql = 'insert into Event(Body, Poster, Title, CreateAt)values(?, ?, ?, ?)';
			db.query(sql, [body.Body, body.Poster, body.Title, CreateAt], err => {
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
exports.getEvent = async (req, res) => {
	let id = req.params.id;
	try {
		let event = await new Promise((resolve, reject) => {
			let sql = 'select * from Event where id=?';
			db.query(sql, [id], (err, event) => {
				if (err) {
					reject(err);
				} else {
					resolve(event[0]);
				}
			});
		});
		res.json({
			err: 0,
			event
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
}