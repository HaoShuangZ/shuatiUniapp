<template>
	<view class="wrong-wrap">
		<!-- 内容区域 -->
		<view class="content-wrap">
			<view class="toggle-button-wrapper top-wrap">
				<view for="toggle-button">
					<view class="default">
						<view class="wrong-question wrong" :class="[type===0?'isChecked':'']" @click="onChange(0)">错题
						</view>
						<view class="collection-question wrong" :class="[type===1?'isChecked':'']" @click="onChange(1)">
							收藏题</view>
					</view>
				</view>
			</view>

			<view class="center-wrap">
				<view class="center" @click="jumpErrorQuestion">
					<p class="number">{{type===0?listInfo.errorNum || 0:listInfo.allCollectNum||0}}</p>
					<p class="all"> {{type===0?'全部错题':'全部收藏'}}</p>
				</view>
			</view>

			<!-- <view class="bottom-wrap">
				<view class="wrong-btn btn"> {{type===0?'今日错题':'今日收藏'}} </view>
				<view class="all-btn btn "> {{type===0?'全部错题':'全部收藏'}} </view>
			</view> -->

			<view class="progress-box">
				<view class="progres-content">

					<progress stroke-width="6.9" :percent="percent" activeColor="red" backgroundColor="#E2E2E2"
						border-radius="40"></progress>
					<view class="problems-box" v-if="type===0">
						<view class="left"> 已答题目{{listInfo.allNum}}，错题{{listInfo.errorNum}}题 </view>
						<view class="right"> 未做题{{listInfo.totalQuestionNum-listInfo.todayErrorNum}}题</view>
					</view>
					<view class="problems-box" v-else>
						<view class="left"> 今日收藏{{listInfo.todayCollectNum || 0}}题</view>
						<!-- <view class="right"> 未做题{{listInfo.totalQuestionNum-listInfo.todayErrorNum}}题</view> -->
					</view>
				</view>
			</view>

		</view>
		<!-- 内容区域 -->


		<!-- -->
		<view class="banner">
			<view class="vip-box" v-if="type===0">
				<view class="vip-icon">
					<uni-icons custom-prefix="iconfont" type="icon-zaixianxuexi" size="30"> </uni-icons>
				</view>
				<view class="vip-text">
					<p>高频错题 快速提高 </p>
					<p>精选易错题 难题，更多专属权益 </p>
				</view>
				<view class="vip-btn"> 升级VIP</view>
			</view>

			<!-- 	<view class="total-box" v-for="(item,index) in list" :key="index">
				<view class="ques-form"> {{item.type}} </view>
				<view class="num-problems"> <text> {{item.num}} 题 </text> </view>
			</view> -->
			<view class="total-box">
				<view class="ques-form"> {{type===0?'错题分布':'收藏分布'}} </view>
			</view>
			<view class="total-box" v-if="listInfo['判断题']>0">
				<view class="ques-form"> 判断题 </view>
				<view class="num-problems"> <text> {{listInfo['判断题']}} 题 </text> </view>
			</view>
			<view class="total-box" v-if="listInfo['单选题']>0">
				<view class="ques-form"> 单选题 </view>
				<view class="num-problems"> <text> {{listInfo['单选题']}}
						题 </text> </view>
			</view>
			<view class="total-box" v-if="listInfo['填空题']>0">
				<view class="ques-form"> 填空题 </view>
				<view class="num-problems"> <text> {{listInfo['填空题']}} 题 </text> </view>
			</view>
			<view class="total-box" v-if="listInfo['多选题']>0">
				<view class="ques-form"> 多选题 </view>
				<view class="num-problems"> <text> {{listInfo['多选题']}} 题 </text> </view>
			</view>
			<view class="total-box" v-if="listInfo['简答题']>0">
				<view class="ques-form"> 简答题 </view>
				<view class="num-problems"> <text> {{listInfo['简答题']}} 题 </text> </view>
			</view>
		</view>
		<button class="clear-btn" @click="clearBtn(type)">{{type===0?'清空错题':'清空收藏'}}</button>
		<!-- <view class="wrong-box" @click="clearBtn(type)">
			<view class="wrong-btn">
				{{type===0?'清空错题':'清空收藏'}}
			</view>

		</view> -->


	</view>
</template>

