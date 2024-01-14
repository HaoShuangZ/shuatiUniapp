<template>
	<view class="container-box">
		<view class="container" v-for="(item,index) in list" :key="index" @click="hrefrouterApp(item)">
			<view class="list-box">
				<view class="subject">

					<view class="sub-title"> {{item.categoryName}} </view>
					<view class="update-info">

						<text class="num"> {{item.questionNum}}题 </text>
						<text class="date"> {{item.updateTime}} 更新</text>
					</view>

				</view>
				<view class="icon" v-if="item.categoryId == isSelectId">
					<uni-icons type="checkmarkempty" size="30" color="#4674F6"> </uni-icons>
				</view>
			</view>
		</view>
		<view v-if="list.length === 0">
			<text>暂无科目数据</text>
		</view>
	</view>
</template>
<script>
export default {

  data() {
    return {
      isActive: 0,
      list: [],
      categoryId: -1
    };
  },
  onLoad(params) {
    this.getCategoryTypeList(params.categoryId)
    this.categoryId = uni.getStorageSync('currentCategoryId')
  },
  computed: {
    isSelectId() {
      return uni.getStorageSync('currentCategoryId')
    }
  },

  methods: {
    hrefrouterApp(item) {
      uni.setStorageSync('currentCategoryId', item.categoryId)
      uni.setStorageSync('fCurrentCategoryId', item.parentId)
      uni.setStorageSync('currentCategoryDetail', item)
      uni.redirectTo({
        url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.parentId}`
      });

    },

    getCategoryTypeList(id) {
      uni.showLoading({
        title: '加载中'
      })
      let opt = {
        params: {
          pid: id
        },
        callBack: (res) => {
          console.log('获取的列表', res)
          this.list = res
          uni.hideLoading()
        }
      }
      this.$http('getCategoryType', opt)
    },
  }
}
</script>

<style lang="scss">
	.container {
		display: flex;
		background-color: #fff;
		height: 160rpx;
		padding: 0 20rpx;

		.list-box {
			width: 100%;
			display: flex;
			border-bottom: 1px solid #ABABAB;
			justify-content: space-between;
			align-items: center;
		}

		.sub-title {
			font-weight: 400;
			color: #333;
			font-size: 30rpx;
			font-weight: bold;
		}

		.update-info {

			padding-top: 10rpx;
			color: #999;
			font-size: 27.72rpx;

			.date {
				margin-left: 10rpx;
			}

			.time {
				margin-left: 10rpx;
			}

		}

		.icon {
			.icon-arrow {
				font-size: 30.36rpx !important;
			}
		}
	}

	.uni-page-head {
		background-color: red !important;
	}
</style>