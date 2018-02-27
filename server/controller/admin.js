const db = require('../model/db');
exports.allowMember = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	try {
		await new Promise((resolve, reject) => {
			let sql = "update Member set Active=? where uid=?";
			db.query(sql, [body.Active, id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "update User set Member=? where uid=?";
			db.query(sql, [body.Active, id], (err) => {
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
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};