const db = require('../model/db');

exports.addDepartment = async (req, res) => {
    try {
        const body = req.body;
        if (!body.title) {
            return res.json({
                err: 1,
                msg: '标题不能为空'
            });
        }
        if (!body.subtitle) {
            return res.json({
                err: 1,
                msg: '子标题不能为空'
            });
        }
        if (!body.text) {
            return res.json({
                errr: 1,
                msg: '内容不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'insert into DepartmentIntr(title, subtitle, text) values(?, ?, ?)';
            db.query(sql, [body.title, body.subtitle, body.text], err => {
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
        
    }
};
exports.delDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'delete from DepartmentIntr where id=?';
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
exports.updateDepartment = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (!id) {
            return res.json({
                err: 1,
                msg: '缺少参数'
            });
        }
        if (!body.title) {
            return res.json({
                err: 1,
                msg: '标题不能为空'
            });
        }
        if (!body.subtitle) {
            return res.json({
                err: 1,
                msg: '子标题不能为空'
            });
        }
        if (!body.text) {
            return res.json({
                errr: 1,
                msg: '内容不能为空'
            });
        }
        await new Promise((resolve, reject) => {
            const sql = 'update DepartmentIntr set title=?, subtitle=?, text=? where id=?';
            db.query(sql, [body.title, body.subtitle, body.text, id], err => {
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
exports.getDepartments = async (req, res) => {
    try {
        const departments = await new Promise((resolve, reject) => {
            const sql = "select * from DepartmentIntr";
            db.query(sql, (err, departments) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(departments);
                }
            });
        });
        res.json({
            err: 0,
            departments
        });
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
}