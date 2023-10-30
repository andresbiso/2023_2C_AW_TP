const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  article_id: {
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
  author: {
    type: String,
    required: false,
  },
  body: {
    type: String,
    required: true,
  },
  readCount: {
    type: Number,
    default: 0,
    required: false,
  },
  readingTime: {
    type: Number,
    default: 0,
    required: false,
  },
  tags: {
    type: Array,
    lowercase: true,
    required: false,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

//Calculate article readingTime
articleSchema.methods.calculateReadingTime = function () {
  const wpmavg = 250; // words per minute average
  const wordCount = this.body.split(' ').length;
  const readingTime = wordCount / wpmavg;
  const readingTimeMinutes = Math.ceil(readingTime);
  return readingTimeMinutes;
};

module.exports = model('articles', articleSchema);
