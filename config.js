const classMap = { // add class
  table: 'table is-bordered is-striped is-narrow is-hoverable is-fullwidth',
  a: 'has-text-link',
}

const SUBSCRIBE_USERS = [ // Subscribe user email
  '"@AB+"<1137938565@qq.com>',
  '"Sweet° 尛亼物"<1072682534@qq.com>',
]

const EmailAuth = {
  user: '603803799@qq.com',
  pass: 'xurzskuzbtwxbfdf',
}

module.exports = {
  SUBSCRIBE_USERS,
  EmailAuth,
  classMap: Object.keys(classMap).map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}>`, 'mg'),
    replace: `<${key} class="${classMap[key]}">`,
  })),
}