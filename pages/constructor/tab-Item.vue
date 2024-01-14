<template>
	<view class="container">
		<view class="list-content">
			<view class="list-box">
				<view class="list" v-for="(item,index) in exerciseList" :key="index">
					<view class="exercise-list" @click="jumpPage(item)">
						<view class="left">
							<view :class="{'title':item.index<=3}"> {{item.title}} </view>
							<view class="desc"> {{item.desc}} </view>
						</view>
						<view class="right">
							<!-- <uni-icons custom-prefix="iconfont" :type="item.icon" size="30"> </uni-icons> -->
							<image class="icon-img" :src="`../../static/constructor/icon${item.index+1}.png`" alt="" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class=" border-tb share-btn">
			<!-- #ifdef MP -->
			<!-- @click="goShareClick" -->
			<button type="primary" open-type="share" size="default" style="width: 300rpx;margin-right: 0;"
				class="share button-com"> 分享
			</button>
			<!-- #endIf  -->
			<button type="primary" size="default" style="width: 300rpx;" class="collect button-com"
				@click="collectAdd()">{{isCollectFlag?'取消收藏':'收藏'}}</button>
		</view>
		<cc-shareMenu ref="share" :contentHeight="380" :shareList="shareList" @click="shareMenuClick"></cc-shareMenu>
	</view>
