const Api = require('adapt-authoring-api');
const Middleware = require('./middleware');
const UserSchema = require('../schema/user.schema');
/**
* Module which handles user operations
* @extends {Api}
*/
class Users extends Api {
  /** @override */
  static get def() {
    return {
      name: 'users',
      schemas: [ UserSchema ],
      routes: [
        {
          route: '/:_id?',
          handlers: {
            post: [Middleware.beforePost, Users.requestHandler(), Middleware.afterPost],
            get: [Middleware.memoiseQuery, Users.requestHandler()],
            put: [Middleware.memoiseQuery, Users.requestHandler()],
            delete: [Middleware.memoiseQuery, Users.requestHandler()]
          }
        }
      ]
    };
  }
}

module.exports = Users;
