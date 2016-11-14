/**
 * Client.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    team: {
      type: 'string',
      required: true
    },
    tasks: {
      type: 'array',
      required: false
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }

};

