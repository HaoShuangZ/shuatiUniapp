<template>
	<view class="page">
		<!-- :style="{'height':navigationBarAndStatusBarHeight,display:'flex'}" -->
		<!-- <uni-nav-bar :status-bar="true" :leftWidth="0" :title="''">
			<view class="input-view">
				<input v-model="docName" confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词"
					@confirm="confirm" />
			</view>
			<block>
				<view @click="confirm" class="input-text">
					搜索
				</view>
			</block>
		</uni-nav-bar> -->
		<uni-search-bar class="nav-bar-input" placeholder="请输入要搜索的文档" @confirm="confirm" cancelButton="none"
			v-model="docName" @clear="clear">
		</uni-search-bar>
		<view class="container">
			<view class="left" :style="{'height':`calc(100vh - ${statusBarHeight})`}">
				<uni-section v-for="(item,index) in questionList" :title="item.categoryName" :type="item.line?'line':''"
					:key="item.categoryId" @click="typeChange(item)">
				</uni-section>
			</view>
			<view class="right" :style="{'height':`calc(100vh - ${statusBarHeight})`}">
				<view class="list-native" v-for="(item,index) in documentList" :key="index" v-if="documentList.length>0"
					@click="goDocumentView(item)">
					<image :src="item.type === '.docx'?`../../static/doc.png`:`../../static/${item.type}.png`" class="icon-type"
						alt="" />
					<text class="list-text">
						<text>{{item.docName}}{{item.type}}</text>
						<text class="other-text">
							<text class="text-down">{{item.downloadNum || 0}}下载</text>
							<text class="text-page">10页</text>
						</text>
					</text>
				</view>
				<view class="data-null" v-else>
					<text>暂无数据</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
export default {

  onLoad() {
    this.getCategoryTypeList()
  },
  onShow() {
    this.getCategoryTypeList()
  },
  methods: {
    clear() {
      this.docName = ''
      this.getDocumentList()
    },
    cancel() {
      this.getDocumentList()
    },
    confirm(res) {
      this.getDocumentList()
    },
    goDocumentView(item) {
      console.log(item);
      uni.setStorageSync('docDetail', item)
      uni.navigateTo({
        url: `../docView/docView`
      })
    },
    typeChange(item) {
      this.currentCategoryId = item.categoryId
      this.getDocumentList()
      this.questionList.map(val => {
        val.line = false
        if (val.categoryId === item.categoryId) {
          val.line = true
        }
      })
    },
    categoryInit(res) {
      this.questionList = [{
        categoryId: '',
        categoryName: "全部",
        children: [],
        level: 1,
        line: true,
        parentFlag: true,
        parentId: 0
      }, ...res]
    },
    getCategoryTypeList() {
      let opt = {
        callBack: (res) => {
          if (res.length > 1) {
            uni.setStorageSync('categoryParams', res)
            this.categoryInit(res)
            this.getDocumentList()
          }
        }
      }

      let categoryParams = uni.getStorageSync('categoryParams')
      if (categoryParams) {
        this.categoryInit(categoryParams)
        this.getDocumentList()
      } else {
        this.$http('getCategoryType', opt)
      }
    },
    getDocumentList() {
      let dOpt = {
        params: {
          "categoryId": this.currentCategoryId,
          "docName": this.docName,
          "page": 1,
          "size": 100
        },
        callBack: (res) => {
          this.documentList = res.records
        }
      }
      this.$http('getDocumentList', dOpt)
    }
  },
  data() {
    return {
      searchVal: '',
      currentCategoryId: '',
      questionList: [],
      docName: '',
      documentList: [],
      // 状态栏高度
      statusBarHeight: wx.getStorageSync('phoneInfo')['statusBarHeight'] + 'px',
      // 导航栏高度
      navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
      // 胶囊按钮高度
      menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
      // 导航栏和状态栏高度
      navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') +
					wx.getStorageSync('navigationBarHeight') +
					'px'
    };
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
	}

	.container {
		display: flex;
		flex-wrap: nowrap;
		background-color: #ffffff;



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

		.container {
			display: flex;
			flex-wrap: nowrap;


		}

		.left {
			width: 25vw;
			height: 100%;
			// border: 1rpx solid;	
			background-color: #f2f2f2;

			::v-deep .uni-section {
				background-color: #f2f2f2 !important;
			}
		}

		.right {
			width: 75vw;
			height: 100%;
			// border: 1rpx solid;
			font-size: 14px;

			.list-native {
				display: flex;
				justify-content: flex-start;
				margin: 10rpx 30rpx;
				padding: 0 10rpx;
				border-radius: 5rpx;
				height: 108.97rpx;
				border-bottom: 1rpx solid #f3f3f3;
				align-items: center;

				// line-height: 108.97rpx;
				.list-text {
					font-size: 16px;
					font-weight: 500;
					margin-left: 20px;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.other-text {
						display: block;
						font-size: 14px;
						color: #8e8e8e;
					}
				}

				.icon-type {
					width: 44.87rpx;
					height: 50rpx;
				}
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