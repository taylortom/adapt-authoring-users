const Api = require('adapt-authoring-api');
const Middleware = require('./middleware');
const UserSchema = require('../schema/user.schema');
/**
* Module which handles user operations
* @extends {AbstractApiModule}
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
            post: [Middleware.beforePost, UsersModule.requestHandler(), Middleware.afterPost]
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
