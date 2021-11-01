/*
function a(){
    console.log('A');
}*/

const { callbackify } = require("util");

var a = function(){ //함수는 값
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);