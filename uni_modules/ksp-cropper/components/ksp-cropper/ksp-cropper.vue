<template>
<view v-if="url" :mode="modeValue" :change:mode="mwx.changeMode" :rotate="rotate" :change:rotate="mwx.changeRotate">
	<!-- #ifdef MP-WEIXIN -->
	<canvas type="2d" class="canvas" :style="{width: target.width + 'px', height: target.height + 'px'}"></canvas>
	<!-- #endif -->
	<!-- #ifdef APP-PLUS || H5 -->
	<canvas :canvas-id="canvasId" :style="{width: target.width + 'px', height: target.height + 'px'}"></canvas>
	<!-- #endif -->
	<view class="panel">
		<view class="body" @touchstart="mwx.touchstart" @touchmove="mwx.touchmove" @touchend="mwx.touchend" @touchcancel="mwx.touchcancel">
			<view class="image-wrap" :class="{transit: transit}" :change:rect="mwx.changeImage" :rect="image">
				<image class="image" :class="{transit: transit}" :src="url" @load="imageLoad"/>
			</view>
			<view class="mask"></view>
			<view class="frame" :class="{transit: transit}" :change:rect="mwx.changeFrame" :rect="frame">
				<view class="rect">
					<view class="image-rect" :class="{transit: transit}">
						<image class="image" :class="{transit: transit}" :src="url"/>
					</view>
				</view>
				<view class="line-one"></view>
				<view class="line-two"></view>
				<view class="line-three"></view>
				<view class="line-four"></view>
				<view class="frame-left-top" @touchstart="mwx.touchstart"></view>
				<view class="frame-left-bottom" @touchstart="mwx.touchstart"></view>
				<view class="frame-right-top" @touchstart="mwx.touchstart"></view>
				<view class="frame-right-bottom" @touchstart="mwx.touchstart"></view>
			</view>
		</view>
		<view class="toolbar">
			<view @tap="oncancle" class="btn-cancel">取消</view>
			<view @tap="rotateAngle" class="btn-rotate">旋转</view>
			<view @tap="onok" class="btn-ok">确定</view>
		</view>
	</view>
</view>
</template>
<script>
/**
 * @property {String} mode 模式
 *  @value fixed 固定模式，裁剪出固定大小
 *  @value ratio 等比模式，宽高等比缩放
 *  @value free 自由模式，不限制宽高比
 * @property {String} url 图片路径
 * @property {Number} width 宽度
 * @property {Number} height 高度
 * @property {Number} maxWidth 最大宽带
 * @property {Number} minHeight 最大高度 
 */
