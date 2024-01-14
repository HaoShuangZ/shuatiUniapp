<template>
	<view class="page">
		<!-- <view class="navigation-container" :style="{'height':navigationBarAndStatusBarHeight }"> -->
		<!--自定义导航栏-->
		<!-- <uni-nav-bar :style="{'height':navigationBarAndStatusBarHeight,display:'flex'}" :status-bar="true" :leftWidth="0"
			:title="''">
			<view class="input-view">
				<input v-model="searchVal" confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@confirm="confirm" />
			</view>
			<block>
				<view @click="confirm" class="input-text">
					搜索
				</view>
			</block>
		</uni-nav-bar> -->
		<!-- </view> -->

		<div class="container">
			<uni-search-bar class="nav-bar-input" placeholder="请输入要搜索的文档" @confirm="confirm" cancelButton="none"
				v-model="searchVal" @clear="clear">
			</uni-search-bar>
			<view class="content">
				<view class="left" :style="{'height':`calc(100vh - ${statusBarHeight})`}">
					<uni-section @click="changeCategoryType(item)" v-for="(item,index) in questionList" :title="item.categoryName"
						:type="item.line?'line':''" :key="item.categoryId" :class="item.line?'active-line':null">
					</uni-section>
				</view>
				<view class="right" :style="{'height':`calc(100vh - ${statusBarHeight})`}">
					<scroll-view ref="scrollView" scroll-y="true" :show-scrollbar="false">
						<view class="list-title">{{currentCheckType}}</view>
						<view @click="hrefRouterApp(item)" v-for="(item,index) in childrenList" :key="index" class="list-childer">
							{{item.categoryName}}
							<view class="list-right">
								<uni-icons type="forward" size="20"></uni-icons>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>

		</div>

	</view>
</template>

