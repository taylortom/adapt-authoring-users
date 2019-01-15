/**
*
*/
const exports = {
  /**
  * Create a new user
  */
  postUsers: (req, res) => {
    lib.postUsers().then(result => {
      res.status(200).json({ success: true });
    }).catch(error => {
      res.status(500).json({ success: false });
    });
  },
  /**
  * Get an existing user
  */
  getUsers: (req, res) => {
    lib.getUsers().then(result => {
      res.status(200).json({ success: true });
    }).catch(error => {
      res.status(500).json({ success: false });
    });
  },
  /**
  * Update an existing user
  */
  putUsers: (req, res) => {
    lib.putUsers().then(result => {
      res.status(200).json({ success: true });
    }).catch(error => {
      res.status(500).json({ success: false });
    });
  },
  /**
  * Delete an existing user
  */
  deleteUsers: (req, res) => {
    lib.deleteUsers().then(result => {
      res.status(200).json({ success: true });
    }).catch(error => {
      res.status(500).json({ success: false });
    });
  }
}

module.exports = exports;
