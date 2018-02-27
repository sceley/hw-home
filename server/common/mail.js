const nodemailer = require('nodemailer');
// const 
const fs = require('fs');
let transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "sceley520@126.com",
        pass: "16051223hw"
    }
});
exports.sendCaptcha = async (req, res) => {
    let mailOptions = {
        from: '<sceley520@126.com>', // sender address
        to: '<292452530@qq.com>', // list of receivers
        subject: 'HelloWolrdTeam', // Subject line
        html: fs.readFileSync('./index.html') // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
};