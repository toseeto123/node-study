const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async (req,res)=>{
    try{
        res.writeHead(200 , { 'Content-Type' : 'text/html; charset=utf8'});
        const data = await fs.readFile('./server2.html');
    }catch(error){
        console.error(error);
        res.writeHead(200 , { 'Content-Type' : 'text/plain; charset=utf8'}); //text/plain >> 일반문자임을 알려준다.
        res.end(err.message);
    }
    res.writeHead(200 , { 'Content-Type' : 'text/html; charset=utf8'}); //safari의 경우 http형태를 자동인식 못해서 적어줘야한다.
   const data = await fs.readFile('./server2.html');
    res.end(data);
})
    .listen(8080); // 나중에 배포할때 포트번호는 80으로 바꿔서 배포할수있다.
server.on('listening',()=>{ //listening도 활용가능
    console.log('8080포트에서 서버 대기중입니다.');
});
server.on('error', (error)=>{
    console.error(error);
});