<script>
export default {
  data() {
    return {
      //屏幕高度
      screenHeight: 0,
      isChecked: false,
      progressWidth: 40,
      type: 0,
      listInfo: {},
      list: [{
        id: 11,
        type: '错题分布',
        num: 1,
        icon: "icon-cuowukongxin"
      },
      {
        id: 11,
        type: '单选题',
        num: 99,
        icon: "icon-shoucang"
      }

      ],
      percent: 10, //百分比0~100
      arrInfo: []


    };
  },
  onLoad(res) {
    console.log('res', res);
    this.type = res.listType == 11 ? 0 : 1
    //this.screenHeight = uni.getSystemInfoSync().windowHeight;
    console.log(this.screenHeight + "this.screenHeight")
    // this.change();
    // this.getCollectStatistic()
    // 获取当前页面的统计信息
    this.getPageInfo(res.listType)
    // this.getCollectStatistic()
  },
  options: {
    styleIsolation: 'shared'
  },
  //与methods 同级加入一下代码
  options: {
    addGlobalClass: true
  },
  methods: {
    jumpErrorQuestion() {
      if (this.listInfo.errorNum === 0) {
        uni.showToast({
          title: '暂无错题数据',
          icon: 'error'
        })
        return
      }
      if (this.type === 0) {
        uni.navigateTo({
          url: `../answer/index?listType=${11}`
        })
      } else {
        if (this.listInfo.allCollectNum == 0) {
          uni.showToast({
            title: '暂无收藏数据',
            icon: 'error'
          })
          return
        }
        uni.navigateTo({
          url: `../answer/index?listType=${12}`
        })
      }

    },
    clearBtn(type) {
      console.log(type, '按钮点击');
      type === 0 && this.clearErrorQuestionList(2)
      type === 1 && this.clearCollect(type)
      this.getPageInfo()
    },
    // 清空错题 type =1清空答题正确的记录  type=2清空答题错误的记录
    clearErrorQuestionList(type) {
      let opt = {
        params: {
          type
        },
        callBack: (res) => {
          if (res) {
            uni.showToast({
              title: '清除成功!',
            })
          } else {
            uni.showToast({
              title: '没有错题数据!',
              icon: 'error'
            })
          }
        }
      }
      this.$http('clearCollectAll', opt)
    },
    // 获取错题的统计信息
    getPageInfo(type) {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId') || uni.getStorageSync('fCurrentCategoryId')
        },
        callBack: (res) => {
          console.log('获取的统计信息', res);
          this.arrInfo = res
          this.listInfo = type == 11 ? res['questionStatistic'] : res['collectStatistic']
        }
      }
      this.$http('getUserCategory', opt)
    },
    // 清除所有收藏
    clearCollect(type) {
      let opt = {
        params: {
          type: 2
        },
        callBack: (res) => {
          console.log('清除数据', res);
          if (res) {
            uni.showToast({
              title: '清除成功!',
            })
          } else {
            uni.showToast({
              title: '没有收藏数据!',
              icon: 'error'
            })
          }
        }
      }
      this.$http('clearCollectAll', opt)
    },
    // 获取收藏的数据
    getCollectStatistic() {
      let opt = {
        params: {
          categoryId: uni.getStorageSync('currentCategoryId')
        },
        callBack: (res) => {
          console.log('获取的数据', res);
        }
      }
      this.$http('collectStatus', opt)
    },
    change() {

    },

    onChange(type) {
      console.log('type', type);
      this.type = type
      this.isChecked = !this.isChecked;
      if (type === 1) {
        this.listInfo = this.arrInfo['collectStatistic']
      } else {
        this.listInfo = this.arrInfo['questionStatistic']
      }
      // this.$emit('change', e.target.checked)
    },
    hrefrouterApp() {
      uni.navigateTo({
        url: '../constructor/constructor'
      });
    }
  },
};
</script>

