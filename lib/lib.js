const { App } = require('adapt-authoring-core');
/**
* Functions to manipulate the system's user data
*/
class Lib {
  /**
  * Create a new user
  * @param {User} user User representaion to be saved in the database
  */
  static post(user) {
    // create only has one param, so just pass the data as the query
    return callDbFunction('create', user);
  }
  /**
  * Retrieve an existing user
  * @param {DataStoreQuery} query Query to refine user results
  */
  static get(query) {
    return callDbFunction('retrieve', query);
  }
  /**
  * Update an existing user
  * @param {DataStoreQuery} query Query to refine user results
  * @param {Object} data To replace existing database data
  */
  static put(query, data) {
    return callDbFunction('update', query, data);
  }
  /**
  * Delete an existing user
  * @param {DataStoreQuery} query Query to refine user results
  */
  static delete(query) {
    return callDbFunction('delete', query);
  }
}
/** @ignore */
function callDbFunction(funcName, query, data = null) {
  return new Promise((resolve, reject) => {
    if(!query.type) {
      query.type = 'user';
    }
    const args = [query];
    if(data !== null) args.push(data);

    App.instance.getModule('mongodb')[funcName](...args).then(resolve).catch(reject);
  });
}

module.exports = Lib;
