<template>
	<view class="container">
		<view class="header">
			<view class="arer">
				<view>正确率</view>
				<view style="color: #5181ec;font-size: 50rpx;font-weight: bold;">{{info.answerRate}}</view>
				<view class="list">
					<view class="list-item">
						<view class="list-title"><text
								style="font-size: 48rpx;font-weight: bold;">{{info.rightNum}}</text> 题</view>
						<view class="list-text">答对</view>
					</view>
					<view class="list-item">
						<view class="list-title"><text
								style="font-size: 48rpx;font-weight: bold;">{{info.errNum}}</text>题</view>
						<view class="list-text">答错</view>
					</view>
					<view class="list-item">
						<view class="list-title"><text
								style="font-size: 48rpx;font-weight: bold;">{{info.total}}</text>题</view>
						<view class="list-text">总题数</view>
					</view>
				</view>
			</view>
			<view class="btn">
				<!-- <button class="btn-item waring">清空答题记录</button> -->
				<button class="btn-item success" @click="jumpPage">继续练习</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
  onLoad() {
    let info = uni.getStorageSync('exerciseResult')
    this.info = info
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    jumpPage() {
      uni.navigateBack(-1)
    }
  }
}
</script>

<style lang="scss">
	.container {
		background: #fff;
		height: 100vh;

		.header {
			padding: 0 50rpx;
			height: 500rpx;
			// width: 100vw;
			border-bottom-right-radius: 50rpx;
			border-bottom-left-radius: 50rpx;
			background: #538af7;
		}

		.arer {
			padding-top: 40rpx;
			display: flex;
			flex-direction: column;
			// justify-content: center;
			border-radius: 20rpx;
			align-content: center;
			align-items: center;
			height: 500rpx;
			background: #fff;
		}

		.list {
			display: flex;
			flex-direction: row;
			margin-top: 50rpx;

			.list-item {
				margin: 0 50rpx;
			}

			.list-title {
				font-size: 36rpx;
				color: #000
			}

			.list-text {
				font-size: 28rpx;
				color: #a1a1a1
			}
		}

		.btn {
			display: flex;
			flex-direction: row;

			.btn-item {
				width: 300rpx;
				border-radius: 50rpx;


			}

			.waring {
				background-color: #fdebea;
				color: #f44b48
			}

			.success {
				background-color: #4675f7;
				color: #fff;
			}

		}
	}
</style>
