const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blogController');
const validationMiddleware = require('../middleware/validation');
const { authenticateUser } = require('../middleware/Authentication');

// CRUD operations
router.post('/addblogs', authenticateUser, validationMiddleware.validateBlog, validationMiddleware.validateInputs, BlogController.createBlog);
router.get('/getblogs', authenticateUser, BlogController.getAllBlogs);
router.get('/getblogs/:blogId', authenticateUser, BlogController.getBlogById);
router.put('/updateblogs/:blogId', authenticateUser, validationMiddleware.validateBlog, validationMiddleware.validateInputs, BlogController.updateBlog);
router.delete('/deleteblogs/:blogId', authenticateUser, BlogController.deleteBlog);

// Search functionality
router.get('/search/:query', authenticateUser, BlogController.searchBlogs);

// Aggregation and advanced querying
// Have to check - issue
router.get('/stats', authenticateUser, BlogController.getBlogStatistics);
router.get('/blogs/range/:start/:end', authenticateUser, BlogController.getBlogsInDateRange);

// Category-based filtering
// Have to check - issue
router.get('/blogs/category/:category', authenticateUser, BlogController.getBlogsByCategory);
router.post('/blogs/:blogId/users/:userId', authenticateUser, BlogController.addUserToBlog);
router.get('/users/:userId/blogs', authenticateUser, BlogController.getBlogsForUser);

module.exports = router;
