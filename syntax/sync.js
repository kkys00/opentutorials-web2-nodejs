var fs = require('fs');

//readFileSync, 리턴값 있음
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');

//readFile - 함수 인자 필수. 리턴값 없음
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);//파일 읽어오는게 시간이 걸리니까 얘는 읽고 있으면서 밑에 거 실행하고 이후에 실행
});
console.log('C');