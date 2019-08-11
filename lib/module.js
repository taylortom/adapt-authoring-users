const Api = require('adapt-authoring-api');
const Middleware = require('./middleware');
const UserSchema = require('../schema/user.schema');
/**
* Module which handles user operations
* @extends {Api}
*/
class UsersModule extends Api {
  /** @override */
  static get def() {
    return {
      name: 'users',
      model: 'user',
      schemas: [ UserSchema ],
      routes: [
        {
          route: '/',
          handlers: {
            post: [Middleware.beforePost, Users.requestHandler(), Middleware.afterPost]
          }
        },
        {
          route: '/:_id?',
          handlers: ['get','put','delete']
        }
      ]
    };
  }
}

module.exports = UsersModule;
