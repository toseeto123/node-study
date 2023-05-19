const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('port',process.env.PORT || 3000);
//미들웨어 순서는 중요하다.
app.use(morgan('combined')); //개발시 dev, 배포시 combined 사용

//app.use('요청경로',express.static('실제경로')); //정적파일(html,css) 보낼때 사용
app.use('/', (req,res,next)=>{
    if (req.session.id){ // 로그인한 경우 해당 파일 제공
        express.static(__dirname, '')(req, res, next) //보안을 유지하는데 좋다. 파일을 해당폴더에서 찾을경우 next를 진행하지않음
    }else{ // 아닌경우 파일 제공하지않음
        next();
    }
   
});
app.use(cookieParser('password'));
//개인의 저장공간을 만들어주는 express-session
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:'password',
    cookie:{
        httpOnly: true,
    },
    name: 'connect.sid', // 서명되어있기때문에 읽을수없는 문자열

}))
app.use(express.json()); // client 에서 json 보낼때 파싱하여사용
//client에서 form태그 보낼때 파싱하여 사용 true면 qs,false면 querystring 사용
app.use(express.urlencoded({ extended: true }));  
//form에서 이미지나 파일 보낼때는 urlencoded가 처리를 못해서 다른 종류를 사용함(multer)

app.use((req,res,next)=>{
    req.session.data = 'namsu비번';
    //req.data >> 요청한번에만 data를 전송할때 사용
})

app.get('/', (req,res,next)=>{  
    req.session.data // namsu비번 >> 다만 세션이기때문에 영구적으로 남음
     res.sendFile(path.join(__dirname,'./index.html')); //알아서 fs모듈을 사용하여 파일을 읽어서 불러온다
 next('route');
},(req,res)=>{
    console.log('실행되지않습니다.'); //next의 경우 다음 라우터로 실행된다.
});
app.get('/', (req,res)=>{ 
    console.log('hello namsu'); //그러므로 콘솔로그는 실행된다.
   });

app.get('/category/:name', (req,res)=>{ 
    res.send(`hello ${req.params.name}`); //res.send인 경우에는 여기서 종료되어야한다. next로 넘어갈때 에러가 발생하기도한다.
});
app.get('/category/Javascript', (req,res)=>{
    res.send(`hello javascript `); //javascript를 :name으로 인식한다.
});

app.post('/', (req,res)=>{
    res.send('hello express');
});
app.get('/about', (req,res)=>{
    res.status(200).send('hello express'); //status(200)이 생략된 상태
});

app.use((req,res,next)=>{ //404처리 미들웨어 ()
    res.status(404).send('404입니다.'); //status(404)가 생략된 상태
})

app.use((err,req,res,next)=>{ //err 미들웨어는 반드시 4개를 다 사용해줘야한다.
    console.error(err);
    res.status(500).send('에러났지만 원인은 모릅니다.');
})

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});