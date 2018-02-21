const config = require('../config');
const redis = require('../model/redis');

module.exports = async (req, res) => {
	let body = req.body;
	let num = Math.ceil(Math.random() * 1000000);
	try {
		let result = await new Promise((resolve, reject) => {
				redis.set(body.Mobile, num, 'EX', 60 * 10, (err, result) => {
					if (err) {
						reject(err);
					} else {
						resolve(result);
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