var Sequelize = require('sequelize');

var db = require('../models/db.js')

var Run = db.define('run',{
  date:Sequelize.DATE,
  distance:Sequelize.FLOAT,
});
db.sync();
module.exports = Run;





//module.exports = [{id:1,distance:0.5,date:new Date('2016-1-1')},
//{id:2,distance:2.5,date:new Date('2016-2-1')},
//{id:3,distance:3.5,date:new Date('2016-3-1')},
//                   ]
