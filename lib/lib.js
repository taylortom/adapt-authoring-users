const { App } = require('adapt-authoring-core');
/**
* Functions to manipulate the system's user data
*/
const lib = {
  /**
  * Create a new user
  */
  post: user => {
    // create only has one param, so just pass the data as the query
    return callDbFunction('create', user);
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
  delete: (query) => {
    return callDbFunction('delete', query);
  }
};

function callDbFunction(funcName, query, data = null) {
  return new Promise((resolve, reject) => {
    if(!query.type) {
      query.type = 'user';
    }
    const args = [query];
    if(data !== null) args.push(data);

    App().getModule('mongodb')[funcName](...args).then(resolve).catch(reject);
  });
}

module.exports = lib;
