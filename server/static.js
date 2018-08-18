// https://github.com/koajs/static
const serve = require('koa-static')
const {resolve, getDirectorys} = require('./common')

const StaticDirectorys = getDirectorys(resolve('src', 'static'))

module.exports = StaticDirectorys.map(item => serve(item))