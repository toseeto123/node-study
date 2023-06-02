const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      email: {
        type: Sequelize.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      provider: {
        type: Sequelize.ENUM('local', 'kakao'),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true, // createdAt,updatedAt
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true, //deletedAt 유저 삭제일 //soft Delete를 통한 나중에 탈퇴한 회원정보를 복구하기 위한 옵션
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, { //follower, following은 다대다 관계라서 belongsToMany
      foreignKey: 'followingId', //following을 찾아야지만
      as: 'Followers', //follower를 찾음
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, { //following
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
    db.User.hasMany(db.Domain);
  }
};

module.exports = User;