const { MongooseSchema } = require('adapt-authoring-mongodb');
/**
* Class to represent a system user
*/
class User extends MongooseSchema {
  /** @override */
  static get attributes() {
    return {
      _tenant: MongooseSchema.Types.ObjectId,
      firstName: {
        type: MongooseSchema.Types.String,
        required: true
      },
      lastName: {
        type: MongooseSchema.Types.String,
        required: true
      },
      email: {
        type: MongooseSchema.Types.String,
        required: true,
        validate: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      },
      password: MongooseSchema.Types.String,
      roles: MongooseSchema.Types.Array,
      failedLoginCount: {
        type: MongooseSchema.Types.Number,
        default: 0
      },
      firstAccess: MongooseSchema.Types.Date,
      lastAccess: MongooseSchema.Types.Date
    };
  }
}

module.exports = User;
