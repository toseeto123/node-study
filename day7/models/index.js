const Sequelize = require('sequelize');
const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

//연결 객체 sequelize
const sequelize = new Sequelize(config.database, config.username, config.password,config);

db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

//initiate를 통해서 sequelize와 연결
User.initiate(sequelize);
Comment.initiate(sequelize);
//associate로 관계 설정
User.associate(db);
Comment.associate(db);

module.exports = db;
