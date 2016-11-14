import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.cookie.removeCookie('loggedIn');
    this.cookie.removeCookie('user');
    this.transitionTo('index');
  }
});
