<template>
	<view class="container">
		<view class="content-item" v-for="(item,index) in collectList" :key="index">
			<view class="text">
				<view class="text-title">{{item.categoryName}}</view>
				<view class="text-num">收藏{{item.num}}道</view>
			</view>
			<view class="btn" @click="jumpPage(item)">练习</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      collectList: []
    }
  },
  onLoad() {
    this.getUsercategoryList()
  },
  methods: {
    jumpPage(item) {

      uni.getStorageSync('currentCategoryId', item.categoryId)
      uni.navigateTo({
        url: `../../answer/index?listType=${12}`
      })
    },
    //用户收藏分类统计
    getUsercategoryList() {
      let opt = {
        callBack: (res) => {
          console.log('用户收藏分类统计', res)
          this.collectList = res
        }
      }
      this.$http('collectStatus', opt)
    },
  },

}
</script>

<style scoped lang="scss">
	.container {
		background-color: #ffffff;

		.content-item {
			display: flex;
			height: 160rpx;
			margin-left: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #ABABAB;
		}

		.text {
			.text-title {
				font-size: 28rpx;
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			.text-num {
				margin-top: 20rpx;
				color: #999999;
				font-size: 24rpx;
			}
		}

		.btn {
			margin: 0 20rpx;
			border: 1px solid #4674F6;
			color: #4674F6;
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			border-radius: 40rpx;
		}
	}
</style>