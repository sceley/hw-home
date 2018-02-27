const nodemailer = require('nodemailer');
const config = require('../config');
let transporter = nodemailer.createTransport(config.email);
exports.sendCaptcha = async (Email, num) => {
    let mailOptions = {
        from: 'HelloWorld社团<sceley520@126.com>', // sender address
        to: Email, // list of receivers
        subject: 'HelloWorld社团注册验证码', // Subject line
        html: `<div><p>Hi，欢迎您光顾HelloWorld社团。
        我们是HelloWorld社团提供的一个休闲与技术交流并济网站，
        致力于为对HelloWorld社团感兴趣的小伙伴提供的交流场所。</p>
        <a href="javascript:;" style="color: red, fontSize: 2em">${num}</a></div>` // html body
    };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};