// 获取当前环境
export default {
	created() {
		const self = this;

	},
	mounted() {
		const self = this;
	},
	methods: {
		//设置字体
		getRootFontSize() {
			const self = this;
			var fontSize = getApp().globalData.rootFontSize;
			if (fontSize) {
				return fontSize;
			} else {
				fontSize = uni.getStorageSync('root_font_size');
				if (fontSize) {
					getApp().globalData.rootFontSize = fontSize;
				} else {
					fontSize = '12px'; //默认字体大小
					self.setRootFontSize(fontSize);
				}
				return fontSize;
			}
		},
		setRootFontSize(fontSize) {
			uni.setStorageSync('root_font_size', fontSize);
			getApp().globalData.rootFontSize = fontSize;
		},

	}
}
