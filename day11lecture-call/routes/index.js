const express = require('express');
const { getMyPosts ,searchByHashtag , renderMain} = require('../controllers');

const router = express.Router();

router.get('/myposts/', getMyPosts);
router.get('/search/:hashtag', searchByHashtag);
router.get('/', renderMain);

// // POST /test
// router.get('/test', test);

module.exports = router;