<style lang="less">
	.uni-page-head {}

	.wrong-wrap {
		background-size: 100%;
		background: linear-gradient(180deg, #4c7cf6 0%, #65adf7 100%);
		height: 614rpx;
		box-sizing: border-box;

		.content-wrap {
			position: relative;
			padding: 0 122.76rpx;
			// padding-top: 106rpx;
			padding-right: 125.4rpx;
			height: 100%;
			box-sizing: border-box;

			.top-wrap {
				width: 262rpx;
				height: 64.6rpx;

				margin-bottom: 42.9rpx;
				margin-left: 122.12rpx;

				.default {
					display: flex;
					padding: 2rpx;
					background-color: #fff;
					border-radius: 32.34rpx;

					.wrong {
						display: block;
						border-radius: 35rpx;
						width: 50%;
						height: 64.6rpx;
						line-height: 64.6rpx;
						text-align: center;
						color: #4674F6;
						font-weight: 400;
					}
				}
			}

			.center-wrap {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 316.8rpx;
				height: 316.8rpx;
				margin-bottom: 25rpx;
				border-radius: 50%;
				margin-left: 96rpx;
				background: #4674F6;
				background: rgba(255, 255, 255, 0.3);

				.center {
					display: flex;
					flex-direction: column;
					width: 283.8rpx;
					height: 283.8rpx;
					background-color: #fff;
					border-radius: 50%;
					text-align: center;

					.number {
						margin-left: 120.12rpx;
						margin-top: 77.22rpx;
						width: 43.56rpx;
						color: #4674F6;
						font-weight: 400;
						font-size: 72.6rpx;
						height: 101.64rpx;
						line-height: 101.64rpx;

					}

					.all {
						font-size: 26.4rpx;
					}
				}
			}

			.bottom-wrap {
				display: flex;
				justify-content: space-between;

			}

			.btn {
				width: 198.66rpx;
				height: 63.66rpx;
				background-color: #fff;
				border-radius: 42.34rpx;
				line-height: 63.66rpx;
				text-align: center;
				color: #4674F6;
				font-size: 26.4rpx;
			}
		}
	}

	.isChecked {
		background: #4674F6;
		color: #fff !important;

	}

	.clear-btn {
		margin: 0 50px;
		// display: inline-block;
		margin: 0 20rpx;
		background-color: #65adf7;
		color: #fff;
		border-radius: 50rpx;
	}

	.progress-box {
		width: 690rpx;
		height: 133.32rpx;
		padding-left: 29.5rpx;
		position: absolute;
		bottom: -66.66rpx;
		z-index: 10000;
		margin-left: -127rpx;

		.progres-content {
			background-color: #fff;
			border-radius: 15.1rpx;
			box-sizing: border-box;
			padding: 30rpx;
			box-shadow: 1px 1px 8px 4px rgba(237, 237, 237, 0.5);

			.progres-bar {
				height: 13.2rpx;
				margin-right: 5.28rpx;
				border-radius: 6.66rpx;

				.g-progress {
					height: inherit;
					border-radius: 25px 0 0 25px;
				}
			}

			.problems-box {
				display: flex;
				justify-content: space-between;
				font-size: 26.4rpx;
				padding-top: 17.83rpx;
			}
		}
	}

	/deep/ progress .uni-progress-bar {
		border-radius: 50rpx !important;
	}

	/deep/ progress .uni-progress-inner-bar {
		border-radius: 50rpx !important;
	}


	.banner {
		// width: 100rpx;
		background-color: #fff;
		// height: 700rpx;
		padding-top: 100rpx;
		margin-bottom: 50rpx;
	}


	.vip-box {
		width: 685rpx;
		height: 133.32rpx;
		border-radius: 15.1rpx;
		display: flex;
		border-radius: 15.18rpx;
		margin-left: 30rpx;
		padding-left: 24.42rpx;
		align-items: center;
		box-sizing: border-box;
		background: linear-gradient(270deg, #FBF0D2 0%, #FEF9E5 100%);
		margin-bottom: 35rpx;

		.vip-icon {
			width: 60.72rpx;
		}

		.vip-text {
			margin-left: 17.16rpx;
			font-size: 26.4rpx;
			font-weight: 400;
		}

		.vip-btn {
			width: 151.12rpx;
			height: 54.12rpx;
			line-height: 54.12rpx;
			background: linear-gradient(270deg, #F2BA62 0%, #F8E294 100%);
			border-radius: 50.82rpx;
			margin-left: 39.54rpx;
			color: #923C20;
			text-align: center;
			font-size: 26.4rpx;
			font-weight: 400;
		}
	}

	.total-box {
		display: flex;
		height: 99rpx;
		background-color: #fff;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		border-bottom: 1px solid #ABABAB;
	}

	.wrong-box {
		background-color: #fff;
		// padding-left: 31.22rpx;
		// padding-right: 33.22rpx;
		// padding-top: 47.56rpx;
		padding-bottom: 0rpx;
		border-top: 1px solid #ABABAB;
	}

	.wrong-btn {
		display: flex;
		padding-top: 100rpx;
		width: 100%;
		box-sizing: border-box;
		height: 99rpx;
		background-color: pink;
		padding: 0 30rpx;
		justify-content: center;
		align-items: center;
		background: #4674F6;
		bottom: '0';
		border-radius: 110.88rpx;
		color: #fff;

	}
</style>
