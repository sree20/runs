var express = require('express'); // require express package
var app = express(); // create application variable

app.get('/',function(request,response){
  response.send('hi hello world');
});

app.listen(3000,function(){  //start app listening on port 3000
  console.log('example app listening on port 3000!');
});
