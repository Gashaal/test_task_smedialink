'use strict';

const
  router = require('express').Router(),
  passport = require('passport'),
  passportStrategy = require('libs/auth');

router.get('/', passport.authenticate('vkontakte'), (req, res) => {});
router.get('/callback',
  passport.authenticate('vkontakte', { failureRedirect: '/' }),
  (req, res) => {res.redirect('/')}
)

module.exports = router;
