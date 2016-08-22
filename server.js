var express = require('express'); // require express package
var app = express(); // create application variable

var fakeArray = require('./models/fakearray.js');
console.log(fakeArray);
app.get('/',function(request,response){
//  response.send('hi hello world!!!');
response.render('index.ejs',{dataArray:fakeArray});
});

app.listen(3000,function(){  //start app listening on port 3000
  console.log('example app listening on port 3000!');
});
