import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import User from '../models/user.js'
const hasha = require('hasha')
const config = require('../config.js')
const Pass_key = config.base.Pass_key
const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

// 用户登录的时候返回token
// let token = jwt.sign({
//   userInfo: userInfo // 你要保存到token的数据
// }, publicKey, { expiresIn: '7d' })

/**
 * 检查授权是否合法
 */
export let CheckAuth = (ctx) => {
  let token = ctx.request.header.authorization
  try {
    let decoded = jwt.verify(token.substr(7), publicKey)
    if (decoded.userInfo) {
      return {
        status: 1,
        result: decoded.userInfo
      }
    } else {
      return {
        status: 403,
        result: {
          errInfo: '没有授权'
        }
      }
    }
  } catch (err) {
    return {
      status: 503,
      result: {
        errInfo: '解密错误'
      }
    }
  }
}

export let login = async (ctx) => {
  const body = ctx.request.body
  let resp = { code: 400, message: '错误请求' } // 响应结果
  let userInfo = await User.findByName(body.name)
  if (userInfo) {
    if (hasha(`${Pass_key}-${body.password}`, {algorithm: 'sha256'}) === userInfo.password) {
      let token = jwt.sign({ id: userInfo.id }, publicKey, { expiresIn: '7d' })
      resp = { code: 200, token, result: userInfo }
    } else {
      resp = { code: 401, message: '密码错误'}
    }
  } else {
    resp = { code: 400, message: '用户不存在' } 
  }
  ctx.body = resp
}