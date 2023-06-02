const express = require('express');

const { verifyToken ,deprecated} = require('../middlewares');
const { createToken, tokenTest ,getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

//공통사항이기때문에 deprecated하나로 전체 라우터 적용
router.use(deprecated);
// POST /v1/token
router.post('/token', createToken);

// POST /v1/test
router.get('/test', verifyToken, tokenTest);

router.get('/post/my', verifyToken, getMyPosts);
router.get('/post/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;