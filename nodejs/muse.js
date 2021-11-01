/*var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    },
}*/

var part = require('./mpart.js');
console.log(part); //모듈.exports 값으로 대입한 객체가 들어옴.

part.f();