const nodemailer = require('nodemailer')
const {SUBSCRIBE_USERS} = require('../config') // Subscribe user email

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  // port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'quanchuan@live.cn', // generated ethereal user
    pass: 'www19930910', // generated ethereal password
  },
})

const mailOptions = {
  from: '权川的个人网站', // sender address
  to: '603803799@qq.com', // list of receivers
  // bcc: SUBSCRIBE_USERS.join(','),
  subject: 'Hello world', // Subject line
  text: 'Hello world', // plain text body
  // html: '<b>Hello world</b>', // html body
}

module.exports = option => {

  mailOptions.form = option.title
  mailOptions.subject = option.subject
  mailOptions.text = option.message
  mailOptions.bcc = option.bcc

  return transporter.sendMail(mailOptions,
    (error, info) => {
      if (error) {
        console.error(error)
      } else {
        option.callback && option.callback(info)
      }
    })
}
