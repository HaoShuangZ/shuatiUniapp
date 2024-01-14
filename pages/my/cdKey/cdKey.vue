<template>
	<view class="cdKey">
		<view class="cdKey_input">
			<vcode-input ref="VcodeInput" :sum="6" :isBorderLine="false" :borderColor="borderColorDefault"
				:borderValueColor="'#4674F6'" :borderActiveColor="borderActiveColor" @vcodeInput="vcodeInput"></vcode-input>
		</view>
		<view class="cdKey_btn">
			<button @click="submit">确定</button>
		</view>
		<view class="cdKey_info">
			<view class="title">
				激活码规则
			</view>
			<view class="text">
				1.仅供本人使用，有效期根据后台配置时间 。
			</view>
			<view class="text">
				2.仅供内部渠道学员使用。
			</view>
		</view>
	</view>
</template>

<script>
import vcodeInput from "@/components/vcode-input/vcode-input.vue"
export default {
  components: {
    vcodeInput
  },
  data() {
    return {
      cdKey: "",
      borderColorDefault: '#f7f7f7',
      borderActiveColor: '#f7f7f7'
    };
  },
  onShow() {
    // #ifndef MP-WEIXIN
    this.borderColorDefault = '#000000'
    this.borderActiveColor = '#000000'
    // #endif 
  },
  methods: {
    vcodeInput(value) {
      console.log(value)
      this.cdKey = value
    },
    submit() {
      if (this.cdKey.length == 6) {
        let opt = {
          params: {
            activeCode: this.cdKey
          },
          callBack: (res) => {
            console.log('激活结果', res)
            uni.showToast({
              title: '激活成功！',
              icon: "success",
              duration: 1500
            })
            setTimeout(() => {
              uni.navigateTo({
                url: '/pages/my/my'
              })
            }, 1500)
          }
        }
        this.$http('vipActive', opt)

      } else {
        uni.showToast({
          title: '激活码错误！',
          icon: "error"
        })
      }
    }
  }
}
</script>

<style lang="less">
	.cdKey {
		padding: 30px;
		box-sizing: border-box;

		.cdKey_input {
			margin: 30rpx 0;
			// border: 1px solid;
		}

		.cdKey_btn {
			button {
				width: 686rpx;
				height: 83rpx;
				background: #4674F6;
				border-radius: 108rpx 108rpx 108rpx 108rpx;
				font-size: 31rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}

		.cdKey_info {
			margin: 60rpx 0;

			.title {
				font-size: 31rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #666666;
				line-height: 36rpx;
				margin-bottom: 10rpx;
			}

			.text {
				font-size: 23rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #666666;
				line-height: 49rpx;
			}
		}
	}

	.vcode-input-item {
		width: 95rpx !important;
		height: 122rpx !important;
		background: #fff !important;
		border-radius: 12rpx 12rpx 12rpx 12rpx !important;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 56rpx;
		color: #4674F6;
		font-weight: bold;
	}
</style>