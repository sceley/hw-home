const db = require('../model/db');
exports.authLogin = async (req, res, next) => {
	if (!req.session.uid) {
		return res.json({
			err: 1,
			msg: '还未登录'
		});
	} else {
		next();
	}
};

exports.authMember = async (req, res, next) => {
	let uid = req.session.uid;
	console.log(uid);
	try {
		let member = await new Promise((resolve, reject) => {
			let sql = 'select Active from Member where uid=? limit 1';
			db.query(sql, [uid], (err, members) => {
				if (err) {
					reject(err);
				} else {
					resolve(members[0]);
				}
			});
		});
		if (member && member.Active) {
			next();
		} else {
			res.json({
				err: 1,
				msg: '不是会员，没有权限'
			});
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};

exports.authAdmin = async (req, res, next) => {
	if (!req.session.admin) {
		return res.json({
			err: 1,
			msg: '不是管理员，没有权限'
		});
	} else {
		next();
	}
};