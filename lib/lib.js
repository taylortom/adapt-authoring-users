const { App } = require('adapt-authoring-core');
/**
* Functions to manipulate the system's user data
*/
class Lib {
  /**
  * Create a new user
  */
  static post(user) {
    // create only has one param, so just pass the data as the query
    return callDbFunction('create', user);
  }
  /**
  * Get an existing user
  */
  static get(query) {
    return callDbFunction('retrieve', query);
  }
  /**
  * Update an existing user
  */
  static put(query, data) {
    return callDbFunction('update', query, data);
  }
  /**
  * Delete an existing user
  */
  static delete(query) {
    return callDbFunction('delete', query);
  }
}

function callDbFunction(funcName, query, data = null) {
  return new Promise((resolve, reject) => {
    if(!query.type) {
      query.type = 'user';
    }
    const args = [query];
    if(data !== null) args.push(data);

    App.getInstance().getModule('mongodb')[funcName](...args).then(resolve).catch(reject);
  });
}

module.exports = Lib;
