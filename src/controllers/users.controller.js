const { join } = require('path');
const User = require('../models_mongodb/user.model');
require('dotenv').config({ path: join(__dirname, '..', '/configs/.env') });

const defaultSort = process.env.DEFAULT_SORT;
const defaultSkip = process.env.DEFAULT_SKIP;
const defaultLimit = process.env.DEFAULT_LIMIT;

const getUsers = async (req, res) => {
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
      res.status(400).send('Limit parameter must be greater or equal to 0');
      return;
    }
    limitValue = limit;
  }
  if (page) {
    if (page <= 0) {
      res.status(400).send('Page parameter must be greater than 0');
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
      if (users && users !== null) {
        res.status(200).send({ data: users });
      } else {
        res.status(404).send({ data: null, message: 'Data not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

const getUsersById = async (req, res) => {
  const filters = { user_id: req.params.id };
  User.find(filters)
    .then((users) => {
      if (users && users !== null) {
        res.status(200).send({ data: users });
      } else {
        res.status(404).send({ data: null, message: 'Data not found' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

const createUser = async (req, res) => {
  const body = req.body;
  const user_id = body.user_id;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('No parameters found in body');
    return;
  }
  if (!user_id) {
    res.status(400).send('user_id is missing');
    return;
  }
  if (!username) {
    res.status(400).send('username is missing');
    return;
  }
  if (!password) {
    res.status(400).send('password is missing');
    return;
  }
  if (!first_name) {
    res.status(400).send('first_name is missing');
    return;
  }
  if (!last_name) {
    res.status(400).send('last_name is missing');
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
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

const updateUser = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('No parameters found in body');
    return;
  }
  if (!username) {
    res.status(400).send('username is missing');
    return;
  }
  if (!password) {
    res.status(400).send('password is missing');
    return;
  }
  if (!first_name) {
    res.status(400).send('first_name is missing');
    return;
  }
  if (!last_name) {
    res.status(400).send('last_name is missing');
    return;
  }
  const update = {
    username: username,
    password: password,
    first_name: first_name,
    last_name: last_name,
  };
  const filter = { user_id: req.params.id };

  User.findByIdAndUpdate(filter, update)
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

const partialUpdateUser = async (req, res) => {
  const body = req.body;
  const username = body.username;
  const password = body.password;
  const first_name = body.first_name;
  const last_name = body.last_name;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('No parameters found in body');
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

  User.findByIdAndUpdate(filter, update)
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  createUser,
  updateUser,
  partialUpdateUser,
};
