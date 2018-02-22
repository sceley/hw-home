//package
const Router = require('express').Router;
const bodyparser = require('body-parser');
const multer = require('multer');

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
const editUser = require('./controller/user').editUser;
const uploadAvatar = require('./controller/user').uploadAvatar;

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
router.post('/user/edit', editUser);
router.post('/user/uploadavatar', multer().single('avatar'), authLogin, uploadAvatar);

module.exports = router;