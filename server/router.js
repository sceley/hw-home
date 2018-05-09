//package
const Router = require('express').Router;
const bodyparser = require('body-parser');
const multer = require('multer');

//middleware
const authUserLogin = require('./middleware/auth').authUserLogin;
const authAdminLogin = require('./middleware/auth').authAdminLogin;

//controller
const userLogin = require('./controller/user').login;
const userLogup = require('./controller/user').logup;
const userLogout = require('./controller/user').logout;
const getUserInfo = require('./controller/user').getUserInfo;
const editUserInfo = require('./controller/user').editUserInfo;
const adminLogin = require('./controller/admin').login;
const adminLogout = require('./controller/admin').logout;
const uploadImg = require('./controller/upload').uploadImg;
const comment = require('./controller/comment').comment;
const getComments = require('./controller/comment').getComments;
const addBanner = require('./controller/manage-home').addBanner;
const delBanner = require('./controller/manage-home').delBanner;
const addRecEve = require('./controller/manage-home').addRecEve;
// const createEvent = require('./controller/event').createEvent;
// const getEvents = require('./controller/event').getEvents;
// const getEvent = require('./controller/event').getEvent;

const router = Router();

//get
router.get('/user/logout', userLogout);
router.get('/user/info', authUserLogin, getUserInfo);
router.get('/admin/logout', authAdminLogin, adminLogout);
router.get('/event/comments', getComments);
//del
router.delete('/manage/banner/:id', authAdminLogin, delBanner);

//upload file
router.post('/api/upload/img', authAdminLogin, multer().single('image'), uploadImg);

router.use(bodyparser.json());

//post
router.post('/user/login', userLogin);
router.post('/user/logup', userLogup);
router.post('/user/info/edit', authUserLogin, editUserInfo);
router.post('/event/:id/comment', authUserLogin, comment);
router.post('/admin/login', adminLogin);
router.post('/manage/banner', authAdminLogin, addBanner);
router.post('/manage/receve', authAdminLogin, addRecEve);


module.exports = router;