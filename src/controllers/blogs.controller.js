const { join } = require('path');
const Blog = require('../models_mongodb/blog.model');
const { formatResponse } = require('../utils/utils');
require('dotenv').config({ path: join(__dirname, '..', '/configs/.env') });

const defaultSort = process.env.DEFAULT_SORT;
const defaultSkip = process.env.DEFAULT_SKIP;
const defaultLimit = process.env.DEFAULT_LIMIT;

const getBlogs = async (req, res, next) => {
  const blog_id = req.query.blog_id;
  const user_id = req.query.user_id;
  const title = req.query.title;
  const description = req.query.description;
  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const sort_by = req.query.sort_by;
  let sortConfig = {};
  let skipValue = defaultSkip;
  let limitValue = defaultLimit;
  const filters = {};
  if (blog_id) {
    filters.blog_id = parseInt(blog_id);
  }
  if (user_id) {
    filters.user_id = parseInt(user_id);
  }
  if (title) {
    filters.title = title;
  }
  if (description) {
    filters.description = description;
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
  Blog.find(filters)
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((blogs) => {
      if (blogs && blogs.length > 0) {
        res.status(200).send(formatResponse(blogs, null));
      } else {
        res.status(404).send(formatResponse(null, 'Blogs not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getBlogById = async (req, res, next) => {
  const filters = { blog_id: req.params.id };
  Blog.find(filters)
    .then((blogs) => {
      if (blogs && blogs.length > 0) {
        res.status(200).send(formatResponse(blogs, null));
      } else {
        res.status(404).send(formatResponse(null, 'Blog not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const createBlog = async (req, res, next) => {
  const body = req.body;
  const blog_id = body.blog_id;
  const user_id = body.user_id;
  const title = body.title;
  const description = body.description;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!blog_id) {
    res.status(400).send(formatResponse(null, 'blog_id is missing'));
    return;
  }
  if (!user_id) {
    res.status(400).send(formatResponse(null, 'user_id is missing'));
    return;
  }
  if (!title) {
    res.status(400).send(formatResponse(null, 'title is missing'));
    return;
  }
  if (!description) {
    res.status(400).send(formatResponse(null, 'description is missing'));
    return;
  }
  const newBlog = new Blog({
    blog_id: blog_id,
    user_id: user_id,
    title: title,
    description: description,
  });
  newBlog
    .save()
    .then((result) => {
      res.status(200).send(formatResponse(result, 'Blog created'));
    })
    .catch((err) => {
      next(err);
    });
};

const updateBlog = async (req, res, next) => {
  const body = req.body;
  const user_id = body.user_id;
  const title = body.title;
  const description = body.description;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!user_id) {
    res.status(400).send(formatResponse(null, 'user_id is missing'));
    return;
  }
  if (!title) {
    res.status(400).send(formatResponse(null, 'title is missing'));
    return;
  }
  if (!description) {
    res.status(400).send(formatResponse(null, 'description is missing'));
    return;
  }
  const update = {
    user_id: user_id,
    title: title,
    description: description,
  };
  const filter = { blog_id: req.params.id };

  Blog.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Blog updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Blog not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const partialUpdateBlog = async (req, res, next) => {
  const body = req.body;
  const user_id = body.user_id;
  const title = body.title;
  const description = body.description;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  const update = {};
  if (user_id) {
    update.user_id = user_id;
  }
  if (title) {
    update.title = title;
  }
  if (description) {
    update.description = description;
  }
  const filter = { blog_id: req.params.id };

  Blog.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Blog updated'));
      } else {
        res.status(404).send(formatResponse(null, 'Blog not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const deleteBlog = async (req, res, next) => {
  const filter = { blog_id: req.params.id };
  Blog.findOneAndDelete(filter)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'Blog deleted'));
      } else {
        res.status(404).send(formatResponse(null, 'Blog not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getBlogArticles = async (req, res, next) => {
  const filters = { blog_id: req.params.id };
  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const sort_by = req.query.sort_by;
  let sortConfig = {};
  let skipValue = parseInt(defaultSkip);
  let limitValue = parseInt(defaultLimit);
  if (limit) {
    console.log(limit);
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
  const blog = await Blog.find(filters)
    .then((blogs) => {
      if (blogs && blogs.length > 0) {
        return blogs[0];
      } else {
        res.status(404).send(formatResponse(null, 'Blog not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
  Blog.aggregate()
    .lookup({
      from: 'articles',
      localField: 'blog_id',
      foreignField: 'blog_id',
      as: 'articles',
    })
    .addFields({ articles_count: { $size: '$articles' } })
    .match({ blog_id: blog.blog_id })
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((result) => {
      if (result && result.length > 0 && result[0].articles_count > 0) {
        res.status(200).send(formatResponse(result, null));
      } else {
        res
          .status(404)
          .send(formatResponse(null, "Blog doesn't have articles"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  partialUpdateBlog,
  deleteBlog,
  getBlogArticles,
};
