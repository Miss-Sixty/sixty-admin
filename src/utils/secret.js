import CryptoJS from 'crypto-js'

//解密方法
function decrypt(data) {
  try {
    return JSON.parse(CryptoJS.AES.decrypt(data, 'fksdjf123').toString(CryptoJS.enc.Utf8))
  } catch (err) {
    return ''
  }
}

//加密方法
function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'fksdjf123').toString()
}

export { decrypt, encrypt }
