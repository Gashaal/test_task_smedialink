'use strict';

const passport = require('passport'),
  User = require('models/users'),
  VKontakteStrategy = require('passport-vkontakte').Strategy,
  config = require('config');

passport.use(new VKontakteStrategy(
  {
    clientID: config.vk.appId,
    clientSecret: config.vk.appSecret,
    callbackURL: "http://localhost:3000/auth/callback",
    scope: ['email'],
    profileFields: ['email'],
    lang: 'ru'
  }, (accessToken, refreshToken, params, profile, done) => {
    User.findOrCreate({
      where: {vkId: profile.id},
      defaults: {
        displayName: profile.displayName,
        avatar: profile.photo
      }
    }).then(user => { done(null, user[0]) });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({where: {id: id}}).then(user => { done(null, user) });
});

module.exports = passport;

 
 
