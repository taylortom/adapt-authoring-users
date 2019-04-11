var controller = require('./controller');
var middleware = require('./middleware');
/**
* Public API for the users module
*/
function init(server) {
  var router = server.createApiRouter('/users')
    // middleware
    .use(middleware.root)
    // Create a new user
    .post('/', middleware.beforePost, controller.postUser, middleware.afterPost)
    // Get existing user(s)
    .get('/:id?', controller.getUsers)
    // Update existing user(s)
    .put('/:id?', controller.putUsers)
    // Delete an existing user
    .delete('/:id', controller.deleteUser);
    // .use(middleware.errorHandler);
}

module.exports = { init };
