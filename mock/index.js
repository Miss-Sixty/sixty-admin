const Mock = require('mockjs')

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600',
})

let configArray = []

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('./modules', true, /\.js$/)
files.keys().forEach(key => {
  configArray = configArray.concat(files(key).default)
})

// 注册所有的mock服务
configArray.forEach(item => {
  for (let [path, target] of Object.entries(item)) {
    let protocol = path.split('|')
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], XHR2ExpressReqWrap(target))
  }
})

function XHR2ExpressReqWrap(respond) {
  return function (options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: body,
        query: param2Obj(url),
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

//get请求将url参数提取为obj
function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
