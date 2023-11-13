const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  article_id: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true,
    min: 1,
  },
  blog_id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
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

module.exports = model('articles', articleSchema);
