const db = require('../model/db');

exports.applyMember = async (req, res) => {
	let body = req.body;
	let uid = req.session.uid;
	try {
		await new Promise((resolve, reject) => {
			let sql = 'insert into Member(Name, Team, SchoolNumber, Description, uid) values(?, ?, ?, ?, ?)';
			db.query(sql, [body.Name, body.Team, body.SchoolNumber, body.Description, uid], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		res.json({
			err: 0,
			msg: '申请成功'
		});
	} catch (e) {
		res.json({
			err: 555,
			msg: '服务器出错了'
		});
	}
};

exports.getMembers = async (req, res) => {
	try {
		let members = await new Promise((resolve, reject) => {
			let sql = "select * from Member";
			db.query(sql, (err, members) => {
				if (err) {
					reject(err);
				} else {
					resolve(members);
				}
			});
		});
		res.json({
			err: 0,
			members
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		})
	}
};