const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session= require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

//process.env.COOKIE_SECRET이 없음
dotenv.config(); //process.env 최대한 위에 올려주는것이 좋다.
//process.env.COOKIE_SECRET이 있음
const pageRouter = require('./routes/page');
const exp = require('constants');

const app = express();
app.set('port', process.env.PORT || 8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express : app,
    watch: true,
});

app.use(morgan ('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized:false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure :false, //https로 적용할때 secure : true로 변환
    }
}));


app.use('/',pageRouter);
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