const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  blog_id: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
    min: 1,
  },
  user_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = model('blogs', blogSchema);
