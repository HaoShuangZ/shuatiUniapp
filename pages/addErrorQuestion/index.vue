<!-- 试题报错 -->
<template>
	<div class="container">
		<uni-forms ref="formRef" v-model="formData" label-width="100" label-position="top" :rules="rules">
			<uni-forms-item label="错误类型(可多选)" name="type" required>
				<div class="button-group">
					<button v-if="feedType=='errAnswerFeed'" :class="{'isChecked':item.isCheck?true:false}"
						type="default" v-for="(item,index) in errTypeArr" :key="index"
						@click="errTypeChange(item,index)" class="err-type-button">{{item.value}}</button>
					<button v-if="feedType=='feedBack'" :class="{'isChecked':item.isCheck?true:false}" type="default"
						v-for="(item,index) in feedBackArr" :key="index" @click="errTypeChange(item,index)"
						class="err-type-button">{{item.value}}</button>
					<div class="err-type-button" style="padding-left: 8px;"></div>
				</div>

			</uni-forms-item>
			<uni-forms-item label="具体内容" name="feedbackContent" required>
				<uni-easyinput type="textarea" v-model="formData.feedbackContent"
					placeholder="欢迎您指出具体错误所在，并提供对应的正确描述。您的耐心指点，是我们前进的动力" />
			</uni-forms-item>
			<uni-forms-item label="上传照片">
				<view class="example-body">
					<uni-file-picker limit="3" title="最多选择4张图片" file-mediatype="image" mode="grid" :limit="3"
						@success="successFreePhoto" @fail="fail" @select="selectFreePhoto"></uni-file-picker>
					<!-- <uni-file-picker limit="4" title="最多选择4张图片"></uni-file-picker> -->
				</view>
			</uni-forms-item>
			<uni-forms-item label="联系方式">
				<uni-easyinput type="text" v-model="formData.contact" placeholder="请输入您的qq号或者手机号,方便我们联系您" />
			</uni-forms-item>
		</uni-forms>
		<button class="submit-btn" type="primary" @click="submit('valiForm')">提交</button>
	</div>
</template>

<script>
import {
  pathToBase64,
  base64ToPath
} from 'image-tools'
import {
  baseUrl
} from '@/utils/config'
export default {

  onLoad(val) {
    console.log('onLoad', val, val.feedType);
    this.feedType = val.feedType
  },
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // this.$refs.formData.resetField()

  },
  data() {
    return {
      feedType: '',
      formData: {
        type: '',
        feedbackContent: '',
        questionId: '',
        userId: '',
        notesId: '',
        categoryId: '',
        contact: '', //联系方式
      },
      errTypeArr: [{
        isCheck: false,
        value: '答案有问题',
      }, {
        isCheck: false,
        value: '答案与解析不相符',
      }, {
        isCheck: false,
        value: '有错别字',
      }, {
        isCheck: false,
        value: '选项有问题',
      }, {
        isCheck: false,
        value: '其他',
      }],
      feedBack: [{
        isCheck: false,
        value: '答案有问题',
      }, {
        isCheck: false,
        value: '答案与解析不相符',
      }],
      feedBackArr: [{
        isCheck: false,
        value: '功能建议',
      }, {
        isCheck: false,
        value: '其他建议',
      }],
      // 校验规则
      rules: {
        type: {
          rules: [{
            required: true,
            errorMessage: '请选择错误类型'
          },
            // {
            //        validateFunction: function(rule, value, data, callback) {
            //          console.log(rule, value, data, callback, '1111');
            //          callback('请至少勾选两个兴趣爱好')
            //          return true
            //        }
            //      },
          ]
        },
        feedbackContent: {
          rules: [{
            required: true,
            errorMessage: '具体内容不能为空'
          }]
        }
      },

    }
  },
  methods: {
    selectFreePhoto(val) {
      val.tempFilePaths.map(item => {
        this.imgToBase64(item)
      })

    },
    //图片转base64
    imgToBase64(fileUrl) {
      pathToBase64(fileUrl)
        .then(base64 => {
          let fileStream = this.base64toFile(base64)
          this.uploadFileImg(fileStream)
        })
        .catch(error => {
          console.error(error)
        })
    },
    selectMoneyPhoto(val) {
      val.tempFilePaths.map(item => {
        this.imgToBase64(item, 'moneyPhoto')
      })
    },
    // 图片上传
    uploadFileImg(file) {
      uni.uploadFile({
        url: baseUrl + '/customer/common/oss/upload',
        header: {
          "Ac-Token": uni.getStorageSync('token') || '',
        },
        file: file,
        name: 'file',
        success: (uploadFileRes) => {
          console.log(uploadFileRes, '图片上传成功')
        },
        fail: (err) => {
          console.log('图片上传失败', err)
        }
      })
    },
    // bse64转文件流
    base64toFile(dataurl, filename = 'file') {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let suffix = mime.split('/')[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `${filename}.${suffix}`, {
        type: mime
      })
    },
    errTypeChange(item, index) {
      let data = ''
      if (this.feedType == 'feedBack') {
        console.log(this.feedBackArr, index, item);
        this.feedBackArr[index]['isCheck'] = !item.isCheck
        this.feedBackArr.map(it => {
          if (it.isCheck) {
            if (data) {
              data += ',' + it.value
            } else {
              data += it.value
            }
          }
        })
      } else {
        this.errTypeArr[index]['isCheck'] = !item.isCheck
        this.errTypeArr.map(it => {
          if (it.isCheck) {
            if (data) {
              data += ',' + it.value
            } else {
              data += it.value
            }
          }
        })
      }
      this.formData.type = data
    },
    submit(val) {
      console.log(this.formData);
      this.$refs['formRef'].validate((err, formData) => {
        if (!err) {
          this.addFeedBackSubmit()
        }
      })
    },
    addFeedBackSubmit() {
      let questionInfo = uni.getStorageSync('errQuestionDetail')
      let userInfo = uni.getStorageSync('userInfo')

      let opt = {
        params: {
          categoryId: questionInfo.categoryId, //当前题目的categoryId  只有错题反馈有
          questionId: questionInfo.questionId, //当前题目的questionId  只有错题反馈有
          question: questionInfo,
          feedbackContent: this.formData.feedbackContent,
          type: this.formData.type,
          useFlag: this.feedType === 'errAnswerFeed' ? 0 : 1, // 错题反馈 false  用户反馈 true
          userId: userInfo.userId,
        },
        callBack: (res) => {
          console.log('res', res);
          if (res) {
            uni.showToast({
              title: '反馈成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(() => {
              uni.navigateBack(-1)
            }, 2000)
          }
        }
      }
      if (this.feedType == 'feedBack') {
        delete opt.params.question
      }
      this.$http('feedBackInfo', opt)
    }
  }
}
</script>

<style lang="scss">
	.container {
		margin: 0 20rpx;

		.button-group {
			display: flex;
			// justify-content: flex-start;
			align-content: flex-start;
			flex-wrap: wrap;

			.err-type-button {
				font-size: 16px;
				font-family: PingFang SC-Semibold, PingFang SC;
				font-weight: 600;
				color: #000000;
				width: 340rpx;
				margin-bottom: 10rpx;
				display: inline-block;
			}

			.uni-forms-item {
				// padding: 0 20px;
			}
		}

		.submit-btn {
			color: #fff;
			background: #4674F6;
			border-radius: 50rpx;
		}

		.isChecked {
			border-color: #4674F6 !important;
			color: #4674F6 !important;
			background-color: #fff !important;
		}

	}
</style>
