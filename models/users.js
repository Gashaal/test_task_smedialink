'use strict';

const Sequelize = require('sequelize');
const sequelize = require('libs/db.js');

const User = sequelize.define('user', {
  vkId: {
    type: Sequelize.INTEGER
  },
  displayName: {
    type: Sequelize.STRING
  },
  avatar: {
    type: Sequelize.STRING
  }
}, {
  timestamps: false
});

//User.sync({force: true}).then(() => {});

module.exports = User;
