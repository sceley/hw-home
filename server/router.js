//package
const Router = require('express').Router;
const bodyparser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

//db

const redis = require('./model/redis');

//controller
const login = require('./controller/log').login;
const logup = require('./controller/log').logup;
const getCaptcha = require('./controller/getCaptcha');
const checkMobile = require('./controller/checkout').checkMobile;
const checkUsername = require('./controller/checkout').checkUsername;
const checkCaptcha = require('./controller/checkout').checkCaptcha;

let router = Router();

router.use(bodyparser.json());
router.use(session({
    store: new RedisStore({
    	client: redis
    }),
    secret: 'hw club',
    resave: false
}));

router.post('/login', login);
router.post('/logup', logup);
router.post('/getcaptcha', getCaptcha);
router.post('/checkusername', checkUsername);
router.post('/checkmobile', checkMobile);
router.post('/checkcaptcha', checkCaptcha);

module.exports = router;