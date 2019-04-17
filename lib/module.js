const Logger = require('adapt-authoring-logger');
const { Module } = require('adapt-authoring-core');
const api = require('./api');
const User = require('./datatypes/user');

class Users extends Module {
  preload(app, resolve, reject) {
    this.initApi();
    resolve();
  }

  boot(app, resolve, reject) {
    const db = this.app.getModule('mongodb');

    if(db.isConnected) {
      this.initData(db);
      return resolve();
    }
    db.on('boot', () => {
      this.initData(db);
      resolve();
    });
  }

  initApi() {
    this.app.getModule('server').createApi('users')
      .setMiddleware(api.middleware)
      .setRoutes(api.routes)
      .init();
  }

  initData(db) {
    db.addModel('user', User);
  }
}

module.exports = Users;
