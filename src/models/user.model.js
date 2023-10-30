const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    lowercase: true,
    required: false,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Hash password before saving to database.
userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

//Validate that user password stored in the DB matches that which is provided during signin process.
userSchema.methods.validatePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

module.exports = mongoose.model('users', userSchema);
