const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: String,
  state: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  body: {
    type: String,
    required: true,
  },
  readCount: {
    type: Number,
    default: 0,
  },
  readingTime: Number,
  tags: {
    type: Array,
    lowercase: true,
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
