const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../model/db');

module.exports = async (req, res) => {
	let body = req.body;
	try {
		// let count = await new Promise((resolve, reject) => {
		// 	let sql = 'select Username from `User` where `Username`=?';
		// 	db.query(sql, [body.Username], (err, user) => {
		// 		if (err) {
		// 			reject(err);
		// 		} else {
		// 			resolve(user.length);
		// 		}
		// 	});
		// });

		// console.log(count);

		// if (count >= 1) {
		// 	return res.json({
		// 		errorcode: 111,
		// 		msg: '用户已经被注册'
		// 	});
		// }

		let hash = await new Promise((resolve, reject) => {
			bcrypt.hash(body.Password, saltRounds, function(err, hash) {
				if (err) {
					reject(err);
				} else {
					resolve(hash);
				}
			});
		});
		body.Password = hash;
		let result = await new Promise((resolve, reject) => {
			let sql = 'insert into `User` (`Username`, `Password`, `mobile`) values (?, ?, ?)';
			db.query(sql, [body.Username, body.Password, body.mobile], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		console.log(result);
		res.json({
			errorcode: 0,
			msg: '正确'
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};