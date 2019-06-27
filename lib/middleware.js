const { DataStoreQuery, Responder, Utils } = require('adapt-authoring-core');
/**
* Middleware for the users module
*/
class Middleware {
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
};
/** @ignore */
function log(level, ...rest) {
  Utils.logMessage(level, 'users-middleware', ...rest);
}

module.exports = Middleware;
