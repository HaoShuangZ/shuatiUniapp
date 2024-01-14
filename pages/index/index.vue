<template>
	<page-meta :page-style="'overflow:'+(show?'hidden':'visible')"></page-meta>
	<view class="container">
		<view style="padding:20px;">
			<view class="title">
				<text class="text-title">Hey,早上好</text>
				<image class="img-title" src="../../static/page/search.png" alt="search" />
			</view>
			<view class="messag-text">
				<text>一日之计在于晨，快来刷题通一起学习吧</text>
			</view>
			<view class="smart-img" @click="select">
				<image class="search-img" src="../../static/page/smartResponse.png" alt="smartResponse" />
			</view>
			<view class="text-file-search">
				<image class="search-two" src="../../static/page/text-search.png" alt="" @click="jumpPage(0)" />
				<image class="search-two" src="../../static/page/file-search.png" alt="" @click="jumpPage(1)" />
			</view>
			<uni-section>
				<view class="uni-padding-wrap uni-common-mt">
					<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
						@clickItem="onClickItem" />
				</view>
				<view class="content">
					<view v-if="current === 0" class="doc" :style="{'width': hotDocumentList.length === 0?'100%':null}">
						<view v-if="hotDocumentList.length === 0" class="content-text">暂无数据</view>
						<view class="doc-item" @click="goDocumentView(item)" v-else v-for="item in hotDocumentList"
							:key="item.docId">
							<view class="doc-img">
								<image :src="item.coverImage" style="height: 140rpx;width: 110rpx;" />
							</view>
							<view class="doc-content">
								<text class="item-title">{{item.docName}}</text>
								<text class="item-tags" v-for="(it,idx) in item.tags" :key="it">
									{{it}}
									<text v-if="idx !=item.tags.length-1">|</text>
								</text>
								<text class="download-num">{{item.downloadNum}}下载</text>
							</view>
						</view>

					</view>
					<view v-if="current === 1" class="ans" :style="{'width': answerList.length === 0?'100%':null}">
						<view v-if='answerList.length>0' class="ans-item" v-for="(item,index) in answerList" :key="index"
							@click="answerJump(item)">
							<view class="img-box">
								<image class="ans-icon" src="../../static/constructor/answer.png" alt="" />
							</view>
							<view class="ans-content">
								<text class="ans-title">{{item.category && item.category.categoryName || ''}}</text>
								<view class="ans-text">
									<image class="text-icon" src="../../static/constructor/docNumber.png" alt="" />
									&nbsp;{{item.categoryQuestionNum || 0}}题
								</view>
								<view class="ans-text">
									<image class="text-icon" src="../../static/constructor/time.png" alt="" />
									&nbsp;{{item.createTime}}
								</view>
							</view>
						</view>
						<view v-else class="content-text"
							:style="{'width': answerList.length === 0?'100%':null,'text-align':'center'}">暂无数据</view>
					</view>
				</view>
			</uni-section>
		</view>
		<!-- 	<uni-popup ref="popup" safeArea backgroundColor="#fff" @change="change">
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">
				<text class="text">popup 内容</text>
			</view>
		</uni-popup> -->
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content">
				<view v-if="searchDeatil.length>0" class="popup-text" v-for="(item,index) in searchDeatil" :key="index">
					<text class="question-title">{{index+1}}、{{item.questionTitle}}</text>
					<text class="question-item" v-for="(it,idx) in item.options" :key="idx">
						{{opt[idx]}}、{{it}}
					</text>
					<text class="right-item">正确答案:<text v-for="(it,itx) in item.rightOptions" :key="itx">{{it}}&nbsp;</text>
					</text>
					<br />
					<text class="right-item">解析:{{item.analysis ||'暂无'}}</text>
				</view>
				<view v-else>暂无数据</view>
			</view>
		</uni-popup>
		<!-- <button @click="select">选择图片</button> -->
		<image v-if="path" mode="widthFix" :src="path" />
		<ksp-cropper mode="free" :width="600" :height="440" :maxWidth="1024" :maxHeight="1024" :url="url" @cancel="oncancel"
			@ok="onok"></ksp-cropper>
	</view>
</template>

