const { join } = require('path');
const User = require('../models_mongodb/user.model');
const { formatResponse } = require('../utils/utils');
require('dotenv').config({ path: join(__dirname, '..', '/configs/.env') });

const defaultSort = process.env.DEFAULT_SORT;
const defaultSkip = process.env.DEFAULT_SKIP;
const defaultLimit = process.env.DEFAULT_LIMIT;

const getUsers = async (req, res, next) => {
  const user_id = req.query.user_id;
  const username = req.query.username;
  const password = req.query.password;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const page = req.query.page;
  const limit = req.query.limit;
  const sort = req.query.sort;
  const sort_by = req.query.sort_by;
  let sortConfig = {};
  let skipValue = defaultSkip;
  let limitValue = defaultLimit;
  const filters = {};
  if (user_id) {
    filters.user_id = parseInt(user_id);
  }
  if (username) {
    filters.username = username;
  }
  if (password) {
    filters.password = password;
  }
  if (first_name) {
    filters.first_name = first_name;
  }
  if (last_name) {
    filters.last_name = last_name;
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
  User.find(filters)
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((users) => {
      if (users && users.length > 0) {
        res.status(200).send(formatResponse(users, null));
      } else {
        res.status(404).send(formatResponse(null, 'Users not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserById = async (req, res, next) => {
  const filters = { user_id: req.params.id };
  User.find(filters)
    .then((users) => {
      if (users && users.length > 0) {
        res.status(200).send(formatResponse(users, null));
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = async (req, res, next) => {
  const body = req.body;
  const user_id = body.user_id;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!user_id) {
    res.status(400).send(formatResponse(null, 'user_id is missing'));
    return;
  }
  if (!username) {
    res.status(400).send(formatResponse(null, 'username is missing'));
    return;
  }
  if (!password) {
    res.status(400).send(formatResponse(null, 'password is missing'));
    return;
  }
  if (!first_name) {
    res.status(400).send(formatResponse(null, 'first_name is missing'));
    return;
  }
  if (!last_name) {
    res.status(400).send(formatResponse(null, 'last_name is missing'));
    return;
  }
  const newUser = new User({
    user_id: user_id,
    username: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
  });
  newUser
    .save()
    .then((result) => {
      res.status(200).send(formatResponse(result, 'User created'));
    })
    .catch((err) => {
      next(err);
    });
};

const updateUser = async (req, res, next) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  if (!username) {
    res.status(400).send(formatResponse(null, 'username is missing'));
    return;
  }
  if (!password) {
    res.status(400).send(formatResponse(null, 'password is missing'));
    return;
  }
  if (!first_name) {
    res.status(400).send(formatResponse(null, 'first_name is missing'));
    return;
  }
  if (!last_name) {
    res.status(400).send(formatResponse(null, 'last_name is missing'));
    return;
  }
  const update = {
    username: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
  };
  const filter = { user_id: req.params.id };

  User.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'User updated'));
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const partialUpdateUser = async (req, res, next) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send(formatResponse(null, 'No parameters found in body'));
    return;
  }
  const update = {};
  if (username) {
    update.username = username;
  }
  if (password) {
    update.password = password;
  }
  if (first_name) {
    update.first_name = first_name;
  }
  if (last_name) {
    update.last_name = last_name;
  }
  const filter = { user_id: req.params.id };

  User.findOneAndUpdate(filter, update)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'User updated'));
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const deleteUser = async (req, res, next) => {
  const filter = { user_id: req.params.id };
  User.findOneAndDelete(filter)
    .then((result) => {
      if (result) {
        res.status(200).send(formatResponse(null, 'User deleted'));
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserBlogs = async (req, res, next) => {
  const filters = { user_id: req.params.id };
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
  const user = await User.find(filters)
    .then((users) => {
      if (users && users.length > 0) {
        return users[0];
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
  User.aggregate()
    .lookup({
      from: 'blogs',
      localField: 'user_id',
      foreignField: 'user_id',
      as: 'blogs',
    })
    .addFields({ blogs_count: { $size: '$blogs' } })
    .match({ user_id: user.user_id })
    .skip(skipValue)
    .limit(limitValue)
    .sort(sortConfig)
    .then((result) => {
      if (result && result.length > 0 && result[0].blogs_count > 0) {
        res.status(200).send(formatResponse(result, null));
      } else {
        res.status(404).send(formatResponse(null, "User doesn't have blogs"));
      }
    })
    .catch((err) => {
      next(err);
    });
};

const getUserReport = async (req, res, next) => {
  const filters = { user_id: req.params.id };
  const user = await User.find(filters)
    .then((users) => {
      if (users && users.length > 0) {
        return users[0];
      } else {
        res.status(404).send(formatResponse(null, 'User not found'));
      }
    })
    .catch((err) => {
      next(err);
    });
  const blogsAmount = await User.aggregate()
    .lookup({
      from: 'blogs',
      localField: 'user_id',
      foreignField: 'user_id',
      as: 'blogs',
    })
    .addFields({ blogs_count: { $size: '$blogs' } })
    .match({ user_id: user.user_id })
    .then((result) => {
      if (result && result.length > 0) {
        return result[0].blogs_count;
      } else {
        res.status(404).send(formatResponse(null, "User doesn't have blogs"));
      }
    })
    .catch((err) => {
      next(err);
    });
  const commentsAmount = await User.aggregate()
    .lookup({
      from: 'comments',
      localField: 'user_id',
      foreignField: 'user_id',
      as: 'comments',
    })
    .addFields({ comments_count: { $size: '$comments' } })
    .match({ user_id: user.user_id })
    .then((result) => {
      if (result && result.length > 0) {
        return result[0].comments_count;
      } else {
        res.status(404).send(formatResponse(null, "User doesn't have blogs"));
      }
    })
    .catch((err) => {
      next(err);
    });
  const result = {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    blogs_amount: blogsAmount,
    comments_amount: commentsAmount,
  };
  res.status(200).send(formatResponse(result, null));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  partialUpdateUser,
  deleteUser,
  getUserBlogs,
  getUserReport,
};
