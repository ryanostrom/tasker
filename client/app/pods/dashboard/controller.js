import Ember from 'ember';

export default Ember.Controller.extend({
  store: Ember.inject.service(),

  user: Ember.computed(function() {
    return JSON.parse(this.cookie.getCookie('user'));
  }),

  defaultClient: {
    tasks: [{
      value: '',
      complete: false
    }],
  },

  clients: function() {
    return [this.get('defaultClient')];
  }.property(''),

  actions: {

    addClient() {
      this.set('clients', [
        ...this.get('clients'),
        { tasks: [{ value:'', complete: false }] }
      ]);
    },

    removeClient(index) {
      let clients = this.get('clients');
      clients.removeAt(index);
      this.set('clients', clients);
    },

    addTask(client, index) {
      this.set(`clients.${index}.tasks`, [
        ...client.tasks,
        { value: '', complete: false }
      ]);
    },

    removeTask(clientIndex, taskIndex) {
      let client = this.get(`clients.${clientIndex}`);
      client.tasks.removeAt(taskIndex);
      this.set(`clients.${clientIndex}`, client);
    },

    completeTask(clientIndex, taskIndex) {
      this.set(`clients.${clientIndex}.tasks.${taskIndex}.complete`, true);
    },

    save() {
      let store = this.get('store'),
        clientsModel = this.get('clients').toArray()

      clientsModel.forEach((client) => {
        let clientRecord = store.createRecord('client', client);
        clientRecord.save();
      });
    }

  }
});
