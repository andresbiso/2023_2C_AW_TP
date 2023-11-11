const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  comment_id: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
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
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model('comments', commentSchema);
