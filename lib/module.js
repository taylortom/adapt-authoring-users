const Module = require('adapt-authoring-core').DataTypes.Module;
const api = require('./api');

class Users extends Module {
  bootDelegate(resolve, reject) {
    const server = this.app.server;
    if(!server) {
      console.warn(`${this.name}: Cannot initialise, server isn't running`);
      resolve();
    }
    const db = this.app.db;
    if(!db) {
      console.warn(`${this.name}: Cannot initialise, server isn't running`);
      resolve();
    }
    api.init(server);
    resolve();
  }
}

module.exports = Users;
