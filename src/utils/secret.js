import CryptoJS from 'crypto-js'

//解密方法
function decrypt(data) {
  return JSON.parse(CryptoJS.AES.decrypt(data, 'fksdjf123').toString(CryptoJS.enc.Utf8))
}

//加密方法
function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), 'fksdjf123').toString()
}

export { decrypt, encrypt }
