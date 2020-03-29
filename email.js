const nodemailer = require("nodemailer");
const schedule = require('node-schedule');

var sendDate = "0 0 30 3 2020 *";//设置发送时间
var fromPerson = "张张你大爷<1218294773@qq.com>" //发送者
var toPerson = "1326155622@qq.com" //接收者。可以发送多个用户，用逗号隔开
var subject = "hello world" //主题
var content = "爱你的第n天" //内容

/* 发送邮件 */
function sendMail(from, to, subject, content) {
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
        from: from,
        subject: subject,
        to: to,
        html: content
    }, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response)
    })
}

/* 
schedule参数讲解

* * * * * *
┬ ┬ ┬ ┬ ┬ ┬
│ │ │ │ │ |
│ │ │ │ │ └ dayOfWeek (0 - 7) (0 or 7 is Sun)
│ │ │ │ └───── month (1 - 12)
│ │ │ └────────── dayOfMonth (1 - 31)
│ │ └─────────────── hour (0 - 23)
│ └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
6个占位符从左到右分别代表：秒、分、时、日、月、周几

举例：
    每分钟的第30秒触发： '30 * * * * *'
    每小时的1分30秒触发 ：'30 1 * * * *'
    每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
    每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
    2020年的1月1日1点1分30秒触发 ：'30 1 1 1 2020 *'
    每周1的1点1分30秒触发 ：'30 1 1 * * 1'
*/

/* 定时发送 */
function scheduleCronstyle(date) {
    schedule.scheduleJob(date, () => {
        sendMail(fromPerson,toPerson,subject,content)
    });
}
