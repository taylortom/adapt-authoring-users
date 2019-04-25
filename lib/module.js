const Logger = require('adapt-authoring-logger');
const { Module } = require('adapt-authoring-core');
const api = require('./api');
const User = require('./datatypes/user');
/**
* Module which handles user operations
* @extends {Module}
*/
class Users extends Module {
  /**
  * @param {App} app App instance
  * @param {Function} resolve Function to call on fulfilment
  * @param {Function} reject Function to call on rejection
  */
  preload(app, resolve, reject) {
    this.initApi();
    resolve();
  }
  /**
  * @param {App} app App instance
  * @param {Function} resolve Function to call on fulfilment
  * @param {Function} reject Function to call on rejection
  */
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
  /**
  * Creates and initialises the API
  */
  initApi() {
    this.app.getModule('server').createApi('users')
      .setRoutes(api)
      .init();
  }
  /**
  * Sets up the DB models
  * @param {MongoDB} db Reference to the database module
  */
  initData(db) {
    db.addModel('user', User);
  }
}

module.exports = Users;
