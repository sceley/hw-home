const fs = require('fs');
const config = require('../config');
const path = require('path');
exports.uploadImg = async (file) => {
    try {
        const buf = file.buffer;
        const time = Date.now();
        const index = file.originalname.lastIndexOf('.');
        const extension = file.originalname.slice(index);
        const filename = `${time}${extension}`;
        const storepath = path.join(__dirname, `../public/img/${filename}`);
        const url = `${config.server.host}/img/${filename}`;
        await new Promise((resolve, reject) => {
            fs.writeFile(storepath, buf, err => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
        return {
            err: 0,
            url: url
        }
    } catch (e) {
        return {
            err: 1,
            msg: '服务器出错了'
        }
    }
};