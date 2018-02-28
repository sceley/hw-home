module.exports = {
	port: 8080,
	db: {
		host     : 'localhost',
		user     : 'root',
		password : '16051223',
		database : 'hw'
	},
	email: {
	    host: 'smtp.126.com',
	    port: 465,
	    secure: true, // true for 465, false for other ports
	    auth: {
	        user: "sceley520@126.com",
	        pass: "16051223hw"
	    }
	},
	qn: {
		accessKey: '33mFN7fKO2h85Lf46XvJtkRAwu6HQ--KMWnbEqHn',
		secretKey: 'w4noe6Gkcd55yneKiW9oSxDesVW4k4FVVsXHYzal',
		bucket: 'sceley-store',
		origin: 'http://ozkbfywab.bkt.clouddn.com'
	},
	admin: {
		user: 'sceley520',
		pass: '16051223'
	},
	server: 'http://localhost:8080'
};