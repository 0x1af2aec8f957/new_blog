// https://koajs.com/
const Koa = require('koa')
// https://github.com/koajs/compose
const compose = require('koa-compose')
// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser');
const views = require('./views')
const statics = require('./static')
const router = require('./route')

const app = new Koa()

app
.use(views)
.use(compose(statics))
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())

module.exports = app