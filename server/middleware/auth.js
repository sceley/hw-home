exports.authUserLogin = async (req, res, next) => {
	try {
		if (!req.session.user_id) {
			return res.json({
				err: 1,
				msg: '还用户还未登录'
			});
		} else {
			next();
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};
exports.authAdminLogin = async (req, res, next) => {
	try {
		if (!req.session.admin_id) {
			return res.json({
				err: 1,
				msg: '管理员还未登录'
			});
		} else {
			next();
		}
	} catch (e) {
		res.json({
			err: 1,
			msg: '服务器出错了'
		});
	}
};