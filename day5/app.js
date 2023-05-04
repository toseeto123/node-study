const express = require('express');
const path = require('path');


const app = express();

app.set('port',process.env.PORT || 3000);

app.use((req,res, next ) =>{ //(req부터 ~} 까지가 미들웨어이다.)
  console.log('1 모든요청에 실행'); 
  next();
},(req,res,next)=>{
    try{
        console.log(asdad);
    }catch(error){
        next(error); //넥스트에 인수가 들어가 있다면 에러처리 미들웨어로 들어간다.
    }
});

app.get('/', (req,res)=>{  
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
    res.send('404입니다.'); //status(404)가 생략된 상태
})

app.use((err,req,res,next)=>{ //err 미들웨어는 반드시 4개를 다 사용해줘야한다.
    console.error(err);
    
    res.status(500).send('에러났지만 원인은 모릅니다.');
})

app.listen(app.get('port'), ()=>{
    console.log('익스프레스 서버 실행');
});