<script setup>
import {
  ref,
  computed,
  reactive,
  getCurrentInstance
} from 'vue';
import kspCropper from '../../components/Ksp-Cropper'
import wechat from '@/utils/wechat.js'
import {
  pathToBase64,
  base64ToPath
} from 'image-tools'
import {
  onLoad,
  onReady,
  onShow
} from '@dcloudio/uni-app'
// import searchData from './new_file.js'
// 引入全局定义的$http
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
onReady(() => {

})
onShow(() => {
  let token = uni.getStorageSync('token')
  getHotDocument()
  wechat.wxLogin()

  token && getMyAnswerList();
  // token && wechat.wxLogin()
})
onLoad(() => {
  uni.getSystemInfo({
    success: res => {
      console.log('获取当前设备信息', res);
      uni.setStorageSync('phoneInfo', res)
      // wx.setStorageSync('navigationBarHeight', res.safeAreaInsets.top)
      // wx.setStorageSync('navigationBarHeight', res.safeAreaInsets.statusBarHeight)
      console.log('高度', res.screenHeight - res.safeAreaInsets.top - res
        .safeAreaInsets.bottom);
      wx.setStorageSync('screenHeight', res.screenHeight - res.safeAreaInsets.top * 2 + res
        .safeAreaInsets.bottom)
      wx.setStorageSync('safeAreaHeight', res.safeAreaInsets.top * 2 + res
        .safeAreaInsets.bottom)
    }
  });
  // setTimeout(() => {
  //   popup.value.open('bottom')
  //   const {
  //     data: {
  //       records
  //     }
  //   } = searchData
  //   console.log(records, searchData, 'data');
  //   searchDeatil.value = records
  // }, 500)

})
const popup = ref(null)
const opt = ['A', 'B', 'C', 'D']
const jumpPage = (val) => {
  uni.navigateTo({
    url: val === 0 ? '../index/search?type=0' : './docSearch'
  })

  // popup.value.open('bottom')
}
let href = 'https://uniapp.dcloud.io/component/README?id=uniui'
let items = ref(['热门文档', '我的题库'])
let colors = ['#007aff', '#4cd964', '#dd524d']
let current = ref(0)
let colorIndex = ref(0)
let activeColor = ref('#007aff')
let styleType = ref('text')
let imgSrc = ""
let url = ref("")
let path = ref("")
let fileStream = ref('')
let show = ref(true)

// 点击完成时，返回截取图片的临时路径

//#region
const pageParams = reactive({
  page: 1,
  size: 10
})
let hotDocumentList = ref([])
const getHotDocument = () => {
  let opt = {
    params: {
      page: pageParams.page,
      size: pageParams.size
    },
    callBack: (e) => {
      hotDocumentList.value = e.records.filter(item => item.hotFlag)
      console.log(hotDocumentList, '获取分页文档');
    }
  }
  $http('getDocumentList', opt)
}
//#endregion
//#region 拍照上传
const getImg = (e) => {
  imgCropperShow.value = false;
}

