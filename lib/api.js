const { App } = require('adapt-authoring-core');
const Controller = require('./controller');
const Middleware = require('./middleware');
/**
* Public API for the users module
*/
function init() {
  App.instance.getModule('server').createApiRouter('/users')
    // generic middleware
    .use(Middleware.all)
    // Create a new user
    .post('/', Middleware.beforePost, Controller.postUser, Middleware.afterPost)
    // Get existing user(s)
    .get('/:id?', Controller.getUsers)
    // Update existing user(s)
    .put('/:id?', Controller.putUsers)
    // Delete an existing user
    .delete('/:id', Controller.deleteUser);
}

module.exports = { init };
