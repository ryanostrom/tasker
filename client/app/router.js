import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('signup');
  this.route('dashboard');
  this.route('profile', function() {
    this.route('general');
    this.route('experience');
    this.route('financial');
    this.route('health');
    this.route('insurance');
    this.route('estate');
  });
  this.route('insights');
});

export default Router;
