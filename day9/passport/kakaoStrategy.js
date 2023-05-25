const passport = require("passport");
const { Strategy: KaKaoStrategy } = require('passport-kakao');
const User = require('../models/user');

module.exports =() =>{
    passport.use(new KaKaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
    } ,async(acceeToken, refreshToken, profile, done)=>{
        console.log('profile',profile);
        try{
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' }
            });
            if(exUser){//로그인
                done(null, exUser);
            }else{//회원가입
                const newUser = await User.create({
                    email: profile.json?.kakao_account?.email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                })
                done(null,newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};