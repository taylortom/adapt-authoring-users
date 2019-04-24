const Controller = require('./controller');
const Middleware = require('./middleware');
/** @ignore */
const middleware = [
  Middleware.memoiseQuery
];
/** @ignore */
const routes = [
  {
    route: '/:id?',
    summary: "",
    description: "",
    handlers: {
      post: [Middleware.beforePost, Controller.postUser, Middleware.afterPost],
      get: Controller.getUsers,
      put: Controller.putUsers,
      delete: Controller.deleteUser
    }
  }
];
 module.exports = { middleware, routes };
