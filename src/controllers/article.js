// import Article from '../models/article'
export const list = (ctx) => {
  ctx.body = {
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  }
}