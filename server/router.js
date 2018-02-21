//package
const Router = require('express').Router;
const bodyparser = require('body-parser');

//middleware
const authLogin = require('./middleware/auth').authLogin;

//controller
const login = require('./controller/log').login;
const logup = require('./controller/log').logup;
const logout = require('./controller/log').logout;
const getCaptcha = require('./controller/getCaptcha');
const checkMobile = require('./controller/checkout').checkMobile;
const checkUsername = require('./controller/checkout').checkUsername;
const checkCaptcha = require('./controller/checkout').checkCaptcha;
const checkEmail = require('./controller/checkout').checkEmail;
const getUser = require('./controller/user').getUser;

let router = Router();

router.get('/logout', logout);
router.get('/user', authLogin, getUser);

router.use(bodyparser.json());

router.post('/login', login);
router.post('/logup', logup);
router.post('/getcaptcha', getCaptcha);
router.post('/checkusername', checkUsername);
router.post('/checkmobile', checkMobile);
router.post('/checkcaptcha', checkCaptcha);
router.post('/checkemail', checkEmail);

module.exports = router;