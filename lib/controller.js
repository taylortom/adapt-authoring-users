const app = require('adapt-authoring-core').App;
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
  const sendResponse = (error, data, res) => {
    if(error) {
      return res.status(500).json({ success: false, error: error.message });
    }
    res.status(200).json({ success: true, data: data });
  };
  func.call(data)
    .then(data => sendResponse(null, data, res))
    .catch(error => sendResponse(error, null, res));
}

module.exports = controller;
