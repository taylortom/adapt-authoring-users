const Controller = require('./controller');
const Middleware = require('./middleware');
/** @ignore */
const routes = [
  {
    route: '/:id?',
    summary: "",
    description: "",
    handlers: {
      post: [Middleware.beforePost, Controller.postUser, Middleware.afterPost],
      get: [Middleware.memoiseQuery, Controller.getUsers],
      put: [Middleware.memoiseQuery, Controller.putUser],
      delete: [Middleware.memoiseQuery, Controller.deleteUser]
    }
  }
];

module.exports = routes;
