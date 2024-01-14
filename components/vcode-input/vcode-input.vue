<template>
	<view class="vcode-input-body">
		<text class="vcode-input-item" :class="isBorderLine?'vcode-input-line':'vcode-input-border'"
			v-for="(v,index) in sum" :key="index" @tap.stop="setFocus" :style="{
			borderColor:text.length===index&&focus?borderActiveColor:(text.length>index?borderValueColor:borderColor),
			color:text.length>index?borderValueColor:borderColor
		}">{{text[index]}}</text>
		<view class="hidden-input">
			<input type="number" :show-confirm-bar="false" auto-blur :cursor="99" :focus="focus" :maxlength="sum"
				v-model="value" @blur="setBlur" @focus="setFocus" :password="isPassword" placeholder="验证码" />
		</view>
	</view>
</template>

<script>
/**
	 * vcode-input 验证码输入框
	 * @description 验证码输入框。
	 * @property {Boolean}			autofocus			自动获取焦点
	 * @property {Number}			sum					验证码长度
	 * @property {Boolean}			isBorderLine		显示的输入框的样式
	 * @property {String}			borderColor			输入框未输入边框颜色
	 * @property {String}			borderValueColor	输入框已输入边框颜色
	 * @property {String}			borderActiveColor	输入框选中边框颜色
	 * @property {Boolean}			isAutoComplete		当输入长度达到sum规定时才回调
	 * @property {Boolean}			isPassword			是否为密文输入
	 * @example <vcode-input ref="VcodeInput" @vcodeInput="vcodeInput"></vcode-input>
	 */
export default {
  name: 'vcode-input',
  props: {
    autofocus: {
      type: Boolean,
      default: true
    },
    sum: {
      type: Number,
      default: 6
    },
    isBorderLine: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: '#DADADA'
    },
    borderValueColor: {
      type: String,
      default: '#424456'
    },
    borderActiveColor: {
      type: String,
      default: '#FF6B00'
    },
    isAutoComplete: {
      type: Boolean,
      default: true
    },
    isPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false,
      text: [],
      value: '',
    };
  },
  watch: {
    value(value, oldVal) {
      if (this.isAutoComplete) {
        if (value.length >= this.sum) {
          this.setBlur();
          this.$emit('vcodeInput', value);
        }
      } else {
        this.$emit('vcodeInput', value);
      }
      if (this.isPassword) {
        let val = '';
        for (let i = 0; i < value.length; i++) {
          val += '●';
        }
        this.text = val;
      } else {
        if (value) {
          this.text = value.split("");
        } else {
          this.text = [];
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initInput()
    })
  },
  methods: {
    initInput() {
      if (this.autofocus)
        this.focus = true;
    },
    setBlur() {
      uni.hideKeyboard();
      this.$nextTick(() => {
        this.focus = false;
      })
    },
    setFocus() {
      this.focus = true;
    },
    clearValue() {
      this.setBlur();
      this.value = '';
      this.text = [];
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss">
	.vcode-input-body {
		margin-left: -36rpx;
		margin-right: -36rpx;
		position: relative;
		overflow: hidden;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.vcode-input-item {
		width: 76rpx;
		height: 76rpx;
		margin-left: 12rpx;
		margin-right: 12rpx;
		line-height: 76rpx;
		text-align: center;
		font-weight: 500;
	}

	.vcode-input-border {
		border-style: solid;
		border-width: 2rpx;
		// border-color: $uni-border-color;
		border-radius: 4rpx;
	}

	.vcode-input-line {
		border-bottom-style: solid;
		border-bottom-width: 2rpx;
		// border-color: $uni-border-color;
	}

	.hidden-input {
		width: 1px;
		height: 1px;
		position: absolute;
		left: -1px;
		top: -1px;
		overflow: hidden;
	}
</style>