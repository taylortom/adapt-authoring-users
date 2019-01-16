const {
  App,
  Responder
} = require('adapt-authoring-core');
const usersLib = require('./lib');
/**
*
*/
const controller = {
  /**
  * Create a new user
  */
  postUsers: (req, res) => {
    const data = {};
    execFunc(usersLib.post, data, res);
  },
  /**
  * Get an existing user
  */
  getUsers: (req, res) => {
    const db = App().getModule('adapt-authoring-mongodb');
    const query = db.createQuery('users');
    execFunc(usersLib.get, query, res);
  },
  /**
  * Update an existing user
  */
  putUsers: (req, res) => {
    const data = {};
    execFunc(usersLib.put, data, res);
  },
  /**
  * Delete an existing user
  */
  deleteUsers: (req, res) => {
    const data = {};
    execFunc(usersLib.delete, data, res);
  }
};

/**
* Utility functions
*/
/**
* Executes the passed function
*/
function execFunc(func, data, res) {
  const responder = Responder(res);

  func(data)
    .then(data => responder.success({ data: data }))
    .catch(responder.error);
}

module.exports = controller;
