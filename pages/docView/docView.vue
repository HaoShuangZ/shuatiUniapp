<template>
	<view class="container">
		<view style="padding: 20rpx;">
			<p class="doc-title">{{docDetail.docName}}{{docDetail.type}}</p>
			<view class="doc-info">
				<image :src="docDetail.type === '.docx'?`../../static/doc.png`:`../../static/${docDetail.type}.png`"
					class="icon-type" alt="" />
				&nbsp;
				<text>{{docDetail.updateTime}}</text>
			</view>
			<view class="doc-type">
				<text>{{docDetail.freeFlag?'免费':'开通VIP下载'}}</text>
			</view>
			<view class="doc-tag">
				<text v-for="item in docDetail.tags" :key="item">#{{item}}#</text>
			</view>
		</view>
		<view class="doc-text">
			<text>文档预览</text>
		</view>
		<view class="img-view" alt="">
			<ul>
				<li v-for="item in docDetail.previewImages" :key="item">
					<image class="img-item" :src="item" alt="" />
				</li>
			</ul>
			<!-- <image v-for="item in docDetail.previewImages" width="100%" height="400rpx" :key="item" :src="item" alt="" /> -->
		</view>
		<view class="buttom-view">
			<button class="dowload-btn" @click="downLoadDoc(docDetail.downloadFlag)">文档下载</button>
		</view>
		<!-- <view>
			<web-view :webview-styles="webviewStyles"
				:src="`http://view.xdocin.com/xdoc?_xdoc=`+docDetail.docDownloadUrl"></web-view>
		</view> -->
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="error" cancelText="取消" confirmText="去开通" title="提示" content="您未开通VIP,开通后可以下载!"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
		<uni-popup ref="popup" background-color="#fff" @change="change">
			<view class="popup-content">
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import {
  onLoad,
  onReady,
  onShow
} from '@dcloudio/uni-app'
import {
  baseUrl
} from '@/utils/config.js'
import {
  ref,
  computed,
  reactive,
  getCurrentInstance
} from 'vue';
// 引入全局定义的$http
const currentInstance = getCurrentInstance()
const {
  $http
} = currentInstance.appContext.config.globalProperties
onLoad((params) => {
  console.log(params, '跳转携带的参数', uni.getStorageSync('docDetail'));
})
onShow(() => {
  Object.assign(docDetail, {
    ...uni.getStorageSync('docDetail')
  })
})
let isDownloading = false
const alertDialog = ref(null)
const userInfo = uni.getStorageSync('userInfo')
const downLoadDoc = (url) => {
  if (!userInfo.vipFlag) {
    uni.showModal({
      title: '提示',
      content: '您未开通VIP,开通后可以下载!',
      confirmText: "去开通",
      success: function(res) {
        if (res.confirm) {
          uni.navigateTo({
            url: '../../pages/vip/vip'
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    });
    return
  }
  isDownloading = true
  uni.showToast({
    title: '加载中',
    icon: 'loading'
  });
  uni.downloadFile({
    url: `${baseUrl}/document/download?downloadFlag=${url}`, //仅为示例，并非真实的资源
    header: {
      'Ac-Token': uni.getStorageSync('token') || '',
    },
    success: (res) => {
      console.log(res, '下载的res');
      if (res.statusCode === 200) {
        if (res.header['Content-Type'] === "application/json;charset=utf-8") {
          console.log('res----', res);
          uni.showToast({
            title: `下载次数已上限!`,
            icon: 'error'
          })
          return
        }
        // 保存文件
        uni.saveFile({
          tempFilePath: res.tempFilePath, //下载成功之后返回的临时路径
          success: (e) => {
            console.log('e下载文件的地址', e);
            //保存成功之后 打开文件
            setTimeout(() => {
              uni.hideLoading();
              uni.openDocument({
                filePath: e.savedFilePath,
                success: (res) => {
                  console.log('openDocument', res);
                },
                fail: (e) => {
                  uni.showToast({
                    title: `打开失败` + e
                  })
                }
              })
            }, 200)
          },
          fail: (e) => {
            uni.showToast({
              title: `保存失败` + e
            })
          }
        })
      }
    },
    fail: (e) => {
      isDownloading = false
      uni.showToast({
        title: `文件下载失败` + e,
        icon: "none",
      })
    }
  });
}
let docDetail = reactive({})
</script>

<style lang="scss">
	.container {
		position: relative;
		background-color: #fff;

		.doc-title {
			color: #000;
			font-size: 40rpx;
			font-weight: 600;
		}

		.doc-info {
			margin: 20rpx 0;
			display: flex;
			justify-items: center;
			height: 40rpx;
			line-height: 40rpx;
		}

		.doc-type {
			color: #F15752;
			margin: 10rpx 0;
			display: inline-block;
		}

		.doc-tag {
			margin: 10rpx 10rpx 10rpx 0;
			color: #4674F6;
			font-size: 32rpx;
		}

		.doc-text {
			color: #000;
			padding: 0 20rpx;
			height: 100rpx;
			line-height: 100rpx;
			font-size: 34rpx;
			font-weight: 600;
			border-top: 1px solid #ABABAB;
			border-bottom: 1px solid #ABABAB;
		}

		.buttom-view {
			position: fixed;
			width: 100%;
			bottom: 50rpx;

			.dowload-btn {
				margin: 0 50rpx;
				background-color: #4675f7;
				color: #fff;
				border-radius: 50rpx;
			}
		}

		.icon-type {
			width: 35rpx;
			height: 35rpx;
		}

		.img-view {
			height: 100%;

			.img-item {
				width: 100%;
				height: 1000rpx;
				object-fit: cover;
			}
		}
	}
</style>
