const Controller = require('./controller');
const Middleware = require('./middleware');

const middleware = [
  Middleware.all
];
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
