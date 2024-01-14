<template>
	<view class="container">
		<view class="content-item" v-for="(item,index) in documentList" :key="index">
			<view class="text">
				<view class="text-title">{{item.category.categoryName}}</view>
				<view class="text-num">{{item.count}}道错题</view>
			</view>
			<view class="btn" @click="jumpPage(item)">练习</view>
		</view>
	</view>
</template>

<script setup>
import {
  ref,
  toRefs,
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
onReady(() => {
  getList()
})
let pageInfo = reactive({
  page: 1,
  size: 10
})

const jumpPage = (item) => {
  console.log('错题的跳转', item, item.category.parentId);
  // &parentId=${item.category.parentId}
  uni.setStorageSync('pid', toRefs(item.category.parentId))
  uni.setStorageSync('currentCategoryId', '')
  uni.setStorageSync('currentCategoryDetail', item.category)
  uni.navigateTo({
    url: `../../constructor/constructorItem?categoryId=${item.category.categoryId}&categoryName=${item.category.categoryName}&parentId=${item.category.parentId}`
  });
  uni.setStorageSync('pid', item.category.parentId)
}
const getList = () => {
  let opt = {
    // query: `?page=${pageInfo.page}&size=${pageInfo.size}`,
    // params: {
    //   page: 1,
    //   size: 10,
    // },
    callBack: (res) => {
      console.log('获取列表', res, documentList);
      documentList.value = [...res]

    }
  }
  $http('getErrQuestionList', opt)
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
			justify-content: space-between;
			align-items: center;
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
			padding: 10rpx 20rpx;
			text-align: center;
			border-radius: 40rpx;
		}
	}
</style>
