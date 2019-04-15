const { DataStoreQuery, Responder } = require('adapt-authoring-core');
const Errors = require('./errors');
const lib = require('./lib');
/**
* Controller for the users API
*/
class Controller {
  /**
  * Create a new user
  */
  static async postUser(req, res, next) {
    if(!req.body) {
      return next(`${Errors.CreateFail}, ${Errors.BadInput}`);
    }
    try {
      new Responder(res).success({ data: await lib.post(req.body) }, 201);
    } catch(e) {
      next(e);
    }
  }
  /**
  * Get an existing user
  */
  static async getUsers(req, res, next) {
    try {
      await execFunc('get', new DataStoreQuery(req.query), null, res);
    } catch(e) {
      next(e);
    }
  }
  /**
  * Update an existing user
  */
  static async putUsers(req, res, next) {
    try {
      const query = new DataStoreQuery(req.query);
      if(req.params.id) query._id = req.params.id;

      await execFunc('put', query, req.body, res);
    } catch(e) {
      next(e);
    }
  }
  /**
  * Delete an existing user
  */
  static async deleteUser(req, res, next) {
    try {
      const query = new DataStoreQuery(req.query);
      if(req.params.id) query._id = req.params.id;

      await execFunc('delete', query, null, res);
    } catch(e) {
      next(e);
    }
  }
};

/**
* Executes the passed function
*/
function execFunc(func, query, data, res) {
  const responder = new Responder(res);
  const args = [];

  if(query !== null) args.push(query);
  if(data !== null) args.push(data);

  return lib[func](...args).then(data => responder.success({ data: data }));
}

module.exports = Controller;
