const { Responder } = require('adapt-authoring-core');
/**
* Public API for the users module
*/
function middleware(instance) {
  return {
    /**
    * Called when any route is requested
    */
    all: (req, res, next) => {
      instance.log('info', `Middleware for all users routes`);
      next();
    },
    /**
    * Called before creating a new user
    */
    beforePost: (req, res, next) => {
      instance.log('info', `Middleware called before user.post`);
      next();
    },
    /**
    * Called after creating a new user
    */
    afterPost: (req, res, next) => {
      instance.log('info', `Middleware called after user.post`);
      next();
    },
    /**
    * Handler for any user-related errors
    */
    errorHandler: (error, req, res, next) => {
      instance.log('error', `User route error`);
      console.trace(error);
      new Responder(res).error(error);
    }
  }
};

module.exports = middleware;
