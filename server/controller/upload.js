const upload = require('../common/upload');

exports.uploadImg = async (req, res) => {
    try {
        const file = req.file;
        const _res = await upload.uploadImg(file);
        res.json(_res);
    } catch (e) {
        res.json({
            err: 1,
            msg: '服务器出错了'
        });
    }
};