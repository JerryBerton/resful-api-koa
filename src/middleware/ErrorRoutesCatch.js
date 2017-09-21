module.exports = function () {
  return function (ctx, next) {
    return next().catch((err) => {
      switch (err.status) {
        case 401:
          ctx.status = 200
          ctx.body = {
            code: 401,
            message: "token验证失败, 无权限请求",
            result: 'error'
          }
          break
        default:
          throw err
      }
    })
  }
}
