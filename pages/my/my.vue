<template>
	<view class="container">
		<!-- <view class="uni-padding-wrap uni-common-mt">
			<button class="uni-primary-bg" @click="login">登陆</button>
		</view> -->
		<view class="avatar-info">
			<uni-row class="header-uni">
				<uni-col :span="4">
					<!-- <image class="avatar-img" src="../../static/my/maskGroup.png" alt="" /> -->
					<image class="avatar-img" src="../../static/my/maskGroup.png" alt="" />
				</uni-col>
				<uni-col v-if="!userInfo.nickName" :span="20">
					<!-- @click="login" -->
					<view @click="login" class="user-phone">
						<!-- <text class="phone" @click="getUserInfo">登陆刷题通</text><br /> -->
						<button class="login-btn" size="mini" type="primary" open-type="getUserInfo" withCredentials="true"
							@getuserinfo="bindGetUserInfo">登陆刷题通</button>
						<text class="id-num"></text>
					</view>
				</uni-col>
				<uni-col v-else :span="20">
					<view class="user-phone">
						<text class="phone">{{userInfo.nickName}}</text><br />
						<text class="id-num">{{userInfo.mobilephone}}</text>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<uni-row>
			<view v-for="(item, index) in iconList" :index="index" :key="index" @click="jumpPage(item)">
				<uni-col :span="6">
					<view class="grid-item-box">
						<image class="icon-img" :src="item.img" :alt="item.text" />
						<text class="text">{{item.text}}</text>
					</view>
				</uni-col>
			</view>
		</uni-row>
		<uni-row>
			<view class="item-vip" v-if="userInfo.vipFlag==1001 || userInfo.vipFlag==1002" @click="goVip">
				<view class="vip-text">{{vipType}}</view>
				<view class="vip-text-down">{{vipDownNum}}</view>
				<image class="img-vip" src="../../static/my/vip-bc.png" alt="vip" width="100%" />
			</view>
			<view class="item-vip" v-else @click="goVip">
				<image class="img-vip" src="../../static/my/VIP.png" alt="vip" width="100%" />
			</view>
		</uni-row>
		<uni-row>
			<view class="nav-list">
				<view class="nav-item" v-for="(item,index) in navList" :key="index">
					<view class="nav-icon">
						<image class="nav-img" :src="item.img" alt="item.text" width="64px" />
					</view>
					<view class="nav-box" @click="navigatorToPage(item.navigator)">
						<text>{{item.text}}</text>
						<view>
							<uni-badge v-if="index===0 && value>0" :custom-style="{'marginTop':'20rpx','marginLeft':'100rpx'}"
								class="uni-badge-left-margin" :is-dot="truea" :text="value" absolute="rightTop" size="small">
								<uni-icons type="forward" size="16"></uni-icons>
							</uni-badge>
							<uni-icons v-else type="forward" size="16"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</uni-row>
	</view>
</template>

<script>
import wechat from '@/utils/wechat.js'

