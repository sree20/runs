var express = require('express');
var controller = express.Router();

var  runs = require('../models/runs.js')

controller.get('/',function(req,res){
  res.json(runs);
//  console.log(req.query);
//  console.log(req.query['foo']);
//  res.send("inside run controller");
});
controller.get('/:id',function(req,res){

console.log("start runs");

for(var i=0 ; i< runs.length ;i++){
  var vr = runs[i];
  console.log(vr);
  if(vr.id == req.params.id){
    res.json(vr);
  }
}
    //res.send("inside run controller" + req.params.id);
});

controller.post('/',function(req,res){
  runs.create(req.body).then(function(createdRun){
    res.json(createdRun);
  });
  //runs.push(req.body);
//  console.log(req.body);
//  res.json(runs);
});

controller.delete('/:id',function(req,res){
  runs.splice(req.params.id,1);
  res.json(runs);
});
controller.put('/:id',function(req,res){
  runs[req.params.id] = req.body;
  res.json(runs);
});
module.exports = controller;
