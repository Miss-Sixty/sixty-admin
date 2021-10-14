export function downloadByData(res, fileName, mime) {
  const { data, headers = {} } = res
  if (!data) return
  if (!fileName) {
    const contentDisposition = headers['content-disposition']
    if (contentDisposition) fileName = window.decodeURI(headers['content-disposition'].split('=')[1], 'UTF-8')
  }

  const blob = new Blob([data], { type: mime || headers['content-type'] || 'application/octet-stream' })
  const blobURL = window.URL.createObjectURL(blob) || window.webkitURL.createObjectURL(blob)
  // 创建a标签，用于跳转至下载链接
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
  window.URL.revokeObjectURL(blobURL) // 释放blob URL地址
}

//根据地址下载
export function downloadByUrl({ url, target = '_self', fileName }) {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1
  if (/(iP)/g.test(window.navigator.userAgent)) throw Error('您的浏览器不支持下载！')

  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  window.open(url, target, 'noopener=yes,noreferrer=yes')
}

export function downloadByBase64(buf, filename, mime) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData({ data: base64Buf }, filename, mime)
}

export function downloadByImgUrl(url, filename, mime) {
  urlToBase64(url).then(base64 => {
    downloadByBase64(base64, filename, mime)
  })
}

/**
 * @description: base64 to blob
 */
function dataURLtoBlob(base64Buf) {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url, mineType) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS')
    const ctx = canvas.getContext('2d')

    const img = new Image()
    img.crossOrigin = ''
    img.onload = () => {
      if (!canvas || !ctx) return reject()

      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img, 0, 0)
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      canvas = null
      resolve(dataURL)
    }
    img.src = url
  })
}