import {
  computed
} from 'vue'
export default {
  onLooad() {
    console.log('onload');
  },
  onShow() {
    console.log('123---------');
    let token = uni.getStorageSync('token')
    let userInfo = uni.getStorageSync('token')
    console.log('userInfo', userInfo);
    if (userInfo) {
      this.init()
      this.getVipStatic()
      this.getMessage()
    } else {
      this.userInfo = {}
    }

  },
  computed: {
    vipType() {
      let info = this.userInfo
      let vipType = {
        1001: `VIP会员(${info.vipExpirationTime})到期`,
        1002: `SVIP会员(${info.vipExpirationTime})到期`
      } [info.vipFlag]
      return vipType
    },
    vipDownNum() {
      let info = this.vipStatistic
      return `剩余下载次数${info.downloadCount || 0} 剩余搜索次数${info.searchCount || 0}`
    }
  },
  data() {
    return {
      value: 0,
      userInfo: {},
      minAppNewUserFlag: true,
      vipStatistic: {},
      iconList: [{
        img: '../../static/my/collage.png',
        url: './myCollect/myCollect',
        text: '我的收藏',
      }, {
        img: '../../static/my/history.png',
        text: '搜题记录',
        url: "./searchHistory/searchHistory",
      }, {
        img: '../../static/my/down.png',
        text: '文档下载',
        url: "./docDownList/docDownList",
      }, {
        img: '../../static/my/questionErr.png',
        text: '全部错题',
        url: "./errQuestionList/errQuestionList",
      }],
      navList: [{
        img: '../../static/my/Notifications.png',
        navigator: "./message/message",
        text: '我的消息',
      }, {
        img: '../../static/my/inviteCode.png',
        text: '输入邀请码',
        navigator: './cdKey/cdKey'
      }, {
        img: '../../static/my/help.png',
        text: '帮助中心',
        navigator: './help/help'
      }, {
        img: '../../static/my/feedback.png',
        text: '意见反馈',
        navigator: '../addErrorQuestion/index?feedType=feedBack'
      },
      // {
      //      img: '../../static/my/share.png',
      //      text: '分享给好友',
      //      url: ''
      //    }, 
      {
        img: '../../static/my/Settings.png',
        text: '设置',
        navigator: './setting'
      },
      ]
    };
  },
  methods: {
    jumpPage(item) {
      uni.navigateTo({
        url: item.url
      })
    },
    login() {
      console.log('navigateTo')
      uni.navigateTo({
        url: '../login/login',
        animationType: 'slide-in-top',
        animationDuration: 200
      });
    },
    getMessage() {
      let opt = {
        params: {},
        callBack: (res) => {
          this.messageList = res.records
          let num = 0
          res.records.map(item => {
            if (!item.readFlag) {
              num += 1
              console.log('num', num);
            }
          })
          this.value = num
        }
      }
      this.$http('getMessageList', opt)
    },
    getVipStatic() {
      let opt = {
        params: {},
        callBack: (res) => {
          console.log('res用户返回的数据', res);
          uni.setStorageSync('vipStatistic', res)
          this.vipStatistic = res
        },
      }
      this.$http('getVipStatic', opt)
    },
    init() {
      let userInfoStore = uni.getStorageSync('userInfo')
      //minAppNewUserFlag 用户已经登陆
      if (userInfoStore) {
        this.userInfo = userInfoStore
        this.minAppNewUserFlag = userInfoStore.minAppNewUserFlag
      } else {
        // wechat.wxLogin()
        setTimeout(() => {
          this.userInfo = uni.getStorageSync('userInfo')
        }, 500)

      }
    },
    navigatorToPage(e) {
      console.log('e', e)
      uni.navigateTo({
        url: e
      });
    },
    bindGetUserInfo(e) {
      uni.setStorageSync('encryptedDataUserInfo', e.detail.encryptedData)
      uni.setStorageSync('ivUserInfo', e.detail.iv)
    },
    goVip() {
      uni.navigateTo({
        url: '../vip/vip'
      });
    },
    change() {
      console.log('点击')
    }
  }
}
</script>

<style lang="scss">
	.container {
		background-color: $uni-bg-color;
		// padding:20px;
		// width: 90%;
		height: 100%;
		// border: 1px solid;

		.avatar-info {
			padding: 0 20px;

			.avatar-img {
				width: 64px;
				height: 64px;
			}

			.user-phone {
				width: 100%;
				padding-top: 10px;
				padding-left: 20px;

				.login-btn {
					// width: 100px;
					background-color: #4674f6;
					border: none;
				}

				.phone {
					font-size: 20px;
					font-weight: 600;
				}

				.id-num {
					color: #666666;
				}
			}

			// border: 1px solid;
		}

		.icon-List {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-wrap: nowrap;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}

		.grid-item-box {
			border: none;
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;

			.icon-img {
				width: 42px;
				height: 42px;
			}

			.text {
				font-size: 14px;
				margin-top: 10px;
			}
		}

		.item-vip {
			padding: 20px;
			position: relative;

			.img-vip {
				width: 100%;
				height: 108px;
			}

			.vip-text {
				position: absolute;
				z-index: 10;
				padding-top: 35rpx;
				padding-left: 20rpx;
				color: #9F6020;
			}

			.vip-text-down {
				position: absolute;
				z-index: 10;
				padding-top: 90rpx;
				padding-left: 20rpx;
				color: #9F6020;
			}
		}

		.nav-list {
			padding: 0 20px;

			.nav-item {
				// border: 1px solid;
				height: 50px;
				display: flex;
				flex-wrap: nowrap;
				align-items: center;

				.nav-icon {
					width: 50px;
					// height: 60px;
					// line-height: 60px;
					padding-top: 5px;

					.nav-img {
						width: 24px;
						height: 24px;
					}
				}

				.nav-box {
					display: flex;
					justify-content: space-between;
					width: calc(100vh - 200px);
					height: 40px;
					line-height: 40px;
					margin-left: 15px;
					padding-left: 5px;
					border-bottom: 1px solid #c2c2c2 !important;
					// line-height: 60px;
				}
			}

			.nav-item:not(:last-child) {
				// border-bottom: 1px solid #c2c2c2!important;
			}



		}
	}
</style>