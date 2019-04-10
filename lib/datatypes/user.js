const { MongooseSchema } = require('adapt-authoring-mongodb');

class User extends MongooseSchema {
  static get attributes() {
    return {
      _tenant: MongooseSchema.Types.ObjectId,
      firstName: MongooseSchema.Types.String,
      lastName: MongooseSchema.Types.String,
      email: MongooseSchema.Types.String,
      password: MongooseSchema.Types.String,
      roles: MongooseSchema.Types.Array,
      failedLoginCount: MongooseSchema.Types.Number,
      firstAccess: MongooseSchema.Types.Date,
      lastAccess: MongooseSchema.Types.Date
    };
  }
}

module.exports = User;
