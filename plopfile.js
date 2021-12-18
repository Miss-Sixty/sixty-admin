module.exports = function(plop) {
  plop.setWelcomeMessage('请选择需要创建的模式：')
  plop.setGenerator('module', require('./plop-templates/module/prompt'))
}
