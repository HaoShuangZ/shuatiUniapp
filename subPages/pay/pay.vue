<template>
	<view>
		<view class="header"
			:style="current === 1?'background-color: #4674f6;':'background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)'">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
					@clickItem="onClickItem" />
			</view>
			<view class="content" v-if="current===0">
				<view class="model_scrollx flex_row">
					<scroll-view :show-scrollbar="false" class="uni-swiper-tab" scroll-x>
						<view class="scrollx_items"
							:class="{'currentSelectSvip':current==0 && currentIndex === index,'currentSelectVip':current==1 && currentIndex === index}"
							v-for="(item,index) in vipPayType[0]" :key="item" @click="selectPayType(item,index)">
							<view class="item-flex">
								<view class="iteme-text " :class="{'labelSvip':''}">{{item.label}}</view>
								<text class="iteme-text price-total">￥<text
										style="font-size: 60rpx;text-decoration: line-through">{{item.priceTotal}}</text></text>
								<view class="iteme-text price" :class="{'currentSelectColor':currentIndex === index}"
									style="text-decoration: line-through">{{item.price}}
								</view>
							</view>
						</view>
					</scroll-view>
					<text class="title-text">VIP会员专享10项特权</text>
					<view class="vip-card">
						<view class="card-flex">
							<view class="card-item" v-for="(item,index) in vipPrivilege3" :key="index">
								<img class="card-img" :src="item.img" alt="">
								<view class="item-text">
									<text>{{item.text1}}</text>

									<text>{{item.text2}}</text>
								</view>
							</view>
						</view>
						<view class="card-flex">
							<view class="card-item" v-for="(item,index) in vipPrivilege4" :key="index">
								<img class="card-img" :src="item.img" alt="">
								<view class="item-text">
									<text>{{item.text1}}</text>
									<text>{{item.text2}}</text>
								</view>
							</view>
						</view>
					</view>
					<button v-if="isIos" class="pay-btn" @click="userWxPay(vipPayType[current][currentIndex])">立即开通</button>
					<button v-else class="pay-btn" disabled="true">暂时不支持ios设备支付</button>
				</view>
			</view>
			<view class="content" v-else>
				<view class="model_scrollx flex_row">
					<scroll-view :show-scrollbar="false" class="uni-swiper-tab" scroll-x>
						<view class="scrollx_items" :class="{'currentSelectVip':currentIndex === index}"
							v-for="(item,index) in vipPayType[1]" :key="index" @click="selectPayType(item,index)">
							<view class="item-flex">
								<view class="iteme-text " :class="{'label-vip':currentIndex === index}">{{item.label}}</view>
								<text class="iteme-text price-total" :class="{'price-total-vip':true}">￥<text
										style="font-size: 60rpx;text-decoration: line-through">{{item.priceTotal}}</text></text>
								<view style="text-decoration: line-through" class="iteme-text price"
									:class="{'price-vip':currentIndex === index}">{{item.price}}</view>
							</view>
						</view>
					</scroll-view>
					<!-- <button class="pay-btn-vip" @click="userWxPay(vipPayType[current][currentIndex])">立即开通</button> -->
					<text class="title-text">VIP会员专享10项特权</text>
					<view class="vip-card">
						<view class="card-flex">
							<view class="card-item" v-for="(item,index) in vipPrivilege" :key="index">
								<img class="card-img" :src="item.img" alt="">
								<view class="item-text">
									<text>{{item.text1}}</text>
									<text>{{item.text2}}</text>
								</view>
							</view>
						</view>
						<view class="card-flex">
							<view class="card-item" v-for="(item,index) in vipPrivilege2" :key="index">
								<img class="card-img" :src="item.img" alt="">
								<view class="item-text">
									<text>{{item.text1}}</text>
									<text>{{item.text2}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- <text class="title-text">专享服务介绍</text>
					<uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="currentImgIndex" mode="default"
						:dots-styles="dotsStyles" field="content">
						<swiper class="swiper-box" @change="change" :current="currentImgIndex">
							<swiper-item v-for="(item, index) in info" :key="index">
								<image :src="item.url" class="image"></image>
							</swiper-item>
						</swiper>
					</uni-swiper-dot> -->
				</view>
				<button v-if="isIos" class="pay-btn-vip" @click="userWxPay(vipPayType[current][currentIndex])">立即开通</button>
				<button v-else class="pay-btn-vip">暂时不支持ios设备支付</button>
			</view>
		</view>
	</view>
</template>

<script>
// import crypto from 'crypto-js'
// const MD5 = require('../../utils/mad5')
export default {
  onShow(res) {
    console.log('跳转支付页面', res);
    console.log('分包页面');
    console.log('this.globalData.deviceInfo', getApp().globalData);
  },
  data() {
    return {
      currentImgIndex: 0,
      info: [{
        colorClass: 'uni-bg-red',
        url: '../../static/vip/vip-closeAd.png',
        content: '内容 A'
      }
        // {
        //   colorClass: 'uni-bg-green',
        //   url: '../../static/vip/vip-closeAd1.png',
        //   content: '内容 B'
        // },
        // {
        //   colorClass: 'uni-bg-blue',
        //   url: '../../static/vip/vip-closeAd2.png',
        //   content: '内容 C'
        // },
        // {
        //   colorClass: 'uni-bg-blue',
        //   url: '../../static/vip/vip-closeAd3.png',
        //   content: '内容 C'
        // }
      ],
      activeColor: '#fff',
      current: 0,
      currentIndex: 0,
      items: ['SVIP会员', 'VIP会员'],
      titleList: ['搜题服务', '文档服务', '刷题服务', '其他服务'],
      styleType: 'text',
      vipPayType: [],
      vipType: [{
        label: '连续包月',
        priceTotal: '68',
        price: 'SVIP特属优惠'
      }, {
        label: '12个月',
        priceTotal: '988',
        price: '82.3/月',
      }, {
        label: '6个月',
        priceTotal: '988',
        price: '82.3/月',
      }, {
        label: '3个月',
        priceTotal: '988',
        price: '82.3/月',
      }],
      vipPrivilege: [{
        img: '../../static/vip/vip-search.png',
        text1: '搜题服务',
        text2: '800次/月'
      }, {
        img: '../../static/vip/vpi-book.png',
        text1: '可刷题库',
        text2: '20个/月'
      }, {
        img: '../../static/vip/vip-down.png',
        text1: '文档下载',
        text2: '30个/月'
      }, {
        img: '../../static/vip/vio-start.png',
        text1: '收藏题库',
        text2: '20个/月'
      }, {
        img: '../../static/vip/vip-exam.png',
        text1: '题库练习记录',
        text2: '练习记录保留180天',
      }],
      vipPrivilege2: [{
        img: '../../static/vip/vip-history.png',
        text1: '模拟考试历史记录',
        text2: '保留考试历史记录'
      }, {
        img: '../../static/vip/vip-noAd.png',
        text1: 'APP搜题无广告',
        text2: '搜题时不显示广告'
      }, {
        img: '../../static/vip/vip-err.png',
        text1: '高频错题',
        text2: '精选高频易错题'
      }, {
        img: '../../static/vip/vip-exam.png',
        text1: '模拟考试',
        text2: '随机抽题仿真模拟'
      }, {
        img: '../../static/vip/vip-no.png',
        text1: 'App刷题无广告',
        text2: '刷题时不显示广告'
      }],
      vipPrivilege3: [{
        img: '../../static/vip/1.png',
        text1: '搜题服务',
        text2: '800次/月'
      }, {
        img: '../../static/vip/2.png',
        text1: '可刷题库',
        text2: '20个/月'
      }, {
        img: '../../static/vip/3.png',
        text1: '文档下载',
        text2: '30个/月'
      }, {
        img: '../../static/vip/4.png',
        text1: '收藏题库',
        text2: '20个/月'
      }, {
        img: '../../static/vip/5.png',
        text1: '题库练习记录',
        text2: '练习记录保留180天',
      }],
      vipPrivilege4: [{
        img: '../../static/vip/6.png',
        text1: '模拟考试历史记录',
        text2: '保留考试历史记录'
      }, {
        img: '../../static/vip/7.png',
        text1: 'APP搜题无广告',
        text2: '搜题时不显示广告'
      }, {
        img: '../../static/vip/8.png',
        text1: '高频错题',
        text2: '精选高频易错题'
      }, {
        img: '../../static/vip/9.png',
        text1: '模拟考试',
        text2: '随机抽题仿真模拟'
      }, {
        img: '../../static/vip/10.png',
        text1: 'App刷题无广告',
        text2: '刷题时不显示广告'
      }],
      documentList: []
    };
  },
  watch: {

  },
  onLoad() {
    this.postVipList()
  },
  isIos() {
    return getApp().globalData.platform == 'ios'
  },
  methods: {
    change(e) {
      this.currentImgIndex = e.detail.current;
    },
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex
        console.log('e.currentIndex', e.currentIndex);
        this.currentIndex = 0
        if (this.current === 1) {
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#4674F6',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
          })
        } else {
          this.currentIndex = 0
          uni.setNavigationBarColor({
            frontColor: '#ffffff',
            backgroundColor: '#28241C',
            animation: {
              duration: 400,
              timingFunc: 'easeIn'
            }
          })
        }
      }
    },
    postVipList() {
      let opt = {
        params: {
          "type": "",
          "page": "",
          "size": ""
        },
        callBack: (res) => {
          console.log(res.records, '会员信息1')
          let paySvipInfo = []
          let payVipInfo = []
          res.records.map((item, index) => {
            if (index === 0) {
              paySvipInfo = [{
                vipCode: '1002',
                label: '12个月',
                priceTotal: item.yearPrice,
                desc: item.vipType,
                payType: 'year_price',
                vipId: item.vipConfigId,
                price: Number((item.yearPrice / 12).toFixed(2)) + '/月'
              }, {
                vipCode: '1002',
                label: '3个月',
                priceTotal: item.quarterPrice,
                desc: item.vipType,
                vipId: item.vipConfigId,
                payType: 'quarter_price',
                price: Number((item.quarterPrice / 3).toFixed(2)) + '/月'
              },
              {
                vipCode: '1002',
                label: '1个月',
                priceTotal: item.monthPrice,
                desc: item.vipType,
                vipId: item.vipConfigId,
                payType: 'month_price',
                // price: Number((item.monthPrice / 12).toFixed(2)) + '/月'
              }
              ]
            }
            if (index === 1) {
              payVipInfo = [{
                vipCode: '1001',
                label: '12个月',
                priceTotal: item.yearPrice,
                desc: item.vipType,
                payType: 'year_price',
                vipId: item.vipConfigId,
                price: Number((item.yearPrice / 12).toFixed(2)) + '/月'
              }, {
                vipCode: '1001',
                label: '3个月',
                priceTotal: item.quarterPrice,
                desc: item.vipType,
                vipId: item.vipConfigId,
                payType: 'quarter_price',
                price: Number((item.quarterPrice / 3).toFixed(2)) + '/月'
              },
              {
                vipCode: '1001',
                label: '1个月',
                priceTotal: item.monthPrice,
                desc: item.vipType,
                vipId: item.vipConfigId,
                payType: 'month_price',
                // price: Number((item.monthPrice / 12).toFixed(2)) + '/月'
              }
              ]
            }
          })
          this.vipPayType = [
            [...paySvipInfo],
            [...payVipInfo]
          ]
        }
      }

      this.$http('postVipList', opt)
    },
    userWxPay(val) {
      console.log('支付选项', val);
      // uni.navigateTo({
      //   url: `../pay/pay?current${this.current}`
      // })
      let opt = {
        params: {
          "vipCode": val.vipCode,
          "desc": val.desc,
          "payType": val.payType,
          "vipId": val.vipId
        },
        callBack: (res) => {
          console.log('调用微信支付后', res);
          this.wxRequestPayment(res)
        }
      }
      // #ifndef MP-WEIXIN
      this.$http('wxH5Pay', opt)
      // #endif
      // #ifdef MP-WEIXIN
      this.$http('wxPay', opt)
      // #endif

    },
    selectPayType(item, index) {
      this.currentIndex = index
    },
    wxRequestPayment(res) {
      wx.requestPayment({
        timeStamp: res.timeStamp, //时间戳
        nonceStr: res.nonceStr, //随机字符串
        package: res.package, //订单详情扩展字符串
        signType: res.signType, //签名方式
        paySign: res.paySign,
        success(res) {
          console.log('res调用微信支付', res)
          uni.showToast({
            title: '开通成功!',
            icon: 'success',
            duration: '1500'
          })
          setTimeout(() => {

          }, 2000)
        },
        fail(res) {}
      })
    }

  }
}
</script>
<style lang="scss">
	.swiper-box {
		height: 650rpx;
	}


	// @media screen and (min-width: 500px) {
	// 	.uni-swiper-dot-box {
	// 		width: 400px;
	// 		margin: 0 auto;
	// 		margin-top: 8px;
	// 	}


	// }
	.image {
		width: 100%;
		height: 650rpx;
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>


<style lang="scss">
	.currentSelectSvip {
		color: #9F6020 !important;
		background: linear-gradient(90deg, #E3AE59 0%, #F7E2AF 100%);
	}

	.currentSelectVip {
		color: #999999 !important;
		border-radius: 20rpx;
		border: 1px solid #4674F6 !important;
		background: #FAFAFA;
	}


	/* 二级菜单设置左右滑动 */
	.uni-swiper-tab {
		white-space: nowrap;
	}

	.model_scrollx {
		// display: flex;
		// flex-wrap: nowrap;
		justify-content: space-between;
		// height: 255px;
		/* background-color: #F1EFEF; */
		align-items: center;
	}

	.scrollx_items {
		border: 1px solid #fff;
		background-color: #fff;
		// display: flex;
		// flex-wrap: wrap;
		// text-align: center;
		// display:
		border-radius: 20rpx;
		display: inline-block;
		padding: 50rpx 0;
		width: 190rpx;
		height: 150rpx;
		// box-sizing: border-box;
		margin: 10rpx 20rpx 30rpx 20rpx;

		.item-flex {
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			justify-content: center;
			text-align: center;
		}


		.iteme-text {
			font-size: 27rpx;
		}

		.title-text {
			color: #000000;
			font-size: 36rpx;
			font-family: 600;
		}

		.label {
			font-weight: bold;
		}

		.label-vip {
			font-weight: bold;
			color: #000000
		}

		.price-total {
			color: #9F6020;
		}

		.price-total-vip {
			color: #4674F6;
			// font-weight: bold;
		}

		.price {
			color: #999999;
		}

		.price-vip {
			color: #999999;
		}

		.currentSelectColor {
			color: #9F6020
		}
	}

	.pay-btn {
		background: linear-gradient(90deg, #E2AC57 0%, #F7E3B0 100%);
		margin: 0 20rpx;
		border-radius: 50rpx;
	}

	.pay-btn-vip {
		margin-bottom: 0;
		background: #4674F6;
		color: #fff;
		margin: 0 20px 20rpx;
		border-radius: 50rpx;
	}

	.scrollx_items text {
		display: inline-block;
	}

	.scrollx_items:last-child {
		margin-right: 30rpx;
	}

	.scrollx_items image {
		width: 70rpx;
		height: 66rpx;
	}

	.tgyx_title {
		font-size: 28rpx;
		color: #333333;
		margin-top: 30rpx;
	}

	.tgyx_desc {
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.header {
		padding-top: 77.9rpx;
		background-color: #4674f6;
		color: #fff;
	}

	.content {
		margin-top: 36.23rpx;
		width: 100%;
		border-radius: 32.61rpx 32.61rpx 0 0;
		// height: 1211.59rpx;
		// height: 85vh;
		background-color: #f8f8f8;
		color: #000;
		// text-align: center;
		display: flex;
		flex-direction: column;
		// align-items: center;
		padding: 10px;
		box-sizing: border-box;
		font-size: 36rpx;

		.Equity_list {
			width: 100%;

			.Equity_title {
				width: 100%;
				height: 50rpx;
				font-size: 36rpx;
				font-family: PingFang SC-Bold, PingFang SC;
				font-weight: bold;
				color: #4674F6;
				text-align: center;
				line-height: 42rpx;
				margin: 23rpx 0;
				// -webkit-background-clip: text;
				// -webkit-text-fill-color: transparent;
			}

			.Equity_item {
				width: 100%;
				height: 92rpx;
				background: #F7F7F7;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 40rpx;
				box-sizing: border-box;
			}
		}

	}

	.btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 186rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid #ABABAB;

		view {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 687rpx;
			height: 83rpx;
			background: #4674F6;
			border-radius: 108rpx 108rpx 108rpx 108rpx;
			opacity: 1;
			font-size: 31rpx;
			font-family: PingFang SC-Bold, PingFang SC;
			font-weight: bold;
		}
	}

	.segmented-control__text {
		color: #fff !important;
	}

	:v-deep .segmented-control__item {
		color: #fff !important;
	}

	.vip-card {
		display: flex;
		flex-direction: row;
	}

	.card-flex {
		margin: 20rpx 0;
		overflow-x: auto;

		.card-item {
			font-size: 26rpx !important;
			width: 85%;
			height: 140rpx;
			border-radius: 20rpx;
			display: flex;
			margin: 10rpx 0;
			padding: 0 20rpx;
			align-items: center;
			margin-right: 40rpx;
			background: #fff;

			.item-text {
				display: flex;
				flex-direction: column;
				margin-left: 10rpx;
			}

			.card-img {
				height: 66rpx;
				width: 66rpx;
			}

		}
	}
</style>