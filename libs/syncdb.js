'use strict';

const
  User = require('models/users.js'),
  Anwser = require('models/anwsers.js'),
  sequelize = require('libs/db.js');

sequelize.sync({force: true})
  .then(() => { 
    console.log('OK');
    process.exit(0);
  })
  .catch(error => { 
    console.log(error);
    process.exit(0);
  })
