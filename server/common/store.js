const qn = require('qn');
const fs = require('fs');
const path = require('path');
const config = require('../config');

exports.cdnStore = async (buf) => {
	let client = qn.create(config.qn);
	let result = await new Promise((resolve, reject) => {
		client.upload(buf, function (err, result) {
			if (err) {
				reject(err);
			} else {
				resolve(result);
			}
		});
	});
	return result;
};

exports.localStore = async (buf) => {
	let time = Date.now();
	let result = await new Promise((resolve, reject) => {
		fs.writeFile(path.join(__dirname, '../public/img', `${String(time)}.png`), buf, err => {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve({
					url: `${config.server}/img/${time}.png`
				});
			}
		});
	});
	return result;
};