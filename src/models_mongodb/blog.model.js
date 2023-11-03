const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
  blog_id: {
    type: Number,
    required: true,
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
