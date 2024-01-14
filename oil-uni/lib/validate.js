// validate.js
const validate = {
	userForm:{
		intro:	'@个人简介|require',
		college: '@学校|require!请选择你的学校',
		nickname:'@昵称|require'
	}
}

module.exports = validate

//form.js
// validateForm() {
//   // 表单验证方法
//   const validate = require("./validate")
//   const validator = new this.validator()
//   var result = validator.check(validate.userForm, this.form, false)
//   if (result !== true) {
//     this.message.message(result)
//     return false
//   }
//   return true
// }
