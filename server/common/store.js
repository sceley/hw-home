const qn = require('qn');

let access_key = '33mFN7fKO2h85Lf46XvJtkRAwu6HQ--KMWnbEqHn';
let secret_key = 'w4noe6Gkcd55yneKiW9oSxDesVW4k4FVVsXHYzal';

let bucket = 'sceley-store';
let origin = 'http://ozkbfywab.bkt.clouddn.com';
// let key = 'gitflow.png';



let client = qn.create({
	accessKey: access_key,
	secretKey: secret_key,
	bucket: bucket,
	origin: origin
});
exports.cdnStore = async (buf) => {
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