const { join } = require('path');
const Comment = require('../models_mongodb/comment.model');
const { formatResponse } = require('../utils/utils');
require('dotenv').config({ path: join(__dirname, '..', '/configs/.env') });

const defaultSort = process.env.DEFAULT_SORT;
const defaultSkip = process.env.DEFAULT_SKIP;
const defaultLimit = process.env.DEFAULT_LIMIT;

const getComments = async (req, res) => {
  const comment_id = req.query.comment_id;
  const article_id = req.query.article_id;
  const user_id = req.query.user_id;
  const content = req.query.content;
  const timestamp = req.query.timestamp;
  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const sort_by = req.query.sort_by;
  let sortConfig = {};
  let skipValue = defaultSkip;
  let limitValue = defaultLimit;
  const filters = {};
  if (comment_id) {
    filters.comment_id = parseInt(comment_id);
  }
  if (article_id) {
    filters.article_id = parseInt(article_id);
  }
  if (user_id) {
    filters.user_id = parseInt(user_id);
  }
  if (content) {
    filters.content = content;
  }
  if (timestamp) {
    filters.timestamp = timestamp;
  }
  if (limit) {
    if (limit < 0) {
      res
        .status(400)
        .send(
          formatResponse(null, 'Limit parameter must be greater or equal to 0'),
        );
      return;
    }
    limitValue = limit;
  }
  if (page) {
    if (page <= 0) {
      res
        .status(400)
        .send(formatResponse(null, 'Page parameter must be greater than 0'));
      return;
    }
    skipValue = (page - 1) * limitValue;
  }
  if (sort_by) {
    const sorting = sort ? sort : defaultSort;
    sortConfig = { [sort_by]: sorting };
  }
  Comment.find(filters)
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((comments) => {
      if (comments && comments.length > 0) {
        res.status(200).send(formatResponse(comments, null));
      } else {
        res.status(404).send(formatResponse(null, 'Comments not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

const getCommentById = async (req, res) => {
  const filters = { comment_id: req.params.id };
  Comment.find(filters)
    .then((comments) => {
      if (comments && comments.length > 0) {
        res.status(200).send(formatResponse(comments, null));
      } else {
        res.status(404).send(formatResponse(null, 'Comment not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

const createComment = async (req, res) => {
  const body = req.body;
  const comment_id = body.comment_id;
  const article_id = body.article_id;
  const user_id = body.user_id;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!comment_id) {
    res.status(400).send(formatResponse(null, 'comment_id is missing'));
    return;
  }
  if (!article_id) {
    res.status(400).send(formatResponse(null, 'article_id is missing'));
    return;
  }
  if (!user_id) {
    res.status(400).send(formatResponse(null, 'user_id is missing'));
    return;
  }
  if (!content) {
    res.status(400).send(formatResponse(null, 'content is missing'));
    return;
  }
  const newComment = new Comment({
    comment_id: comment_id,
    article_id: article_id,
    user_id: user_id,
    content: content,
  });
  newComment
    .save()
    .then((result) => {
      res.status(200).send(formatResponse(result, 'Comment created'));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

const updateComment = async (req, res) => {
  const body = req.body;
  const article_id = body.article_id;
  const user_id = body.user_id;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!article_id) {
    res.status(400).send(formatResponse(null, 'article_id is missing'));
    return;
  }
  if (!user_id) {
    res.status(400).send(formatResponse(null, 'user_id is missing'));
    return;
  }
  if (!content) {
    res.status(400).send(formatResponse(null, 'content is missing'));
    return;
  }
  const update = {
    article_id: article_id,
    user_id: user_id,
    content: content,
  };
  const filter = { comment_id: req.params.id };

  Comment.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Comment updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Comment not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

const partialUpdateComment = async (req, res) => {
  const body = req.body;
  const article_id = body.article_id;
  const user_id = body.user_id;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  const update = {};
  if (article_id) {
    update.article_id = article_id;
  }
  if (user_id) {
    update.user_id = user_id;
  }
  if (content) {
    update.first_name = content;
  }
  const filter = { comment_id: req.params.id };

  Comment.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Comment updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Comment not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

const deleteComment = async (req, res) => {
  const filter = { comment_id: req.params.id };
  Comment.findOneAndDelete(filter)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Comment deleted'));
      } else {
        res.status(404).send(formatResponse(null, 'Comment not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(formatResponse(null, err.message));
    });
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  partialUpdateComment,
  deleteComment,
};
