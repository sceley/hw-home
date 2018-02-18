const http = require('http');
const express = require('express');
const port = require('./config').port;
const router = require('./router');


let app = express();
let server = http.createServer(app);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
	next();
});

app.use(router);

server.listen(port, () => {
	console.log(`server run at http://localhost:${port}`);
});