const imgSearchQuestion = () => {
  uni.chooseMedia({
    count: 1, //默认9
    mediaType: 'image',
    sourceType: ['camera ', 'album'], //从相册选择
    camera: 'back',
    success: function(res) {
      url.value = res.tempFiles[0]['tempFilePath']
    }
  })
}
const select = () => {
  uni.chooseImage({
    count: 1,
    encoding: 'base64',
    success: (res) => {
      // 设置url的值，显示控件
      url.value = res.tempFilePaths[0];
    },
  });
}
const change = (e) => {
  show.value = e.show
}
const imgToBase64 = (img) => {
  let that = this
  pathToBase64(img)
    .then(base64 => {
      // const arrayBuffer = uni.base64ToArrayBuffer(base64)
      postImgSearch(base64.split('data:image/png;base64,')[1])
    })
    .catch(error => {
      console.error(error)
    })
}
//我的题库收藏列表
let answerList = ref([])
const getMyAnswerList = () => {
  let opt = {
    callBack: (res) => {
      console.log('获取的列表', res);
      answerList.value = res
    }
  }
  $http('indexPageCollectList', opt)
}
const answerJump = (item) => {
  console.log('item', item);
  uni.setStorageSync('pid', item.category.parentId)
  uni.setStorageSync('fCurrentCategoryId', item.category.parentId)
  uni.setStorageSync('currentCategoryId', item.categoryId)
  uni.setStorageSync('currentCategoryDetail', item.category)
  uni.navigateTo({
    url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.category.categoryName}&parentId=${item.category.parentId}`
  });
}
// 拍照搜索
let searchDeatil = ref([])
const postImgSearch = (file) => {
  searchDeatil.value = []
  uni.showLoading({
    title: '加载中'
  });

  let opt = {
    params: {
      ecode: file,
      page: 1,
      size: 10
    },
    callBack: (e) => {
      uni.hideLoading();
      if (e.code = 1200) {
        searchDeatil.value = e.records
        popup.value.open('bottom')
      } else {
        uni.showToast({
          title: e.message,
          icon: 'error',
          duration: 1000
        })
      }
      console.log('e', e);

    }
  }
  $http('imgSearchBase64', opt)
}
//#endregion
const goDocumentView = (item) => {
  console.log(item);
  uni.setStorageSync('docDetail', item)
  uni.navigateTo({
    url: `../docView/docView`
  })
}
const imgUrl = ref('')
const onok = (ev) => {
  url.value = "";
  imgUrl.value = ev.path
  imgToBase64(ev.path)
}

const oncancel = () => {
  // url设置为空，隐藏控件
  url.value = "";
}
const onClickItem = (e) => {
  if (current.value !== e.currentIndex) {
    current.value = e.currentIndex
  }
}
const styleChange = (e) => {
  if (this.styleType !== e.detail.value) {
    this.styleType = e.detail.value
  }
}
const colorChange = (e) => {
  if (this.styleType !== e.detail.value) {
    console.log(e.detail.value);
    this.activeColor = e.detail.value
  }
}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		overflow-y: auto; // padding: 20px;
		font-size: 14px;
		line-height: 24px;

		.title {
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}

		.text-title {
			font-size: 64rpx;
			font-weight: 600;
			font-family: Inter-Bold, Inter;
		}

		.img-title {
			width: 48rpx;
			height: 48rpx;
		}

		.messag-text {
			margin: 20rpx 0;
		}

		.search-img {
			// margin:0 20rpx;
			// border:1px solid;
			// overflow: hidden;
			height: 320rpx;
			width: 90vw;
		}

		.text-file-search {
			display: flex;

			.search-two {
				height: 218rpx;
			}
		}

		.example-body {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			padding: 0;
		}

		.uni-common-mt {
			// margin-top: 30px;
		}

		.uni-padding-wrap {
			// width: 750rpx;
			// padding: 0px 30px;
		}



		.content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			margin: 0 20rpx;
			// justify-content: flex-start;
			flex-wrap: nowrap;
			// align-items: center;
			background-color: #fff;
			border-radius: 20rpx;
			min-height: 500rpx;

			.doc,
			.ans {
				height: auto;
				overflow-y: auto;
				// width: 100%;
				// display: flex;
				// width: 100%;
				// text-align: center;
				justify-content: center;
				padding: 0 20rpx;
			}

			.ans-item {
				height: 100rpx;
				// border: 1px solid #999999;
				display: flex;
				align-items: center;
			}

			.img-box {
				margin: 0 30rpx;
				align-items: center;
				display: flex;

				.ans-icon {
					width: 80rpx;
					height: 80rpx;
				}
			}

			.ans-content {
				display: flex;
				flex-wrap: wrap;
			}

			.ans-item {
				display: flex;
				flex-wrap: nowrap;
				justify-content: center;
			}

			.ans-title {
				overflow: hidden;
				text-overflow: ellipsis;
				width: 100%;
				font-size: 28rpx;
				color: #000000;
				font-weight: bold;
			}

			.ans-text {
				display: flex;
				align-items: center;
				height: 40rpx;
				line-height: 40rpx;
				font-size: 25rpx;
				color: #999999;
				margin-right: 20rpx;
			}

			.text-icon {
				width: 30rpx;
				height: 30rpx;
			}

			.doc-item {
				display: flex;
				height: 120rpx;
				padding: 0 20rpx;

				.doc-img {
					height: 120rpx;
					margin-top: 20rpx;
				}

				.doc-content {
					width: 550rpx;
					height: 120rpx;
					display: flex;
					flex-wrap: wrap;
					margin-top: 20rpx;

					.item-title {
						margin-left: 20rpx;
						font-size: 30rpx;
						font-weight: 600;
						width: 100%;
						// display: inline-block;
					}

					.item-tags {
						margin-left: 20rpx;
						font-size: 25rpx;
						color: #666666;
						// width: 100%;
						// display: inline-block;
					}

					.download-num {
						width: 100%;
						margin-left: 20rpx;
					}
				}
			}

		}

		.content-text {
			width: 100%;
			display: flex;
			text-align: center;
			justify-content: center;
			font-size: 14px;
			color: #666;

		}

		.color-tag {
			width: 25rpx;
			height: 25rpx;
		}

		.uni-list {
			flex: 1;
		}

		.uni-list-item {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex: 1;
			flex-direction: row;
			// background-color: #FFFFFF;
		}


		.uni-list-item__container {
			padding: 12rpx 15rpx;
			width: 100%;
			flex: 1;
			overflow-y: auto;
			position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			box-sizing: border-box;
			/* #endif */
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			border-bottom-style: solid;
			border-bottom-width: 1px;
			border-bottom-color: #eee;
		}

		.uni-list-item__content-title {
			font-size: 14px;
		}

		@mixin flex {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
		}

		.uni-section {
			background-color: none;
		}

		.popup-content {
			flex-wrap: wrap;
			padding: 15px;
			height: 80vh;
			overflow-y: auto;
			background-color: #fff;

			.popup-text {
				@include flex;
				flex-direction: row;
				flex-wrap: wrap;
				width: 100%;
			}

			.question-title {
				flex-direction: row;
				font-size: 34rpx;
				align-items: flex-start;
			}

			.question-item {
				display: flex;
				font-size: 30rpx;
				width: 100%;
			}

			.right-item {
				display: flex;
				width: 100%;
				font-size: 30rpx;
			}
		}

		.question-title {
			font-size: 30rpx;
			font-weight: 600;
		}
	}
</style>