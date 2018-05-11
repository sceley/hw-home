const db = require('../model/db');
exports.addBanner = async (req, res) => {
    try {
        const body = req.body;
        if (!body.poster) {
            return res.json({
                err: 1,
                msg: '海报不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'insert into Banner(poster) values(?)';
            db.query(sql, [body.poster], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '上传成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器发生错误'
        });
    }
};
exports.getBanners = async (req, res) => {
    try {
        const banners = await new Promise((resolve, reject) => {
            const sql = 'select id as uid, poster as url from Banner';
            db.query(sql, (err, banners) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(banners);
                }
            });
        });
        res.json({
            err: 0,
            banners
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器发生错误'
        });
    }
}
exports.delBanner = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'delete from Banner where id=?';
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
            msg: '服务器发生错误'
        });
    }
};
exports.getRecEve = async (req, res) => {
    try {
        const recentevents = await new Promise((resolve, reject) => {
            const sql = "select * from RecentEvent";
            db.query(sql, (err, recentevents) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(recentevents);
                }
            });
        });
        res.json({
            err: 0,
            recentevents
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器发生错误'
        });
    }
};
exports.addRecEve = async (req, res) => {
    try {
        const body = req.body;
        if (!body.poster) {
            return res.json({
                err: 1,
                msg: '海报不能为空'
            });
        }
        if (!body.link) {
            return res.json({
                err: 1,
                msg: '链接不能为空'
            });
        }
        if (!body.text) {
            return res.json({
                err: 1,
                msg: '文本内容不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'insert into RecentEvent(poster, link, text) values(?, ?, ?)';
            db.query(sql, [body.poster, body.link, body.text], err => {
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
            msg: '服务器发生错误'
        });
    }
};
exports.delRecEve = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                err: 1,
                msg: '参数缺少'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'delete from RecentEvent where id=?';
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
exports.updateRecEve = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id) {
            return res.json({
                err: 1,
                msg: '参数缺少'
            });
        }
        if (!body.poster) {
            return res.json({
                err: 1,
                msg: '海报不能为空'
            });
        }
        if (!body.link) {
            return res.json({
                err: 1,
                msg: '链接不能为空'
            });
        }
        if (!body.text) {
            return res.json({
                err: 1,
                msg: '文本内容不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'update RecentEvent set poster=?, text=?, link=?  where id=?';
            db.query(sql, [body.poster, body.text, body.link, id], err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
        res.json({
            err: 0,
            msg: '更新成功'
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};