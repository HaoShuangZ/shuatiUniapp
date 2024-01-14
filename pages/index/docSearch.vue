<template>
	<view class="container">
		<view class="input">
			<uni-easyinput type="text" @confirm="searchKeyWords" @clear="clearData" @blur="searchKeyWords" :trim="true"
				confirmType="搜索" v-model="keyWords" placeholder="请输入文档名" />
		</view>
		<view class="content" v-for="(item,index) in docDetailList" :key="index" @click="goDocument(item)">
			<view class="item-text">
				<view class="item-title">{{item.docName}}</view>
				<text class="item-tags" v-for="(it,idx) in item.tags" :key="it">
					{{it}}&nbsp;
					<text v-if="idx !=item.tags.length-1">|&nbsp;</text>
				</text>
				<view class="item-time">{{item.createTime}}</view>
			</view>
			<view class="item-img">
				<image class="item-img" :src="item.coverImage" alt="" />
			</view>
		</view>
		<view v-if="tag==1 && docDetailList.length ==0" class="null-date">
			<!-- <image style="width: 500rpx;height: 500rpx;" src="../../static/notes/notes.png"> -->
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
import {
  onLoad,
  onReady,
  onShow
} from '@dcloudio/uni-app'
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
let tag = ref(0)
let keyWords = ref('')
let docDetailList = ref([])
// getDocumentList
const searchKeyWords = () => {
  console.log('keyWords', keyWords.value);
  let opt = {
    params: {
      docName: keyWords.value
    },
    callBack: (res) => {
      console.log(res, 'res');
      docDetailList.value = res.records
      tag.value = 1
    }
  }
  $http('getDocumentList', opt)
}
const goDocument = (item) => {
  console.log(123);
  uni.setStorageSync('docDetail', item)
  uni.navigateTo({
    url: `../docView/docView`
  })
}
const clearData = () => {
  tag.value = 0
}
</script>

<style lang="scss">
	.input {
		margin: 0 20rpx;
	}

	.uni-easyinput__content-input {
		border-radius: 20rpx;
	}

	.null-date {

		display: flex;
		justify-content: center;
		text-align: center;
		align-content: center;
		// flex-wrap: wrap;
		flex-direction: column;
	}

	.item-title {
		color: #000;
		font-weight: bold;
		font-size: 34rpx;
	}

	.item-tags {
		font-size: 26rpx;
		color: #6f6f6f;
	}

	.item-time {
		margin-top: 10rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.content {
		margin: 20rpx 0;
		display: flex;
		justify-content: space-between;
		padding: 0 40rpx;
	}

	.item-img {
		height: 160rpx;
		width: 130rpx;
	}
</style>
