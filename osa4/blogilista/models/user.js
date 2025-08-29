const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// User has reference to Blog IDs that they have added
const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  passwordHash: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
})

// Delete some of parameters that are returned on JSON response
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)
module.exports = User
