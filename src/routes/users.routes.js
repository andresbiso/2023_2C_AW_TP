const express = require('express');
const usersCtrl = require('../controllers/users.controller');

const router = express.Router();

const basePath = '/api/users';

router.get(basePath + '/', usersCtrl.getUsers);

router.get(basePath + '/:id', usersCtrl.getUsersById);

router.post(basePath + '/', usersCtrl.createUser);

router.put(basePath + '/:id', usersCtrl.updateUser);

router.patch(basePath + '/:id', usersCtrl.partialUpdateUser);

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
