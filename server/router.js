const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');


let router = new Router();
router.use(bodyparser());

router.get('/', async ctx => {
	ctx.body = "helloworld";
});

router.get('/new', async ctx => {
	ctx.body = 'new';
});

router.post('/new', async ctx => {
	console.log(ctx.request);
	ctx.body = ctx.request.body;
	console.log(ctx.request.files);
});

module.exports = router;