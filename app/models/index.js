const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:pass@postgres:5432/db');

const db = {};
sequelize.authenticate().then(function(errors) { console.log(errors) });


db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;