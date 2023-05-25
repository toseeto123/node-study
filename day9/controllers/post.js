const { Post, Hashtag } = require('../models');


exports.afterUploadImage = (req, res) =>{
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}`}); //res.data.url = url
};

exports.uploadPost = async (req, res, next) =>{
  try{
    //노드 교과서 너무재밌어요 # 노드 교과서 # 익스프레스 << 라는 게시글일 경우 (해쉬태그 2개 추출해야함) : 정규표현식으로 추출
    const post = await Post.create({
        content: req.body.content,
        img:req.body.url,
        UserId: req.user.id,
    });
   const hashtags = req.body.content.match( /#[^\s#]*/g);
   if(hashtags){
   const result = await Promise.all(hashtags.map((tag)=> {
        return Hashtag.findOrCreate({//있으면 가져오고 없으면 만들어서 가져온다.
            where: { title: tag.slice(1).toLowerCase() } //#떼고 대문자 소문자로 변환
        });
     }));
     console.log('result',result);
     await post.addHashtags(result.map(r => r[0])); //포스트랑 해쉬태그랑 다대다 관계 생성
   }
   res.redirect('/');
  }catch(error){
    console.error(error);
    next(error);
  }
};