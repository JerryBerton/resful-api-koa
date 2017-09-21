const models = require('../schema')
const sequelize = require('./sequelize.js')
const colors = require('colors/safe')
const hasha = require('hasha')
const config = require('../config.js')
const Pass_key = config.base.Pass_key
sequelize.addHook('beforeBulkSync', function () {
  console.log(colors.green('同步数据模型到数据中....'))
})
sequelize.sync({ 
  force: true,
  hooks: true
}).then(function(){
  console.log(colors.green('数据表初始化完成'))
  models.user.create({
    name: 'admin',
    password: hasha(Pass_key + '-admin', {
      algorithm: 'sha256'
    })
  }).then(function() {
    console.log(colors.green('默认用户名密码初始化完成'))
    console.log(colors.inverse('进程结束'))
    process.exit()
  });
 
}).catch(function (error) {
    console.log('create model table is error', error)
});