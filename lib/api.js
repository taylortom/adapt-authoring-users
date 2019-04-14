var controller = require('./controller');
var middleware = require('./middleware');
/**
* Public API for the users module
*/
function init(instance) {
  const m = middleware(instance);

  instance.app.getModule('server').createApiRouter('/users')
    // generic middleware
    .use(m.all)
    // Create a new user
    .post('/', m.beforePost, controller.postUser, m.afterPost)
    // Get existing user(s)
    .get('/:id?', controller.getUsers)
    // Update existing user(s)
    .put('/:id?', controller.putUsers)
    // Delete an existing user
    .delete('/:id', controller.deleteUser);
    // .use(middleware.errorHandler);
}

module.exports = { init };
