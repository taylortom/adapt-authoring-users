const Api = require('./api');
const Logger = require('adapt-authoring-logger');
const { Module } = require('adapt-authoring-core');
const User = require('./datatypes/user');

class Users extends Module {
  preload(app, resolve, reject) {
    Api.init(app.server);
    resolve();
  }

  async boot(app, resolve, reject) {
    await this.initData();
    resolve();
  }

  initData() {
    return new Promise((resolve, reject) => {
      const db = this.app.getModule('adapt-authoring-mongodb');

      if(!db) {
        console.log(`${this.name}: Cannot initialise Users module, database wasn't found`);
        return resolve();
      }
      if(!db.isConnected) {
        return db.on('boot', () => {
          db.addModel('user', User);
          resolve();
        });
      }
      db.addModel('user', User);
    });
  }
}

module.exports = Users;
