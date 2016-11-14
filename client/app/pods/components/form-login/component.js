import Ember from 'ember';

export default Ember.Component.extend({

  routing: Ember.inject.service('-routing'),

  hasNoError: true,

  tagName: '',

  email: '',
  password: '',

  actions: {
    login() {
      let _this = this,
      userProperties = {
        email: this.get('email'),
        password: this.get('password')
      };

      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.$.ajax({
          type: 'POST',
          url: `/api/v1/login`,
          data: {
            email: encodeURIComponent(userProperties.email),
            password: userProperties.password,
          },

          success: function (result) {
            let loginRedirect = _this.cookie.getCookie('loginRedirect'),
              route = loginRedirect ? loginRedirect : 'dashboard';

            delete result.user.password;

            _this.cookie.removeCookie('loginRedirect');
            _this.cookie.setCookie('loggedIn', true);
            _this.cookie.setCookie('user', JSON.stringify(result.user));
            _this.get('routing').transitionTo('dashboard');
            resolve(route);
          },
          error: function () {
            Ember.set(_this, 'hasNoError', false);
            reject();
          }
        });
      });
    }
  }

});
