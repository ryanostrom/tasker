import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    this.cookie.removeCookie('loggedIn');
    this.cookie.removeCookie('user');
    this.transitionTo('login');
  }

});
