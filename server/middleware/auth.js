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
	if (!req.session.member) {
		return res.json({
			err: 1,
			msg: '不是会员，没有权限'
		});
	} else {
		next();
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