const Api = require('adapt-authoring-api').Module;
const Middleware = require('./middleware');
const UserSchema = require('../schema/user.schema');
/**
* Module which handles user operations
* @extends {Api}
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
            post: [Middleware.beforePost, Api.controller.post, Middleware.afterPost],
            get: [Middleware.memoiseQuery, Api.controller.get],
            put: [Middleware.memoiseQuery, Api.controller.put],
            delete: [Middleware.memoiseQuery, Api.controller.delete]
          }
        }
      ]
    };
  }
}

module.exports = Users;
