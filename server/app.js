const http = require('http');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const port = require('./config').port;
const router = require('./router');
const redis = require('./model/redis');

let app = express();
let server = http.createServer(app);

app.use(session({
    secret: 'hw-club',
    key: 'community',
    cookie: {
    	maxAge: 1000 * 60 * 20
    },
    store: new RedisStore({
    	client: redis
    }),
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.use(router);

server.listen(port, () => {
	console.log(`server run at http://localhost:${port}`);
});