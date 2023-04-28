const odd = '홀수입니다.';
const even= '짝수입니다.';

//같은 관계이다. exports를 쓴경우 객체형식 유지를 위해서 exports만 사용할것.
module.exports == exports == {}

exports.odd = odd;
exports.even= even;

module.exports = {
    odd: odd, //odd로 표현가능 
    even: even,
};