var controller = require('./controller');
var middleware = require('./middleware');
/**
* Public API for the users module
*/
function init() {
  var router = server.createRouter('/users')

  // middleware
  router.use(middleware.root);

  /**
  * Create a new user
  */
  router.post('/', middleware.beforePost, controller.postUsers, middleware.afterPost);
  /**
  * Get an existing user
  */
  router.get('/', controller.getUsers);
  /**
  * Update an existing user
  */
  router.put('/', controller.putUsers);
  /**
  * Delete an existing user
  */
  router.delete('/', controller.deleteUsers);
}

module.exports = {
  init
};
