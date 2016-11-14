require('dotenv').config({silent: true});

module.exports = {
  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      database: process.env.database,
      host: process.env.host,
      port: process.env.port
    }
  },
  models: {
    connection: 'mongodb'
  },
};
