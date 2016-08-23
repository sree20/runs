var express = require('express'); // require express package
var app = express(); // create application variable
var PORT = process.env.PORT || 3000;
var fakeArray = require('./models/fakearray.js');
console.log(fakeArray);
app.use(function(req,res,next){
  console.log('middleware 1');
  next();
});
app.use(function(req,res,next){
  console.log('middleware 2');
  next();
});
app.get('/foo',function(req,res){
  res.send('works');
});
app.get('/',function(request,response){
//  response.send('hi hello world!!!');
response.render('index.ejs',{dataArray:fakeArray});
});

app.listen(PORT,function(){  //start app listening on port 3000
  console.log('example app listening on port 3000!');
});
