const {
  resolve,
  getDirectorys,
  getFiles,
  base64_encode,
  mdToHtml,
  strToTimeStamp,
  attrSort
} = require('../server/common')

const CATALOG_ONE = 'view'
const ARTICLE_SUFFIX = '.md'
const COVER_SUFFIX = '.jpg'
const TIME__SUFFIX = ' 00:00:00:000'

const articles = [] // article list
const types = [] // article type

const run = main => {
  articles.length = 0 // clear
  types.length = 0 // clear
  types.push(...getDirectorys(resolve(CATALOG_ONE)).// update article type
  map(directory => directory.split('/').slice(-1)[0]))

  const scrap = types.reduce((pre, current) => [
    ...pre,
    {
      type: current.split('/').slice(-1)[0],
      folder: getDirectorys(resolve(CATALOG_ONE, current)),
    }], [])

  for (let {type, folder} of scrap) {
    folder.forEach(article => {
      const files = getFiles(resolve(CATALOG_ONE, type, article))
      const mdFile = files.find(file => file.includes(ARTICLE_SUFFIX))
      const coverFile = files.find(file => file.includes(COVER_SUFFIX))
      console.log(strToTimeStamp(
        mdFile.split('/').slice(-1)[0].replace(ARTICLE_SUFFIX, '')))
      articles.push({ // update article list
        type,
        title: article.split('/').slice(-1)[0],
        time: strToTimeStamp(mdFile.split('/').slice(-1)[0].replace(ARTICLE_SUFFIX, '')),
        content: mdToHtml(resolve(CATALOG_ONE, type, article, mdFile)),
        cover: base64_encode(resolve(CATALOG_ONE, type, article, coverFile)),
      })
    })
  }
  return main && main()
}

module.exports = {
  articles:attrSort(articles,'time',1),
  types:types.sort(),
  main: run,
}