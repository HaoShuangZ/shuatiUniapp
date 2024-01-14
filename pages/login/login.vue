<template>
	<view class="container">
		<view class="head">
			<view v-if="loginType === 4" class="img-head">
				<text style="font-size: 24px;font-weight: 600;">重置密码</text>
			</view>
			<view v-else class="img-head">
				<image class="avatar-img" src="../../static/my/logo.png" alt="" />
			</view>

			<view style="font-size: 14px;margin: 20px 0 40px 0;">快乐学习，轻松上岸</view>
			<view style="disply:flex;justify-content: center;">
				<view v-if="loginType === 1" class="uni-padding-wrap uni-common-mt">
					<!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">唤起授权手机号</button> -->
					<!-- 	<button type="primary" width="100%" open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber"
						class="btn-empower">手机号快捷登陆</button> -->
					<button v-if="!isChecked" type="primary" width="100%" @click="getPhoneNumber"
						class="btn-empower">手机号快捷登陆</button>
					<button v-else type="primary" width="100%" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"
						class="btn-empower">手机号快捷登陆</button>
				</view>
				<uni-forms ref="form" :border="false" :rules="rules" :model="formData" label-position="left"
					style="padding: 0 10px;">
					<uni-forms-item v-if="loginType === 2" name="phone">
						<uni-easyinput class="login-input" trim="all" maxlength="11" type="number" v-model="formData.phone"
							placeholder="请输入手机号">
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item v-if="loginType === 2 || loginType === 3" class="login-code" name="code">
						<view style="display: flex!important;">
							<view style="width:calc(100vw - 90px)">
								<uni-easyinput :styles="styles" maxlength="6" type="number" v-model="formData.code"
									placeholder="请输入验证码">
								</uni-easyinput>
							</view>
							<view :class="[disabledCode==true?'code_text_tap':'code_text']" @click="onSendCode"
								:disabled="disabledCode">{{codeText}}</view>
						</view>
					</uni-forms-item>
					<uni-forms-item v-if="loginType === 3 || loginType === 4" trim="all" name="password">
						<uni-easyinput class="login-input" type="password" v-model="formData.password" placeholder="请输入密码">
						</uni-easyinput>
					</uni-forms-item>
					<uni-forms-item v-if="loginType === 4" trim="all" name="repassword">
						<uni-easyinput class="login-input" type="password" v-model="formData.repassword" placeholder="请再次输入新密码">
						</uni-easyinput>
					</uni-forms-item>
					<!-- <view class="botton-text" v-if="loginType !== 1" style="padding:0 10px">
						<view>
							<text class="text1">没有账号,&nbsp;</text>
							<text class="text2" @click="region">{{buttonText}}</text>
						</view>
						<view>
							<text class="text3" @click="forget">忘记密码?</text>
						</view>
					</view> -->
					<view style="margin-top: 20px;">
						<uni-forms-item v-if="loginType !== 1">
							<button class="button login-btn" type="primary" @click="formSubmit">
								{{loginType === 3?'注册':'登陆'}}
							</button>
						</uni-forms-item>
					</view>
					<view class="uni-padding-wrap">
						<label class="radio" style="display: flex;margin-top: 5px;">
							<radio-group @change="checkedRadio">
								<radio value="isChecked" :checked="isChecked" style="transform:scale(0.7);color:#4674f6" />
							</radio-group>

							<view>
								<text>若手机号未注册将进入注册流程，注册即视为同意</text>
								<text style="color:#4674f6" @click="goText('server')">《服务条款》</text>和
								<text style="color: #4674f6;" @click="goText('privacy')">《隐私策略》</text>
							</view>
						</label>
					</view>

					<view style="display: flex;justify-content: center;">
						<view class="other-login">
							<view class="other-text">
								<view class="text" style="font-size: 12px;color: #cbcbcb;">其他登陆方式</view>
							</view>
							<view class="icon-type" style="justify-content: center;">
								<view @click="loginIconClick" class="icon-text" v-if="loginType !== 1">
									<!-- #ifndef MP-WEIXIN -->
									<image class="login-type" src="../../static/login/weixin.png" alt="" />
									<text>微信</text>
									<!-- #endif -->
									<!-- #ifdef MP-WEIXIN-->
									<uni-icons type="paperplane-filled" size="30"></uni-icons>
									<text>手机号一键登录</text>
									<!-- #endif -->
								</view>
								<view @click="loginPhoneClick" class="icon-text" v-if="loginType === 1">
									<image class="login-type" src="../../static/login/phone.png" alt="" />
									<text>手机</text>
								</view>
							</view>
						</view>
					</view>

				</uni-forms>

				<!-- 	<view class="other-login" style="display: flex;justify-content: center;">
					<view style="display: flex;justify-content: center;">
						<view class="other-login">
							<view class="other-text">
								<view class="text" style="font-size: 12px;color: #cbcbcb;">其他登陆方式</view>
							</view>
							
							<view class="icon-type" style="justify-content: center;">
								<view @click="loginPhoneClick" class="icon-text">
									<image class="login-type" src="../../static/login/phone.png" alt="">
									<text>手机</text>
								</view>
								<view @click="loginIconClick" class="icon-text">
									<image class="login-type" src="../../static/login/weixin.png" alt="">
									<text>微信</text>
								</view>
							</view>
						</view>
					</view>
				</view> -->
			</view>
		</view>
		<view style="padding:0 20px">

		</view>
	</view>
