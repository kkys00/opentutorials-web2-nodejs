// array, object

function f1(){//값이면서 구문
    console.log(1+1);
    console.log(1+2);
}

var  f2 = function(){//값이면서 구문
    console.log(1+1);
    console.log(1+2);
}
f2(); //함수 실행

var a = [f2]; //함수를 배열에 담기
a[0](); //함수 실행

var o = { //함수를 객체에 담기
    func:f2
}
o.func(); //함수 실행


//if, while은 값이 될 수 없다.