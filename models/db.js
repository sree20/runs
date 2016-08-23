var Sequelize = require('sequelize');

var DB_URL = process.env.DATABASE_URL || 'postgres://postgres:Shaine277@localhost:5432/runs'; //use either environment variable or static url

var db = new Sequelize(DB_URL); //create the connection.  Will not run multiple times, due to require cacheing the file

module.exports = db;
