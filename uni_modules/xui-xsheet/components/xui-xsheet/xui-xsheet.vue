<template>
	<view @touchmove.stop.prevent="clear">
		<uni-transition class="sheet" :class="cancel===true ? 'cancel ' : ''" mode-class="fade" :show="show">
			<view class="mask" @click="bgClose" :style="`opacity: ${maskOpacity}`"></view>
			<uni-transition class="in" :mode-class="['fade', 'slide-bottom']" :show="show">
				<view v-if="title!=''" class="title">
					<p>{{title}}</p>
				</view>
				<scroll-view class="box" :style="`height: ${height}; padding: ${padding}`" scroll-y="true">
					<slot />
					<view v-if="btnList.length > 0" v-for="(item, index) in btnList" @click="afterClose(item.method)" class="sheet_li">
						{{item.title}}
					</view>
				</scroll-view>
				<view class="share_ul" v-if="shareList.length > 0">
					<view class="share_li" @click="shareFun(item.name)" v-for="(item, index) in shareList" :key="item.name">
						<view class="pic"><view class="sicon" :class="'sicon-' + item.name"><i class="xsheet-icon" :class="'xsheet-icon-' + item.name"></i></view></view>
						<view class="tit">{{item.title ? item.title : sharePro(item.name)}}</view>
					</view>
				</view>
				<view v-if="title!=''" class="blank"></view>
				<view v-if="cancel" class="blank2"></view>
				<view v-if="cancel" class="cancel" @click="close">
					{{cancelStr}}
				</view>
			</uni-transition>
		</uni-transition>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
			}
		},
		props: {
			maskOpacity: {  //遮罩透明度
				type: Number,
				default: 0.7,
			},
			maskClose: {  //是否可点击遮罩关闭
				type: Boolean,
				default: true,
			},
			height: {  //高度
				type: String,
				default: '150px'
			},
			cancel: {  //是否显示取消按钮
				type: Boolean,
				default: false,
			},
			cancelStr: {  //取消按钮文字
				type: String,
				default: '取消',
			},
			padding: {  //内边距
				type: String,
				default: '0px',
			},
			title: {  //标题
				type: String,
				default: '',
			},
			btnList: {  //选项列表
				type: Array,
				default: ()=>[],
			},

			shareList: {  //分享列表
				type: Array,
				default: ()=>[],
			},
			shareTitle: {  //分享标题
				type: String,
				default: '',
			},
			shareType: {  //分享类型
				type: Number,
				default: 0,
			},
			shareSummary: {  //分享摘要
				type: String,
				default: '',
			},
			shareHref: {  //分享链接
				type: String,
				default: '',
			},
			shareImageUrl: {  //分享图片地址
				type: String,
				default: '',
			},
			shareMediaUrl: {  //分享音视频地址
				type: String,
				default: '',
			},
		},
		methods: {
			clear() {

			},
			open() {
				this.show = true;
			},
			close() {
				this.show = false;
			},
			bgClose() {
				if(this.maskClose===true){
					this.close();
				}
			},
			afterClose(fun) {
				if(typeof(fun)=='function'){
					fun();
				}
				this.close();
			},
			sharePro(name) {
				if(name=='weixin'){
					return '微信好友';
				}else if(name=='weixin_zone'){
					return '朋友圈';
				}else if(name=='qq'){
					return 'QQ好友';
				}else if(name=='sinaweibo'){
					return '新浪微博';
				}
			},
			shareFun(name) {
				let scene = '';
				let type = this.shareType;

				if(name=='weixin'){
					scene = 'WXSceneSession';
				}else if(name=='weixin_zone'){
					scene = 'WXSenceTimeline';
				}else if(name=='qq'){
					if(type==0 || type==4 || type==5){
						type = 1;
					}
				}else if(name=='sinaweibo'){
					if(type==1 || type==2 || type==3 || type==5){
						type = 0;
					}
				}

				const shareInfo = {
					provider: name=='weixin_zone' ? 'weixin' : name,
					type: type,
					scene: scene,
					title: this.shareTitle,
					summary: this.shareSummary,
					href: this.shareHref,
					imageUrl: this.shareImageUrl,
					mediaUrl: this.shareMediaUrl,
				};

				uni.share(shareInfo);
			},
		},
	}
</script>

<style lang="scss">
@import './xui-xsheet-share.css';
$color-font: #3b3b3b;
$color-border: #e5e5e5;
.sheet {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99999;
	.mask {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: #000000;
	}
	.in {
		width: 100%;
		min-height: 50px;
		background-color: #ffffff;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 2;
		.title {
			margin-top: 5px;
			text-align: center;
			height: 45px;
			line-height: 45px;
			color: $color-font;
			width: 100%;
			position: relative;
			p {
				display: inline-block;
				background-color: #fff;
				padding: 0 10px;
				position: relative;
				z-index: 2;
			}
			&:after {
				content: "";
				display: block;
				width: calc(100% - 40px);
				height: 1px;
				background-color: $color-border;
				position: absolute;
				top: 22px;
				left: 20px;
				z-index: 1;
			}
		}
		.box {
			box-sizing: border-box;
		}
		.blank {
			width: 100%;
			height: 12px;
		}
		.blank2 {
			width: 100%;
			height: 6px;
			background-color: #f7f7f7;
			border-top: 1px solid $color-border;
		}
	}
	.cancel {
		text-align: center;
		font-size: 15px;
		width: 100%;
		height: 46px;
		line-height: 46px;
		position: absolute;
		bottom: 0;
		left: 0;
		color: $color-font;
		&:after {
			content: "";
			width: 100%;
			height: 1px;
			background-color: $color-border;
			position: absolute;
			top: 0;
			left: 0;
		}
	}
	&.cancel {
		.in {padding-bottom: 46px;}
	}
}

.sheet_li {
	padding: 14px 0;
	color: $color-font;
	font-size: 15px;
	border-bottom: 1px solid $color-border;
	&:last-child {
		border-bottom: 0;
	}
}

.share_ul {
	padding: 5px 20px 20px 20px;
	&:after {
		content: "";
		display: block;
		clear: both;
	}
}

.share_li {
	width: 33.33%;
	float: left;
	text-align: center;
	margin-top: 25px;
	.pic {
		padding-bottom: 4px;
		img {
			width: auto;
			max-width: 100%;
			height: 46px;
		}
		.sicon {
			width: 46px;
			height: 46px;
			display: block;
			margin: 0 auto;
			border-radius: 50%;
			position: relative;
			i {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: #fff;
				font-size: 28px;
			}
			&.sicon-weixin, &.sicon-weixin_zone, {
				background-color: #3fb138;
			}
			&.sicon-qq {
				background-color: #4cb1e5;
			}
			&.sicon-sinaweibo {
				background-color: #d81e06;
			}
		}
	}
	.tit {
		font-size: 15px;
		height: 20px;
		line-height: 20px;
	}
}
</style>