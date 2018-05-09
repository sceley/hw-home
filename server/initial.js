const db = require('./model/db');
const config = require('./config');
async function initial() {
    const admin = await new Promise((resolve, reject) => {
        const sql = 'select * from Admin';
        db.query(sql, (err, admins) => {
            if (err) {
                reject(err);
            } else {
                resolve(admins[0]);
            }
        });
    });
    if (admin) {
        return 0;
    }
    await new Promise((resolve, reject) => {
        const sql = 'insert into Admin(account, password) values(?, ?)';
        db.query(sql, [config.admin.account, config.admin.password], err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};
exports.initial = initial;