const cdnStore = require('../common/store').cdnStore;
exports.upload = async (req, res) => {
	try {
		let json = await cdnStore(req.file.buffer)
		console.log(json);
		res.json({
			errorcode: 0,
			url: json.url,
			msg: '上传成功'
		});
	} catch (e) {
		console.log(e);
		res.json({
			errorcode: 555,
			msg: "服务器错误"
		});
	}
	
};