<template>
	<!-- 自定义导航栏 -->
	<view class="navBarBox">
		<!-- 状态栏占位 -->
		<!-- <view class="searchBar"> -->
		<!-- 	<uni-search-bar class="nav-bar-input" placeholder="请输入要搜索的文档" @confirm="keywordSearch" cancelButton="none"
				v-model="keyword" @clear="clear">
			</uni-search-bar> -->
		<!-- <input v-model="keyword" placeholder="搜索想要练习的科目" class="search" />
			<view class="text" @click="keywordSearch"> 搜索 </view> -->
		<!-- </view> -->
		<!-- 页面内容 -->
		<view class="right">
			<view class="list-title"> <text>{{categoryc}}</text> <text class="arch-text">
					/{{categoryf}}</text> </view>
			<view class="list-item" v-for="(item,index) in list" :key="item.categoryId">
				<view class="list-childer" :key="index" @click="hrefrouterApp(item)">
					{{item.categoryName}}
					<view class="list-right">
						<uni-icons type="forward" size="20"></uni-icons>
					</view>
				</view>
			</view>
			<!--	<view class="list-native"></view>  -->
		</view>
	</view>
</template>

<script>
export default {
  onLoad(option) {
    if (option) {
      const {
        categoryc,
        categoryf
      } = option
      this.categoryc = categoryc
      this.categoryf = categoryf
    }
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('list', (data) => {
      this.list = data.data
      console.log('this.list', this.list, data);
    })
  },
  data() {
    return {
      // 导航栏和状态栏高度
      navigationBarAndStatusBarHeight: wx.getStorageSync('statusBarHeight') + wx.getStorageSync(
        'navigationBarHeight') + 'px',
      categoryc: "",
      categoryf: "",
      list: [],
      keyword: ""

    };
  },
  methods: {
    hrefrouterApp(item) {
      console.log('item-----------', item)
      if (item.children.length > 0 && item.parentFlag) {
        this.categoryf = this.categoryf + `/${item.categoryName}`
        this.list = item.children
      } else {
        console.log('item.pid', item.parentId);
        uni.setStorageSync('pid', item.parentId)
        uni.setStorageSync('fCurrentCategoryId', item.parentId)
        uni.setStorageSync('currentCategoryId', item.categoryId)
        uni.setStorageSync('currentCategoryDetail', item)
        uni.navigateTo({
          url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.parentId}`
        });
      }

      uni.setStorageSync('pid', item.categoryId)
    },
    keywordSearch(item) {
      let otp = {
        params: {
          keyword: this.keyword,
        },
        callBack: (res) => {
          console.log(res, '获取搜索列表')
        }
      }
    }
  }
}
</script>

<style lang="scss">
	.navBarBox {
		width: 100%;
		height: 99vh;
		background-color: #fff;
	}

	.searchBar {
		display: flex;
		align-items: center;
		height: 50px;
		background-color: #fff;
	}

	.search {
		width: 290px;
		height: 30px;
		background-color: #F2F2F2;
		border-radius: 40px;
		padding-left: 20px;
		color: #999999;
		font-size: 12px;
	}

	.nav-left {
		margin-left: 10px;
	}

	.text {
		margin-left: 10px;
	}

	.right {
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

		.list-item {
			padding: 0 10px;
		}


	}

	.list-title {
		height: 35px;
		padding: 0 10px;
		line-height: 35px;
		color: #4674F6;
		background-color: #fff;
		font-weight: 600;
		font-size: 14px;
	}

	.arch-text {
		color: #686868;
	}

	.nav-bar-input {
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
		// padding: 0 5px;
		font-size: 12px;
		background-color: #f8f8f8;
	}
</style>