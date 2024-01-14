<template>
	<view>
		<div class="header"
			:style="current === 0||current === 1?'background-color: #4674f6;':'background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)'">
			<view class="uni-padding-wrap uni-common-mt">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType" :active-color="activeColor"
					@clickItem="onClickItem" />
			</view>
			<!-- <image src="../../static/my/right.png" style="width: 30rpx;height: 30rpx;" /> -->
			<!-- <image src="../../static/my/error.png" width="30rpx" height="30rpx" /> -->
			<!-- <uni-icons type="closeempty" size="30" color="#222221"></uni-icons> -->
			<view class="content">
				<view class="Equity_list">
					<!-- <view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">
						{{item.title}}
					</view>
					<view class="Equity_item" v-for="(items,indexs) in item.list" :key="indexs">
						<text class="name">{{items.name}}</text>
						<text class="num">{{items.num[current]}}</text>
					</view> -->
					<view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">
						搜题服务
					</view>
					<view class="Equity_item">
						<text class="name">搜题次数</text>
						<text class="num">{{documentList[current]?.exerciseRecordMaxDay}}次/月</text>
					</view>
					<view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">
						文档服务
					</view>
					<view class="Equity_item">
						<text class="name">文档下载</text>
						<text class="num">{{documentList[current]?.monthDownloadDocNum}}次/月</text>
					</view>
					<view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">
						刷题服务
					</view>
					<view class="Equity_item">
						<text class="name">可刷题库</text>
						<text class="num">{{documentList[current]?.categoryNum}}次/月</text>
					</view>
					<view class="Equity_item white">
						<text class="name">收藏题库</text>
						<text class="num">{{documentList[current]?.collectCategoryNum}}个</text>
					</view>
					<view class="Equity_item">
						<text class="name">题库练习记录</text>
						<text class="num">保存{{documentList[current]?.exerciseRecordMaxDay}}天</text>
					</view>
					<view class="Equity_item white" :class="{'isHidden':!documentList[current]?.highFrequencyError}">
						<text class="name">高频错题</text>
						<view class="num">
							<uni-icons v-if="documentList[current]?.highFrequencyError" type="checkmarkempty" size="30"
								color="#222221"></uni-icons>
							<uni-icons v-else type="closeempty" size="30" color="#b2b2b2"></uni-icons>
						</view>
					</view>
					<view class="Equity_item" :class="{'isHidden':!documentList[current]?.mockExamination}">
						<text class="name">模拟考试</text>
						<view class="num">
							<uni-icons v-if="documentList[current]?.mockExamination" type="checkmarkempty" size="30"
								color="#222221"></uni-icons>
							<uni-icons v-else type="closeempty" size="30" color="#b2b2b2"></uni-icons>
						</view>
					</view>
					<view class="Equity_item white" :class="{'isHidden':!documentList[current]?.optionOutOfOrder}">
						<text class="name">选项乱序</text>
						<view class="num">
							<uni-icons v-if="documentList[current]?.optionOutOfOrder" type="checkmarkempty" size="30"
								color="#222221"></uni-icons>
							<uni-icons v-else type="closeempty" size="30" color="#b2b2b2"></uni-icons>
						</view>
					</view>
					<view class="Equity_item" :class="{'isHidden':!documentList[current]?.errorPriority}">
						<text class="name">错题优先</text>
						<view class="num">
							<uni-icons v-if="documentList[current]?.errorPriority" type="checkmarkempty" size="30"
								color="#222221"></uni-icons>
							<uni-icons v-else type="closeempty" size="30" color="#b2b2b2"></uni-icons>
						</view>
					</view>
					<view class="Equity_item white" :class="{'isHidden':!documentList[current]?.undonePriority}">
						<text class="name">未做题优先</text>
						<view class="num">
							<uni-icons v-if="documentList[current]?.undonePriority" type="checkmarkempty" size="30"
								color="#222221"></uni-icons>
							<uni-icons v-else type="closeempty" size="30" color="#b2b2b2"></uni-icons>
						</view>
					</view>

					<view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">
						其他服务
					</view>
					<view class="Equity_item">
						<text class="name">APP刷题无广告</text>
						<text class="num">{{documentList[current]?.searchWithoutAds?'无广告':'有广告'}}</text>
					</view>
				</view>
			</view>
			<view class="btn">
				<!-- v-if="!phoneInfo.osName !='ios'" -->
				<view
					:style="current === 0||current === 1?'background-color: #4674F6;color:#ffffff':'background: linear-gradient(90deg, #E2AC57 0%, #F7E3B0 100%);color:#6E5019'"
					@click="userWxPay">开通会员</view>
			</view>
		</div>
	</view>
</template>

<script>
	// import crypto from 'crypto-js'
	// const MD5 = require('../../utils/mad5')
	import {
		JSEncrypt
	} from 'jsencrypt'
	export default {
		data() {
			return {
				phoneInfo: uni.getStorageSync('phoneInfo'),
				isVip: uni.getStorageSync('userInfo'),
				activeColor: '#fff',
				current: 0,
				items: ['免费会员', 'VIP会员', 'SVPI会员'],
				titleList: ['搜题服务', '文档服务', '刷题服务', '其他服务'],
				styleType: 'text',
				vipEquity: [{
						title: "搜题服务",
						list: [{
							name: "搜题次数",
							num: ["50次/月", "800次/月", "不限"]
						}]
					},
					{
						title: "文档服务",
						list: [{
							name: "文档下载",
							num: ["5个/月", "30个/月", "不限"]
						}]
					},
					{
						title: "刷题服务",
						list: [{
							name: "可刷题库",
							num: ["8个", "20个/月", "不限"]
						}]
					},
					{
						title: "其它服务",
						list: [{
							name: "APP刷题无广告",
							num: ["0", "0", "1"]
						}]
					},
				],
				documentList: []
			};
		},
		watch: {

		},
		onLoad() {
			this.postVipList()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					console.log(this.current)
					if (this.current === 0 || this.current === 1) {
						uni.setNavigationBarColor({
							frontColor: '#ffffff',
							backgroundColor: '#4674F6',
							animation: {
								duration: 400,
								timingFunc: 'easeIn'
							}
						})
					} else {
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
						console.log(res.records, '会员信息')
						this.documentList = res.records.sort((a, b) => {
							return a.yearPrice - b.yearPrice
						})
					}
				}
				this.$http('postVipList', opt)
			},
			userWxPay() {
				console.log(this.current, 'this.current');
				uni.navigateTo({
					url: `/subPages/pay/pay?current=${this.current}`
				})
				// let opt = {
				// 	params: {
				// 		// "vipCode": 1001,
				// 		"desc": "开通会员",
				// 		"payType": "month_price",
				// 		"vipId": this.current
				// 	},
				// 	callBack: (res) => {
				// 		this.wxRequestPayment(res)
				// 	}
				// }
				// this.$http('wxPay', opt)
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
					},
					fail(res) {}
				})
			}

		}
	}
</script>

<style lang="scss">
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
		background-color: #fff;
		color: #000;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 20px 100px 20px;
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

			.white {
				background: #fff;
			}

			.white-text {
				color: #c8c8c8;
				background-color: #c7c7c7;
			}
		}

	}

	.btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		// border-top: 1px solid #ABABAB;

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

	.isHidden {
		background-color: #F7F7F7;
		color: #b2b2b2;
	}

	.segmented-control__text {
		color: #fff !important;
	}

	:v-deep .segmented-control__item {
		color: #fff !important;
	}
</style>