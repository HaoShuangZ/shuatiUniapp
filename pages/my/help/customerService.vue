<template>
	<view class="customerService">
		<view class="header"></view>
		<view class="content">
			<image class="login-img" src="../../../static/my/logo.png" alt="" />
			<view class="text">刷题通客服</view>
			<view class="text-wechart">微信号:&nbsp;shuatitongvip&nbsp;<text style="color: #4674F6;"
					@click="copyWechat">&nbsp;复制</text></view>
			<view class="box"></view>
		</view>
		<view style="margin: 600rpx 40rpx;">
			<text style="font-size: 24rpx;color:#999999;">说明：产品使用过程中有问题，可以在常见问题中查
				看，如果无法解决，再咨询客服。</text>
		</view>

	</view>

</template>

<script>

</script>

<style scoped lang="scss">
	.customerService {
		.header {
			background-color: #4c7cf6;
			height: 40vh;
		}

		.content {
			display: flex;
			flex-wrap: wrap;
			padding: 100rpx 0 200rpx 0;
			margin: -500rpx 40rpx;
			background-color: #fff;
			border-radius: 30rpx;
			justify-content: center;
			text-align: center;

			.login-img {
				width: 120rpx;
				height: 120rpx;
				margin-top: -150rpx;
				border-radius: 50%;
			}

			.text {
				width: 100%;
				font-size: 40rpx;
				font-weight: bold;
			}

			.text-wechart {
				width: 100%;
				padding: 0 20rpx;
				color: #666666;
				font-size: 26rpx;
			}

			.box {
				border: 1px solid;
				width: 300rpx;
				height: 300rpx;
			}
		}
	}
</style>
