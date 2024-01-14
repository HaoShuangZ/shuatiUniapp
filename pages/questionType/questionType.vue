<template>
	<view class="container">
		<text>题型练习</text>
		<uni-section class="mb-10" title="难度练习">
			<!-- 	<view class="type-item" >
				{{item.label}}:{{item.num}}
			</view> -->
			<uni-list>
				<uni-list-item clickable @click="jumpPage('difficulty',item)" v-for="(item,index) in dataList['难度练习']"
					:key="index" showArrow :title="item.label" :rightText="String(item.num)" />
				<!-- <uni-list-item showArrow title="列表文字" rightText="右侧文字" /> -->
			</uni-list>
		</uni-section>
		<uni-section style="margin:20rpx 0" class="mb-10" title="题型练习">
			<!-- <view class="type-item" v-for="(item,index) in dataList['题型练习']" :key="index"> {{item.label}}:{{item.num}}
			</view> -->
			<uni-list>
				<uni-list-item clickable @click="jumpPage('questionTypeName',item)"
					v-for="(item,index) in dataList['题型练习']" :key="index" showArrow :title="item.label"
					:rightText="String(item.num)" />
			</uni-list>
		</uni-section>
	</view>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    }
  },
  onLoad() {
    this.getQuestionList()
  },
  methods: {
    jumpPage(type, item) {
      console.log('跳转的参数', item);
      if (type === 'difficulty') {
        uni.navigateTo({
          url: `../answer/index?listType=4&difficulty=${item.label}`
        })
      } else {
        uni.navigateTo({
          url: `../answer/index?listType=4&questionTypeName=${item.label}`
        })
      }

    },
    getQuestionList() {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId') || uni.getStorageSync('fCurrentCategoryId')
        },
        callBack: (res) => {
          console.log(res, '题型练习的res');
          console.log('data', res);
          let arr = {
            '难度练习': [],
            '题型练习': []
          }
          Object.keys(res['难度练习']).map((item, index) => {
            arr['难度练习'].push({
              label: item,
              num: res['难度练习'][item]
            })
          })
          Object.keys(res['题型练习']).map((item, index) => {
            arr['题型练习'].push({
              label: item,
              num: res['题型练习'][item]
            })
          })
          console.log(arr, 'arr的参数');
          this.dataList = arr

          console.log('获取的列表', res);
        }
      }
      this.$http('getQuestionType', opt)
    }
  }
}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		padding: 0 10rpx;

		.type-item {
			font-size: 28rpx;
			padding: 0 10rpx;
		}
	}
</style>
