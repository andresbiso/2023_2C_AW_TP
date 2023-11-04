const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_id: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
});

// //Hash password before saving to database.
// userSchema.pre('save', async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// //Validate that user password stored in the DB matches that which is provided during signin process.
// userSchema.methods.validatePassword = async function (password) {
//   const result = await bcrypt.compare(password, this.password);
//   return result;
// };

const User = mongoose.model('users', userSchema);
module.exports = User;
