//http.js
// demo 调用
// async getAnswer() {
//   const res = await this.http.get('/applet/answerList', {
//     qId: this.question.id,
//   })
//   if (res.code === 200) {
//     return res.data
//   } else {
//     this.message.toast('请求失败')
//     return false
//   }
// }

const config = require('../config.js')
const message = require('../components/message.js')
var http = {
	post(path, params, contentType = 'form', otherUrl, ) {
		return new Promise((resolve, reject) => {
			var url = (otherUrl || config.baseUrl) + path
			if (!checkUrl(url)) {
				rej('请求失败')
			}
			uni.request({
				method: 'POST',
				url,
				header: {
					"Content-Type": contentType === 'json' ? "application/json" :
						"application/x-www-form-urlencoded"
				},
				data: params,
				success: (res) => {
					console.log('request:POST请求' + config.baseUrl + path + ' 成功', res.data)
					resolve(res.data)
				},
				fail: (err) => {
					message.toast('请求失败', 'err')
					console.error('request:请求' + config.baseUrl + path + ' 失败', err)
					reject('请求失败')
				}
			})
		})
	},
	put(path, params, contentType = 'form', otherUrl, ) {
		return new Promise((resolve, reject) => {
			var url = (otherUrl || config.baseUrl) + path
			if (!checkUrl(url)) {
				rej('请求失败')
			}
			uni.request({
				method: 'PUT',
				url,
				header: {
					"Content-Type": contentType === 'json' ? "application/json" :
						"application/x-www-form-urlencoded"
				},
				data: params,
				success: (res) => {
					console.log('request:PUT请求' + config.baseUrl + path + ' 成功', res.data)
					resolve(res.data)
				},
				fail: (err) => {
					message.toast('请求失败', 'err')
					console.error('request:PUT请求' + config.baseUrl + path + ' 失败', err)
					reject('请求失败')
				}
			})
		})
	},

	get(path, params, otherUrl) {
		return new Promise((resolve, reject) => {
			var url = (otherUrl || config.baseUrl) + path
			if (!checkUrl(url)) {
				return
			}
			uni.request({
				url,
				data: params,
				success: (res) => {
					console.log('request:GET请求' + config.baseUrl + path + ' 成功', res.data)
					resolve(res.data)
				},
				fail: (err) => {
					message.toast('请求失败', 'err')
					console.error('request:GET请求' + config.baseUrl + path + ' 失败', err)
					reject(err)
				}
			})

		})

	},
	delete(path, params, otherUrl) {
		return new Promise((resolve, reject) => {
			var url = (otherUrl || config.baseUrl) + path
			if (!checkUrl(url)) {
				return
			}
			uni.request({
				url,
				data: params,
				method: "DELETE",
				success: (res) => {
					console.log('request:DELETE请求' + config.baseUrl + path + ' 成功', res.data)
					resolve(res.data)
				},
				fail: (err) => {
					message.toast('请求失败', 'err')
					console.error('request:DELETE请求' + config.baseUrl + path + ' 失败', err)
					reject(err)
				}
			})

		})

	},

	async upload(path, fileArray, otherUrl) {

		if (typeof fileArray !== 'object') {
			console.error('request:参数错误,请传入文件数组')
			return
		}
		var url = (otherUrl || config.baseUrl) + path
		if (!checkUrl(url)) {
			return
		}
		var arr = []
		for (let i in fileArray) {
			const res = await uni.uploadFile({
				url: otherUrl || config.baseUrl + path,
				filePath: fileArray[i],
				name: 'file'
			})
			console.log(res)
			if (res[0]) {
				console.error('request:上传失败', res[0])
				return
			}
			arr.push(JSON.parse(res[1].data).data)
		}
		return arr
	},

}

function checkUrl(url) {
	var urlReg = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;
	if (!urlReg.test(url)) {
		console.error('request:请求路径错误' + url)
		return false
	}
	return true
}
module.exports = http
