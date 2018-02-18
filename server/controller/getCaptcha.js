const config = require('../config');

module.exports = async (req, res) => {
	res.json({
		errorcode: 0,
		captcha: '555555',
		msg: '正确'
	});
};