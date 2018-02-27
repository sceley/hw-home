// const cdnStore = require('../common/store').cdnStore;
const localStore = require('../common/store').localStore;
exports.upload = async (req, res) => {
	try {
		let json = await localStore(req.file.buffer)
		res.json({
			err: 0,
			url: json.url,
			msg: '上传成功'
		});
	} catch (e) {
		res.json({
			err: 1,
			msg: "服务器错误"
		});
	}
	
};