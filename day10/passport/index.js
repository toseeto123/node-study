const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports =()=>{
    passport.serializeUser((user, done)=>{ //user === exUser
        done(null, user.id); //user로부터 userid 만 저장
    });
    //세션 {315135 : 1} { 세션쿠키: 유저아이디} -> 메모리 저장을 아이디만 저장하도록 해서 가볍게 만듬
    passport.deserializeUser((id, done) => {
        User.findOne({ 
            where: { id },
            include:[
                {
                    model: User,
                    attributes: ['id','nick'],
                    as: 'Followers'
                },//팔로잉
                {
                    model: User,
                    attributes: ['id','nick'],
                    as: 'Followings'
                }, //팔로워
            ]
        })
        .then((user)=> done(null,user)) //req.user 
        .catch(err=>done(err));
    });

    local();
    kakao();
};