export default {
	props: {
		mode: {
			type: String,
			default: "free"
		},
		url: {
			type: String,
			default: ""
		},
		width: {
			type: Number,
			default: 200
		},
		height: {
			type: Number,
			default: 200
		},
		maxWidth: {
			type: Number,
			default: 1024
		},
		maxHeight: {
			type: Number,
			default: 1024
		}
	},
	data() {
		return {
			canvasId: Math.random().toString(36).slice(-6),
			real: {
				width: 100,
				height: 100
			},
			target: {
				width: 100,
				height: 100
			},
			body: {
				width: 100,
				height: 100
			},
			frame: {
				left: 50,
				top: 50,
				width: 200,
				height: 300
			},
			image: {
				left: 20,
				top: 20,
				width: 300,
				height: 400
			},
			rotate: 0,
			transit: false,
			modeValue: ""
		};
	},
	methods: {
		imageLoad(event) {
            uni.getImageInfo({
                src: this.url,
                success: (rst) => {
                    this.real.width = rst.width;
                    this.real.height = rst.height;
                    this.target = {};
                    var query = uni.createSelectorQuery().in(this);
                    query.select(".body").boundingClientRect((data) => {
                    	this.body.width = data.width;
                    	this.body.height = data.height;
                    	this.init();
                    }).exec();
                }
            });
		},
		init() {
			this.modeValue = this.mode;
			this.rotate = 0;
			var rate = this.width / this.height;
			var width = this.body.width * 0.7;
			var height = this.body.height * 0.7;
			if (width / height > rate) {
				width = height * rate;
			} else {
				height = width / rate;
			}
			var left = (this.body.width - width) / 2;
			var top = (this.body.height - height) / 2;
			this.frame = {
				left: left,
				top: top,
				width: width,
				height: height
			};
			rate = this.real.width / this.real.height;
			width = this.frame.width;
			height = this.frame.height;
			if (width / height > rate) {
				height = width / rate;
			} else {
				width = height * rate;
			}
			left = (this.frame.width - width) / 2 + this.frame.left;
			top = (this.frame.height - height) / 2 + this.frame.top;
			this.image = {
				left: left,
				top: top,
				width: width,
				height: height
			};
		},
		async updateData(data) {
			this.frame = data.frame;
			this.image = data.image;
			await this.$nextTick();
			this.trimImage();
		},
		trimImage() {
			var rate = this.frame.width / this.frame.height;
			var width = this.body.width * 0.7;
			var height = this.body.height * 0.7;
			if (width / height > rate) {
				width = height * rate;
			} else {
				height = width / rate;
			}
			var left = (this.body.width - width) / 2;
			var top = (this.body.height - height) / 2;
			var mul = width / this.frame.width;
			var ox = this.frame.left - this.image.left;
			var oy = this.frame.top - this.image.top;
			this.frame = {
				left: left,
				top: top,
				width: width,
				height: height
			};
			width = this.image.width * mul;
			height = this.image.height * mul;
			left = this.frame.left - ox * mul;
			top = this.frame.top - oy * mul;
			this.image = {
				left: left,
				top: top,
				width: width,
				height: height
			};
			if (mul != 1) {
				this.transit = true;
				setTimeout(() => {
					this.transit = false;
				}, 300);
			}
		},
		rotateAngle() {
			this.rotate -= 90;
			var width = this.image.height;
			var height = this.image.width;
			var left = this.image.left;
			var top = this.image.top;
			var rate = width / height;
			if (width < this.frame.width) {
				width = this.frame.width;
				height = width / rate;
			}
			if (height < this.frame.height) {
				height = this.frame.height;
				width = height * rate;
			}
			if (left > this.frame.left) {
				left = this.frame.left;
			}
			if (top > this.frame.top) {
				top = this.frame.top;
			}
			if (left + width < this.frame.left + this.frame.width) {
				left = this.frame.left + this.frame.width - width; 
			}
			if (top + height < this.frame.top + this.frame.height) {
				top = this.frame.top + this.frame.height - height; 
			}
			this.image = {
				left: left,
				top: top,
				width: width,
				height: height
			};
			this.transit = true;
			setTimeout(() => {
				this.transit = false;
			}, 300);
		},
		onok() {
			// #ifdef MP-WEIXIN
			this.cropWx();
			// #endif
			// #ifdef APP-PLUS || H5
			this.cropAppH5();
			// #endif
		},
		oncancle() {
			this.$emit("cancel");
		},
		async cropWx() {
			var mx = this.computeMatrix();
			this.target = {
				width: mx.tw,
				height: mx.th
			};
			var canvas = await new Promise((resolve) => {
				uni.createSelectorQuery()
				.in(this)
				.select(".canvas")
				.fields({node: true})
				.exec((rst) => {
					var node = rst[0].node;
					resolve(node);
				});
			});
			canvas.width = mx.tw;
			canvas.height = mx.th;
			uni.showLoading({
				title: "处理中"
			});
			await new Promise((resolve) => {
				setTimeout(resolve, 200);
			});
			var context = canvas.getContext("2d");
			var image = canvas.createImage();
			await new Promise((resolve, reject) => {
				image.onload = resolve;
				image.onerror = reject;
				image.src = this.url;
			});
			context.save();
			context.rotate(this.rotate * Math.PI / 180);
			context.drawImage(image, mx.sx, mx.sy, mx.sw, mx.sh, mx.dx, mx.dy, mx.dw, mx.dh);
			context.restore();
			wx.canvasToTempFilePath({
				canvas: canvas,
				// destWidth: mx.tw,
				// destHeight: mx.th,
				success: (rst) => {
					var path = rst.tempFilePath;
					this.$emit("ok", {
						path: path
					});
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		async cropAppH5() {
			var mx = this.computeMatrix();
			this.target = {
				width: mx.tw,
				height: mx.th
			};
			uni.showLoading({
				title: "处理中"
			});
			await new Promise((resolve) => {
				setTimeout(resolve, 200);
			});
			var context = uni.createCanvasContext(this.canvasId, this);
			context.save();
			context.rotate(this.rotate * Math.PI / 180);
			context.drawImage(this.url, mx.sx, mx.sy, mx.sw, mx.sh, mx.dx, mx.dy, mx.dw, mx.dh);
			context.restore();
			await new Promise((resolve) => {
				context.draw(false, resolve);
			});
			uni.canvasToTempFilePath({ 
				canvasId: this.canvasId,
				destWidth: mx.tw,
				destHeight: mx.th,
				success: (rst) => {
					var path = rst.tempFilePath;
					// #ifdef H5
					var base64 = path;
					path = this.parseBlob(path);
					this.$emit("ok", {
						path: path,
						base64: base64
					});
					// #endif
					// #ifdef APP-PLUS
					this.$emit("ok", {
						path: path
					});
					// #endif
				},
				complete: () => {
					uni.hideLoading();
				}
			}, this);
		},
		computeMatrix() {
			var width = this.width;
			var height = this.height;
			var mul = this.image.width / this.real.width;
			if (this.rotate % 180 != 0) {
				mul = this.image.height / this.real.width;
			}
			if (this.mode != "fixed") {
				width = this.frame.width / mul;
				height = this.frame.height / mul;
			}
			var rate = width / height;
			if (width > this.maxWidth) {
				width = this.maxWidth;
				height = width / rate;
			}
			if (height > this.maxHeight) {
				height = this.maxHeight;
				width = height * rate;
			}
			var sx = (this.frame.left - this.image.left) / mul;
			var sy = (this.frame.top - this.image.top) / mul;
			var sw = this.frame.width / mul;
			var sh = this.frame.height / mul;
			var ox = sx + sw / 2;
			var oy = sy + sh / 2;
			if (this.rotate % 180 != 0) {
				var temp = sw;
				sw = sh;
				sh = temp;
			}
			var angle = this.rotate % 360;
			if (angle < 0) {
				angle += 360;
			}
			if (angle == 270) {
				var x = this.real.width - oy;
				var y = ox;
				ox = x;
				oy = y;
			}
			if (angle == 180) {
				var x = this.real.width - ox;
				var y = this.real.height - oy;
				ox = x;
				oy = y;
			}
			if (angle == 90) {
				var x = oy;
				var y = this.real.height - ox;
				ox = x;
				oy = y;
			}
			sx = ox - sw / 2;
			sy = oy - sh / 2;
			var dr = {x: 0, y: 0, w: width, h: height};
			dr = this.parseRect(dr, -this.rotate);
			return {
				tw: width,
				th: height,
				sx: sx,
				sy: sy,
				sw: sw,
				sh: sh,
				dx: dr.x,
				dy: dr.y,
				dw: dr.w,
				dh: dr.h
			};
		},
		parsePoint(point, angle) {
			var result = {};
			result.x = point.x * Math.cos(angle * Math.PI / 180) - point.y * Math.sin(angle * Math.PI / 180);
			result.y = point.y * Math.cos(angle * Math.PI / 180) + point.x * Math.sin(angle * Math.PI / 180);
			return result;
		},
		parseRect(rect, angle) {
			var x1 = rect.x;
			var y1 = rect.y;
			var x2 = rect.x + rect.w;
			var y2 = rect.y + rect.h;
			var p1 = this.parsePoint({x: x1, y: y1}, angle);
			var p2 = this.parsePoint({x: x2, y: y2}, angle);
			var result = {};
			result.x = Math.min(p1.x, p2.x);
			result.y = Math.min(p1.y, p2.y);
			result.w = Math.abs(p2.x - p1.x);
			result.h = Math.abs(p2.y - p1.y);
			return result;
		},
		parseBlob(base64) {
			var arr = base64.split(',');
			var mime = arr[0].match(/:(.*?);/)[1];
			var bstr = atob(arr[1]);
			var n = bstr.length;
			var u8arr = new Uint8Array(n);
			for(var i = 0; i < n; i++) {
				u8arr[i] = bstr.charCodeAt(i);
			}
			var url = URL || webkitURL;
			return url.createObjectURL(new Blob([u8arr], {type: mime}));
		},
	}
};
</script>

<script module="mwx" lang="wxs">
	var mode = "";
	var rotate = 0;
	var image = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};
	var frame = {
		left: 0,
		top: 0,
		width: 0,
		height: 0
	};
	var touches = [];
	var touchType = "";
	var start = {
		frame: {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		},
		image: {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		}
	};
	function changeMode(value) {
		mode = value;
	}
	function changeRotate(value, old, oi, instance) {
		rotate = value;
		delayUpdateStyle(oi);
	}
	function changeImage(value, old, oi, instance) {
		image = value;
		delayUpdateStyle(oi);
	}
	function changeFrame(value, old, oi, instance) {
		frame = value;
		delayUpdateStyle(oi);
	}
    function delayUpdateStyle(oi) {
        // #ifdef APP-PLUS || H5
        setTimeout(() => {
            updateStyle(oi);
        });
        // #endif
        // #ifdef MP-WEIXIN
        updateStyle(oi);
        // #endif
    }
	function touchstart(event, oi) {
		// #ifdef APP-PLUS || H5
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
		// #endif
		touches = event.touches;
		var instance = event.instance;
		if (instance.hasClass("body")) {
			touchType = "body";
		} else if (instance.hasClass("frame-left-top")) {
			touchType = "left-top";
		} else if (instance.hasClass("frame-left-bottom")) {
			touchType = "left-bottom";
		} else if (instance.hasClass("frame-right-top")) {
			touchType = "right-top";
		} else if (instance.hasClass("frame-right-bottom")) {
			touchType = "right-bottom";
		}
		start.frame.left = frame.left;
		start.frame.top = frame.top;
		start.frame.width = frame.width;
		start.frame.height = frame.height;
		start.image.left = image.left;
		start.image.top = image.top;
		start.image.width = image.width;
		start.image.height = image.height;
		return false;
	}
	function touchmove(event, oi) {
		// #ifdef H5
		event.preventDefault();
		event.stopPropagation();
		// #endif
		var instance = event.instance;
		if (touches.length == 1) {
			if (touchType == "body") {
				moveImage(touches[0], event.touches[0], oi);
			} else {
				scaleFrame(touches[0], event.touches[0], oi);
			}
		} else if (touches.length == 2 && event.touches.length == 2) {
			var ta = touches[0];
			var tb = touches[1];
			var tc = event.touches[0];
			var td = event.touches[1];
			if (ta.identifier != tc.identifier) {
				var temp = tc;
				tc = td;
				td = temp;
			}
			scaleImage(ta, tb, tc, td, oi);
		}
	}
	function touchend(event, oi) {
		touches = [];
		oi.callMethod("updateData", {frame: frame, image: image});
	}
	function touchcancel(event, oi) {
		touches = [];
		oi.callMethod("updateData", {frame: frame, image: image});
	}
	function moveImage(ta, tb, oi) {
		var ax = tb.clientX - ta.clientX;
		var ay = tb.clientY - ta.clientY;
		image.left = start.image.left + ax;
		image.top = start.image.top + ay;
		var left = frame.left;
		var top = frame.top;
		var width = frame.width;
		var height = frame.height;
		if (image.left > left) {
			image.left = left;
		}
		if (image.top > top) {
			image.top = top;
		}
		if (image.left + image.width < left + width) {
			image.left = left + width - image.width; 
		}
		if (image.top + image.height < top + height) {
			image.top = top + height - image.height;
		}
		updateStyle(oi);
	}
	function scaleImage(ta, tb, tc, td, oi) {
		var x1 = ta.clientX;
		var y1 = ta.clientY;
		var x2 = tb.clientX;
		var y2 = tb.clientY;
		var x3 = tc.clientX;
		var y3 = tc.clientY;
		var x4 = td.clientX;
		var y4 = td.clientY;
		var ol = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		var el = Math.sqrt((x3 - x4) * (x3 - x4) + (y3 - y4) * (y3 - y4));
		var ocx = (x1 + x2) / 2;
		var ocy = (y1 + y2) / 2;
		var ecx = (x3 + x4) / 2;
		var ecy = (y3 + y4) / 2;
		var ax = ecx - ocx;
		var ay = ecy - ocy;
		var scale = el / ol;
		if (start.image.width * scale < frame.width) {
			scale = frame.width / start.image.width;
		}
		if (start.image.height * scale < frame.height) {
			scale = frame.height / start.image.height;
		}
		if (start.image.width * scale < frame.width) {
			scale = frame.width / start.image.width;
		}
		image.left = start.image.left + ax - (ocx - start.image.left) * (scale - 1);
		image.top = start.image.top + ay - (ocy - start.image.top) * (scale - 1);
		image.width = start.image.width * scale;
		image.height = start.image.height * scale;
		if (image.left > frame.left) {
			image.left = frame.left;
		}
		if (image.top > frame.top) {
			image.top = frame.top;
		}
		if (image.left + image.width < frame.left + frame.width) {
			image.left = frame.left + frame.width - image.width; 
		}
		if (image.top + image.height < frame.top + frame.height) {
			image.top = frame.top + frame.height - image.height; 
		}
		updateStyle(oi);
	}
	function scaleFrame(ta, tb, oi) {
		var ax = tb.clientX - ta.clientX;
		var ay = tb.clientY - ta.clientY;
		var x1 = start.frame.left;
		var y1 = start.frame.top;
		var x2 = start.frame.left + start.frame.width;
		var y2 = start.frame.top + start.frame.height;
		var cx1 = false;
		var cy1 = false;
		var cx2 = false;
		var cy2 = false;
		var mix = 30;
		var rate = frame.width / frame.height;
		if (touchType == "left-top") {
			x1 += ax;
			y1 += ay;
			cx1 = true;
			cy1 = true;
		} else if (touchType == "left-bottom") {
			x1 += ax;
			y2 += ay;
			cx1 = true;
			cy2 = true;
		} else if (touchType == "right-top") {
			x2 += ax;
			y1 += ay;
			cx2 = true;
			cy1 = true;
		} else if (touchType == "right-bottom") {
			x2 += ax;
			y2 += ay;
			cx2 = true;
			cy2 = true;
		}
		if (x1 < image.left) {
			x1 = image.left;
		}
		if (y1 < image.top) {
			y1 = image.top;
		}
		if (x2 > image.left + image.width) {
			x2 = image.left + image.width;
		}
		if (y2 > image.top + image.height) {
			y2 = image.top + image.height;
		}
		if (cx1) {
			if (x1 > x2 - mix) {
				x1 = x2 - mix;
			}
		}
		if (cy1) {
			if (y1 > y2 - mix) {
				y1 = y2 - mix;
			}
		}
		if (cx2) {
			if (x2 < x1 + mix) {
				x2 = x1 + mix;
			}
		}
		if (cy2) {
			if (y2 < y1 + mix) {
				y2 = y1 + mix;
			}
		}
		if (cx1) {
			if (mode != "free") {
				var val = x2 - rate * (y2 - y1);
				if (x1 < val) {
					x1 = val;
				}
			}
		}
		if (cy1) {
			if (mode != "free") {
				var val = y2 - (x2 - x1) / rate;
				if (y1 < val) {
					y1 = val;
				}
			}
		}
		if (cx2) {
			if (mode != "free") {
				var val = rate * (y2 - y1) + x1;
				if (x2 > val) {
					x2 = val;
				}
			}
		}
		if (cy2) {
			if (mode != "free") {
				var val = (x2 - x1) / rate + y1;
				if (y2 > val) {
					y2 = val;
				}
			}
		}
		frame.left = x1;
		frame.top = y1;
		frame.width = x2 - x1;
		frame.height = y2 - y1;
		updateStyle(oi);
	}
	function updateStyle(oi) {
		oi.selectComponent(".frame").setStyle({
			"left": frame.left + "px",
			"top": frame.top + "px",
			"width": frame.width + "px",
			"height": frame.height + "px"
		});
		oi.selectComponent(".image-wrap").setStyle({
			"left": image.left + "px",
			"top": image.top + "px",
			"width": image.width + "px",
			"height": image.height + "px"
		});
		oi.selectComponent(".image-rect").setStyle({
			"left": image.left - frame.left + "px",
			"top": image.top - frame.top + "px",
			"width": image.width + "px",
			"height": image.height + "px"
		});
		var left = 0;
		var top = 0;
		var width = image.width;
		var height = image.height;
		if (rotate % 180 != 0) {
			width = image.height;
			height = image.width;
			top = width / 2 - height / 2;
			left = height / 2 - width/ 2;
		}
		oi.selectComponent(".image-wrap .image").setStyle({
			"left": left + "px",
			"top": top + "px",
			"width": width + "px",
			"height": height + "px",
			"transform": "rotate(" + rotate + "deg)"
		});
		oi.selectComponent(".image-rect .image").setStyle({
			"left": left + "px",
			"top": top + "px",
			"width": width + "px",
			"height": height + "px",
			"transform": "rotate(" + rotate + "deg)"
		});
	}
	module.exports = {
		changeMode: changeMode,
		changeRotate: changeRotate,
		changeImage: changeImage,
		changeFrame: changeFrame,
		touchstart: touchstart,
		touchmove: touchmove,
		touchend: touchend,
		touchcancel: touchcancel
	};
</script>

<style scoped>
.panel {
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	bottom: 0;
	z-index: 1000;
	overflow: hidden;
}
.canvas {
	position: absolute;
	top: 5000px;
	left: 5000px;
}
.toolbar {
	position: absolute;
	width: 100%;
	height: 100rpx;
	left: 0rpx;
	bottom: 0rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.btn-cancel {
	font-size: 40rpx;
	color: #d5dfe5;
	font-weight: bold;
}
.btn-ok {
	font-size: 40rpx;
	color: #FFFFFF;
	font-weight: bold;
}
.btn-rotate {
	font-size: 40rpx;
	color: #d5dfe5;
	font-weight: bold;
}
.body {
	position: absolute;
	left: 0rpx;
	right: 0rpx;
	top: 0rpx;
	bottom: 0rpx;
	background: black;
	overflow: hidden;
}
.mask {
	position: absolute;
	left: 0rpx;
	right: 0rpx;
	top: 0rpx;
	bottom: 0rpx;
	background: black;
	opacity: 0.4;
}
.plank {
	position: absolute;
	left: 0rpx;
	right: 0rpx;
	top: 0rpx;
	bottom: 0rpx;
}
.image-wrap {
	position: absolute;
}
.image-rect {
	position: absolute;
}
.image {
	position: absolute;
}
.frame {
	position: absolute;
	left: 100px;
	top: 100px;
	width: 200px;
	height: 200px;
}
.rect {
	position: absolute;
	left: -2px;
	top: -2px;
	width: 100%;
	height: 100%;
	border: 2px solid white;
	overflow: hidden;
	box-sizing:content-box;
}
.line-one {
	position: absolute;
	width: 100%;
	height: 1px;
	background: white;
	left: 0;
	top: 33.3%;
	box-sizing:content-box;
}
.line-two {
	position: absolute;
	width: 100%;
	height: 1px;
	background: white;
	left: 0;
	top: 66.7%;
	box-sizing:content-box;
}
.line-three {
	position: absolute;
	width: 1px;
	height: 100%;
	background: white;
	top: 0;
	left: 33.3%;
	box-sizing:content-box;
}
.line-four {
	position: absolute;
	width: 1px;
	height: 100%;
	background: white;
	top: 0;
	left: 66.7%;
	box-sizing:content-box;
}
.frame-left-top {
	position: absolute;
	width: 20px;
	height: 20px;
	left: -6px;
	top: -6px;
	border-left: 4px solid red;
	border-top: 4px solid red;
	box-sizing:content-box;
}
.frame-left-bottom {
	position: absolute;
	width: 20px;
	height: 20px;
	left: -6px;
	bottom: -6px;
	border-left: 4px solid red;
	border-bottom: 4px solid red;
	box-sizing:content-box;
}
.frame-right-top {
	position: absolute;
	width: 20px;
	height: 20px;
	right: -6px;
	top: -6px;
	border-right: 4px solid red;
	border-top: 4px solid red;
	box-sizing:content-box;
}
.frame-right-bottom {
	position: absolute;
	width: 20px;
	height: 20px;
	right: -6px;
	bottom: -6px;
	border-right: 4px solid red;
	border-bottom: 4px solid red;
	box-sizing:content-box;
}
.transit {
	transition: width 0.3s, height 0.3s, left 0.3s, top 0.3s, transform 0.3s;
}
</style>
