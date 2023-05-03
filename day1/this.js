console.log(this); //this는 전역객체 //but anonymous 의 this는 global이 아니다.
console.log(this === module.exports === {})

function a() {
    console.log(this === global);
}
a();
