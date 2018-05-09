const http = require('http');
const path = require('path');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const config = require('./config');
const router = require('./router');
const redis = require('./model/redis');
const initial = require('./initial').initial;

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'helloworld',
    key: 'community',
    cookie: {
    	maxAge: 1000 * 60 * 20 * 100
    },
    store: new RedisStore({
    	client: redis
    }),
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
	// res.header('Access-Control-Allow-Credentials', true);
	next();
});

app.use(router);

server.listen(config.server.port, () => {
	console.log(`server run at http://localhost:${config.server.port}`);
});
initial();