<template>
	<view class="container">
		<view class="searchBlock">
			<uni-easyinput borderColor="#CCCCCC" type="textarea" v-model="questionTitle"
				placeholder="请输入关键字进行搜索或点击粘贴剪切板内容" trim="true" confirm-type="search" maxlength="1000">
			</uni-easyinput>
			<view class="search-area">
				<text class="text-button"></text>
				<button style="border:0;background-color: transparent;" size="mini" @click="pastVal">清除并粘贴</button>
				<button style="border:0;background-color: transparent;" size="mini" @click="clear">清除</button>
				<button class="btn-search" size="mini" @click="getSearchData">搜索</button>
			</view>
		</view>

		<view style="margin-top: 10px">
			<view class="answerArea" v-if="searchDataList.length>0" v-for="(item,idx) in searchDataList"
				:key="item.questionId">
				<view class="question-title">
					<uni-tag :text="item.questionTypeName" type="primary" size="mini" />
					&nbsp;{{idx+1}}、{{item.questionTitle}}
				</view>
				<view class="question-options" v-for="(it,index) in item.options" :key="index">
					{{options[index]}}.{{it}}
				</view>
				<text style="font-weight: bold;">正确答案:</text>
				<view class="question-right" v-for="(it,index) in item.rightOptions" :key="index">{{it+' '}}</view>

			</view>
			<view v-else style="text-align: center;">
				<view>{{search}}</view>
			</view>
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
  onHide,
  onUnload
} from '@dcloudio/uni-app'
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
let questionTitle = ref('')
const searchAnswer = () => {
  console.log('搜索');
}
onLoad((params) => {
  console.log('params', params);
  if (params.type == 1) {
    let keyWord = uni.getStorageSync('keyword')
    questionTitle.value = keyWord.toString()
    keyWord.map(item => {
      getSearchData(item, params.type)
    })
  }

})
const options = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
let search = ref('')
const pastVal = () => {
  uni.getClipboardData({
    success: function(res) {
      questionTitle.value = res.data
      if (res.data.length == 0) {
        this.search = '暂无数据'
      }
    }
  });
}
const searchDataList = ref([])
const getSearchData = (keyword, type = 0) => {
  let opt = {
    params: {
      questionTitle: questionTitle.value,
      page: 1,
      size: 20,
    },
    callBack: (res) => {
      console.log('查询到的数据', res);
      if (type == 1) {
        searchDataList.value = [...searchDataList.value, ...res.records]
      } else {
        searchDataList.value = res.records
      }

    }
  }
  $http('getQuestionList', opt)
}
const clear = () => {
  questionTitle.value = ''
  searchDataList.value = []
}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f2f2f2;
		height: 100vh;

		.searchBlock {
			margin-bottom: 60rpx;
		}

		.search-area {
			// border: 1px solid;
			width: 70%;
			float: right;
			display: flex;
			justify-content: space-around;
			justify-items: center;
			align-items: center;
			// margin-bottom: 60rpx;

			.text-button {
				display: inline-block;
			}
		}

		.btn-search {
			background-color: #265ee2;
			color: #fff;
		}

		.question-analysis {
			background-color: #f7f7f7;
		}

		.question-options {
			// font-weight: bold;
			margin: 20rpx 0rpx;
		}

		.question-right {
			margin: 10rpx 0;
			// font-weight: bold;
		}

		.answerArea {
			background-color: #fff;
			margin-bottom: 20rpx;
			padding: 10px 20rpx;
		}

		.question-title {
			font-size: 34rpx;
			font-weight: bold;
		}
	}
</style>
