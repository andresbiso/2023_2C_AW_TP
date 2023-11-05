const express = require('express');
const blogsCtrl = require('../controllers/blogs.controller');

const router = express.Router();

const basePath = '/api/blogs';

router.get(basePath + '/', blogsCtrl.getBlogs);

router.get(basePath + '/:id', blogsCtrl.getBlogById);

router.post(basePath + '/', blogsCtrl.createBlog);

router.put(basePath + '/:id', blogsCtrl.updateBlog);

router.patch(basePath + '/:id', blogsCtrl.partialUpdateBlog);

router.delete(basePath + '/:id', blogsCtrl.deleteBlog);

module.exports = router;
