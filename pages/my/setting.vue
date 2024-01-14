<template>
	<view class="container">
		<view class="nav-list">
			<text class="text-left">头像</text>
			<image style="width: 34px;height: 34px;" src="../../static/my/maskGroup.png" alt="" />
		</view>
		<view class="nav-list">
			<text class="text-left">昵称</text>
			<text>{{myList.nickName}}</text>
		</view>
		<!-- <view class="nav-list">
			<text class="text-left">ID</text>
			<text>{{myList.headPicture}}</text>
		</view> -->
		<view class="nav-list">
			<text class="text-left">绑定手机号</text>
			<text>{{myList.mobilephone}}</text>
		</view>
		<view class="nav-list" @click="goModifyUserInfo">
			<text class="text-left">修改个人信息</text>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
		<!-- <view class="nav-list">
			<text class="text-left">绑定微信</text>
			<text>{{myList.headPicture}}</text>
		</view> -->
		<view class="nav-list">
			<text class="text-left">注销账号</text>
			<uni-icons type="forward" size="16"></uni-icons>
			<!-- <text>{{myList.headPicture}}</text> -->
		</view>
		<view class="nav-list nav-bottom" @click="exit">
			<text class="text-bottom">退出登陆</text>
			<!-- <text>{{myList.headPicture}}</text> -->
		</view>
		<view>
			<!-- 提示窗示例 -->
			<uni-popup ref="alertDialog" type="dialog">
				<uni-popup-dialog type="error" cancelText="取消" confirmText="退出" title="通知" content="是否要退出登陆"
					@confirm="dialogConfirm" @close="dialogClose"></uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script>
export default {
  onLoad() {
    console.log('onShow')
    this.init()
  },
  data() {
    return {
      myList: {
        headPicture: '',
        nickName: '',
        id: '',
        mobilephone: '',
        bindWeChart: '',
      },
      textLeft: ['头像', '昵称', 'ID', '绑定手机号', '绑定微信', '注销账号'],
    }
  },
  methods: {
    init() {
      let {
        nickName,
        mobilephone
      } = uni.getStorageSync('userInfo')
      console.log('nickName', nickName, mobilephone)
      this.myList.nickName = nickName
      this.myList.mobilephone = mobilephone
    },
    exit() {
      this.$refs.alertDialog.open()
    },
    dialogClose() {
      this.$refs.alertDialog.close()
    },
    goModifyUserInfo() {
      uni.navigateTo({
        url: '../my/userInfoModify'
      });
    },
    dialogConfirm() {
      uni.clearStorage()
      uni.switchTab({
        url: '/pages/my/my',
      })
    }
  }
}
</script>

<style scoped lang="scss">
	.container {
		background-color: #f7f7f7;
		display: flex;
		flex-wrap: wrap;

		.nav-list {
			width: 100vw;
			height: 60px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			background-color: #ffffff;
			border-top: 1px solid #ababab;

			.text-left {
				font-weight: 600;
			}
		}

		.nav-bottom {
			bottom: 20px;
			padding: 0;
			display: flex;
			justify-content: center;
			position: absolute;
			border: none;
			text-align: center;

			.text-bottom {
				font-weight: 600;
			}
		}

		::v-deep .uni-button-color {
			color: #dd524d !important;
		}
	}
</style>