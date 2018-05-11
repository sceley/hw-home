const db = require('../model/db');
const moment = require('moment');

exports.addDiary = async (req, res) => {
	try {
		const body = req.body;
		if (!body.title) {
			return res.json({
				err: 1,
				msg: '标题不能为空'
			});
		}
		if (!body.poster) {
			return res.json({
				err: 1,
				msg: '海报不能为空'
			});
		}
		if (!body.text) {
			return res.json({
				err: 1,
				msg: '内容不能为空'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'insert into Diary(title, poster, text) values(?, ?, ?)';
			db.query(sql, [body.title, body.poster, body.text], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '添加成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.getDiaries = async (req, res) => {
	try {
		const diaries = await new Promise((resolve, reject) => {
			const sql = "select * from Diary";
			db.query(sql, (err, diaries) => {
				if (err) {
					reject(err);
				} else {
					resolve(diaries);
				}
			});
		});
		res.json({
			err: 0,
			diaries
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.delDiary = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.json({
				err: 1,
				msg: '缺少参数'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'delete from Diary where id=?';
			db.query(sql, [id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '删除成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.updateDiary = async (req, res) => {
	try {
		const id = req.params.id;
		const body = req.body;
		if (!id) {
			return res.json({
				err: 1,
				msg: '缺少参数'
			});
		}
		if (!body.title) {
			return res.json({
				err: 1,
				msg: '标题不能为空'
			});
		}
		if (!body.poster) {
			return res.json({
				err: 1,
				msg: '海报不能为空'
			});
		}
		if (!body.text) {
			return res.json({
				errr: 1,
				msg: '内容不能为空'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'update Diary set title=?, poster=?, text=? where id=?';
			db.query(sql, [body.title, body.poster, body.text, id], err => {
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
			msg: '服务器出错了'
		});
	}
};
exports.addEvent = async (req, res) => {
	try {
		const body = req.body;
		if (!body.title) {
			return res.json({
				err: 1,
				msg: '标题不能为空'
			});
		}
		if (!body.photos) {
			return res.json({
				err: 1,
				msg: '照片不能为空'
			});
		}
		if (!body.text) {
			return res.json({
				err: 1,
				msg: '内容不能为空'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'insert into Event(title, text) values(?, ?)';
			db.query(sql, [body.title, body.text], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		const id = await new Promise((resolve, reject) => {
			const sql = 'select id from Event where title=?';
			db.query(sql, [body.title], (err, events) => {
				if (err) {
					reject(err);
				} else {
					resolve(events[0].id);
				}
			});
		});
		body.photos.forEach(async photo => {
			await new Promise((resolve, reject) => {
				const sql = 'insert into Photo(url, event_id) values(?, ?)';
				db.query(sql, [photo, id], err => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				});
			})
		});
		res.json({
			err: 0,
			msg: '添加成功'
		});
	} catch (e) {
		console.log(e);
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.delEvent = async (req, res) => {
	try {
		const id = req.params.id;
		if (!id) {
			return res.json({
				err: 1,
				msg: '缺少参数'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'delete from Event where id=?';
			db.query(sql, [id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '删除成功'
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
		const events = await new Promise((resolve, reject) => {
			const sql = 'select * from Event';
			db.query(sql, (err, events) => {
				if (err) {
					reject(err);
				} else {
					resolve(events);
				}
			});
		});
		const photos = await new Promise((resolve, reject) => {
			const sql = 'select id as uid, url from Photo';
			db.query(sql, (err, photos) => {
				if (err) {
					reject(err);
				} else {
					resolve(photos);
				}
			});
		})
		res.json({
			err: 0,
			events,
			photos
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.updateEvent = async (req, res) => {
	try {
		const id = req.params.id;
		const body = req.body;
		if (!id) {
			return res.json({
				err: 1,
				msg: '缺少参数'
			});
		}
		if (!body.title) {
			return res.json({
				err: 1,
				msg: '标题不能为空'
			});
		}
		if (!body.photos) {
			return res.json({
				err: 1,
				msg: '照片不能为空'
			});
		}
		if (!body.text) {
			return res.json({
				errr: 1,
				msg: '内容不能为空'
			});
		}
		await new Promise((resolve, reject) => {
			const sql = 'update Event set title=?, text=? where id=?';
			db.query(sql, [body.title, body.text, id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			const sql = 'delete from Photo where event_id=?';
			db.query(sql, [id], err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		})
		res.json({
			err: 0,
			msg: '更新成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};