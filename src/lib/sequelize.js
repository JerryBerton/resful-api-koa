let Sequelize = require('sequelize')
let cfgs = require('../config.js')
let db = cfgs.db
module.exports = new Sequelize(db.database, db.username, db.password, db);