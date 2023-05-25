const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { afterUploadImage, uploadPost } = require('../controllers/post')


try{
    fs.readdirSync('uploads');
}catch(error){
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        destination (req, file, cb){
            cb(null, 'uploads/');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname); //이미지.png -> 이미지135135.png 로 만들어주는 로직
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 10 * 1024 * 1024},
});

router.post('/img', isLoggedIn ,upload.single('img'), afterUploadImage);

const upload2 = multer();
router.post('/', isLoggedIn ,upload.none() ,uploadPost); //이미지 안올리는 실제 게시글

module.exports =router;