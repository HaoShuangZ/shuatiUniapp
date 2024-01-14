<template>
	<view class="container-box">

		<view class="notes">
			<view class="notes-img">
				<image src="../../static/notes/notes.png" class="img"></image>
			</view>
			<view class="desc">
				<view class="none"> 该功能暂未开放</view>
				<view class="tips"> 先去看看其他的吧</view>
			</view>
			<!-- <view class="btn" @click="goBack"> 去练习</view> -->
		</view>

	</view>
</template>
<script>
export default {

  data() {
    return {
      isActive: 0,
      list: [{
        id: 11,
        type: '我的错题',
        date: "2023-03-06",
        time: '12:03更新12:03更新',
        num: '1'
      },
      {
        id: 11,
        type: '我的收藏',
        num: '2',
        date: "2023-03-06",
        time: '12:03更新12:03更新',

      }
      ],

    };
  },

  props: ["exerciseList"], //父组件向子组件传值
  mounted() {

  },
  methods: {
    goBack() {
      uni.navigateBack({
        delta: 1
      })
    },
    hrefrouterApp() {
      uni.navigateTo({
        url: '../wrong/wrongQuestion'
      });
    },
  }
}
</script>

<style lang="scss">
	.container-box {
		height: 1539rpx;
		background-color: #fff;
		overflow: hidden;
	}

	.notes {

		.notes-img {
			width: 415.14rpx;
			height: 415.14rpx;
			background-color: red;
			margin: auto;
			margin-top: 182.16rpx;

			.img {
				width: 100%;
				height: 100%;
			}
		}

		.desc {
			display: flex;
			flex-direction: column;
			align-items: center;
			//text-align: center;
			height: 100rpx;
			background-color: #fff;

			.none {
				color: #333333;
				font-weight: 400;
				font-size: 33.96rpx;
			}

			.tips {
				padding-top: 10rpx;
				color: #999999;
				font-size: 28rpx;
			}
		}

		.btn {
			display: flex;
			width: 389.4rpx;
			height: 85.8rpx;
			background: #4674F6;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			padding: 0 30rpx;
			margin: auto;
			color: #fff;
			margin-top: 50.16rpx;
			border-radius: 110.88rpx;
		}
	}
</style>
