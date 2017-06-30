'use strict';

const 
  Sequelize = require('sequelize'),
  sequelize = require('libs/db.js'),
  User = require('models/users.js'),
  config = require('config'),
  nodemailer = require('nodemailer');


const Anwser = sequelize.define('anwser', 
  {
    willCome: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    drinks: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    validate: {
      willComeDrinks: function() {
        const drinks = this.drinks.split(',');
        
        if (drinks.length > 0 && drinks[0] && !this.willCome) {
          throw new Error('User will not come, but have a drinks');
        }
      }
    }
  }
);

Anwser.belongsTo(User);

module.exports = Anwser;
