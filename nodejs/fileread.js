var fs = require('fs');
fs.readFile('sample.txt', 'utf8', function(err, data){//utf8 필수
    console.log(data);
});