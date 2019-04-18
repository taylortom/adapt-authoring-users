const Logger = require('adapt-authoring-logger');
const { Responder } = require('adapt-authoring-core');
/**
* Middleware for the users module
*/
class Middleware {
  /**
  * Called before all user requests
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static all(req, res, next) {
    // format the standard input for use later
    req.query = new DataStoreQuery(req.query);
    if(req.params.id) req.query._id = req.params.id;
    // check the input is valid
    try {
      req.query.validate();
    } catch(e) {
      e.statusCode = 400;
      next(e);
    }
    next();
  }
  /**
  * Called before creating a new user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static beforePost(req, res, next) {
    log('info', `Middleware called before user.post`);
    next();
  }
  /**
  * Called after creating a new user
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static afterPost(req, res, next) {
    log('info', `Middleware called after user.post`);
    next();
  }
  /**
  * Handler for any user-related errors
  * @param {Error} error The error object
  * @param {ClientRequest} req The client request object
  * @param {ServerResponse} res The server response object
  * @param {function} next The next middleware function in the stack
  */
  static errorHandler(error, req, res, next) {
    log('error', `User route error`);
    console.trace(error);
    new Responder(res).error(error);
  }
};
/** @ignore */
function log(level, ...rest) {
  Logger.log(level, 'users-middleware', ...rest);
}

module.exports = Middleware;
