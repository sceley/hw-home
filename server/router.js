//package
const Router = require('express').Router;
const bodyparser = require('body-parser');

//controller
const login = require('./controller/login');
const logup = require('./controller/logup');
const getCaptcha = require('./controller/getCaptcha');


let router = Router();

router.use(bodyparser.json());

router.post('/login', login);

router.post('/logup', logup);

router.post('/getcaptcha', getCaptcha);

module.exports = router;