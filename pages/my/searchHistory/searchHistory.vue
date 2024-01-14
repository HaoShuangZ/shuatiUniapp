<template>
	<view class="container">
		<view class="list-native" v-for="(item,index) in documentList" :key="index" v-if="documentList.length">
			<view class="list-text">
				<text class="list-title" v-for="(keyword,index) in item.keyword" :key="index">{{keyword}}</text>
				<text class="other-text">
					<text class="text-down">{{item.createTime}}</text>
				</text>
			</view>
			<view class="down-btn" @click="searchKey(item)">重新搜题</view>
		</view>
		<view v-else>
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script setup>
import {
  ref,
  computed,
  reactive,
  getCurrentInstance
} from 'vue';
import wechat from '@/utils/wechat.js'
import {
  onLoad,
  onReady,
  onShow
} from '@dcloudio/uni-app'
// import searchData from './new_file.js'
// 引入全局定义的$http
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
let documentList = ref([])
onLoad((params) => {
  getList()
})
onReady(() => {
  // getList()
})
const searchKey = (item) => {
  uni.setStorageSync('keyword', item.keyword)
  uni.navigateTo({
    url: '../../index/search?type=1'
  })
}
const getList = () => {
  let opt = {
    params: {
      type: 2
    },
    callBack: (res) => {
      documentList.value = [...res]
      console.log('获取列表', res, documentList);
    }
  }
  $http('getHistoryList', opt)
}
</script>

<style lang="scss">
	.container {
		.icon-type {
			width: 44.87rpx;
			height: 50rpx;
		}

		.list-native {
			display: flex;
			justify-content: space-between;
			margin: 10rpx 30rpx;
			padding: 0 10rpx;
			border-radius: 5rpx;
			height: 108.97rpx;
			border-bottom: 1rpx solid #f3f3f3;
			align-items: center;
			border-bottom: 1px solid #999999;

			// line-height: 108.97rpx;
			.list-text {
				padding: 0 20rpx 0 0;
				word-break: break-all;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				width: 50vw;
				font-size: 29rpx;
				font-weight: 500;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.list-title {
					font-weight: bold;

				}

				.other-text {
					// float: right;
					display: block;
					font-size: 14px;
					color: #8e8e8e;
				}
			}

			.down-btn {
				padding: 10rpx 30rpx;
				margin: 0 10rpx;
				border-radius: 30rpx;
				font-weight: bold;
				border: 1px solid #4674F6;
				color: #4674F6;
				font-size: 28rpx;
			}
		}

		.list-item {
			.item-icon {}

			.item-title {
				.title-text {
					font-size: 40rpx;
					font-weight: bold;
					color: #000;
				}

				.title-time {
					font-size: 28rpx;
					color: #999999;
				}
			}
		}
	}
</style>
