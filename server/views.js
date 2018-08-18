// https://github.com/queckezz/koa-views
const views = require('koa-views')
const {resolve} = require('./common')

module.exports = views(resolve('src', 'components'), { // Loading template engine
  extension: 'ejs',
  debug: true// process.env.NODE_ENV !== 'production',  //是否开启调试模式
})