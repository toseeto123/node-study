const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session= require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport')
const { sequelize } = require('./models');

//process.env.COOKIE_SECRET이 없음
dotenv.config(); //process.env 최대한 위에 올려주는것이 좋다.
//process.env.COOKIE_SECRET이 있음
const pageRouter = require('./routes/page');
const passportConfig = require('./passport')
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

const exp = require('constants');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express : app,
    watch: true,
});

sequelize.sync({ force: false })
    .then(()=>{
        console.log('데이터 베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    })

app.use(morgan ('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img/', express.static(path.join(__dirname, 'uploads'))); //업로드된 이미지파일 가져오는 미들웨어
app.use(express.json()); //req.body 를 ajax json으로부터 가져옴
app.use(express.urlencoded({ extended:false })); //req.body 폼으로부터 가져옴
app.use(cookieParser(process.env.COOKIE_SECRET)); //{ connect.sid: 135135312 } 로 유저아이디 찾음
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure :false, //https로 적용할때 secure : true로 변환
    }
}));
//반드시 express session 밑에다가 passport 붙이기 
app.use(passport.initialize()); //req.user,req.login, req.isAuthenticate,req.logout
app.use(passport.session()); //connect.sid 라는 이름으로 세션쿠키가 브라우저로 전송 >> 브라우저 connect.sid=135135312

app.use('/',pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});
//에러처리 미들웨어
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err:{}; //에러 로그를 서비스한테 넘긴다.
    res.status(err.status || 500);
    res.render('error'); //views폴더의 error.html파일을 찾음
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기중')
})