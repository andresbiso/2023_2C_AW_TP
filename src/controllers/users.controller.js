const express = require('express');
const User = require('../models_mongodb/user.model');

const router = express.Router();

const basePath = '/api/users';

router.get(basePath + '/', async (req, res) => {
  const user_id = req.query.user_id;
  const username = req.query.username;
  const password = req.query.password;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
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
  User.find({})
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
});

router.post(basePath + '/', (req, res) => {
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('No parameters found in body');
    return;
  }
  if (!body.user_id) {
    res.status(400).send('user_id is missing');
    return;
  }
  if (!body.username) {
    res.status(400).send('username is missing');
    return;
  }
  if (!body.password) {
    res.status(400).send('password is missing');
    return;
  }
  if (!body.first_name) {
    res.status(400).send('first_name is missing');
    return;
  }
  if (!body.last_name) {
    res.status(400).send('first_name is missing');
    return;
  }
  let newUser = new User({
    user_id: body.user_id,
    username: body.username,
    password: body.password,
    first_name: body.first_name,
    last_name: body.last_name
  });
  newUser.save()
    .then((result) => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err.message);
    });
});

// router.put('/', (req, res, next) => {
//   let vm = req.body;
//   let _id = vm._id;
//   delete vm['_id'];
//   db.collection('users').updateOne(
//     {
//       _id: ObjectId(_id),
//     },
//     {
//       $set: vm,
//     },
//     (err, result) => {
//       if (err) return res.send(err);
//       res.send(200);
//     },
//   );
// });

// router.delete('/', (req, res, next) => {
//   let _id = req.query._id ? ObjectId(req.query._id) : null;
//   console.log('_id', _id);
//   if (!_id) {
//     res.send(400, 'Inform the user ID');
//     return;
//   }
//   let filter = { _id: _id };
//   db.collection('users')
//     .find(filter)
//     .toArray((err, result) => {
//       if (result.length === 0) {
//         res.send(400, 'User not found');
//         return;
//       }
//       db.collection('users').deleteOne(filter, (err, result) => {
//         if (err) return res.send(500, err);
//         res.send(200);
//       });
//     });
// });

module.exports = router;
