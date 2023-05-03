const fs = require('fs');

const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('finish', () => {
    console.log('파일쓰기완료');
});
writeStream.write('이글을 씁니다\n');
writeStream.write('한번 더 씁니다.');
writeStream.end();