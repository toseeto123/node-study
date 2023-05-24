// 라우터 -> 컨트롤러 호출 -> 서비스 호출 하는 구조(Spring과 유사 라우터 = DispatcherServlet)
exports.renderProfile = (req, res, next) => {
 res.render('profile', { title: '내 정보 - NodeBird'});
};
exports.renderJoin = (req, res, next) => {
 res.render('join' ,{ title: '회원 가입 - NodeBird'});
};
exports.renderMain = (req, res, next) => {
    res.render('main', {
         title: '내 정보 - NodeBird',
         twits: [],
        });
};
