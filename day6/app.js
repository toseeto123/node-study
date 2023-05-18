const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv'); 
const path = require('path');

dotenv.config();//dotenv는 최상단에 할수록 좋다.
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 비밀 키는 노출되지 않음 하드코딩을 방지, 개개인별로 권한을 다르게해서 서로 가지고 있게 하여 보안유지할것
app.use(cookieParser(process.env.COOKIE_SECRET)); 
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads'); //서버시작전에 사용하는 Sync는 괜찮다.
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
    //첫번째 인수는 보통 에러처리미들웨어 넣거나 null, 두번째 위치에 성공할때 값
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); //같은 이름의 파일을 구분하기위해 Date.now()추가
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
//이미지 업로드는 모든라우터가 아니라 특정 라우터에서만 일어나므로 한 라우터에서만 미들웨어 적용
app.post('/upload', upload.fields({name :'image1'},{name :'image2'},{name :'image3'}), (req, res) => {
    req.body.title // upload.none일 경우 이미지는 없고 바디,타이틀이 넘어옴
  console.log(req.files.image1); // single, array,fields 순으로 좀더 코드는 복잡해짐
  res.send('ok');
});

app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});