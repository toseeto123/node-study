const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn} = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const router = express.Router();

//auth/join ,/auth/login, /auth/logout
router.post('/join', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);
router.get('/logout', isLoggedIn, logout);

//auth/kakao , /auth/kakao/callback
router.get('/kakao' , passport.authenticate('kakao')) // 카카오톡 로그인화면으로 redirect
//로그인 성공시 리다이렉트
router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect: '/?loginError=카카오로그인 실패',
}),(req, res)=>{
    res.redirect('/');
})
    
module.exports = router;