const Sequelize = require('sequelize');
const fs = require('fs'); //파일 및 폴더를 읽을 모듈
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
); //연결만 만들어 놓은것이고 app.js 에서 sync 함수를 호출하여 연결

db.sequelize = sequelize;

const basename = path.basename(__filename); //index.js 의미

fs.readdirSync(__dirname) // 현재 폴더의 모든 파일을 조회(model)
  .filter(file => { // 숨김 파일, index.js, js 확장자가 아닌 파일 필터링
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // 해당 파일의 모델 불러와서 init
    const model = require(path.join(__dirname, file));
    console.log(file, model.name);
    db[model.name] = model;
    model.initiate(sequelize);
  }); 

Object.keys(db).forEach(modelName => { // associate 호출 initiate를 다 완료하고나서 associate를 해야되서 분리해서 실행
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});// 자동화로 모델들 전체 불러오기 구간

module.exports = db;