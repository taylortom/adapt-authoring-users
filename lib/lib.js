const { App } = require('adapt-authoring-core');
/**
* Functions to manipulate the system's user data
*/
const lib = {
  /**
  * Create a new user
  */
  post: data => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  /**
  * Get an existing user
  */
  get: query => {
    return new Promise((resolve, reject) => {
      const db = App().getModule('adapt-authoring-mongodb');
      db.retrieve(query).then(resolve).catch(reject);
    });
  },
  /**
  * Update an existing user
  */
  put: (query, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
  /**
  * Delete an existing user
  */
  delete: (query, data) => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
};

module.exports = lib;
