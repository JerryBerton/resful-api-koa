// let requireDirectory = require('require-directory')
let fs =  require('fs');
let path = require("path");
let sequelize = require('../lib/sequelize.js')
let model = {}
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    let child = sequelize.import(path.join(__dirname, file));
    model[child.name] = child;
  });
 // 建立关联关系
Object.keys(model).forEach(function(modelName) {
  if (model[modelName].options.hasOwnProperty('associate')) {
    let current = model[modelName];
    let associate = current.options.associate;
    current[associate.type](model[associate.target], associate.options)
  }
});
module.exports = model
