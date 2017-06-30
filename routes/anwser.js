'use strict';

const
  router = require('express').Router(),
  Anwser = require('models/anwsers'),
  User = require('models/users'),
  ensureAuthenticated = require('routes/ensureAuth'),
  sendMail = require('libs/sendMail');
  
router.route('/', ensureAuthenticated)
  .post((req, res, next) => {
    const anwser = JSON.parse(req.body.anwser);
    const data = {
      userId: req.user.id,
      willCome: anwser.willCome,
      drinks: anwser.drinks.toString()
    }
    
    Anwser.create(data)
      .then(() => { 
        User.findOne({where: {id: req.user.id}})
          .then(user => {
            sendMail(`Пользователь ${user.displayName} оставил ответ`);
          });
        res.send('OK');
      })
      .catch(error => {
        console.log(error);
        next(error);
      });
  })
  .delete((req, res, next) => {
    Anwser.destroy({where: {userId: req.user.id}})
      .then(() => {
        User.findOne({where: {id: req.user.id}})
          .then(user => {
            sendMail(`Пользователь ${user.displayName} удалил ответ`);
          }); 
        res.send('OK');
      })
      .catch(error => {
        console.log(error);
        next(error);
      });
  });
  
module.exports = router;
