const express = require('express');
const articlesCtrl = require('../controllers/articles.controller');

const router = express.Router();

const basePath = '/api/articles';

router.get(basePath + '/', articlesCtrl.getArticles);

router.get(basePath + '/:id', articlesCtrl.getArticleById);

router.post(basePath + '/', articlesCtrl.createArticle);

router.put(basePath + '/:id', articlesCtrl.updateArticle);

router.patch(basePath + '/:id', articlesCtrl.partialUpdateArticle);

router.delete(basePath + '/:id', articlesCtrl.deleteArticle);

module.exports = router;
