const express = require('express');
const databasesCtrl = require('../controllers/databases.controller');

const router = express.Router();

const basePath = '/api/databases';

router.get(basePath + '/', databasesCtrl.getDatabases);

module.exports = router;
