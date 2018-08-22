// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {
  getCommonRecord,
  resolve,
  getDirectorys,
  base64_encode,
  mdToHtml,
} = require('./common')

const router = new Router()

router.get('/', async ctx => {
  // ctx.router available
  await ctx.render('home', getCommonRecord(ctx))
}).get('/article', async (ctx, next) => {
  const nav = getDirectorys(resolve('view')).
    map(item => item.split('/').slice(-1)[0])
  const {type = nav[0]} = ctx.query
  const articles = getDirectorys(resolve('view', type)).
    map(article => ({
      title: article.split('/').slice(-1)[0],
      cover: base64_encode(resolve(article, 'index.jpg')),
    }))
  await ctx.render('article', {
    ...getCommonRecord(ctx),
    type,
    nav,
    articles,
  })
}).get('/article/:name', async (ctx, next) => {
  const {name: title} = ctx.params
  const {type} = ctx.query
  const content = mdToHtml(resolve('view', type, title, 'index.md'))
  await ctx.render('content', {
    ...getCommonRecord(ctx),
    title,
    content,
    type,
    caption: title,
  })
}).get('/donate', async (ctx, next) => {
  await ctx.render('donate', getCommonRecord(ctx))
}).get('/about', async (ctx, next) => {
  await ctx.render('about', getCommonRecord(ctx))
})

module.exports = router