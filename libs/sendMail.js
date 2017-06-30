'use strict';

const 
  nodemailer = require('nodemailer'),
  config = require('config');

module.exports = (message) => {
  const smptConfig = config.smptConfig;
  const transporter = nodemailer.createTransport(smptConfig);
  
  const mailOptions = {
      from: '"Регистрация" <dyachenko@ucoz-team.net>', 
      to: config.admin.email,
      subject: 'Вечеринка',
      text: message,
      html: message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return console.log(error);
    }
    
    console.log('Message sent: ' + info.response);
  });
}
