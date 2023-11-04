const express = require('express');
const usersCtrl = require('../controllers/users.controller');

const router = express.Router();

const basePath = '/api/users';

router.get(basePath + '/', usersCtrl.getUsers);

router.get(basePath + '/:id', usersCtrl.getUsersById);

router.post(basePath + '/', usersCtrl.createUser);

router.put(basePath + '/:id', usersCtrl.updateUser);

router.patch(basePath + '/:id', usersCtrl.partialUpdateUser);

router.delete(basePath + '/:id', usersCtrl.deleteUser);

module.exports = router;
