/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    console.log('user');
    console.log(req.param('user'));
    User.create(req.param('user')).exec(function (err, records) {
      console.log('err');
      console.log(err);
      console.log('records');
      console.log(records);
    });
  }
};

