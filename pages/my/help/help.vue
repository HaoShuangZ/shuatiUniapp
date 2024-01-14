<template>
	<view class="help">
		<view class="help_content">
			<view class="title">
				<view></view>
				常见问题
			</view>
			<view class="help_item">
				语音输入怎么使用？
			</view>
			<view class="help_item">
				头像昵称怎么修改?
			</view>
			<view class="help_item">
				题库如何练习？
			</view>
			<view class="help_item">
				ios设备为何不能充值？
			</view>
		</view>
		<view class="help_btn">
			<button @click="helpBtn">联系客服</button>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {
    helpBtn() {
      uni.navigateTo({
        url: "./customerService"
      });
    }
  }
}
</script>

<style lang="scss">
	.help {
		// background: #fff;
		height: 100%;
		color: #333;
		font-size: 31rpx;
		font-family: PingFang SC-Bold, PingFang SC;
		font-weight: bold;

		.help_content {
			.title {
				padding: 25rpx 30rpx 0rpx 30rpx;
				box-sizing: border-box;

				view {
					display: inline-block;
					width: 4rpx;
					height: 29rpx;
					background: #4674F6;
					border-radius: 0rpx 0rpx 0rpx 0rpx;
					opacity: 1;
					margin-right: 30rpx;
				}
			}

			.help_item {
				border-bottom: 1px solid #ABABAB;
				padding: 0 30rpx;
				box-sizing: border-box;
				height: 108rpx;
				line-height: 108rpx;
			}
		}

		.help_btn {
			height: 187rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top: 1px solid #ABABAB;
			position: fixed;
			left: 0px;
			bottom: 0px;

			button {
				width: 687rpx;
				height: 83rpx;
				background: #4674F6;
				border-radius: 108rpx 108rpx 108rpx 108rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 31rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}
</style>