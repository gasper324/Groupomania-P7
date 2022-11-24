//setup router
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//require controller functions
const memesCtrl = require('../controllers/memes');

//sets up endpoints for memes
router.post('/', auth, multer, memesCtrl.createPost);
router.get('/', auth, memesCtrl.getAllPosts);
router.get('/:postId', auth, memesCtrl.getPostById);
router.put('/:postId', auth, multer, memesCtrl.updatePostById);
router.put('/usersRead/:postId', auth, memesCtrl.updateUsersRead)
router.delete('/:postId', auth, multer, memesCtrl.deletePostById);

module.exports = router;