const { odd, even } = require('./var') //require는 node에서 제공하는 함수

function checkOddOrEven(number) {
    if(number % 2){
        return odd;
    } else {
        return even;
    }
}
module.exports = checkOddOrEven;