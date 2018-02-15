const http = require('http');
const Koa = require('koa');
const port = process.env.PORT || 8000;
const router = require('./router');


let app = new Koa();
let server = http.createServer(app.callback());

app.use(router.routes());

// app.use(router.allowedMethods());

// app.use(bodyparser());

server.listen(port, () => {
	console.log(`server run at //localhost:${port}`);
});