/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Passwords = require('machinepack-passwords');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    name_first: {
      type: 'string',
      required: true
    },
    name_last: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    }
  },

  beforeCreate: function(values, next) {
    Passwords.encryptPassword({ password: values.password }).exec({
      error: function(e) {
        console.log('e');
        console.log(e);
        next();
      },
      success: function(password) {
        console.log('password');
        console.log(password);
        values.password = password;
        next();
      }
    });
  }

};

