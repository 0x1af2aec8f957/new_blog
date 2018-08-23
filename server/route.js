// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {execSync} = require('child_process')
const {
  getCommonRecord,
  resolve,
  getDirectorys,
  base64_encode,
  mdToHtml,
} = require('./common')
const {PROCESS_DIR} = require('./constant')
const db = require('../db')

db.main()

const router = new Router()

const SORT_KEY = 'time'

router.get('/', async (ctx, next) => {
  // ctx.router available
  await ctx.render('home', getCommonRecord(ctx))
}).get('/article', async (ctx, next) => {
  const {type = '', keyword = ''} = ctx.query
  const {articles, types} = db
  const articleFilters = articles.filter(
    article => article.type.includes(keyword) ||
      article.title.includes(keyword) ||
      article.content.includes(keyword))

  await ctx.render('article', {
    ...getCommonRecord(ctx),
    type,
    types: types.sort(),
    keyword,
    articles: articleFilters.sort((o, n) => { // articles sort[time]
      return o[SORT_KEY] < n[SORT_KEY] ? 1 : o[SORT_KEY] > n[SORT_KEY] ? -1 : 0
    }),
  })
}).get('/article/:type/:name', async ctx => {
  const {articles} = db
  const {name: title, type} = ctx.params
  const {content} = articles.find(ac => ac.title === title && ac.type === type)
  const commonRecord = getCommonRecord(ctx)

  await ctx.render('content', {
    ...commonRecord,
    title,
    content,
    type,
    keywords: [...commonRecord.keywords, type, title],
    description: type + title,
    caption: title,
  })
}).get('/donate', async ctx => {
  await ctx.render('donate', getCommonRecord(ctx))
}).get('/about', async ctx => {
  await ctx.render('about', getCommonRecord(ctx))
}).post('/pushCode', ctx => {
  const stdout = execSync(`./git_pull.sh ${PROCESS_DIR}`/*,{cwd:PROCESS_DIR}*/)
  db.main()
  ctx.body = stdout
})

module.exports = router