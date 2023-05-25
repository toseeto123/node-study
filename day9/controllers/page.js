const {Post, User } = require('../models');

// 라우터 -> 컨트롤러 호출 -> 서비스 호출 하는 구조(Spring과 유사 라우터 = DispatcherServlet)
exports.renderProfile = (req, res, next) => {
 res.render('profile', { title: '내 정보 - NodeBird'});
};
exports.renderJoin = (req, res, next) => {
 res.render('join' ,{ title: '회원 가입 - NodeBird'});
};

exports.renderMain = async (req, res, next) => {
    try{
        const posts = await Post.findAll({
            include:{
                model: User,
                attributes:['id','nick'], //비밀번호는 나오면 안되기때문에 뺀다
            },
            order: [['createdAt', 'DESC']]//최신으로 정렬
        })
        res.render('main', {
            title: 'NodeBird',
            twits: posts,
         });
    }catch(error){
        console.error(error);
        next(error);
    }
};
