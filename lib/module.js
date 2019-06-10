const { Module } = require('adapt-authoring-core');
const api = require('./api');
const UserSchema = require('../schema/user.schema');
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
    const __addModel = () => db.addModel({ name: 'user', schema: UserSchema });

    if(db.isConnected) {
      __addModel();
      return resolve();
    }
    db.on('boot', () => {
      __addModel();
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
}

module.exports = Users;
