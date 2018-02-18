const bcrypt = require('bcrypt');
const db = require('../model/db');

module.exports = async (req, res) => {
	let body = req.body;
	try {
		let hash = await new Promise((resolve, reject) => {
			let sql = 'select `Password` from User where `Username`=?';
			db.query(sql, [body.Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
		let result = await new Promise((resolve, reject) => {
			bcrypt.compare(body.Password, hash, function(err, res) {
			   if (err) {

			   } else {

			   } 
			});
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};