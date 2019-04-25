const { DataStoreQuery, Responder } = require('adapt-authoring-core');
const Errors = require('./errors');
const lib = require('./lib');
/**
* Controller for the users API
*/
class Controller {
  /**
  * Create a new user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static postUser(req, res, next) {
    if(!req.body) {
      const e = new Error(`${Errors.CreateFail}, ${Errors.BadInput}`);
      e.statusCode = Responder.StatusCodes.Error.User;
      return next(e);
    }
    req.body.type = 'user';
    execFunc('post', req, res, next);
  }
  /**
  * Get an existing user
  */
  static getUsers(req, res, next) {
    execFunc('get', req, res, next);
  }
  /**
  * Update an existing user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static putUsers(req, res, next) {
    this.log('warn', 'TODO implement putUsers');
    return next();
    execFunc('get', req, res, next);
  }
  /**
  * Delete an existing user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static deleteUser(req, res, next) {
    if(!req.dsquery._id) {
      const e = new Error(`${Errors.DeleteFail}, ${Errors.BadInput}`);
      e.statusCode = Responder.StatusCodes.Error.User;
      return next(e);
    }
    req.dsquery._id = req.params.id;
    execFunc('delete', req, res, next);
  }
};
/**
* Convenience method to executes a passed function
* @param {String} func Name of the function to be called
* @param {ClientRequest} req The client request object
* @param {ServerResponse} res The server response object
* @param {function} next The next middleware function in the stack
*/
function execFunc(func, req, res, next) {
  const responder = new Responder(res);
  const args = [];

  if(req.dsquery) args.push(req.dsquery);
  if(req.body) args.push(req.body);

  return lib[func](...args)
    .then(data => responder.success({ data, statusCode: Responder.StatusCodes.Success[func] }))
    .catch(e => next(e));
}

module.exports = Controller;