</template>

<script>
import * as util from '@/utils/util.js'
import wechat from '@/utils/wechat.js'
// import {request} from '@/utils/http.js'
let that = this
export default {
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {}
      return true
    };
    let validatePass2 = (rule, value, data, callback) => {
      if (value === '') {
        callback('请再次输入密码');
      } else if (value !== this.formData.password) {
        callback('两次输入密码不一致!');
        this.$refs.form.validateField('password');
      }
    };

    return {
      isChecked: false,
      userPhone: '158*****8022',
      loginType: 1, // 1默认登陆  2 手机号登陆 3 找回密码 4重置密码
      buttonText: '立即注册',
      disabledCode: false,
      codeText: '获取验证码',
      styles: {
        width: '70%!important',
      },
      formData: {
        phone: '',
        code: '',
        password: "",
        repassword: ""
      },
      rules: {
        // 对name字段进行必填验证
        phone: {
          rules: [{
            required: true,
            errorMessage: '手机号必填',
          },
          {
            validateFunction: function(rule, value, data, callback) {
              if (value.length < 11) {
                callback('请输入11位手机号')
              } else if (!util.checkPhoneNumber(value)) {
                callback('手机号格式不正确')
              }
              return true
            }
          }
          ]
        },
        // 对email字段进行必填验证
        password: {
          rules: [{
            required: true,
            errorMessage: '请输入密码',
          }, {
            trigger: 'blur',
            validateFunction: function(rule, value, callback) {
              if (value === '') {
                callback(new Error('请输入密码'));
              }
            }
          }]
        },
        repassword: {
          rules: [{
            required: true,
            errorMessage: '确认密码不能为空'
          }, {
            trigger: 'blur',
            validateFunction: validatePass2
          }]
        },
        code: {
          rules: [{
            require: true,
            errorMessage: '验证码不能为空'
          }, {
            validateFunction: function(rule, value, data, callback) {
              if (value.length < 4) {
                callback('验证码为四位数字')
              }
            }
          }]
        },

      }
    };
  },
  onReady() {
    // 需要在onReady中设置规则
    // this.$refs.form.setRules(this.rules)
    // #ifndef MP-WEIXIN
    this.loginType = 2
    // #endif 
  },
  onLoad() {
    // #ifdef MP-WEIXIN
    let params = {
      callBack: res => {
        console.log('回调函数', res)
        wechat.wxLogin(params)
      }
    }
    util.getNavBarHieht()
    // wechat.wxLogin(params)
    // #endif
  },
  mounted() {

  },
  methods: {
    getPhoneNumber(e) {
      if (!this.isChecked) {
        uni.showToast({
          title: '需同意服务条款',
          icon: 'error'
        })
        return

      } else {
        console.log(e.detail, 'eeeeee') // 参数encryptedData
        wechat.getUserPhone(e.detail)
      }

    },
    // getPhoneNumber(e){
    //   console.log('eeee',e.detail.code)
    // },
    bindGetUserInfo(e) {
      console.log(e, '获取用户信息')
      // if(this.isChecked){
      //   wx.showModal({
      //     title: '温馨提示',
      //     content: '亲，授权微信登录后才能正常使用小程序功能',
      //     success(res) {
      //       uni.getUserProfile({
      //         desc: '获取个人信息',
      //         success: (res) => {
      //           console.log(res,'--------')
      //           wechat.getUserPhone(res)
      //         },
      //         fail: (err) => {
      //           console.log('err',err)
      //         }
      //       })
      //     }
      //   })

      // }

    },
    loginPhoneClick() {
      this.loginType = 2
    },
    loginIconClick() {
      this.loginType = 1
    },
    checkedRadio() {
      console.log('this.isChecked', this.isChecked);
      this.isChecked = !this.isChecked
    },
    formSubmit(form) {
      this.$refs.form.validate().then(res => {
        console.log('表单数据信息：', res);
        let opt = {
          params: {
            phone: res.phone,
            code: res.code,
          },
          callBack: res => {
            uni.setStorageSync('token', res.token)
            uni.setStorageSync('userInfo', res)
            uni.showToast({
              title: '登陆成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/my/my'
              })
            }, 1000)
          }
        }
        this.$http('phoneCodeLogin', opt)
      }).catch(err => {
        console.log('表单错误信息：', err);
      })
    },
    formReset() {

    },
    onSendCode() {
      this.$refs.form.validateField('phone').then(res => {
        console.log(res, '手机号校验')
        let that = this
        let time = 60
        that.getPhoneCode()
        let timer = setInterval(function() {
          this.disabledCode = true
          if (time === 0) {
            that.disabledCode = false
            clearInterval(timer)
            that.codeText = '发送验证码'
            time = 60
          } else {
            that.codeText = `${time}秒后重发`
            time--
          }
        }, 1000)
      }).catch((err) => {
        console.log('手机号必填', err)
      })
    },
    getPhoneCode() {
      let opt = {
        params: {
          phone: this.formData.phone
        },
        callBack: (res) => {
          console.log(res, 'getPhoneCode')
          uni.showToast({
            title: '验证码发送成功'
          })

        }
      }
      this.$http('getPhoneCode', opt)
    },
    region() {
      console.log('this.buttonText', this.buttonText)
      this.loginType = this.loginType === 2 ? 3 : 2
      this.buttonText = this.loginType === 2 ? '立即注册' : '返回登陆'
      console.log('立即注册')
    },
    forget() {
      this.loginType = 4
      this.buttonText = '返回登陆'
      console.log('忘记密码')
    },
    goText(type) {
      console.log('type ---', type);
      let url = type == 'server' ? './server' : './text/privacy'
      console.log(url);
      uni.navigateTo({
        url: './server'
      });
    }
  }
}
</script>

