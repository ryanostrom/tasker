import Ember from 'ember';
import ValidatableInput from 'ember-cli-html5-validation/mixins/validatable-input';

ValidatableInput.reopen({
  errorTemplates: {
    valueMissing: {
      defaultMessage: "Required"
    }
  }
});

export default Ember.Component.extend({

  store: Ember.inject.service(),
  routing: Ember.inject.service('-routing'),

  tagName: '',

  userExists: false,

  firstName: '',
  lastName: '',
  email: '',
  password: '',

  actions: {
    signup() {
      let _this = this,
      store = this.get('store'),
      userProps = {
        name_first: this.get('firstName'),
        name_last: this.get('lastName'),
        email: this.get('email'),
        password: this.get('password')
      };

      store.queryRecord('user', { email: userProps.email })
      .then(function(existingUser) {
        if (existingUser) {
          _this.set('userExists', true);
          return;
        }

        _this.set('userExists', false);

        let user = store.createRecord('user', userProps);
        console.log(user);
        user.save();
        _this.cookie.setCookie('loggedIn', true, { expires: 7, path: 'index' })
          .then(function() {
            delete userProps.password;
            _this.cookie.setCookie('user', JSON.stringify(userProps), { expires: 7, path: 'index' });
            _this.get('routing').transitionTo('dashboard');
          });
      });
    }
  }

});
