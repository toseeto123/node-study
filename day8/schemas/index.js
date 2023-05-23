const mongoose = require('mongoose');

const connect = () => {
  if (process.env.NODE_ENV !== 'production') {
    //개발할때 debug true를 통해 쿼리가 콘솔에 뜨는것을 확인할수있다.
    mongoose.set('debug', true);
  }
  // 주소앞에 id:비밀번호 << 입력가능
  mongoose.connect('mongodb://root:nodejsbook@localhost:27017/admin', {
    dbName: 'nodejs',
    useNewUrlParser: true,
  }).then(() => {
    console.log("몽고디비 연결 성공");
  }).catch((err) => {
    console.error("몽고디비 연결 에러", err);
  });
};
//이벤트 리스너
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
  connect();
});

module.exports = connect;