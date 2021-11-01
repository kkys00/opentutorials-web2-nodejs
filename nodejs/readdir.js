var testFolder = 'data';//이 폴더의 파일 목록을 배열로 만들어서 전달
var fs = require('fs');

fs.readdir(testFolder, function(err, filelist){
    console.log(filelist);
})