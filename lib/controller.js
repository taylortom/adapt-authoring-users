const {
  App,
  DataStoreQuery,
  Responder
} = require('adapt-authoring-core');
const Errors = require('./errors');
const usersLib = require('./lib');
/**
*
*/
const controller = {
  /**
  * Create a new user
  */
  postUser: async (req, res, next) => {
    if(!req.body) {
      return next(`${Errors.CreateFail}, ${Errors.BadInput}`);
    }
    try {
      new Responder(res).success({
        data: await usersLib.post(req.body) 
      }, 201);
    } catch(e) {
      next(e);
    }
  },
  /**
  * Get an existing user
  */
  getUsers: async (req, res, next) => {
    try {
      await execFunc(usersLib.get, new DataStoreQuery(req.query), null, res);
    } catch(e) {
      next(e);
    }
  },
  /**
  * Update an existing user
  */
  putUsers: async (req, res, next) => {
    try {
      const query = new DataStoreQuery(req.query);
      if(req.params.id) query._id = req.params.id;

      await execFunc(usersLib.put, query, req.body, res);
    } catch(e) {
      next(e);
    }
  },
  /**
  * Delete an existing user
  */
  deleteUser: async (req, res, next) => {
    try {
      const query = new DataStoreQuery(req.query);
      if(req.params.id) query._id = req.params.id;

      await execFunc(usersLib.delete, query, null, res);
    } catch(e) {
      next(e);
    }
  }
};

/**
* Utility functions
*/
/**
* Executes the passed function
*/
function execFunc(func, query, data, res) {
  const responder = new Responder(res);
  const args = [];

  if(query) args.push(query);
  if(data) args.push(data);

  return func(...args).then(data => responder.success({ data: data }));
}

module.exports = controller;
