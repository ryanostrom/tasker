import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name_first: DS.attr('string'),
  name_last: DS.attr('string'),

  full_name: function() {
    return `${this.get('name_first')} ${this.get('name_last')}`;
  }.property('name_first', 'name_last')
});