<style lang="scss">
	.container {
		background-color: #ffffff;
		height: 100vh;

		.head {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			align-items: center;
		}

		.img-head {
			margin-top: 80px;

			.avatar-img {
				width: 64px;
				height: 64px;
			}
		}

		.btn-empower {
			width: 90vw;
			border-radius: 20px;
			background-color: #4674f6;
		}

		.radio {
			font-size: 12px;
		}

		.other-login {
			margin-top: 50px;

			.other-text {
				position: relative;
				text-align: center;
				width: 20vh;

				.text {
					line-height: 20px;
				}

				.text:after,
				.text:before {
					position: absolute;
					top: 50%;
					background: #ebebeb;
					content: "";
					height: 1px;
					width: 28%;
				}

				/*调整背景横线的左右距离*/
				.text:before {
					left: 0;
				}

				.text:after {
					right: 0;
				}

				.line {
					width: 10vh;
					border-bottom: 1px solid #eaeaea;
				}
			}


			.icon-type {
				margin-top: 10px;
				display: flex;

				.icon-text {
					display: inherit;
					flex-wrap: wrap;
					flex-direction: column;
					text-align: center;
					margin: 0 20px;

					text {
						font-size: 14px;
						margin-top: 5px;
						color: #cccccc;
					}

					.login-type {
						width: 32px;
						height: 32px;
					}
				}
			}
		}

		::v-deep .is-input-border {
			border: none;
			border-bottom: 1px solid red;
			border-radius: 0;
		}

		.login-btn {
			border-radius: 25px;
			width: 90vw;
			background-color: #4674f6 !important;
		}

		.login-input-num {
			width: 80vw !important;
		}

		.code_text {
			display: block;
			float: right;
			width: 85px;
			font-size: 14px;
			line-height: 35px;
			border-bottom: 1px solid #e5e5e5;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 500;
			color: #1a69f6;
			background: rgba(255, 255, 255, 1);
		}

		.code_text_tap {
			display: block;
			float: right;
			width: 70px;
			font-size: 14px;
			line-height: 35px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 500;
			color: #1a69f6;
			background: rgba(255, 255, 255, 1);
			pointer-events: none;
		}

		.botton-text {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			// padding: 0 10px;

			.text2,
			.text3 {
				color: #5885f7;
				font-weight: 500
			}
		}

	}
</style>