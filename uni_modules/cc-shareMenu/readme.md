# cc-shareMenu

## 1.0.0（2023-06-17）
组件初始化

#### 使用方法 
```使用方法
	
<!-- 分享 ref: 设置一个唯一ref contentHeight：弹框高度 shareList：分享数组 click：分享菜单按钮点击 -->	
<cc-shareMenu ref="share" :contentHeight="580" :shareList="shareList" @click="shareMenuClick"></cc-shareMenu>
			
```

#### HTML代码部分
```html


<template>
	<view class="content">

		<view class="shareView" @click="goShareClick">分享</view>
	
		
		<!-- 分享 ref: 设置一个唯一ref contentHeight：弹框高度 shareList：分享数组 click：分享菜单按钮点击 -->
		<cc-shareMenu ref="share" :contentHeight="580" :shareList="shareList" @click="shareMenuClick"></cc-shareMenu>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				shareList: []
			}
		},
		mounted() {
			this.shareList = [{
					type: 1,
					icon: '/static/share_wechat.png',
					text: '微信好友'
				},
				{
					type: 2,
					icon: '/static/share_moment.png',
					text: '朋友圈'
				},
				{
					type: 3,
					icon: '/static/share_qq.png',
					text: 'QQ好友'
				},
				{
					type: 4,
					icon: '/static/share_qqzone.png',
					text: 'QQ空间'
				},
				{
					type: 5,
					icon: '/static/share_weibo.png',
					text: '微博'
				}
			];
		},
		methods: {

			goShareClick() {
				this.$refs.share.toggleMask();
			},
			
			shareMenuClick(name){
				
				uni.showModal({
					title: '温馨提示',
					content:'点击的分享菜单名称是 = ' + name
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;

	}
	.shareView{
		
		margin-top: 60px; 
		width: 100px; 
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: antiquewhite;
		
	
		align-self: center;
	}
</style>


```
