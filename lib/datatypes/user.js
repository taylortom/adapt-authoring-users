const { MongooseSchema } = require('adapt-authoring-mongodb');

class User extends MongooseSchema {
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
        required: true
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
