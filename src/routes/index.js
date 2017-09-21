import Router from 'koa-router'
import controllers from '../controllers/index.js'

const router = new Router()

router
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all('/upload', controllers.upload.default)
  .get('/api/category', controllers.category.list)
  .post('/api/category', controllers.category.create)
  .put('/api/category/:id', controllers.category.update)
  .delete('/api/category/:id', controllers.category.remove)
  .post('/auth', controllers.auth.login)

export const entry = router;

export const entryError =  () => {
  return (ctx, next) => {
    switch (ctx.status) {
      case 404:
        ctx.body = '没有找到内容 - 404'
        break
    }
    return next()
  }
}