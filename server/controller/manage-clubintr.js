const db = require('../model/db');
const moment = require('moment');
exports.addHistory = async (req, res) => {
    try {
        const body = req.body;
        if (!body.title) {
            return res.json({
                err: 1,
                msg: '标题不能为空'
            });
        }
        if (!body.date) {
            return res.json({
                err: 1,
                msg: '日期不能为空'
            });
        }
        body.date = moment(body.date).format("YYYY-MM-DD");
        await new Promise((resolve, reject) => {
            const sql = 'insert into History(title, date) values(?, ?)';
            db.query(sql, [body.title, body.date], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '添加成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.delHistory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'delete from History where id=?';
            db.query(sql, [id], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '删除成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.getHistorys = async (req, res) => {
    try {
        const historys = await new Promise((resolve, reject) => {
            const sql = "select * from History";
            db.query(sql, (err, historys) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(historys);
                }
            });
        });
        res.json({
            err: 0,
            historys
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.addAchievement = async (req, res) => {
    try {
        const body = req.body;
        if (!body.title) {
            return res.json({
                err: 1,
                msg: '标题不能为空'
            });
        }
        if (!body.poster) {
            return res.json({
                err: 1,
                msg: '海报不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'insert into Achievement(title, poster) values(?, ?)';
            db.query(sql, [body.title, body.poster], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '添加成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.delAchievement = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'delete from Achievement where id=?';
            db.query(sql, [id], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '删除成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
exports.getAchievements = async (req, res) => {
    try {
        const achievements = await new Promise((resolve, reject) => {
            const sql = "select * from Achievement";
            db.query(sql, (err, achievements) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(achievements);
                }
            });
        });
        res.json({
            err: 0,
            achievements
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};
