const db = require('../model/db');
const moment = require('moment');
exports.comment = async (req, res) => {
    try {
        const body = req.body;
        const user_id = req.session.user_id;
        const event_id = req.params.id;
        const createAt = moment().format('YYYY-MM-DD HH:mm:ss');
        if (!body.text) {
            return res.json({
                err: 1,
                msg: '内容不能为空'
            });
        }
        if (!event_id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'insert into Comment(author_id, event_id, text, createAt) values(?, ?, ?, ?)';
            db.query(sql, [user_id, event_id, body.text, createAt], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '评论成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.getComments = async (req, res) => {
    try {
        const event_id = req.params.id;
        if (!event_id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        const comments = await new Promise((resolve, reject) => {
            const sql = `select text, createAt, username as author from Comment 
                        left join User on User.id=Comment.author_id where event_id=?`;
            db.query(sql, [event_id], (err, comments) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(comments);
                }
            });
        });
        res.json({
            err: 0,
            comments
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};