const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  name: String,
});

module.exports = mongoose.model('User', UserSchema);
