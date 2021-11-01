var v1 = 'v1';
var v2 = 'v2';

var q = {//폴더로 파일을 정리정돈하는 것과 마찬가지
    v1: 'v1',
    v2: 'v2',
    f1: function(){
        console.log(this.v1); //함수 내부 변수를 다룰 때는 this 키워드 사용
    },
    f2: function(){
        console.log(this.v2);
    }
}

q.f1();
q.f2();
