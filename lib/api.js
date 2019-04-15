const { App } = require('adapt-authoring-core');
const controller = require('./controller');
const middleware = require('./middleware');
/**
* Public API for the users module
*/
function init() {
  App.getInstance().getModule('server').createApiRouter('/users')
    // generic middleware
    .use(middleware.all)
    // Create a new user
    .post('/', middleware.beforePost, controller.postUser, middleware.afterPost)
    // Get existing user(s)
    .get('/:id?', controller.getUsers)
    // Update existing user(s)
    .put('/:id?', controller.putUsers)
    // Delete an existing user
    .delete('/:id', controller.deleteUser);
}

module.exports = { init };
