const db = require('../model/db');
exports.allowMember = async (req, res) => {
	let id = req.params.id;
	let body = req.body;
	try {
		let result = await new Promise((resolve, reject) => {
			let sql = "update Member set Active=? where mid=?";
			db.query(sql, [body.Active, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		let result2 = await new Promise((resolve, reject) => {
			let sql = "update User set Member=? where user_id=?";
			db.query(sql, [body.Active, id], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		res.json({
			errorcode: 0,
			msg: '成功'
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器出错了'
		});
	}
};