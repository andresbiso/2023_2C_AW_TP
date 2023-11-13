const { join } = require('path');
const Article = require('../models_mongodb/article.model');
const { formatResponse } = require('../utils/utils');
require('dotenv').config({ path: join(__dirname, '..', '/configs/.env') });

const defaultSort = process.env.DEFAULT_SORT;
const defaultSkip = process.env.DEFAULT_SKIP;
const defaultLimit = process.env.DEFAULT_LIMIT;

const getArticles = async (req, res, next) => {
  const article_id = req.query.article_id;
  const blog_id = req.query.blog_id;
  const title = req.query.title;
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
  if (article_id) {
    filters.article_id = parseInt(article_id);
  }
  if (blog_id) {
    filters.blog_id = parseInt(blog_id);
  }
  if (title) {
    filters.title = title;
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
  Article.find(filters)
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((articles) => {
      if (articles && articles.length > 0) {
        res.status(200).send(formatResponse(articles, null));
      } else {
        res.status(404).send(formatResponse(null, 'Articles not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleById = async (req, res, next) => {
  const filters = { article_id: req.params.id };
  Article.find(filters)
    .then((articles) => {
      if (articles && articles.length > 0) {
        res.status(200).send(formatResponse(articles, null));
      } else {
        res.status(404).send(formatResponse(null, 'Article not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const createArticle = async (req, res, next) => {
  const body = req.body;
  const article_id = body.article_id;
  const blog_id = body.blog_id;
  const title = body.title;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!article_id) {
    res.status(400).send(formatResponse(null, 'article_id is missing'));
    return;
  }
  if (!blog_id) {
    res.status(400).send(formatResponse(null, 'blog_id is missing'));
    return;
  }
  if (!title) {
    res.status(400).send(formatResponse(null, 'title is missing'));
    return;
  }
  if (!content) {
    res.status(400).send(formatResponse(null, 'content is missing'));
    return;
  }
  const newArticle = new Article({
    article_id: article_id,
    blog_id: blog_id,
    title: title,
    content: content,
  });
  newArticle
    .save()
    .then((result) => {
      res.status(200).send(formatResponse(result, 'Article created'));
    })
    .catch((err) => {
      next(err);
    });
};

const updateArticle = async (req, res, next) => {
  const body = req.body;
  const blog_id = body.blog_id;
  const title = body.title;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!blog_id) {
    res.status(400).send(formatResponse(null, 'blog_id is missing'));
    return;
  }
  if (!title) {
    res.status(400).send(formatResponse(null, 'title is missing'));
    return;
  }
  if (!content) {
    res.status(400).send(formatResponse(null, 'content is missing'));
    return;
  }
  const update = {
    blog_id: blog_id,
    title: title,
    content: content,
  };
  const filter = { article_id: req.params.id };

  Article.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Article updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Article not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const partialUpdateArticle = async (req, res, next) => {
  const body = req.body;
  const blog_id = body.blog_id;
  const title = body.title;
  const content = body.content;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  const update = {};
  if (blog_id) {
    update.blog_id = blog_id;
  }
  if (title) {
    update.title = title;
  }
  if (content) {
    update.content = content;
  }
  const filter = { article_id: req.params.id };

  Article.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Article updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Article not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const deleteArticle = async (req, res, next) => {
  const filter = { article_id: req.params.id };
  Article.findOneAndDelete(filter)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Article deleted'));
      } else {
        res.status(404).send(formatResponse(null, 'Article not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getArticleComments = async (req, res, next) => {
  const filters = { article_id: req.params.id };
  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const sort_by = req.query.sort_by;
  let sortConfig = {};
  let skipValue = parseInt(defaultSkip);
  let limitValue = parseInt(defaultLimit);
  if (limit) {
    if (limit < 0) {
      res
        .status(400)
        .send(
          formatResponse(null, 'Limit parameter must be greater or equal to 0'),
        );
      return;
    }
    limitValue = parseInt(limit);
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
  const article = await Article.find(filters)
    .then((articles) => {
      if (articles && typeof articles !== 'undefined' && articles.length > 0) {
        return articles[0];
      } else {
        res.status(404).send(formatResponse(null, 'Article not found'));
      }
    })
    .catch((err) => {
      next(err);
    });

  // if article user is undefined then finish execution
  if (!article) return;

  Article.aggregate()
    .lookup({
      from: 'comments',
      localField: 'article_id',
      foreignField: 'article_id',
      as: 'comments',
    })
    .addFields({ comments_count: { $size: '$comments' } })
    .match({ article_id: article.article_id })
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((result) => {
      if (result && result.length > 0 && result[0].comments_count > 0) {
        res.status(200).send(formatResponse(result, null));
      } else {
        res
          .status(404)
          .send(formatResponse(null, "Article doesn't have comments"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  partialUpdateArticle,
  deleteArticle,
  getArticleComments,
};
