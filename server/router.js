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
const getBanners = require('./controller/manage-home').getBanners;
const getRecEve = require('./controller/manage-home').getRecEve;
const addRecEve = require('./controller/manage-home').addRecEve;
const delRecEve = require('./controller/manage-home').delRecEve;
const updateRecEve = require('./controller/manage-home').updateRecEve;
const addHistory = require('./controller/manage-clubintr').addHistory;
const delHistory = require('./controller/manage-clubintr').delHistory;
const getHistorys = require('./controller/manage-clubintr').getHistorys;
const addAchievement = require('./controller/manage-clubintr').addAchievement;
const delAchievement = require('./controller/manage-clubintr').delAchievement;
const getAchievements = require('./controller/manage-clubintr').getAchievements;
const getDepartments = require('./controller/manage-deparintr').getDepartments;
const delDepartment = require('./controller/manage-deparintr').delDepartment;
const addDepartment = require('./controller/manage-deparintr').addDepartment;
const updateDepartment = require('./controller/manage-deparintr').updateDepartment;
// const createEvent = require('./controller/event').createEvent;
// const getEvents = require('./controller/event').getEvents;
// const getEvent = require('./controller/event').getEvent;

const router = Router();

//get
router.get('/user/logout', userLogout);
router.get('/user/info', authUserLogin, getUserInfo);
router.get('/admin/logout', authAdminLogin, adminLogout);
router.get('/event/comments', getComments);
router.get('/banners', getBanners);
router.get('/recentevents', getRecEve);
router.get('/achievements', getAchievements);
router.get('/historys', getHistorys);
router.get('/departments', getDepartments);
//del
router.delete('/manage/banner/:id', authAdminLogin, delBanner);
router.delete('/manage/recentevent/:id', authAdminLogin, delRecEve);
router.delete('/manage/history/:id', authAdminLogin, delHistory);
router.delete('/manage/achievement/:id', authAdminLogin, delAchievement);
router.delete('/manage/department/:id', authAdminLogin, delDepartment);

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
router.post('/manage/recentevent', authAdminLogin, addRecEve);
router.post('/manage/recentevent/:id/update', authAdminLogin, updateRecEve);
router.post('/manage/history', authAdminLogin, addHistory);
router.post('/manage/achievement', authAdminLogin, addAchievement);
router.post('/manage/department', authAdminLogin, addDepartment);
router.post('/manage/department/:id/update', authAdminLogin, updateDepartment);

module.exports = router;