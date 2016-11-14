import DS from 'ember-data';

export default DS.Model.extend({
  client: DS.attr('string'),
  team: DS.attr('string'),
  tasks: DS.attr()
});
