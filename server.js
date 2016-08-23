var express = require('express'); // require express package
var app = express(); // create application variable

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var PORT = process.env.PORT || 3000;
var fakeArray = require('./models/fakearray.js');
console.log(fakeArray);

var runController = require('./controllers/run.js');
app.use('/runs',runController);
app.get('/',function(request,response){
//  response.send('hi hello world!!!');
response.render('index.ejs',{dataArray:fakeArray});
});

app.listen(PORT,function(){  //start app listening on port 3000
  console.log('example app listening on port 3000!');
});
