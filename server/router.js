//package
const Router = require('express').Router;
const bodyparser = require('body-parser');
const multer = require('multer');

//middleware
const authLogin = require('./middleware/auth').authLogin;
const authMember = require('./middleware/auth').authMember;
const authAdmin = require('./middleware/auth').authAdmin;

//controller
const login = require('./controller/log').login;
const logup = require('./controller/log').logup;
const logout = require('./controller/log').logout;
const getCaptcha = require('./controller/getCaptcha');
const checkMobile = require('./controller/checkout').checkMobile;
const checkUsername = require('./controller/checkout').checkUsername;
const checkCaptcha = require('./controller/checkout').checkCaptcha;
const checkEmail = require('./controller/checkout').checkEmail;
const getUserByLogin = require('./controller/user').getUserByLogin;
const getUserById = require('./controller/user').getUserById;
const editUser = require('./controller/user').editUser;
const uploadAvatar = require('./controller/user').uploadAvatar;
const careUser = require('./controller/user').careUser;
const upload = require('./controller/upload').upload;
const createArticle = require('./controller/article').createArticle;
const getArticles = require('./controller/article').getArticles;
const getArticle = require('./controller/article').getArticle;
const getArticlesCount = require('./controller/article').getArticlesCount;
const articleComment = require('./controller/article').articleComment;
const articleLike = require('./controller/article').articleLike;
const articleCommentLike = require('./controller/article').articleCommentLike;
const articleCollect = require('./controller/article').articleCollect;
const applyMember = require('./controller/member').applyMember;
const getMembers = require('./controller/member').getMembers
const createTopic = require('./controller/topic').createTopic;
const getTopics = require('./controller/topic').getTopics;
const getTopic = require('./controller/topic').getTopic;
const topicCommentLike = require('./controller/topic').topicCommentLike;
const getTopicsCount = require('./controller/topic').getTopicsCount;
const topicComment = require('./controller/topic').topicComment;
const topicCollect = require('./controller/topic').topicCollect;
const allowMember = require('./controller/admin').allowMember;
const adminLogin = require('./controller/admin').adminLogin;

let router = Router();

router.get('/logout', logout);
router.get('/user', authLogin, getUserByLogin);
router.get('/user/:id', getUserById);
router.get('/user/care/:id', careUser);
router.get('/articles', getArticles);
router.get('/article/:id', getArticle);
router.get('/articles/count', getArticlesCount);
router.get('/article/:id/like', articleLike);
router.get('/article/comment/:aid/:acid/like', articleCommentLike);
router.get('/article/:id/collect', articleCollect);
router.get('/members', getMembers);
router.get('/topics', getTopics);
router.get('/topic/:id', getTopic);
router.get('/topics/count', getTopicsCount);
router.get('/topic/comment/:tid/:tcid/like', topicCommentLike);
router.get('/topic/:id/collect', topicCollect);

//authAdmin
router.get('/member/:id/allow', authAdmin, allowMember);

router.use(bodyparser.json());

//noAuth
router.post('/login', login);
router.post('/logup', logup);
router.post('/getcaptcha', getCaptcha);
router.post('/checkusername', checkUsername);
router.post('/checkmobile', checkMobile);
router.post('/checkcaptcha', checkCaptcha);
router.post('/checkemail', checkEmail);
router.post('/admin/login', adminLogin);
//authLogin
router.post('/user/uploadavatar', multer().single('avatar'), authLogin, uploadAvatar);
router.post('/user/upload', multer().single('image'), authLogin, upload);
router.post('/user/edit', authLogin, editUser);
router.post('/article/:id/comment', authLogin, articleComment);
router.post('/topic/:id/comment', authLogin, topicComment);
router.post('/member/apply', authLogin, applyMember);
//authMember
router.post('/article/create', authLogin, authMember, createArticle);
// router.post('/article/create', createArticle);

router.post('/topic/create', authLogin, authMember, createTopic);
// router.post('/topic/create', authLogin, createTopic);

module.exports = router;