</template>
<script>
export default {
  watch: {

    userCollectFlag(newval, oldval) {
      if (newval) {
        this.isCollectFlag = true
      } else {
        this.isCollectFlag = false
      }
    }
  },
  data() {
    return {
      shareList: [],
      isCollectFlag: false,
      isActive: 0,
      list: [{
        id: 11,
        type: '我的错题',
        num: '1'
      },
      {
        id: 12,
        type: '我的收藏',
        num: '2'

      },
      {
        id: 13,
        type: '我的笔记',
        num: '8'

      },
      {
        id: 11,
        type: '在线学习',
        num: '',
      },
      ],
    };
  },

  computed() {
    isCollection: {
      return uni.getStorageSync('currentCategoryDetail')['userCollectFlag']
    }
  },
  props: ["exerciseList", "userCollectFlag"], //父组件向子组件传值
  mounted() {
    console.log('userCollectFlag', this.userCollectFlag, this.exerciseList, this.isCollection);
    this.shareList = [{
      type: 1,
      icon: '/static/login/weixin.png',
      text: '微信好友'
    },
      // {
      //   type: 2,
      //   icon: '/static/share_moment.png',
      //   text: '朋友圈'
      // },
      // {
      //   type: 3,
      //   icon: '/static/share_qq.png',
      //   text: 'QQ好友'
      // },
      // {
      //   type: 4,
      //   icon: '/static/share_qqzone.png',
      //   text: 'QQ空间'
      // },
      // {
      //   type: 5,
      //   icon: '/static/share_weibo.png',
      //   text: '微博'
      // }
    ];
  },
  methods: {
    goShareClick() {
      // #ifndef MP
      this.$refs.share.toggleMask();
      // #endIf
    },
    shareMenuClick(name) {
      uni.showModal({
        title: '温馨提示',
        content: '点击的分享菜单名称是 = ' + name
      })
    },
    // 收藏科目
    collectAdd() {
      console.log('this.userCollectFlag', this.userCollectFlag);
      if (this.isCollectFlag) {
        this.delcollect()
      } else {
        this.addCollect()
      }
    },
    addCollect() {
      let opt = {
        params: {
          "collectType": 1,
          "categoryId": Number(uni.getStorageSync('currentCategoryDetail')['categoryId']),
        },
        callBack: (res) => {
          console.log('收藏分类', res);
          this.isCollectFlag = true
          uni.showToast({
            title: '收藏成功'
          })
        }
      }
      this.$http('collectQuestion', opt)
    },
    // 取消收藏 
    delcollect() {
      let opt = {
        params: {
          "collectType": 1,
          "categoryId": Number(uni.getStorageSync('currentCategoryDetail')['categoryId']),
        },
        callBack: (res) => {
          this.isCollectFlag = false
          uni.showToast({
            title: '取消收藏成功'
          })
        }
      }
      this.$http('delCollectSubject', opt)
    },
    checked(index) {
      this.isActive = index
    },
    jumpPage(item) {
      console.log('jumpPage', item, item.index);
      let index = item.index
      if (index == 0) {
        // 0代表顺序练习
        uni.navigateTo({
          url: `../answer/index?listType=0`
        });
      }
      if (index == 1) {
        uni.navigateTo({
          url: `../examination/index?listType=${item.index}`
        });
      }
      if (index == 2) {
        uni.navigateTo({
          url: `../answer/index?listType=2`
        });
      }
      if (index == 3) {
        uni.navigateTo({
          url: `../answer/index?listType=3`
        });
      }
      if (index == 4) {
        uni.navigateTo({
          url: `../questionType/questionType?listType=4`
        });
      }
      if (index == 5) {
        uni.navigateTo({
          url: `../categorateType/categorateType?listType=5&trueQuestionChapterFlag=${false}`
        });
      }
      //历年真题
      if (index == 6) {
        uni.navigateTo({
          url: `../categorateType/categorateType?listType=6&trueQuestionChapterFlag=${true}`
        });
      }
      // 试题搜索
      if (index == 7) {
        uni.navigateTo({
          url: `../index/search?listType=7`
        });
      }
      if (index == 9) {
        uni.navigateTo({
          url: `../onlineLearning/onlineLearning?listType=${item.index}`
        });
      }
      if (index == 10) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examIntroduction`
        });
      }

      if (index == 11) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examGuid`
        });
      }
      if (index == 12) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examScope`
        });
      }
      if (index == 13) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examArrangements`
        });
      }
      if (index == 14) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examCertificate`
        });
      }
      if (index == 15) {
        uni.navigateTo({
          url: `../examInfo/examInfo?listType=examInformation`
        });
      }
    }
  }
}
</script>

<style lang="scss">
	.container {
		height: 75vh;
		background-color: #fff;
	}

	.shareView {

		margin-top: 60px;
		width: 100px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: antiquewhite;

		align-self: center;
	}

	.content {
		display: flex;
		background-color: pink;
		margin-bottom: 20rpx;

		.item {
			display: flex;
			flex-direction: column;
			width: 25%;
			padding: 0 38rpx;
			font-size: 16rpx;
			align-items: center;
			justify-content: center;
			box-sizing: border-box;
			height: 150rpx;
			background-color: #fff;
		}

		.icon {
			margin-bottom: 10rpx;

			.iconfont {
				color: #4674F6 !important;
				font-size: 50rpx !important;
			}
		}

		.nav {
			font-size: 26rpx;
			margin-bottom: 10rpx;
		}

		.num {
			font-size: 23rpx;
		}
	}

	.tab_nav {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		// border-bottom: 1px solid #ABABAB;
	}

	.tab_nav::after {
		position: absolute;
		content: "";
		width: 200%;
		height: 200%;
		border: 1px solid red;
		transform-origin: 0 0;
		transform: scale(0.5);
	}

	.tab_nav .navTitle {
		height: 90rpx;
		line-height: 90rpx;
		width: 100%;
		text-align: center;
		font-size: 32rpx;
		font-family: Alibaba PuHuiTi;
		color: #333;
	}

	.active {
		position: relative;
		color: #4674F6;
	}

	.active::after {
		content: "";
		position: absolute;
		width: 100rpx;
		height: 8rpx;
		background-color: #4674F6;
		left: 0px;
		right: 0px;
		bottom: 0px;
		margin: auto;
	}

	.list-content {
		background-color: #fff;
		height: calc(100vh - 266px);

		.list-box {
			display: flex;
			flex-wrap: wrap;
			background-color: #fff;
			padding: 0 10rpx;
			padding-top: 40rpx;

			.list {
				width: 50%;
				padding: 0 10rpx;
				box-sizing: border-box;
				height: 130rpx;

				.exercise-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					background-color: #F3F8FE;
					box-sizing: border-box;
					padding: 20rpx 20rpx;
					border-radius: 15rpx;
					margin-bottom: 20rpx;

					.title {
						color: #F15752;
						// font-size: 23rpx;
						// margin-bottom: 10rpx;
					}

					.icon-img {
						width: 50rpx;
						height: 50rpx;
					}

					.desc {
						font-size: 20rpx;
						color: #999999;

					}
				}
			}
		}
	}

	.share-btn {
		display: flex;
		border-top: 1px solid #f8f8f8;
		padding-top: 20rpx;

		.button-com {
			height: 75rpx;
			line-height: 75rpx;
			border-radius: 35rpx;
			color: #fff;
		}

		.share {
			background-color: #58BE68;
		}

		.collect {
			background-color: #4674F6;
		}
	}
</style>