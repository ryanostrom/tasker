require('dotenv').config({silent: true});

module.exports = {
  connections: {
    mongodb: {
      adapter: 'sails-mongo',
      database: process.env.database,
      host: process.env.host,
      port: process.env.port,
      username: process.env.username,
      password: process.env.password
    }
  },
  models: {
    connection: 'mongodb'
  },
  port: '1337'
};
