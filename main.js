var http = require('http');//require는 요구한다~
var fs = require('fs');
var url = require('url');//모듈 url 
var qs = require('querystring');
var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    
    if(pathname === '/'){
      if(queryData.id === undefined){
          fs.readdir('./data', function(error, filelist){
            var title = 'Welcome';
            var description = 'Hello, Nodejs';
            var list = template.list(filelist);
            var html = template.html(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(html);  
          })
          
        
      } else{
        fs.readdir('./data', function(error, filelist){
          fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
            var title = queryData.id;
            var list = template.list(filelist);
            var html = template.html(title, list, `<h2>${title}</h2>
            <p>${description}</p>`, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>
            <form action="delete_process" method="post"> 
            <input type="hidden" name="id" value="${title}">
            <input type="submit" value="delete">
            </form>`);
            response.writeHead(200);
            response.end(html);  
          });
        });
      }
      
    } else if(pathname === "/create") {
      fs.readdir('./data', function(error, filelist){
        var title = 'WEB - create';
        var list = template.list(filelist);
        var html = template.html(title, list, `<form action="/create_process" method="post">
        <p>
            <input type="text" name="title" placeholder="title">
        </p>
        <p>
            <textarea name="description" placeholder="description"></textarea>
        </p>
        <p>
            <input type="submit">
        </p>
    </form>
    `, '');
        response.writeHead(200);
        response.end(html);  })

    }else if(pathname === "/create_process"){
      var body = '';
      request.on('data', function(data){//data 인자로 수신한 정보 주기.
        body = body + data; //콜백이 실행될 때마다 데이터 추가. 데이터가 많을 때 사용
      });
      request.on('end', function(){
        var post = qs.parse(body); //여기에 post로 보내진 정보 객체화
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});//파일이 생성되면 실행되는 콜백함수
          response.end('success'); 
        })
      });
      
    }else if(pathname === "/update"){
      fs.readdir('./data', function(error, filelist){
        fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.html(title, list, `<form action="/update_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <p>
              <input type="text" name="title" placeholder="title" value="${title}">
          </p>
          <p>
              <textarea name="description" placeholder="description">${description}</textarea>
          </p>
          <p>
              <input type="submit">
          </p>
      </form>
      `, `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`); //hidden의 id로 value값 전송
          response.writeHead(200);
          response.end(html);  
        });
      });
    }else if(pathname === '/update_process'){
      var body = '';
      request.on('data', function(data){//data 인자로 수신한 정보 주기.
        body = body + data; //콜백이 실행될 때마다 데이터 추가. 데이터가 많을 때 사용
      });
      request.on('end', function(){
        var post = qs.parse(body); //여기에 post로 보내진 정보 객체화
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});//파일이 생성되면 실행되는 콜백함수
            response.end('success'); 
          })
        });
      });
    }else if(pathname === '/delete_process'){
      var body = '';
      request.on('data', function(data){//data 인자로 수신한 정보 주기.
        body = body + data; //콜백이 실행될 때마다 데이터 추가. 데이터가 많을 때 사용
      });
      request.on('end', function(){
        var post = qs.parse(body); //여기에 post로 보내진 정보 객체화
        var id = post.id;
        fs.unlink(`data/${id}`, function(error){//삭제 펑션 언링크.
          response.writeHead(302, {Location: `/`});//파일이 생성되면 실행되는 콜백함수
          response.end();
        })
      });
    }else{
      response.writeHead(404);
      response.end('Not found');  
    }
    //console.log(__dirname+url);
    //response.end('kys :' + url);
    //response.end(fs.readFileSync(__dirname + _url));
    
});
app.listen(3000);