const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile,renderHashtag } = require('../controllers/page');
const { isLoggedIn,isNotLoggedIn } = require('../middlewares/index');

router.use((req, res, next)=>{
    //다른 라우터에서도 공통적으로 쓰길 원하는 데이터를 넣음  res.locals > 미들웨어간의 공유되는 데이터, res.session 사용자한테 공유되는 데이터
    res.locals.user = req.user; //passport process 마지막에 확인가능한 req.user (회원정보담음) 

    res.locals.followerCount = req.user?.Followers?.length || 0;  //optional 체이닝으로 null이어도 에러가나지않음
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);  
router.get('/join',isNotLoggedIn ,renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag); //hashtag?tashtag=고양이

module.exports = router;