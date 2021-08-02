const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getPosts);
router.post('/comment', auth, postCtrl.addComment);
router.post('/newPost', auth, multer, postCtrl.createPost);
router.put('/', auth, multer, postCtrl.modifyPost);
//router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;