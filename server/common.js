const path = require('path')
const fs = require('fs')
// https://github.com/showdownjs/showdown
const showdown = require('showdown')

const resolve = (d, ...p) => path.resolve(d, ...p) // Return to absolute path of file
const converter = new showdown.Converter()

const markdownToHtml = markdown => converter.makeHtml(markdown)

const getFiles = dir => { // Get all files
  let results = []
  fs.readdirSync(dir).forEach(file => {
    file = resolve(dir, file)
    const stat = fs.statSync(file)
    stat.isFile()
      ? results.push(file)
      : results.concat(getFiles(file)) // Is directory [...results,...readFiles(file)]
  })
  return results
}

const getDirectorys = dir => { // Get all first level folders
  let results = []
  fs.readdirSync(dir).forEach(filePath => {
    filePath = resolve(dir, filePath)
    const stat = fs.statSync(filePath)
    stat.isDirectory() && results.push(filePath)
  })
  return results
}

const base64_encode = file => new Buffer(fs.readFileSync(file)).toString(
  'base64')

const format = (str, obj) => { // Mustache
  return str.replace(/\{([^\}]+)\}\}/gm, (all, self) => { // ECMAScript v3
    const key = self.match(/[^(\{|\}|\s)]/gm).join('')
    return obj ? obj[key] : eval(key)
  })
}

const mdToHtml = filePath => markdownToHtml(fs.readFileSync(filePath, 'utf-8'))

const getCommonRecord = ({
                           host,
                           originalUrl: path,
                         }, date = new Date()) => ({
  host,
  path,
  author: '权川',
  keywords: [
    '日志',
    '代码',
    '编程',
    '分享',
    '技术',
    '软件',
    '开发',
    '运维',
    '云计算',
    '网络',
    '互联网'],
  title: '权川的个人网站',
  subtitle: '这里记录着我的进取之道，本站发布的所有文章涵盖但不仅限于技术。',
  description: '权川的个人网站',
  date: date.toLocaleString(),
  copyright: `Copyright © ️M - ${date.getFullYear()}`,
})

module.exports = {
  resolve,
  getFiles,
  getDirectorys,
  getCommonRecord,
  format,
  base64_encode,
  mdToHtml,
}