<script>
export default {
  data() {
    return {
      searchVal: '',
      questionList: [],
      childrenList: [],
      currentCheckType: '',
      // 状态栏高度
      statusBarHeight: wx.getStorageSync('phoneInfo')['statusBarHeight'] + 'px',
      // 导航栏高度
      navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
      // 胶囊按钮高度
      menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
      // 导航栏和状态栏高度
      navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') +
					wx.getStorageSync('navigationBarHeight') +
					'px',
      screenHeight: wx.getStorageSync('screenHeight') + 'px',
      safeAreaHeight: wx.getStorageSync('safeAreaHeight') + 'px'
    };
  },
  onLoad() {
    // this.getCategoryTypeList()
    // uni.hideTabBar();
    // if (!uni.getStorageSync('categoryParams')) {
    //   this.getCategoryTypeList()
    // } else {
    //   this.getCategoryStory()
    // }
  },
  onShow() {
    this.getCategoryTypeList()
    console.log('navigationBarAndStatusBarHeight', this.navigationBarAndStatusBarHeight);
    // uni.getSystemInfo({
    //   success: res => {
    //     console.log('获取当前设备信息', res);
    //     // wx.setStorageSync('navigationBarHeight', res.safeAreaInsets.top)
    //     // wx.setStorageSync('navigationBarHeight', res.safeAreaInsets.statusBarHeight)
    //     console.log('高度', res.screenHeight - res.safeAreaInsets.top - res
    //       .safeAreaInsets.bottom);
    //     wx.setStorageSync('screenHeight', res.screenHeight - res.safeAreaInsets.top * 2 + res
    //       .safeAreaInsets.bottom)
    //     wx.setStorageSync('safeAreaHeight', res.safeAreaInsets.top * 2 + res
    //       .safeAreaInsets.bottom)
    //   }
    // });
  },
  methods: {
    clear() {
      this.searchVal = ''
      this.getCategoryTypeList()
    },
    confirm(res) {
      console.log('搜索', this.searchVal);
      if (this.searchVal) {
        this.getCategoryName()
      } else {
        this.getCategoryTypeList()
      }
    },
    getCategoryName() {
      let opt = {
        params: {
          keyword: this.searchVal
        },
        callBack: (res) => {
          console.log('查询到的详情', res);
          res[0]['line'] = true
          this.currentCheckType = res[0].categoryName
          // this.questionList = res
          this.childrenList = res
        }
      }
      this.$http('getCategoryTreeChild', opt)
    },
    hrefRouterApp(item) {
      console.log('jump', item, item.children)
      if (item.children.length === 0) {
        uni.setStorageSync('pid', item.categoryId)
        uni.setStorageSync('currentCategoryId', '')
        uni.setStorageSync('currentCategoryDetail', item)
        uni.navigateTo({
          url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.parentId}`
        });

      } else {
        uni.navigateTo({
          url: `../constructor/constructor?categoryf=${this.currentCheckType}&categoryc=${item.categoryName}`,
          success: (res) => {
            console.log('res.data', item)
            res.eventChannel.emit('list', {
              data: item.children
            })
          }
        });
      }

    },
    // 获取分类列表
    getCategoryTypeList() {
      // uni.showLoading({
      //   title: '加载中'
      // })
      let opt = {
        callBack: (res) => {
          // uni.hideLoading()
          if (res.length > 1) {
            uni.setStorageSync('categoryParams', res)
          }
          res[0]['line'] = true
          this.currentCheckType = res[0].categoryName
          this.questionList = res
          this.childrenList = res[0].children
        }
      }
      this.$http('getCategoryType', opt)
    },
    // 获取缓存
    getCategoryStory() {
      let categoryList = uni.getStorageSync('categoryParams')
      categoryList[0]['line'] = true
      this.currentCheckType = categoryList[0].categoryName
      this.questionList = categoryList
      this.childrenList = categoryList[0].children
    },
    changeCategoryType(item) {
      console.log('item', item);
      this.delCategoryLine()
      item.line = true
      this.currentCheckType = item.categoryName
      this.childrenList = item.children
    },
    // 删除所有一级item line
    delCategoryLine() {
      this.questionList.map(item => {
        item.line = false
      })
    },
    handleSearch() {

    }
  }
}
</script>

<style lang="scss">
	$nav-height: 30px;

	.page {
		background-color: #ffffff;
		display: flex;
		flex-direction: column;


		.uni-searchbar__box {
			height: auto;
			padding: 8px;
		}

		.container {
			display: flex;
			flex-direction: column;

			.search {
				display: flex;
				background-color: #f2f2f2;

				.input-view {
					display: flex;
					flex-direction: row;
					width: 70%;
					// flex: 1;
					background-color: #f8f8f8;
					height: $nav-height;
					border-radius: 15px;
					padding: 0 15px;
					margin: 5px 20px;
					flex-wrap: nowrap;
					line-height: $nav-height;
				}

				.input-text {
					margin: 7px 0;
					display: block;
					height: $nav-height;
					line-height: $nav-height;
				}

				.nav-bar-input {
					height: $nav-height;
					line-height: $nav-height;
					width: 100%;
					// padding: 0 5px;
					font-size: 12px;
					background-color: #f8f8f8;
				}
			}

			.content {
				display: flex;
				flex-wrap: nowrap;

				.left {
					flex: 1;
					height: calc(100vh - 44px);
					background-color: #f2f2f2;

					.active-line {
						background-color: #ffffff;
						color: #4674f6
					}

					// border: 1rpx solid;
					.uni-section {
						background-color: #f2f2f2 !important;
					}
				}

				.right {
					width: 70vw;
					height: calc(100vh - 44px);
					overflow-y: auto;
					// border: 1rpx solid;
					padding: 0 10px;

					.list-native {
						display: flex;
						//justify-content: space-between;
						margin: 10rpx 5rpx;
						padding: 0 10rpx;
						border-radius: 5rpx;
						width: calc(100vh - 44px);
						height: 70rpx;
						line-height: 70rpx;
						background-color: #f2f2f2;
					}

					.list-childer {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding-left: 5px;
						height: 40px;
						margin-bottom: 10px;
						background-color: #f2f2f2;
						font-size: 14px;
						border-radius: 5px;
					}

					.list-title {
						height: 35px;
						line-height: 35px;
						color: #4674F6;
						background-color: #fff;
						font-weight: 600;
						font-size: 14px;
					}

				}

			}



			.input-uni-icon {
				line-height: $nav-height;
			}

			.search-text {
				color: #ffffff;
				font-size: 14px;
			}

			/* navigationBar.wxss */
			.navigation-container {
				position: fixed;
				width: 100%;
				z-index: 99;
				top: 0;
				left: 0;
				background-color: #ffffff;
			}
		}



		.uni-section .uni-section-header__decoration.line {
			width: 6rpx;
			height: 40rpx;
			border-radius: 10px;
		}

		.uni-section .uni-section-header__decoration {
			margin-right: 0px;
			background-color: #4674f6;
		}

		.uni-section .uni-section-header__content {
			display: flex;
			flex-direction: column;
			flex: 1;
			color: #333;
			margin-left: 5px;
		}

		.uni-section .uni-section-header {
			padding: 12px 0px;
		}
	}
</style>