<template>
	<view class="container">
		<uni-section>
			<view class="example">
				<!-- 基础表单校验 -->
				<uni-forms ref="valiForm" :rules="rules" :modelValue="valiFormData">
					<!-- 	<uni-forms-item label="头像" required name="age">
						<uni-easyinput v-model="valiFormData.mobilephone" placeholder="请输入年龄" />
					</uni-forms-item> -->
					<uni-forms-item label="昵称" required name="name">
						<uni-easyinput v-model="valiFormData.nickName" placeholder="请输入用户名" />
					</uni-forms-item>

				</uni-forms>
				<button class="submit" type="primary" @click="submit('valiForm')">提交</button>
			</view>
		</uni-section>
	</view>
</template>

<script>
export default {
  data() {
    return {
      // 校验表单数据
      valiFormData: {
        userId: '',
        nickName: '',
        mobilephone: '',
        headPicture: '',
        password: '123456',
        rePassword: "123456",
      },
      // 校验规则
      rules: {
        nickName: {
          rules: [{
            required: true,
            errorMessage: '姓名不能为空'
          }]
        },
        mobilephone: {
          rules: [{
            required: true,
            errorMessage: '年龄不能为空'
          }, {
            format: 'number',
            errorMessage: '年龄只能输入数字'
          }]
        }
      },

    }
  },

  onLoad() {},
  onReady() {
    // 设置自定义表单校验规则，必须在节点渲染完毕后执行
    // this.$refs.customForm.setRules(this.customRules)
    this.valiFormData.nickName = uni.getStorageSync('userInfo')['nickName']
    this.valiFormData.userId = uni.getStorageSync('userInfo')['userId']
    this.valiFormData.mobilephone = uni.getStorageSync('userInfo')['mobilephone']
    this.valiFormData.headPicture = uni.getStorageSync('userInfo')['headPicture']
  },
  methods: {
    onClickItem(e) {
      console.log(e);
      this.current = e.currentIndex
    },
    submit(ref) {
      this.$refs[ref].validate().then(res => {
        this.submitFormData()
      }).catch(err => {
        console.log('err', err);
      })
    },
    submitFormData() {
      let dOpt = {
        params: {
          ...this.valiFormData
        },
        callBack: (res) => {
          console.log('res', res);
          if (res) {
            uni.removeStorage({
              key: 'userInfo',
              success: () => {}
            })
            // uni.setStorageSync({
            // 	key:userName
            // })
            uni.showToast({
              title: '修改成功',
              icon: 'success',
              success: () => {
                setTimeout(() => {
                  uni.switchTab({
                    url: '/pages/my/my',
                  })
                }, 1500)

              }
            })
          }
        }
      }
      this.$http('modifyUserInfo', dOpt)
    }
  }
}
</script>

<style scoped lang="scss">
	.submit {
		background-color: #4674f6;
	}

	.uni-section {
		height: 100%;
	}

	.example {
		padding: 15px;

		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
	}

	.button {
		display: flex;
		align-items: center;
		height: 35px;
		margin-left: 10px;
	}
</style>