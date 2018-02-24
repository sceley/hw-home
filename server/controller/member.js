const db = require('../model/db');
exports.applyMember = async (req, res) => {
	let body = req.body;
	let Username = req.session.Username;
	try {
		let id = await new Promise((resolve, reject) => {
			let sql = 'select user_id from User where Username=?';
			db.query(sql, [Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0].user_id);
				}
			});
		});

		let result = await new Promise((resolve, reject) => {
			let sql = 'insert into Member(Name, Team, SchoolNumber, Description, mid) values(?, ?, ?, ?, ?)';
			db.query(sql, [body.Name, body.Team, body.SchoolNumber, body.Description, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '申请成功'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};

exports.getMembers = async (req, res) => {
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "select * from Member";
			db.query(sql, (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			members: result
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		})
	}
};