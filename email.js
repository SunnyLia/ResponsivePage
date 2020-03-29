const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',//这是qq邮箱,如果用163邮箱则为smtp.163.com
    secure: true,
    port: 465,
    auth: {
        user: '####',//发件人邮箱账号
        pass: '####' //发件人邮箱授权码
    }
})

transporter.sendMail({
    from: '张张你大爷<1218294773@qq.com>',
    subject: 'hello world', //主题
    to: '1326155622@qq.com',//可以发送多个用户，用逗号隔开
    html: '<a href="https://www.baidu.com">张张你大爷</a>'
}, function (error, info) {
    if (error) {
        return console.log(error);
    }
    console.log('mail sent:', info.response)
})
