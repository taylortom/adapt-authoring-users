const { App } = require('adapt-authoring-core');
/**
* Functions to manipulate the system's user data
*/
const lib = {
  /**
  * Create a new user
  */
  post: user => {
    return callDbFunction('create', null, user);
  },
  /**
  * Get an existing user
  */
  get: query => {
    return callDbFunction('retrieve', query);
  },
  /**
  * Update an existing user
  */
  put: (query, data) => {
    return callDbFunction('update', query, data);
  },
  /**
  * Delete an existing user
  */
  delete: (query, data) => {
    return callDbFunction('delete', query, data);
  }
};

function callDbFunction(funcName, query, data) {
  return new Promise((resolve, reject) => {
    const db = App().getModule('adapt-authoring-mongodb');
    const args = [];

    if(query) {
      if(!query.type) query.type = 'user';
      args.push(query);
    }
    if(data) {
      args.push(data);
    }
    db[funcName](...args).then(resolve).catch(reject);
  });
}

module.exports = lib;
