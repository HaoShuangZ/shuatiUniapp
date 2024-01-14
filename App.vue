<script>
export default {
  onLaunch: function() {
    console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  globalData: {
    deviceInfo: uni.getDeviceInfo(),
    isIos: uni.getDeviceInfo().platform == 'ios'
  }
}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import '@/static/iconfont.css';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	$uni-font-size: 16px;

	page {
		background-color: #f5f5f5;
		font-size: $uni-font-size;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	// //导航栏字体
	// .uni-page-head .uni-page-head__title {
	// 	font-size: 30rpx !important;
	// }

	// tab图标
	.uni-tabbar .uni-tabbar__icon {
		width: 25rpx !important;
		height: 25rpx !important;
	}
</style>