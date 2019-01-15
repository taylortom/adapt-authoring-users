/**
* Public API for the users module
*/
const middleware = {
  /**
  * Called when the 'home' route is requested
  */
  root: (req, res, next) => {
    console.log(`Middleware for all users routes`);
    next();
  },
  /**
  * Called before creating a new user
  */
  beforePost: (req, res, next) => {
    console.log(`Middleware called before user.post`);
    next();
  },
  /**
  * Called after creating a new user
  */
  afterPost: (req, res, next) => {
    console.log(`Middleware called after user.post`);
    next();
  }
};

module.exports = middleware;
