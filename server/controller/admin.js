const db = require('../model/db');
exports.login = async (req, res) => {
    try {
        const body = req.body;
        if (!body.account) {
            return res.json({
                err: 1,
                msg: '账号格式不正确'
            });
        }
        if (!body.password) {
            return res.json({
                err: 1,
                msg: '密码格式不正确'
            });
        }
        const admin = await new Promise((resolve, reject) => {
            const sql = 'select id from Admin where account=? and password=?';
            db.query(sql, [body.account, body.password], (err, admins) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(admins[0]);
                }
            });
        });
        if (admin) {
            req.session.admin_id = admin.id;
            res.json({
                err: 0,
                msg: '登录成功'
            });
        } else {
            res.json({
                err: 1,
                msg: '账号或密码不正确'
            });
        }
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.logout = async (req, res) => {
    try {
        req.session.admin_id = null;
        res.json({
            err: 0,
            msg: '退出登录成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};