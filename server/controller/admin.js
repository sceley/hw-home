const db = require('../model/db');
const config = require('../config');
exports.allowMember = async (req, res) => {
	let id = req.params.id;
	try {
		await new Promise((resolve, reject) => {
			let sql = "update Member set Active=!Active where uid=?";
			db.query(sql, [id], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
		await new Promise((resolve, reject) => {
			let sql = "update User set Member=!Member where uid=?";
			db.query(sql, [id], (err) => {
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