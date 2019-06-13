const Api = require('adapt-authoring-api');
const Controller = require('./controller');
const Middleware = require('./middleware');
const UserSchema = require('../schema/user.schema');
/**
* Module which handles user operations
* @extends {Module}
*/
class Users extends Api {
  static get def() {
    return {
      name: 'users',
      schemas: [ UserSchema ],
      routes: [
        {
          route: '/:id?',
          handlers: {
            post: [Middleware.beforePost, Controller.postUser, Middleware.afterPost],
            get: [Middleware.memoiseQuery, Controller.getUsers],
            put: [Middleware.memoiseQuery, Controller.putUser],
            delete: [Middleware.memoiseQuery, Controller.deleteUser]
          }
        }
      ]
    };
  }
}

module.exports = Users;
