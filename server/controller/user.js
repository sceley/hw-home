const db = require('../model/db');

exports.getUser = async (req, res) => {
	let Username = req.session.Username;
	console.log(Username);
	let sql = 'select * from User where Username=?';
	try {
		let user = await new Promise((resolve, reject) => {
			db.query(sql, [Username], (err, result) => {
				if (err) {
					reject(err);
				} else {
					resolve(result[0]);
				}
			});
		});
		res.json({
			errorcode: 0,
			user
		});
	} catch (e) {
		res.json({
			errorcode: 555,
			msg: '服务器错误'
		});
	}
};

exports.postUser = async (req, res) => {

};

exports.editUser = async (req, res) => {
	
};