const express = require('express');
const commentsCtrl = require('../controllers/comments.controller');

const router = express.Router();

const basePath = '/api/comments';

router.get(basePath + '/', commentsCtrl.getComments);

router.get(basePath + '/:id', commentsCtrl.getCommentById);

router.post(basePath + '/', commentsCtrl.createComment);

router.put(basePath + '/:id', commentsCtrl.updateComment);

router.patch(basePath + '/:id', commentsCtrl.partialUpdateComment);

router.delete(basePath + '/:id', commentsCtrl.deleteComment);

module.exports = router;
