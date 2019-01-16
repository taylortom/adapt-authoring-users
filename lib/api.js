var controller = require('./controller');
var middleware = require('./middleware');
/**
* Public API for the users module
*/
function init(server) {
  var router = server.createRouter('/users')
    // middleware
    .use(middleware.root)
    // Create a new user
    .post('/', middleware.beforePost, controller.postUsers, middleware.afterPost)
    // Get an existing user
    .get('/', controller.getUsers)
    // Update an existing user
    .put('/', controller.putUsers)
    // Delete an existing user
    .delete('/', controller.deleteUsers);
}

module.exports = { init };
