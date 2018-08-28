// https://github.com/alexmingoia/koa-router
const Router = require('koa-router')
const {execSync} = require('child_process')
const {getCommonRecord} = require('./common')
const {PROCESS_DIR} = require('./constant')
const db = require('../db')
const sendEmail = require('./sendEmail')

db.main()

const router = new Router()

router.get('/', async (ctx, next) => {
  // ctx.router available
  await ctx.render('home', getCommonRecord(ctx))
}).get('/article', async (ctx, next) => {
  const {type = '', keyword = ''} = ctx.query
  const {articles, types} = db
  const articleFilters = articles.filter(
    article => article.type.includes(type) && (
      article.title.includes(keyword) ||
      article.content.includes(keyword)))

  await ctx.render('article', {
    ...getCommonRecord(ctx),
    type,
    types,
    keyword,
    articles: articleFilters,
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
  console.log(ctx.request.body)
  const {head_commit} = ctx.request.body
  const {title} = getCommonRecord(ctx)
  const stdout = execSync(`./git_pull.sh ${PROCESS_DIR}`/*,{cwd:PROCESS_DIR}*/)

  db.main()

  const body = {
    stdout,
    title,
    subject: `${head_commit.committer.name}对站点提交了代码`,
    message: head_commit.message,
    bcc: head_commit.committer.email,
  }

  sendEmail(body)
  ctx.body = body
})

module.exports = router