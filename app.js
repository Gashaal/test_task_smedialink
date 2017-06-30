'use strict';

const
  express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  config = require('config'),
  passport = require('passport'),
  auth = require('routes/auth'),
  anwser = require('routes/anwser'),
  Anwser = require('models/anwsers'),
  User = require('models/users');

let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  if (req.user) {
    if (req.user.vkId === config.admin.id) {
      Anwser.findAll({include: [User]})
        .then(anwsers => {
          let anwsersToResponse = [];
          
          anwsers.forEach(anwser => {
            let curAnwser = {};
            curAnwser.displayName = anwser.user.displayName;
            curAnwser.avatar = anwser.user.avatar;
            curAnwser.willCome = anwser.willCome ? 'Да': 'Нет';
            curAnwser.drinks = anwser.drinks.split(',').join(', ');
            
            anwsersToResponse.push(curAnwser);
          })
          res.render('admin', {anwsers: anwsersToResponse, user: req.user});
        });
    } else {
      Anwser.findOne({where: {userId: req.user.id}})
        .then(anwser => {
          if (anwser) {
            res.render('anwserAgain', {user: req.user.get({plain: true})});
          } else {
            res.render('anwsers', {user: req.user.get({plain: true})});
          }
        });
    }
  } else {
    res.render('index');
  }
});

app.use('/auth', auth);
app.use('/anwser', anwser);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send(err.message || 'Error');
});

module.exports = app;
