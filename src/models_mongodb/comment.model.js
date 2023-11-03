const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  comment_id: {
    type: Number,
    required: true,
  },
  article_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
});

module.exports = model('comments', commentSchema);
