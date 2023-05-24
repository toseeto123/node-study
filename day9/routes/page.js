const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile } = require('../controllers/page');

router.use((req, res, next)=>{
    //다른 라우터에서도 공통적으로 쓰길 원하는 데이터를 넣음 
    res.locals.user =null;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', renderProfile); // 라우터의 마지막 미들웨어 컨트롤러를 활용할것임 
router.get('/join',renderJoin);
router.get('/', renderMain);

module.exports = router;