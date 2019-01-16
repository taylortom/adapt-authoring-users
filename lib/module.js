const Api = require('./api');
const Logger = require('adapt-authoring-logger');
const { Module } = require('adapt-authoring-core');
const User = require('./datatypes/user');

class Users extends Module {
  boot(app, resolve, reject) {
    const server = app.getModule('adapt-authoring-server');
    const db = app.getModule('adapt-authoring-mongodb');
    /**
    * TODO we should probably be able to reference the above more abstractly to allow for
    * non-standard modules
    */
    if(!server) {
      console.warn(`${this.name}: Cannot initialise Users module, server wasn't found`);
      return resolve();
    }
    if(!db) {
      console.warn(`${this.name}: Cannot initialise Users module, database wasn't found`);
      return resolve();
    }
    if(!db.isConnected) {
      db.on('boot', () => {
        this.init(server, db);
        resolve();
      });
      return;
    }
    this.init(server, db);
    resolve();
  }

  init(server, db) {
    console.log('Users#init');
    // db.addModel('user', User);
    Api.init(server);
  }
}

module.exports = Users;
