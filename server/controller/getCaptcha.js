const config = require('../config');
const redis = require('../model/redis');
const sendCaptcha = require('../common/mail').sendCaptcha;
module.exports = async (req, res) => {
	let body = req.body;
	let num = String(Math.random()).slice(-6);
	try {
		await sendCaptcha(body.Email, num);
		await new Promise((resolve, reject) => {
			redis.set(body.Email, num, 'EX', 60 * 10, (err) => {
				if (err) {
					console.log(err);
					reject(err);
				} else {
					resolve();
				}
			});			
		});
		res.json({
			err: 0
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器错误'
		});
	}

};