const { v4: uuidv4 } = require('uuid');
const { User, Domain } = require('../models'); 

exports.renderLogin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user?.id || null }, //where에는 undefined가 들어가면 안됨(sequelize사용시 주의)
      include: { model: Domain },
    });
    res.render('login', {
      user,
      domains: user?.Domains,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

exports.createDomain = async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuidv4(), //도메인 생성하며 랜덤안 uuid를 생성하여 도메인에 부여 (clientSecret으로)
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
};