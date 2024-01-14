<template>
	<view class="container">
		<uni-list v-if="type == 'false'">
			<uni-collapse ref="collapse" v-model="value" @change="change">
				<uni-collapse-item style="padding-left: 20rpx;" :title="item.chapterName" @click="jumpPage(item)"
					v-for="(item,index) in dataList" :key="index" :open="true">
					<uni-list-item :open="true" clickable @click="jumpPage(it)" v-for="(it,idx) in item.papers"
						:key="idx" showArrow :title="it.paperName" :rightText="it.questionNum+''" />
				</uni-collapse-item>
			</uni-collapse>
		</uni-list>
		<uni-list v-else>
			<view v-for="(item,index) in dataList" :key="index">
				<view v-for="(it,idx) in item.papers" :key="idx" class="list-content">
					<view class="list-icon">
						<image class="icon" src="../../static/constructor/answer.png" alt="" />
					</view>
					<view class="text-content">
						<view class="list-text">{{it.paperName}}</view>
						<view class="list-info">{{it.questionNum}}道&nbsp;|&nbsp;{{it.createTime}}</view>
					</view>
					<view class="list-btn" @click="jumpPage(it)">练习</view>
				</view>
			</view>
		</uni-list>
	</view>
</template>

<script>
export default {
  data() {
    return {
      dataList: {},
      type: 'false'
    }
  },
  onLoad(params) {
    console.log('params获取页面跳转过来的数据', params);
    this.type = params.trueQuestionChapterFlag
    console.log(this.type);
    if (params.trueQuestionChapterFlag == 'true') {
      this.getQuestionList(true)
      uni.setNavigationBarTitle({
        title: '真题练习'
      })
    } else {
      this.getQuestionList(false)
    }

  },
  methods: {
    change(e) {
      console.log('e', e);
    },
    jumpPage(item) {
      console.log(item);
      uni.navigateTo({
        url: `../answer/index?listType=5&paperId=${item.paperId}`
      })
    },
    getQuestionList(flag) {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId') || uni.getStorageSync(
            'fCurrentCategoryId'),
          trueQuestionChapterFlag: flag
        },
        callBack: (res) => {
          console.log('获取的列表', res);
          this.dataList = res
        }
      }
      this.$http('getCategoryId', opt)
    }
  }
}
</script>

<style lang="scss" scoped>
	.container {
		// background-color: #fff;
		padding: 0 10rpx;
	}

	$uni-success: #18bc37 !default;

	.uni-wrap {
		flex-direction: column;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		flex: 1;
	}

	.mb-10 {
		margin-bottom: 10px;
	}

	.uni-collapse-item__wrap {
		padding-left: 20rpx !important;
	}

	.decoration {
		width: 6px;
		height: 6px;
		margin-right: 4px;
		border-radius: 50%;
		background-color: $uni-success;
	}

	.list-content {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 120rpx;
		width: 100%;
		margin: 0 10rpx;

		.list-icon {
			width: 105rpx;
			text-align: center;

			.icon {
				width: 70rpx;
				height: 80rpx;
			}
		}

		.text-content {
			display: flex;
			flex-wrap: wrap;
		}

		.list-text {
			color: #333333;
			font-size: 40rpx;
			width: 100%;
			font-weight: bold;
		}

		.list-info {
			color: #999999;
			font-size: 24rpx;
		}

		.list-btn {
			padding: 0 20rpx;
			height: 50rpx;
			line-height: 50rpx;
			font-size: 30rpx;
			text-align: center;
			width: 140rpx;
			border: 1px solid #4674F6;
			border-radius: 20rpx;
			color: #4674F6;
		}
	}
</style>
