/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords');

module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },

  login: function(req, res) {
    var email = decodeURIComponent(req.param('email')),
      password = req.param('password');

    if (!(email && password)) {
      return res.json(403, {
        email: !email,
        password: !password
      });
    }

    User.find({ email: email }).exec(function (err, user) {
      if (!user[0]) return res.json(403, 'invalid email or password');
      Passwords.checkPassword({
        passwordAttempt: password,
        encryptedPassword: user[0].password,
      }).exec({
        error: res.serverError,
        incorrect: function() {
          return res.json(403, { password: true });
        },
        success: function() {
          return res.json(200, { user: user[0] });
        }

      });
    });

  }

};
