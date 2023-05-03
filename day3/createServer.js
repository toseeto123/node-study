const http = require('http');

const server = http.createServer((req,res)=>{
    res.writeHead(200 , { 'Content-Type' : 'text/html; charset=utf8'}); //safari의 경우 http형태를 자동인식 못해서 적어줘야한다.
    res.write('<h1>Hello Node!</h1>'); //stream
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello namsukim</p>') // stream이므로 end로 종료
})
    .listen(8080); // 나중에 배포할때 포트번호는 80으로 바꿔서 배포할수있다.
server.on('listening',()=>{ //listening도 활용가능
    console.log('8080포트에서 서버 대기중입니다.');
});
server.on('error', (error)=>{
    console.error(error);
});
const server1 = http.createServer((req,res)=>{
    res.writeHead(200 , { 'Content-Type' : 'text/html; charset=utf8'}); 
    res.write('<h1>Hello Node!</h1>'); 
    res.write('<p>Hello Server</p>');
    res.end('<p>Hello namsukim</p>') 
})
    .listen(8081); //동시에 2개의 서버를 돌릴수도있다.