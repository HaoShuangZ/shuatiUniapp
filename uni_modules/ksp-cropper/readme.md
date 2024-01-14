# ksp-cropper

## 高性能图片裁剪工具

### 属性说明
|属性         |类型     |默认     |备注      |
| :--------: | :-----: | :----:  | :----:  |
| url        |String   |   ""    | 需要裁剪的图片路径，为空时控件隐藏，不为空时控件显示|
| mode       |String   | "free"  | 裁剪模式|
| width      |Number   | 200     | 图片裁剪后的宽度，固定大小时有效|
| height     |Number   | 200     | 图片裁剪后的高度，固定大小时有效|
| maxWidth   |Number   | 1024    | 图片裁剪后的最大宽度 |
| maxHeight  |Number   | 1024    | 图片裁剪后的最大高度 |

### mode有效值

| 模式     |值       |说明   |
| :-----: | :-----: | :----: |
| 固定模式 |fixed    | 裁剪出指定大小的图片，一般用于头像上传    |
| 等比缩放 |ratio    | 限定宽高比，裁剪大小不固定  |
| 自由模式 |free     | 不限定宽高比，裁剪大小不固定  | 

### 事件说明
|事件名称     |说明     |返回     |
| :--------: | :-----: | :----:  |
| ok        |点击确定按钮   |   e:{path}    |
| cancel      |点击取消按钮  | -   |


### 示例

```html

<template>
<view>
	<button @click="select">选择图片</button>
	<image mode="widthFix" :src="path"/>
	<ksp-cropper mode="free" :width="200" :height="140" :maxWidth="1024" :maxHeight="1024" :url="url" @cancel="oncancel" @ok="onok"></ksp-cropper>
</view>
</template>

<script>
	export default {
		data() {
			return {
				url: "",
				path: ""
			}
		},
		onLoad() {
		},
		methods: {
			select() {
				uni.chooseImage({
					count: 1,
					success: (rst) => {
						// 设置url的值，显示控件
						this.url = rst.tempFilePaths[0];
					}
				});
			},
			onok(ev) {
				this.url = "";
				this.path = ev.path;
			},
			oncancel() {
				// url设置为空，隐藏控件
				this.url = "";
			}
		}
	}
</script>
```

### 注意
微信小程序从基础库 2.21.0 开始， wx.chooseImage 停止维护，请使用 uni.chooseMedia 代替。
微信小程序真机调试会报错，但正常运行是不会有问题的。