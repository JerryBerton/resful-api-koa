import Category from '../models/category'

export const create = async (ctx) => {
  const body = ctx.request.body
  let resp = { code: 400, message: '无数据请求' }
  let result = await Category.insert(body)
  ctx.body = result
}
export const list = async (ctx) => {
  let resp = { code: 400, message: 'error'}
  try {
    const count = await Category.getCount()
    const data = await Category.getList()
    resp = { code: 200, result: { count, data }}
  } catch (error) {
    resp = { code: 400, message: error}
  }
  ctx.body = resp
}
export const update = async (ctx) => {
  let resp = { code: 400, message: 'error' }
  const params = ctx.params
  const body = ctx.request.body
  try {
    let result = await Category.update(params.id, body)
    resp = { code: 200, result }
  } catch (error) {
    
  }
  ctx.body = resp
}
export const remove = async(ctx) => {
  let resp = { code: 400, message: 'error'}
  const params = ctx.params
  try {
    let result = await Category.delete(params.id)
    resp = { code: 200, result}
  } catch (error) {
    
  }
  ctx.body = resp
}