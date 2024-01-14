const config = require('../config.js')

var message = {
	toast(title, type = 'text') {
		if (title.length > 15) {
			console.error('toast长度超过15个字符,当前长度为' + title.length)
			return
		}
		var icon = 'none'
		if (type) {
			switch (type) {
				case 'text':
					icon = 'none'
					break
				case 'suc':
					icon = 'success'
					break
				case 'err':
					icon = 'error'
					break
			}
		}
		uni.showToast({
			title,
			icon
		})
	},
	confirm(title, confirmColor) {
		return new Promise((res, rej) => {
			uni.showModal({
				title,
				cancelColor: '#b6b6b6',
				confirmColor: confirmColor || config.modalColor,
				success: (result) => {
					if (result.cancel) {
						rej(result)
					} else if (result.confirm) {
						res(result)
					}
				}

			})
		})
	},
	async message(content, confrimText) {
		return new Promise((res) => {
			uni.showModal({
				title: '提示',
				content,
				showCancel: false,
				confirmColor: config.modalColor,
				success: (result) => {
					res(result)
				}
			})
		})
	}
}
module.exports = message

// 示例调用   this.message.toast('回答已删除')