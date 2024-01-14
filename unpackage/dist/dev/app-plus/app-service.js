if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_HIDE = "onHide";
  const ON_LOAD = "onLoad";
  const ON_READY = "onReady";
  const ON_UNLOAD = "onUnload";
  const ON_RESIZE = "onResize";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom2) {
    return shared.isString(component) ? easycom2 : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createHook(ON_SHOW);
  const onHide = /* @__PURE__ */ createHook(ON_HIDE);
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onReady = /* @__PURE__ */ createHook(ON_READY);
  const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
  const onResize = /* @__PURE__ */ createHook(ON_RESIZE);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$$ = {
    name: "PageMeta",
    setup(props, { emit }) {
      onResize((evt) => {
        emit("resize", evt);
      });
    },
    props: {
      backgroundTextStyle: {
        type: String,
        default: "dark",
        validator(value) {
          return ["dark", "light"].indexOf(value) !== -1;
        }
      },
      backgroundColor: {
        type: String,
        default: "#ffffff"
      },
      backgroundColorTop: {
        type: String,
        default: "#ffffff"
      },
      backgroundColorBottom: {
        type: String,
        default: "#ffffff"
      },
      scrollTop: {
        type: String,
        default: ""
      },
      scrollDuration: {
        type: Number,
        default: 300
      },
      pageStyle: {
        type: String,
        default: ""
      },
      enablePullDownRefresh: {
        type: [Boolean, String],
        default: false
      },
      rootFontSize: {
        type: String,
        default: ""
      }
    },
    created() {
      const page = getCurrentPages()[0];
      this.$pageVm = page.$vm || page;
      this._currentWebview = page.$getAppWebview();
      if (this.enablePullDownRefresh) {
        this.setPullDownRefresh(this._currentWebview, true);
      }
      this.$watch("enablePullDownRefresh", (val) => {
        this.setPullDownRefresh(this._currentWebview, val);
      });
      this.$watch("backgroundTextStyle", () => {
        this.setBackgroundTextStyle();
      });
      this.$watch(() => [
        this.rootFontSize,
        this.pageStyle
      ], () => {
        this.setPageMeta();
      });
      this.$watch(() => [
        this.backgroundColor,
        this.backgroundColorTop,
        this.backgroundColorBottom
      ], () => {
        this.setBackgroundColor();
      });
      this.$watch(() => [
        this.scrollTop,
        this.scrollDuration
      ], () => {
        this.pageScrollTo();
      });
    },
    beforeMount() {
      this.setBackgroundColor();
      if (this.rootFontSize || this.pageStyle) {
        this.setPageMeta();
      }
      this.backgroundTextStyle && this.setBackgroundTextStyle();
    },
    mounted() {
      this.scrollTop && this.pageScrollTo();
    },
    methods: {
      setPullDownRefresh(webview, enabled) {
        webview.setStyle({
          pullToRefresh: {
            support: enabled,
            style: plus.os.name === "Android" ? "circle" : "default"
          }
        });
      },
      setPageMeta() {
        uni.setPageMeta({
          pageStyle: this.pageStyle,
          rootFontSize: this.rootFontSize
        });
      },
      setBackgroundTextStyle() {
      },
      setBackgroundColor() {
      },
      pageScrollTo() {
        let scrollTop = String(this.scrollTop);
        if (scrollTop.indexOf("rpx") !== -1) {
          scrollTop = uni.upx2px(scrollTop.replace("rpx", ""));
        }
        scrollTop = parseFloat(scrollTop);
        if (isNaN(scrollTop)) {
          return;
        }
        uni.pageScrollTo({
          scrollTop,
          duration: this.scrollDuration,
          success: () => {
          }
        });
      }
    }
  };
  function _sfc_render$Q(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "display": "none" } }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const __easycom_0$9 = /* @__PURE__ */ _export_sfc(_sfc_main$$, [["render", _sfc_render$Q], ["__file", "E:/Soft/HBuilderX/HBuilderX/plugins/uniapp-cli-vite/node_modules/@dcloudio/uni-components/lib/page-meta/page-meta.vue"]]);
  const _sfc_main$_ = {
    name: "UniSegmentedControl",
    emits: ["clickItem"],
    props: {
      current: {
        type: Number,
        default: 0
      },
      values: {
        type: Array,
        default() {
          return [];
        }
      },
      activeColor: {
        type: String,
        default: "#2979FF"
      },
      styleType: {
        type: String,
        default: "button"
      }
    },
    data() {
      return {
        currentIndex: 0
      };
    },
    watch: {
      current(val) {
        if (val !== this.currentIndex) {
          this.currentIndex = val;
        }
      }
    },
    created() {
      this.currentIndex = this.current;
    },
    methods: {
      _onClick(index) {
        if (this.currentIndex !== index) {
          this.currentIndex = index;
          this.$emit("clickItem", {
            currentIndex: index
          });
        }
      }
    }
  };
  function _sfc_render$P(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass([[$props.styleType === "text" ? "segmented-control--text" : "segmented-control--button"], "segmented-control"]),
        style: vue.normalizeStyle({ borderColor: $props.styleType === "text" ? "" : $props.activeColor })
      },
      [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($props.values, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: vue.normalizeClass([[
                $props.styleType === "text" ? "" : "segmented-control__item--button",
                index === $data.currentIndex && $props.styleType === "button" ? "segmented-control__item--button--active" : "",
                index === 0 && $props.styleType === "button" ? "segmented-control__item--button--first" : "",
                index === $props.values.length - 1 && $props.styleType === "button" ? "segmented-control__item--button--last" : ""
              ], "segmented-control__item"]),
              key: index,
              style: vue.normalizeStyle({ backgroundColor: index === $data.currentIndex && $props.styleType === "button" ? $props.activeColor : "", borderColor: index === $data.currentIndex && $props.styleType === "text" || $props.styleType === "button" ? $props.activeColor : "transparent" }),
              onClick: ($event) => $options._onClick(index)
            }, [
              vue.createElementVNode("view", null, [
                vue.createElementVNode(
                  "text",
                  {
                    style: vue.normalizeStyle({ color: index === $data.currentIndex ? $props.styleType === "text" ? $props.activeColor : "#fff" : $props.styleType === "text" ? "#000" : $props.activeColor }),
                    class: vue.normalizeClass(["segmented-control__text", $props.styleType === "text" && index === $data.currentIndex ? "segmented-control__item--text" : ""])
                  },
                  vue.toDisplayString(item),
                  7
                  /* TEXT, CLASS, STYLE */
                )
              ])
            ], 14, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$8 = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["render", _sfc_render$P], ["__scopeId", "data-v-86aa1171"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"]]);
  const _sfc_main$Z = {
    name: "UniSection",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      title: {
        type: String,
        required: true,
        default: ""
      },
      titleFontSize: {
        type: String,
        default: "14px"
      },
      titleColor: {
        type: String,
        default: "#333"
      },
      subTitle: {
        type: String,
        default: ""
      },
      subTitleFontSize: {
        type: String,
        default: "12px"
      },
      subTitleColor: {
        type: String,
        default: "#999"
      },
      padding: {
        type: [Boolean, String],
        default: false
      }
    },
    computed: {
      _padding() {
        if (typeof this.padding === "string") {
          return this.padding;
        }
        return this.padding ? "10px" : "";
      }
    },
    watch: {
      title(newVal) {
        if (uni.report && newVal !== "") {
          uni.report("title", newVal);
        }
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$O(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-section" }, [
      vue.createElementVNode("view", {
        class: "uni-section-header",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      }, [
        $props.type ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-section-header__decoration", $props.type])
          },
          null,
          2
          /* CLASS */
        )) : vue.renderSlot(_ctx.$slots, "decoration", { key: 1 }, void 0, true),
        vue.createElementVNode("view", { class: "uni-section-header__content" }, [
          vue.createElementVNode(
            "text",
            {
              style: vue.normalizeStyle({ "font-size": $props.titleFontSize, "color": $props.titleColor }),
              class: vue.normalizeClass(["uni-section__content-title", { "distraction": !$props.subTitle }])
            },
            vue.toDisplayString($props.title),
            7
            /* TEXT, CLASS, STYLE */
          ),
          $props.subTitle ? (vue.openBlock(), vue.createElementBlock(
            "text",
            {
              key: 0,
              style: vue.normalizeStyle({ "font-size": $props.subTitleFontSize, "color": $props.subTitleColor }),
              class: "uni-section-header__content-sub"
            },
            vue.toDisplayString($props.subTitle),
            5
            /* TEXT, STYLE */
          )) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("view", { class: "uni-section-header__slot-right" }, [
          vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
        ])
      ]),
      vue.createElementVNode(
        "view",
        {
          class: "uni-section-content",
          style: vue.normalizeStyle({ padding: $options._padding })
        },
        [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const __easycom_2$4 = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["render", _sfc_render$O], ["__scopeId", "data-v-637fd36b"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-section/components/uni-section/uni-section.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation(options);
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn2) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn2);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn2 === "function" && fn2();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn2) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn2 === "function" && fn2();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$Y = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i2 in styles) {
          let line = this.toLine(i2);
          transform += line + ":" + styles[i2] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i2 in obj) {
          try {
            if (typeof obj[i2] === "object") {
              this.animation[i2](...obj[i2]);
            } else {
              this.animation[i2](obj[i2]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:139", `方法 ${i2} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn2) {
        if (!this.animation)
          return;
        this.animation.run(fn2);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 1 : 0,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$N(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.isShow ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$7 = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["render", _sfc_render$N], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$X = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      // 指定使用v-show指令，不重新渲染Pop组件
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: this.isDesktop ? "fixforpc-top" : "top"
      };
    },
    computed: {
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible() {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          clearTimeout(this.timer);
          this.showPopup = false;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:285", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$M(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0$7);
    return $data.showPopup || $props.onceRender ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap,
              "once-render": $props.onceRender
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle({ backgroundColor: $options.bg }),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick", "once-render"])
          ],
          32
          /* HYDRATE_EVENTS */
        )
      ],
      2
      /* CLASS */
    )), [
      [vue.vShow, $data.showPopup]
    ]) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$5 = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["render", _sfc_render$M], ["__scopeId", "data-v-4dd3c44b"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("mwx");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["mwx"] = "b6a9b97a";
  };
  const _sfc_main$W = {
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
        formatAppLog("log", "at components/Ksp-Cropper/index.vue:129", "init-------");
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
          left,
          top,
          width,
          height
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
          left,
          top,
          width,
          height
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
          left,
          top,
          width,
          height
        };
        width = this.image.width * mul;
        height = this.image.height * mul;
        left = this.frame.left - ox * mul;
        top = this.frame.top - oy * mul;
        this.image = {
          left,
          top,
          width,
          height
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
          left,
          top,
          width,
          height
        };
        this.transit = true;
        setTimeout(() => {
          this.transit = false;
        }, 300);
      },
      onok() {
        this.cropAppH5();
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
          uni.createSelectorQuery().in(this).select(".canvas").fields({
            node: true
          }).exec((rst) => {
            formatAppLog("log", "at components/Ksp-Cropper/index.vue:271", rst, "rst");
            var node = rst[0].node;
            resolve(node);
          });
        });
        canvas.width = mx.tw;
        canvas.height = mx.th;
        uni.showLoading({
          title: "处理中"
        });
        await new Promise((resolve, reject) => {
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
          canvas,
          // destWidth: mx.tw,
          // destHeight: mx.th,
          success: (rst) => {
            var path = rst.tempFilePath;
            this.$emit("ok", {
              path
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
            this.$emit("ok", {
              path
            });
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
          var x2 = this.real.width - oy;
          var y2 = ox;
          ox = x2;
          oy = y2;
        }
        if (angle == 180) {
          var x2 = this.real.width - ox;
          var y2 = this.real.height - oy;
          ox = x2;
          oy = y2;
        }
        if (angle == 90) {
          var x2 = oy;
          var y2 = this.real.height - ox;
          ox = x2;
          oy = y2;
        }
        sx = ox - sw / 2;
        sy = oy - sh / 2;
        var dr = {
          x: 0,
          y: 0,
          w: width,
          h: height
        };
        dr = this.parseRect(dr, -this.rotate);
        return {
          tw: width,
          th: height,
          sx,
          sy,
          sw,
          sh,
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
        var p1 = this.parsePoint({
          x: x1,
          y: y1
        }, angle);
        var p2 = this.parsePoint({
          x: x2,
          y: y2
        }, angle);
        var result = {};
        result.x = Math.min(p1.x, p2.x);
        result.y = Math.min(p1.y, p2.y);
        result.w = Math.abs(p2.x - p1.x);
        result.h = Math.abs(p2.y - p1.y);
        return result;
      },
      parseBlob(base64) {
        var arr = base64.split(",");
        var mime = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n2 = bstr.length;
        var u8arr = new Uint8Array(n2);
        for (var i2 = 0; i2 < n2; i2++) {
          u8arr[i2] = bstr.charCodeAt(i2);
        }
        var url = URL || webkitURL;
        return url.createObjectURL(new Blob([u8arr], {
          type: mime
        }));
      }
    }
  };
  function _sfc_render$L(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.url ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      mode: vue.wp($data.modeValue),
      "change:mode": _ctx.mwx.changeMode,
      rotate: vue.wp($data.rotate),
      "change:rotate": _ctx.mwx.changeRotate
    }, [
      vue.createElementVNode("canvas", {
        "canvas-id": $data.canvasId,
        style: vue.normalizeStyle({ width: $data.target.width + "px", height: $data.target.height + "px" })
      }, null, 12, ["canvas-id"]),
      vue.createElementVNode("view", { class: "panel" }, [
        vue.createElementVNode(
          "view",
          {
            class: "body",
            onTouchstart: _cache[5] || (_cache[5] = (...args) => _ctx.mwx.touchstart && _ctx.mwx.touchstart(...args)),
            onTouchmove: _cache[6] || (_cache[6] = (...args) => _ctx.mwx.touchmove && _ctx.mwx.touchmove(...args)),
            onTouchend: _cache[7] || (_cache[7] = (...args) => _ctx.mwx.touchend && _ctx.mwx.touchend(...args)),
            onTouchcancel: _cache[8] || (_cache[8] = (...args) => _ctx.mwx.touchcancel && _ctx.mwx.touchcancel(...args))
          },
          [
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["image-wrap", { transit: $data.transit }]),
              "change:rect": _ctx.mwx.changeImage,
              rect: vue.wp($data.image)
            }, [
              vue.createElementVNode("image", {
                class: vue.normalizeClass(["image", { transit: $data.transit }]),
                src: $props.url,
                onLoad: _cache[0] || (_cache[0] = (...args) => $options.imageLoad && $options.imageLoad(...args))
              }, null, 42, ["src"])
            ], 10, ["change:rect", "rect"]),
            vue.createElementVNode("view", { class: "mask" }),
            vue.createElementVNode("view", {
              class: vue.normalizeClass(["frame", { transit: $data.transit }]),
              "change:rect": _ctx.mwx.changeFrame,
              rect: vue.wp($data.frame)
            }, [
              vue.createElementVNode("view", { class: "rect" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["image-rect", { transit: $data.transit }])
                  },
                  [
                    vue.createElementVNode("image", {
                      class: vue.normalizeClass(["image", { transit: $data.transit }]),
                      src: $props.url
                    }, null, 10, ["src"])
                  ],
                  2
                  /* CLASS */
                )
              ]),
              vue.createElementVNode("view", { class: "line-one" }),
              vue.createElementVNode("view", { class: "line-two" }),
              vue.createElementVNode("view", { class: "line-three" }),
              vue.createElementVNode("view", { class: "line-four" }),
              vue.createElementVNode(
                "view",
                {
                  class: "frame-left-top",
                  onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.mwx.touchstart && _ctx.mwx.touchstart(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "frame-left-bottom",
                  onTouchstart: _cache[2] || (_cache[2] = (...args) => _ctx.mwx.touchstart && _ctx.mwx.touchstart(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "frame-right-top",
                  onTouchstart: _cache[3] || (_cache[3] = (...args) => _ctx.mwx.touchstart && _ctx.mwx.touchstart(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: "frame-right-bottom",
                  onTouchstart: _cache[4] || (_cache[4] = (...args) => _ctx.mwx.touchstart && _ctx.mwx.touchstart(...args))
                },
                null,
                32
                /* HYDRATE_EVENTS */
              )
            ], 10, ["change:rect", "rect"])
          ],
          32
          /* HYDRATE_EVENTS */
        ),
        vue.createElementVNode("view", { class: "toolbar" }, [
          vue.createElementVNode("view", {
            onClick: _cache[9] || (_cache[9] = (...args) => $options.oncancle && $options.oncancle(...args)),
            class: "btn-cancel"
          }, "取消"),
          vue.createElementVNode("view", {
            onClick: _cache[10] || (_cache[10] = (...args) => $options.rotateAngle && $options.rotateAngle(...args)),
            class: "btn-rotate"
          }, "旋转"),
          vue.createElementVNode("view", {
            onClick: _cache[11] || (_cache[11] = (...args) => $options.onok && $options.onok(...args)),
            class: "btn-ok"
          }, "确定")
        ])
      ])
    ], 8, ["mode", "change:mode", "rotate", "change:rotate"])) : vue.createCommentVNode("v-if", true);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$W);
  const kspCropper = /* @__PURE__ */ _export_sfc(_sfc_main$W, [["render", _sfc_render$L], ["__scopeId", "data-v-ea78cbfb"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/components/Ksp-Cropper/index.vue"]]);
  const baseUrl = "https://mail.sygence.com:8080/customer/api/project";
  const api = {
    login: {
      url: "/customer/min-app/login",
      method: "get"
    },
    getPhone: {
      url: "/customer/min-app/phone",
      method: "post"
    },
    /** 手机验证码*/
    getPhoneCode: {
      url: "/send/sm",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 获取题目分类*/
    getCategoryType: {
      url: "/category/tree",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 获取分类下面的子类*/
    getCategoryTreeChild: {
      url: "/category/search",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 题目关键字搜索*/
    getSearchKeywordList: {
      url: "/questionType/all/list",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 查询章节下所有的试题集*/
    getCategoryId: {
      url: "/chapter/list/by-category-id",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /**获取文档分类*/
    getDocumentList: {
      url: "/document/list",
      method: "post"
    },
    /** 文档下载记录和搜题记录*/
    getHistoryList: {
      url: "/doc-download-record/search-download-record",
      method: "get"
    },
    /** 图片上传通用接口*/
    uploadImg: {
      url: "/common/oss/upload",
      method: "post"
    },
    downLoadDocment: {
      url: "/document/download",
      method: "get"
    },
    /** 收藏问题*/
    collectQuestion: {
      url: "/user-collect/add",
      method: "post"
    },
    /** 取消收藏*/
    removeCollectQuestion: {
      url: "/user-collect/del",
      method: "get"
    },
    /** 收藏分类统计*/
    collectStatus: {
      url: "/user-collect/category/statistic",
      method: "get"
    },
    /**首页收藏分类*/
    indexPageCollectList: {
      url: "/user-collect/category/list",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /**清空收藏的错题*/
    clearCollectAll: {
      url: "/error-question-record/clear",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /**获取错题列表*/
    getErrorQuestionList: {
      url: "/error-question-record/list",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 添加错题*/
    addErrQuestion: {
      url: "/error-question-record/add",
      method: "post"
    },
    /**批量添加错题记录*/
    addErrQuestionList: {
      url: "/error-question-record/add-batch",
      method: "post"
    },
    /** 添加笔记*/
    addNotes: {
      url: "/notes/add",
      method: "post"
    },
    /** 获取笔记*/
    getNodeList: {
      url: "/notes/list",
      method: "post"
    },
    /**分类下收藏的题*/
    getCollectQuestion: {
      url: "/user-collect/question/list",
      method: "post"
    },
    /** 拍照搜题*/
    imgSearch: {
      url: "/question/image/search",
      method: "post",
      contentType: "multipart/form-data"
    },
    /** 拍照搜题base64*/
    imgSearchBase64: {
      url: "/question/image/search-by-base64",
      method: "post"
      // contentType: 'multipart/form-data'
    },
    /** 题目练习详情页*/
    getCategoryIdDetail: {
      url: "/category/index/statistic",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 答题页面API*/
    /**
     * 根据categoryId分页查询题目
     * 
     * */
    getQuestionList: {
      url: "/question/list",
      method: "post"
    },
    /** 微信支付*/
    wxPay: {
      url: "/pay-order/pay",
      method: "post"
    },
    // 会员页面
    // 分页查询vip配置
    postVipList: {
      url: "/vip-config/list",
      method: "post"
    },
    /** 激活码*/
    vipActive: {
      url: "/customer/vip-active",
      method: "post"
    },
    // 查询当前账号会员信息
    getVipStatic: {
      url: "/customer/vip-statistic",
      method: "get"
    },
    //错题反馈和 我的返回内容
    feedBackInfo: {
      url: "/feedback/add",
      method: "post"
    },
    //获取用户收藏下的题目
    getUserCollectQuestion: {
      url: "/user-collect/question/list",
      method: "post"
    },
    //当前分类下登陆用户的相关统计
    getUserCategory: {
      url: "/category/category/statistic",
      method: "get"
    },
    //获取题型信息
    getQuestionType: {
      url: "/question/type/statistic",
      method: "get"
    },
    //获取试题集统计
    getQuestionPaper: {
      url: "/question/paper/statistic",
      method: "get"
    },
    /** 根据分类获取所有科目*/
    getSubjectList: {
      url: "/subject/all-list",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    },
    /** 添加考试记录*/
    addExamRecord: {
      url: "/examRecord/add",
      method: "post"
    },
    /** 获取客户端消息*/
    getMessageList: {
      url: "/messageClient/list",
      method: "get"
    },
    getExamInfoList: {
      url: "/exam-info/detail-by-category",
      method: "get"
    },
    /** 获取错题的分类列表*/
    getErrQuestionList: {
      url: "/error-question-record/error-question",
      method: "get"
    },
    /** 取消收藏*/
    delCollectSubject: {
      url: "/user-collect/del-category",
      method: "get",
      contentType: "application/x-www-form-urlencoded"
    }
  };
  function request(name, opt = {}) {
    formatAppLog("log", "at utils/http.js:14", name, opt, "获取请求的参数");
    let {
      params,
      contentType,
      isBody = "true",
      query = "",
      callBack
    } = opt;
    let head = [];
    let url = baseUrl + api[name]["url"] + query;
    head = {
      "Ac-Token": uni.getStorageSync("token") || "",
      "Content-Type": api[name]["contentType"] ? api[name]["contentType"] : "application/json",
      "Accept": "application/json"
    };
    uni.request({
      url,
      // 接口请求地址
      data: opt.params,
      header: head,
      method: api[name].method == void 0 ? "POST" : api[name].method,
      dataType: "json",
      responseType: opt.responseType === void 0 ? "text" : opt.responseType,
      success: function(res) {
        const {
          data: {
            code,
            data,
            message
          }
        } = res;
        if (code === 1405) {
          formatAppLog("log", "at utils/http.js:47", "登陆过期");
          wechat.wxLogin();
          return;
        }
        if (code === 1500) {
          return;
        }
        callBack(data);
      },
      fail: function(res) {
        uni.hideLoading();
        setTimeout(() => {
          uni.showToast({
            title: "服务器打了个盹~",
            icon: "none"
          });
        }, 1);
      }
    });
  }
  const wechat = {
    // 判断是否在微信中
    isWechat() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 获取微信个人信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        uni.getUserProfile({
          desc: "获取个人信息",
          success: (res) => {
            resolve(res.userInfo);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    // 获取微信code
    getJsCode() {
      return new Promise((resolve, reject) => {
        uni.login({
          success(res) {
            resolve(res.code);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    getUserPhone(res) {
      let opt = {
        params: {
          "openId": uni.getStorageSync("openid"),
          "sessionKey": uni.getStorageSync("sessionKey"),
          "encryptedDataUserInfo": uni.getStorageSync("encryptedDataUserInfo"),
          "ivUserInfo": uni.getStorageSync("ivUserInfo"),
          "encryptedData": res.encryptedData,
          "iv": res.iv,
          "unionId": res.cloudID
        },
        "Content-Type": "application/json",
        callBack: (res2) => {
          formatAppLog("log", "at utils/wechat.js:59", "获取手机号", res2);
          if (res2) {
            uni.switchTab({
              url: "/pages/my/my"
            });
          }
        }
      };
      request("getPhone", opt);
    },
    wxLogin() {
      uni.login({
        provider: "weixin",
        success: function(loginRes) {
          if (loginRes.errMsg === "login:ok") {
            let opt = {
              params: {
                "code": loginRes.code
              },
              callBack: (res) => {
                uni.setStorageSync("openid", res.openid);
                uni.setStorageSync("sessionKey", res.sessionKey);
                uni.setStorageSync("minAppNewUserFlag", res.minAppNewUserFlag);
                if (!res.minAppNewUserFlag) {
                  uni.setStorageSync("userInfo", res);
                  uni.setStorageSync("token", res.token);
                }
              },
              contentType: "application/x-www-form-urlencoded"
            };
            request("login", opt);
          }
        }
      });
    },
    /**
     * 唤起微信支付
     * @param {Object} paydata 支付需要的参数
     * @param {Object} cb 成功回调
     * @param {Object} errorCb 失败回调
     */
    callWexinPay(paydata, cb, errorCb) {
      paydata.appId;
      const timestamp = paydata.timeStamp;
      const nonceStr = paydata.nonceStr;
      const packages = paydata.packageValue;
      const paySign = paydata.paySign;
      const signType = paydata.signType;
      const desc = paydata.desc;
      this.getWxConfig(() => {
        wx.ready(function() {
          formatAppLog("log", "at utils/wechat.js:152", paydata);
          wx.chooseWXPay({
            timestamp,
            // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr,
            // 支付签名随机串，不长于 32 位
            package: packages,
            // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType,
            // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign,
            // 支付签名
            desc,
            // 描述
            success: function(res) {
              cb(res);
            },
            fail: function(res) {
              errorCb(res);
            }
          });
        });
        wx.error(function(res) {
        });
      });
    },
    /**
     * 唤起微信分享
     * @param {Object} sharedata 分享需要的参数
     * @param {Object} cb 成功回调
     * @param {Object} errorCb 失败回调
     */
    callWexinShare(sharedata, cb, errorCb) {
      this.getWxConfig(() => {
        wx.ready(function() {
          formatAppLog("log", "at utils/wechat.js:184", JSON.stringify(sharedata));
          wx.updateAppMessageShareData({
            title: sharedata.title,
            // 分享标题
            link: sharedata.link,
            // 分享链接
            imgUrl: sharedata.imgUrl,
            // 分享图标
            desc: sharedata.desc,
            // 分享描述
            success: function(res) {
              cb(res);
            },
            cancel: function(cancelMsg) {
              errorCb(cancelMsg);
            }
          });
        });
        wx.error(function(res) {
        });
      });
    },
    /**
     * scanQRCode-扫码
     * @param {Object} paydata 支付需要的参数
     * @param {Object} cb 成功回调
     * @param {Object} errorCb 失败回调
     */
    scanQRCode(cb, errorCb) {
      this.getWxConfig(() => {
        wx.ready(function() {
          wx.scanQRCode({
            needResult: 1,
            // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"],
            // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
              var result = res.resultStr;
              cb(result);
            },
            fail: function(res) {
              errorCb(res);
            }
          });
        });
        wx.error(function(res) {
        });
      });
    },
    /**
     * getLocation-获取地理位置信息
     * @param {Object} cb 成功回调
     * @param {Object} errorCb 失败回调
     */
    getLocation(cb, errorCb) {
      this.getWxConfig(() => {
        wx.ready(function() {
          wx.getLocation({
            type: "wgs84",
            // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
              cb(res);
            },
            fail: function(res) {
              errorCb(res);
            }
          });
        });
        wx.error(function(res) {
        });
      });
    }
  };
  function getLocalFilePath(path) {
    if (path.indexOf("_www") === 0 || path.indexOf("_doc") === 0 || path.indexOf("_documents") === 0 || path.indexOf("_downloads") === 0) {
      return path;
    }
    if (path.indexOf("file://") === 0) {
      return path;
    }
    if (path.indexOf("/storage/emulated/0/") === 0) {
      return path;
    }
    if (path.indexOf("/") === 0) {
      var localFilePath = plus.io.convertAbsoluteFileSystem(path);
      if (localFilePath !== path) {
        return localFilePath;
      } else {
        path = path.substr(1);
      }
    }
    return "_www/" + path;
  }
  function pathToBase64(path) {
    return new Promise(function(resolve, reject) {
      if (typeof window === "object" && "document" in window) {
        if (typeof FileReader === "function") {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", path, true);
          xhr.responseType = "blob";
          xhr.onload = function() {
            if (this.status === 200) {
              let fileReader = new FileReader();
              fileReader.onload = function(e) {
                resolve(e.target.result);
              };
              fileReader.onerror = reject;
              fileReader.readAsDataURL(this.response);
            }
          };
          xhr.onerror = reject;
          xhr.send();
          return;
        }
        var canvas = document.createElement("canvas");
        var c2x = canvas.getContext("2d");
        var img = new Image();
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          c2x.drawImage(img, 0, 0);
          resolve(canvas.toDataURL());
          canvas.height = canvas.width = 0;
        };
        img.onerror = reject;
        img.src = path;
        return;
      }
      if (typeof plus === "object") {
        plus.io.resolveLocalFileSystemURL(getLocalFilePath(path), function(entry) {
          entry.file(function(file) {
            var fileReader = new plus.io.FileReader();
            fileReader.onload = function(data) {
              resolve(data.target.result);
            };
            fileReader.onerror = function(error) {
              reject(error);
            };
            fileReader.readAsDataURL(file);
          }, function(error) {
            reject(error);
          });
        }, function(error) {
          reject(error);
        });
        return;
      }
      if (typeof wx === "object" && wx.canIUse("getFileSystemManager")) {
        wx.getFileSystemManager().readFile({
          filePath: path,
          encoding: "base64",
          success: function(res) {
            resolve("data:image/png;base64," + res.data);
          },
          fail: function(error) {
            reject(error);
          }
        });
        return;
      }
      reject(new Error("not support"));
    });
  }
  const _sfc_main$V = {
    __name: "index",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      onReady(() => {
      });
      onShow(() => {
        let token = uni.getStorageSync("token");
        getHotDocument();
        token && getMyAnswerList();
        !token && wechat.wxLogin();
      });
      onLoad(() => {
      });
      const popup2 = vue.ref(null);
      const opt = ["A", "B", "C", "D"];
      const jumpPage = (val) => {
        uni.navigateTo({
          url: val === 0 ? "../index/search?type=0" : "./docSearch"
        });
      };
      let items = vue.ref(["热门文档", "我的题库"]);
      let current = vue.ref(0);
      vue.ref(0);
      let activeColor = vue.ref("#007aff");
      let styleType = vue.ref("text");
      let url = vue.ref("");
      let path = vue.ref("");
      vue.ref("");
      let show = vue.ref(true);
      const pageParams = vue.reactive({
        page: 1,
        size: 10
      });
      let hotDocumentList = vue.ref([]);
      const getHotDocument = () => {
        let opt2 = {
          params: {
            page: pageParams.page,
            size: pageParams.size
          },
          callBack: (e) => {
            hotDocumentList.value = e.records.filter((item) => item.hotFlag);
            formatAppLog("log", "at pages/index/index.vue:177", hotDocumentList, "获取分页文档");
          }
        };
        $http("getDocumentList", opt2);
      };
      const select = () => {
        uni.chooseImage({
          count: 1,
          encoding: "base64",
          success: (res) => {
            url.value = res.tempFilePaths[0];
          }
        });
      };
      const change = (e) => {
        show.value = e.show;
      };
      const imgToBase64 = (img) => {
        pathToBase64(img).then((base64) => {
          postImgSearch(base64.split("data:image/png;base64,")[1]);
        }).catch((error) => {
          formatAppLog("error", "at pages/index/index.vue:220", error);
        });
      };
      let answerList = vue.ref([]);
      const getMyAnswerList = () => {
        let opt2 = {
          callBack: (res) => {
            formatAppLog("log", "at pages/index/index.vue:228", "获取的列表", res);
            answerList.value = res;
          }
        };
        $http("indexPageCollectList", opt2);
      };
      const answerJump = (item) => {
        formatAppLog("log", "at pages/index/index.vue:235", "item", item);
        uni.setStorageSync("categoryId", item.categoryId);
        uni.navigateTo({
          url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.category.categoryName}`
        });
      };
      let searchDeatil = vue.ref([]);
      const postImgSearch = (file) => {
        searchDeatil.value = [];
        uni.showLoading({
          title: "加载中"
        });
        let opt2 = {
          params: {
            ecode: file,
            page: 1,
            size: 10
          },
          callBack: (e) => {
            uni.hideLoading();
            if (e.code = 1200) {
              searchDeatil.value = e.records;
              popup2.value.open("bottom");
            } else {
              uni.showToast({
                title: e.message,
                icon: "error",
                duration: 1e3
              });
            }
            formatAppLog("log", "at pages/index/index.vue:267", "e", e);
          }
        };
        $http("imgSearchBase64", opt2);
      };
      const goDocumentView = (item) => {
        formatAppLog("log", "at pages/index/index.vue:275", item);
        uni.setStorageSync("docDetail", item);
        uni.navigateTo({
          url: `../docView/docView`
        });
      };
      const imgUrl = vue.ref("");
      const onok = (ev) => {
        url.value = "";
        imgUrl.value = ev.path;
        imgToBase64(ev.path);
      };
      const oncancel = () => {
        url.value = "";
      };
      const onClickItem = (e) => {
        if (current.value !== e.currentIndex) {
          current.value = e.currentIndex;
        }
      };
      return (_ctx, _cache) => {
        const _component_page_meta = resolveEasycom(vue.resolveDynamicComponent("page-meta"), __easycom_0$9);
        const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_0$8);
        const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_2$4);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1$5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createVNode(_component_page_meta, {
              "page-style": "overflow:" + (vue.unref(show) ? "hidden" : "visible")
            }, null, 8, ["page-style"]),
            vue.createElementVNode("view", { class: "container" }, [
              vue.createElementVNode("view", { style: { "padding": "20px" } }, [
                vue.createElementVNode("view", { class: "title" }, [
                  vue.createElementVNode("text", { class: "text-title" }, "Hey,早上好"),
                  vue.createElementVNode("img", {
                    class: "img-title",
                    src: "/static/page/search.png",
                    alt: "search"
                  })
                ]),
                vue.createElementVNode("view", { class: "messag-text" }, [
                  vue.createElementVNode("text", null, "一日之计在于晨，快来刷题通一起学习吧")
                ]),
                vue.createElementVNode("view", {
                  class: "smart-img",
                  onClick: select
                }, [
                  vue.createElementVNode("img", {
                    class: "search-img",
                    src: "/static/page/smartResponse.png",
                    alt: "smartResponse"
                  })
                ]),
                vue.createElementVNode("view", { class: "text-file-search" }, [
                  vue.createElementVNode("img", {
                    class: "search-two",
                    src: "/static/page/text-search.png",
                    alt: "",
                    onClick: _cache[0] || (_cache[0] = ($event) => jumpPage(0))
                  }),
                  vue.createElementVNode("img", {
                    class: "search-two",
                    src: "/static/page/file-search.png",
                    alt: "",
                    onClick: _cache[1] || (_cache[1] = ($event) => jumpPage(1))
                  })
                ]),
                vue.createVNode(_component_uni_section, null, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "uni-padding-wrap uni-common-mt" }, [
                      vue.createVNode(_component_uni_segmented_control, {
                        current: vue.unref(current),
                        values: vue.unref(items),
                        "style-type": vue.unref(styleType),
                        "active-color": vue.unref(activeColor),
                        onClickItem
                      }, null, 8, ["current", "values", "style-type", "active-color"])
                    ]),
                    vue.createElementVNode("view", { class: "content" }, [
                      vue.unref(current) === 0 ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 0,
                          class: "doc",
                          style: vue.normalizeStyle({ "width": vue.unref(hotDocumentList).length === 0 ? "100%" : null })
                        },
                        [
                          vue.unref(hotDocumentList).length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "content-text"
                          }, "暂无数据")) : (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            { key: 1 },
                            vue.renderList(vue.unref(hotDocumentList), (item) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                class: "doc-item",
                                onClick: ($event) => goDocumentView(item),
                                key: item.docId
                              }, [
                                vue.createElementVNode("view", { class: "doc-img" }, [
                                  vue.createElementVNode("img", {
                                    src: item.coverImage,
                                    style: { "height": "140rpx", "width": "110rpx" }
                                  }, null, 8, ["src"])
                                ]),
                                vue.createElementVNode("view", { class: "doc-content" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "item-title" },
                                    vue.toDisplayString(item.docName),
                                    1
                                    /* TEXT */
                                  ),
                                  (vue.openBlock(true), vue.createElementBlock(
                                    vue.Fragment,
                                    null,
                                    vue.renderList(item.tags, (it2, idx) => {
                                      return vue.openBlock(), vue.createElementBlock("text", {
                                        class: "item-tags",
                                        key: it2
                                      }, [
                                        vue.createTextVNode(
                                          vue.toDisplayString(it2) + " ",
                                          1
                                          /* TEXT */
                                        ),
                                        idx != item.tags.length - 1 ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "|")) : vue.createCommentVNode("v-if", true)
                                      ]);
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  )),
                                  vue.createElementVNode(
                                    "text",
                                    { class: "download-num" },
                                    vue.toDisplayString(item.downloadNum) + "下载",
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ], 8, ["onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ],
                        4
                        /* STYLE */
                      )) : vue.createCommentVNode("v-if", true),
                      vue.unref(current) === 1 ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: "ans",
                          style: vue.normalizeStyle({ "width": vue.unref(answerList).length === 0 ? "100%" : null })
                        },
                        [
                          vue.unref(answerList).length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                            vue.Fragment,
                            { key: 0 },
                            vue.renderList(vue.unref(answerList), (item, index) => {
                              return vue.openBlock(), vue.createElementBlock("view", {
                                class: "ans-item",
                                key: index,
                                onClick: ($event) => answerJump(item)
                              }, [
                                vue.createElementVNode("view", { class: "img-box" }, [
                                  vue.createElementVNode("img", {
                                    class: "ans-icon",
                                    src: "/static/constructor/answer.png",
                                    alt: ""
                                  })
                                ]),
                                vue.createElementVNode("view", { class: "ans-content" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "ans-title" },
                                    vue.toDisplayString(item.category.categoryName),
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createElementVNode("view", { class: "ans-text" }, [
                                    vue.createElementVNode("img", {
                                      class: "text-icon",
                                      src: "/static/constructor/docNumber.png",
                                      alt: ""
                                    }),
                                    vue.createTextVNode(
                                      " " + vue.toDisplayString(item.categoryQuestionNum || 0) + "题",
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  vue.createElementVNode("view", { class: "ans-text" }, [
                                    vue.createElementVNode("img", {
                                      class: "text-icon",
                                      src: "/static/constructor/time.png",
                                      alt: ""
                                    }),
                                    vue.createTextVNode(
                                      " " + vue.toDisplayString(item.createTime),
                                      1
                                      /* TEXT */
                                    )
                                  ])
                                ])
                              ], 8, ["onClick"]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          )) : (vue.openBlock(), vue.createElementBlock(
                            "view",
                            {
                              key: 1,
                              class: "content-text",
                              style: vue.normalizeStyle({ "width": vue.unref(answerList).length === 0 ? "100%" : null, "text-align": "center" })
                            },
                            "暂无数据",
                            4
                            /* STYLE */
                          ))
                        ],
                        4
                        /* STYLE */
                      )) : vue.createCommentVNode("v-if", true)
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              vue.createCommentVNode(` 	<uni-popup ref="popup" safeArea backgroundColor="#fff" @change="change">\r
			<view class="popup-content" :class="{ 'popup-height': type === 'left' || type === 'right' }">\r
				<text class="text">popup 内容</text>\r
			</view>\r
		</uni-popup> `),
              vue.createVNode(
                _component_uni_popup,
                {
                  ref_key: "popup",
                  ref: popup2,
                  "background-color": "#fff",
                  onChange: change
                },
                {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("view", { class: "popup-content" }, [
                      vue.unref(searchDeatil).length > 0 ? (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        { key: 0 },
                        vue.renderList(vue.unref(searchDeatil), (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "popup-text",
                            key: index
                          }, [
                            vue.createElementVNode(
                              "text",
                              { class: "question-title" },
                              vue.toDisplayString(index + 1) + "、" + vue.toDisplayString(item.questionTitle),
                              1
                              /* TEXT */
                            ),
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(item.options, (it2, idx) => {
                                return vue.openBlock(), vue.createElementBlock(
                                  "text",
                                  {
                                    class: "question-item",
                                    key: idx
                                  },
                                  vue.toDisplayString(opt[idx]) + "、" + vue.toDisplayString(it2),
                                  1
                                  /* TEXT */
                                );
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            vue.createElementVNode("text", { class: "right-item" }, [
                              vue.createTextVNode("正确答案:"),
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(item.rightOptions, (it2, itx) => {
                                  return vue.openBlock(), vue.createElementBlock(
                                    "text",
                                    { key: itx },
                                    vue.toDisplayString(it2) + " ",
                                    1
                                    /* TEXT */
                                  );
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ]),
                            vue.createElementVNode("br"),
                            vue.createElementVNode(
                              "text",
                              { class: "right-item" },
                              "解析:" + vue.toDisplayString(item.analysis || "暂无"),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, "暂无数据"))
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                },
                512
                /* NEED_PATCH */
              ),
              vue.createCommentVNode(' <button @click="select">选择图片</button> '),
              vue.unref(path) ? (vue.openBlock(), vue.createElementBlock("image", {
                key: 0,
                mode: "widthFix",
                src: vue.unref(path)
              }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(vue.unref(kspCropper), {
                mode: "free",
                width: 600,
                height: 440,
                maxWidth: 1024,
                maxHeight: 1024,
                url: vue.unref(url),
                onCancel: oncancel,
                onOk: onok
              }, null, 8, ["url"])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/index/index.vue"]]);
  const icons = {
    "id": "2852637",
    "name": "uniui图标库",
    "font_family": "uniicons",
    "css_prefix_text": "uniui-",
    "description": "",
    "glyphs": [
      {
        "icon_id": "25027049",
        "name": "yanse",
        "font_class": "color",
        "unicode": "e6cf",
        "unicode_decimal": 59087
      },
      {
        "icon_id": "25027048",
        "name": "wallet",
        "font_class": "wallet",
        "unicode": "e6b1",
        "unicode_decimal": 59057
      },
      {
        "icon_id": "25015720",
        "name": "settings-filled",
        "font_class": "settings-filled",
        "unicode": "e6ce",
        "unicode_decimal": 59086
      },
      {
        "icon_id": "25015434",
        "name": "shimingrenzheng-filled",
        "font_class": "auth-filled",
        "unicode": "e6cc",
        "unicode_decimal": 59084
      },
      {
        "icon_id": "24934246",
        "name": "shop-filled",
        "font_class": "shop-filled",
        "unicode": "e6cd",
        "unicode_decimal": 59085
      },
      {
        "icon_id": "24934159",
        "name": "staff-filled-01",
        "font_class": "staff-filled",
        "unicode": "e6cb",
        "unicode_decimal": 59083
      },
      {
        "icon_id": "24932461",
        "name": "VIP-filled",
        "font_class": "vip-filled",
        "unicode": "e6c6",
        "unicode_decimal": 59078
      },
      {
        "icon_id": "24932462",
        "name": "plus_circle_fill",
        "font_class": "plus-filled",
        "unicode": "e6c7",
        "unicode_decimal": 59079
      },
      {
        "icon_id": "24932463",
        "name": "folder_add-filled",
        "font_class": "folder-add-filled",
        "unicode": "e6c8",
        "unicode_decimal": 59080
      },
      {
        "icon_id": "24932464",
        "name": "yanse-filled",
        "font_class": "color-filled",
        "unicode": "e6c9",
        "unicode_decimal": 59081
      },
      {
        "icon_id": "24932465",
        "name": "tune-filled",
        "font_class": "tune-filled",
        "unicode": "e6ca",
        "unicode_decimal": 59082
      },
      {
        "icon_id": "24932455",
        "name": "a-rilidaka-filled",
        "font_class": "calendar-filled",
        "unicode": "e6c0",
        "unicode_decimal": 59072
      },
      {
        "icon_id": "24932456",
        "name": "notification-filled",
        "font_class": "notification-filled",
        "unicode": "e6c1",
        "unicode_decimal": 59073
      },
      {
        "icon_id": "24932457",
        "name": "wallet-filled",
        "font_class": "wallet-filled",
        "unicode": "e6c2",
        "unicode_decimal": 59074
      },
      {
        "icon_id": "24932458",
        "name": "paihangbang-filled",
        "font_class": "medal-filled",
        "unicode": "e6c3",
        "unicode_decimal": 59075
      },
      {
        "icon_id": "24932459",
        "name": "gift-filled",
        "font_class": "gift-filled",
        "unicode": "e6c4",
        "unicode_decimal": 59076
      },
      {
        "icon_id": "24932460",
        "name": "fire-filled",
        "font_class": "fire-filled",
        "unicode": "e6c5",
        "unicode_decimal": 59077
      },
      {
        "icon_id": "24928001",
        "name": "refreshempty",
        "font_class": "refreshempty",
        "unicode": "e6bf",
        "unicode_decimal": 59071
      },
      {
        "icon_id": "24926853",
        "name": "location-ellipse",
        "font_class": "location-filled",
        "unicode": "e6af",
        "unicode_decimal": 59055
      },
      {
        "icon_id": "24926735",
        "name": "person-filled",
        "font_class": "person-filled",
        "unicode": "e69d",
        "unicode_decimal": 59037
      },
      {
        "icon_id": "24926703",
        "name": "personadd-filled",
        "font_class": "personadd-filled",
        "unicode": "e698",
        "unicode_decimal": 59032
      },
      {
        "icon_id": "24923351",
        "name": "back",
        "font_class": "back",
        "unicode": "e6b9",
        "unicode_decimal": 59065
      },
      {
        "icon_id": "24923352",
        "name": "forward",
        "font_class": "forward",
        "unicode": "e6ba",
        "unicode_decimal": 59066
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrow-right",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923353",
        "name": "arrowthinright",
        "font_class": "arrowthinright",
        "unicode": "e6bb",
        "unicode_decimal": 59067
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrow-left",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923354",
        "name": "arrowthinleft",
        "font_class": "arrowthinleft",
        "unicode": "e6bc",
        "unicode_decimal": 59068
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrow-up",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923355",
        "name": "arrowthinup",
        "font_class": "arrowthinup",
        "unicode": "e6bd",
        "unicode_decimal": 59069
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrow-down",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923356",
        "name": "arrowthindown",
        "font_class": "arrowthindown",
        "unicode": "e6be",
        "unicode_decimal": 59070
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "bottom",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923349",
        "name": "arrowdown",
        "font_class": "arrowdown",
        "unicode": "e6b8",
        "unicode_decimal": 59064
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "right",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923346",
        "name": "arrowright",
        "font_class": "arrowright",
        "unicode": "e6b5",
        "unicode_decimal": 59061
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "top",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923347",
        "name": "arrowup",
        "font_class": "arrowup",
        "unicode": "e6b6",
        "unicode_decimal": 59062
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "left",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923348",
        "name": "arrowleft",
        "font_class": "arrowleft",
        "unicode": "e6b7",
        "unicode_decimal": 59063
      },
      {
        "icon_id": "24923334",
        "name": "eye",
        "font_class": "eye",
        "unicode": "e651",
        "unicode_decimal": 58961
      },
      {
        "icon_id": "24923335",
        "name": "eye-filled",
        "font_class": "eye-filled",
        "unicode": "e66a",
        "unicode_decimal": 58986
      },
      {
        "icon_id": "24923336",
        "name": "eye-slash",
        "font_class": "eye-slash",
        "unicode": "e6b3",
        "unicode_decimal": 59059
      },
      {
        "icon_id": "24923337",
        "name": "eye-slash-filled",
        "font_class": "eye-slash-filled",
        "unicode": "e6b4",
        "unicode_decimal": 59060
      },
      {
        "icon_id": "24923305",
        "name": "info-filled",
        "font_class": "info-filled",
        "unicode": "e649",
        "unicode_decimal": 58953
      },
      {
        "icon_id": "24923299",
        "name": "reload-01",
        "font_class": "reload",
        "unicode": "e6b2",
        "unicode_decimal": 59058
      },
      {
        "icon_id": "24923195",
        "name": "mic_slash_fill",
        "font_class": "micoff-filled",
        "unicode": "e6b0",
        "unicode_decimal": 59056
      },
      {
        "icon_id": "24923165",
        "name": "map-pin-ellipse",
        "font_class": "map-pin-ellipse",
        "unicode": "e6ac",
        "unicode_decimal": 59052
      },
      {
        "icon_id": "24923166",
        "name": "map-pin",
        "font_class": "map-pin",
        "unicode": "e6ad",
        "unicode_decimal": 59053
      },
      {
        "icon_id": "24923167",
        "name": "location",
        "font_class": "location",
        "unicode": "e6ae",
        "unicode_decimal": 59054
      },
      {
        "icon_id": "24923064",
        "name": "starhalf",
        "font_class": "starhalf",
        "unicode": "e683",
        "unicode_decimal": 59011
      },
      {
        "icon_id": "24923065",
        "name": "star",
        "font_class": "star",
        "unicode": "e688",
        "unicode_decimal": 59016
      },
      {
        "icon_id": "24923066",
        "name": "star-filled",
        "font_class": "star-filled",
        "unicode": "e68f",
        "unicode_decimal": 59023
      },
      {
        "icon_id": "24899646",
        "name": "a-rilidaka",
        "font_class": "calendar",
        "unicode": "e6a0",
        "unicode_decimal": 59040
      },
      {
        "icon_id": "24899647",
        "name": "fire",
        "font_class": "fire",
        "unicode": "e6a1",
        "unicode_decimal": 59041
      },
      {
        "icon_id": "24899648",
        "name": "paihangbang",
        "font_class": "medal",
        "unicode": "e6a2",
        "unicode_decimal": 59042
      },
      {
        "icon_id": "24899649",
        "name": "font",
        "font_class": "font",
        "unicode": "e6a3",
        "unicode_decimal": 59043
      },
      {
        "icon_id": "24899650",
        "name": "gift",
        "font_class": "gift",
        "unicode": "e6a4",
        "unicode_decimal": 59044
      },
      {
        "icon_id": "24899651",
        "name": "link",
        "font_class": "link",
        "unicode": "e6a5",
        "unicode_decimal": 59045
      },
      {
        "icon_id": "24899652",
        "name": "notification",
        "font_class": "notification",
        "unicode": "e6a6",
        "unicode_decimal": 59046
      },
      {
        "icon_id": "24899653",
        "name": "staff",
        "font_class": "staff",
        "unicode": "e6a7",
        "unicode_decimal": 59047
      },
      {
        "icon_id": "24899654",
        "name": "VIP",
        "font_class": "vip",
        "unicode": "e6a8",
        "unicode_decimal": 59048
      },
      {
        "icon_id": "24899655",
        "name": "folder_add",
        "font_class": "folder-add",
        "unicode": "e6a9",
        "unicode_decimal": 59049
      },
      {
        "icon_id": "24899656",
        "name": "tune",
        "font_class": "tune",
        "unicode": "e6aa",
        "unicode_decimal": 59050
      },
      {
        "icon_id": "24899657",
        "name": "shimingrenzheng",
        "font_class": "auth",
        "unicode": "e6ab",
        "unicode_decimal": 59051
      },
      {
        "icon_id": "24899565",
        "name": "person",
        "font_class": "person",
        "unicode": "e699",
        "unicode_decimal": 59033
      },
      {
        "icon_id": "24899566",
        "name": "email-filled",
        "font_class": "email-filled",
        "unicode": "e69a",
        "unicode_decimal": 59034
      },
      {
        "icon_id": "24899567",
        "name": "phone-filled",
        "font_class": "phone-filled",
        "unicode": "e69b",
        "unicode_decimal": 59035
      },
      {
        "icon_id": "24899568",
        "name": "phone",
        "font_class": "phone",
        "unicode": "e69c",
        "unicode_decimal": 59036
      },
      {
        "icon_id": "24899570",
        "name": "email",
        "font_class": "email",
        "unicode": "e69e",
        "unicode_decimal": 59038
      },
      {
        "icon_id": "24899571",
        "name": "personadd",
        "font_class": "personadd",
        "unicode": "e69f",
        "unicode_decimal": 59039
      },
      {
        "icon_id": "24899558",
        "name": "chatboxes-filled",
        "font_class": "chatboxes-filled",
        "unicode": "e692",
        "unicode_decimal": 59026
      },
      {
        "icon_id": "24899559",
        "name": "contact",
        "font_class": "contact",
        "unicode": "e693",
        "unicode_decimal": 59027
      },
      {
        "icon_id": "24899560",
        "name": "chatbubble-filled",
        "font_class": "chatbubble-filled",
        "unicode": "e694",
        "unicode_decimal": 59028
      },
      {
        "icon_id": "24899561",
        "name": "contact-filled",
        "font_class": "contact-filled",
        "unicode": "e695",
        "unicode_decimal": 59029
      },
      {
        "icon_id": "24899562",
        "name": "chatboxes",
        "font_class": "chatboxes",
        "unicode": "e696",
        "unicode_decimal": 59030
      },
      {
        "icon_id": "24899563",
        "name": "chatbubble",
        "font_class": "chatbubble",
        "unicode": "e697",
        "unicode_decimal": 59031
      },
      {
        "icon_id": "24881290",
        "name": "upload-filled",
        "font_class": "upload-filled",
        "unicode": "e68e",
        "unicode_decimal": 59022
      },
      {
        "icon_id": "24881292",
        "name": "upload",
        "font_class": "upload",
        "unicode": "e690",
        "unicode_decimal": 59024
      },
      {
        "icon_id": "24881293",
        "name": "weixin",
        "font_class": "weixin",
        "unicode": "e691",
        "unicode_decimal": 59025
      },
      {
        "icon_id": "24881274",
        "name": "compose",
        "font_class": "compose",
        "unicode": "e67f",
        "unicode_decimal": 59007
      },
      {
        "icon_id": "24881275",
        "name": "qq",
        "font_class": "qq",
        "unicode": "e680",
        "unicode_decimal": 59008
      },
      {
        "icon_id": "24881276",
        "name": "download-filled",
        "font_class": "download-filled",
        "unicode": "e681",
        "unicode_decimal": 59009
      },
      {
        "icon_id": "24881277",
        "name": "pengyouquan",
        "font_class": "pyq",
        "unicode": "e682",
        "unicode_decimal": 59010
      },
      {
        "icon_id": "24881279",
        "name": "sound",
        "font_class": "sound",
        "unicode": "e684",
        "unicode_decimal": 59012
      },
      {
        "icon_id": "24881280",
        "name": "trash-filled",
        "font_class": "trash-filled",
        "unicode": "e685",
        "unicode_decimal": 59013
      },
      {
        "icon_id": "24881281",
        "name": "sound-filled",
        "font_class": "sound-filled",
        "unicode": "e686",
        "unicode_decimal": 59014
      },
      {
        "icon_id": "24881282",
        "name": "trash",
        "font_class": "trash",
        "unicode": "e687",
        "unicode_decimal": 59015
      },
      {
        "icon_id": "24881284",
        "name": "videocam-filled",
        "font_class": "videocam-filled",
        "unicode": "e689",
        "unicode_decimal": 59017
      },
      {
        "icon_id": "24881285",
        "name": "spinner-cycle",
        "font_class": "spinner-cycle",
        "unicode": "e68a",
        "unicode_decimal": 59018
      },
      {
        "icon_id": "24881286",
        "name": "weibo",
        "font_class": "weibo",
        "unicode": "e68b",
        "unicode_decimal": 59019
      },
      {
        "icon_id": "24881288",
        "name": "videocam",
        "font_class": "videocam",
        "unicode": "e68c",
        "unicode_decimal": 59020
      },
      {
        "icon_id": "24881289",
        "name": "download",
        "font_class": "download",
        "unicode": "e68d",
        "unicode_decimal": 59021
      },
      {
        "icon_id": "24879601",
        "name": "help",
        "font_class": "help",
        "unicode": "e679",
        "unicode_decimal": 59001
      },
      {
        "icon_id": "24879602",
        "name": "navigate-filled",
        "font_class": "navigate-filled",
        "unicode": "e67a",
        "unicode_decimal": 59002
      },
      {
        "icon_id": "24879603",
        "name": "plusempty",
        "font_class": "plusempty",
        "unicode": "e67b",
        "unicode_decimal": 59003
      },
      {
        "icon_id": "24879604",
        "name": "smallcircle",
        "font_class": "smallcircle",
        "unicode": "e67c",
        "unicode_decimal": 59004
      },
      {
        "icon_id": "24879605",
        "name": "minus-filled",
        "font_class": "minus-filled",
        "unicode": "e67d",
        "unicode_decimal": 59005
      },
      {
        "icon_id": "24879606",
        "name": "micoff",
        "font_class": "micoff",
        "unicode": "e67e",
        "unicode_decimal": 59006
      },
      {
        "icon_id": "24879588",
        "name": "closeempty",
        "font_class": "closeempty",
        "unicode": "e66c",
        "unicode_decimal": 58988
      },
      {
        "icon_id": "24879589",
        "name": "clear",
        "font_class": "clear",
        "unicode": "e66d",
        "unicode_decimal": 58989
      },
      {
        "icon_id": "24879590",
        "name": "navigate",
        "font_class": "navigate",
        "unicode": "e66e",
        "unicode_decimal": 58990
      },
      {
        "icon_id": "24879591",
        "name": "minus",
        "font_class": "minus",
        "unicode": "e66f",
        "unicode_decimal": 58991
      },
      {
        "icon_id": "24879592",
        "name": "image",
        "font_class": "image",
        "unicode": "e670",
        "unicode_decimal": 58992
      },
      {
        "icon_id": "24879593",
        "name": "mic",
        "font_class": "mic",
        "unicode": "e671",
        "unicode_decimal": 58993
      },
      {
        "icon_id": "24879594",
        "name": "paperplane",
        "font_class": "paperplane",
        "unicode": "e672",
        "unicode_decimal": 58994
      },
      {
        "icon_id": "24879595",
        "name": "close",
        "font_class": "close",
        "unicode": "e673",
        "unicode_decimal": 58995
      },
      {
        "icon_id": "24879596",
        "name": "help-filled",
        "font_class": "help-filled",
        "unicode": "e674",
        "unicode_decimal": 58996
      },
      {
        "icon_id": "24879597",
        "name": "plus-filled",
        "font_class": "paperplane-filled",
        "unicode": "e675",
        "unicode_decimal": 58997
      },
      {
        "icon_id": "24879598",
        "name": "plus",
        "font_class": "plus",
        "unicode": "e676",
        "unicode_decimal": 58998
      },
      {
        "icon_id": "24879599",
        "name": "mic-filled",
        "font_class": "mic-filled",
        "unicode": "e677",
        "unicode_decimal": 58999
      },
      {
        "icon_id": "24879600",
        "name": "image-filled",
        "font_class": "image-filled",
        "unicode": "e678",
        "unicode_decimal": 59e3
      },
      {
        "icon_id": "24855900",
        "name": "locked-filled",
        "font_class": "locked-filled",
        "unicode": "e668",
        "unicode_decimal": 58984
      },
      {
        "icon_id": "24855901",
        "name": "info",
        "font_class": "info",
        "unicode": "e669",
        "unicode_decimal": 58985
      },
      {
        "icon_id": "24855903",
        "name": "locked",
        "font_class": "locked",
        "unicode": "e66b",
        "unicode_decimal": 58987
      },
      {
        "icon_id": "24855884",
        "name": "camera-filled",
        "font_class": "camera-filled",
        "unicode": "e658",
        "unicode_decimal": 58968
      },
      {
        "icon_id": "24855885",
        "name": "chat-filled",
        "font_class": "chat-filled",
        "unicode": "e659",
        "unicode_decimal": 58969
      },
      {
        "icon_id": "24855886",
        "name": "camera",
        "font_class": "camera",
        "unicode": "e65a",
        "unicode_decimal": 58970
      },
      {
        "icon_id": "24855887",
        "name": "circle",
        "font_class": "circle",
        "unicode": "e65b",
        "unicode_decimal": 58971
      },
      {
        "icon_id": "24855888",
        "name": "checkmarkempty",
        "font_class": "checkmarkempty",
        "unicode": "e65c",
        "unicode_decimal": 58972
      },
      {
        "icon_id": "24855889",
        "name": "chat",
        "font_class": "chat",
        "unicode": "e65d",
        "unicode_decimal": 58973
      },
      {
        "icon_id": "24855890",
        "name": "circle-filled",
        "font_class": "circle-filled",
        "unicode": "e65e",
        "unicode_decimal": 58974
      },
      {
        "icon_id": "24855891",
        "name": "flag",
        "font_class": "flag",
        "unicode": "e65f",
        "unicode_decimal": 58975
      },
      {
        "icon_id": "24855892",
        "name": "flag-filled",
        "font_class": "flag-filled",
        "unicode": "e660",
        "unicode_decimal": 58976
      },
      {
        "icon_id": "24855893",
        "name": "gear-filled",
        "font_class": "gear-filled",
        "unicode": "e661",
        "unicode_decimal": 58977
      },
      {
        "icon_id": "24855894",
        "name": "home",
        "font_class": "home",
        "unicode": "e662",
        "unicode_decimal": 58978
      },
      {
        "icon_id": "24855895",
        "name": "home-filled",
        "font_class": "home-filled",
        "unicode": "e663",
        "unicode_decimal": 58979
      },
      {
        "icon_id": "24855896",
        "name": "gear",
        "font_class": "gear",
        "unicode": "e664",
        "unicode_decimal": 58980
      },
      {
        "icon_id": "24855897",
        "name": "smallcircle-filled",
        "font_class": "smallcircle-filled",
        "unicode": "e665",
        "unicode_decimal": 58981
      },
      {
        "icon_id": "24855898",
        "name": "map-filled",
        "font_class": "map-filled",
        "unicode": "e666",
        "unicode_decimal": 58982
      },
      {
        "icon_id": "24855899",
        "name": "map",
        "font_class": "map",
        "unicode": "e667",
        "unicode_decimal": 58983
      },
      {
        "icon_id": "24855825",
        "name": "refresh-filled",
        "font_class": "refresh-filled",
        "unicode": "e656",
        "unicode_decimal": 58966
      },
      {
        "icon_id": "24855826",
        "name": "refresh",
        "font_class": "refresh",
        "unicode": "e657",
        "unicode_decimal": 58967
      },
      {
        "icon_id": "24855808",
        "name": "cloud-upload",
        "font_class": "cloud-upload",
        "unicode": "e645",
        "unicode_decimal": 58949
      },
      {
        "icon_id": "24855809",
        "name": "cloud-download-filled",
        "font_class": "cloud-download-filled",
        "unicode": "e646",
        "unicode_decimal": 58950
      },
      {
        "icon_id": "24855810",
        "name": "cloud-download",
        "font_class": "cloud-download",
        "unicode": "e647",
        "unicode_decimal": 58951
      },
      {
        "icon_id": "24855811",
        "name": "cloud-upload-filled",
        "font_class": "cloud-upload-filled",
        "unicode": "e648",
        "unicode_decimal": 58952
      },
      {
        "icon_id": "24855813",
        "name": "redo",
        "font_class": "redo",
        "unicode": "e64a",
        "unicode_decimal": 58954
      },
      {
        "icon_id": "24855814",
        "name": "images-filled",
        "font_class": "images-filled",
        "unicode": "e64b",
        "unicode_decimal": 58955
      },
      {
        "icon_id": "24855815",
        "name": "undo-filled",
        "font_class": "undo-filled",
        "unicode": "e64c",
        "unicode_decimal": 58956
      },
      {
        "icon_id": "24855816",
        "name": "more",
        "font_class": "more",
        "unicode": "e64d",
        "unicode_decimal": 58957
      },
      {
        "icon_id": "24855817",
        "name": "more-filled",
        "font_class": "more-filled",
        "unicode": "e64e",
        "unicode_decimal": 58958
      },
      {
        "icon_id": "24855818",
        "name": "undo",
        "font_class": "undo",
        "unicode": "e64f",
        "unicode_decimal": 58959
      },
      {
        "icon_id": "24855819",
        "name": "images",
        "font_class": "images",
        "unicode": "e650",
        "unicode_decimal": 58960
      },
      {
        "icon_id": "24855821",
        "name": "paperclip",
        "font_class": "paperclip",
        "unicode": "e652",
        "unicode_decimal": 58962
      },
      {
        "icon_id": "24855822",
        "name": "settings",
        "font_class": "settings",
        "unicode": "e653",
        "unicode_decimal": 58963
      },
      {
        "icon_id": "24855823",
        "name": "search",
        "font_class": "search",
        "unicode": "e654",
        "unicode_decimal": 58964
      },
      {
        "icon_id": "24855824",
        "name": "redo-filled",
        "font_class": "redo-filled",
        "unicode": "e655",
        "unicode_decimal": 58965
      },
      {
        "icon_id": "24841702",
        "name": "list",
        "font_class": "list",
        "unicode": "e644",
        "unicode_decimal": 58948
      },
      {
        "icon_id": "24841489",
        "name": "mail-open-filled",
        "font_class": "mail-open-filled",
        "unicode": "e63a",
        "unicode_decimal": 58938
      },
      {
        "icon_id": "24841491",
        "name": "hand-thumbsdown-filled",
        "font_class": "hand-down-filled",
        "unicode": "e63c",
        "unicode_decimal": 58940
      },
      {
        "icon_id": "24841492",
        "name": "hand-thumbsdown",
        "font_class": "hand-down",
        "unicode": "e63d",
        "unicode_decimal": 58941
      },
      {
        "icon_id": "24841493",
        "name": "hand-thumbsup-filled",
        "font_class": "hand-up-filled",
        "unicode": "e63e",
        "unicode_decimal": 58942
      },
      {
        "icon_id": "24841494",
        "name": "hand-thumbsup",
        "font_class": "hand-up",
        "unicode": "e63f",
        "unicode_decimal": 58943
      },
      {
        "icon_id": "24841496",
        "name": "heart-filled",
        "font_class": "heart-filled",
        "unicode": "e641",
        "unicode_decimal": 58945
      },
      {
        "icon_id": "24841498",
        "name": "mail-open",
        "font_class": "mail-open",
        "unicode": "e643",
        "unicode_decimal": 58947
      },
      {
        "icon_id": "24841488",
        "name": "heart",
        "font_class": "heart",
        "unicode": "e639",
        "unicode_decimal": 58937
      },
      {
        "icon_id": "24839963",
        "name": "loop",
        "font_class": "loop",
        "unicode": "e633",
        "unicode_decimal": 58931
      },
      {
        "icon_id": "24839866",
        "name": "pulldown",
        "font_class": "pulldown",
        "unicode": "e632",
        "unicode_decimal": 58930
      },
      {
        "icon_id": "24813798",
        "name": "scan",
        "font_class": "scan",
        "unicode": "e62a",
        "unicode_decimal": 58922
      },
      {
        "icon_id": "24813786",
        "name": "bars",
        "font_class": "bars",
        "unicode": "e627",
        "unicode_decimal": 58919
      },
      {
        "icon_id": "24813788",
        "name": "cart-filled",
        "font_class": "cart-filled",
        "unicode": "e629",
        "unicode_decimal": 58921
      },
      {
        "icon_id": "24813790",
        "name": "checkbox",
        "font_class": "checkbox",
        "unicode": "e62b",
        "unicode_decimal": 58923
      },
      {
        "icon_id": "24813791",
        "name": "checkbox-filled",
        "font_class": "checkbox-filled",
        "unicode": "e62c",
        "unicode_decimal": 58924
      },
      {
        "icon_id": "24813794",
        "name": "shop",
        "font_class": "shop",
        "unicode": "e62f",
        "unicode_decimal": 58927
      },
      {
        "icon_id": "24813795",
        "name": "headphones",
        "font_class": "headphones",
        "unicode": "e630",
        "unicode_decimal": 58928
      },
      {
        "icon_id": "24813796",
        "name": "cart",
        "font_class": "cart",
        "unicode": "e631",
        "unicode_decimal": 58929
      }
    ]
  };
  const getVal$1 = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$U = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: icons.glyphs
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v2) => v2.font_class === this.type);
        if (code) {
          return unescape(`%u${code.unicode}`);
        }
        return "";
      },
      iconSize() {
        return getVal$1(this.size);
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$K(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle({ color: $props.color, "font-size": $options.iconSize }),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      null,
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$6 = /* @__PURE__ */ _export_sfc(_sfc_main$U, [["render", _sfc_render$K], ["__scopeId", "data-v-d31e1c47"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$T = {
    name: "UniStatusBar",
    data() {
      return {
        statusBarHeight: 20
      };
    },
    mounted() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight + "px";
    }
  };
  function _sfc_render$J(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle({ height: $data.statusBarHeight }),
        class: "uni-status-bar"
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      4
      /* STYLE */
    );
  }
  const statusBar = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["render", _sfc_render$J], ["__scopeId", "data-v-7920e3e0"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar.vue"]]);
  const getVal = (val) => typeof val === "number" ? val + "px" : val;
  const _sfc_main$S = {
    name: "UniNavBar",
    components: {
      statusBar
    },
    emits: ["clickLeft", "clickRight", "clickTitle"],
    props: {
      dark: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ""
      },
      leftText: {
        type: String,
        default: ""
      },
      rightText: {
        type: String,
        default: ""
      },
      leftIcon: {
        type: String,
        default: ""
      },
      rightIcon: {
        type: String,
        default: ""
      },
      fixed: {
        type: [Boolean, String],
        default: false
      },
      color: {
        type: String,
        default: ""
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      statusBar: {
        type: [Boolean, String],
        default: false
      },
      shadow: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      height: {
        type: [Number, String],
        default: 44
      },
      leftWidth: {
        type: [Number, String],
        default: 60
      },
      rightWidth: {
        type: [Number, String],
        default: 60
      },
      stat: {
        type: [Boolean, String],
        default: ""
      }
    },
    computed: {
      themeBgColor() {
        if (this.dark) {
          if (this.backgroundColor) {
            return this.backgroundColor;
          } else {
            return this.dark ? "#333" : "#FFF";
          }
        }
        return this.backgroundColor || "#FFF";
      },
      themeColor() {
        if (this.dark) {
          if (this.color) {
            return this.color;
          } else {
            return this.dark ? "#fff" : "#333";
          }
        }
        return this.color || "#333";
      },
      navbarHeight() {
        return getVal(this.height);
      },
      leftIconWidth() {
        return getVal(this.leftWidth);
      },
      rightIconWidth() {
        return getVal(this.rightWidth);
      }
    },
    mounted() {
      if (uni.report && this.stat && this.title !== "") {
        uni.report("title", this.title);
      }
    },
    methods: {
      onClickLeft() {
        this.$emit("clickLeft");
      },
      onClickRight() {
        this.$emit("clickRight");
      },
      onClickTitle() {
        this.$emit("clickTitle");
      }
    }
  };
  function _sfc_render$I(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_status_bar = vue.resolveComponent("status-bar");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-navbar", { "uni-dark": $props.dark, "uni-nvue-fixed": $props.fixed }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-navbar__content", { "uni-navbar--fixed": $props.fixed, "uni-navbar--shadow": $props.shadow, "uni-navbar--border": $props.border }]),
            style: vue.normalizeStyle({ "background-color": $options.themeBgColor })
          },
          [
            $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle({ color: $options.themeColor, backgroundColor: $options.themeBgColor, height: $options.navbarHeight }),
                class: "uni-navbar__header"
              },
              [
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.onClickLeft && $options.onClickLeft(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-left",
                    style: vue.normalizeStyle({ width: $options.leftIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "left", {}, () => [
                      $props.leftIcon.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "uni-navbar__content_view"
                      }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.leftIcon,
                          size: "20"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.leftText.length ? (vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          key: 1,
                          class: vue.normalizeClass([{ "uni-navbar-btn-icon-left": !$props.leftIcon.length > 0 }, "uni-navbar-btn-text"])
                        },
                        [
                          vue.createElementVNode(
                            "text",
                            {
                              style: vue.normalizeStyle({ color: $options.themeColor, fontSize: "12px" })
                            },
                            vue.toDisplayString($props.leftText),
                            5
                            /* TEXT, STYLE */
                          )
                        ],
                        2
                        /* CLASS */
                      )) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", {
                  class: "uni-navbar__header-container",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.onClickTitle && $options.onClickTitle(...args))
                }, [
                  vue.renderSlot(_ctx.$slots, "default", {}, () => [
                    $props.title.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "uni-navbar__header-container-inner"
                    }, [
                      vue.createElementVNode(
                        "text",
                        {
                          class: "uni-nav-bar-text uni-ellipsis-1",
                          style: vue.normalizeStyle({ color: $options.themeColor })
                        },
                        vue.toDisplayString($props.title),
                        5
                        /* TEXT, STYLE */
                      )
                    ])) : vue.createCommentVNode("v-if", true)
                  ], true)
                ]),
                vue.createElementVNode(
                  "view",
                  {
                    onClick: _cache[2] || (_cache[2] = (...args) => $options.onClickRight && $options.onClickRight(...args)),
                    class: "uni-navbar__header-btns uni-navbar__header-btns-right",
                    style: vue.normalizeStyle({ width: $options.rightIconWidth })
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "right", {}, () => [
                      $props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
                        vue.createVNode(_component_uni_icons, {
                          color: $options.themeColor,
                          type: $props.rightIcon,
                          size: "22"
                        }, null, 8, ["color", "type"])
                      ])) : vue.createCommentVNode("v-if", true),
                      $props.rightText.length && !$props.rightIcon.length ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "uni-navbar-btn-text"
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: "uni-nav-bar-right-text",
                            style: vue.normalizeStyle({ color: $options.themeColor })
                          },
                          vue.toDisplayString($props.rightText),
                          5
                          /* TEXT, STYLE */
                        )
                      ])) : vue.createCommentVNode("v-if", true)
                    ], true)
                  ],
                  4
                  /* STYLE */
                )
              ],
              4
              /* STYLE */
            )
          ],
          6
          /* CLASS, STYLE */
        ),
        $props.fixed ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "uni-navbar__placeholder"
        }, [
          $props.statusBar ? (vue.openBlock(), vue.createBlock(_component_status_bar, { key: 0 })) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode(
            "view",
            {
              class: "uni-navbar__placeholder-view",
              style: vue.normalizeStyle({ height: $options.navbarHeight })
            },
            null,
            4
            /* STYLE */
          )
        ])) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_2$3 = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["render", _sfc_render$I], ["__scopeId", "data-v-26544265"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
  const _sfc_main$R = {
    data() {
      return {
        searchVal: "",
        questionList: [],
        childrenList: [],
        currentCheckType: "",
        // 状态栏高度
        statusBarHeight: wx.getStorageSync("statusBarHeight") + "px",
        // 导航栏高度
        navigationBarHeight: wx.getStorageSync("navigationBarHeight") + "px",
        // 胶囊按钮高度
        menuButtonHeight: wx.getStorageSync("menuButtonHeight") + "px",
        // 导航栏和状态栏高度
        navigationBarAndStatusBarHeight: wx.getStorageSync("statusBarHeight") + wx.getStorageSync("navigationBarHeight") + "px",
        screenHeight: wx.getStorageSync("screenHeight") + "px",
        safeAreaHeight: wx.getStorageSync("safeAreaHeight") + "px"
      };
    },
    onLoad() {
      this.getCategoryTypeList();
    },
    onShow() {
      formatAppLog("log", "at pages/question/question.vue:74", "navigationBarAndStatusBarHeight", this.navigationBarAndStatusBarHeight);
      uni.getSystemInfo({
        success: (res) => {
          formatAppLog("log", "at pages/question/question.vue:77", "获取当前设备信息", res);
          formatAppLog("log", "at pages/question/question.vue:80", "高度", res.screenHeight - res.safeAreaInsets.top - res.safeAreaInsets.bottom);
          wx.setStorageSync("screenHeight", res.screenHeight - res.safeAreaInsets.top * 2 + res.safeAreaInsets.bottom);
          wx.setStorageSync("safeAreaHeight", res.safeAreaInsets.top * 2 + res.safeAreaInsets.bottom);
        }
      });
    },
    methods: {
      confirm(res) {
        formatAppLog("log", "at pages/question/question.vue:92", "搜索", this.searchVal);
        if (this.searchVal) {
          this.getCategoryName();
        } else {
          this.getCategoryTypeList();
        }
      },
      getCategoryName() {
        let opt = {
          params: {
            keyword: this.searchVal
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/question/question.vue:105", "查询到的详情", res);
            res[0]["line"] = true;
            this.currentCheckType = res[0].categoryName;
            this.childrenList = res;
          }
        };
        this.$http("getCategoryTreeChild", opt);
      },
      hrefRouterApp(item) {
        formatAppLog("log", "at pages/question/question.vue:115", "jump", item, item.children);
        if (item.children.length === 0) {
          uni.setStorageSync("pid", item.categoryId);
          uni.setStorageSync("currentCategoryId", "");
          uni.setStorageSync("currentCategoryDetail", item);
          uni.navigateTo({
            url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.parentId}`
          });
        } else {
          uni.navigateTo({
            url: `../constructor/constructor?categoryf=${this.currentCheckType}&categoryc=${item.categoryName}`,
            success: (res) => {
              formatAppLog("log", "at pages/question/question.vue:128", "res.data", item);
              res.eventChannel.emit("list", {
                data: item.children
              });
            }
          });
        }
      },
      // 获取分类列表
      getCategoryTypeList() {
        uni.showLoading({
          title: "加载中"
        });
        let opt = {
          callBack: (res) => {
            formatAppLog("log", "at pages/question/question.vue:144", "res", res);
            uni.hideLoading();
            if (res.length > 1) {
              uni.setStorageSync("categoryParams", res);
            }
            res[0]["line"] = true;
            this.currentCheckType = res[0].categoryName;
            this.questionList = res;
            this.childrenList = res[0].children;
          }
        };
        this.$http("getCategoryType", opt);
      },
      // 获取缓存
      getCategoryStory() {
        let categoryList = uni.getStorageSync("categoryParams");
        categoryList[0]["line"] = true;
        this.currentCheckType = categoryList[0].categoryName;
        this.questionList = categoryList;
        this.childrenList = categoryList[0].children;
      },
      changeCategoryType(item) {
        formatAppLog("log", "at pages/question/question.vue:166", "item", item);
        this.delCategoryLine();
        item.line = true;
        this.currentCheckType = item.categoryName;
        this.childrenList = item.children;
      },
      // 删除所有一级item line
      delCategoryLine() {
        this.questionList.map((item) => {
          item.line = false;
        });
      },
      handleSearch() {
      }
    }
  };
  function _sfc_render$H(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_2$3);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_2$4);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createCommentVNode(` <view class="navigation-container" :style="{'height':navigationBarAndStatusBarHeight }"> `),
      vue.createCommentVNode("自定义导航栏"),
      vue.createVNode(_component_uni_nav_bar, {
        style: vue.normalizeStyle({ "height": $data.navigationBarAndStatusBarHeight, display: "flex" }),
        "status-bar": true,
        leftWidth: 0,
        title: ""
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "input-view" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchVal = $event),
                "confirm-type": "search",
                class: "nav-bar-input",
                type: "text",
                placeholder: "输入搜索关键词",
                onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args))
              },
              null,
              544
              /* HYDRATE_EVENTS, NEED_PATCH */
            ), [
              [vue.vModelText, $data.searchVal]
            ])
          ]),
          vue.createElementVNode("template", null, [
            vue.createElementVNode("view", {
              onClick: _cache[2] || (_cache[2] = (...args) => $options.confirm && $options.confirm(...args)),
              class: "input-text"
            }, " 搜索 ")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["style"]),
      vue.createCommentVNode(" </view> "),
      vue.createElementVNode("div", { class: "container" }, [
        vue.createCommentVNode(" :style=\"{'height':calc(`100vh` - safeAreaHeight)}\" "),
        vue.createElementVNode("view", { class: "left" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.questionList, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_uni_section, {
                onClick: ($event) => $options.changeCategoryType(item),
                title: item.categoryName,
                type: item.line ? "line" : "",
                key: item.categoryId
              }, null, 8, ["onClick", "title", "type"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "right" }, [
          vue.createElementVNode(
            "scroll-view",
            {
              ref: "scrollView",
              style: { "height": "85vh" },
              "scroll-y": "true",
              "show-scrollbar": false
            },
            [
              vue.createElementVNode(
                "view",
                { class: "list-title" },
                vue.toDisplayString($data.currentCheckType),
                1
                /* TEXT */
              ),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.childrenList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    onClick: ($event) => $options.hrefRouterApp(item),
                    key: index,
                    class: "list-childer"
                  }, [
                    vue.createTextVNode(
                      vue.toDisplayString(item.categoryName) + " ",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "list-right" }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "forward",
                        size: "20"
                      })
                    ])
                  ], 8, ["onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          )
        ])
      ])
    ]);
  }
  const PagesQuestionQuestion = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["render", _sfc_render$H], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/question/question.vue"]]);
  const _sfc_main$Q = {
    onLoad(option) {
      formatAppLog("log", "at pages/constructor/constructor.vue:28", "option", option);
      if (option) {
        const {
          categoryc,
          categoryf
        } = option;
        this.categoryc = categoryc;
        this.categoryf = categoryf;
      }
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on("list", (data) => {
        this.list = data.data;
        formatAppLog("log", "at pages/constructor/constructor.vue:41", "this.list", this.list, data);
      });
    },
    data() {
      return {
        // 导航栏和状态栏高度
        navigationBarAndStatusBarHeight: wx.getStorageSync("statusBarHeight") + wx.getStorageSync(
          "navigationBarHeight"
        ) + "px",
        categoryc: "",
        categoryf: "",
        list: [],
        keyword: ""
      };
    },
    methods: {
      hrefrouterApp(item) {
        formatAppLog("log", "at pages/constructor/constructor.vue:58", "item", item);
        uni.navigateTo({
          url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.categoryName.parentId}`
        });
        uni.setStorageSync("pid", item.categoryId);
      },
      keywordSearch(item) {
        ({
          params: {
            keyword: this.keyword
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/constructor/constructor.vue:70", res, "获取搜索列表");
          }
        });
      }
    }
  };
  function _sfc_render$G(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      vue.Fragment,
      null,
      [
        vue.createCommentVNode(" 自定义导航栏 "),
        vue.createElementVNode("view", { class: "navBarBox" }, [
          vue.createCommentVNode(" 状态栏占位 "),
          vue.createCommentVNode(' <view class="searchBar">\r\n			<input v-model="keyword" placeholder="搜索想要练习的科目" class="search" />\r\n			<view class="text" @click="keywordSearch"> 搜索 </view>\r\n		</view> '),
          vue.createCommentVNode(" 页面内容 "),
          vue.createElementVNode("view", { class: "right" }, [
            vue.createElementVNode("view", { class: "list-title" }, [
              vue.createElementVNode(
                "text",
                { class: "arch-text" },
                vue.toDisplayString($data.categoryf) + " / ",
                1
                /* TEXT */
              ),
              vue.createTextVNode(
                vue.toDisplayString($data.categoryc),
                1
                /* TEXT */
              )
            ]),
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "list-item",
                  key: item.categoryId
                }, [
                  (vue.openBlock(), vue.createElementBlock("view", {
                    class: "list-childer",
                    key: index,
                    onClick: ($event) => $options.hrefrouterApp(item)
                  }, [
                    vue.createTextVNode(
                      vue.toDisplayString(item.categoryName) + " ",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "list-right" }, [
                      vue.createVNode(_component_uni_icons, {
                        type: "forward",
                        size: "20"
                      })
                    ])
                  ], 8, ["onClick"]))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            vue.createCommentVNode('	<view class="list-native"></view>  ')
          ])
        ])
      ],
      2112
      /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
    );
  }
  const PagesConstructorConstructor = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["render", _sfc_render$G], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/constructor/constructor.vue"]]);
  const _sfc_main$P = {
    data() {
      return {
        transform: "translateY(50vh)",
        timer: 0,
        backgroundColor: "rgba(0,0,0,0)",
        show: false,
        config: {}
      };
    },
    props: {
      contentHeight: {
        type: Number,
        default: 0
      },
      //是否是tabbar页面
      hasTabbar: {
        type: Boolean,
        default: false
      },
      shareList: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },
    created() {
      const height = uni.upx2px(this.contentHeight) + "px";
      this.config = {
        height,
        transform: `translateY(${height})`,
        backgroundColor: "rgba(0,0,0,.4)"
      };
      this.transform = this.config.transform;
    },
    methods: {
      toggleMask() {
        if (this.timer == 1) {
          return;
        }
        this.timer = 1;
        setTimeout(() => {
          this.timer = 0;
        }, 500);
        if (this.show) {
          this.transform = this.config.transform;
          this.backgroundColor = "rgba(0,0,0,0)";
          setTimeout(() => {
            this.show = false;
            this.hasTabbar && uni.showTabBar();
          }, 200);
          return;
        }
        this.show = true;
        if (this.hasTabbar) {
          uni.hideTabBar({
            success: () => {
              setTimeout(() => {
                this.backgroundColor = this.config.backgroundColor;
                this.transform = "translateY(0px)";
              }, 10);
            }
          });
        } else {
          setTimeout(() => {
            this.backgroundColor = this.config.backgroundColor;
            this.transform = "translateY(0px)";
          }, 10);
        }
      },
      //防止冒泡和滚动穿透
      stopPrevent() {
      },
      //分享操作
      shareToFriend(type) {
        this.$emit("click", type);
        this.toggleMask();
      }
    }
  };
  function _sfc_render$F(_ctx, _cache, $props, $setup, $data, $options) {
    return $data.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "mask",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.toggleMask && $options.toggleMask(...args)),
        onTouchmove: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.stopPrevent && $options.stopPrevent(...args), ["stop", "prevent"])),
        style: vue.normalizeStyle({ backgroundColor: $data.backgroundColor })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "mask-content",
            onClick: _cache[1] || (_cache[1] = vue.withModifiers((...args) => $options.stopPrevent && $options.stopPrevent(...args), ["stop", "prevent"])),
            style: vue.normalizeStyle([{
              height: $data.config.height,
              transform: $data.transform
            }])
          },
          [
            vue.createElementVNode("scroll-view", {
              class: "view-content",
              "scroll-y": ""
            }, [
              vue.createElementVNode("view", { class: "share-header" }, " 分享内容 "),
              vue.createElementVNode("view", { class: "share-list" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($props.shareList, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: index,
                      class: "share-item",
                      onClick: ($event) => $options.shareToFriend(item.text)
                    }, [
                      vue.createElementVNode("image", {
                        src: item.icon,
                        mode: ""
                      }, null, 8, ["src"]),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(item.text),
                        1
                        /* TEXT */
                      )
                    ], 8, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]),
            vue.createElementVNode("view", {
              class: "bottom b-t",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleMask && $options.toggleMask(...args))
            }, "取消")
          ],
          4
          /* STYLE */
        )
      ],
      36
      /* STYLE, HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$5 = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["render", _sfc_render$F], ["__scopeId", "data-v-db8d4e7b"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/cc-shareMenu/components/cc-shareMenu/cc-shareMenu.vue"]]);
  const _sfc_main$O = {
    watch: {
      userCollectFlag(newval, oldval) {
        if (newval) {
          this.isCollectFlag = true;
        } else {
          this.isCollectFlag = false;
        }
      }
    },
    data() {
      return {
        shareList: [],
        isCollectFlag: false,
        isActive: 0,
        list: [
          {
            id: 11,
            type: "我的错题",
            num: "1"
          },
          {
            id: 12,
            type: "我的收藏",
            num: "2"
          },
          {
            id: 13,
            type: "我的笔记",
            num: "8"
          },
          {
            id: 11,
            type: "在线学习",
            num: ""
          }
        ]
      };
    },
    props: ["exerciseList", "userCollectFlag"],
    //父组件向子组件传值
    mounted() {
      formatAppLog("log", "at pages/constructor/tab-Item.vue:76", "userCollectFlag", this.userCollectFlag);
      this.shareList = [
        {
          type: 1,
          icon: "/static/login/weixin.png",
          text: "微信好友"
        }
        // {
        //   type: 2,
        //   icon: '/static/share_moment.png',
        //   text: '朋友圈'
        // },
        // {
        //   type: 3,
        //   icon: '/static/share_qq.png',
        //   text: 'QQ好友'
        // },
        // {
        //   type: 4,
        //   icon: '/static/share_qqzone.png',
        //   text: 'QQ空间'
        // },
        // {
        //   type: 5,
        //   icon: '/static/share_weibo.png',
        //   text: '微博'
        // }
      ];
    },
    methods: {
      goShareClick() {
        this.$refs.share.toggleMask();
      },
      shareMenuClick(name) {
        uni.showModal({
          title: "温馨提示",
          content: "点击的分享菜单名称是 = " + name
        });
      },
      // 收藏科目
      collectAdd() {
        formatAppLog("log", "at pages/constructor/tab-Item.vue:118", "this.userCollectFlag", this.userCollectFlag);
        if (this.isCollectFlag) {
          this.delcollect();
        } else {
          this.addCollect();
        }
      },
      addCollect() {
        let opt = {
          params: {
            "collectType": 1,
            "categoryId": Number(uni.getStorageSync("currentCategoryDetail")["categoryId"])
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/constructor/tab-Item.vue:132", "收藏分类", res);
            this.isCollectFlag = true;
            uni.showToast({
              title: "收藏成功"
            });
          }
        };
        this.$http("collectQuestion", opt);
      },
      // 取消收藏 
      delcollect() {
        let opt = {
          params: {
            "collectType": 1,
            "categoryId": Number(uni.getStorageSync("currentCategoryDetail")["categoryId"])
          },
          callBack: (res) => {
            this.isCollectFlag = false;
            uni.showToast({
              title: "取消收藏成功"
            });
          }
        };
        this.$http("delCollectSubject", opt);
      },
      checked(index) {
        this.isActive = index;
      },
      jumpPage(item) {
        formatAppLog("log", "at pages/constructor/tab-Item.vue:161", "jumpPage", item, item.index);
        let index = item.index;
        if (index == 0) {
          uni.navigateTo({
            url: `../answer/index?listType=0`
          });
        }
        if (index == 1) {
          uni.navigateTo({
            url: `../examination/index?listType=${item.index}`
          });
        }
        if (index == 2) {
          uni.navigateTo({
            url: `../answer/index?listType=2`
          });
        }
        if (index == 3) {
          uni.navigateTo({
            url: `../answer/index?listType=3`
          });
        }
        if (index == 4) {
          uni.navigateTo({
            url: `../questionType/questionType?listType=4`
          });
        }
        if (index == 5) {
          uni.navigateTo({
            url: `../categorateType/categorateType?listType=5&trueQuestionChapterFlag=${false}`
          });
        }
        if (index == 6) {
          uni.navigateTo({
            url: `../categorateType/categorateType?listType=6&trueQuestionChapterFlag=${true}`
          });
        }
        if (index == 7) {
          uni.navigateTo({
            url: `../index/search?listType=7`
          });
        }
        if (index == 9) {
          uni.navigateTo({
            url: `../onlineLearning/onlineLearning?listType=${item.index}`
          });
        }
        if (index == 10) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examIntroduction`
          });
        }
        if (index == 11) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examGuid`
          });
        }
        if (index == 12) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examScope`
          });
        }
        if (index == 13) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examArrangements`
          });
        }
        if (index == 14) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examCertificate`
          });
        }
        if (index == 15) {
          uni.navigateTo({
            url: `../examInfo/examInfo?listType=examInformation`
          });
        }
      }
    }
  };
  function _sfc_render$E(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_cc_shareMenu = resolveEasycom(vue.resolveDynamicComponent("cc-shareMenu"), __easycom_0$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "list-content" }, [
        vue.createElementVNode("view", { class: "list-box" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.exerciseList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list",
                key: index
              }, [
                vue.createElementVNode("view", {
                  class: "exercise-list",
                  onClick: ($event) => $options.jumpPage(item)
                }, [
                  vue.createElementVNode("view", { class: "left" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass({ "title": item.index <= 3 })
                      },
                      vue.toDisplayString(item.title),
                      3
                      /* TEXT, CLASS */
                    ),
                    vue.createElementVNode(
                      "view",
                      { class: "desc" },
                      vue.toDisplayString(item.desc),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode("view", { class: "right" }, [
                    vue.createCommentVNode(' <uni-icons custom-prefix="iconfont" :type="item.icon" size="30"> </uni-icons> '),
                    vue.createElementVNode("img", {
                      class: "icon-img",
                      src: `../../static/constructor/icon${item.index + 1}.png`,
                      alt: ""
                    }, null, 8, ["src"])
                  ])
                ], 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "border-tb share-btn" }, [
        vue.createCommentVNode(" #ifdef MP "),
        vue.createCommentVNode(' @click="goShareClick" '),
        vue.createElementVNode("button", {
          type: "primary",
          "open-type": "share",
          size: "default",
          style: { "width": "300rpx", "margin-right": "0" },
          class: "share button-com"
        }, " 分享 "),
        vue.createCommentVNode(" #endIf  "),
        vue.createElementVNode(
          "button",
          {
            type: "primary",
            size: "default",
            style: { "width": "300rpx" },
            class: "collect button-com",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.collectAdd())
          },
          vue.toDisplayString($props.userCollectFlag || $data.isCollectFlag ? "取消收藏" : "收藏"),
          1
          /* TEXT */
        )
      ]),
      vue.createVNode(_component_cc_shareMenu, {
        ref: "share",
        contentHeight: 380,
        shareList: $data.shareList,
        onClick: $options.shareMenuClick
      }, null, 8, ["shareList", "onClick"])
    ]);
  }
  const tabItem = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["render", _sfc_render$E], ["__scopeId", "data-v-a49c0078"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/constructor/tab-Item.vue"]]);
  var isVue2 = false;
  function set(target, key, val) {
    if (Array.isArray(target)) {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val;
    }
    target[key] = val;
    return val;
  }
  function del(target, key) {
    if (Array.isArray(target)) {
      target.splice(key, 1);
      return;
    }
    delete target[key];
  }
  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    return typeof navigator !== "undefined" && typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
  }
  const isProxyAvailable = typeof Proxy === "function";
  const HOOK_SETUP = "devtools-plugin:setup";
  const HOOK_PLUGIN_SETTINGS_SET = "plugin:settings:set";
  let supported;
  let perf;
  function isPerformanceSupported() {
    var _a2;
    if (supported !== void 0) {
      return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== "undefined" && ((_a2 = global.perf_hooks) === null || _a2 === void 0 ? void 0 : _a2.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }
  class ApiProxy {
    constructor(plugin, hook) {
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      const defaultSettings = {};
      if (plugin.settings) {
        for (const id in plugin.settings) {
          const item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      const localSettingsSaveId = `__vue-devtools-plugin-settings__${plugin.id}`;
      let currentSettings = Object.assign({}, defaultSettings);
      try {
        const raw = localStorage.getItem(localSettingsSaveId);
        const data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
      }
      this.fallbacks = {
        getSettings() {
          return currentSettings;
        },
        setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
          }
          currentSettings = value;
        },
        now() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, (pluginId, value) => {
          if (pluginId === this.plugin.id) {
            this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target.on[prop];
          } else {
            return (...args) => {
              this.onQueue.push({
                method: prop,
                args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: (_target, prop) => {
          if (this.target) {
            return this.target[prop];
          } else if (prop === "on") {
            return this.proxiedOn;
          } else if (Object.keys(this.fallbacks).includes(prop)) {
            return (...args) => {
              this.targetQueue.push({
                method: prop,
                args,
                resolve: () => {
                }
              });
              return this.fallbacks[prop](...args);
            };
          } else {
            return (...args) => {
              return new Promise((resolve) => {
                this.targetQueue.push({
                  method: prop,
                  args,
                  resolve
                });
              });
            };
          }
        }
      });
    }
    async setRealTarget(target) {
      this.target = target;
      for (const item of this.onQueue) {
        this.target.on[item.method](...item.args);
      }
      for (const item of this.targetQueue) {
        item.resolve(await this.target[item.method](...item.args));
      }
    }
  }
  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    const descriptor = pluginDescriptor;
    const target = getTarget();
    const hook = getDevtoolsGlobalHook();
    const enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      const proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn,
        proxy
      });
      if (proxy)
        setupFn(proxy.proxiedTarget);
    }
  }
  /*!
    * pinia v2.0.28
    * (c) 2022 Eduardo San Martin Morote
    * @license MIT
    */
  let activePinia;
  const setActivePinia = (pinia) => activePinia = pinia;
  const piniaSymbol = Symbol("pinia");
  function isPlainObject(o2) {
    return o2 && typeof o2 === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
  }
  var MutationType;
  (function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
  })(MutationType || (MutationType = {}));
  const IS_CLIENT = typeof window !== "undefined";
  const USE_DEVTOOLS = IS_CLIENT;
  const _global = /* @__PURE__ */ (() => typeof window === "object" && window.window === window ? window : typeof self === "object" && self.self === self ? self : typeof global === "object" && global.global === global ? global : typeof globalThis === "object" ? globalThis : { HTMLElement: null })();
  function bom(blob, { autoBom = false } = {}) {
    if (autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
      return new Blob([String.fromCharCode(65279), blob], { type: blob.type });
    }
    return blob;
  }
  function download(url, name, opts) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function() {
      saveAs(xhr.response, name, opts);
    };
    xhr.onerror = function() {
      console.error("could not download file");
    };
    xhr.send();
  }
  function corsEnabled(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, false);
    try {
      xhr.send();
    } catch (e) {
    }
    return xhr.status >= 200 && xhr.status <= 299;
  }
  function click(node) {
    try {
      node.dispatchEvent(new MouseEvent("click"));
    } catch (e) {
      const evt = document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      node.dispatchEvent(evt);
    }
  }
  const _navigator = typeof navigator === "object" ? navigator : { userAgent: "" };
  const isMacOSWebView = /* @__PURE__ */ (() => /Macintosh/.test(_navigator.userAgent) && /AppleWebKit/.test(_navigator.userAgent) && !/Safari/.test(_navigator.userAgent))();
  const saveAs = !IS_CLIENT ? () => {
  } : (
    // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
    typeof HTMLAnchorElement !== "undefined" && "download" in HTMLAnchorElement.prototype && !isMacOSWebView ? downloadSaveAs : (
      // Use msSaveOrOpenBlob as a second approach
      "msSaveOrOpenBlob" in _navigator ? msSaveAs : (
        // Fallback to using FileReader and a popup
        fileSaverSaveAs
      )
    )
  );
  function downloadSaveAs(blob, name = "download", opts) {
    const a2 = document.createElement("a");
    a2.download = name;
    a2.rel = "noopener";
    if (typeof blob === "string") {
      a2.href = blob;
      if (a2.origin !== location.origin) {
        if (corsEnabled(a2.href)) {
          download(blob, name, opts);
        } else {
          a2.target = "_blank";
          click(a2);
        }
      } else {
        click(a2);
      }
    } else {
      a2.href = URL.createObjectURL(blob);
      setTimeout(function() {
        URL.revokeObjectURL(a2.href);
      }, 4e4);
      setTimeout(function() {
        click(a2);
      }, 0);
    }
  }
  function msSaveAs(blob, name = "download", opts) {
    if (typeof blob === "string") {
      if (corsEnabled(blob)) {
        download(blob, name, opts);
      } else {
        const a2 = document.createElement("a");
        a2.href = blob;
        a2.target = "_blank";
        setTimeout(function() {
          click(a2);
        });
      }
    } else {
      navigator.msSaveOrOpenBlob(bom(blob, opts), name);
    }
  }
  function fileSaverSaveAs(blob, name, opts, popup2) {
    popup2 = popup2 || open("", "_blank");
    if (popup2) {
      popup2.document.title = popup2.document.body.innerText = "downloading...";
    }
    if (typeof blob === "string")
      return download(blob, name, opts);
    const force = blob.type === "application/octet-stream";
    const isSafari = /constructor/i.test(String(_global.HTMLElement)) || "safari" in _global;
    const isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);
    if ((isChromeIOS || force && isSafari || isMacOSWebView) && typeof FileReader !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = function() {
        let url = reader.result;
        if (typeof url !== "string") {
          popup2 = null;
          throw new Error("Wrong reader.result type");
        }
        url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, "data:attachment/file;");
        if (popup2) {
          popup2.location.href = url;
        } else {
          location.assign(url);
        }
        popup2 = null;
      };
      reader.readAsDataURL(blob);
    } else {
      const url = URL.createObjectURL(blob);
      if (popup2)
        popup2.location.assign(url);
      else
        location.href = url;
      popup2 = null;
      setTimeout(function() {
        URL.revokeObjectURL(url);
      }, 4e4);
    }
  }
  function toastMessage(message, type) {
    const piniaMessage = "🍍 " + message;
    if (typeof __VUE_DEVTOOLS_TOAST__ === "function") {
      __VUE_DEVTOOLS_TOAST__(piniaMessage, type);
    } else if (type === "error") {
      console.error(piniaMessage);
    } else if (type === "warn") {
      console.warn(piniaMessage);
    } else {
      console.log(piniaMessage);
    }
  }
  function isPinia(o2) {
    return "_a" in o2 && "install" in o2;
  }
  function checkClipboardAccess() {
    if (!("clipboard" in navigator)) {
      toastMessage(`Your browser doesn't support the Clipboard API`, "error");
      return true;
    }
  }
  function checkNotFocusedError(error) {
    if (error instanceof Error && error.message.toLowerCase().includes("document is not focused")) {
      toastMessage('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn");
      return true;
    }
    return false;
  }
  async function actionGlobalCopyState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(pinia.state.value));
      toastMessage("Global state copied to clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to serialize the state. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalPasteState(pinia) {
    if (checkClipboardAccess())
      return;
    try {
      pinia.state.value = JSON.parse(await navigator.clipboard.readText());
      toastMessage("Global state pasted from clipboard.");
    } catch (error) {
      if (checkNotFocusedError(error))
        return;
      toastMessage(`Failed to deserialize the state from clipboard. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  async function actionGlobalSaveState(pinia) {
    try {
      saveAs(new Blob([JSON.stringify(pinia.state.value)], {
        type: "text/plain;charset=utf-8"
      }), "pinia-state.json");
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  let fileInput;
  function getFileOpener() {
    if (!fileInput) {
      fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json";
    }
    function openFile() {
      return new Promise((resolve, reject) => {
        fileInput.onchange = async () => {
          const files = fileInput.files;
          if (!files)
            return resolve(null);
          const file = files.item(0);
          if (!file)
            return resolve(null);
          return resolve({ text: await file.text(), file });
        };
        fileInput.oncancel = () => resolve(null);
        fileInput.onerror = reject;
        fileInput.click();
      });
    }
    return openFile;
  }
  async function actionGlobalOpenStateFile(pinia) {
    try {
      const open2 = await getFileOpener();
      const result = await open2();
      if (!result)
        return;
      const { text, file } = result;
      pinia.state.value = JSON.parse(text);
      toastMessage(`Global state imported from "${file.name}".`);
    } catch (error) {
      toastMessage(`Failed to export the state as JSON. Check the console for more details.`, "error");
      console.error(error);
    }
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display
      }
    };
  }
  const PINIA_ROOT_LABEL = "🍍 Pinia (root)";
  const PINIA_ROOT_ID = "_root";
  function formatStoreForInspectorTree(store) {
    return isPinia(store) ? {
      id: PINIA_ROOT_ID,
      label: PINIA_ROOT_LABEL
    } : {
      id: store.$id,
      label: store.$id
    };
  }
  function formatStoreForInspectorState(store) {
    if (isPinia(store)) {
      const storeNames = Array.from(store._s.keys());
      const storeMap = store._s;
      const state2 = {
        state: storeNames.map((storeId) => ({
          editable: true,
          key: storeId,
          value: store.state.value[storeId]
        })),
        getters: storeNames.filter((id) => storeMap.get(id)._getters).map((id) => {
          const store2 = storeMap.get(id);
          return {
            editable: false,
            key: id,
            value: store2._getters.reduce((getters, key) => {
              getters[key] = store2[key];
              return getters;
            }, {})
          };
        })
      };
      return state2;
    }
    const state = {
      state: Object.keys(store.$state).map((key) => ({
        editable: true,
        key,
        value: store.$state[key]
      }))
    };
    if (store._getters && store._getters.length) {
      state.getters = store._getters.map((getterName) => ({
        editable: false,
        key: getterName,
        value: store[getterName]
      }));
    }
    if (store._customProperties.size) {
      state.customProperties = Array.from(store._customProperties).map((key) => ({
        editable: true,
        key,
        value: store[key]
      }));
    }
    return state;
  }
  function formatEventData(events) {
    if (!events)
      return {};
    if (Array.isArray(events)) {
      return events.reduce((data, event) => {
        data.keys.push(event.key);
        data.operations.push(event.type);
        data.oldValue[event.key] = event.oldValue;
        data.newValue[event.key] = event.newValue;
        return data;
      }, {
        oldValue: {},
        keys: [],
        operations: [],
        newValue: {}
      });
    } else {
      return {
        operation: formatDisplay(events.type),
        key: formatDisplay(events.key),
        oldValue: events.oldValue,
        newValue: events.newValue
      };
    }
  }
  function formatMutationType(type) {
    switch (type) {
      case MutationType.direct:
        return "mutation";
      case MutationType.patchFunction:
        return "$patch";
      case MutationType.patchObject:
        return "$patch";
      default:
        return "unknown";
    }
  }
  let isTimelineActive = true;
  const componentStateTypes = [];
  const MUTATIONS_LAYER_ID = "pinia:mutations";
  const INSPECTOR_ID = "pinia";
  const getStoreType = (id) => "🍍 " + id;
  function registerPiniaDevtools(app, pinia) {
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app
    }, (api2) => {
      if (typeof api2.now !== "function") {
        toastMessage("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.");
      }
      api2.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: `Pinia 🍍`,
        color: 15064968
      });
      api2.addInspector({
        id: INSPECTOR_ID,
        label: "Pinia 🍍",
        icon: "storage",
        treeFilterPlaceholder: "Search stores",
        actions: [
          {
            icon: "content_copy",
            action: () => {
              actionGlobalCopyState(pinia);
            },
            tooltip: "Serialize and copy the state"
          },
          {
            icon: "content_paste",
            action: async () => {
              await actionGlobalPasteState(pinia);
              api2.sendInspectorTree(INSPECTOR_ID);
              api2.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Replace the state with the content of your clipboard"
          },
          {
            icon: "save",
            action: () => {
              actionGlobalSaveState(pinia);
            },
            tooltip: "Save the state as a JSON file"
          },
          {
            icon: "folder_open",
            action: async () => {
              await actionGlobalOpenStateFile(pinia);
              api2.sendInspectorTree(INSPECTOR_ID);
              api2.sendInspectorState(INSPECTOR_ID);
            },
            tooltip: "Import the state from a JSON file"
          }
        ],
        nodeActions: [
          {
            icon: "restore",
            tooltip: "Reset the state (option store only)",
            action: (nodeId) => {
              const store = pinia._s.get(nodeId);
              if (!store) {
                toastMessage(`Cannot reset "${nodeId}" store because it wasn't found.`, "warn");
              } else if (!store._isOptionsAPI) {
                toastMessage(`Cannot reset "${nodeId}" store because it's a setup store.`, "warn");
              } else {
                store.$reset();
                toastMessage(`Store "${nodeId}" reset.`);
              }
            }
          }
        ]
      });
      api2.on.inspectComponent((payload, ctx) => {
        const proxy = payload.componentInstance && payload.componentInstance.proxy;
        if (proxy && proxy._pStores) {
          const piniaStores = payload.componentInstance.proxy._pStores;
          Object.values(piniaStores).forEach((store) => {
            payload.instanceData.state.push({
              type: getStoreType(store.$id),
              key: "state",
              editable: true,
              value: store._isOptionsAPI ? {
                _custom: {
                  value: vue.toRaw(store.$state),
                  actions: [
                    {
                      icon: "restore",
                      tooltip: "Reset the state of this store",
                      action: () => store.$reset()
                    }
                  ]
                }
              } : (
                // NOTE: workaround to unwrap transferred refs
                Object.keys(store.$state).reduce((state, key) => {
                  state[key] = store.$state[key];
                  return state;
                }, {})
              )
            });
            if (store._getters && store._getters.length) {
              payload.instanceData.state.push({
                type: getStoreType(store.$id),
                key: "getters",
                editable: false,
                value: store._getters.reduce((getters, key) => {
                  try {
                    getters[key] = store[key];
                  } catch (error) {
                    getters[key] = error;
                  }
                  return getters;
                }, {})
              });
            }
          });
        }
      });
      api2.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          let stores = [pinia];
          stores = stores.concat(Array.from(pinia._s.values()));
          payload.rootNodes = (payload.filter ? stores.filter((store) => "$id" in store ? store.$id.toLowerCase().includes(payload.filter.toLowerCase()) : PINIA_ROOT_LABEL.toLowerCase().includes(payload.filter.toLowerCase())) : stores).map(formatStoreForInspectorTree);
        }
      });
      api2.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return;
          }
          if (inspectedStore) {
            payload.state = formatStoreForInspectorState(inspectedStore);
          }
        }
      });
      api2.on.editInspectorState((payload, ctx) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const inspectedStore = payload.nodeId === PINIA_ROOT_ID ? pinia : pinia._s.get(payload.nodeId);
          if (!inspectedStore) {
            return toastMessage(`store "${payload.nodeId}" not found`, "error");
          }
          const { path } = payload;
          if (!isPinia(inspectedStore)) {
            if (path.length !== 1 || !inspectedStore._customProperties.has(path[0]) || path[0] in inspectedStore.$state) {
              path.unshift("$state");
            }
          } else {
            path.unshift("state");
          }
          isTimelineActive = false;
          payload.set(inspectedStore, path, payload.state.value);
          isTimelineActive = true;
        }
      });
      api2.on.editComponentState((payload) => {
        if (payload.type.startsWith("🍍")) {
          const storeId = payload.type.replace(/^🍍\s*/, "");
          const store = pinia._s.get(storeId);
          if (!store) {
            return toastMessage(`store "${storeId}" not found`, "error");
          }
          const { path } = payload;
          if (path[0] !== "state") {
            return toastMessage(`Invalid path for store "${storeId}":
${path}
Only state can be modified.`);
          }
          path[0] = "$state";
          isTimelineActive = false;
          payload.set(store, path, payload.state.value);
          isTimelineActive = true;
        }
      });
    });
  }
  function addStoreToDevtools(app, store) {
    if (!componentStateTypes.includes(getStoreType(store.$id))) {
      componentStateTypes.push(getStoreType(store.$id));
    }
    setupDevtoolsPlugin({
      id: "dev.esm.pinia",
      label: "Pinia 🍍",
      logo: "https://pinia.vuejs.org/logo.svg",
      packageName: "pinia",
      homepage: "https://pinia.vuejs.org",
      componentStateTypes,
      app,
      settings: {
        logStoreChanges: {
          label: "Notify about new/deleted stores",
          type: "boolean",
          defaultValue: true
        }
        // useEmojis: {
        //   label: 'Use emojis in messages ⚡️',
        //   type: 'boolean',
        //   defaultValue: true,
        // },
      }
    }, (api2) => {
      const now2 = typeof api2.now === "function" ? api2.now.bind(api2) : Date.now;
      store.$onAction(({ after, onError, name, args }) => {
        const groupId = runningActionId++;
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🛫 " + name,
            subtitle: "start",
            data: {
              store: formatDisplay(store.$id),
              action: formatDisplay(name),
              args
            },
            groupId
          }
        });
        after((result) => {
          activeAction = void 0;
          api2.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              title: "🛬 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                result
              },
              groupId
            }
          });
        });
        onError((error) => {
          activeAction = void 0;
          api2.addTimelineEvent({
            layerId: MUTATIONS_LAYER_ID,
            event: {
              time: now2(),
              logType: "error",
              title: "💥 " + name,
              subtitle: "end",
              data: {
                store: formatDisplay(store.$id),
                action: formatDisplay(name),
                args,
                error
              },
              groupId
            }
          });
        });
      }, true);
      store._customProperties.forEach((name) => {
        vue.watch(() => vue.unref(store[name]), (newValue, oldValue) => {
          api2.notifyComponentUpdate();
          api2.sendInspectorState(INSPECTOR_ID);
          if (isTimelineActive) {
            api2.addTimelineEvent({
              layerId: MUTATIONS_LAYER_ID,
              event: {
                time: now2(),
                title: "Change",
                subtitle: name,
                data: {
                  newValue,
                  oldValue
                },
                groupId: activeAction
              }
            });
          }
        }, { deep: true });
      });
      store.$subscribe(({ events, type }, state) => {
        api2.notifyComponentUpdate();
        api2.sendInspectorState(INSPECTOR_ID);
        if (!isTimelineActive)
          return;
        const eventData = {
          time: now2(),
          title: formatMutationType(type),
          data: {
            store: formatDisplay(store.$id),
            ...formatEventData(events)
          },
          groupId: activeAction
        };
        activeAction = void 0;
        if (type === MutationType.patchFunction) {
          eventData.subtitle = "⤵️";
        } else if (type === MutationType.patchObject) {
          eventData.subtitle = "🧩";
        } else if (events && !Array.isArray(events)) {
          eventData.subtitle = events.type;
        }
        if (events) {
          eventData.data["rawEvent(s)"] = {
            _custom: {
              display: "DebuggerEvent",
              type: "object",
              tooltip: "raw DebuggerEvent[]",
              value: events
            }
          };
        }
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: eventData
        });
      }, { detached: true, flush: "sync" });
      const hotUpdate = store._hotUpdate;
      store._hotUpdate = vue.markRaw((newStore) => {
        hotUpdate(newStore);
        api2.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: now2(),
            title: "🔥 " + store.$id,
            subtitle: "HMR update",
            data: {
              store: formatDisplay(store.$id),
              info: formatDisplay(`HMR update`)
            }
          }
        });
        api2.notifyComponentUpdate();
        api2.sendInspectorTree(INSPECTOR_ID);
        api2.sendInspectorState(INSPECTOR_ID);
      });
      const { $dispose } = store;
      store.$dispose = () => {
        $dispose();
        api2.notifyComponentUpdate();
        api2.sendInspectorTree(INSPECTOR_ID);
        api2.sendInspectorState(INSPECTOR_ID);
        api2.getSettings().logStoreChanges && toastMessage(`Disposed "${store.$id}" store 🗑`);
      };
      api2.notifyComponentUpdate();
      api2.sendInspectorTree(INSPECTOR_ID);
      api2.sendInspectorState(INSPECTOR_ID);
      api2.getSettings().logStoreChanges && toastMessage(`"${store.$id}" store installed 🆕`);
    });
  }
  let runningActionId = 0;
  let activeAction;
  function patchActionForGrouping(store, actionNames) {
    const actions = actionNames.reduce((storeActions, actionName) => {
      storeActions[actionName] = vue.toRaw(store)[actionName];
      return storeActions;
    }, {});
    for (const actionName in actions) {
      store[actionName] = function() {
        const _actionId = runningActionId;
        const trackedStore = new Proxy(store, {
          get(...args) {
            activeAction = _actionId;
            return Reflect.get(...args);
          },
          set(...args) {
            activeAction = _actionId;
            return Reflect.set(...args);
          }
        });
        return actions[actionName].apply(trackedStore, arguments);
      };
    }
  }
  function devtoolsPlugin({ app, store, options }) {
    if (store.$id.startsWith("__hot:")) {
      return;
    }
    if (options.state) {
      store._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
      patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store,
        Object.keys(options.actions)
      );
      const originalHotUpdate = store._hotUpdate;
      vue.toRaw(store)._hotUpdate = function(newStore) {
        originalHotUpdate.apply(this, arguments);
        patchActionForGrouping(store, Object.keys(newStore._hmrPayload.actions));
      };
    }
    addStoreToDevtools(
      app,
      // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
      store
    );
  }
  function createPinia() {
    const scope = vue.effectScope(true);
    const state = scope.run(() => vue.ref({}));
    let _p = [];
    let toBeInstalled = [];
    const pinia = vue.markRaw({
      install(app) {
        setActivePinia(pinia);
        {
          pinia._a = app;
          app.provide(piniaSymbol, pinia);
          app.config.globalProperties.$pinia = pinia;
          if (USE_DEVTOOLS) {
            registerPiniaDevtools(app, pinia);
          }
          toBeInstalled.forEach((plugin) => _p.push(plugin));
          toBeInstalled = [];
        }
      },
      use(plugin) {
        if (!this._a && !isVue2) {
          toBeInstalled.push(plugin);
        } else {
          _p.push(plugin);
        }
        return this;
      },
      _p,
      // it's actually undefined here
      // @ts-expect-error
      _a: null,
      _e: scope,
      _s: /* @__PURE__ */ new Map(),
      state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
      pinia.use(devtoolsPlugin);
    }
    return pinia;
  }
  function patchObject(newState, oldState) {
    for (const key in oldState) {
      const subPatch = oldState[key];
      if (!(key in newState)) {
        continue;
      }
      const targetValue = newState[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        newState[key] = patchObject(targetValue, subPatch);
      } else {
        {
          newState[key] = subPatch;
        }
      }
    }
    return newState;
  }
  const noop = () => {
  };
  function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
    subscriptions.push(callback);
    const removeSubscription = () => {
      const idx = subscriptions.indexOf(callback);
      if (idx > -1) {
        subscriptions.splice(idx, 1);
        onCleanup();
      }
    };
    if (!detached && vue.getCurrentScope()) {
      vue.onScopeDispose(removeSubscription);
    }
    return removeSubscription;
  }
  function triggerSubscriptions(subscriptions, ...args) {
    subscriptions.slice().forEach((callback) => {
      callback(...args);
    });
  }
  function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
      patchToApply.forEach((value, key) => target.set(key, value));
    }
    if (target instanceof Set && patchToApply instanceof Set) {
      patchToApply.forEach(target.add, target);
    }
    for (const key in patchToApply) {
      if (!patchToApply.hasOwnProperty(key))
        continue;
      const subPatch = patchToApply[key];
      const targetValue = target[key];
      if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !vue.isRef(subPatch) && !vue.isReactive(subPatch)) {
        target[key] = mergeReactiveObjects(targetValue, subPatch);
      } else {
        target[key] = subPatch;
      }
    }
    return target;
  }
  const skipHydrateSymbol = Symbol("pinia:skipHydration");
  function shouldHydrate(obj) {
    return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
  }
  const { assign } = Object;
  function isComputed(o2) {
    return !!(vue.isRef(o2) && o2.effect);
  }
  function createOptionsStore(id, options, pinia, hot) {
    const { state, actions, getters } = options;
    const initialState = pinia.state.value[id];
    let store;
    function setup() {
      if (!initialState && !hot) {
        {
          pinia.state.value[id] = state ? state() : {};
        }
      }
      const localState = hot ? (
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        vue.toRefs(vue.ref(state ? state() : {}).value)
      ) : vue.toRefs(pinia.state.value[id]);
      return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
        if (name in localState) {
          console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
        }
        computedGetters[name] = vue.markRaw(vue.computed(() => {
          setActivePinia(pinia);
          const store2 = pinia._s.get(id);
          return getters[name].call(store2, store2);
        }));
        return computedGetters;
      }, {}));
    }
    store = createSetupStore(id, setup, options, pinia, hot, true);
    store.$reset = function $reset() {
      const newState = state ? state() : {};
      this.$patch(($state) => {
        assign($state, newState);
      });
    };
    return store;
  }
  function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
    let scope;
    const optionsForPlugin = assign({ actions: {} }, options);
    if (!pinia._e.active) {
      throw new Error("Pinia destroyed");
    }
    const $subscribeOptions = {
      deep: true
      // flush: 'post',
    };
    {
      $subscribeOptions.onTrigger = (event) => {
        if (isListening) {
          debuggerEvents = event;
        } else if (isListening == false && !store._hotUpdating) {
          if (Array.isArray(debuggerEvents)) {
            debuggerEvents.push(event);
          } else {
            console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
          }
        }
      };
    }
    let isListening;
    let isSyncListening;
    let subscriptions = vue.markRaw([]);
    let actionSubscriptions = vue.markRaw([]);
    let debuggerEvents;
    const initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
      {
        pinia.state.value[$id] = {};
      }
    }
    const hotState = vue.ref({});
    let activeListener;
    function $patch(partialStateOrMutator) {
      let subscriptionMutation;
      isListening = isSyncListening = false;
      {
        debuggerEvents = [];
      }
      if (typeof partialStateOrMutator === "function") {
        partialStateOrMutator(pinia.state.value[$id]);
        subscriptionMutation = {
          type: MutationType.patchFunction,
          storeId: $id,
          events: debuggerEvents
        };
      } else {
        mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
        subscriptionMutation = {
          type: MutationType.patchObject,
          payload: partialStateOrMutator,
          storeId: $id,
          events: debuggerEvents
        };
      }
      const myListenerId = activeListener = Symbol();
      vue.nextTick().then(() => {
        if (activeListener === myListenerId) {
          isListening = true;
        }
      });
      isSyncListening = true;
      triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    const $reset = () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    };
    function $dispose() {
      scope.stop();
      subscriptions = [];
      actionSubscriptions = [];
      pinia._s.delete($id);
    }
    function wrapAction(name, action) {
      return function() {
        setActivePinia(pinia);
        const args = Array.from(arguments);
        const afterCallbackList = [];
        const onErrorCallbackList = [];
        function after(callback) {
          afterCallbackList.push(callback);
        }
        function onError(callback) {
          onErrorCallbackList.push(callback);
        }
        triggerSubscriptions(actionSubscriptions, {
          args,
          name,
          store,
          after,
          onError
        });
        let ret;
        try {
          ret = action.apply(this && this.$id === $id ? this : store, args);
        } catch (error) {
          triggerSubscriptions(onErrorCallbackList, error);
          throw error;
        }
        if (ret instanceof Promise) {
          return ret.then((value) => {
            triggerSubscriptions(afterCallbackList, value);
            return value;
          }).catch((error) => {
            triggerSubscriptions(onErrorCallbackList, error);
            return Promise.reject(error);
          });
        }
        triggerSubscriptions(afterCallbackList, ret);
        return ret;
      };
    }
    const _hmrPayload = /* @__PURE__ */ vue.markRaw({
      actions: {},
      getters: {},
      state: [],
      hotState
    });
    const partialStore = {
      _p: pinia,
      // _s: scope,
      $id,
      $onAction: addSubscription.bind(null, actionSubscriptions),
      $patch,
      $reset,
      $subscribe(callback, options2 = {}) {
        const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
        const stopWatcher = scope.run(() => vue.watch(() => pinia.state.value[$id], (state) => {
          if (options2.flush === "sync" ? isSyncListening : isListening) {
            callback({
              storeId: $id,
              type: MutationType.direct,
              events: debuggerEvents
            }, state);
          }
        }, assign({}, $subscribeOptions, options2)));
        return removeSubscription;
      },
      $dispose
    };
    const store = vue.reactive(
      assign(
        {
          _hmrPayload,
          _customProperties: vue.markRaw(/* @__PURE__ */ new Set())
          // devtools custom properties
        },
        partialStore
        // must be added later
        // setupStore
      )
    );
    pinia._s.set($id, store);
    const setupStore = pinia._e.run(() => {
      scope = vue.effectScope();
      return scope.run(() => setup());
    });
    for (const key in setupStore) {
      const prop = setupStore[key];
      if (vue.isRef(prop) && !isComputed(prop) || vue.isReactive(prop)) {
        if (hot) {
          set(hotState.value, key, vue.toRef(setupStore, key));
        } else if (!isOptionsStore) {
          if (initialState && shouldHydrate(prop)) {
            if (vue.isRef(prop)) {
              prop.value = initialState[key];
            } else {
              mergeReactiveObjects(prop, initialState[key]);
            }
          }
          {
            pinia.state.value[$id][key] = prop;
          }
        }
        {
          _hmrPayload.state.push(key);
        }
      } else if (typeof prop === "function") {
        const actionValue = hot ? prop : wrapAction(key, prop);
        {
          setupStore[key] = actionValue;
        }
        {
          _hmrPayload.actions[key] = prop;
        }
        optionsForPlugin.actions[key] = prop;
      } else {
        if (isComputed(prop)) {
          _hmrPayload.getters[key] = isOptionsStore ? (
            // @ts-expect-error
            options.getters[key]
          ) : prop;
          if (IS_CLIENT) {
            const getters = setupStore._getters || // @ts-expect-error: same
            (setupStore._getters = vue.markRaw([]));
            getters.push(key);
          }
        }
      }
    }
    {
      assign(store, setupStore);
      assign(vue.toRaw(store), setupStore);
    }
    Object.defineProperty(store, "$state", {
      get: () => hot ? hotState.value : pinia.state.value[$id],
      set: (state) => {
        if (hot) {
          throw new Error("cannot set hotState");
        }
        $patch(($state) => {
          assign($state, state);
        });
      }
    });
    {
      store._hotUpdate = vue.markRaw((newStore) => {
        store._hotUpdating = true;
        newStore._hmrPayload.state.forEach((stateKey) => {
          if (stateKey in store.$state) {
            const newStateTarget = newStore.$state[stateKey];
            const oldStateSource = store.$state[stateKey];
            if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
              patchObject(newStateTarget, oldStateSource);
            } else {
              newStore.$state[stateKey] = oldStateSource;
            }
          }
          set(store, stateKey, vue.toRef(newStore.$state, stateKey));
        });
        Object.keys(store.$state).forEach((stateKey) => {
          if (!(stateKey in newStore.$state)) {
            del(store, stateKey);
          }
        });
        isListening = false;
        isSyncListening = false;
        pinia.state.value[$id] = vue.toRef(newStore._hmrPayload, "hotState");
        isSyncListening = true;
        vue.nextTick().then(() => {
          isListening = true;
        });
        for (const actionName in newStore._hmrPayload.actions) {
          const action = newStore[actionName];
          set(store, actionName, wrapAction(actionName, action));
        }
        for (const getterName in newStore._hmrPayload.getters) {
          const getter = newStore._hmrPayload.getters[getterName];
          const getterValue = isOptionsStore ? (
            // special handling of options api
            vue.computed(() => {
              setActivePinia(pinia);
              return getter.call(store, store);
            })
          ) : getter;
          set(store, getterName, getterValue);
        }
        Object.keys(store._hmrPayload.getters).forEach((key) => {
          if (!(key in newStore._hmrPayload.getters)) {
            del(store, key);
          }
        });
        Object.keys(store._hmrPayload.actions).forEach((key) => {
          if (!(key in newStore._hmrPayload.actions)) {
            del(store, key);
          }
        });
        store._hmrPayload = newStore._hmrPayload;
        store._getters = newStore._getters;
        store._hotUpdating = false;
      });
    }
    if (USE_DEVTOOLS) {
      const nonEnumerable = {
        writable: true,
        configurable: true,
        // avoid warning on devtools trying to display this property
        enumerable: false
      };
      ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p2) => {
        Object.defineProperty(store, p2, {
          value: store[p2],
          ...nonEnumerable
        });
      });
    }
    pinia._p.forEach((extender) => {
      if (USE_DEVTOOLS) {
        const extensions = scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        }));
        Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
        assign(store, extensions);
      } else {
        assign(store, scope.run(() => extender({
          store,
          app: pinia._a,
          pinia,
          options: optionsForPlugin
        })));
      }
    });
    if (store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
      console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
    }
    if (initialState && isOptionsStore && options.hydrate) {
      options.hydrate(store.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store;
  }
  function defineStore(idOrOptions, setup, setupOptions) {
    let id;
    let options;
    const isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = isSetupStore ? setupOptions : setup;
    } else {
      options = idOrOptions;
      id = idOrOptions.id;
    }
    function useStore(pinia, hot) {
      const currentInstance = vue.getCurrentInstance();
      pinia = // in test mode, ignore the argument provided as we can always retrieve a
      // pinia instance with getActivePinia()
      pinia || currentInstance && vue.inject(piniaSymbol, null);
      if (pinia)
        setActivePinia(pinia);
      if (!activePinia) {
        throw new Error(`[🍍]: getActivePinia was called with no active Pinia. Did you forget to install pinia?
	const pinia = createPinia()
	app.use(pinia)
This will fail in production.`);
      }
      pinia = activePinia;
      if (!pinia._s.has(id)) {
        if (isSetupStore) {
          createSetupStore(id, setup, options, pinia);
        } else {
          createOptionsStore(id, options, pinia);
        }
        {
          useStore._pinia = pinia;
        }
      }
      const store = pinia._s.get(id);
      if (hot) {
        const hotId = "__hot:" + id;
        const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
        hot._hotUpdate(newStore);
        delete pinia.state.value[hotId];
        pinia._s.delete(hotId);
      }
      if (IS_CLIENT && currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
      return store;
    }
    useStore.$id = id;
    return useStore;
  }
  function mapActions(useStore, keysOrMapper) {
    return Array.isArray(keysOrMapper) ? keysOrMapper.reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[key](...args);
      };
      return reduced;
    }, {}) : Object.keys(keysOrMapper).reduce((reduced, key) => {
      reduced[key] = function(...args) {
        return useStore(this.$pinia)[keysOrMapper[key]](...args);
      };
      return reduced;
    }, {});
  }
  const useCategory = defineStore({
    id: "currentCategory",
    state: () => ({
      currentInfo: {
        id: "",
        name: ""
      }
    }),
    getters: {
      category: (state) => {
        formatAppLog("log", "at store/index.js:16", "state", state);
        return state.currentInfo;
      }
    },
    actions: {
      setCategoryInfo(res) {
        this.currentInfo.id = res.categoryId;
        this.currentInfo.name = res.categoryName;
        formatAppLog("log", "at store/index.js:24", this.currentInfo, "设置完成后的参数");
      }
    }
  });
  const _sfc_main$N = {
    components: {
      tabItem
    },
    onLoad(option) {
      formatAppLog("log", "at pages/constructor/constructorItem.vue:57", "currentCategoryDetail", option);
      let currentIDIsNull = uni.getStorageSync("currentCategoryId");
      if (currentIDIsNull) {
        this.title = option.categoryName;
      }
      this.categoryId = option.categoryId;
      this.setCategoryInfo(option);
      uni.setNavigationBarTitle({
        title: uni.getStorageSync("currentCategoryDetail").categoryName
      });
    },
    onShow() {
      this.getCategoryTypeList();
    },
    data() {
      return {
        userCollectFlag: false,
        shareList: [],
        title: "",
        categoryId: "",
        trueQuestionChapterFlag: false,
        isActive: 0,
        collectText: "收藏",
        navList: [{
          index: 0,
          title: "题库练习"
        }, {
          index: 1,
          title: "考试信息"
        }],
        list: [
          {
            id: 11,
            type: "我的错题",
            num: 0,
            icon: "icon-cuowukongxin"
          },
          {
            id: 12,
            type: "我的收藏",
            num: 0,
            icon: "icon-shoucang"
          },
          {
            id: 13,
            type: "我的笔记",
            num: 0,
            icon: "icon-youliaobiji"
          }
          // {
          // 	id: 11,
          // 	type: '在线学习',
          // 	num: 0,
          // 	icon: "icon-zaixianxuexi"
          // },
        ],
        exerciseList: [
          {
            index: 0,
            title: "顺序练习",
            desc: "1/1000",
            icon: "icon-shoucang"
          },
          {
            index: 1,
            title: "模拟考试",
            desc: "随机抽题仿真模拟",
            icon: "icon-zaixianxuexi"
          },
          {
            index: 2,
            title: "高频错题",
            desc: "精选高频易错题",
            icon: "icon-shoucang"
          },
          {
            index: 3,
            title: "随机练习",
            desc: "试题顺序打乱练习",
            icon: "icon-shoucang"
          },
          {
            index: 4,
            title: "题型练习",
            desc: "按题型分类练习",
            icon: "icon-shoucang"
          },
          {
            index: 5,
            title: "章节练习",
            desc: "按章节分类练习",
            icon: "icon-shoucang"
          },
          {
            index: 6,
            title: "历年真题",
            desc: "往年真题/模拟题",
            icon: "icon-shoucang"
          },
          {
            index: 7,
            title: "试题搜索",
            desc: "快速从题库中查找",
            icon: "icon-shoucang"
          }
          // {
          //   index: 8,
          //   title: "练习记录",
          //   desc: "考试学习相关文档",
          //   icon: "icon-shoucang"
          // },
          // {
          //   index: 9,
          //   title: "在线学习",
          //   desc: "考试学习相关文档",
          //   icon: "icon-shoucang"
          // },
        ],
        infoList: [
          {
            index: 10,
            title: "考试简介",
            desc: "考试用途 发展方向",
            icon: "icon-shoucang"
          },
          {
            index: 11,
            title: "报考指南",
            desc: "报考条件 时间流程",
            icon: "icon-shoucang"
          },
          {
            index: 12,
            title: "考试大纲",
            desc: "官方发布 复习导航",
            icon: "icon-shoucang"
          },
          {
            index: 13,
            title: "考试安排",
            desc: "考试科目 题型一览",
            icon: "icon-shoucang"
          },
          {
            index: 14,
            title: "成绩证书",
            desc: "成绩信息 证书领取",
            icon: "icon-shoucang"
          },
          {
            index: 15,
            title: "考试资讯",
            desc: "最新动态 快速浏览",
            icon: "icon-shoucang"
          }
        ]
      };
    },
    methods: {
      ...mapActions(useCategory, ["setCategoryInfo"]),
      getCategoryTypeList() {
        let opt = {
          params: {
            pid: uni.getStorageSync("pid")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/constructor/constructorItem.vue:225", "获取的列表", res);
            if (res.length > 0) {
              this.categoryId = res[0].categoryId;
              uni.setStorageSync("fCurrentCategoryId", res[0].categoryId);
              let currentIDIsNull = uni.getStorageSync("currentCategoryId");
              if (!currentIDIsNull) {
                this.title = res[0].categoryName;
                if (res[0].userCollectFlag) {
                  this.userCollectFlag = true;
                } else {
                  this.userCollectFlag = false;
                }
              } else {
                res.map((item) => {
                  if (item.categoryId == currentIDIsNull && item.userCollectFlag) {
                    this.userCollectFlag = true;
                  } else {
                    this.userCollectFlag = false;
                  }
                });
              }
              this.byGetCategoryIdDetail();
            }
          }
        };
        this.$http("getCategoryType", opt);
      },
      hrefrouterApp() {
        uni.navigateTo({
          url: "../constructor/constructorItem"
        });
      },
      switchObject() {
        let pid = uni.getStorageSync("pid");
        uni.getStorageSync("fCurrentCategoryId");
        uni.redirectTo({
          url: `../subject/subject?categoryId=${pid}`
        });
      },
      checked(index) {
        this.isActive = index;
      },
      getList() {
        let opt = {
          params: {
            trueQuestionChapterFlag: this.trueQuestionChapterFlag,
            categoryId: this.categoryId
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/constructor/constructorItem.vue:278", "获取参数jjj", res);
          }
        };
        this.$http("getCategoryId", opt);
      },
      //错题 收藏 笔记 跳转
      jumpQuestionList(item) {
        formatAppLog("log", "at pages/constructor/constructorItem.vue:285", "笔记", item);
        if (item.id == 13) {
          uni.navigateTo({
            // url: `../answer/index?listType=${toRaw(item.id)}`
            url: `../notes/myNotes?listType=${vue.toRaw(item.id)}`
          });
        } else {
          uni.navigateTo({
            url: `../wrong/index?listType=${vue.toRaw(item.id)}`
          });
        }
      },
      // 获取用户刷题页详情数据
      byGetCategoryIdDetail() {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId")
          },
          callBack: (res) => {
            uni.hideLoading();
            formatAppLog("log", "at pages/constructor/constructorItem.vue:306", "获取用户刷题页详情数据", res);
            this.list[0]["num"] = res.errorNum;
            this.list[1]["num"] = res.collectNum;
            this.list[2]["num"] = res.notesNum;
            this.exerciseList[0]["desc"] = `1/${res.questionNum}`;
          }
        };
        this.$http("getCategoryIdDetail", opt);
      }
    }
  };
  function _sfc_render$D(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    const _component_tab_item = vue.resolveComponent("tab-item");
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode(
          "text",
          { class: "top-nav" },
          vue.toDisplayString($data.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view", { class: "top-btn" }, [
          vue.createElementVNode("img", {
            class: "vectorIcon",
            src: "/static/Vector.png",
            alt: ""
          }),
          vue.createElementVNode("view", {
            class: "top-text",
            onClick: _cache[0] || (_cache[0] = ($event) => $options.switchObject())
          }, " 切换科目 ")
        ])
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.list, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: index,
              class: "item"
            }, [
              vue.createElementVNode("view", {
                class: "list",
                onClick: ($event) => $options.jumpQuestionList(item)
              }, [
                vue.createElementVNode("view", { class: "icon" }, [
                  vue.createVNode(_component_uni_icons, {
                    "custom-prefix": "iconfont",
                    type: item.icon,
                    size: "30"
                  }, null, 8, ["type"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "nav" },
                  vue.toDisplayString(item.type),
                  1
                  /* TEXT */
                )
              ], 8, ["onClick"]),
              vue.createElementVNode(
                "view",
                { class: "num" },
                "(" + vue.toDisplayString(item.num) + ")",
                1
                /* TEXT */
              )
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode("-切换 "),
      vue.createElementVNode("view", null, [
        vue.createElementVNode("view", { class: "border-tb tab_nav" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.navList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "navTitle",
                key: index
              }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass({ "active": $data.isActive === index }),
                  onClick: ($event) => $options.checked(index)
                }, vue.toDisplayString(item.title), 11, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        $data.isActive == 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
          vue.createVNode(_component_tab_item, {
            exerciseList: $data.exerciseList,
            userCollectFlag: $data.userCollectFlag
          }, null, 8, ["exerciseList", "userCollectFlag"])
        ])) : vue.createCommentVNode("v-if", true),
        $data.isActive == 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
          vue.createVNode(_component_tab_item, {
            exerciseList: $data.infoList,
            userCollectFlag: $data.userCollectFlag
          }, null, 8, ["exerciseList", "userCollectFlag"])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode("-切换")
    ]);
  }
  const PagesConstructorConstructorItem = /* @__PURE__ */ _export_sfc(_sfc_main$N, [["render", _sfc_render$D], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/constructor/constructorItem.vue"]]);
  const _sfc_main$M = {
    data() {
      return {
        isActive: 0,
        list: [],
        categoryId: -1
      };
    },
    onLoad(params) {
      this.getCategoryTypeList(params.categoryId);
      this.categoryId = uni.getStorageSync("currentCategoryId");
      formatAppLog("log", "at pages/subject/subject.vue:37", "切换科目", this.categoryId);
    },
    computed: {
      isSelectId() {
        return uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId");
      }
    },
    methods: {
      hrefrouterApp(item) {
        formatAppLog("log", "at pages/subject/subject.vue:47", item, item.categoryId, "item");
        uni.setStorageSync("currentCategoryId", item.categoryId);
        uni.setStorageSync("fCurrentCategoryId", 0);
        uni.redirectTo({
          url: `../constructor/constructorItem?categoryId=${item.categoryId}&categoryName=${item.categoryName}&parentId=${item.parentId}`
        });
      },
      getCategoryTypeList(id) {
        uni.showLoading({
          title: "加载中"
        });
        let opt = {
          params: {
            pid: id
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/subject/subject.vue:67", "获取的列表", res);
            this.list = res;
            uni.hideLoading();
          }
        };
        this.$http("getCategoryType", opt);
      }
    }
  };
  function _sfc_render$C(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container-box" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.list, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "container",
            key: index,
            onClick: ($event) => $options.hrefrouterApp(item)
          }, [
            vue.createElementVNode("view", { class: "list-box" }, [
              vue.createElementVNode("view", { class: "subject" }, [
                vue.createElementVNode(
                  "view",
                  { class: "sub-title" },
                  vue.toDisplayString(item.categoryName),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "update-info" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "num" },
                    vue.toDisplayString(item.questionNum) + "题 ",
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "date" },
                    vue.toDisplayString(item.updateTime) + " 更新",
                    1
                    /* TEXT */
                  )
                ])
              ]),
              item.categoryId == $options.isSelectId ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "checkmarkempty",
                  size: "30",
                  color: "#4674F6"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], 8, ["onClick"]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesSubjectSubject = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["render", _sfc_render$C], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/subject/subject.vue"]]);
  const _sfc_main$L = {
    data() {
      return {
        isActive: 0,
        noteList: []
      };
    },
    onLoad() {
      this.getUserNoteList();
    },
    methods: {
      getUserNoteList() {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId"),
            page: 1,
            size: 50
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/notes/myNotes.vue:47", "获取的笔记", res);
            this.noteList = res.records;
          }
        };
        this.$http("getNodeList", opt);
      },
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      },
      hrefrouterApp() {
        uni.navigateTo({
          url: "../wrong/wrongQuestion"
        });
      }
    }
  };
  function _sfc_render$B(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container-box" }, [
      $data.noteList.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "notes"
      }, [
        vue.createElementVNode("view", { class: "notes-img" }, [
          vue.createElementVNode("image", {
            src: "/static/notes/notes.png",
            class: "img"
          })
        ]),
        vue.createElementVNode("view", { class: "desc" }, [
          vue.createElementVNode("view", { class: "none" }, " 没有笔记"),
          vue.createElementVNode("view", { class: "tips" }, " 没有笔记练习时，可以记录笔记内容，方便记忆理解哦")
        ]),
        vue.createElementVNode("view", {
          class: "btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.goBack && $options.goBack(...args))
        }, " 去练习")
      ])) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.noteList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
              vue.createElementVNode(
                "view",
                { class: "note-create" },
                vue.toDisplayString(item.createTime),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "note-content" },
                vue.toDisplayString(item.notesContent),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "item-question" }, [
                vue.createElementVNode(
                  "view",
                  { class: "question-type" },
                  vue.toDisplayString(item.question.questionTypeName),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode(
                  vue.toDisplayString(item.question.questionTitle),
                  1
                  /* TEXT */
                )
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesNotesMyNotes = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["render", _sfc_render$B], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/notes/myNotes.vue"]]);
  const _sfc_main$K = {
    data() {
      return {};
    },
    methods: {
      helpBtn() {
        uni.navigateTo({
          url: "./customerService"
        });
      }
    }
  };
  function _sfc_render$A(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "help" }, [
      vue.createElementVNode("view", { class: "help_content" }, [
        vue.createElementVNode("view", { class: "title" }, [
          vue.createElementVNode("span"),
          vue.createTextVNode(" 常见问题 ")
        ]),
        vue.createElementVNode("view", { class: "help_item" }, " 语音输入怎么使用？ "),
        vue.createElementVNode("view", { class: "help_item" }, " 头像昵称怎么修改? "),
        vue.createElementVNode("view", { class: "help_item" }, " 题库如何练习？ ")
      ]),
      vue.createElementVNode("view", { class: "help_btn" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.helpBtn && $options.helpBtn(...args))
        }, "联系客服")
      ])
    ]);
  }
  const PagesMyHelpHelp = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["render", _sfc_render$A], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/help/help.vue"]]);
  const _sfc_main$J = {};
  function _sfc_render$z(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "customerService" }, [
      vue.createElementVNode("view", { class: "header" }),
      vue.createElementVNode("view", { class: "content" }, [
        vue.createElementVNode("img", {
          class: "login-img",
          src: "/static/my/logo.png",
          alt: ""
        }),
        vue.createElementVNode("view", { class: "text" }, "刷题通客服"),
        vue.createElementVNode("view", { class: "text-wechart" }, [
          vue.createTextVNode("微信号: shuatitongvip "),
          vue.createElementVNode("text", {
            style: { "color": "#4674F6" },
            onClick: _cache[0] || (_cache[0] = (...args) => _ctx.copyWechat && _ctx.copyWechat(...args))
          }, " 复制")
        ]),
        vue.createElementVNode("view", { class: "box" })
      ]),
      vue.createElementVNode("view", { style: { "margin": "600rpx 40rpx" } }, [
        vue.createElementVNode("text", { style: { "font-size": "24rpx", "color": "#999999" } }, "说明：产品使用过程中有问题，可以在常见问题中查 看，如果无法解决，再咨询客服。")
      ])
    ]);
  }
  const PagesMyHelpCustomerService = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["render", _sfc_render$z], ["__scopeId", "data-v-ffdba9d3"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/help/customerService.vue"]]);
  const _sfc_main$I = {
    onLoad() {
      this.getCategoryTypeList();
    },
    onShow() {
      this.getCategoryTypeList();
    },
    methods: {
      confirm(res) {
        this.getDocumentList();
      },
      goDocumentView(item) {
        formatAppLog("log", "at pages/document/document.vue:58", item);
        uni.setStorageSync("docDetail", item);
        uni.navigateTo({
          url: `../docView/docView`
        });
      },
      typeChange(item) {
        this.currentCategoryId = item.categoryId;
        this.getDocumentList();
        this.questionList.map((val) => {
          val.line = false;
          if (val.categoryId === item.categoryId) {
            val.line = true;
          }
        });
      },
      categoryInit(res) {
        this.questionList = [{
          categoryId: "",
          categoryName: "全部",
          children: [],
          level: 1,
          line: true,
          parentFlag: true,
          parentId: 0
        }, ...res];
      },
      getCategoryTypeList() {
        let opt = {
          callBack: (res) => {
            if (res.length > 1) {
              formatAppLog("log", "at pages/document/document.vue:89", res, "res");
              uni.setStorageSync("categoryParams", res);
              this.categoryInit(res);
              this.getDocumentList();
            }
          }
        };
        let categoryParams = uni.getStorageSync("categoryParams");
        if (categoryParams) {
          this.categoryInit(categoryParams);
          this.getDocumentList();
        } else {
          this.$http("getCategoryType", opt);
        }
      },
      getDocumentList() {
        let dOpt = {
          params: {
            "categoryId": this.currentCategoryId,
            "docName": this.docName,
            "page": 1,
            "size": 100
          },
          callBack: (res) => {
            this.documentList = res.records;
          }
        };
        this.$http("getDocumentList", dOpt);
      }
    },
    data() {
      return {
        searchVal: "",
        currentCategoryId: "",
        questionList: [],
        docName: "",
        documentList: [],
        // 状态栏高度
        statusBarHeight: wx.getStorageSync("statusBarHeight") + "px",
        // 导航栏高度
        navigationBarHeight: wx.getStorageSync("navigationBarHeight") + "px",
        // 胶囊按钮高度
        menuButtonHeight: wx.getStorageSync("menuButtonHeight") + "px",
        // 导航栏和状态栏高度
        navigationBarAndStatusBarHeight: wx.getStorageSync("statusBarHeight") + wx.getStorageSync("navigationBarHeight") + "px"
      };
    }
  };
  function _sfc_render$y(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_2$3);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_2$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createVNode(_component_uni_nav_bar, {
        style: vue.normalizeStyle({ "height": $data.navigationBarAndStatusBarHeight, display: "flex" }),
        "status-bar": true,
        leftWidth: 0,
        title: ""
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "input-view" }, [
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.docName = $event),
                "confirm-type": "search",
                class: "nav-bar-input",
                type: "text",
                placeholder: "输入搜索关键词",
                onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args))
              },
              null,
              544
              /* HYDRATE_EVENTS, NEED_PATCH */
            ), [
              [vue.vModelText, $data.docName]
            ])
          ]),
          vue.createElementVNode("template", null, [
            vue.createElementVNode("view", {
              onClick: _cache[2] || (_cache[2] = (...args) => $options.confirm && $options.confirm(...args)),
              class: "input-text"
            }, " 搜索 ")
          ])
        ]),
        _: 1
        /* STABLE */
      }, 8, ["style"]),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "left" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.questionList, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_uni_section, {
                title: item.categoryName,
                type: item.line ? "line" : "",
                key: item.categoryId,
                onClick: ($event) => $options.typeChange(item)
              }, null, 8, ["title", "type", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "right" }, [
          $data.documentList.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList($data.documentList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list-native",
                key: index,
                onClick: ($event) => $options.goDocumentView(item)
              }, [
                vue.createElementVNode("img", {
                  src: item.type === ".docx" ? `../../static/doc.png` : `../../static/${item.type}.png`,
                  class: "icon-type",
                  alt: ""
                }, null, 8, ["src"]),
                vue.createCommentVNode(' <span :class="item.type"></span> '),
                vue.createElementVNode("text", { class: "list-text" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.docName) + vue.toDisplayString(item.type),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "other-text" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "text-down" },
                      vue.toDisplayString(item.downloadNum || 0) + "下载",
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", { class: "text-page" }, "10页")
                  ])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "data-null"
          }, [
            vue.createElementVNode("text", null, "暂无数据")
          ]))
        ])
      ])
    ]);
  }
  const PagesDocumentDocument = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["render", _sfc_render$y], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/document/document.vue"]]);
  const _sfc_main$H = {
    data() {
      return {
        //屏幕高度
        screenHeight: 0,
        isChecked: false,
        progressWidth: 40,
        type: 0,
        listInfo: {},
        list: [
          {
            id: 11,
            type: "错题分布",
            num: 1,
            icon: "icon-cuowukongxin"
          },
          {
            id: 11,
            type: "单选题",
            num: 99,
            icon: "icon-shoucang"
          }
        ],
        percent: 10,
        //百分比0~100
        arrInfo: []
      };
    },
    onLoad(res) {
      formatAppLog("log", "at pages/wrong/index.vue:133", "res", res);
      this.type = res.listType == 11 ? 0 : 1;
      formatAppLog("log", "at pages/wrong/index.vue:136", this.screenHeight + "this.screenHeight");
      this.getPageInfo(res.listType);
    },
    options: {
      styleIsolation: "shared"
    },
    //与methods 同级加入一下代码
    options: {
      addGlobalClass: true
    },
    methods: {
      jumpErrorQuestion() {
        if (this.listInfo.errorNum === 0) {
          uni.showToast({
            title: "暂无错题数据",
            icon: "error"
          });
          return;
        }
        if (this.type === 0) {
          uni.navigateTo({
            url: `../answer/index?listType=${11}`
          });
        } else {
          if (this.listInfo.allCollectNum == 0) {
            uni.showToast({
              title: "暂无收藏数据",
              icon: "error"
            });
            return;
          }
          uni.navigateTo({
            url: `../answer/index?listType=${12}`
          });
        }
      },
      clearBtn(type) {
        formatAppLog("log", "at pages/wrong/index.vue:178", type, "按钮点击");
        type === 0 && this.clearErrorQuestionList(2);
        type === 1 && this.clearCollect(type);
        this.getPageInfo();
      },
      // 清空错题 type =1清空答题正确的记录  type=2清空答题错误的记录
      clearErrorQuestionList(type) {
        let opt = {
          params: {
            type
          },
          callBack: (res) => {
            if (res) {
              uni.showToast({
                title: "清除成功!"
              });
            } else {
              uni.showToast({
                title: "没有错题数据!",
                icon: "error"
              });
            }
          }
        };
        this.$http("clearCollectAll", opt);
      },
      // 获取错题的统计信息
      getPageInfo(type) {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/wrong/index.vue:211", "获取的统计信息", res);
            this.arrInfo = res;
            this.listInfo = type == 11 ? res["questionStatistic"] : res["collectStatistic"];
          }
        };
        this.$http("getUserCategory", opt);
      },
      // 清除所有收藏
      clearCollect(type) {
        let opt = {
          params: {
            type: 2
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/wrong/index.vue:225", "清除数据", res);
            if (res) {
              uni.showToast({
                title: "清除成功!"
              });
            } else {
              uni.showToast({
                title: "没有收藏数据!",
                icon: "error"
              });
            }
          }
        };
        this.$http("clearCollectAll", opt);
      },
      // 获取收藏的数据
      getCollectStatistic() {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/wrong/index.vue:247", "获取的数据", res);
          }
        };
        this.$http("collectStatus", opt);
      },
      change() {
      },
      onChange(type) {
        formatAppLog("log", "at pages/wrong/index.vue:257", "type", type);
        this.type = type;
        this.isChecked = !this.isChecked;
        if (type === 1) {
          this.listInfo = this.arrInfo["collectStatistic"];
        } else {
          this.listInfo = this.arrInfo["questionStatistic"];
        }
      },
      hrefrouterApp() {
        uni.navigateTo({
          url: "../constructor/constructor"
        });
      }
    }
  };
  function _sfc_render$x(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "wrong-wrap" }, [
      vue.createCommentVNode(" 内容区域 "),
      vue.createElementVNode("view", { class: "content-wrap" }, [
        vue.createElementVNode("view", { class: "toggle-button-wrapper top-wrap" }, [
          vue.createElementVNode("view", { for: "toggle-button" }, [
            vue.createElementVNode("view", { class: "default" }, [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["wrong-question wrong", [$data.type === 0 ? "isChecked" : ""]]),
                  onClick: _cache[0] || (_cache[0] = ($event) => $options.onChange(0))
                },
                "错题 ",
                2
                /* CLASS */
              ),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["collection-question wrong", [$data.type === 1 ? "isChecked" : ""]]),
                  onClick: _cache[1] || (_cache[1] = ($event) => $options.onChange(1))
                },
                " 收藏题",
                2
                /* CLASS */
              )
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "center-wrap" }, [
          vue.createElementVNode("view", {
            class: "center",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.jumpErrorQuestion && $options.jumpErrorQuestion(...args))
          }, [
            vue.createElementVNode(
              "p",
              { class: "number" },
              vue.toDisplayString($data.type === 0 ? $data.listInfo.errorNum || 0 : $data.listInfo.allCollectNum || 0),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "p",
              { class: "all" },
              vue.toDisplayString($data.type === 0 ? "全部错题" : "全部收藏"),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createCommentVNode(` <view class="bottom-wrap">\r
				<view class="wrong-btn btn"> {{type===0?'今日错题':'今日收藏'}} </view>\r
				<view class="all-btn btn "> {{type===0?'全部错题':'全部收藏'}} </view>\r
			</view> `),
        vue.createElementVNode("view", { class: "progress-box" }, [
          vue.createElementVNode("view", { class: "progres-content" }, [
            vue.createElementVNode("progress", {
              "stroke-width": "6.9",
              percent: $data.percent,
              activeColor: "red",
              backgroundColor: "#E2E2E2",
              "border-radius": "40"
            }, null, 8, ["percent"]),
            $data.type === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "problems-box"
            }, [
              vue.createElementVNode(
                "view",
                { class: "left" },
                " 已答题目" + vue.toDisplayString($data.listInfo.allNum) + "，错题" + vue.toDisplayString($data.listInfo.errorNum) + "题 ",
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "right" },
                " 未做题" + vue.toDisplayString($data.listInfo.totalQuestionNum - $data.listInfo.todayErrorNum) + "题",
                1
                /* TEXT */
              )
            ])) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "problems-box"
            }, [
              vue.createElementVNode(
                "view",
                { class: "left" },
                " 今日收藏" + vue.toDisplayString($data.listInfo.todayCollectNum || 0) + "题",
                1
                /* TEXT */
              ),
              vue.createCommentVNode(' <view class="right"> 未做题{{listInfo.totalQuestionNum-listInfo.todayErrorNum}}题</view> ')
            ]))
          ])
        ])
      ]),
      vue.createCommentVNode(" 内容区域 "),
      vue.createCommentVNode(" "),
      vue.createElementVNode("view", { class: "banner" }, [
        $data.type === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "vip-box"
        }, [
          vue.createElementVNode("view", { class: "vip-icon" }, [
            vue.createVNode(_component_uni_icons, {
              "custom-prefix": "iconfont",
              type: "icon-zaixianxuexi",
              size: "30"
            })
          ]),
          vue.createElementVNode("view", { class: "vip-text" }, [
            vue.createElementVNode("p", null, "高频错题 快速提高 "),
            vue.createElementVNode("p", null, "精选易错题 难题，更多专属权益 ")
          ]),
          vue.createElementVNode("view", { class: "vip-btn" }, " 升级VIP")
        ])) : vue.createCommentVNode("v-if", true),
        vue.createCommentVNode(' 	<view class="total-box" v-for="(item,index) in list" :key="index">\r\n				<view class="ques-form"> {{item.type}} </view>\r\n				<view class="num-problems"> <text> {{item.num}} 题 </text> </view>\r\n			</view> '),
        vue.createElementVNode("view", { class: "total-box" }, [
          vue.createElementVNode(
            "view",
            { class: "ques-form" },
            vue.toDisplayString($data.type === 0 ? "错题分布" : "收藏分布"),
            1
            /* TEXT */
          )
        ]),
        $data.listInfo["判断题"] > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "total-box"
        }, [
          vue.createElementVNode("view", { class: "ques-form" }, " 判断题 "),
          vue.createElementVNode("view", { class: "num-problems" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.listInfo["判断题"]) + " 题 ",
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $data.listInfo["单选题"] > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "total-box"
        }, [
          vue.createElementVNode("view", { class: "ques-form" }, " 单选题 "),
          vue.createElementVNode("view", { class: "num-problems" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.listInfo["单选题"]) + " 题 ",
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $data.listInfo["填空题"] > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 3,
          class: "total-box"
        }, [
          vue.createElementVNode("view", { class: "ques-form" }, " 填空题 "),
          vue.createElementVNode("view", { class: "num-problems" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.listInfo["填空题"]) + " 题 ",
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $data.listInfo["多选题"] > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 4,
          class: "total-box"
        }, [
          vue.createElementVNode("view", { class: "ques-form" }, " 多选题 "),
          vue.createElementVNode("view", { class: "num-problems" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.listInfo["多选题"]) + " 题 ",
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true),
        $data.listInfo["简答题"] > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "total-box"
        }, [
          vue.createElementVNode("view", { class: "ques-form" }, " 简答题 "),
          vue.createElementVNode("view", { class: "num-problems" }, [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($data.listInfo["简答题"]) + " 题 ",
              1
              /* TEXT */
            )
          ])
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode(
        "button",
        {
          class: "clear-btn",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.clearBtn($data.type))
        },
        vue.toDisplayString($data.type === 0 ? "清空错题" : "清空收藏"),
        1
        /* TEXT */
      ),
      vue.createCommentVNode(` <view class="wrong-box" @click="clearBtn(type)">\r
			<view class="wrong-btn">\r
				{{type===0?'清空错题':'清空收藏'}}\r
			</view>\r
\r
		</view> `)
    ]);
  }
  const PagesWrongIndex = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$x], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/wrong/index.vue"]]);
  const ComponentClass$1 = "uni-col";
  const _sfc_main$G = {
    name: "uniCol",
    props: {
      span: {
        type: Number,
        default: 24
      },
      offset: {
        type: Number,
        default: -1
      },
      pull: {
        type: Number,
        default: -1
      },
      push: {
        type: Number,
        default: -1
      },
      xs: [Number, Object],
      sm: [Number, Object],
      md: [Number, Object],
      lg: [Number, Object],
      xl: [Number, Object]
    },
    data() {
      return {
        gutter: 0,
        sizeClass: "",
        parentWidth: 0,
        nvueWidth: 0,
        marginLeft: 0,
        right: 0,
        left: 0
      };
    },
    created() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== "uniRow") {
        parent = parent.$parent;
      }
      this.updateGutter(parent.gutter);
      parent.$watch("gutter", (gutter) => {
        this.updateGutter(gutter);
      });
    },
    computed: {
      sizeList() {
        let {
          span,
          offset,
          pull,
          push
        } = this;
        return {
          span,
          offset,
          pull,
          push
        };
      },
      pointClassList() {
        let classList = [];
        ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
          const props = this[point];
          if (typeof props === "number") {
            classList.push(`${ComponentClass$1}-${point}-${props}`);
          } else if (typeof props === "object" && props) {
            Object.keys(props).forEach((pointProp) => {
              classList.push(
                pointProp === "span" ? `${ComponentClass$1}-${point}-${props[pointProp]}` : `${ComponentClass$1}-${point}-${pointProp}-${props[pointProp]}`
              );
            });
          }
        });
        return classList.join(" ");
      }
    },
    methods: {
      updateGutter(parentGutter) {
        parentGutter = Number(parentGutter);
        if (!isNaN(parentGutter)) {
          this.gutter = parentGutter / 2;
        }
      }
    },
    watch: {
      sizeList: {
        immediate: true,
        handler(newVal) {
          let classList = [];
          for (let size in newVal) {
            const curSize = newVal[size];
            if ((curSize || curSize === 0) && curSize !== -1) {
              classList.push(
                size === "span" ? `${ComponentClass$1}-${curSize}` : `${ComponentClass$1}-${size}-${curSize}`
              );
            }
          }
          this.sizeClass = classList.join(" ");
        }
      }
    }
  };
  function _sfc_render$w(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-col", $data.sizeClass, $options.pointClassList]),
        style: vue.normalizeStyle({
          paddingLeft: `${Number($data.gutter)}rpx`,
          paddingRight: `${Number($data.gutter)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$4 = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["render", _sfc_render$w], ["__scopeId", "data-v-28ff6624"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-row/components/uni-col/uni-col.vue"]]);
  const ComponentClass = "uni-row";
  const modifierSeparator = "--";
  const _sfc_main$F = {
    name: "uniRow",
    componentName: "uniRow",
    props: {
      type: String,
      gutter: Number,
      justify: {
        type: String,
        default: "start"
      },
      align: {
        type: String,
        default: "top"
      },
      // nvue如果使用span等属性，需要配置宽度
      width: {
        type: [String, Number],
        default: 750
      }
    },
    created() {
    },
    computed: {
      marginValue() {
        if (this.gutter) {
          return -(this.gutter / 2);
        }
        return 0;
      },
      typeClass() {
        return this.type === "flex" ? `${ComponentClass + modifierSeparator}flex` : "";
      },
      justifyClass() {
        return this.justify !== "start" ? `${ComponentClass + modifierSeparator}flex-justify-${this.justify}` : "";
      },
      alignClass() {
        return this.align !== "top" ? `${ComponentClass + modifierSeparator}flex-align-${this.align}` : "";
      }
    }
  };
  function _sfc_render$v(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-row", $options.typeClass, $options.justifyClass, $options.alignClass]),
        style: vue.normalizeStyle({
          marginLeft: `${Number($options.marginValue)}rpx`,
          marginRight: `${Number($options.marginValue)}rpx`
        })
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_1$4 = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["render", _sfc_render$v], ["__scopeId", "data-v-097353af"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-row/components/uni-row/uni-row.vue"]]);
  const _sfc_main$E = {
    onShow() {
      uni.getStorageSync("token");
      wechat.wxLogin();
      this.init();
      this.getVipStatic();
    },
    computed: {
      vipType() {
        let info = this.userInfo;
        let vipType = {
          1001: `VIP会员(${info.vipExpirationTime})到期`,
          1002: `SVIP会员(${info.vipExpirationTime})到期`
        }[info.vipFlag];
        return vipType;
      },
      vipDownNum() {
        let info = this.vipStatistic;
        return `剩余下载次数${info.downloadCount || 0} 剩余搜索次数${info.searchCount || 0}`;
      }
    },
    data() {
      return {
        userInfo: {},
        minAppNewUserFlag: true,
        vipStatistic: {},
        iconList: [{
          img: "../../static/my/collage.png",
          url: "./myCollect/myCollect",
          text: "我的收藏"
        }, {
          img: "../../static/my/history.png",
          text: "搜题记录",
          url: "./searchHistory/searchHistory"
        }, {
          img: "../../static/my/down.png",
          text: "文档下载",
          url: "./docDownList/docDownList"
        }, {
          img: "../../static/my/questionErr.png",
          text: "全部错题",
          url: "./errQuestionList/errQuestionList"
        }],
        navList: [
          {
            img: "../../static/my/Notifications.png",
            navigator: "./message/message",
            text: "我的消息"
          },
          {
            img: "../../static/my/inviteCode.png",
            text: "输入邀请码",
            navigator: "./cdKey/cdKey"
          },
          {
            img: "../../static/my/help.png",
            text: "帮助中心",
            navigator: "./help/help"
          },
          {
            img: "../../static/my/feedback.png",
            text: "意见反馈",
            navigator: "../addErrorQuestion/index?feedType=feedBack"
          },
          // {
          //      img: '../../static/my/share.png',
          //      text: '分享给好友',
          //      url: ''
          //    }, 
          {
            img: "../../static/my/Settings.png",
            text: "设置",
            navigator: "./setting"
          }
        ]
      };
    },
    methods: {
      jumpPage(item) {
        uni.navigateTo({
          url: item.url
        });
      },
      login() {
        formatAppLog("log", "at pages/my/my.vue:150", "navigateTo");
        uni.navigateTo({
          url: "../login/login",
          animationType: "slide-in-top",
          animationDuration: 200
        });
      },
      getVipStatic() {
        let opt = {
          params: {},
          callBack: (res) => {
            formatAppLog("log", "at pages/my/my.vue:161", "res用户返回的数据", res);
            uni.setStorageSync("vipStatistic", res);
            this.vipStatistic = res;
          }
        };
        this.$http("getVipStatic", opt);
      },
      init() {
        let userInfoStore = uni.getStorageSync("userInfo");
        if (userInfoStore) {
          this.userInfo = userInfoStore;
          this.minAppNewUserFlag = userInfoStore.minAppNewUserFlag;
        } else {
          wechat.wxLogin();
          this.userInfo = uni.getStorageSync("userInfo");
        }
      },
      navigatorToPage(e) {
        formatAppLog("log", "at pages/my/my.vue:180", "e", e);
        uni.navigateTo({
          url: e
        });
      },
      bindGetUserInfo(e) {
        uni.setStorageSync("encryptedDataUserInfo", e.detail.encryptedData);
        uni.setStorageSync("ivUserInfo", e.detail.iv);
      },
      goVip() {
        uni.navigateTo({
          url: "../vip/vip"
        });
      },
      change() {
        formatAppLog("log", "at pages/my/my.vue:195", "点击");
      }
    }
  };
  function _sfc_render$u(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1$4);
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createCommentVNode(' <view class="uni-padding-wrap uni-common-mt">\r\n			<button class="uni-primary-bg" @click="login">登陆</button>\r\n		</view> '),
      vue.createElementVNode("view", { class: "avatar-info" }, [
        vue.createVNode(_component_uni_row, { class: "header-uni" }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_col, { span: 4 }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("img", {
                  class: "avatar-img",
                  src: "/static/my/maskGroup.png",
                  alt: ""
                })
              ]),
              _: 1
              /* STABLE */
            }),
            !$data.userInfo.nickName ? (vue.openBlock(), vue.createBlock(_component_uni_col, {
              key: 0,
              span: 10
            }, {
              default: vue.withCtx(() => [
                vue.createCommentVNode(' @click="login" '),
                vue.createElementVNode("view", {
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.login && $options.login(...args)),
                  class: "user-phone"
                }, [
                  vue.createCommentVNode(' <text class="phone" @click="getUserInfo">登陆刷题通</text><br /> '),
                  vue.createElementVNode(
                    "button",
                    {
                      class: "login-btn",
                      size: "mini",
                      type: "primary",
                      "open-type": "getUserInfo",
                      withCredentials: "true",
                      onGetuserinfo: _cache[0] || (_cache[0] = (...args) => $options.bindGetUserInfo && $options.bindGetUserInfo(...args))
                    },
                    "登陆刷题通",
                    32
                    /* HYDRATE_EVENTS */
                  ),
                  vue.createElementVNode("text", { class: "id-num" })
                ])
              ]),
              _: 1
              /* STABLE */
            })) : (vue.openBlock(), vue.createBlock(_component_uni_col, {
              key: 1,
              span: 10
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "user-phone" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "phone" },
                    vue.toDisplayString($data.userInfo.nickName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("br"),
                  vue.createElementVNode(
                    "text",
                    { class: "id-num" },
                    vue.toDisplayString($data.userInfo.mobilephone),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              _: 1
              /* STABLE */
            }))
          ]),
          _: 1
          /* STABLE */
        })
      ]),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.iconList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                index,
                key: index,
                onClick: ($event) => $options.jumpPage(item)
              }, [
                vue.createVNode(
                  _component_uni_col,
                  { span: 6 },
                  {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("view", { class: "grid-item-box" }, [
                        vue.createElementVNode("img", {
                          class: "icon-img",
                          src: item.img,
                          alt: item.text
                        }, null, 8, ["src", "alt"]),
                        vue.createElementVNode(
                          "text",
                          { class: "text" },
                          vue.toDisplayString(item.text),
                          1
                          /* TEXT */
                        )
                      ])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                )
              ], 8, ["index", "onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          $data.userInfo.vipFlag != 1e3 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "item-vip",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.goVip && $options.goVip(...args))
          }, [
            vue.createElementVNode(
              "view",
              { class: "vip-text" },
              vue.toDisplayString($options.vipType),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "vip-text-down" },
              vue.toDisplayString($options.vipDownNum),
              1
              /* TEXT */
            ),
            vue.createElementVNode("img", {
              class: "img-vip",
              src: "/static/my/vip-bc.png",
              alt: "vip",
              width: "100%"
            })
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "item-vip",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.goVip && $options.goVip(...args))
          }, [
            vue.createElementVNode("img", {
              class: "img-vip",
              src: "/static/my/VIP.png",
              alt: "vip",
              width: "100%"
            })
          ]))
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_row, null, {
        default: vue.withCtx(() => [
          vue.createElementVNode("view", { class: "nav-list" }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($data.navList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "nav-item",
                  key: index
                }, [
                  vue.createElementVNode("view", { class: "nav-icon" }, [
                    vue.createElementVNode("img", {
                      class: "nav-img",
                      src: item.img,
                      alt: "item.text",
                      width: "64px"
                    }, null, 8, ["src"])
                  ]),
                  vue.createElementVNode("view", {
                    class: "nav-box",
                    onClick: ($event) => $options.navigatorToPage(item.navigator)
                  }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.text),
                      1
                      /* TEXT */
                    ),
                    vue.createVNode(_component_uni_icons, {
                      type: "forward",
                      size: "16"
                    })
                  ], 8, ["onClick"])
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesMyMy = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["render", _sfc_render$u], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/my.vue"]]);
  const popup = {
    data() {
      return {};
    },
    created() {
      this.popup = this.getParent();
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getParent(name = "uniPopup") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages2) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages2 && messages2[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages: messages2, watcher, formater }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater || defaultFormatter;
      this.messages = messages2 || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn2) {
      const index = this.watchers.push(fn2) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      [locale, messages2] = [
        messages2,
        locale
      ];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages: messages2,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn2) {
        return i18n.watchLocale(fn2);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en$1 = {
    "uni-popup.cancel": "cancel",
    "uni-popup.ok": "ok",
    "uni-popup.placeholder": "pleace enter",
    "uni-popup.title": "Hint",
    "uni-popup.shareTitle": "Share to"
  };
  const zhHans$1 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "确定",
    "uni-popup.placeholder": "请输入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const zhHant$1 = {
    "uni-popup.cancel": "取消",
    "uni-popup.ok": "確定",
    "uni-popup.placeholder": "請輸入",
    "uni-popup.title": "提示",
    "uni-popup.shareTitle": "分享到"
  };
  const messages$1 = {
    en: en$1,
    "zh-Hans": zhHans$1,
    "zh-Hant": zhHant$1
  };
  const { t: t$3 } = initVueI18n(messages$1);
  const _sfc_main$D = {
    name: "uniPopupDialog",
    mixins: [popup],
    emits: ["confirm", "close"],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      placeholder: {
        type: [String, Number],
        default: ""
      },
      type: {
        type: String,
        default: "error"
      },
      mode: {
        type: String,
        default: "base"
      },
      title: {
        type: String,
        default: ""
      },
      content: {
        type: String,
        default: ""
      },
      beforeClose: {
        type: Boolean,
        default: false
      },
      cancelText: {
        type: String,
        default: ""
      },
      confirmText: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        dialogType: "error",
        focus: false,
        val: ""
      };
    },
    computed: {
      okText() {
        return this.confirmText || t$3("uni-popup.ok");
      },
      closeText() {
        return this.cancelText || t$3("uni-popup.cancel");
      },
      placeholderText() {
        return this.placeholder || t$3("uni-popup.placeholder");
      },
      titleText() {
        return this.title || t$3("uni-popup.title");
      }
    },
    watch: {
      type(val) {
        this.dialogType = val;
      },
      mode(val) {
        if (val === "input") {
          this.dialogType = "info";
        }
      },
      value(val) {
        this.val = val;
      }
    },
    created() {
      this.popup.disableMask();
      if (this.mode === "input") {
        this.dialogType = "info";
        this.val = this.value;
      } else {
        this.dialogType = this.type;
      }
    },
    mounted() {
      this.focus = true;
    },
    methods: {
      /**
       * 点击确认按钮
       */
      onOk() {
        if (this.mode === "input") {
          this.$emit("confirm", this.val);
        } else {
          this.$emit("confirm");
        }
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      /**
       * 点击取消按钮
       */
      closeDialog() {
        this.$emit("close");
        if (this.beforeClose)
          return;
        this.popup.close();
      },
      close() {
        this.popup.close();
      }
    }
  };
  function _sfc_render$t(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-popup-dialog" }, [
      vue.createElementVNode("view", { class: "uni-dialog-title" }, [
        vue.createElementVNode(
          "text",
          {
            class: vue.normalizeClass(["uni-dialog-title-text", ["uni-popup__" + $data.dialogType]])
          },
          vue.toDisplayString($options.titleText),
          3
          /* TEXT, CLASS */
        )
      ]),
      $props.mode === "base" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-content-text" },
            vue.toDisplayString($props.content),
            1
            /* TEXT */
          )
        ], true)
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-dialog-content"
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.withDirectives(vue.createElementVNode("input", {
            class: "uni-dialog-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.val = $event),
            type: "text",
            placeholder: $options.placeholderText,
            focus: $data.focus
          }, null, 8, ["placeholder", "focus"]), [
            [vue.vModelText, $data.val]
          ])
        ], true)
      ])),
      vue.createElementVNode("view", { class: "uni-dialog-button-group" }, [
        vue.createElementVNode("view", {
          class: "uni-dialog-button",
          onClick: _cache[1] || (_cache[1] = (...args) => $options.closeDialog && $options.closeDialog(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text" },
            vue.toDisplayString($options.closeText),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", {
          class: "uni-dialog-button uni-border-left",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.onOk && $options.onOk(...args))
        }, [
          vue.createElementVNode(
            "text",
            { class: "uni-dialog-button-text uni-button-color" },
            vue.toDisplayString($options.okText),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["render", _sfc_render$t], ["__scopeId", "data-v-d78c88b7"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);
  const _sfc_main$C = {
    onLoad() {
      formatAppLog("log", "at pages/my/setting.vue:45", "onShow");
      this.init();
    },
    data() {
      return {
        myList: {
          headPicture: "",
          nickName: "",
          id: "",
          mobilephone: "",
          bindWeChart: ""
        },
        textLeft: ["头像", "昵称", "ID", "绑定手机号", "绑定微信", "注销账号"]
      };
    },
    methods: {
      init() {
        let {
          nickName,
          mobilephone
        } = uni.getStorageSync("userInfo");
        formatAppLog("log", "at pages/my/setting.vue:66", "nickName", nickName, mobilephone);
        this.myList.nickName = nickName;
        this.myList.mobilephone = mobilephone;
      },
      exit() {
        this.$refs.alertDialog.open();
      },
      dialogClose() {
        this.$refs.alertDialog.close();
      },
      dialogConfirm() {
        uni.clearStorage();
        uni.switchTab({
          url: "/pages/my/my"
        });
      }
    }
  };
  function _sfc_render$s(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$3);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1$5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "nav-list" }, [
        vue.createElementVNode("text", { class: "text-left" }, "头像"),
        vue.createElementVNode("img", {
          style: { "width": "34px", "height": "34px" },
          src: "/static/my/maskGroup.png",
          alt: ""
        })
      ]),
      vue.createElementVNode("view", { class: "nav-list" }, [
        vue.createElementVNode("text", { class: "text-left" }, "昵称"),
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($data.myList.nickName),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(' <view class="nav-list">\r\n			<text class="text-left">ID</text>\r\n			<text>{{myList.headPicture}}</text>\r\n		</view> '),
      vue.createElementVNode("view", { class: "nav-list" }, [
        vue.createElementVNode("text", { class: "text-left" }, "绑定手机号"),
        vue.createElementVNode(
          "text",
          null,
          vue.toDisplayString($data.myList.mobilephone),
          1
          /* TEXT */
        )
      ]),
      vue.createCommentVNode(' <view class="nav-list">\r\n			<text class="text-left">绑定微信</text>\r\n			<text>{{myList.headPicture}}</text>\r\n		</view> '),
      vue.createElementVNode("view", { class: "nav-list" }, [
        vue.createElementVNode("text", { class: "text-left" }, "注销账号"),
        vue.createVNode(_component_uni_icons, {
          type: "forward",
          size: "16"
        }),
        vue.createCommentVNode(" <text>{{myList.headPicture}}</text> ")
      ]),
      vue.createElementVNode("view", {
        class: "nav-list nav-bottom",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.exit && $options.exit(...args))
      }, [
        vue.createElementVNode("text", { class: "text-bottom" }, "退出登陆"),
        vue.createCommentVNode(" <text>{{myList.headPicture}}</text> ")
      ]),
      vue.createElementVNode("view", null, [
        vue.createCommentVNode(" 提示窗示例 "),
        vue.createVNode(
          _component_uni_popup,
          {
            ref: "alertDialog",
            type: "dialog"
          },
          {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_popup_dialog, {
                type: "error",
                cancelText: "取消",
                confirmText: "退出",
                title: "通知",
                content: "是否要退出登陆",
                onConfirm: $options.dialogConfirm,
                onClose: $options.dialogClose
              }, null, 8, ["onConfirm", "onClose"])
            ]),
            _: 1
            /* STABLE */
          },
          512
          /* NEED_PATCH */
        )
      ])
    ]);
  }
  const PagesMySetting = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render$s], ["__scopeId", "data-v-5fad43a3"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/setting.vue"]]);
  const _sfc_main$B = {
    name: "vcode-input",
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
        default: "#DADADA"
      },
      borderValueColor: {
        type: String,
        default: "#424456"
      },
      borderActiveColor: {
        type: String,
        default: "#FF6B00"
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
        value: ""
      };
    },
    watch: {
      value(value, oldVal) {
        if (this.isAutoComplete) {
          if (value.length >= this.sum) {
            this.setBlur();
            this.$emit("vcodeInput", value);
          }
        } else {
          this.$emit("vcodeInput", value);
        }
        if (this.isPassword) {
          let val = "";
          for (let i2 = 0; i2 < value.length; i2++) {
            val += "●";
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
        this.initInput();
      });
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
        });
      },
      setFocus() {
        this.focus = true;
      },
      clearValue() {
        this.setBlur();
        this.value = "";
        this.text = [];
        this.$forceUpdate();
      }
    }
  };
  function _sfc_render$r(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "vcode-input-body" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.sum, (v2, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "text",
            {
              class: vue.normalizeClass(["vcode-input-item", $props.isBorderLine ? "vcode-input-line" : "vcode-input-border"]),
              key: index,
              onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.setFocus && $options.setFocus(...args), ["stop"])),
              style: vue.normalizeStyle({
                borderColor: $data.text.length === index && $data.focus ? $props.borderActiveColor : $data.text.length > index ? $props.borderValueColor : $props.borderColor,
                color: $data.text.length > index ? $props.borderValueColor : $props.borderColor
              })
            },
            vue.toDisplayString($data.text[index]),
            7
            /* TEXT, CLASS, STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      vue.createElementVNode("view", { class: "hidden-input" }, [
        vue.withDirectives(vue.createElementVNode("input", {
          type: "number",
          "show-confirm-bar": false,
          "auto-blur": "",
          cursor: 99,
          focus: $data.focus,
          maxlength: $props.sum,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.value = $event),
          onBlur: _cache[2] || (_cache[2] = (...args) => $options.setBlur && $options.setBlur(...args)),
          onFocus: _cache[3] || (_cache[3] = (...args) => $options.setFocus && $options.setFocus(...args)),
          password: $props.isPassword,
          placeholder: "验证码"
        }, null, 40, ["focus", "maxlength", "password"]), [
          [vue.vModelText, $data.value]
        ])
      ])
    ]);
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["render", _sfc_render$r], ["__scopeId", "data-v-70bb045c"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/components/vcode-input/vcode-input.vue"]]);
  const _sfc_main$A = {
    components: {
      vcodeInput: __easycom_0$2
    },
    data() {
      return {
        cdKey: ""
      };
    },
    methods: {
      vcodeInput(value) {
        formatAppLog("log", "at pages/my/cdKey/cdKey.vue:37", value);
        this.cdKey = value;
      },
      submit() {
        if (this.cdKey.length == 6) {
          let opt = {
            params: {
              activeCode: this.cdKey
            },
            callBack: (res) => {
              formatAppLog("log", "at pages/my/cdKey/cdKey.vue:47", "激活结果", res);
              uni.showToast({
                title: "激活成功！",
                icon: "success",
                duration: 1500
              });
              setTimeout(() => {
                uni.navigateTo({
                  url: "/pages/my/my"
                });
              }, 1500);
            }
          };
          this.$http("vipActive", opt);
        } else {
          uni.showToast({
            title: "激活码错误！",
            icon: "error"
          });
        }
      }
    }
  };
  function _sfc_render$q(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_vcode_input = resolveEasycom(vue.resolveDynamicComponent("vcode-input"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "cdKey" }, [
      vue.createElementVNode("view", { class: "cdKey_input" }, [
        vue.createVNode(_component_vcode_input, {
          ref: "VcodeInput",
          sum: 6,
          isBorderLine: false,
          borderColor: "#f7f7f7",
          borderValueColor: "#4674F6",
          borderActiveColor: "#F7F7F7",
          onVcodeInput: $options.vcodeInput
        }, null, 8, ["onVcodeInput"])
      ]),
      vue.createElementVNode("view", { class: "cdKey_btn" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.submit && $options.submit(...args))
        }, "确定")
      ]),
      vue.createElementVNode("view", { class: "cdKey_info" }, [
        vue.createElementVNode("view", { class: "title" }, " 激活码规则 "),
        vue.createElementVNode("view", { class: "text" }, " 1.仅供本人使用，有效期根据后台配置时间 。 "),
        vue.createElementVNode("view", { class: "text" }, " 2.仅供内部渠道学员使用。 ")
      ])
    ]);
  }
  const PagesMyCdKeyCdKey = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["render", _sfc_render$q], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/cdKey/cdKey.vue"]]);
  function obj2strClass(obj) {
    let classess = "";
    for (let key in obj) {
      const val = obj[key];
      if (val) {
        classess += `${key} `;
      }
    }
    return classess;
  }
  function obj2strStyle(obj) {
    let style = "";
    for (let key in obj) {
      const val = obj[key];
      style += `${key}:${val};`;
    }
    return style;
  }
  const _sfc_main$z = {
    name: "uni-easyinput",
    emits: [
      "click",
      "iconClick",
      "update:modelValue",
      "input",
      "focus",
      "blur",
      "confirm",
      "clear",
      "eyes",
      "change"
    ],
    model: {
      prop: "modelValue",
      event: "update:modelValue"
    },
    options: {
      virtualHost: true
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      },
      formItem: {
        from: "uniFormItem",
        default: null
      }
    },
    props: {
      name: String,
      value: [Number, String],
      modelValue: [Number, String],
      type: {
        type: String,
        default: "text"
      },
      clearable: {
        type: Boolean,
        default: true
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: " "
      },
      placeholderStyle: String,
      focus: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      confirmType: {
        type: String,
        default: "done"
      },
      clearSize: {
        type: [Number, String],
        default: 24
      },
      inputBorder: {
        type: Boolean,
        default: true
      },
      prefixIcon: {
        type: String,
        default: ""
      },
      suffixIcon: {
        type: String,
        default: ""
      },
      trim: {
        type: [Boolean, String],
        default: true
      },
      passwordIcon: {
        type: Boolean,
        default: true
      },
      primaryColor: {
        type: String,
        default: "#2979ff"
      },
      styles: {
        type: Object,
        default() {
          return {
            color: "#333",
            disableColor: "#F7F6F6",
            borderColor: "#e5e5e5"
          };
        }
      },
      errorMessage: {
        type: [String, Boolean],
        default: ""
      }
    },
    data() {
      return {
        focused: false,
        val: "",
        showMsg: "",
        border: false,
        isFirstBorder: false,
        showClearIcon: false,
        showPassword: false,
        focusShow: false,
        localMsg: ""
      };
    },
    computed: {
      // 输入框内是否有值
      isVal() {
        const val = this.val;
        if (val || val === 0) {
          return true;
        }
        return false;
      },
      msg() {
        return this.localMsg || this.errorMessage;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      // 处理外层样式的style
      boxStyle() {
        return `color:${this.inputBorder && this.msg ? "#e43d33" : this.styles.color};`;
      },
      // input 内容的类和样式处理
      inputContentClass() {
        return obj2strClass({
          "is-input-border": this.inputBorder,
          "is-input-error-border": this.inputBorder && this.msg,
          "is-textarea": this.type === "textarea",
          "is-disabled": this.disabled
        });
      },
      inputContentStyle() {
        const focusColor = this.focusShow ? this.primaryColor : this.styles.borderColor;
        const borderColor = this.inputBorder && this.msg ? "#dd524d" : focusColor;
        return obj2strStyle({
          "border-color": borderColor || "#e5e5e5",
          "background-color": this.disabled ? this.styles.disableColor : this.styles.backgroundColor
        });
      },
      // input右侧样式
      inputStyle() {
        const paddingRight = this.type === "password" || this.clearable || this.prefixIcon ? "" : "10px";
        return obj2strStyle({
          "padding-right": paddingRight,
          "padding-left": this.prefixIcon ? "" : "10px"
        });
      }
    },
    watch: {
      value(newVal) {
        this.val = newVal;
      },
      modelValue(newVal) {
        this.val = newVal;
      },
      focus(newVal) {
        this.$nextTick(() => {
          this.focused = this.focus;
          this.focusShow = this.focus;
        });
      }
    },
    created() {
      this.init();
      if (this.form && this.formItem) {
        this.$watch("formItem.errMsg", (newVal) => {
          this.localMsg = newVal;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focused = this.focus;
        this.focusShow = this.focus;
      });
    },
    methods: {
      /**
       * 初始化变量值
       */
      init() {
        if (this.value || this.value === 0) {
          this.val = this.value;
        } else if (this.modelValue || this.modelValue === 0) {
          this.val = this.modelValue;
        } else {
          this.val = null;
        }
      },
      /**
       * 点击图标时触发
       * @param {Object} type
       */
      onClickIcon(type) {
        this.$emit("iconClick", type);
      },
      /**
       * 显示隐藏内容，密码框时生效
       */
      onEyes() {
        this.showPassword = !this.showPassword;
        this.$emit("eyes", this.showPassword);
      },
      /**
       * 输入时触发
       * @param {Object} event
       */
      onInput(event) {
        let value = event.detail.value;
        if (this.trim) {
          if (typeof this.trim === "boolean" && this.trim) {
            value = this.trimStr(value);
          }
          if (typeof this.trim === "string") {
            value = this.trimStr(value, this.trim);
          }
        }
        if (this.errMsg)
          this.errMsg = "";
        this.val = value;
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
      },
      /**
       * 外部调用方法
       * 获取焦点时触发
       * @param {Object} event
       */
      onFocus() {
        this.$nextTick(() => {
          this.focused = true;
        });
        this.$emit("focus", null);
      },
      _Focus(event) {
        this.focusShow = true;
        this.$emit("focus", event);
      },
      /**
       * 外部调用方法
       * 失去焦点时触发
       * @param {Object} event
       */
      onBlur() {
        this.focused = false;
        this.$emit("focus", null);
      },
      _Blur(event) {
        event.detail.value;
        this.focusShow = false;
        this.$emit("blur", event);
        this.$emit("change", this.val);
        if (this.form && this.formItem) {
          const { validateTrigger } = this.form;
          if (validateTrigger === "blur") {
            this.formItem.onFieldChange();
          }
        }
      },
      /**
       * 按下键盘的发送键
       * @param {Object} e
       */
      onConfirm(e) {
        this.$emit("confirm", this.val);
        this.$emit("change", this.val);
      },
      /**
       * 清理内容
       * @param {Object} event
       */
      onClear(event) {
        this.val = "";
        this.$emit("input", "");
        this.$emit("update:modelValue", "");
        this.$emit("clear");
      },
      /**
       * 去除空格
       */
      trimStr(str, pos = "both") {
        if (pos === "both") {
          return str.trim();
        } else if (pos === "left") {
          return str.trimLeft();
        } else if (pos === "right") {
          return str.trimRight();
        } else if (pos === "start") {
          return str.trimStart();
        } else if (pos === "end") {
          return str.trimEnd();
        } else if (pos === "all") {
          return str.replace(/\s+/g, "");
        } else if (pos === "none") {
          return str;
        }
        return str;
      }
    }
  };
  function _sfc_render$p(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-easyinput", { "uni-easyinput-error": $options.msg }]),
        style: vue.normalizeStyle($options.boxStyle)
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-easyinput__content", $options.inputContentClass]),
            style: vue.normalizeStyle($options.inputContentStyle)
          },
          [
            vue.renderSlot(_ctx.$slots, "prefixIcon", {}, () => [
              $props.prefixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                key: 0,
                class: "content-clear-icon",
                type: $props.prefixIcon,
                color: "#c0c4cc",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.onClickIcon("prefix")),
                size: "22"
              }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
            ], true),
            $props.type === "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
              key: 0,
              class: vue.normalizeClass(["uni-easyinput__content-textarea", { "input-padding": $props.inputBorder }]),
              name: $props.name,
              value: $data.val,
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              disabled: $props.disabled,
              "placeholder-class": "uni-easyinput__placeholder-class",
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              autoHeight: $props.autoHeight,
              onInput: _cache[1] || (_cache[1] = (...args) => $options.onInput && $options.onInput(...args)),
              onBlur: _cache[2] || (_cache[2] = (...args) => $options._Blur && $options._Blur(...args)),
              onFocus: _cache[3] || (_cache[3] = (...args) => $options._Focus && $options._Focus(...args)),
              onConfirm: _cache[4] || (_cache[4] = (...args) => $options.onConfirm && $options.onConfirm(...args))
            }, null, 42, ["name", "value", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "autoHeight"])) : (vue.openBlock(), vue.createElementBlock("input", {
              key: 1,
              type: $props.type === "password" ? "text" : $props.type,
              class: "uni-easyinput__content-input",
              style: vue.normalizeStyle($options.inputStyle),
              name: $props.name,
              value: $data.val,
              password: !$data.showPassword && $props.type === "password",
              placeholder: $props.placeholder,
              placeholderStyle: $props.placeholderStyle,
              "placeholder-class": "uni-easyinput__placeholder-class",
              disabled: $props.disabled,
              maxlength: $options.inputMaxlength,
              focus: $data.focused,
              confirmType: $props.confirmType,
              onFocus: _cache[5] || (_cache[5] = (...args) => $options._Focus && $options._Focus(...args)),
              onBlur: _cache[6] || (_cache[6] = (...args) => $options._Blur && $options._Blur(...args)),
              onInput: _cache[7] || (_cache[7] = (...args) => $options.onInput && $options.onInput(...args)),
              onConfirm: _cache[8] || (_cache[8] = (...args) => $options.onConfirm && $options.onConfirm(...args))
            }, null, 44, ["type", "name", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType"])),
            $props.type === "password" && $props.passwordIcon ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              [
                vue.createCommentVNode(" 开启密码时显示小眼睛 "),
                $options.isVal ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: $data.showPassword ? "eye-slash-filled" : "eye-filled",
                  size: 22,
                  color: $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onEyes
                }, null, 8, ["class", "type", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : $props.suffixIcon || _ctx.$slots.suffixIcon ? vue.renderSlot(_ctx.$slots, "suffixIcon", { key: 3 }, () => [
              $props.suffixIcon ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                key: 0,
                class: "content-clear-icon",
                type: $props.suffixIcon,
                color: "#c0c4cc",
                onClick: _cache[9] || (_cache[9] = ($event) => $options.onClickIcon("suffix")),
                size: "22"
              }, null, 8, ["type"])) : vue.createCommentVNode("v-if", true)
            ], true) : (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 4 },
              [
                $props.clearable && $options.isVal && !$props.disabled && $props.type !== "textarea" ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 0,
                  class: vue.normalizeClass(["content-clear-icon", { "is-textarea-icon": $props.type === "textarea" }]),
                  type: "clear",
                  size: $props.clearSize,
                  color: $options.msg ? "#dd524d" : $data.focusShow ? $props.primaryColor : "#c0c4cc",
                  onClick: $options.onClear
                }, null, 8, ["class", "size", "color", "onClick"])) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )),
            vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["render", _sfc_render$p], ["__scopeId", "data-v-09fd5285"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.vue"]]);
  const _sfc_main$y = {
    name: "uniFormsItem",
    options: {
      virtualHost: true
    },
    provide() {
      return {
        uniFormItem: this
      };
    },
    inject: {
      form: {
        from: "uniForm",
        default: null
      }
    },
    props: {
      // 表单校验规则
      rules: {
        type: Array,
        default() {
          return null;
        }
      },
      // 表单域的属性名，在使用校验规则时必填
      name: {
        type: [String, Array],
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      // label的宽度 ，默认 80
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: ""
      },
      // 强制显示错误信息
      errorMessage: {
        type: [String, Boolean],
        default: ""
      },
      // 1.4.0 弃用，统一使用 form 的校验时机
      // validateTrigger: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 弃用，统一使用 form 的label 位置
      // labelPosition: {
      // 	type: String,
      // 	default: ''
      // },
      // 1.4.0 以下属性已经废弃，请使用  #label 插槽代替
      leftIcon: String,
      iconColor: {
        type: String,
        default: "#606266"
      }
    },
    data() {
      return {
        errMsg: "",
        isRequired: false,
        userRules: null,
        localLabelAlign: "left",
        localLabelWidth: "65px",
        localLabelPos: "left",
        border: false,
        isFirstBorder: false
      };
    },
    computed: {
      // 处理错误信息
      msg() {
        return this.errorMessage || this.errMsg;
      }
    },
    watch: {
      // 规则发生变化通知子组件更新
      "form.formRules"(val) {
        this.init();
      },
      "form.labelWidth"(val) {
        this.localLabelWidth = this._labelWidthUnit(val);
      },
      "form.labelPosition"(val) {
        this.localLabelPos = this._labelPosition();
      },
      "form.labelAlign"(val) {
      }
    },
    created() {
      this.init(true);
      if (this.name && this.form) {
        this.$watch(
          () => {
            const val = this.form._getDataValue(this.name, this.form.localData);
            return val;
          },
          (value, oldVal) => {
            const isEqual2 = this.form._isEqual(value, oldVal);
            if (!isEqual2) {
              const val = this.itemSetValue(value);
              this.onFieldChange(val, false);
            }
          },
          {
            immediate: false
          }
        );
      }
    },
    unmounted() {
      this.__isUnmounted = true;
      this.unInit();
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules = null) {
        this.userRules = rules;
        this.init(false);
      },
      // 兼容老版本表单组件
      setValue() {
      },
      /**
       * 外部调用方法
       * 校验数据
       * @param {any} value 需要校验的数据
       * @param {boolean} 是否立即校验
       * @return {Array|null} 校验内容
       */
      async onFieldChange(value, formtrigger = true) {
        const {
          formData,
          localData,
          errShowType,
          validateCheck,
          validateTrigger,
          _isRequiredField,
          _realName
        } = this.form;
        const name = _realName(this.name);
        if (!value) {
          value = this.form.formData[name];
        }
        const ruleLen = this.itemRules.rules && this.itemRules.rules.length;
        if (!this.validator || !ruleLen || ruleLen === 0)
          return;
        const isRequiredField2 = _isRequiredField(this.itemRules.rules || []);
        let result = null;
        if (validateTrigger === "bind" || formtrigger) {
          result = await this.validator.validateUpdate(
            {
              [name]: value
            },
            formData
          );
          if (!isRequiredField2 && (value === void 0 || value === "")) {
            result = null;
          }
          if (result && result.errorMessage) {
            if (errShowType === "undertext") {
              this.errMsg = !result ? "" : result.errorMessage;
            }
            if (errShowType === "toast") {
              uni.showToast({
                title: result.errorMessage || "校验错误",
                icon: "none"
              });
            }
            if (errShowType === "modal") {
              uni.showModal({
                title: "提示",
                content: result.errorMessage || "校验错误"
              });
            }
          } else {
            this.errMsg = "";
          }
          validateCheck(result ? result : null);
        } else {
          this.errMsg = "";
        }
        return result ? result : null;
      },
      /**
       * 初始组件数据
       */
      init(type = false) {
        const {
          validator,
          formRules,
          childrens,
          formData,
          localData,
          _realName,
          labelWidth,
          _getDataValue,
          _setDataValue
        } = this.form || {};
        this.localLabelAlign = this._justifyContent();
        this.localLabelWidth = this._labelWidthUnit(labelWidth);
        this.localLabelPos = this._labelPosition();
        this.isRequired = this.required;
        this.form && type && childrens.push(this);
        if (!validator || !formRules)
          return;
        if (!this.form.isFirstBorder) {
          this.form.isFirstBorder = true;
          this.isFirstBorder = true;
        }
        if (this.group) {
          if (!this.group.isFirstBorder) {
            this.group.isFirstBorder = true;
            this.isFirstBorder = true;
          }
        }
        this.border = this.form.border;
        const name = _realName(this.name);
        const itemRule = this.userRules || this.rules;
        if (typeof formRules === "object" && itemRule) {
          formRules[name] = {
            rules: itemRule
          };
          validator.updateSchema(formRules);
        }
        const itemRules = formRules[name] || {};
        this.itemRules = itemRules;
        this.validator = validator;
        this.itemSetValue(_getDataValue(this.name, localData));
        this.isRequired = this._isRequired();
      },
      unInit() {
        if (this.form) {
          const {
            childrens,
            formData,
            _realName
          } = this.form;
          childrens.forEach((item, index) => {
            if (item === this) {
              this.form.childrens.splice(index, 1);
              delete formData[_realName(item.name)];
            }
          });
        }
      },
      // 设置item 的值
      itemSetValue(value) {
        const name = this.form._realName(this.name);
        const rules = this.itemRules.rules || [];
        const val = this.form._getValue(name, value, rules);
        this.form._setDataValue(name, this.form.formData, val);
        return val;
      },
      /**
       * 移除该表单项的校验结果
       */
      clearValidate() {
        this.errMsg = "";
      },
      // 是否显示星号
      _isRequired() {
        return this.required;
      },
      // 处理对齐方式
      _justifyContent() {
        if (this.form) {
          const {
            labelAlign
          } = this.form;
          let labelAli = this.labelAlign ? this.labelAlign : labelAlign;
          if (labelAli === "left")
            return "flex-start";
          if (labelAli === "center")
            return "center";
          if (labelAli === "right")
            return "flex-end";
        }
        return "flex-start";
      },
      // 处理 label宽度单位 ,继承父元素的值
      _labelWidthUnit(labelWidth) {
        return this.num2px(this.labelWidth ? this.labelWidth : labelWidth || (this.label ? 65 : "auto"));
      },
      // 处理 label 位置
      _labelPosition() {
        if (this.form)
          return this.form.labelPosition || "left";
        return "left";
      },
      /**
       * 触发时机
       * @param {Object} rule 当前规则内时机
       * @param {Object} itemRlue 当前组件时机
       * @param {Object} parentRule 父组件时机
       */
      isTrigger(rule, itemRlue, parentRule) {
        if (rule === "submit" || !rule) {
          if (rule === void 0) {
            if (itemRlue !== "bind") {
              if (!itemRlue) {
                return parentRule === "" ? "bind" : "submit";
              }
              return "submit";
            }
            return "bind";
          }
          return "submit";
        }
        return "bind";
      },
      num2px(num) {
        if (typeof num === "number") {
          return `${num}px`;
        }
        return num;
      }
    }
  };
  function _sfc_render$o(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-forms-item", ["is-direction-" + $data.localLabelPos, $data.border ? "uni-forms-item--border" : "", $data.border && $data.isFirstBorder ? "is-first-border" : ""]])
      },
      [
        vue.renderSlot(_ctx.$slots, "label", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__label", { "no-label": !$props.label && !$data.isRequired }]),
              style: vue.normalizeStyle({ width: $data.localLabelWidth, justifyContent: $data.localLabelAlign })
            },
            [
              $data.isRequired ? (vue.openBlock(), vue.createElementBlock("text", {
                key: 0,
                class: "is-required"
              }, "*")) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($props.label),
                1
                /* TEXT */
              )
            ],
            6
            /* CLASS, STYLE */
          )
        ], true),
        vue.createElementVNode("view", { class: "uni-forms-item__content" }, [
          vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-forms-item__error", { "msg--active": $options.msg }])
            },
            [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString($options.msg),
                1
                /* TEXT */
              )
            ],
            2
            /* CLASS */
          )
        ])
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["render", _sfc_render$o], ["__scopeId", "data-v-462874dd"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);
  var pattern = {
    email: /^\S+?@\S+?\.\S+?$/,
    idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    )
  };
  const FORMAT_MAPPING = {
    "int": "integer",
    "bool": "boolean",
    "double": "number",
    "long": "number",
    "password": "string"
    // "fileurls": 'array'
  };
  function formatMessage(args, resources = "") {
    var defaultMessage = ["label"];
    defaultMessage.forEach((item) => {
      if (args[item] === void 0) {
        args[item] = "";
      }
    });
    let str = resources;
    for (let key in args) {
      let reg = new RegExp("{" + key + "}");
      str = str.replace(reg, args[key]);
    }
    return str;
  }
  function isEmptyValue(value, type) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (typeof value === "string" && !value) {
      return true;
    }
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    if (type === "object" && !Object.keys(value).length) {
      return true;
    }
    return false;
  }
  const types = {
    integer(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    string(value) {
      return typeof value === "string";
    },
    number(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof value === "number";
    },
    "boolean": function(value) {
      return typeof value === "boolean";
    },
    "float": function(value) {
      return types.number(value) && !types.integer(value);
    },
    array(value) {
      return Array.isArray(value);
    },
    object(value) {
      return typeof value === "object" && !types.array(value);
    },
    date(value) {
      return value instanceof Date;
    },
    timestamp(value) {
      if (!this.integer(value) || Math.abs(value).toString().length > 16) {
        return false;
      }
      return true;
    },
    file(value) {
      return typeof value.url === "string";
    },
    email(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    pattern(reg, value) {
      try {
        return new RegExp(reg).test(value);
      } catch (e) {
        return false;
      }
    },
    method(value) {
      return typeof value === "function";
    },
    idcard(value) {
      return typeof value === "string" && !!value.match(pattern.idcard);
    },
    "url-https"(value) {
      return this.url(value) && value.startsWith("https://");
    },
    "url-scheme"(value) {
      return value.startsWith("://");
    },
    "url-web"(value) {
      return false;
    }
  };
  class RuleValidator {
    constructor(message) {
      this._message = message;
    }
    async validateRule(fieldKey, fieldValue, value, data, allData) {
      var result = null;
      let rules = fieldValue.rules;
      let hasRequired = rules.findIndex((item) => {
        return item.required;
      });
      if (hasRequired < 0) {
        if (value === null || value === void 0) {
          return result;
        }
        if (typeof value === "string" && !value.length) {
          return result;
        }
      }
      var message = this._message;
      if (rules === void 0) {
        return message["default"];
      }
      for (var i2 = 0; i2 < rules.length; i2++) {
        let rule = rules[i2];
        let vt2 = this._getValidateType(rule);
        Object.assign(rule, {
          label: fieldValue.label || `["${fieldKey}"]`
        });
        if (RuleValidatorHelper[vt2]) {
          result = RuleValidatorHelper[vt2](rule, value, message);
          if (result != null) {
            break;
          }
        }
        if (rule.validateExpr) {
          let now2 = Date.now();
          let resultExpr = rule.validateExpr(value, allData, now2);
          if (resultExpr === false) {
            result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
            break;
          }
        }
        if (rule.validateFunction) {
          result = await this.validateFunction(rule, value, data, allData, vt2);
          if (result !== null) {
            break;
          }
        }
      }
      if (result !== null) {
        result = message.TAG + result;
      }
      return result;
    }
    async validateFunction(rule, value, data, allData, vt2) {
      let result = null;
      try {
        let callbackMessage = null;
        const res = await rule.validateFunction(rule, value, allData || data, (message) => {
          callbackMessage = message;
        });
        if (callbackMessage || typeof res === "string" && res || res === false) {
          result = this._getMessage(rule, callbackMessage || res, vt2);
        }
      } catch (e) {
        result = this._getMessage(rule, e.message, vt2);
      }
      return result;
    }
    _getMessage(rule, message, vt2) {
      return formatMessage(rule, message || rule.errorMessage || this._message[vt2] || message["default"]);
    }
    _getValidateType(rule) {
      var result = "";
      if (rule.required) {
        result = "required";
      } else if (rule.format) {
        result = "format";
      } else if (rule.arrayType) {
        result = "arrayTypeFormat";
      } else if (rule.range) {
        result = "range";
      } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
        result = "rangeNumber";
      } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
        result = "rangeLength";
      } else if (rule.pattern) {
        result = "pattern";
      } else if (rule.validateFunction) {
        result = "validateFunction";
      }
      return result;
    }
  }
  const RuleValidatorHelper = {
    required(rule, value, message) {
      if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
        return formatMessage(rule, rule.errorMessage || message.required);
      }
      return null;
    },
    range(rule, value, message) {
      const {
        range,
        errorMessage
      } = rule;
      let list = new Array(range.length);
      for (let i2 = 0; i2 < range.length; i2++) {
        const item = range[i2];
        if (types.object(item) && item.value !== void 0) {
          list[i2] = item.value;
        } else {
          list[i2] = item;
        }
      }
      let result = false;
      if (Array.isArray(value)) {
        result = new Set(value.concat(list)).size === list.length;
      } else {
        if (list.indexOf(value) > -1) {
          result = true;
        }
      }
      if (!result) {
        return formatMessage(rule, errorMessage || message["enum"]);
      }
      return null;
    },
    rangeNumber(rule, value, message) {
      if (!types.number(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let {
        minimum,
        maximum,
        exclusiveMinimum,
        exclusiveMaximum
      } = rule;
      let min = exclusiveMinimum ? value <= minimum : value < minimum;
      let max2 = exclusiveMaximum ? value >= maximum : value > maximum;
      if (minimum !== void 0 && min) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
      } else if (maximum !== void 0 && max2) {
        return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
      } else if (minimum !== void 0 && maximum !== void 0 && (min || max2)) {
        return formatMessage(rule, rule.errorMessage || message["number"].range);
      }
      return null;
    },
    rangeLength(rule, value, message) {
      if (!types.string(value) && !types.array(value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      let min = rule.minLength;
      let max2 = rule.maxLength;
      let val = value.length;
      if (min !== void 0 && val < min) {
        return formatMessage(rule, rule.errorMessage || message["length"].minLength);
      } else if (max2 !== void 0 && val > max2) {
        return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
      } else if (min !== void 0 && max2 !== void 0 && (val < min || val > max2)) {
        return formatMessage(rule, rule.errorMessage || message["length"].range);
      }
      return null;
    },
    pattern(rule, value, message) {
      if (!types["pattern"](rule.pattern, value)) {
        return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
      }
      return null;
    },
    format(rule, value, message) {
      var customTypes = Object.keys(types);
      var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
      if (customTypes.indexOf(format) > -1) {
        if (!types[format](value)) {
          return formatMessage(rule, rule.errorMessage || message.typeError);
        }
      }
      return null;
    },
    arrayTypeFormat(rule, value, message) {
      if (!Array.isArray(value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
      for (let i2 = 0; i2 < value.length; i2++) {
        const element = value[i2];
        let formatResult = this.format(rule, element, message);
        if (formatResult !== null) {
          return formatResult;
        }
      }
      return null;
    }
  };
  class SchemaValidator extends RuleValidator {
    constructor(schema, options) {
      super(SchemaValidator.message);
      this._schema = schema;
      this._options = options || null;
    }
    updateSchema(schema) {
      this._schema = schema;
    }
    async validate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async validateAll(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidate(data, true, allData);
      }
      return result;
    }
    async validateUpdate(data, allData) {
      let result = this._checkFieldInSchema(data);
      if (!result) {
        result = await this.invokeValidateUpdate(data, false, allData);
      }
      return result.length ? result[0] : null;
    }
    async invokeValidate(data, all, allData) {
      let result = [];
      let schema = this._schema;
      for (let key in schema) {
        let value = schema[key];
        let errorMessage = await this.validateRule(key, value, data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    async invokeValidateUpdate(data, all, allData) {
      let result = [];
      for (let key in data) {
        let errorMessage = await this.validateRule(key, this._schema[key], data[key], data, allData);
        if (errorMessage != null) {
          result.push({
            key,
            errorMessage
          });
          if (!all)
            break;
        }
      }
      return result;
    }
    _checkFieldInSchema(data) {
      var keys = Object.keys(data);
      var keys2 = Object.keys(this._schema);
      if (new Set(keys.concat(keys2)).size === keys2.length) {
        return "";
      }
      var noExistFields = keys.filter((key) => {
        return keys2.indexOf(key) < 0;
      });
      var errorMessage = formatMessage({
        field: JSON.stringify(noExistFields)
      }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
      return [{
        key: "invalid",
        errorMessage
      }];
    }
  }
  function Message() {
    return {
      TAG: "",
      default: "验证错误",
      defaultInvalid: "提交的字段{field}在数据库中并不存在",
      validateFunction: "验证无效",
      required: "{label}必填",
      "enum": "{label}超出范围",
      timestamp: "{label}格式无效",
      whitespace: "{label}不能为空",
      typeError: "{label}类型无效",
      date: {
        format: "{label}日期{value}格式无效",
        parse: "{label}日期无法解析,{value}无效",
        invalid: "{label}日期{value}无效"
      },
      length: {
        minLength: "{label}长度不能少于{minLength}",
        maxLength: "{label}长度不能超过{maxLength}",
        range: "{label}必须介于{minLength}和{maxLength}之间"
      },
      number: {
        minimum: "{label}不能小于{minimum}",
        maximum: "{label}不能大于{maximum}",
        exclusiveMinimum: "{label}不能小于等于{minimum}",
        exclusiveMaximum: "{label}不能大于等于{maximum}",
        range: "{label}必须介于{minimum}and{maximum}之间"
      },
      pattern: {
        mismatch: "{label}格式不匹配"
      }
    };
  }
  SchemaValidator.message = new Message();
  const deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val));
  };
  const typeFilter = (format) => {
    return format === "int" || format === "double" || format === "number" || format === "timestamp";
  };
  const getValue = (key, value, rules) => {
    const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
    const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
    if (!!isRuleNumType) {
      if (!value && value !== 0) {
        value = null;
      } else {
        value = isNumber(Number(value)) ? Number(value) : value;
      }
    }
    if (!!isRuleBoolType) {
      value = isBoolean(value) ? value : false;
    }
    return value;
  };
  const setDataValue = (field, formdata, value) => {
    formdata[field] = value;
    return value || "";
  };
  const getDataValue = (field, data) => {
    return objGet(data, field);
  };
  const realName = (name, data = {}) => {
    const base_name = _basePath(name);
    if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
      const realname = base_name.reduce((a2, b) => a2 += `#${b}`, "_formdata_");
      return realname;
    }
    return base_name[0] || name;
  };
  const isRealName = (name) => {
    const reg = /^_formdata_#*/;
    return reg.test(name);
  };
  const rawData = (object = {}, name) => {
    let newData = JSON.parse(JSON.stringify(object));
    let formData = {};
    for (let i2 in newData) {
      let path = name2arr(i2);
      objSet(formData, path, newData[i2]);
    }
    return formData;
  };
  const name2arr = (name) => {
    let field = name.replace("_formdata_#", "");
    field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
    return field;
  };
  const objSet = (object, path, value) => {
    if (typeof object !== "object")
      return object;
    _basePath(path).reduce((o2, k2, i2, _2) => {
      if (i2 === _2.length - 1) {
        o2[k2] = value;
        return null;
      } else if (k2 in o2) {
        return o2[k2];
      } else {
        o2[k2] = /^[0-9]{1,}$/.test(_2[i2 + 1]) ? [] : {};
        return o2[k2];
      }
    }, object);
    return object;
  };
  function _basePath(path) {
    if (Array.isArray(path))
      return path;
    return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
  }
  const objGet = (object, path, defaultVal = "undefined") => {
    let newPath = _basePath(path);
    let val = newPath.reduce((o2, k2) => {
      return (o2 || {})[k2];
    }, object);
    return !val || val !== void 0 ? val : defaultVal;
  };
  const isNumber = (num) => {
    return !isNaN(Number(num));
  };
  const isBoolean = (bool) => {
    return typeof bool === "boolean";
  };
  const isRequiredField = (rules) => {
    let isNoField = false;
    for (let i2 = 0; i2 < rules.length; i2++) {
      const ruleData = rules[i2];
      if (ruleData.required) {
        isNoField = true;
        break;
      }
    }
    return isNoField;
  };
  const isEqual = (a2, b) => {
    if (a2 === b) {
      return a2 !== 0 || 1 / a2 === 1 / b;
    }
    if (a2 == null || b == null) {
      return a2 === b;
    }
    var classNameA = toString.call(a2), classNameB = toString.call(b);
    if (classNameA !== classNameB) {
      return false;
    }
    switch (classNameA) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a2 === "" + b;
      case "[object Number]":
        if (+a2 !== +a2) {
          return +b !== +b;
        }
        return +a2 === 0 ? 1 / +a2 === 1 / b : +a2 === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a2 === +b;
    }
    if (classNameA == "[object Object]") {
      var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b);
      if (propsA.length != propsB.length) {
        return false;
      }
      for (var i2 = 0; i2 < propsA.length; i2++) {
        var propName = propsA[i2];
        if (a2[propName] !== b[propName]) {
          return false;
        }
      }
      return true;
    }
    if (classNameA == "[object Array]") {
      if (a2.toString() == b.toString()) {
        return true;
      }
      return false;
    }
  };
  const _sfc_main$x = {
    name: "uniForms",
    emits: ["validate", "submit"],
    options: {
      virtualHost: true
    },
    props: {
      // 即将弃用
      value: {
        type: Object,
        default() {
          return null;
        }
      },
      // vue3 替换 value 属性
      modelValue: {
        type: Object,
        default() {
          return null;
        }
      },
      // 1.4.0 开始将不支持 v-model ，且废弃 value 和 modelValue
      model: {
        type: Object,
        default() {
          return null;
        }
      },
      // 表单校验规则
      rules: {
        type: Object,
        default() {
          return {};
        }
      },
      //校验错误信息提示方式 默认 undertext 取值 [undertext|toast|modal]
      errShowType: {
        type: String,
        default: "undertext"
      },
      // 校验触发器方式 默认 bind 取值 [bind|submit]
      validateTrigger: {
        type: String,
        default: "submit"
      },
      // label 位置，默认 left 取值  top/left
      labelPosition: {
        type: String,
        default: "left"
      },
      // label 宽度
      labelWidth: {
        type: [String, Number],
        default: ""
      },
      // label 居中方式，默认 left 取值 left/center/right
      labelAlign: {
        type: String,
        default: "left"
      },
      border: {
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        uniForm: this
      };
    },
    data() {
      return {
        // 表单本地值的记录，不应该与传如的值进行关联
        formData: {},
        formRules: {}
      };
    },
    computed: {
      // 计算数据源变化的
      localData() {
        const localVal = this.model || this.modelValue || this.value;
        if (localVal) {
          return deepCopy(localVal);
        }
        return {};
      }
    },
    watch: {
      // 监听数据变化 ,暂时不使用，需要单独赋值
      // localData: {},
      // 监听规则变化
      rules: {
        handler: function(val, oldVal) {
          this.setRules(val);
        },
        deep: true,
        immediate: true
      }
    },
    created() {
      let getbinddata = getApp().$vm.$.appContext.config.globalProperties.binddata;
      if (!getbinddata) {
        getApp().$vm.$.appContext.config.globalProperties.binddata = function(name, value, formName) {
          if (formName) {
            this.$refs[formName].setValue(name, value);
          } else {
            let formVm;
            for (let i2 in this.$refs) {
              const vm = this.$refs[i2];
              if (vm && vm.$options && vm.$options.name === "uniForms") {
                formVm = vm;
                break;
              }
            }
            if (!formVm)
              return formatAppLog("error", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:182", "当前 uni-froms 组件缺少 ref 属性");
            formVm.setValue(name, value);
          }
        };
      }
      this.childrens = [];
      this.inputChildrens = [];
      this.setRules(this.rules);
    },
    methods: {
      /**
       * 外部调用方法
       * 设置规则 ，主要用于小程序自定义检验规则
       * @param {Array} rules 规则源数据
       */
      setRules(rules) {
        this.formRules = Object.assign({}, this.formRules, rules);
        this.validator = new SchemaValidator(rules);
      },
      /**
       * 外部调用方法
       * 设置数据，用于设置表单数据，公开给用户使用 ， 不支持在动态表单中使用
       * @param {Object} key
       * @param {Object} value
       */
      setValue(key, value) {
        let example = this.childrens.find((child) => child.name === key);
        if (!example)
          return null;
        this.formData[key] = getValue(key, value, this.formRules[key] && this.formRules[key].rules || []);
        return example.onFieldChange(this.formData[key]);
      },
      /**
       * 外部调用方法
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      validate(keepitem, callback) {
        return this.checkAll(this.formData, keepitem, callback);
      },
      /**
       * 外部调用方法
       * 部分表单校验
       * @param {Array|String} props 需要校验的字段
       * @param {Function} 回调函数
       */
      validateField(props = [], callback) {
        props = [].concat(props);
        let invalidFields = {};
        this.childrens.forEach((item) => {
          const name = realName(item.name);
          if (props.indexOf(name) !== -1) {
            invalidFields = Object.assign({}, invalidFields, {
              [name]: this.formData[name]
            });
          }
        });
        return this.checkAll(invalidFields, [], callback);
      },
      /**
       * 外部调用方法
       * 移除表单项的校验结果。传入待移除的表单项的 prop 属性或者 prop 组成的数组，如不传则移除整个表单的校验结果
       * @param {Array|String} props 需要移除校验的字段 ，不填为所有
       */
      clearValidate(props = []) {
        props = [].concat(props);
        this.childrens.forEach((item) => {
          if (props.length === 0) {
            item.errMsg = "";
          } else {
            const name = realName(item.name);
            if (props.indexOf(name) !== -1) {
              item.errMsg = "";
            }
          }
        });
      },
      /**
       * 外部调用方法 ，即将废弃
       * 手动提交校验表单
       * 对整个表单进行校验的方法，参数为一个回调函数。
       * @param {Array} keepitem 保留不参与校验的字段
       * @param {type} callback 方法回调
       */
      submit(keepitem, callback, type) {
        for (let i2 in this.dataValue) {
          const itemData = this.childrens.find((v2) => v2.name === i2);
          if (itemData) {
            if (this.formData[i2] === void 0) {
              this.formData[i2] = this._getValue(i2, this.dataValue[i2]);
            }
          }
        }
        if (!type) {
          formatAppLog("warn", "at uni_modules/uni-forms/components/uni-forms/uni-forms.vue:289", "submit 方法即将废弃，请使用validate方法代替！");
        }
        return this.checkAll(this.formData, keepitem, callback, "submit");
      },
      // 校验所有
      async checkAll(invalidFields, keepitem, callback, type) {
        if (!this.validator)
          return;
        let childrens = [];
        for (let i2 in invalidFields) {
          const item = this.childrens.find((v2) => realName(v2.name) === i2);
          if (item) {
            childrens.push(item);
          }
        }
        if (!callback && typeof keepitem === "function") {
          callback = keepitem;
        }
        let promise;
        if (!callback && typeof callback !== "function" && Promise) {
          promise = new Promise((resolve, reject) => {
            callback = function(valid, invalidFields2) {
              !valid ? resolve(invalidFields2) : reject(valid);
            };
          });
        }
        let results = [];
        let tempFormData = JSON.parse(JSON.stringify(invalidFields));
        for (let i2 in childrens) {
          const child = childrens[i2];
          let name = realName(child.name);
          const result = await child.onFieldChange(tempFormData[name]);
          if (result) {
            results.push(result);
            if (this.errShowType === "toast" || this.errShowType === "modal")
              break;
          }
        }
        if (Array.isArray(results)) {
          if (results.length === 0)
            results = null;
        }
        if (Array.isArray(keepitem)) {
          keepitem.forEach((v2) => {
            let vName = realName(v2);
            let value = getDataValue(v2, this.localData);
            if (value !== void 0) {
              tempFormData[vName] = value;
            }
          });
        }
        if (type === "submit") {
          this.$emit("submit", {
            detail: {
              value: tempFormData,
              errors: results
            }
          });
        } else {
          this.$emit("validate", results);
        }
        let resetFormData = {};
        resetFormData = rawData(tempFormData, this.name);
        callback && typeof callback === "function" && callback(results, resetFormData);
        if (promise && callback) {
          return promise;
        } else {
          return null;
        }
      },
      /**
       * 返回validate事件
       * @param {Object} result
       */
      validateCheck(result) {
        this.$emit("validate", result);
      },
      _getValue: getValue,
      _isRequiredField: isRequiredField,
      _setDataValue: setDataValue,
      _getDataValue: getDataValue,
      _realName: realName,
      _isRealName: isRealName,
      _isEqual: isEqual
    }
  };
  function _sfc_render$n(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-forms" }, [
      vue.createElementVNode("form", null, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const __easycom_5 = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["render", _sfc_render$n], ["__scopeId", "data-v-9a1e3c32"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);
  const getNavBarHieht = () => {
    const {
      statusBarHeight,
      platform
    } = uni.getSystemInfoSync();
    const {
      top,
      height
    } = uni.getMenuButtonBoundingClientRect();
    formatAppLog("log", "at utils/util.js:22", "statusBarHeight", statusBarHeight, height);
    wx.setStorageSync("statusBarHeight", statusBarHeight);
    wx.setStorageSync("menuButtonHeight", height ? height : 32);
    if (top && top !== 0 && height && height !== 0) {
      const navigationBarHeight = (top - statusBarHeight) * 2 + height;
      wx.setStorageSync("navigationBarHeight", navigationBarHeight);
    } else {
      wx.setStorageSync(
        "navigationBarHeight",
        platform === "android" ? 48 : 40
      );
    }
  };
  function checkPhoneNumber(phoneNumber) {
    var regexp = /^[1]([3-9])[0-9]{9}$/;
    return regexp.test(phoneNumber);
  }
  const _sfc_main$w = {
    data() {
      let validatePass2 = (rule, value, data, callback) => {
        if (value === "") {
          callback("请再次输入密码");
        } else if (value !== this.formData.password) {
          callback("两次输入密码不一致!");
          this.$refs.form.validateField("password");
        }
      };
      return {
        isChecked: true,
        userPhone: "158*****8022",
        loginType: 1,
        // 1默认登陆  2 手机号登陆 3 找回密码 4重置密码
        buttonText: "立即注册",
        disabledCode: false,
        codeText: "获取验证码",
        styles: {
          width: "70%!important"
        },
        formData: {
          phone: "",
          code: "",
          password: "",
          repassword: ""
        },
        rules: {
          // 对name字段进行必填验证
          phone: {
            rules: [
              {
                required: true,
                errorMessage: "手机号必填"
              },
              {
                validateFunction: function(rule, value, data, callback) {
                  if (value.length < 11) {
                    callback("请输入11位手机号");
                  } else if (!checkPhoneNumber(value)) {
                    callback("手机号格式不正确");
                  }
                  return true;
                }
              }
            ]
          },
          // 对email字段进行必填验证
          password: {
            rules: [{
              required: true,
              errorMessage: "请输入密码"
            }, {
              trigger: "blur",
              validateFunction: function(rule, value, callback) {
                if (value === "") {
                  callback(new Error("请输入密码"));
                }
              }
            }]
          },
          repassword: {
            rules: [{
              required: true,
              errorMessage: "确认密码不能为空"
            }, {
              trigger: "blur",
              validateFunction: validatePass2
            }]
          },
          code: {
            rules: [{
              require: true,
              errorMessage: "验证码不能为空"
            }, {
              validateFunction: function(rule, value, data, callback) {
                if (value.length < 4) {
                  callback("验证码为四位数字");
                }
              }
            }]
          }
        }
      };
    },
    onReady() {
    },
    onLoad() {
      formatAppLog("log", "at pages/login/login.vue:223", "onLoad");
      let params = {
        callBack: (res) => {
          formatAppLog("log", "at pages/login/login.vue:226", "回调函数", res);
          wechat.wxLogin(params);
        }
      };
      getNavBarHieht();
      wechat.wxLogin(params);
    },
    mounted() {
    },
    methods: {
      getPhoneNumber(e) {
        formatAppLog("log", "at pages/login/login.vue:238", e, "eeeeee");
        wechat.getUserPhone(e.detail);
      },
      // getPhoneNumber(e){
      //   __f__('log','at pages/login/login.vue:242','eeee',e.detail.code)
      // },
      bindGetUserInfo(e) {
        formatAppLog("log", "at pages/login/login.vue:245", e, "获取用户信息");
      },
      loginPhoneClick() {
        this.loginType = 2;
      },
      checkedRadio() {
        formatAppLog("log", "at pages/login/login.vue:271", "123");
        this.isChecked = !this.isChecked;
      },
      formSubmit(form) {
        this.$refs.form.validate().then((res) => {
          formatAppLog("log", "at pages/login/login.vue:276", "表单数据信息：", res);
        }).catch((err) => {
          formatAppLog("log", "at pages/login/login.vue:278", "表单错误信息：", err);
        });
      },
      formReset() {
      },
      onSendCode() {
        formatAppLog("log", "at pages/login/login.vue:285", "time");
        this.$refs.form.validateField("phone").then((res) => {
          formatAppLog("log", "at pages/login/login.vue:287", res, "手机号校验");
          let that = this;
          let time = 60;
          that.getPhoneCode();
          let timer = setInterval(function() {
            this.disabledCode = true;
            if (time === 0) {
              that.disabledCode = false;
              clearInterval(timer);
              that.codeText = "发送验证码";
              time = 60;
            } else {
              that.codeText = `${time}秒后重发`;
              time--;
            }
          }, 1e3);
        }).catch((err) => {
          formatAppLog("log", "at pages/login/login.vue:304", "手机号必填", err);
        });
      },
      getPhoneCode() {
        let opt = {
          params: {
            phone: this.formData.phone
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/login/login.vue:313", res, "getPhoneCode");
            uni.showToast({
              title: "验证码发送成功"
            });
          }
        };
        this.$http("getPhoneCode", opt);
      },
      region() {
        formatAppLog("log", "at pages/login/login.vue:322", "this.buttonText", this.buttonText);
        this.loginType = this.loginType === 2 ? 3 : 2;
        this.buttonText = this.loginType === 2 ? "立即注册" : "返回登陆";
        formatAppLog("log", "at pages/login/login.vue:325", "立即注册");
      },
      forget() {
        this.loginType = 4;
        this.buttonText = "返回登陆";
        formatAppLog("log", "at pages/login/login.vue:330", "忘记密码");
      }
    }
  };
  function _sfc_render$m(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_3);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "head" }, [
        $data.loginType === 4 ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "img-head"
        }, [
          vue.createElementVNode("text", { style: { "font-size": "24px", "font-weight": "600" } }, "重置密码")
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "img-head"
        }, [
          vue.createElementVNode("img", {
            class: "avatar-img",
            src: "/static/my/logo.png",
            alt: ""
          })
        ])),
        vue.createElementVNode("view", { style: { "font-size": "14px", "margin": "20px 0 40px 0" } }, "快乐学习，轻松上岸"),
        vue.createElementVNode("view", { style: { "disply": "flex", "justify-content": "center" } }, [
          $data.loginType === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-padding-wrap uni-common-mt"
          }, [
            vue.createCommentVNode(' <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">唤起授权手机号</button> '),
            vue.createElementVNode(
              "button",
              {
                type: "primary",
                width: "100%",
                "open-type": "getPhoneNumber",
                onGetphonenumber: _cache[0] || (_cache[0] = (...args) => $options.getPhoneNumber && $options.getPhoneNumber(...args)),
                class: "btn-empower"
              },
              "微信号一键登陆",
              32
              /* HYDRATE_EVENTS */
            )
          ])) : vue.createCommentVNode("v-if", true),
          vue.createVNode(_component_uni_forms, {
            ref: "form",
            border: false,
            rules: $data.rules,
            model: $data.formData,
            "label-position": "left",
            style: { "padding": "0 10px" }
          }, {
            default: vue.withCtx(() => [
              $data.loginType === 2 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 0,
                name: "phone"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    class: "login-input",
                    trim: "all",
                    maxlength: "11",
                    type: "number",
                    modelValue: $data.formData.phone,
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.phone = $event),
                    placeholder: "请输入手机号"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              $data.loginType === 2 || $data.loginType === 3 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 1,
                class: "login-code",
                name: "code"
              }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("view", { style: { "display": "flex!important" } }, [
                    vue.createElementVNode("view", { style: { "width": "calc(100vw - 90px)" } }, [
                      vue.createVNode(_component_uni_easyinput, {
                        styles: $data.styles,
                        maxlength: "6",
                        type: "number",
                        modelValue: $data.formData.code,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.code = $event),
                        placeholder: "请输入验证码"
                      }, null, 8, ["styles", "modelValue"])
                    ]),
                    vue.createElementVNode("view", {
                      class: vue.normalizeClass([$data.disabledCode == true ? "code_text_tap" : "code_text"]),
                      onClick: _cache[3] || (_cache[3] = (...args) => $options.onSendCode && $options.onSendCode(...args)),
                      disabled: $data.disabledCode
                    }, vue.toDisplayString($data.codeText), 11, ["disabled"])
                  ])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              $data.loginType === 3 || $data.loginType === 4 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 2,
                trim: "all",
                name: "password"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    class: "login-input",
                    type: "password",
                    modelValue: $data.formData.password,
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.password = $event),
                    placeholder: "请输入密码"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              $data.loginType === 4 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, {
                key: 3,
                trim: "all",
                name: "repassword"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_easyinput, {
                    class: "login-input",
                    type: "password",
                    modelValue: $data.formData.repassword,
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.repassword = $event),
                    placeholder: "请再次输入新密码"
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
                /* STABLE */
              })) : vue.createCommentVNode("v-if", true),
              $data.loginType !== 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 4,
                class: "botton-text",
                style: { "padding": "0 10px" }
              }, [
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", { class: "text1" }, "没有账号, "),
                  vue.createElementVNode(
                    "text",
                    {
                      class: "text2",
                      onClick: _cache[6] || (_cache[6] = (...args) => $options.region && $options.region(...args))
                    },
                    vue.toDisplayString($data.buttonText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", null, [
                  vue.createElementVNode("text", {
                    class: "text3",
                    onClick: _cache[7] || (_cache[7] = (...args) => $options.forget && $options.forget(...args))
                  }, "忘记密码?")
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { style: { "margin-top": "20px" } }, [
                $data.loginType !== 1 ? (vue.openBlock(), vue.createBlock(_component_uni_forms_item, { key: 0 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode(
                      "button",
                      {
                        class: "button login-btn",
                        type: "primary",
                        onClick: _cache[8] || (_cache[8] = (...args) => $options.formSubmit && $options.formSubmit(...args))
                      },
                      vue.toDisplayString($data.loginType === 3 ? "注册" : "登陆"),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })) : vue.createCommentVNode("v-if", true)
              ]),
              vue.createElementVNode("view", { class: "uni-padding-wrap" }, [
                vue.createElementVNode("label", {
                  class: "radio",
                  style: { "display": "flex", "margin-top": "5px" }
                }, [
                  vue.createElementVNode("radio", {
                    value: "r1",
                    checked: $data.isChecked,
                    onChange: _cache[9] || (_cache[9] = (...args) => $options.checkedRadio && $options.checkedRadio(...args)),
                    style: { "transform": "scale(0.7)", "color": "#4674f6" }
                  }, null, 40, ["checked"]),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode("text", null, "若手机号未注册将进入注册流程，注册即视为同意"),
                    vue.createElementVNode("text", { style: { "color": "#4674f6" } }, "《服务条款》"),
                    vue.createTextVNode("和 "),
                    vue.createElementVNode("text", { style: { "color": "#4674f6" } }, "《隐私策略》")
                  ])
                ])
              ]),
              vue.createElementVNode("view", { style: { "display": "flex", "justify-content": "center" } }, [
                vue.createElementVNode("view", { class: "other-login" }, [
                  vue.createElementVNode("view", { class: "other-text" }, [
                    vue.createElementVNode("view", {
                      class: "text",
                      style: { "font-size": "12px", "color": "#cbcbcb" }
                    }, "其他登陆方式")
                  ]),
                  vue.createElementVNode("view", {
                    class: "icon-type",
                    style: { "justify-content": "center" }
                  }, [
                    $data.loginType !== 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      onClick: _cache[10] || (_cache[10] = (...args) => _ctx.loginIconClick && _ctx.loginIconClick(...args)),
                      class: "icon-text"
                    }, [
                      vue.createElementVNode("img", {
                        class: "login-type",
                        src: "/static/login/weixin.png",
                        alt: ""
                      }),
                      vue.createElementVNode("text", null, "微信")
                    ])) : vue.createCommentVNode("v-if", true),
                    $data.loginType === 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      onClick: _cache[11] || (_cache[11] = (...args) => $options.loginPhoneClick && $options.loginPhoneClick(...args)),
                      class: "icon-text"
                    }, [
                      vue.createElementVNode("img", {
                        class: "login-type",
                        src: "/static/login/phone.png",
                        alt: ""
                      }),
                      vue.createElementVNode("text", null, "手机")
                    ])) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ])
            ]),
            _: 1
            /* STABLE */
          }, 8, ["rules", "model"]),
          vue.createCommentVNode(' 	<view class="other-login" style="display: flex;justify-content: center;">\r\n					<view style="display: flex;justify-content: center;">\r\n						<view class="other-login">\r\n							<view class="other-text">\r\n								<view class="text" style="font-size: 12px;color: #cbcbcb;">其他登陆方式</view>\r\n							</view>\r\n							\r\n							<view class="icon-type" style="justify-content: center;">\r\n								<view @click="loginPhoneClick" class="icon-text">\r\n									<img class="login-type" src="../../static/login/phone.png" alt="">\r\n									<text>手机</text>\r\n								</view>\r\n								<view @click="loginIconClick" class="icon-text">\r\n									<img class="login-type" src="../../static/login/weixin.png" alt="">\r\n									<text>微信</text>\r\n								</view>\r\n							</view>\r\n						</view>\r\n					</view>\r\n				</view> ')
        ])
      ]),
      vue.createElementVNode("view", { style: { "padding": "0 20px" } })
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["render", _sfc_render$m], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/login/login.vue"]]);
  const en = {
    "uni-countdown.day": "day",
    "uni-countdown.h": "h",
    "uni-countdown.m": "m",
    "uni-countdown.s": "s"
  };
  const zhHans = {
    "uni-countdown.day": "天",
    "uni-countdown.h": "时",
    "uni-countdown.m": "分",
    "uni-countdown.s": "秒"
  };
  const zhHant = {
    "uni-countdown.day": "天",
    "uni-countdown.h": "時",
    "uni-countdown.m": "分",
    "uni-countdown.s": "秒"
  };
  const messages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const {
    t: t$2
  } = initVueI18n(messages);
  const _sfc_main$v = {
    name: "UniCountdown",
    emits: ["timeup"],
    props: {
      showDay: {
        type: Boolean,
        default: true
      },
      showColon: {
        type: Boolean,
        default: true
      },
      start: {
        type: Boolean,
        default: true
      },
      backgroundColor: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333"
      },
      fontSize: {
        type: Number,
        default: 14
      },
      splitorColor: {
        type: String,
        default: "#333"
      },
      day: {
        type: Number,
        default: 0
      },
      hour: {
        type: Number,
        default: 0
      },
      minute: {
        type: Number,
        default: 0
      },
      second: {
        type: Number,
        default: 0
      },
      timestamp: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        timer: null,
        syncFlag: false,
        d: "00",
        h: "00",
        i: "00",
        s: "00",
        leftTime: 0,
        seconds: 0
      };
    },
    computed: {
      dayText() {
        return t$2("uni-countdown.day");
      },
      hourText(val) {
        return t$2("uni-countdown.h");
      },
      minuteText(val) {
        return t$2("uni-countdown.m");
      },
      secondText(val) {
        return t$2("uni-countdown.s");
      },
      timeStyle() {
        const {
          color,
          backgroundColor,
          fontSize
        } = this;
        return {
          color,
          backgroundColor,
          fontSize: `${fontSize}px`,
          width: `${fontSize * 22 / 14}px`,
          // 按字体大小为 14px 时的比例缩放
          lineHeight: `${fontSize * 20 / 14}px`,
          borderRadius: `${fontSize * 3 / 14}px`
        };
      },
      splitorStyle() {
        const { splitorColor, fontSize, backgroundColor } = this;
        return {
          color: splitorColor,
          fontSize: `${fontSize * 12 / 14}px`,
          margin: backgroundColor ? `${fontSize * 4 / 14}px` : ""
        };
      }
    },
    watch: {
      day(val) {
        this.changeFlag();
      },
      hour(val) {
        this.changeFlag();
      },
      minute(val) {
        this.changeFlag();
      },
      second(val) {
        this.changeFlag();
      },
      start: {
        immediate: true,
        handler(newVal, oldVal) {
          if (newVal) {
            this.startData();
          } else {
            if (!oldVal)
              return;
            clearInterval(this.timer);
          }
        }
      }
    },
    created: function(e) {
      this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
      this.countDown();
    },
    unmounted() {
      clearInterval(this.timer);
    },
    methods: {
      toSeconds(timestamp, day, hours, minutes, seconds) {
        if (timestamp) {
          return timestamp - parseInt(new Date().getTime() / 1e3, 10);
        }
        return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
      },
      timeUp() {
        clearInterval(this.timer);
        this.$emit("timeup");
      },
      countDown() {
        let seconds = this.seconds;
        let [day, hour, minute, second] = [0, 0, 0, 0];
        if (seconds > 0) {
          day = Math.floor(seconds / (60 * 60 * 24));
          hour = Math.floor(seconds / (60 * 60)) - day * 24;
          minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
          second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
        } else {
          this.timeUp();
        }
        if (day < 10) {
          day = "0" + day;
        }
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (minute < 10) {
          minute = "0" + minute;
        }
        if (second < 10) {
          second = "0" + second;
        }
        this.d = day;
        this.h = hour;
        this.i = minute;
        this.s = second;
      },
      startData() {
        this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
        if (this.seconds <= 0) {
          this.seconds = this.toSeconds(0, 0, 0, 0, 0);
          this.countDown();
          return;
        }
        clearInterval(this.timer);
        this.countDown();
        this.timer = setInterval(() => {
          this.seconds--;
          if (this.seconds < 0) {
            this.timeUp();
            return;
          }
          this.countDown();
        }, 1e3);
      },
      update() {
        this.startData();
      },
      changeFlag() {
        if (!this.syncFlag) {
          this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
          this.startData();
          this.syncFlag = true;
        }
      }
    }
  };
  function _sfc_render$l(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-countdown" }, [
      $props.showDay ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          style: vue.normalizeStyle([$options.timeStyle]),
          class: "uni-countdown__number"
        },
        vue.toDisplayString($data.d),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      $props.showDay ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 1,
          style: vue.normalizeStyle([$options.splitorStyle]),
          class: "uni-countdown__splitor"
        },
        vue.toDisplayString($options.dayText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "text",
        {
          style: vue.normalizeStyle([$options.timeStyle]),
          class: "uni-countdown__number"
        },
        vue.toDisplayString($data.h),
        5
        /* TEXT, STYLE */
      ),
      vue.createElementVNode(
        "text",
        {
          style: vue.normalizeStyle([$options.splitorStyle]),
          class: "uni-countdown__splitor"
        },
        vue.toDisplayString($props.showColon ? ":" : $options.hourText),
        5
        /* TEXT, STYLE */
      ),
      vue.createElementVNode(
        "text",
        {
          style: vue.normalizeStyle([$options.timeStyle]),
          class: "uni-countdown__number"
        },
        vue.toDisplayString($data.i),
        5
        /* TEXT, STYLE */
      ),
      vue.createElementVNode(
        "text",
        {
          style: vue.normalizeStyle([$options.splitorStyle]),
          class: "uni-countdown__splitor"
        },
        vue.toDisplayString($props.showColon ? ":" : $options.minuteText),
        5
        /* TEXT, STYLE */
      ),
      vue.createElementVNode(
        "text",
        {
          style: vue.normalizeStyle([$options.timeStyle]),
          class: "uni-countdown__number"
        },
        vue.toDisplayString($data.s),
        5
        /* TEXT, STYLE */
      ),
      !$props.showColon ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 2,
          style: vue.normalizeStyle([$options.splitorStyle]),
          class: "uni-countdown__splitor"
        },
        vue.toDisplayString($options.secondText),
        5
        /* TEXT, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_2$2 = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["render", _sfc_render$l], ["__scopeId", "data-v-c592f7f2"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue"]]);
  const _sfc_main$u = {
    __name: "index",
    setup(__props) {
      uni.getWindowInfo().windowWidth + "px";
      uni.getWindowInfo().windowHeight + "px";
      useCategory();
      vue.ref(1);
      vue.ref(true);
      const isRight = vue.ref(0);
      const error = vue.ref(0);
      const type = "单选";
      let questionType = vue.ref(0);
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      wx.getStorageSync("statusBarHeight") + "px";
      wx.getStorageSync("navigationBarHeight") + "px";
      wx.getStorageSync("menuButtonHeight") + "px";
      const navigationBarAndStatusBarHeight = wx.getStorageSync("statusBarHeight") + wx.getStorageSync("navigationBarHeight") + "px";
      const back = () => {
        formatAppLog("log", "at pages/answer/index.vue:259", "123");
        uni.navigateBack({
          delta: 1
        });
      };
      const durationTime = vue.ref(500);
      const currentAnswerRecord = vue.reactive({
        total: "",
        size: "",
        page: "",
        categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId"),
        currentIndex: ""
      });
      const setCurrentIndex = () => {
        if (current.value) {
          currentAnswerRecord.currentIndex = current.value;
        }
      };
      const setStoryAnswerRecord = () => {
        let arr = uni.getStorageSync("currentAnswerRecordList") || [];
        if (!arr.length) {
          arr.push({
            ...currentAnswerRecord
          });
        }
        arr.map((item) => {
          if (item.categoryId == currentAnswerRecord.categoryId) {
            item.currentIndex = currentAnswerRecord.currentIndex || current.value;
            item.page = currentAnswerRecord.page;
            item.size = currentAnswerRecord.size;
            item.total = currentAnswerRecord.total;
          } else {
            arr.push({
              ...currentAnswerRecord
            });
          }
        });
        uni.setStorageSync("currentAnswerRecordList", arr);
      };
      let current = vue.ref(0);
      const popup2 = vue.ref(null);
      let popupType = vue.ref("card");
      const toggle = (type2) => {
        if (type2 == "notes") {
          popupType.value = type2;
        } else {
          popupType.value = type2;
        }
        popup2.value.open("bottom");
      };
      const changeQuestionCurrentIndex = (index) => {
        durationTime.value = 0;
        current.value = index;
        show.value = false;
        popup2.value.close();
        setTimeout(() => {
          durationTime.value = 500;
        }, 1e3);
      };
      const switchQuestion = (type2) => {
        questionType.value = type2;
      };
      const show = vue.ref(false);
      const change = (e) => {
        show.value = e.show;
      };
      const closePopup = () => {
        show.value = false;
        popup2.value.close();
      };
      let notesText = vue.ref("");
      const addNotesButton = () => {
        let opt = {
          params: {
            notesContent: notesText.value,
            categoryId: list["value"][current.value].categoryId,
            questionId: list["value"][current.value].questionId,
            userId: wx.getStorageSync("userInfo").userId,
            question: list[current.value]
          },
          callBack: (e) => {
            formatAppLog("log", "at pages/answer/index.vue:356", "笔记添加成功", e);
            show.value = false;
            popup2.value.close();
            notesText.value = "";
            uni.showToast({
              title: "笔记添加成功",
              icon: "none",
              duration: 2e3
            });
          }
        };
        $http("addNotes", opt);
      };
      vue.ref([{
        content: "内容 A"
      }, {
        content: "内容 B"
      }, {
        content: "内容 C"
      }]);
      let collageTag = vue.ref(false);
      const swiperChange = (e) => {
        formatAppLog("log", "at pages/answer/index.vue:381", "分页滑动", e);
        current.value = e.detail.current;
        collageTag.value = list["value"][e.detail.current]["collectFlag"];
      };
      const selectOption = (option, optionIndex, list2) => {
        formatAppLog("log", "at pages/answer/index.vue:387", "opt", option);
        list2.answer.push(option.label);
        formatAppLog("log", "at pages/answer/index.vue:391", "选择答案后是否插入了当前选择的数据", list2, option.label);
        if (!list2.isSelected && list2.questionTypeName === "单选题") {
          option.isChecked = true;
          list2.isSelected = true;
          let i2 = 0;
          list2.optionsList.map((item, index) => {
            if (item.isRight) {
              item.isChecked = true;
            }
            if (item.isChecked) {
              i2++;
            }
          });
          if (i2 == 1) {
            list2.isSelectRight = true;
            questionRecordList.push({
              categoryId: list2.categoryId,
              questionId: list2.questionId,
              status: 1,
              questionTypeName: list2.questionTypeName
            });
          } else {
            list2.isSelectRight = false;
            formatAppLog("log", "at pages/answer/index.vue:420", "添加错题的数据", list2, option.label);
            addErrorQuestion(list2.categoryId, list2.questionId, 2, list2.answer);
            questionRecordList.push({
              answer: list2.answer,
              categoryId: list2.categoryId,
              questionId: list2.questionId,
              status: 2,
              questionTypeName: list2.questionTypeName
            });
          }
          locationQuestionList(list2);
        }
        if (!list2.isSelected && list2.questionTypeName === "多选题") {
          option.isChecked = true;
        }
        setCurrentIndex();
      };
      const locationQuestionList = (item) => {
        let arr = uni.getStorageSync("answerDataList") || [];
        arr.push(vue.toRaw(item));
        formatAppLog("log", "at pages/answer/index.vue:445", "插入后的答题数据", arr);
        uni.setStorageSync("answerDataList", arr);
      };
      const areArraysEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) {
          return false;
        }
        const sortedArr1 = arr1.sort();
        const sortedArr2 = arr2.sort();
        const str1 = JSON.stringify(sortedArr1);
        const str2 = JSON.stringify(sortedArr2);
        return str1 === str2;
      };
      const moreAnswer = (option, index, list2) => {
        list2.isSelected = true;
        let isEqual2 = areArraysEqual(list2.answer, list2.rightOptions);
        let status = isEqual2 ? 1 : 2;
        formatAppLog("log", "at pages/answer/index.vue:466", "选项中选择的是否都真确", status);
        addErrorQuestion(list2.categoryId, list2.questionId, status, list2.answer);
        questionRecordList.push({
          answer: list2.answer,
          categoryId: list2.categoryId,
          questionId: list2.questionId,
          status,
          questionTypeName: list2.questionTypeName
        });
        locationQuestionList(list2);
        setCurrentIndex();
      };
      vue.computed(() => {
        return "";
      });
      const postExamScores = (val, examSetting2, arrList) => {
        let userInfo = uni.getStorageSync("userInfo");
        let answerResults = arrList.map((item) => {
          return {
            answers: item.answer,
            questionId: item.questionId,
            rightFlag: item.isSelectRight
          };
        });
        let opt = {
          params: {
            errorNum: val.errNum,
            successNum: val.rightNum,
            score: val.total,
            userId: userInfo.userId,
            examData: {
              answerResults,
              computeScoreType: examSetting2.moreDataWay,
              //多选题积分模式
              firstErrorQuestion: examSetting2.worongPrior,
              notAnswerQuestionFirst: examSetting2.doneNot,
              selectOutOfOrder: examSetting2.optionOrder,
              showAnswer: examSetting2.showAnswer,
              timeNum: examSetting2.examTime
            }
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/answer/index.vue:517", "添加考试记录的回调", res);
          }
        };
        $http("addExamRecord", opt);
      };
      const answerRate = (type2) => {
        let answerList = uni.getStorageSync("answerDataList");
        let examSetting2 = uni.getStorageSync("examSetting");
        let examScores = {
          answerRate: 0,
          total: 0,
          rightNum: 0,
          errNum: 0,
          currentTime: ""
        };
        answerList.map((item) => {
          if (areArraysEqual(item.answer, item.rightOptions)) {
            examScores.rightNum += 1;
          } else {
            examScores.errNum += 1;
          }
          examScores.total += 1;
        });
        examScores.answerRate = (Math.round(examScores.rightNum) / examScores.total * 1e4 / 100).toFixed(2) + "%";
        uni.setStorageSync("exerciseResult", examScores);
        if (examScores.total > examScores.total + examScores.errNum)
          ;
        if (type2 === 1) {
          uni.showModal({
            title: "提示",
            content: "已完成所有试题，现在交卷嘛？",
            success: function(res) {
              if (res.confirm) {
                postExamScores(examScores, examSetting2, answerList);
                uni.redirectTo({
                  url: "../exerciseResult/exerciseResult"
                });
              } else if (res.cancel) {
                formatAppLog("log", "at pages/answer/index.vue:560", "用户点击取消");
              }
            }
          });
        } else {
          uni.showToast({
            title: "考试时间结束！",
            icon: "error",
            duration: 1500
          });
          postExamScores(examScores, examSetting2, answerList);
          setTimeout(() => {
            uni.redirectTo({
              url: "../exerciseResult/exerciseResult"
            });
          }, 1500);
        }
        formatAppLog("log", "at pages/answer/index.vue:578", "正确率", examScores);
      };
      const examEnd = (type2) => {
        formatAppLog("log", "at pages/answer/index.vue:582", "考试交卷", type2);
        if (type2 == "endTime") {
          answerRate(0);
        } else {
          answerRate(1);
        }
      };
      const errAnswerPost = (list2) => {
        uni.setStorageSync("errQuestionDetail", list2);
        uni.navigateTo({
          url: `../addErrorQuestion/index?feedType=errAnswerFeed`
        });
      };
      const addErrorQuestion = (categoryId, questionId, status, answer) => {
        formatAppLog("log", "at pages/answer/index.vue:607", "添加错题", answer);
        let opt = {
          params: {
            "categoryId": categoryId,
            "questionId": questionId,
            "status": status,
            "answer": answer
            // "userId": wx.getStorageSync('userInfo').userId
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/answer/index.vue:617", "错题添加成功", res);
          }
        };
        $http("addErrQuestion", opt);
      };
      const questionRecordList = vue.reactive([]);
      const addErrorQuestionList = () => {
        let opt = {
          params: {
            questionRecordList
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/answer/index.vue:631", "批量添加错题记录", res);
          }
        };
        $http("addErrQuestionList", opt);
      };
      const collectAdd = (tag) => {
        formatAppLog("log", "at pages/answer/index.vue:638", "收藏问题", tag);
        let opt = {
          params: {
            "categoryId": list["value"][current.value]["categoryId"],
            "questionId": list["value"][current.value]["questionId"],
            "questionTypeName": list["value"][current.value]["questionTypeName"],
            "collectType": 2
          },
          callBack: (res) => {
            collageTag.value = !collageTag.value;
            list["value"][current.value]["collectFlag"] = !tag;
            uni.showToast({
              title: !tag ? "收藏成功" : "删除成功",
              icon: "none",
              duration: 2e3
            });
          }
        };
        tag ? $http("removeCollectQuestion", opt) : $http("collectQuestion", opt);
      };
      vue.computed(() => {
        return list["value"][current.value]["collectFlag"];
      });
      let list = vue.ref([]);
      const currentPage = vue.reactive({
        page: 1,
        size: 50,
        total: 10
      });
      const optionTag = ["A", "B", "C", "D", "E", "F"];
      const getQuestionList = (requestionParams) => {
        uni.showLoading({
          title: "加载中..."
        });
        if (requestionParams.type == 5 || requestionParams.type == 6) {
          delete requestionParams.categoryId;
        }
        let opt = {
          params: requestionParams,
          callBack: (res) => {
            uni.hideLoading();
            formatAppLog("log", "at pages/answer/index.vue:687", "res", res.records);
            if (requestionParams.type == 1) {
              res.records.map((item, index) => {
                item.index = currentPage.page > 1 ? currentPage.page * currentPage.size + index : index;
              });
            }
            if (requestionParams.type == 3) {
              res.records.sort(function() {
                return Math.random() - 0.5;
              });
            }
            if (requestionParams.type == 0) {
              if (res.total && res.pages && res.size) {
                currentAnswerRecord.total = res.total;
                currentAnswerRecord.page = res.pages;
                currentAnswerRecord.size = res.size;
              }
            }
            formatAppLog("log", "at pages/answer/index.vue:707", "获取缓存的数据", currentAnswerRecord);
            res.records.map((item, index) => {
              item.answer = [];
              item.isSelectRight = false;
              item.isSelected = false;
              item.isSelected = false;
              const optionObjects = item.options.map((option) => {
                let opt2 = {
                  label: option,
                  isChecked: "",
                  isRight: false
                };
                if (item.errorHistoryFlag && item.rightOptions.includes(option)) {
                  formatAppLog("log", "at pages/answer/index.vue:721", "=====", item);
                  item.isSelectRight = true;
                  item.isSelected = true;
                  opt2.isChecked = true;
                }
                if (item.errorQuestionRecord && item.errorHistoryFlag === false) {
                  item.errorQuestionRecord && item.errorQuestionRecord.answer.map(
                    (it2) => {
                      item.isSelectRight = false;
                      item.isSelected = true;
                      if (item.rightOptions.includes(option)) {
                        opt2.isChecked = true;
                      }
                      if (it2 === option) {
                        opt2.isChecked = true;
                        item.answer = item.errorQuestionRecord.answer;
                      }
                    }
                  );
                }
                return opt2;
              });
              let rightAnswerItem = [];
              item.options.map((opt2, optIdx) => {
                item.rightOptions.map((right, rightIdx) => {
                  if (opt2 === right) {
                    rightAnswerItem.push(optIdx);
                  }
                });
              });
              item.rightAnswerItem = rightAnswerItem;
              const result = optionObjects.map((optionObj) => {
                if (item.rightOptions.includes(optionObj.label)) {
                  optionObj.isRight = true;
                }
                return optionObj;
              });
              item.optionsList = result;
            });
            list.value = [...list.value, ...res.records];
            if (res.records.length > 0) {
              collageTag.value = res.records[current.value]["collectFlag"];
              currentPage.page = res.page;
              currentPage.size = res.size;
              currentPage.total = res.total;
            }
          }
        };
        $http("getQuestionList", opt);
      };
      const getCollectQuestionList = () => {
        let opt = {
          params: {
            page: currentPage.page,
            size: currentPage.size,
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/answer/index.vue:787", "获取的收藏列表", res);
            res.records.map((item, index) => {
              const optionObjects = item.options.map((option) => {
                return {
                  label: option,
                  isChecked: "",
                  isRight: false
                };
              });
              let rightAnswerItem = [];
              item.options.map((opt2, optIdx) => {
                item.rightOptions.map((right, rightIdx) => {
                  if (opt2 === right) {
                    rightAnswerItem.push(optIdx);
                  }
                });
              });
              item.rightAnswerItem = rightAnswerItem;
              const result = optionObjects.map((optionObj) => {
                if (item.rightOptions.includes(optionObj.label)) {
                  optionObj.isRight = true;
                }
                return optionObj;
              });
              item.optionsList = result;
              item.isSelected = false;
              item.answer = [];
            });
            list.value = [...list.value, ...res.records];
            if (res.records.length > 0) {
              collageTag.value = res.records[current.value]["collectFlag"];
              currentPage.page = res.page;
              currentPage.size = res.size;
              currentPage.total = res.total;
            }
          }
        };
        $http("getCollectQuestion", opt);
      };
      const getErrorQuestionList = (type2) => {
        let opt = {
          params: {
            page: currentPage.page || 1,
            size: currentPage.size || 50,
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId"),
            status: 2
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/answer/index.vue:842", "获取错题数据", res);
            res.records.map((item, index) => {
              const optionObjects = item.question.options.map((option) => {
                return {
                  label: option,
                  isChecked: "",
                  isRight: false
                };
              });
              formatAppLog("log", "at pages/answer/index.vue:852", "optionObjects", optionObjects);
              const result = optionObjects.map((optionObj) => {
                if (item.question.rightOptions.includes(optionObj.label)) {
                  optionObj.isRight = true;
                }
                return optionObj;
              });
              item.question.optionsList = result;
              item.question.isSelected = false;
            });
            let a2 = res.records.map((item) => {
              return item.question;
            });
            list.value = [...a2];
            collageTag.value = res.records[current.value]["collectFlag"];
            currentPage.page = res.page;
            currentPage.size = res.size;
            currentPage.total = res.total;
          }
        };
        $http("getErrorQuestionList", opt);
      };
      const examSetting = vue.reactive({
        ...uni.getStorageSync("examSetting")
      });
      let isExam = vue.ref(false);
      onLoad((params) => {
        const currentAnswerRecordList = uni.getStorageSync("currentAnswerRecordList");
        currentPage.page = currentAnswerRecordList.page;
        currentPage.size = currentAnswerRecordList.size;
        formatAppLog("log", "at pages/answer/index.vue:887", "listType", params);
        let questionParams = {
          type: params.listType,
          categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId"),
          difficulty: (params == null ? void 0 : params.difficulty) ?? "",
          //难度
          paperId: Number(params == null ? void 0 : params.paperId) ?? "",
          //所属试题集
          questionTypeCode: "",
          //问题类型编码
          questionTypeName: (params == null ? void 0 : params.questionTypeName) ?? "",
          //问题类型名称
          page: currentPage.page,
          size: currentPage.size
        };
        if (params.listType == 0) {
          currentAnswerRecordList.map((item) => {
            if (item.categoryId == questionParams.categoryId) {
              current.value = item.currentIndex || 0;
            }
          });
        }
        if (params.listType == 11) {
          questionType.value = 1;
          getErrorQuestionList(params.listType);
        } else if (params.listType == 12) {
          getCollectQuestionList();
        } else if (params.listType == 1) {
          isExam.value = true;
          let examSetting2 = uni.getStorageSync("examSetting");
          let questionParams1 = Object.assign({}, questionParams, {
            type: params.listType,
            page: 1,
            // 默认1
            size: examSetting2.radio,
            // 题目数量 page*size
            questionTypeName: "单选题"
          });
          let questionParams2 = Object.assign({}, questionParams1, {
            size: examSetting2.multipleScore,
            // 题目数量 page*size
            questionTypeName: "多选题"
          });
          getQuestionList(questionParams1);
          getQuestionList(questionParams2);
        } else {
          getQuestionList(questionParams);
        }
      });
      onHide(() => {
        setStoryAnswerRecord();
      });
      onUnload(() => {
        setStoryAnswerRecord();
        questionRecordList.length > 0 && addErrorQuestionList();
      });
      onReady(() => {
      });
      return (_ctx, _cache) => {
        const _component_page_meta = resolveEasycom(vue.resolveDynamicComponent("page-meta"), __easycom_0$9);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
        const _component_uni_countdown = resolveEasycom(vue.resolveDynamicComponent("uni-countdown"), __easycom_2$2);
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_2$3);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1$5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(' <page-meta :root-font-size="getRootFontSize()"></page-meta> '),
            vue.createVNode(_component_page_meta, {
              "page-style": "overflow:" + (show.value ? "hidden" : "visible")
            }, null, 8, ["page-style"]),
            vue.createVNode(_component_uni_nav_bar, {
              style: vue.normalizeStyle({ "height": navigationBarAndStatusBarHeight, display: "flex", width: "100%" }),
              "status-bar": true,
              title: ""
            }, {
              left: vue.withCtx(() => [
                vue.createVNode(_component_uni_icons, {
                  onClick: back,
                  type: "back",
                  color: "#000",
                  size: "24"
                })
              ]),
              default: vue.withCtx(() => [
                vue.unref(isExam) ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "time-box"
                }, [
                  vue.createVNode(_component_uni_countdown, {
                    "show-day": false,
                    hour: 0,
                    minute: Number(examSetting.examTime),
                    second: 0,
                    onTimeup: _cache[0] || (_cache[0] = ($event) => examEnd("endTime"))
                  }, null, 8, ["minute"])
                ])) : (vue.openBlock(), vue.createElementBlock("view", {
                  key: 1,
                  class: "input-view"
                }, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass(["type-button mini-btn", { "active-btn": !vue.unref(questionType) }]),
                      onClick: _cache[1] || (_cache[1] = ($event) => switchQuestion(0))
                    },
                    "答题",
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass(["type-button mini-btn", { "active-btn": vue.unref(questionType) }]),
                      onClick: _cache[2] || (_cache[2] = ($event) => switchQuestion(1))
                    },
                    "背题",
                    2
                    /* CLASS */
                  )
                ]))
              ]),
              _: 1
              /* STABLE */
            }, 8, ["style"]),
            vue.createElementVNode("view", {
              class: "container",
              "page-font-size": "{{pageFontSize}}",
              "root-font-size": "{{rootFontSize}}"
            }, [
              vue.createElementVNode("swiper", {
                duration: durationTime.value,
                "disable-programmatic-animation": "true",
                "skip-hidden-item-layout": "true",
                class: "swiper",
                current: vue.unref(current),
                onChange: swiperChange
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(list), (question, index) => {
                    return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("view", {
                          class: "question",
                          style: { "padding": "0 20rpx" }
                        }, [
                          vue.createElementVNode("view", { class: "question-title" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "option-tag" },
                              vue.toDisplayString(question.difficulty),
                              1
                              /* TEXT */
                            ),
                            vue.createTextVNode(
                              " " + vue.toDisplayString(vue.unref(current) + 1) + "、 " + vue.toDisplayString(question.questionTitle),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createCommentVNode(" 单选题逻辑 "),
                          question.questionTypeName === "单选题" && vue.unref(questionType) === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "question-options"
                          }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.optionsList, (option, optionIndex) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "question-option",
                                  key: optionIndex,
                                  onClick: ($event) => selectOption(option, optionIndex, question)
                                }, [
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option", { "option-right": question.isSelected === true && option.isRight, "option-error": option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    [
                                      vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                      !question.isSelected || !option.isChecked ? (vue.openBlock(), vue.createElementBlock(
                                        "text",
                                        { key: 0 },
                                        vue.toDisplayString(optionTag[optionIndex]),
                                        1
                                        /* TEXT */
                                      )) : vue.createCommentVNode("v-if", true),
                                      vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option-item", { "option-right-text": question.optionsList.isSelected === true && option.isRight, "option-error-text": option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    vue.toDisplayString(option["label"]),
                                    3
                                    /* TEXT, CLASS */
                                  )
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 多选题逻辑 "),
                          question.questionTypeName === "多选题" && vue.unref(questionType) === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.optionsList, (option, optionIndex) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "question-option",
                                  key: optionIndex,
                                  onClick: ($event) => selectOption(option, optionIndex, question)
                                }, [
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option", { "more-option-select": option.isChecked || question.isSelected === true && option.isRight, "more-option-error": question.isSelected === true && option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    [
                                      vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                      vue.createElementVNode(
                                        "text",
                                        null,
                                        vue.toDisplayString(optionTag[optionIndex]),
                                        1
                                        /* TEXT */
                                      ),
                                      vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option-item", { "option-right-text": option.isChecked, "option-error-text": question.isSelected === true && option.isChecked && option.isChecked !== option.isRight }])
                                    },
                                    vue.toDisplayString(option["label"]),
                                    3
                                    /* TEXT, CLASS */
                                  )
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 背题逻辑 "),
                          vue.unref(questionType) === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                            question.questionTypeName === "单选题" ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "question-options"
                            }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(question.optionsList, (option, optionIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "question-option",
                                    key: optionIndex
                                  }, [
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option", { "option-right": option.isRight, "option-error": option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      [
                                        vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                        !question.isSelected || !option.isChecked ? (vue.openBlock(), vue.createElementBlock(
                                          "text",
                                          { key: 0 },
                                          vue.toDisplayString(option.isRight ? null : optionTag[optionIndex]),
                                          1
                                          /* TEXT */
                                        )) : vue.createCommentVNode("v-if", true),
                                        vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option-item", { "option-right-text": option.isRight, "option-error-text": option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      vue.toDisplayString(option["label"]),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])) : vue.createCommentVNode("v-if", true),
                            vue.createCommentVNode(" 多选题逻辑 "),
                            question.questionTypeName === "多选题" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(question.optionsList, (option, optionIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "question-option",
                                    key: optionIndex
                                  }, [
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option", { "more-option-select": option.isRight, "more-option-error": question.isSelected === true && option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      [
                                        vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                        vue.createElementVNode(
                                          "text",
                                          null,
                                          vue.toDisplayString(optionTag[optionIndex]),
                                          1
                                          /* TEXT */
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option-item", { "option-right-text": option.isRight, "option-error-text": question.isSelected === true && option.isChecked && option.isChecked !== option.isRight }])
                                      },
                                      vue.toDisplayString(option["label"]),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])) : vue.createCommentVNode("v-if", true)
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.unref(questionType) === 0 && question.questionTypeName == "多选题" && !question.isSelected ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 3,
                            class: "post-answer",
                            onClick: ($event) => moreAnswer(_ctx.option, _ctx.optionIndex, question)
                          }, "提交答案", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(' :style="{width:winWidth}" '),
                          vue.createCommentVNode("  "),
                          question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 4,
                            class: "answer"
                          }, [
                            vue.createElementVNode("text", { style: { "font-weight": "500" } }, "答案 "),
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.options, (item, index2) => {
                                return vue.openBlock(), vue.createElementBlock("text", {
                                  style: { "color": "#4674f7" },
                                  key: index2
                                }, [
                                  (vue.openBlock(true), vue.createElementBlock(
                                    vue.Fragment,
                                    null,
                                    vue.renderList(question.rightOptions, (it2, dix) => {
                                      return vue.openBlock(), vue.createElementBlock(
                                        "text",
                                        { key: it2 },
                                        vue.toDisplayString(item == it2 ? optionTag[index2] : ""),
                                        1
                                        /* TEXT */
                                      );
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            vue.createElementVNode(
                              "text",
                              { style: { "color": "#4674f7" } },
                              vue.toDisplayString(_ctx.currentQuestionRightItem),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("text", {
                              style: { "color": "#4674f7", "float": "right" },
                              onClick: ($event) => errAnswerPost(question)
                            }, "报错", 8, ["onClick"])
                          ])) : vue.createCommentVNode("v-if", true)
                        ]),
                        question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          style: { "width": "100%", "height": "20rpx", "background-color": "#f3f3f3" }
                        })) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" 解析 "),
                        vue.createCommentVNode("  "),
                        question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "bottom-content"
                        }, [
                          vue.createElementVNode("view", { class: "analysis" }, [
                            vue.createElementVNode("view", { style: { "width": "100%", "height": "60rpx" } }, [
                              vue.createElementVNode("text", { class: "answer-info" }, "解析"),
                              vue.createElementVNode("img", {
                                src: "/static/answer/anwser.png",
                                style: { "width": "35rpx", "height": "35rpx", "margin-right": "10rpx" },
                                alt: ""
                              }),
                              vue.createElementVNode("img", {
                                src: "/static/answer/vip.png",
                                style: { "width": "50rpx", "height": "25rpx", "margin-right": "10rpx" },
                                alt: "",
                                srcset: ""
                              })
                            ]),
                            vue.createElementVNode(
                              "view",
                              { style: { "width": "100%", "min-height": "50rpx", "line-height": "50rpx", "display": "inline-block" } },
                              vue.toDisplayString(question.analysis),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "note" }, [
                            vue.createElementVNode("text", { class: "answer-info" }, "笔记"),
                            vue.createElementVNode("text", {
                              style: { "color": "#4674f7", "float": "right" },
                              onClick: _cache[3] || (_cache[3] = ($event) => toggle("notes"))
                            }, "添加笔记")
                          ])
                        ])) : vue.createCommentVNode("v-if", true)
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 40, ["duration", "current"]),
              vue.createElementVNode("view", { class: "foote" }, [
                vue.createElementVNode("view", null, [
                  vue.createCommentVNode(' <button class="button" type="primary"><text class="button-text">底部</text></button> '),
                  vue.createCommentVNode(" 普通弹窗 "),
                  vue.createElementVNode("view", { class: "popup-header" }, [
                    vue.createElementVNode("view", { class: "popup-left" }, [
                      vue.unref(isExam) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 0,
                        class: "icon-item",
                        onClick: _cache[4] || (_cache[4] = ($event) => examEnd("click"))
                      }, [
                        vue.createElementVNode("button", {
                          class: "end-exam",
                          size: "mini",
                          style: { "background-color": "#4675f7", "color": "#fff", "border-radius": "50rpx" }
                        }, "交卷")
                      ])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("view", {
                        class: "icon-item",
                        onClick: _cache[5] || (_cache[5] = ($event) => collectAdd(vue.unref(collageTag)))
                      }, [
                        !vue.unref(collageTag) ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 0,
                          class: "img",
                          src: "/static/answer/college-f.png",
                          alt: "收藏",
                          srcset: ""
                        })) : (vue.openBlock(), vue.createElementBlock("img", {
                          key: 1,
                          class: "img",
                          src: "/static/answer/college-t.png",
                          alt: "收藏",
                          srcset: ""
                        })),
                        vue.createElementVNode("text", null, "收藏")
                      ]),
                      !vue.unref(isExam) ? (vue.openBlock(), vue.createElementBlock("view", {
                        key: 1,
                        class: "icon-item"
                      }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/delete.png",
                          alt: "删除",
                          srcset: ""
                        }),
                        vue.createElementVNode("text", null, "删除")
                      ])) : vue.createCommentVNode("v-if", true)
                    ]),
                    vue.createElementVNode("view", { class: "popup-right" }, [
                      vue.createElementVNode("view", { class: "icon-item" }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/isRight.png",
                          alt: "正确"
                        }),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(isRight.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "icon-item" }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/error.png",
                          alt: "错误"
                        }),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(error.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "icon-item",
                        onClick: _cache[6] || (_cache[6] = ($event) => toggle("card"))
                      }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/pannel.png",
                          alt: "面板"
                        }),
                        vue.createElementVNode("text", null, "答题卡")
                      ])
                    ])
                  ]),
                  vue.createVNode(
                    _component_uni_popup,
                    {
                      ref_key: "popup",
                      ref: popup2,
                      "background-color": "#fff",
                      onChange: change
                    },
                    {
                      default: vue.withCtx(() => [
                        vue.unref(popupType) === "card" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: vue.normalizeClass(["popup-content", { "popup-height": type === "right" }])
                          },
                          [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(vue.unref(list), (item, index) => {
                                return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                                  vue.createTextVNode(
                                    vue.toDisplayString(item.isSelectRight) + " ",
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createCommentVNode(" 'item-list-error':!item.isSelectRight "),
                                  vue.createElementVNode("view", {
                                    class: vue.normalizeClass(["item-list", { "item-list-isRight": item.errorHistoryFlag, "item-list-error": item.errorHistoryFlag, "item-list-current": vue.unref(current) == index }]),
                                    onClick: ($event) => changeQuestionCurrentIndex(index)
                                  }, [
                                    vue.createTextVNode(
                                      vue.toDisplayString(index + 1) + " ",
                                      1
                                      /* TEXT */
                                    ),
                                    item.collectFlag ? (vue.openBlock(), vue.createElementBlock("img", {
                                      key: 0,
                                      class: "item-icon",
                                      src: "/static/answer/college.png",
                                      alt: ""
                                    })) : vue.createCommentVNode("v-if", true)
                                  ], 10, ["onClick"])
                                ]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          2
                          /* CLASS */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" 添加笔记 "),
                        vue.unref(popupType) === "notes" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                          vue.createElementVNode("view", { style: { "padding": "0 10rpx", "line-height": "80rpx", "height": "80rpx", "background-color": "#f2f2f2", "display": "flex", "justify-content": "space-between" } }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "closeempty",
                              size: "20",
                              onClick: closePopup
                            }),
                            vue.createElementVNode("span", {
                              style: { "color": "#4674F6" },
                              onClick: addNotesButton
                            }, "确认")
                          ]),
                          vue.withDirectives(vue.createElementVNode(
                            "textarea",
                            {
                              class: "width:100%;height:100rpx",
                              type: "textarea",
                              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => vue.isRef(notesText) ? notesText.value = $event : notesText = $event),
                              placeholder: "请输入笔记"
                            },
                            null,
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vModelText, vue.unref(notesText)]
                          ])
                        ])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 1
                      /* STABLE */
                    },
                    512
                    /* NEED_PATCH */
                  )
                ])
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesAnswerIndex = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/answer/index.vue"]]);
  var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  function int2char(n2) {
    return BI_RM.charAt(n2);
  }
  function op_and(x2, y2) {
    return x2 & y2;
  }
  function op_or(x2, y2) {
    return x2 | y2;
  }
  function op_xor(x2, y2) {
    return x2 ^ y2;
  }
  function op_andnot(x2, y2) {
    return x2 & ~y2;
  }
  function lbit(x2) {
    if (x2 == 0) {
      return -1;
    }
    var r2 = 0;
    if ((x2 & 65535) == 0) {
      x2 >>= 16;
      r2 += 16;
    }
    if ((x2 & 255) == 0) {
      x2 >>= 8;
      r2 += 8;
    }
    if ((x2 & 15) == 0) {
      x2 >>= 4;
      r2 += 4;
    }
    if ((x2 & 3) == 0) {
      x2 >>= 2;
      r2 += 2;
    }
    if ((x2 & 1) == 0) {
      ++r2;
    }
    return r2;
  }
  function cbit(x2) {
    var r2 = 0;
    while (x2 != 0) {
      x2 &= x2 - 1;
      ++r2;
    }
    return r2;
  }
  var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var b64pad = "=";
  function hex2b64(h2) {
    var i2;
    var c2;
    var ret = "";
    for (i2 = 0; i2 + 3 <= h2.length; i2 += 3) {
      c2 = parseInt(h2.substring(i2, i2 + 3), 16);
      ret += b64map.charAt(c2 >> 6) + b64map.charAt(c2 & 63);
    }
    if (i2 + 1 == h2.length) {
      c2 = parseInt(h2.substring(i2, i2 + 1), 16);
      ret += b64map.charAt(c2 << 2);
    } else if (i2 + 2 == h2.length) {
      c2 = parseInt(h2.substring(i2, i2 + 2), 16);
      ret += b64map.charAt(c2 >> 2) + b64map.charAt((c2 & 3) << 4);
    }
    while ((ret.length & 3) > 0) {
      ret += b64pad;
    }
    return ret;
  }
  var decoder$1;
  var Hex = {
    decode: function(a2) {
      var i2;
      if (decoder$1 === void 0) {
        var hex = "0123456789ABCDEF";
        var ignore = " \f\n\r	 \u2028\u2029";
        decoder$1 = {};
        for (i2 = 0; i2 < 16; ++i2) {
          decoder$1[hex.charAt(i2)] = i2;
        }
        hex = hex.toLowerCase();
        for (i2 = 10; i2 < 16; ++i2) {
          decoder$1[hex.charAt(i2)] = i2;
        }
        for (i2 = 0; i2 < ignore.length; ++i2) {
          decoder$1[ignore.charAt(i2)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i2 = 0; i2 < a2.length; ++i2) {
        var c2 = a2.charAt(i2);
        if (c2 == "=") {
          break;
        }
        c2 = decoder$1[c2];
        if (c2 == -1) {
          continue;
        }
        if (c2 === void 0) {
          throw new Error("Illegal character at offset " + i2);
        }
        bits |= c2;
        if (++char_count >= 2) {
          out[out.length] = bits;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 4;
        }
      }
      if (char_count) {
        throw new Error("Hex encoding incomplete: 4 bits missing");
      }
      return out;
    }
  };
  var decoder;
  var Base64 = {
    decode: function(a2) {
      var i2;
      if (decoder === void 0) {
        var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var ignore = "= \f\n\r	 \u2028\u2029";
        decoder = /* @__PURE__ */ Object.create(null);
        for (i2 = 0; i2 < 64; ++i2) {
          decoder[b64.charAt(i2)] = i2;
        }
        decoder["-"] = 62;
        decoder["_"] = 63;
        for (i2 = 0; i2 < ignore.length; ++i2) {
          decoder[ignore.charAt(i2)] = -1;
        }
      }
      var out = [];
      var bits = 0;
      var char_count = 0;
      for (i2 = 0; i2 < a2.length; ++i2) {
        var c2 = a2.charAt(i2);
        if (c2 == "=") {
          break;
        }
        c2 = decoder[c2];
        if (c2 == -1) {
          continue;
        }
        if (c2 === void 0) {
          throw new Error("Illegal character at offset " + i2);
        }
        bits |= c2;
        if (++char_count >= 4) {
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          out[out.length] = bits & 255;
          bits = 0;
          char_count = 0;
        } else {
          bits <<= 6;
        }
      }
      switch (char_count) {
        case 1:
          throw new Error("Base64 encoding incomplete: at least 2 bits missing");
        case 2:
          out[out.length] = bits >> 10;
          break;
        case 3:
          out[out.length] = bits >> 16;
          out[out.length] = bits >> 8 & 255;
          break;
      }
      return out;
    },
    re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
    unarmor: function(a2) {
      var m2 = Base64.re.exec(a2);
      if (m2) {
        if (m2[1]) {
          a2 = m2[1];
        } else if (m2[2]) {
          a2 = m2[2];
        } else {
          throw new Error("RegExp out of sync");
        }
      }
      return Base64.decode(a2);
    }
  };
  var max = 1e13;
  var Int10 = (
    /** @class */
    function() {
      function Int102(value) {
        this.buf = [+value || 0];
      }
      Int102.prototype.mulAdd = function(m2, c2) {
        var b = this.buf;
        var l2 = b.length;
        var i2;
        var t2;
        for (i2 = 0; i2 < l2; ++i2) {
          t2 = b[i2] * m2 + c2;
          if (t2 < max) {
            c2 = 0;
          } else {
            c2 = 0 | t2 / max;
            t2 -= c2 * max;
          }
          b[i2] = t2;
        }
        if (c2 > 0) {
          b[i2] = c2;
        }
      };
      Int102.prototype.sub = function(c2) {
        var b = this.buf;
        var l2 = b.length;
        var i2;
        var t2;
        for (i2 = 0; i2 < l2; ++i2) {
          t2 = b[i2] - c2;
          if (t2 < 0) {
            t2 += max;
            c2 = 1;
          } else {
            c2 = 0;
          }
          b[i2] = t2;
        }
        while (b[b.length - 1] === 0) {
          b.pop();
        }
      };
      Int102.prototype.toString = function(base) {
        if ((base || 10) != 10) {
          throw new Error("only base 10 is supported");
        }
        var b = this.buf;
        var s2 = b[b.length - 1].toString();
        for (var i2 = b.length - 2; i2 >= 0; --i2) {
          s2 += (max + b[i2]).toString().substring(1);
        }
        return s2;
      };
      Int102.prototype.valueOf = function() {
        var b = this.buf;
        var v2 = 0;
        for (var i2 = b.length - 1; i2 >= 0; --i2) {
          v2 = v2 * max + b[i2];
        }
        return v2;
      };
      Int102.prototype.simplify = function() {
        var b = this.buf;
        return b.length == 1 ? b[0] : this;
      };
      return Int102;
    }()
  );
  var ellipsis = "…";
  var reTimeS = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  var reTimeL = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
  function stringCut(str, len) {
    if (str.length > len) {
      str = str.substring(0, len) + ellipsis;
    }
    return str;
  }
  var Stream = (
    /** @class */
    function() {
      function Stream2(enc, pos) {
        this.hexDigits = "0123456789ABCDEF";
        if (enc instanceof Stream2) {
          this.enc = enc.enc;
          this.pos = enc.pos;
        } else {
          this.enc = enc;
          this.pos = pos;
        }
      }
      Stream2.prototype.get = function(pos) {
        if (pos === void 0) {
          pos = this.pos++;
        }
        if (pos >= this.enc.length) {
          throw new Error("Requesting byte offset ".concat(pos, " on a stream of length ").concat(this.enc.length));
        }
        return "string" === typeof this.enc ? this.enc.charCodeAt(pos) : this.enc[pos];
      };
      Stream2.prototype.hexByte = function(b) {
        return this.hexDigits.charAt(b >> 4 & 15) + this.hexDigits.charAt(b & 15);
      };
      Stream2.prototype.hexDump = function(start, end, raw) {
        var s2 = "";
        for (var i2 = start; i2 < end; ++i2) {
          s2 += this.hexByte(this.get(i2));
          if (raw !== true) {
            switch (i2 & 15) {
              case 7:
                s2 += "  ";
                break;
              case 15:
                s2 += "\n";
                break;
              default:
                s2 += " ";
            }
          }
        }
        return s2;
      };
      Stream2.prototype.isASCII = function(start, end) {
        for (var i2 = start; i2 < end; ++i2) {
          var c2 = this.get(i2);
          if (c2 < 32 || c2 > 176) {
            return false;
          }
        }
        return true;
      };
      Stream2.prototype.parseStringISO = function(start, end) {
        var s2 = "";
        for (var i2 = start; i2 < end; ++i2) {
          s2 += String.fromCharCode(this.get(i2));
        }
        return s2;
      };
      Stream2.prototype.parseStringUTF = function(start, end) {
        var s2 = "";
        for (var i2 = start; i2 < end; ) {
          var c2 = this.get(i2++);
          if (c2 < 128) {
            s2 += String.fromCharCode(c2);
          } else if (c2 > 191 && c2 < 224) {
            s2 += String.fromCharCode((c2 & 31) << 6 | this.get(i2++) & 63);
          } else {
            s2 += String.fromCharCode((c2 & 15) << 12 | (this.get(i2++) & 63) << 6 | this.get(i2++) & 63);
          }
        }
        return s2;
      };
      Stream2.prototype.parseStringBMP = function(start, end) {
        var str = "";
        var hi;
        var lo;
        for (var i2 = start; i2 < end; ) {
          hi = this.get(i2++);
          lo = this.get(i2++);
          str += String.fromCharCode(hi << 8 | lo);
        }
        return str;
      };
      Stream2.prototype.parseTime = function(start, end, shortYear) {
        var s2 = this.parseStringISO(start, end);
        var m2 = (shortYear ? reTimeS : reTimeL).exec(s2);
        if (!m2) {
          return "Unrecognized time: " + s2;
        }
        if (shortYear) {
          m2[1] = +m2[1];
          m2[1] += +m2[1] < 70 ? 2e3 : 1900;
        }
        s2 = m2[1] + "-" + m2[2] + "-" + m2[3] + " " + m2[4];
        if (m2[5]) {
          s2 += ":" + m2[5];
          if (m2[6]) {
            s2 += ":" + m2[6];
            if (m2[7]) {
              s2 += "." + m2[7];
            }
          }
        }
        if (m2[8]) {
          s2 += " UTC";
          if (m2[8] != "Z") {
            s2 += m2[8];
            if (m2[9]) {
              s2 += ":" + m2[9];
            }
          }
        }
        return s2;
      };
      Stream2.prototype.parseInteger = function(start, end) {
        var v2 = this.get(start);
        var neg = v2 > 127;
        var pad = neg ? 255 : 0;
        var len;
        var s2 = "";
        while (v2 == pad && ++start < end) {
          v2 = this.get(start);
        }
        len = end - start;
        if (len === 0) {
          return neg ? -1 : 0;
        }
        if (len > 4) {
          s2 = v2;
          len <<= 3;
          while (((+s2 ^ pad) & 128) == 0) {
            s2 = +s2 << 1;
            --len;
          }
          s2 = "(" + len + " bit)\n";
        }
        if (neg) {
          v2 = v2 - 256;
        }
        var n2 = new Int10(v2);
        for (var i2 = start + 1; i2 < end; ++i2) {
          n2.mulAdd(256, this.get(i2));
        }
        return s2 + n2.toString();
      };
      Stream2.prototype.parseBitString = function(start, end, maxLength) {
        var unusedBit = this.get(start);
        var lenBit = (end - start - 1 << 3) - unusedBit;
        var intro = "(" + lenBit + " bit)\n";
        var s2 = "";
        for (var i2 = start + 1; i2 < end; ++i2) {
          var b = this.get(i2);
          var skip = i2 == end - 1 ? unusedBit : 0;
          for (var j2 = 7; j2 >= skip; --j2) {
            s2 += b >> j2 & 1 ? "1" : "0";
          }
          if (s2.length > maxLength) {
            return intro + stringCut(s2, maxLength);
          }
        }
        return intro + s2;
      };
      Stream2.prototype.parseOctetString = function(start, end, maxLength) {
        if (this.isASCII(start, end)) {
          return stringCut(this.parseStringISO(start, end), maxLength);
        }
        var len = end - start;
        var s2 = "(" + len + " byte)\n";
        maxLength /= 2;
        if (len > maxLength) {
          end = start + maxLength;
        }
        for (var i2 = start; i2 < end; ++i2) {
          s2 += this.hexByte(this.get(i2));
        }
        if (len > maxLength) {
          s2 += ellipsis;
        }
        return s2;
      };
      Stream2.prototype.parseOID = function(start, end, maxLength) {
        var s2 = "";
        var n2 = new Int10();
        var bits = 0;
        for (var i2 = start; i2 < end; ++i2) {
          var v2 = this.get(i2);
          n2.mulAdd(128, v2 & 127);
          bits += 7;
          if (!(v2 & 128)) {
            if (s2 === "") {
              n2 = n2.simplify();
              if (n2 instanceof Int10) {
                n2.sub(80);
                s2 = "2." + n2.toString();
              } else {
                var m2 = n2 < 80 ? n2 < 40 ? 0 : 1 : 2;
                s2 = m2 + "." + (n2 - m2 * 40);
              }
            } else {
              s2 += "." + n2.toString();
            }
            if (s2.length > maxLength) {
              return stringCut(s2, maxLength);
            }
            n2 = new Int10();
            bits = 0;
          }
        }
        if (bits > 0) {
          s2 += ".incomplete";
        }
        return s2;
      };
      return Stream2;
    }()
  );
  var ASN1 = (
    /** @class */
    function() {
      function ASN12(stream, header, length, tag, sub) {
        if (!(tag instanceof ASN1Tag)) {
          throw new Error("Invalid tag value.");
        }
        this.stream = stream;
        this.header = header;
        this.length = length;
        this.tag = tag;
        this.sub = sub;
      }
      ASN12.prototype.typeName = function() {
        switch (this.tag.tagClass) {
          case 0:
            switch (this.tag.tagNumber) {
              case 0:
                return "EOC";
              case 1:
                return "BOOLEAN";
              case 2:
                return "INTEGER";
              case 3:
                return "BIT_STRING";
              case 4:
                return "OCTET_STRING";
              case 5:
                return "NULL";
              case 6:
                return "OBJECT_IDENTIFIER";
              case 7:
                return "ObjectDescriptor";
              case 8:
                return "EXTERNAL";
              case 9:
                return "REAL";
              case 10:
                return "ENUMERATED";
              case 11:
                return "EMBEDDED_PDV";
              case 12:
                return "UTF8String";
              case 16:
                return "SEQUENCE";
              case 17:
                return "SET";
              case 18:
                return "NumericString";
              case 19:
                return "PrintableString";
              case 20:
                return "TeletexString";
              case 21:
                return "VideotexString";
              case 22:
                return "IA5String";
              case 23:
                return "UTCTime";
              case 24:
                return "GeneralizedTime";
              case 25:
                return "GraphicString";
              case 26:
                return "VisibleString";
              case 27:
                return "GeneralString";
              case 28:
                return "UniversalString";
              case 30:
                return "BMPString";
            }
            return "Universal_" + this.tag.tagNumber.toString();
          case 1:
            return "Application_" + this.tag.tagNumber.toString();
          case 2:
            return "[" + this.tag.tagNumber.toString() + "]";
          case 3:
            return "Private_" + this.tag.tagNumber.toString();
        }
      };
      ASN12.prototype.content = function(maxLength) {
        if (this.tag === void 0) {
          return null;
        }
        if (maxLength === void 0) {
          maxLength = Infinity;
        }
        var content = this.posContent();
        var len = Math.abs(this.length);
        if (!this.tag.isUniversal()) {
          if (this.sub !== null) {
            return "(" + this.sub.length + " elem)";
          }
          return this.stream.parseOctetString(content, content + len, maxLength);
        }
        switch (this.tag.tagNumber) {
          case 1:
            return this.stream.get(content) === 0 ? "false" : "true";
          case 2:
            return this.stream.parseInteger(content, content + len);
          case 3:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(content, content + len, maxLength);
          case 4:
            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(content, content + len, maxLength);
          case 6:
            return this.stream.parseOID(content, content + len, maxLength);
          case 16:
          case 17:
            if (this.sub !== null) {
              return "(" + this.sub.length + " elem)";
            } else {
              return "(no elem)";
            }
          case 12:
            return stringCut(this.stream.parseStringUTF(content, content + len), maxLength);
          case 18:
          case 19:
          case 20:
          case 21:
          case 22:
          case 26:
            return stringCut(this.stream.parseStringISO(content, content + len), maxLength);
          case 30:
            return stringCut(this.stream.parseStringBMP(content, content + len), maxLength);
          case 23:
          case 24:
            return this.stream.parseTime(content, content + len, this.tag.tagNumber == 23);
        }
        return null;
      };
      ASN12.prototype.toString = function() {
        return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
      };
      ASN12.prototype.toPrettyString = function(indent) {
        if (indent === void 0) {
          indent = "";
        }
        var s2 = indent + this.typeName() + " @" + this.stream.pos;
        if (this.length >= 0) {
          s2 += "+";
        }
        s2 += this.length;
        if (this.tag.tagConstructed) {
          s2 += " (constructed)";
        } else if (this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null) {
          s2 += " (encapsulates)";
        }
        s2 += "\n";
        if (this.sub !== null) {
          indent += "  ";
          for (var i2 = 0, max2 = this.sub.length; i2 < max2; ++i2) {
            s2 += this.sub[i2].toPrettyString(indent);
          }
        }
        return s2;
      };
      ASN12.prototype.posStart = function() {
        return this.stream.pos;
      };
      ASN12.prototype.posContent = function() {
        return this.stream.pos + this.header;
      };
      ASN12.prototype.posEnd = function() {
        return this.stream.pos + this.header + Math.abs(this.length);
      };
      ASN12.prototype.toHexString = function() {
        return this.stream.hexDump(this.posStart(), this.posEnd(), true);
      };
      ASN12.decodeLength = function(stream) {
        var buf = stream.get();
        var len = buf & 127;
        if (len == buf) {
          return len;
        }
        if (len > 6) {
          throw new Error("Length over 48 bits not supported at position " + (stream.pos - 1));
        }
        if (len === 0) {
          return null;
        }
        buf = 0;
        for (var i2 = 0; i2 < len; ++i2) {
          buf = buf * 256 + stream.get();
        }
        return buf;
      };
      ASN12.prototype.getHexStringValue = function() {
        var hexString = this.toHexString();
        var offset = this.header * 2;
        var length = this.length * 2;
        return hexString.substr(offset, length);
      };
      ASN12.decode = function(str) {
        var stream;
        if (!(str instanceof Stream)) {
          stream = new Stream(str, 0);
        } else {
          stream = str;
        }
        var streamStart = new Stream(stream);
        var tag = new ASN1Tag(stream);
        var len = ASN12.decodeLength(stream);
        var start = stream.pos;
        var header = start - streamStart.pos;
        var sub = null;
        var getSub = function() {
          var ret = [];
          if (len !== null) {
            var end = start + len;
            while (stream.pos < end) {
              ret[ret.length] = ASN12.decode(stream);
            }
            if (stream.pos != end) {
              throw new Error("Content size is not correct for container starting at offset " + start);
            }
          } else {
            try {
              for (; ; ) {
                var s2 = ASN12.decode(stream);
                if (s2.tag.isEOC()) {
                  break;
                }
                ret[ret.length] = s2;
              }
              len = start - stream.pos;
            } catch (e) {
              throw new Error("Exception while decoding undefined length content: " + e);
            }
          }
          return ret;
        };
        if (tag.tagConstructed) {
          sub = getSub();
        } else if (tag.isUniversal() && (tag.tagNumber == 3 || tag.tagNumber == 4)) {
          try {
            if (tag.tagNumber == 3) {
              if (stream.get() != 0) {
                throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              }
            }
            sub = getSub();
            for (var i2 = 0; i2 < sub.length; ++i2) {
              if (sub[i2].tag.isEOC()) {
                throw new Error("EOC is not supposed to be actual content.");
              }
            }
          } catch (e) {
            sub = null;
          }
        }
        if (sub === null) {
          if (len === null) {
            throw new Error("We can't skip over an invalid tag with undefined length at offset " + start);
          }
          stream.pos = start + Math.abs(len);
        }
        return new ASN12(streamStart, header, len, tag, sub);
      };
      return ASN12;
    }()
  );
  var ASN1Tag = (
    /** @class */
    function() {
      function ASN1Tag2(stream) {
        var buf = stream.get();
        this.tagClass = buf >> 6;
        this.tagConstructed = (buf & 32) !== 0;
        this.tagNumber = buf & 31;
        if (this.tagNumber == 31) {
          var n2 = new Int10();
          do {
            buf = stream.get();
            n2.mulAdd(128, buf & 127);
          } while (buf & 128);
          this.tagNumber = n2.simplify();
        }
      }
      ASN1Tag2.prototype.isUniversal = function() {
        return this.tagClass === 0;
      };
      ASN1Tag2.prototype.isEOC = function() {
        return this.tagClass === 0 && this.tagNumber === 0;
      };
      return ASN1Tag2;
    }()
  );
  var dbits;
  var canary = 244837814094590;
  var j_lm = (canary & 16777215) == 15715070;
  var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
  var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
  var BigInteger = (
    /** @class */
    function() {
      function BigInteger2(a2, b, c2) {
        if (a2 != null) {
          if ("number" == typeof a2) {
            this.fromNumber(a2, b, c2);
          } else if (b == null && "string" != typeof a2) {
            this.fromString(a2, 256);
          } else {
            this.fromString(a2, b);
          }
        }
      }
      BigInteger2.prototype.toString = function(b) {
        if (this.s < 0) {
          return "-" + this.negate().toString(b);
        }
        var k2;
        if (b == 16) {
          k2 = 4;
        } else if (b == 8) {
          k2 = 3;
        } else if (b == 2) {
          k2 = 1;
        } else if (b == 32) {
          k2 = 5;
        } else if (b == 4) {
          k2 = 2;
        } else {
          return this.toRadix(b);
        }
        var km = (1 << k2) - 1;
        var d2;
        var m2 = false;
        var r2 = "";
        var i2 = this.t;
        var p2 = this.DB - i2 * this.DB % k2;
        if (i2-- > 0) {
          if (p2 < this.DB && (d2 = this[i2] >> p2) > 0) {
            m2 = true;
            r2 = int2char(d2);
          }
          while (i2 >= 0) {
            if (p2 < k2) {
              d2 = (this[i2] & (1 << p2) - 1) << k2 - p2;
              d2 |= this[--i2] >> (p2 += this.DB - k2);
            } else {
              d2 = this[i2] >> (p2 -= k2) & km;
              if (p2 <= 0) {
                p2 += this.DB;
                --i2;
              }
            }
            if (d2 > 0) {
              m2 = true;
            }
            if (m2) {
              r2 += int2char(d2);
            }
          }
        }
        return m2 ? r2 : "0";
      };
      BigInteger2.prototype.negate = function() {
        var r2 = nbi();
        BigInteger2.ZERO.subTo(this, r2);
        return r2;
      };
      BigInteger2.prototype.abs = function() {
        return this.s < 0 ? this.negate() : this;
      };
      BigInteger2.prototype.compareTo = function(a2) {
        var r2 = this.s - a2.s;
        if (r2 != 0) {
          return r2;
        }
        var i2 = this.t;
        r2 = i2 - a2.t;
        if (r2 != 0) {
          return this.s < 0 ? -r2 : r2;
        }
        while (--i2 >= 0) {
          if ((r2 = this[i2] - a2[i2]) != 0) {
            return r2;
          }
        }
        return 0;
      };
      BigInteger2.prototype.bitLength = function() {
        if (this.t <= 0) {
          return 0;
        }
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
      };
      BigInteger2.prototype.mod = function(a2) {
        var r2 = nbi();
        this.abs().divRemTo(a2, null, r2);
        if (this.s < 0 && r2.compareTo(BigInteger2.ZERO) > 0) {
          a2.subTo(r2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.modPowInt = function(e, m2) {
        var z2;
        if (e < 256 || m2.isEven()) {
          z2 = new Classic(m2);
        } else {
          z2 = new Montgomery(m2);
        }
        return this.exp(e, z2);
      };
      BigInteger2.prototype.clone = function() {
        var r2 = nbi();
        this.copyTo(r2);
        return r2;
      };
      BigInteger2.prototype.intValue = function() {
        if (this.s < 0) {
          if (this.t == 1) {
            return this[0] - this.DV;
          } else if (this.t == 0) {
            return -1;
          }
        } else if (this.t == 1) {
          return this[0];
        } else if (this.t == 0) {
          return 0;
        }
        return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
      };
      BigInteger2.prototype.byteValue = function() {
        return this.t == 0 ? this.s : this[0] << 24 >> 24;
      };
      BigInteger2.prototype.shortValue = function() {
        return this.t == 0 ? this.s : this[0] << 16 >> 16;
      };
      BigInteger2.prototype.signum = function() {
        if (this.s < 0) {
          return -1;
        } else if (this.t <= 0 || this.t == 1 && this[0] <= 0) {
          return 0;
        } else {
          return 1;
        }
      };
      BigInteger2.prototype.toByteArray = function() {
        var i2 = this.t;
        var r2 = [];
        r2[0] = this.s;
        var p2 = this.DB - i2 * this.DB % 8;
        var d2;
        var k2 = 0;
        if (i2-- > 0) {
          if (p2 < this.DB && (d2 = this[i2] >> p2) != (this.s & this.DM) >> p2) {
            r2[k2++] = d2 | this.s << this.DB - p2;
          }
          while (i2 >= 0) {
            if (p2 < 8) {
              d2 = (this[i2] & (1 << p2) - 1) << 8 - p2;
              d2 |= this[--i2] >> (p2 += this.DB - 8);
            } else {
              d2 = this[i2] >> (p2 -= 8) & 255;
              if (p2 <= 0) {
                p2 += this.DB;
                --i2;
              }
            }
            if ((d2 & 128) != 0) {
              d2 |= -256;
            }
            if (k2 == 0 && (this.s & 128) != (d2 & 128)) {
              ++k2;
            }
            if (k2 > 0 || d2 != this.s) {
              r2[k2++] = d2;
            }
          }
        }
        return r2;
      };
      BigInteger2.prototype.equals = function(a2) {
        return this.compareTo(a2) == 0;
      };
      BigInteger2.prototype.min = function(a2) {
        return this.compareTo(a2) < 0 ? this : a2;
      };
      BigInteger2.prototype.max = function(a2) {
        return this.compareTo(a2) > 0 ? this : a2;
      };
      BigInteger2.prototype.and = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_and, r2);
        return r2;
      };
      BigInteger2.prototype.or = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_or, r2);
        return r2;
      };
      BigInteger2.prototype.xor = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_xor, r2);
        return r2;
      };
      BigInteger2.prototype.andNot = function(a2) {
        var r2 = nbi();
        this.bitwiseTo(a2, op_andnot, r2);
        return r2;
      };
      BigInteger2.prototype.not = function() {
        var r2 = nbi();
        for (var i2 = 0; i2 < this.t; ++i2) {
          r2[i2] = this.DM & ~this[i2];
        }
        r2.t = this.t;
        r2.s = ~this.s;
        return r2;
      };
      BigInteger2.prototype.shiftLeft = function(n2) {
        var r2 = nbi();
        if (n2 < 0) {
          this.rShiftTo(-n2, r2);
        } else {
          this.lShiftTo(n2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.shiftRight = function(n2) {
        var r2 = nbi();
        if (n2 < 0) {
          this.lShiftTo(-n2, r2);
        } else {
          this.rShiftTo(n2, r2);
        }
        return r2;
      };
      BigInteger2.prototype.getLowestSetBit = function() {
        for (var i2 = 0; i2 < this.t; ++i2) {
          if (this[i2] != 0) {
            return i2 * this.DB + lbit(this[i2]);
          }
        }
        if (this.s < 0) {
          return this.t * this.DB;
        }
        return -1;
      };
      BigInteger2.prototype.bitCount = function() {
        var r2 = 0;
        var x2 = this.s & this.DM;
        for (var i2 = 0; i2 < this.t; ++i2) {
          r2 += cbit(this[i2] ^ x2);
        }
        return r2;
      };
      BigInteger2.prototype.testBit = function(n2) {
        var j2 = Math.floor(n2 / this.DB);
        if (j2 >= this.t) {
          return this.s != 0;
        }
        return (this[j2] & 1 << n2 % this.DB) != 0;
      };
      BigInteger2.prototype.setBit = function(n2) {
        return this.changeBit(n2, op_or);
      };
      BigInteger2.prototype.clearBit = function(n2) {
        return this.changeBit(n2, op_andnot);
      };
      BigInteger2.prototype.flipBit = function(n2) {
        return this.changeBit(n2, op_xor);
      };
      BigInteger2.prototype.add = function(a2) {
        var r2 = nbi();
        this.addTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.subtract = function(a2) {
        var r2 = nbi();
        this.subTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.multiply = function(a2) {
        var r2 = nbi();
        this.multiplyTo(a2, r2);
        return r2;
      };
      BigInteger2.prototype.divide = function(a2) {
        var r2 = nbi();
        this.divRemTo(a2, r2, null);
        return r2;
      };
      BigInteger2.prototype.remainder = function(a2) {
        var r2 = nbi();
        this.divRemTo(a2, null, r2);
        return r2;
      };
      BigInteger2.prototype.divideAndRemainder = function(a2) {
        var q2 = nbi();
        var r2 = nbi();
        this.divRemTo(a2, q2, r2);
        return [q2, r2];
      };
      BigInteger2.prototype.modPow = function(e, m2) {
        var i2 = e.bitLength();
        var k2;
        var r2 = nbv(1);
        var z2;
        if (i2 <= 0) {
          return r2;
        } else if (i2 < 18) {
          k2 = 1;
        } else if (i2 < 48) {
          k2 = 3;
        } else if (i2 < 144) {
          k2 = 4;
        } else if (i2 < 768) {
          k2 = 5;
        } else {
          k2 = 6;
        }
        if (i2 < 8) {
          z2 = new Classic(m2);
        } else if (m2.isEven()) {
          z2 = new Barrett(m2);
        } else {
          z2 = new Montgomery(m2);
        }
        var g2 = [];
        var n2 = 3;
        var k1 = k2 - 1;
        var km = (1 << k2) - 1;
        g2[1] = z2.convert(this);
        if (k2 > 1) {
          var g22 = nbi();
          z2.sqrTo(g2[1], g22);
          while (n2 <= km) {
            g2[n2] = nbi();
            z2.mulTo(g22, g2[n2 - 2], g2[n2]);
            n2 += 2;
          }
        }
        var j2 = e.t - 1;
        var w;
        var is1 = true;
        var r22 = nbi();
        var t2;
        i2 = nbits(e[j2]) - 1;
        while (j2 >= 0) {
          if (i2 >= k1) {
            w = e[j2] >> i2 - k1 & km;
          } else {
            w = (e[j2] & (1 << i2 + 1) - 1) << k1 - i2;
            if (j2 > 0) {
              w |= e[j2 - 1] >> this.DB + i2 - k1;
            }
          }
          n2 = k2;
          while ((w & 1) == 0) {
            w >>= 1;
            --n2;
          }
          if ((i2 -= n2) < 0) {
            i2 += this.DB;
            --j2;
          }
          if (is1) {
            g2[w].copyTo(r2);
            is1 = false;
          } else {
            while (n2 > 1) {
              z2.sqrTo(r2, r22);
              z2.sqrTo(r22, r2);
              n2 -= 2;
            }
            if (n2 > 0) {
              z2.sqrTo(r2, r22);
            } else {
              t2 = r2;
              r2 = r22;
              r22 = t2;
            }
            z2.mulTo(r22, g2[w], r2);
          }
          while (j2 >= 0 && (e[j2] & 1 << i2) == 0) {
            z2.sqrTo(r2, r22);
            t2 = r2;
            r2 = r22;
            r22 = t2;
            if (--i2 < 0) {
              i2 = this.DB - 1;
              --j2;
            }
          }
        }
        return z2.revert(r2);
      };
      BigInteger2.prototype.modInverse = function(m2) {
        var ac = m2.isEven();
        if (this.isEven() && ac || m2.signum() == 0) {
          return BigInteger2.ZERO;
        }
        var u2 = m2.clone();
        var v2 = this.clone();
        var a2 = nbv(1);
        var b = nbv(0);
        var c2 = nbv(0);
        var d2 = nbv(1);
        while (u2.signum() != 0) {
          while (u2.isEven()) {
            u2.rShiftTo(1, u2);
            if (ac) {
              if (!a2.isEven() || !b.isEven()) {
                a2.addTo(this, a2);
                b.subTo(m2, b);
              }
              a2.rShiftTo(1, a2);
            } else if (!b.isEven()) {
              b.subTo(m2, b);
            }
            b.rShiftTo(1, b);
          }
          while (v2.isEven()) {
            v2.rShiftTo(1, v2);
            if (ac) {
              if (!c2.isEven() || !d2.isEven()) {
                c2.addTo(this, c2);
                d2.subTo(m2, d2);
              }
              c2.rShiftTo(1, c2);
            } else if (!d2.isEven()) {
              d2.subTo(m2, d2);
            }
            d2.rShiftTo(1, d2);
          }
          if (u2.compareTo(v2) >= 0) {
            u2.subTo(v2, u2);
            if (ac) {
              a2.subTo(c2, a2);
            }
            b.subTo(d2, b);
          } else {
            v2.subTo(u2, v2);
            if (ac) {
              c2.subTo(a2, c2);
            }
            d2.subTo(b, d2);
          }
        }
        if (v2.compareTo(BigInteger2.ONE) != 0) {
          return BigInteger2.ZERO;
        }
        if (d2.compareTo(m2) >= 0) {
          return d2.subtract(m2);
        }
        if (d2.signum() < 0) {
          d2.addTo(m2, d2);
        } else {
          return d2;
        }
        if (d2.signum() < 0) {
          return d2.add(m2);
        } else {
          return d2;
        }
      };
      BigInteger2.prototype.pow = function(e) {
        return this.exp(e, new NullExp());
      };
      BigInteger2.prototype.gcd = function(a2) {
        var x2 = this.s < 0 ? this.negate() : this.clone();
        var y2 = a2.s < 0 ? a2.negate() : a2.clone();
        if (x2.compareTo(y2) < 0) {
          var t2 = x2;
          x2 = y2;
          y2 = t2;
        }
        var i2 = x2.getLowestSetBit();
        var g2 = y2.getLowestSetBit();
        if (g2 < 0) {
          return x2;
        }
        if (i2 < g2) {
          g2 = i2;
        }
        if (g2 > 0) {
          x2.rShiftTo(g2, x2);
          y2.rShiftTo(g2, y2);
        }
        while (x2.signum() > 0) {
          if ((i2 = x2.getLowestSetBit()) > 0) {
            x2.rShiftTo(i2, x2);
          }
          if ((i2 = y2.getLowestSetBit()) > 0) {
            y2.rShiftTo(i2, y2);
          }
          if (x2.compareTo(y2) >= 0) {
            x2.subTo(y2, x2);
            x2.rShiftTo(1, x2);
          } else {
            y2.subTo(x2, y2);
            y2.rShiftTo(1, y2);
          }
        }
        if (g2 > 0) {
          y2.lShiftTo(g2, y2);
        }
        return y2;
      };
      BigInteger2.prototype.isProbablePrime = function(t2) {
        var i2;
        var x2 = this.abs();
        if (x2.t == 1 && x2[0] <= lowprimes[lowprimes.length - 1]) {
          for (i2 = 0; i2 < lowprimes.length; ++i2) {
            if (x2[0] == lowprimes[i2]) {
              return true;
            }
          }
          return false;
        }
        if (x2.isEven()) {
          return false;
        }
        i2 = 1;
        while (i2 < lowprimes.length) {
          var m2 = lowprimes[i2];
          var j2 = i2 + 1;
          while (j2 < lowprimes.length && m2 < lplim) {
            m2 *= lowprimes[j2++];
          }
          m2 = x2.modInt(m2);
          while (i2 < j2) {
            if (m2 % lowprimes[i2++] == 0) {
              return false;
            }
          }
        }
        return x2.millerRabin(t2);
      };
      BigInteger2.prototype.copyTo = function(r2) {
        for (var i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2] = this[i2];
        }
        r2.t = this.t;
        r2.s = this.s;
      };
      BigInteger2.prototype.fromInt = function(x2) {
        this.t = 1;
        this.s = x2 < 0 ? -1 : 0;
        if (x2 > 0) {
          this[0] = x2;
        } else if (x2 < -1) {
          this[0] = x2 + this.DV;
        } else {
          this.t = 0;
        }
      };
      BigInteger2.prototype.fromString = function(s2, b) {
        var k2;
        if (b == 16) {
          k2 = 4;
        } else if (b == 8) {
          k2 = 3;
        } else if (b == 256) {
          k2 = 8;
        } else if (b == 2) {
          k2 = 1;
        } else if (b == 32) {
          k2 = 5;
        } else if (b == 4) {
          k2 = 2;
        } else {
          this.fromRadix(s2, b);
          return;
        }
        this.t = 0;
        this.s = 0;
        var i2 = s2.length;
        var mi = false;
        var sh = 0;
        while (--i2 >= 0) {
          var x2 = k2 == 8 ? +s2[i2] & 255 : intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-") {
              mi = true;
            }
            continue;
          }
          mi = false;
          if (sh == 0) {
            this[this.t++] = x2;
          } else if (sh + k2 > this.DB) {
            this[this.t - 1] |= (x2 & (1 << this.DB - sh) - 1) << sh;
            this[this.t++] = x2 >> this.DB - sh;
          } else {
            this[this.t - 1] |= x2 << sh;
          }
          sh += k2;
          if (sh >= this.DB) {
            sh -= this.DB;
          }
        }
        if (k2 == 8 && (+s2[0] & 128) != 0) {
          this.s = -1;
          if (sh > 0) {
            this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh;
          }
        }
        this.clamp();
        if (mi) {
          BigInteger2.ZERO.subTo(this, this);
        }
      };
      BigInteger2.prototype.clamp = function() {
        var c2 = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == c2) {
          --this.t;
        }
      };
      BigInteger2.prototype.dlShiftTo = function(n2, r2) {
        var i2;
        for (i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2 + n2] = this[i2];
        }
        for (i2 = n2 - 1; i2 >= 0; --i2) {
          r2[i2] = 0;
        }
        r2.t = this.t + n2;
        r2.s = this.s;
      };
      BigInteger2.prototype.drShiftTo = function(n2, r2) {
        for (var i2 = n2; i2 < this.t; ++i2) {
          r2[i2 - n2] = this[i2];
        }
        r2.t = Math.max(this.t - n2, 0);
        r2.s = this.s;
      };
      BigInteger2.prototype.lShiftTo = function(n2, r2) {
        var bs2 = n2 % this.DB;
        var cbs = this.DB - bs2;
        var bm = (1 << cbs) - 1;
        var ds2 = Math.floor(n2 / this.DB);
        var c2 = this.s << bs2 & this.DM;
        for (var i2 = this.t - 1; i2 >= 0; --i2) {
          r2[i2 + ds2 + 1] = this[i2] >> cbs | c2;
          c2 = (this[i2] & bm) << bs2;
        }
        for (var i2 = ds2 - 1; i2 >= 0; --i2) {
          r2[i2] = 0;
        }
        r2[ds2] = c2;
        r2.t = this.t + ds2 + 1;
        r2.s = this.s;
        r2.clamp();
      };
      BigInteger2.prototype.rShiftTo = function(n2, r2) {
        r2.s = this.s;
        var ds2 = Math.floor(n2 / this.DB);
        if (ds2 >= this.t) {
          r2.t = 0;
          return;
        }
        var bs2 = n2 % this.DB;
        var cbs = this.DB - bs2;
        var bm = (1 << bs2) - 1;
        r2[0] = this[ds2] >> bs2;
        for (var i2 = ds2 + 1; i2 < this.t; ++i2) {
          r2[i2 - ds2 - 1] |= (this[i2] & bm) << cbs;
          r2[i2 - ds2] = this[i2] >> bs2;
        }
        if (bs2 > 0) {
          r2[this.t - ds2 - 1] |= (this.s & bm) << cbs;
        }
        r2.t = this.t - ds2;
        r2.clamp();
      };
      BigInteger2.prototype.subTo = function(a2, r2) {
        var i2 = 0;
        var c2 = 0;
        var m2 = Math.min(a2.t, this.t);
        while (i2 < m2) {
          c2 += this[i2] - a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        if (a2.t < this.t) {
          c2 -= a2.s;
          while (i2 < this.t) {
            c2 += this[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += this.s;
        } else {
          c2 += this.s;
          while (i2 < a2.t) {
            c2 -= a2[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 -= a2.s;
        }
        r2.s = c2 < 0 ? -1 : 0;
        if (c2 < -1) {
          r2[i2++] = this.DV + c2;
        } else if (c2 > 0) {
          r2[i2++] = c2;
        }
        r2.t = i2;
        r2.clamp();
      };
      BigInteger2.prototype.multiplyTo = function(a2, r2) {
        var x2 = this.abs();
        var y2 = a2.abs();
        var i2 = x2.t;
        r2.t = i2 + y2.t;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = 0; i2 < y2.t; ++i2) {
          r2[i2 + x2.t] = x2.am(0, y2[i2], r2, i2, 0, x2.t);
        }
        r2.s = 0;
        r2.clamp();
        if (this.s != a2.s) {
          BigInteger2.ZERO.subTo(r2, r2);
        }
      };
      BigInteger2.prototype.squareTo = function(r2) {
        var x2 = this.abs();
        var i2 = r2.t = 2 * x2.t;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = 0; i2 < x2.t - 1; ++i2) {
          var c2 = x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
          if ((r2[i2 + x2.t] += x2.am(i2 + 1, 2 * x2[i2], r2, 2 * i2 + 1, c2, x2.t - i2 - 1)) >= x2.DV) {
            r2[i2 + x2.t] -= x2.DV;
            r2[i2 + x2.t + 1] = 1;
          }
        }
        if (r2.t > 0) {
          r2[r2.t - 1] += x2.am(i2, x2[i2], r2, 2 * i2, 0, 1);
        }
        r2.s = 0;
        r2.clamp();
      };
      BigInteger2.prototype.divRemTo = function(m2, q2, r2) {
        var pm = m2.abs();
        if (pm.t <= 0) {
          return;
        }
        var pt2 = this.abs();
        if (pt2.t < pm.t) {
          if (q2 != null) {
            q2.fromInt(0);
          }
          if (r2 != null) {
            this.copyTo(r2);
          }
          return;
        }
        if (r2 == null) {
          r2 = nbi();
        }
        var y2 = nbi();
        var ts2 = this.s;
        var ms2 = m2.s;
        var nsh = this.DB - nbits(pm[pm.t - 1]);
        if (nsh > 0) {
          pm.lShiftTo(nsh, y2);
          pt2.lShiftTo(nsh, r2);
        } else {
          pm.copyTo(y2);
          pt2.copyTo(r2);
        }
        var ys2 = y2.t;
        var y0 = y2[ys2 - 1];
        if (y0 == 0) {
          return;
        }
        var yt2 = y0 * (1 << this.F1) + (ys2 > 1 ? y2[ys2 - 2] >> this.F2 : 0);
        var d1 = this.FV / yt2;
        var d2 = (1 << this.F1) / yt2;
        var e = 1 << this.F2;
        var i2 = r2.t;
        var j2 = i2 - ys2;
        var t2 = q2 == null ? nbi() : q2;
        y2.dlShiftTo(j2, t2);
        if (r2.compareTo(t2) >= 0) {
          r2[r2.t++] = 1;
          r2.subTo(t2, r2);
        }
        BigInteger2.ONE.dlShiftTo(ys2, t2);
        t2.subTo(y2, y2);
        while (y2.t < ys2) {
          y2[y2.t++] = 0;
        }
        while (--j2 >= 0) {
          var qd = r2[--i2] == y0 ? this.DM : Math.floor(r2[i2] * d1 + (r2[i2 - 1] + e) * d2);
          if ((r2[i2] += y2.am(0, qd, r2, j2, 0, ys2)) < qd) {
            y2.dlShiftTo(j2, t2);
            r2.subTo(t2, r2);
            while (r2[i2] < --qd) {
              r2.subTo(t2, r2);
            }
          }
        }
        if (q2 != null) {
          r2.drShiftTo(ys2, q2);
          if (ts2 != ms2) {
            BigInteger2.ZERO.subTo(q2, q2);
          }
        }
        r2.t = ys2;
        r2.clamp();
        if (nsh > 0) {
          r2.rShiftTo(nsh, r2);
        }
        if (ts2 < 0) {
          BigInteger2.ZERO.subTo(r2, r2);
        }
      };
      BigInteger2.prototype.invDigit = function() {
        if (this.t < 1) {
          return 0;
        }
        var x2 = this[0];
        if ((x2 & 1) == 0) {
          return 0;
        }
        var y2 = x2 & 3;
        y2 = y2 * (2 - (x2 & 15) * y2) & 15;
        y2 = y2 * (2 - (x2 & 255) * y2) & 255;
        y2 = y2 * (2 - ((x2 & 65535) * y2 & 65535)) & 65535;
        y2 = y2 * (2 - x2 * y2 % this.DV) % this.DV;
        return y2 > 0 ? this.DV - y2 : -y2;
      };
      BigInteger2.prototype.isEven = function() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0;
      };
      BigInteger2.prototype.exp = function(e, z2) {
        if (e > 4294967295 || e < 1) {
          return BigInteger2.ONE;
        }
        var r2 = nbi();
        var r22 = nbi();
        var g2 = z2.convert(this);
        var i2 = nbits(e) - 1;
        g2.copyTo(r2);
        while (--i2 >= 0) {
          z2.sqrTo(r2, r22);
          if ((e & 1 << i2) > 0) {
            z2.mulTo(r22, g2, r2);
          } else {
            var t2 = r2;
            r2 = r22;
            r22 = t2;
          }
        }
        return z2.revert(r2);
      };
      BigInteger2.prototype.chunkSize = function(r2) {
        return Math.floor(Math.LN2 * this.DB / Math.log(r2));
      };
      BigInteger2.prototype.toRadix = function(b) {
        if (b == null) {
          b = 10;
        }
        if (this.signum() == 0 || b < 2 || b > 36) {
          return "0";
        }
        var cs2 = this.chunkSize(b);
        var a2 = Math.pow(b, cs2);
        var d2 = nbv(a2);
        var y2 = nbi();
        var z2 = nbi();
        var r2 = "";
        this.divRemTo(d2, y2, z2);
        while (y2.signum() > 0) {
          r2 = (a2 + z2.intValue()).toString(b).substr(1) + r2;
          y2.divRemTo(d2, y2, z2);
        }
        return z2.intValue().toString(b) + r2;
      };
      BigInteger2.prototype.fromRadix = function(s2, b) {
        this.fromInt(0);
        if (b == null) {
          b = 10;
        }
        var cs2 = this.chunkSize(b);
        var d2 = Math.pow(b, cs2);
        var mi = false;
        var j2 = 0;
        var w = 0;
        for (var i2 = 0; i2 < s2.length; ++i2) {
          var x2 = intAt(s2, i2);
          if (x2 < 0) {
            if (s2.charAt(i2) == "-" && this.signum() == 0) {
              mi = true;
            }
            continue;
          }
          w = b * w + x2;
          if (++j2 >= cs2) {
            this.dMultiply(d2);
            this.dAddOffset(w, 0);
            j2 = 0;
            w = 0;
          }
        }
        if (j2 > 0) {
          this.dMultiply(Math.pow(b, j2));
          this.dAddOffset(w, 0);
        }
        if (mi) {
          BigInteger2.ZERO.subTo(this, this);
        }
      };
      BigInteger2.prototype.fromNumber = function(a2, b, c2) {
        if ("number" == typeof b) {
          if (a2 < 2) {
            this.fromInt(1);
          } else {
            this.fromNumber(a2, c2);
            if (!this.testBit(a2 - 1)) {
              this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
            }
            if (this.isEven()) {
              this.dAddOffset(1, 0);
            }
            while (!this.isProbablePrime(b)) {
              this.dAddOffset(2, 0);
              if (this.bitLength() > a2) {
                this.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), this);
              }
            }
          }
        } else {
          var x2 = [];
          var t2 = a2 & 7;
          x2.length = (a2 >> 3) + 1;
          b.nextBytes(x2);
          if (t2 > 0) {
            x2[0] &= (1 << t2) - 1;
          } else {
            x2[0] = 0;
          }
          this.fromString(x2, 256);
        }
      };
      BigInteger2.prototype.bitwiseTo = function(a2, op, r2) {
        var i2;
        var f2;
        var m2 = Math.min(a2.t, this.t);
        for (i2 = 0; i2 < m2; ++i2) {
          r2[i2] = op(this[i2], a2[i2]);
        }
        if (a2.t < this.t) {
          f2 = a2.s & this.DM;
          for (i2 = m2; i2 < this.t; ++i2) {
            r2[i2] = op(this[i2], f2);
          }
          r2.t = this.t;
        } else {
          f2 = this.s & this.DM;
          for (i2 = m2; i2 < a2.t; ++i2) {
            r2[i2] = op(f2, a2[i2]);
          }
          r2.t = a2.t;
        }
        r2.s = op(this.s, a2.s);
        r2.clamp();
      };
      BigInteger2.prototype.changeBit = function(n2, op) {
        var r2 = BigInteger2.ONE.shiftLeft(n2);
        this.bitwiseTo(r2, op, r2);
        return r2;
      };
      BigInteger2.prototype.addTo = function(a2, r2) {
        var i2 = 0;
        var c2 = 0;
        var m2 = Math.min(a2.t, this.t);
        while (i2 < m2) {
          c2 += this[i2] + a2[i2];
          r2[i2++] = c2 & this.DM;
          c2 >>= this.DB;
        }
        if (a2.t < this.t) {
          c2 += a2.s;
          while (i2 < this.t) {
            c2 += this[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += this.s;
        } else {
          c2 += this.s;
          while (i2 < a2.t) {
            c2 += a2[i2];
            r2[i2++] = c2 & this.DM;
            c2 >>= this.DB;
          }
          c2 += a2.s;
        }
        r2.s = c2 < 0 ? -1 : 0;
        if (c2 > 0) {
          r2[i2++] = c2;
        } else if (c2 < -1) {
          r2[i2++] = this.DV + c2;
        }
        r2.t = i2;
        r2.clamp();
      };
      BigInteger2.prototype.dMultiply = function(n2) {
        this[this.t] = this.am(0, n2 - 1, this, 0, 0, this.t);
        ++this.t;
        this.clamp();
      };
      BigInteger2.prototype.dAddOffset = function(n2, w) {
        if (n2 == 0) {
          return;
        }
        while (this.t <= w) {
          this[this.t++] = 0;
        }
        this[w] += n2;
        while (this[w] >= this.DV) {
          this[w] -= this.DV;
          if (++w >= this.t) {
            this[this.t++] = 0;
          }
          ++this[w];
        }
      };
      BigInteger2.prototype.multiplyLowerTo = function(a2, n2, r2) {
        var i2 = Math.min(this.t + a2.t, n2);
        r2.s = 0;
        r2.t = i2;
        while (i2 > 0) {
          r2[--i2] = 0;
        }
        for (var j2 = r2.t - this.t; i2 < j2; ++i2) {
          r2[i2 + this.t] = this.am(0, a2[i2], r2, i2, 0, this.t);
        }
        for (var j2 = Math.min(a2.t, n2); i2 < j2; ++i2) {
          this.am(0, a2[i2], r2, i2, 0, n2 - i2);
        }
        r2.clamp();
      };
      BigInteger2.prototype.multiplyUpperTo = function(a2, n2, r2) {
        --n2;
        var i2 = r2.t = this.t + a2.t - n2;
        r2.s = 0;
        while (--i2 >= 0) {
          r2[i2] = 0;
        }
        for (i2 = Math.max(n2 - this.t, 0); i2 < a2.t; ++i2) {
          r2[this.t + i2 - n2] = this.am(n2 - i2, a2[i2], r2, 0, 0, this.t + i2 - n2);
        }
        r2.clamp();
        r2.drShiftTo(1, r2);
      };
      BigInteger2.prototype.modInt = function(n2) {
        if (n2 <= 0) {
          return 0;
        }
        var d2 = this.DV % n2;
        var r2 = this.s < 0 ? n2 - 1 : 0;
        if (this.t > 0) {
          if (d2 == 0) {
            r2 = this[0] % n2;
          } else {
            for (var i2 = this.t - 1; i2 >= 0; --i2) {
              r2 = (d2 * r2 + this[i2]) % n2;
            }
          }
        }
        return r2;
      };
      BigInteger2.prototype.millerRabin = function(t2) {
        var n1 = this.subtract(BigInteger2.ONE);
        var k2 = n1.getLowestSetBit();
        if (k2 <= 0) {
          return false;
        }
        var r2 = n1.shiftRight(k2);
        t2 = t2 + 1 >> 1;
        if (t2 > lowprimes.length) {
          t2 = lowprimes.length;
        }
        var a2 = nbi();
        for (var i2 = 0; i2 < t2; ++i2) {
          a2.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
          var y2 = a2.modPow(r2, this);
          if (y2.compareTo(BigInteger2.ONE) != 0 && y2.compareTo(n1) != 0) {
            var j2 = 1;
            while (j2++ < k2 && y2.compareTo(n1) != 0) {
              y2 = y2.modPowInt(2, this);
              if (y2.compareTo(BigInteger2.ONE) == 0) {
                return false;
              }
            }
            if (y2.compareTo(n1) != 0) {
              return false;
            }
          }
        }
        return true;
      };
      BigInteger2.prototype.square = function() {
        var r2 = nbi();
        this.squareTo(r2);
        return r2;
      };
      BigInteger2.prototype.gcda = function(a2, callback) {
        var x2 = this.s < 0 ? this.negate() : this.clone();
        var y2 = a2.s < 0 ? a2.negate() : a2.clone();
        if (x2.compareTo(y2) < 0) {
          var t2 = x2;
          x2 = y2;
          y2 = t2;
        }
        var i2 = x2.getLowestSetBit();
        var g2 = y2.getLowestSetBit();
        if (g2 < 0) {
          callback(x2);
          return;
        }
        if (i2 < g2) {
          g2 = i2;
        }
        if (g2 > 0) {
          x2.rShiftTo(g2, x2);
          y2.rShiftTo(g2, y2);
        }
        var gcda1 = function() {
          if ((i2 = x2.getLowestSetBit()) > 0) {
            x2.rShiftTo(i2, x2);
          }
          if ((i2 = y2.getLowestSetBit()) > 0) {
            y2.rShiftTo(i2, y2);
          }
          if (x2.compareTo(y2) >= 0) {
            x2.subTo(y2, x2);
            x2.rShiftTo(1, x2);
          } else {
            y2.subTo(x2, y2);
            y2.rShiftTo(1, y2);
          }
          if (!(x2.signum() > 0)) {
            if (g2 > 0) {
              y2.lShiftTo(g2, y2);
            }
            setTimeout(function() {
              callback(y2);
            }, 0);
          } else {
            setTimeout(gcda1, 0);
          }
        };
        setTimeout(gcda1, 10);
      };
      BigInteger2.prototype.fromNumberAsync = function(a2, b, c2, callback) {
        if ("number" == typeof b) {
          if (a2 < 2) {
            this.fromInt(1);
          } else {
            this.fromNumber(a2, c2);
            if (!this.testBit(a2 - 1)) {
              this.bitwiseTo(BigInteger2.ONE.shiftLeft(a2 - 1), op_or, this);
            }
            if (this.isEven()) {
              this.dAddOffset(1, 0);
            }
            var bnp_1 = this;
            var bnpfn1_1 = function() {
              bnp_1.dAddOffset(2, 0);
              if (bnp_1.bitLength() > a2) {
                bnp_1.subTo(BigInteger2.ONE.shiftLeft(a2 - 1), bnp_1);
              }
              if (bnp_1.isProbablePrime(b)) {
                setTimeout(function() {
                  callback();
                }, 0);
              } else {
                setTimeout(bnpfn1_1, 0);
              }
            };
            setTimeout(bnpfn1_1, 0);
          }
        } else {
          var x2 = [];
          var t2 = a2 & 7;
          x2.length = (a2 >> 3) + 1;
          b.nextBytes(x2);
          if (t2 > 0) {
            x2[0] &= (1 << t2) - 1;
          } else {
            x2[0] = 0;
          }
          this.fromString(x2, 256);
        }
      };
      return BigInteger2;
    }()
  );
  var NullExp = (
    /** @class */
    function() {
      function NullExp2() {
      }
      NullExp2.prototype.convert = function(x2) {
        return x2;
      };
      NullExp2.prototype.revert = function(x2) {
        return x2;
      };
      NullExp2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
      };
      NullExp2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
      };
      return NullExp2;
    }()
  );
  var Classic = (
    /** @class */
    function() {
      function Classic2(m2) {
        this.m = m2;
      }
      Classic2.prototype.convert = function(x2) {
        if (x2.s < 0 || x2.compareTo(this.m) >= 0) {
          return x2.mod(this.m);
        } else {
          return x2;
        }
      };
      Classic2.prototype.revert = function(x2) {
        return x2;
      };
      Classic2.prototype.reduce = function(x2) {
        x2.divRemTo(this.m, null, x2);
      };
      Classic2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Classic2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Classic2;
    }()
  );
  var Montgomery = (
    /** @class */
    function() {
      function Montgomery2(m2) {
        this.m = m2;
        this.mp = m2.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << m2.DB - 15) - 1;
        this.mt2 = 2 * m2.t;
      }
      Montgomery2.prototype.convert = function(x2) {
        var r2 = nbi();
        x2.abs().dlShiftTo(this.m.t, r2);
        r2.divRemTo(this.m, null, r2);
        if (x2.s < 0 && r2.compareTo(BigInteger.ZERO) > 0) {
          this.m.subTo(r2, r2);
        }
        return r2;
      };
      Montgomery2.prototype.revert = function(x2) {
        var r2 = nbi();
        x2.copyTo(r2);
        this.reduce(r2);
        return r2;
      };
      Montgomery2.prototype.reduce = function(x2) {
        while (x2.t <= this.mt2) {
          x2[x2.t++] = 0;
        }
        for (var i2 = 0; i2 < this.m.t; ++i2) {
          var j2 = x2[i2] & 32767;
          var u0 = j2 * this.mpl + ((j2 * this.mph + (x2[i2] >> 15) * this.mpl & this.um) << 15) & x2.DM;
          j2 = i2 + this.m.t;
          x2[j2] += this.m.am(0, u0, x2, i2, 0, this.m.t);
          while (x2[j2] >= x2.DV) {
            x2[j2] -= x2.DV;
            x2[++j2]++;
          }
        }
        x2.clamp();
        x2.drShiftTo(this.m.t, x2);
        if (x2.compareTo(this.m) >= 0) {
          x2.subTo(this.m, x2);
        }
      };
      Montgomery2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Montgomery2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Montgomery2;
    }()
  );
  var Barrett = (
    /** @class */
    function() {
      function Barrett2(m2) {
        this.m = m2;
        this.r2 = nbi();
        this.q3 = nbi();
        BigInteger.ONE.dlShiftTo(2 * m2.t, this.r2);
        this.mu = this.r2.divide(m2);
      }
      Barrett2.prototype.convert = function(x2) {
        if (x2.s < 0 || x2.t > 2 * this.m.t) {
          return x2.mod(this.m);
        } else if (x2.compareTo(this.m) < 0) {
          return x2;
        } else {
          var r2 = nbi();
          x2.copyTo(r2);
          this.reduce(r2);
          return r2;
        }
      };
      Barrett2.prototype.revert = function(x2) {
        return x2;
      };
      Barrett2.prototype.reduce = function(x2) {
        x2.drShiftTo(this.m.t - 1, this.r2);
        if (x2.t > this.m.t + 1) {
          x2.t = this.m.t + 1;
          x2.clamp();
        }
        this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
        this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
        while (x2.compareTo(this.r2) < 0) {
          x2.dAddOffset(1, this.m.t + 1);
        }
        x2.subTo(this.r2, x2);
        while (x2.compareTo(this.m) >= 0) {
          x2.subTo(this.m, x2);
        }
      };
      Barrett2.prototype.mulTo = function(x2, y2, r2) {
        x2.multiplyTo(y2, r2);
        this.reduce(r2);
      };
      Barrett2.prototype.sqrTo = function(x2, r2) {
        x2.squareTo(r2);
        this.reduce(r2);
      };
      return Barrett2;
    }()
  );
  function nbi() {
    return new BigInteger(null);
  }
  function parseBigInt(str, r2) {
    return new BigInteger(str, r2);
  }
  var inBrowser = typeof navigator !== "undefined";
  if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
    BigInteger.prototype.am = function am2(i2, x2, w, j2, c2, n2) {
      var xl = x2 & 32767;
      var xh = x2 >> 15;
      while (--n2 >= 0) {
        var l2 = this[i2] & 32767;
        var h2 = this[i2++] >> 15;
        var m2 = xh * l2 + h2 * xl;
        l2 = xl * l2 + ((m2 & 32767) << 15) + w[j2] + (c2 & 1073741823);
        c2 = (l2 >>> 30) + (m2 >>> 15) + xh * h2 + (c2 >>> 30);
        w[j2++] = l2 & 1073741823;
      }
      return c2;
    };
    dbits = 30;
  } else if (inBrowser && j_lm && navigator.appName != "Netscape") {
    BigInteger.prototype.am = function am1(i2, x2, w, j2, c2, n2) {
      while (--n2 >= 0) {
        var v2 = x2 * this[i2++] + w[j2] + c2;
        c2 = Math.floor(v2 / 67108864);
        w[j2++] = v2 & 67108863;
      }
      return c2;
    };
    dbits = 26;
  } else {
    BigInteger.prototype.am = function am3(i2, x2, w, j2, c2, n2) {
      var xl = x2 & 16383;
      var xh = x2 >> 14;
      while (--n2 >= 0) {
        var l2 = this[i2] & 16383;
        var h2 = this[i2++] >> 14;
        var m2 = xh * l2 + h2 * xl;
        l2 = xl * l2 + ((m2 & 16383) << 14) + w[j2] + c2;
        c2 = (l2 >> 28) + (m2 >> 14) + xh * h2;
        w[j2++] = l2 & 268435455;
      }
      return c2;
    };
    dbits = 28;
  }
  BigInteger.prototype.DB = dbits;
  BigInteger.prototype.DM = (1 << dbits) - 1;
  BigInteger.prototype.DV = 1 << dbits;
  var BI_FP = 52;
  BigInteger.prototype.FV = Math.pow(2, BI_FP);
  BigInteger.prototype.F1 = BI_FP - dbits;
  BigInteger.prototype.F2 = 2 * dbits - BI_FP;
  var BI_RC = [];
  var rr;
  var vv;
  rr = "0".charCodeAt(0);
  for (vv = 0; vv <= 9; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "a".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  rr = "A".charCodeAt(0);
  for (vv = 10; vv < 36; ++vv) {
    BI_RC[rr++] = vv;
  }
  function intAt(s2, i2) {
    var c2 = BI_RC[s2.charCodeAt(i2)];
    return c2 == null ? -1 : c2;
  }
  function nbv(i2) {
    var r2 = nbi();
    r2.fromInt(i2);
    return r2;
  }
  function nbits(x2) {
    var r2 = 1;
    var t2;
    if ((t2 = x2 >>> 16) != 0) {
      x2 = t2;
      r2 += 16;
    }
    if ((t2 = x2 >> 8) != 0) {
      x2 = t2;
      r2 += 8;
    }
    if ((t2 = x2 >> 4) != 0) {
      x2 = t2;
      r2 += 4;
    }
    if ((t2 = x2 >> 2) != 0) {
      x2 = t2;
      r2 += 2;
    }
    if ((t2 = x2 >> 1) != 0) {
      x2 = t2;
      r2 += 1;
    }
    return r2;
  }
  BigInteger.ZERO = nbv(0);
  BigInteger.ONE = nbv(1);
  var lookup = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    62,
    0,
    62,
    0,
    63,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    0,
    0,
    0,
    0,
    63,
    0,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51
  ];
  function base64Decode(source, target) {
    var sourceLength = source.length;
    var paddingLength = source[sourceLength - 2] === "=" ? 2 : source[sourceLength - 1] === "=" ? 1 : 0;
    var tmp;
    var byteIndex = 0;
    var baseLength = sourceLength - paddingLength & 4294967292;
    for (var i2 = 0; i2 < baseLength; i2 += 4) {
      tmp = lookup[source.charCodeAt(i2)] << 18 | lookup[source.charCodeAt(i2 + 1)] << 12 | lookup[source.charCodeAt(i2 + 2)] << 6 | lookup[source.charCodeAt(i2 + 3)];
      target[byteIndex++] = tmp >> 16 & 255;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 1) {
      tmp = lookup[source.charCodeAt(i2)] << 10 | lookup[source.charCodeAt(i2 + 1)] << 4 | lookup[source.charCodeAt(i2 + 2)] >> 2;
      target[byteIndex++] = tmp >> 8 & 255;
      target[byteIndex++] = tmp & 255;
    }
    if (paddingLength === 2) {
      tmp = lookup[source.charCodeAt(i2)] << 2 | lookup[source.charCodeAt(i2 + 1)] >> 4;
      target[byteIndex++] = tmp & 255;
    }
  }
  const $inject_window_crypto = {
    getRandomValues(arr) {
      if (!(arr instanceof Int8Array || arr instanceof Uint8Array || arr instanceof Int16Array || arr instanceof Uint16Array || arr instanceof Int32Array || arr instanceof Uint32Array || arr instanceof Uint8ClampedArray)) {
        throw new Error("Expected an integer array");
      }
      if (arr.byteLength > 65536) {
        throw new Error("Can only request a maximum of 65536 bytes");
      }
      var crypto = requireNativePlugin("DCloud-Crypto");
      base64Decode(crypto.getRandomValues(arr.byteLength), new Uint8Array(
        arr.buffer,
        arr.byteOffset,
        arr.byteLength
      ));
      return arr;
    }
  };
  var Arcfour = (
    /** @class */
    function() {
      function Arcfour2() {
        this.i = 0;
        this.j = 0;
        this.S = [];
      }
      Arcfour2.prototype.init = function(key) {
        var i2;
        var j2;
        var t2;
        for (i2 = 0; i2 < 256; ++i2) {
          this.S[i2] = i2;
        }
        j2 = 0;
        for (i2 = 0; i2 < 256; ++i2) {
          j2 = j2 + this.S[i2] + key[i2 % key.length] & 255;
          t2 = this.S[i2];
          this.S[i2] = this.S[j2];
          this.S[j2] = t2;
        }
        this.i = 0;
        this.j = 0;
      };
      Arcfour2.prototype.next = function() {
        var t2;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        t2 = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = t2;
        return this.S[t2 + this.S[this.i] & 255];
      };
      return Arcfour2;
    }()
  );
  function prng_newstate() {
    return new Arcfour();
  }
  var rng_psize = 256;
  var rng_state;
  var rng_pool = null;
  var rng_pptr;
  if (rng_pool == null) {
    rng_pool = [];
    rng_pptr = 0;
    var t$1 = void 0;
    if (typeof window !== "undefined" && $inject_window_crypto && $inject_window_crypto.getRandomValues) {
      var z$1 = new Uint32Array(256);
      $inject_window_crypto.getRandomValues(z$1);
      for (t$1 = 0; t$1 < z$1.length; ++t$1) {
        rng_pool[rng_pptr++] = z$1[t$1] & 255;
      }
    }
    var count = 0;
    var onMouseMoveListener_1 = function(ev) {
      count = count || 0;
      if (count >= 256 || rng_pptr >= rng_psize) {
        if (window.removeEventListener) {
          window.removeEventListener("mousemove", onMouseMoveListener_1, false);
        } else if (window.detachEvent) {
          window.detachEvent("onmousemove", onMouseMoveListener_1);
        }
        return;
      }
      try {
        var mouseCoordinates = ev.x + ev.y;
        rng_pool[rng_pptr++] = mouseCoordinates & 255;
        count += 1;
      } catch (e) {
      }
    };
    if (typeof window !== "undefined") {
      if (window.addEventListener) {
        window.addEventListener("mousemove", onMouseMoveListener_1, false);
      } else if (window.attachEvent) {
        window.attachEvent("onmousemove", onMouseMoveListener_1);
      }
    }
  }
  function rng_get_byte() {
    if (rng_state == null) {
      rng_state = prng_newstate();
      while (rng_pptr < rng_psize) {
        var random = Math.floor(65536 * Math.random());
        rng_pool[rng_pptr++] = random & 255;
      }
      rng_state.init(rng_pool);
      for (rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) {
        rng_pool[rng_pptr] = 0;
      }
      rng_pptr = 0;
    }
    return rng_state.next();
  }
  var SecureRandom = (
    /** @class */
    function() {
      function SecureRandom2() {
      }
      SecureRandom2.prototype.nextBytes = function(ba) {
        for (var i2 = 0; i2 < ba.length; ++i2) {
          ba[i2] = rng_get_byte();
        }
      };
      return SecureRandom2;
    }()
  );
  function pkcs1pad1(s2, n2) {
    if (n2 < s2.length + 22) {
      formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:23", "Message too long for RSA");
      return null;
    }
    var len = n2 - s2.length - 6;
    var filler = "";
    for (var f2 = 0; f2 < len; f2 += 2) {
      filler += "ff";
    }
    var m2 = "0001" + filler + "00" + s2;
    return parseBigInt(m2, 16);
  }
  function pkcs1pad2(s2, n2) {
    if (n2 < s2.length + 11) {
      formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:37", "Message too long for RSA");
      return null;
    }
    var ba = [];
    var i2 = s2.length - 1;
    while (i2 >= 0 && n2 > 0) {
      var c2 = s2.charCodeAt(i2--);
      if (c2 < 128) {
        ba[--n2] = c2;
      } else if (c2 > 127 && c2 < 2048) {
        ba[--n2] = c2 & 63 | 128;
        ba[--n2] = c2 >> 6 | 192;
      } else {
        ba[--n2] = c2 & 63 | 128;
        ba[--n2] = c2 >> 6 & 63 | 128;
        ba[--n2] = c2 >> 12 | 224;
      }
    }
    ba[--n2] = 0;
    var rng = new SecureRandom();
    var x2 = [];
    while (n2 > 2) {
      x2[0] = 0;
      while (x2[0] == 0) {
        rng.nextBytes(x2);
      }
      ba[--n2] = x2[0];
    }
    ba[--n2] = 2;
    ba[--n2] = 0;
    return new BigInteger(ba);
  }
  var RSAKey = (
    /** @class */
    function() {
      function RSAKey2() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null;
      }
      RSAKey2.prototype.doPublic = function(x2) {
        return x2.modPowInt(this.e, this.n);
      };
      RSAKey2.prototype.doPrivate = function(x2) {
        if (this.p == null || this.q == null) {
          return x2.modPow(this.d, this.n);
        }
        var xp = x2.mod(this.p).modPow(this.dmp1, this.p);
        var xq = x2.mod(this.q).modPow(this.dmq1, this.q);
        while (xp.compareTo(xq) < 0) {
          xp = xp.add(this.p);
        }
        return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
      };
      RSAKey2.prototype.setPublic = function(N2, E2) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:114", "Invalid RSA public key");
        }
      };
      RSAKey2.prototype.encrypt = function(text) {
        var maxLength = this.n.bitLength() + 7 >> 3;
        var m2 = pkcs1pad2(text, maxLength);
        if (m2 == null) {
          return null;
        }
        var c2 = this.doPublic(m2);
        if (c2 == null) {
          return null;
        }
        var h2 = c2.toString(16);
        var length = h2.length;
        for (var i2 = 0; i2 < maxLength * 2 - length; i2++) {
          h2 = "0" + h2;
        }
        return h2;
      };
      RSAKey2.prototype.setPrivate = function(N2, E2, D2) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
          this.d = parseBigInt(D2, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:146", "Invalid RSA private key");
        }
      };
      RSAKey2.prototype.setPrivateEx = function(N2, E2, D2, P2, Q2, DP, DQ, C2) {
        if (N2 != null && E2 != null && N2.length > 0 && E2.length > 0) {
          this.n = parseBigInt(N2, 16);
          this.e = parseInt(E2, 16);
          this.d = parseBigInt(D2, 16);
          this.p = parseBigInt(P2, 16);
          this.q = parseBigInt(Q2, 16);
          this.dmp1 = parseBigInt(DP, 16);
          this.dmq1 = parseBigInt(DQ, 16);
          this.coeff = parseBigInt(C2, 16);
        } else {
          formatAppLog("error", "at node_modules/jsencrypt/lib/lib/jsbn/rsa.js:163", "Invalid RSA private key");
        }
      };
      RSAKey2.prototype.generate = function(B2, E2) {
        var rng = new SecureRandom();
        var qs = B2 >> 1;
        this.e = parseInt(E2, 16);
        var ee2 = new BigInteger(E2, 16);
        for (; ; ) {
          for (; ; ) {
            this.p = new BigInteger(B2 - qs, 1, rng);
            if (this.p.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) {
              break;
            }
          }
          for (; ; ) {
            this.q = new BigInteger(qs, 1, rng);
            if (this.q.subtract(BigInteger.ONE).gcd(ee2).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) {
              break;
            }
          }
          if (this.p.compareTo(this.q) <= 0) {
            var t2 = this.p;
            this.p = this.q;
            this.q = t2;
          }
          var p1 = this.p.subtract(BigInteger.ONE);
          var q1 = this.q.subtract(BigInteger.ONE);
          var phi = p1.multiply(q1);
          if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
            this.n = this.p.multiply(this.q);
            this.d = ee2.modInverse(phi);
            this.dmp1 = this.d.mod(p1);
            this.dmq1 = this.d.mod(q1);
            this.coeff = this.q.modInverse(this.p);
            break;
          }
        }
      };
      RSAKey2.prototype.decrypt = function(ctext) {
        var c2 = parseBigInt(ctext, 16);
        var m2 = this.doPrivate(c2);
        if (m2 == null) {
          return null;
        }
        return pkcs1unpad2(m2, this.n.bitLength() + 7 >> 3);
      };
      RSAKey2.prototype.generateAsync = function(B2, E2, callback) {
        var rng = new SecureRandom();
        var qs = B2 >> 1;
        this.e = parseInt(E2, 16);
        var ee2 = new BigInteger(E2, 16);
        var rsa = this;
        var loop1 = function() {
          var loop4 = function() {
            if (rsa.p.compareTo(rsa.q) <= 0) {
              var t2 = rsa.p;
              rsa.p = rsa.q;
              rsa.q = t2;
            }
            var p1 = rsa.p.subtract(BigInteger.ONE);
            var q1 = rsa.q.subtract(BigInteger.ONE);
            var phi = p1.multiply(q1);
            if (phi.gcd(ee2).compareTo(BigInteger.ONE) == 0) {
              rsa.n = rsa.p.multiply(rsa.q);
              rsa.d = ee2.modInverse(phi);
              rsa.dmp1 = rsa.d.mod(p1);
              rsa.dmq1 = rsa.d.mod(q1);
              rsa.coeff = rsa.q.modInverse(rsa.p);
              setTimeout(function() {
                callback();
              }, 0);
            } else {
              setTimeout(loop1, 0);
            }
          };
          var loop3 = function() {
            rsa.q = nbi();
            rsa.q.fromNumberAsync(qs, 1, rng, function() {
              rsa.q.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
                if (r2.compareTo(BigInteger.ONE) == 0 && rsa.q.isProbablePrime(10)) {
                  setTimeout(loop4, 0);
                } else {
                  setTimeout(loop3, 0);
                }
              });
            });
          };
          var loop2 = function() {
            rsa.p = nbi();
            rsa.p.fromNumberAsync(B2 - qs, 1, rng, function() {
              rsa.p.subtract(BigInteger.ONE).gcda(ee2, function(r2) {
                if (r2.compareTo(BigInteger.ONE) == 0 && rsa.p.isProbablePrime(10)) {
                  setTimeout(loop3, 0);
                } else {
                  setTimeout(loop2, 0);
                }
              });
            });
          };
          setTimeout(loop2, 0);
        };
        setTimeout(loop1, 0);
      };
      RSAKey2.prototype.sign = function(text, digestMethod, digestName) {
        var header = getDigestHeader(digestName);
        var digest = header + digestMethod(text).toString();
        var m2 = pkcs1pad1(digest, this.n.bitLength() / 4);
        if (m2 == null) {
          return null;
        }
        var c2 = this.doPrivate(m2);
        if (c2 == null) {
          return null;
        }
        var h2 = c2.toString(16);
        if ((h2.length & 1) == 0) {
          return h2;
        } else {
          return "0" + h2;
        }
      };
      RSAKey2.prototype.verify = function(text, signature, digestMethod) {
        var c2 = parseBigInt(signature, 16);
        var m2 = this.doPublic(c2);
        if (m2 == null) {
          return null;
        }
        var unpadded = m2.toString(16).replace(/^1f+00/, "");
        var digest = removeDigestHeader(unpadded);
        return digest == digestMethod(text).toString();
      };
      return RSAKey2;
    }()
  );
  function pkcs1unpad2(d2, n2) {
    var b = d2.toByteArray();
    var i2 = 0;
    while (i2 < b.length && b[i2] == 0) {
      ++i2;
    }
    if (b.length - i2 != n2 - 1 || b[i2] != 2) {
      return null;
    }
    ++i2;
    while (b[i2] != 0) {
      if (++i2 >= b.length) {
        return null;
      }
    }
    var ret = "";
    while (++i2 < b.length) {
      var c2 = b[i2] & 255;
      if (c2 < 128) {
        ret += String.fromCharCode(c2);
      } else if (c2 > 191 && c2 < 224) {
        ret += String.fromCharCode((c2 & 31) << 6 | b[i2 + 1] & 63);
        ++i2;
      } else {
        ret += String.fromCharCode((c2 & 15) << 12 | (b[i2 + 1] & 63) << 6 | b[i2 + 2] & 63);
        i2 += 2;
      }
    }
    return ret;
  }
  var DIGEST_HEADERS = {
    md2: "3020300c06082a864886f70d020205000410",
    md5: "3020300c06082a864886f70d020505000410",
    sha1: "3021300906052b0e03021a05000414",
    sha224: "302d300d06096086480165030402040500041c",
    sha256: "3031300d060960864801650304020105000420",
    sha384: "3041300d060960864801650304020205000430",
    sha512: "3051300d060960864801650304020305000440",
    ripemd160: "3021300906052b2403020105000414"
  };
  function getDigestHeader(name) {
    return DIGEST_HEADERS[name] || "";
  }
  function removeDigestHeader(str) {
    for (var name_1 in DIGEST_HEADERS) {
      if (DIGEST_HEADERS.hasOwnProperty(name_1)) {
        var header = DIGEST_HEADERS[name_1];
        var len = header.length;
        if (str.substr(0, len) == header) {
          return str.substr(len);
        }
      }
    }
    return str;
  }
  /*!
  Copyright (c) 2011, Yahoo! Inc. All rights reserved.
  Code licensed under the BSD License:
  http://developer.yahoo.com/yui/license.html
  version: 2.9.0
  */
  var YAHOO = {};
  YAHOO.lang = {
    /**
     * Utility to set up the prototype, constructor and superclass properties to
     * support an inheritance strategy that can chain constructors and methods.
     * Static members will not be inherited.
     *
     * @method extend
     * @static
     * @param {Function} subc   the object to modify
     * @param {Function} superc the object to inherit
     * @param {Object} overrides  additional properties/methods to add to the
     *                              subclass prototype.  These will override the
     *                              matching items obtained from the superclass
     *                              if present.
     */
    extend: function(subc, superc, overrides) {
      if (!superc || !subc) {
        throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
      }
      var F2 = function() {
      };
      F2.prototype = superc.prototype;
      subc.prototype = new F2();
      subc.prototype.constructor = subc;
      subc.superclass = superc.prototype;
      if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
      }
      if (overrides) {
        var i2;
        for (i2 in overrides) {
          subc.prototype[i2] = overrides[i2];
        }
        var _IEEnumFix = function() {
        }, ADD = ["toString", "valueOf"];
        try {
          if (/MSIE/.test(navigator.userAgent)) {
            _IEEnumFix = function(r2, s2) {
              for (i2 = 0; i2 < ADD.length; i2 = i2 + 1) {
                var fname = ADD[i2], f2 = s2[fname];
                if (typeof f2 === "function" && f2 != Object.prototype[fname]) {
                  r2[fname] = f2;
                }
              }
            };
          }
        } catch (ex) {
        }
        _IEEnumFix(subc.prototype, overrides);
      }
    }
  };
  /**
   * @fileOverview
   * @name asn1-1.0.js
   * @author Kenji Urushima kenji.urushima@gmail.com
   * @version asn1 1.0.13 (2017-Jun-02)
   * @since jsrsasign 2.1
   * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
   */
  var KJUR = {};
  if (typeof KJUR.asn1 == "undefined" || !KJUR.asn1)
    KJUR.asn1 = {};
  KJUR.asn1.ASN1Util = new function() {
    this.integerToByteHex = function(i2) {
      var h2 = i2.toString(16);
      if (h2.length % 2 == 1)
        h2 = "0" + h2;
      return h2;
    };
    this.bigIntToMinTwosComplementsHex = function(bigIntegerValue) {
      var h2 = bigIntegerValue.toString(16);
      if (h2.substr(0, 1) != "-") {
        if (h2.length % 2 == 1) {
          h2 = "0" + h2;
        } else {
          if (!h2.match(/^[0-7]/)) {
            h2 = "00" + h2;
          }
        }
      } else {
        var hPos = h2.substr(1);
        var xorLen = hPos.length;
        if (xorLen % 2 == 1) {
          xorLen += 1;
        } else {
          if (!h2.match(/^[0-7]/)) {
            xorLen += 2;
          }
        }
        var hMask = "";
        for (var i2 = 0; i2 < xorLen; i2++) {
          hMask += "f";
        }
        var biMask = new BigInteger(hMask, 16);
        var biNeg = biMask.xor(bigIntegerValue).add(BigInteger.ONE);
        h2 = biNeg.toString(16).replace(/^-/, "");
      }
      return h2;
    };
    this.getPEMStringFromHex = function(dataHex, pemHeader) {
      return hextopem(dataHex, pemHeader);
    };
    this.newObject = function(param) {
      var _KJUR = KJUR, _KJUR_asn1 = _KJUR.asn1, _DERBoolean = _KJUR_asn1.DERBoolean, _DERInteger = _KJUR_asn1.DERInteger, _DERBitString = _KJUR_asn1.DERBitString, _DEROctetString = _KJUR_asn1.DEROctetString, _DERNull = _KJUR_asn1.DERNull, _DERObjectIdentifier = _KJUR_asn1.DERObjectIdentifier, _DEREnumerated = _KJUR_asn1.DEREnumerated, _DERUTF8String = _KJUR_asn1.DERUTF8String, _DERNumericString = _KJUR_asn1.DERNumericString, _DERPrintableString = _KJUR_asn1.DERPrintableString, _DERTeletexString = _KJUR_asn1.DERTeletexString, _DERIA5String = _KJUR_asn1.DERIA5String, _DERUTCTime = _KJUR_asn1.DERUTCTime, _DERGeneralizedTime = _KJUR_asn1.DERGeneralizedTime, _DERSequence = _KJUR_asn1.DERSequence, _DERSet = _KJUR_asn1.DERSet, _DERTaggedObject = _KJUR_asn1.DERTaggedObject, _newObject = _KJUR_asn1.ASN1Util.newObject;
      var keys = Object.keys(param);
      if (keys.length != 1)
        throw "key of param shall be only one.";
      var key = keys[0];
      if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + key + ":") == -1)
        throw "undefined key: " + key;
      if (key == "bool")
        return new _DERBoolean(param[key]);
      if (key == "int")
        return new _DERInteger(param[key]);
      if (key == "bitstr")
        return new _DERBitString(param[key]);
      if (key == "octstr")
        return new _DEROctetString(param[key]);
      if (key == "null")
        return new _DERNull(param[key]);
      if (key == "oid")
        return new _DERObjectIdentifier(param[key]);
      if (key == "enum")
        return new _DEREnumerated(param[key]);
      if (key == "utf8str")
        return new _DERUTF8String(param[key]);
      if (key == "numstr")
        return new _DERNumericString(param[key]);
      if (key == "prnstr")
        return new _DERPrintableString(param[key]);
      if (key == "telstr")
        return new _DERTeletexString(param[key]);
      if (key == "ia5str")
        return new _DERIA5String(param[key]);
      if (key == "utctime")
        return new _DERUTCTime(param[key]);
      if (key == "gentime")
        return new _DERGeneralizedTime(param[key]);
      if (key == "seq") {
        var paramList = param[key];
        var a2 = [];
        for (var i2 = 0; i2 < paramList.length; i2++) {
          var asn1Obj = _newObject(paramList[i2]);
          a2.push(asn1Obj);
        }
        return new _DERSequence({ "array": a2 });
      }
      if (key == "set") {
        var paramList = param[key];
        var a2 = [];
        for (var i2 = 0; i2 < paramList.length; i2++) {
          var asn1Obj = _newObject(paramList[i2]);
          a2.push(asn1Obj);
        }
        return new _DERSet({ "array": a2 });
      }
      if (key == "tag") {
        var tagParam = param[key];
        if (Object.prototype.toString.call(tagParam) === "[object Array]" && tagParam.length == 3) {
          var obj = _newObject(tagParam[2]);
          return new _DERTaggedObject({
            tag: tagParam[0],
            explicit: tagParam[1],
            obj
          });
        } else {
          var newParam = {};
          if (tagParam.explicit !== void 0)
            newParam.explicit = tagParam.explicit;
          if (tagParam.tag !== void 0)
            newParam.tag = tagParam.tag;
          if (tagParam.obj === void 0)
            throw "obj shall be specified for 'tag'.";
          newParam.obj = _newObject(tagParam.obj);
          return new _DERTaggedObject(newParam);
        }
      }
    };
    this.jsonToASN1HEX = function(param) {
      var asn1Obj = this.newObject(param);
      return asn1Obj.getEncodedHex();
    };
  }();
  KJUR.asn1.ASN1Util.oidHexToInt = function(hex) {
    var s2 = "";
    var i01 = parseInt(hex.substr(0, 2), 16);
    var i0 = Math.floor(i01 / 40);
    var i1 = i01 % 40;
    var s2 = i0 + "." + i1;
    var binbuf = "";
    for (var i2 = 2; i2 < hex.length; i2 += 2) {
      var value = parseInt(hex.substr(i2, 2), 16);
      var bin = ("00000000" + value.toString(2)).slice(-8);
      binbuf = binbuf + bin.substr(1, 7);
      if (bin.substr(0, 1) == "0") {
        var bi = new BigInteger(binbuf, 2);
        s2 = s2 + "." + bi.toString(10);
        binbuf = "";
      }
    }
    return s2;
  };
  KJUR.asn1.ASN1Util.oidIntToHex = function(oidString) {
    var itox = function(i3) {
      var h3 = i3.toString(16);
      if (h3.length == 1)
        h3 = "0" + h3;
      return h3;
    };
    var roidtox = function(roid) {
      var h3 = "";
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7)
        padLen = 0;
      var bPad = "";
      for (var i3 = 0; i3 < padLen; i3++)
        bPad += "0";
      b = bPad + b;
      for (var i3 = 0; i3 < b.length - 1; i3 += 7) {
        var b8 = b.substr(i3, 7);
        if (i3 != b.length - 7)
          b8 = "1" + b8;
        h3 += itox(parseInt(b8, 2));
      }
      return h3;
    };
    if (!oidString.match(/^[0-9.]+$/)) {
      throw "malformed oid string: " + oidString;
    }
    var h2 = "";
    var a2 = oidString.split(".");
    var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
    h2 += itox(i0);
    a2.splice(0, 2);
    for (var i2 = 0; i2 < a2.length; i2++) {
      h2 += roidtox(a2[i2]);
    }
    return h2;
  };
  KJUR.asn1.ASN1Object = function() {
    var hV = "";
    this.getLengthHexFromValue = function() {
      if (typeof this.hV == "undefined" || this.hV == null) {
        throw "this.hV is null or undefined.";
      }
      if (this.hV.length % 2 == 1) {
        throw "value hex must be even length: n=" + hV.length + ",v=" + this.hV;
      }
      var n2 = this.hV.length / 2;
      var hN = n2.toString(16);
      if (hN.length % 2 == 1) {
        hN = "0" + hN;
      }
      if (n2 < 128) {
        return hN;
      } else {
        var hNlen = hN.length / 2;
        if (hNlen > 15) {
          throw "ASN.1 length too long to represent by 8x: n = " + n2.toString(16);
        }
        var head = 128 + hNlen;
        return head.toString(16) + hN;
      }
    };
    this.getEncodedHex = function() {
      if (this.hTLV == null || this.isModified) {
        this.hV = this.getFreshValueHex();
        this.hL = this.getLengthHexFromValue();
        this.hTLV = this.hT + this.hL + this.hV;
        this.isModified = false;
      }
      return this.hTLV;
    };
    this.getValueHex = function() {
      this.getEncodedHex();
      return this.hV;
    };
    this.getFreshValueHex = function() {
      return "";
    };
  };
  KJUR.asn1.DERAbstractString = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.getString = function() {
      return this.s;
    };
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(this.s);
    };
    this.setStringHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params == "string") {
        this.setString(params);
      } else if (typeof params["str"] != "undefined") {
        this.setString(params["str"]);
      } else if (typeof params["hex"] != "undefined") {
        this.setStringHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERAbstractTime = function(params) {
    KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);
    this.localDateToUTC = function(d2) {
      utc = d2.getTime() + d2.getTimezoneOffset() * 6e4;
      var utcDate = new Date(utc);
      return utcDate;
    };
    this.formatDate = function(dateObject, type, withMillis) {
      var pad = this.zeroPadding;
      var d2 = this.localDateToUTC(dateObject);
      var year = String(d2.getFullYear());
      if (type == "utc")
        year = year.substr(2, 2);
      var month = pad(String(d2.getMonth() + 1), 2);
      var day = pad(String(d2.getDate()), 2);
      var hour = pad(String(d2.getHours()), 2);
      var min = pad(String(d2.getMinutes()), 2);
      var sec = pad(String(d2.getSeconds()), 2);
      var s2 = year + month + day + hour + min + sec;
      if (withMillis === true) {
        var millis = d2.getMilliseconds();
        if (millis != 0) {
          var sMillis = pad(String(millis), 3);
          sMillis = sMillis.replace(/[0]+$/, "");
          s2 = s2 + "." + sMillis;
        }
      }
      return s2 + "Z";
    };
    this.zeroPadding = function(s2, len) {
      if (s2.length >= len)
        return s2;
      return new Array(len - s2.length + 1).join("0") + s2;
    };
    this.getString = function() {
      return this.s;
    };
    this.setString = function(newS) {
      this.hTLV = null;
      this.isModified = true;
      this.s = newS;
      this.hV = stohex(newS);
    };
    this.setByDateValue = function(year, month, day, hour, min, sec) {
      var dateObject = new Date(Date.UTC(year, month - 1, day, hour, min, sec, 0));
      this.setByDate(dateObject);
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERAbstractStructured = function(params) {
    KJUR.asn1.DERAbstractString.superclass.constructor.call(this);
    this.setByASN1ObjectArray = function(asn1ObjectArray) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array = asn1ObjectArray;
    };
    this.appendASN1Object = function(asn1Object) {
      this.hTLV = null;
      this.isModified = true;
      this.asn1Array.push(asn1Object);
    };
    this.asn1Array = new Array();
    if (typeof params != "undefined") {
      if (typeof params["array"] != "undefined") {
        this.asn1Array = params["array"];
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERBoolean = function() {
    KJUR.asn1.DERBoolean.superclass.constructor.call(this);
    this.hT = "01";
    this.hTLV = "0101ff";
  };
  YAHOO.lang.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERInteger = function(params) {
    KJUR.asn1.DERInteger.superclass.constructor.call(this);
    this.hT = "02";
    this.setByBigInteger = function(bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    this.setByInteger = function(intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    this.setValueHex = function(newHexString) {
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["bigint"] != "undefined") {
        this.setByBigInteger(params["bigint"]);
      } else if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERBitString = function(params) {
    if (params !== void 0 && typeof params.obj !== "undefined") {
      var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = "00" + o2.getEncodedHex();
    }
    KJUR.asn1.DERBitString.superclass.constructor.call(this);
    this.hT = "03";
    this.setHexValueIncludingUnusedBits = function(newHexStringIncludingUnusedBits) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = newHexStringIncludingUnusedBits;
    };
    this.setUnusedBitsAndHexValue = function(unusedBits, hValue) {
      if (unusedBits < 0 || 7 < unusedBits) {
        throw "unused bits shall be from 0 to 7: u = " + unusedBits;
      }
      var hUnusedBits = "0" + unusedBits;
      this.hTLV = null;
      this.isModified = true;
      this.hV = hUnusedBits + hValue;
    };
    this.setByBinaryString = function(binaryString) {
      binaryString = binaryString.replace(/0+$/, "");
      var unusedBits = 8 - binaryString.length % 8;
      if (unusedBits == 8)
        unusedBits = 0;
      for (var i2 = 0; i2 <= unusedBits; i2++) {
        binaryString += "0";
      }
      var h2 = "";
      for (var i2 = 0; i2 < binaryString.length - 1; i2 += 8) {
        var b = binaryString.substr(i2, 8);
        var x2 = parseInt(b, 2).toString(16);
        if (x2.length == 1)
          x2 = "0" + x2;
        h2 += x2;
      }
      this.hTLV = null;
      this.isModified = true;
      this.hV = "0" + unusedBits + h2;
    };
    this.setByBooleanArray = function(booleanArray) {
      var s2 = "";
      for (var i2 = 0; i2 < booleanArray.length; i2++) {
        if (booleanArray[i2] == true) {
          s2 += "1";
        } else {
          s2 += "0";
        }
      }
      this.setByBinaryString(s2);
    };
    this.newFalseArray = function(nLength) {
      var a2 = new Array(nLength);
      for (var i2 = 0; i2 < nLength; i2++) {
        a2[i2] = false;
      }
      return a2;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params == "string" && params.toLowerCase().match(/^[0-9a-f]+$/)) {
        this.setHexValueIncludingUnusedBits(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setHexValueIncludingUnusedBits(params["hex"]);
      } else if (typeof params["bin"] != "undefined") {
        this.setByBinaryString(params["bin"]);
      } else if (typeof params["array"] != "undefined") {
        this.setByBooleanArray(params["array"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object);
  KJUR.asn1.DEROctetString = function(params) {
    if (params !== void 0 && typeof params.obj !== "undefined") {
      var o2 = KJUR.asn1.ASN1Util.newObject(params.obj);
      params.hex = o2.getEncodedHex();
    }
    KJUR.asn1.DEROctetString.superclass.constructor.call(this, params);
    this.hT = "04";
  };
  YAHOO.lang.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERNull = function() {
    KJUR.asn1.DERNull.superclass.constructor.call(this);
    this.hT = "05";
    this.hTLV = "0500";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERObjectIdentifier = function(params) {
    var itox = function(i2) {
      var h2 = i2.toString(16);
      if (h2.length == 1)
        h2 = "0" + h2;
      return h2;
    };
    var roidtox = function(roid) {
      var h2 = "";
      var bi = new BigInteger(roid, 10);
      var b = bi.toString(2);
      var padLen = 7 - b.length % 7;
      if (padLen == 7)
        padLen = 0;
      var bPad = "";
      for (var i2 = 0; i2 < padLen; i2++)
        bPad += "0";
      b = bPad + b;
      for (var i2 = 0; i2 < b.length - 1; i2 += 7) {
        var b8 = b.substr(i2, 7);
        if (i2 != b.length - 7)
          b8 = "1" + b8;
        h2 += itox(parseInt(b8, 2));
      }
      return h2;
    };
    KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);
    this.hT = "06";
    this.setValueHex = function(newHexString) {
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = newHexString;
    };
    this.setValueOidString = function(oidString) {
      if (!oidString.match(/^[0-9.]+$/)) {
        throw "malformed oid string: " + oidString;
      }
      var h2 = "";
      var a2 = oidString.split(".");
      var i0 = parseInt(a2[0]) * 40 + parseInt(a2[1]);
      h2 += itox(i0);
      a2.splice(0, 2);
      for (var i2 = 0; i2 < a2.length; i2++) {
        h2 += roidtox(a2[i2]);
      }
      this.hTLV = null;
      this.isModified = true;
      this.s = null;
      this.hV = h2;
    };
    this.setValueName = function(oidName) {
      var oid = KJUR.asn1.x509.OID.name2oid(oidName);
      if (oid !== "") {
        this.setValueOidString(oid);
      } else {
        throw "DERObjectIdentifier oidName undefined: " + oidName;
      }
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (params !== void 0) {
      if (typeof params === "string") {
        if (params.match(/^[0-2].[0-9.]+$/)) {
          this.setValueOidString(params);
        } else {
          this.setValueName(params);
        }
      } else if (params.oid !== void 0) {
        this.setValueOidString(params.oid);
      } else if (params.hex !== void 0) {
        this.setValueHex(params.hex);
      } else if (params.name !== void 0) {
        this.setValueName(params.name);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object);
  KJUR.asn1.DEREnumerated = function(params) {
    KJUR.asn1.DEREnumerated.superclass.constructor.call(this);
    this.hT = "0a";
    this.setByBigInteger = function(bigIntegerValue) {
      this.hTLV = null;
      this.isModified = true;
      this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(bigIntegerValue);
    };
    this.setByInteger = function(intValue) {
      var bi = new BigInteger(String(intValue), 10);
      this.setByBigInteger(bi);
    };
    this.setValueHex = function(newHexString) {
      this.hV = newHexString;
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["int"] != "undefined") {
        this.setByInteger(params["int"]);
      } else if (typeof params == "number") {
        this.setByInteger(params);
      } else if (typeof params["hex"] != "undefined") {
        this.setValueHex(params["hex"]);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DEREnumerated, KJUR.asn1.ASN1Object);
  KJUR.asn1.DERUTF8String = function(params) {
    KJUR.asn1.DERUTF8String.superclass.constructor.call(this, params);
    this.hT = "0c";
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERNumericString = function(params) {
    KJUR.asn1.DERNumericString.superclass.constructor.call(this, params);
    this.hT = "12";
  };
  YAHOO.lang.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERPrintableString = function(params) {
    KJUR.asn1.DERPrintableString.superclass.constructor.call(this, params);
    this.hT = "13";
  };
  YAHOO.lang.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERTeletexString = function(params) {
    KJUR.asn1.DERTeletexString.superclass.constructor.call(this, params);
    this.hT = "14";
  };
  YAHOO.lang.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERIA5String = function(params) {
    KJUR.asn1.DERIA5String.superclass.constructor.call(this, params);
    this.hT = "16";
  };
  YAHOO.lang.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString);
  KJUR.asn1.DERUTCTime = function(params) {
    KJUR.asn1.DERUTCTime.superclass.constructor.call(this, params);
    this.hT = "17";
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, "utc");
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      if (typeof this.date == "undefined" && typeof this.s == "undefined") {
        this.date = new Date();
        this.s = this.formatDate(this.date, "utc");
        this.hV = stohex(this.s);
      }
      return this.hV;
    };
    if (params !== void 0) {
      if (params.str !== void 0) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{12}Z$/)) {
        this.setString(params);
      } else if (params.hex !== void 0) {
        this.setStringHex(params.hex);
      } else if (params.date !== void 0) {
        this.setByDate(params.date);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime);
  KJUR.asn1.DERGeneralizedTime = function(params) {
    KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, params);
    this.hT = "18";
    this.withMillis = false;
    this.setByDate = function(dateObject) {
      this.hTLV = null;
      this.isModified = true;
      this.date = dateObject;
      this.s = this.formatDate(this.date, "gen", this.withMillis);
      this.hV = stohex(this.s);
    };
    this.getFreshValueHex = function() {
      if (this.date === void 0 && this.s === void 0) {
        this.date = new Date();
        this.s = this.formatDate(this.date, "gen", this.withMillis);
        this.hV = stohex(this.s);
      }
      return this.hV;
    };
    if (params !== void 0) {
      if (params.str !== void 0) {
        this.setString(params.str);
      } else if (typeof params == "string" && params.match(/^[0-9]{14}Z$/)) {
        this.setString(params);
      } else if (params.hex !== void 0) {
        this.setStringHex(params.hex);
      } else if (params.date !== void 0) {
        this.setByDate(params.date);
      }
      if (params.millis === true) {
        this.withMillis = true;
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime);
  KJUR.asn1.DERSequence = function(params) {
    KJUR.asn1.DERSequence.superclass.constructor.call(this, params);
    this.hT = "30";
    this.getFreshValueHex = function() {
      var h2 = "";
      for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
        var asn1Obj = this.asn1Array[i2];
        h2 += asn1Obj.getEncodedHex();
      }
      this.hV = h2;
      return this.hV;
    };
  };
  YAHOO.lang.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured);
  KJUR.asn1.DERSet = function(params) {
    KJUR.asn1.DERSet.superclass.constructor.call(this, params);
    this.hT = "31";
    this.sortFlag = true;
    this.getFreshValueHex = function() {
      var a2 = new Array();
      for (var i2 = 0; i2 < this.asn1Array.length; i2++) {
        var asn1Obj = this.asn1Array[i2];
        a2.push(asn1Obj.getEncodedHex());
      }
      if (this.sortFlag == true)
        a2.sort();
      this.hV = a2.join("");
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params.sortflag != "undefined" && params.sortflag == false)
        this.sortFlag = false;
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured);
  KJUR.asn1.DERTaggedObject = function(params) {
    KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);
    this.hT = "a0";
    this.hV = "";
    this.isExplicit = true;
    this.asn1Object = null;
    this.setASN1Object = function(isExplicitFlag, tagNoHex, asn1Object) {
      this.hT = tagNoHex;
      this.isExplicit = isExplicitFlag;
      this.asn1Object = asn1Object;
      if (this.isExplicit) {
        this.hV = this.asn1Object.getEncodedHex();
        this.hTLV = null;
        this.isModified = true;
      } else {
        this.hV = null;
        this.hTLV = asn1Object.getEncodedHex();
        this.hTLV = this.hTLV.replace(/^../, tagNoHex);
        this.isModified = false;
      }
    };
    this.getFreshValueHex = function() {
      return this.hV;
    };
    if (typeof params != "undefined") {
      if (typeof params["tag"] != "undefined") {
        this.hT = params["tag"];
      }
      if (typeof params["explicit"] != "undefined") {
        this.isExplicit = params["explicit"];
      }
      if (typeof params["obj"] != "undefined") {
        this.asn1Object = params["obj"];
        this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
      }
    }
  };
  YAHOO.lang.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object);
  var __extends = globalThis && globalThis.__extends || function() {
    var extendStatics = function(d2, b) {
      extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, b2) {
        d3.__proto__ = b2;
      } || function(d3, b2) {
        for (var p2 in b2)
          if (Object.prototype.hasOwnProperty.call(b2, p2))
            d3[p2] = b2[p2];
      };
      return extendStatics(d2, b);
    };
    return function(d2, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d2, b);
      function __() {
        this.constructor = d2;
      }
      d2.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
  }();
  (function(_super) {
    __extends(JSEncryptRSAKey, _super);
    function JSEncryptRSAKey(key) {
      var _this = _super.call(this) || this;
      if (key) {
        if (typeof key === "string") {
          _this.parseKey(key);
        } else if (JSEncryptRSAKey.hasPrivateKeyProperty(key) || JSEncryptRSAKey.hasPublicKeyProperty(key)) {
          _this.parsePropertiesFrom(key);
        }
      }
      return _this;
    }
    JSEncryptRSAKey.prototype.parseKey = function(pem) {
      try {
        var modulus = 0;
        var public_exponent = 0;
        var reHex = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
        var der = reHex.test(pem) ? Hex.decode(pem) : Base64.unarmor(pem);
        var asn1 = ASN1.decode(der);
        if (asn1.sub.length === 3) {
          asn1 = asn1.sub[2].sub[0];
        }
        if (asn1.sub.length === 9) {
          modulus = asn1.sub[1].getHexStringValue();
          this.n = parseBigInt(modulus, 16);
          public_exponent = asn1.sub[2].getHexStringValue();
          this.e = parseInt(public_exponent, 16);
          var private_exponent = asn1.sub[3].getHexStringValue();
          this.d = parseBigInt(private_exponent, 16);
          var prime1 = asn1.sub[4].getHexStringValue();
          this.p = parseBigInt(prime1, 16);
          var prime2 = asn1.sub[5].getHexStringValue();
          this.q = parseBigInt(prime2, 16);
          var exponent1 = asn1.sub[6].getHexStringValue();
          this.dmp1 = parseBigInt(exponent1, 16);
          var exponent2 = asn1.sub[7].getHexStringValue();
          this.dmq1 = parseBigInt(exponent2, 16);
          var coefficient = asn1.sub[8].getHexStringValue();
          this.coeff = parseBigInt(coefficient, 16);
        } else if (asn1.sub.length === 2) {
          if (asn1.sub[0].sub) {
            var bit_string = asn1.sub[1];
            var sequence = bit_string.sub[0];
            modulus = sequence.sub[0].getHexStringValue();
            this.n = parseBigInt(modulus, 16);
            public_exponent = sequence.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          } else {
            modulus = asn1.sub[0].getHexStringValue();
            this.n = parseBigInt(modulus, 16);
            public_exponent = asn1.sub[1].getHexStringValue();
            this.e = parseInt(public_exponent, 16);
          }
        } else {
          return false;
        }
        return true;
      } catch (ex) {
        return false;
      }
    };
    JSEncryptRSAKey.prototype.getPrivateBaseKey = function() {
      var options = {
        array: [
          new KJUR.asn1.DERInteger({ int: 0 }),
          new KJUR.asn1.DERInteger({ bigint: this.n }),
          new KJUR.asn1.DERInteger({ int: this.e }),
          new KJUR.asn1.DERInteger({ bigint: this.d }),
          new KJUR.asn1.DERInteger({ bigint: this.p }),
          new KJUR.asn1.DERInteger({ bigint: this.q }),
          new KJUR.asn1.DERInteger({ bigint: this.dmp1 }),
          new KJUR.asn1.DERInteger({ bigint: this.dmq1 }),
          new KJUR.asn1.DERInteger({ bigint: this.coeff })
        ]
      };
      var seq = new KJUR.asn1.DERSequence(options);
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey.prototype.getPrivateBaseKeyB64 = function() {
      return hex2b64(this.getPrivateBaseKey());
    };
    JSEncryptRSAKey.prototype.getPublicBaseKey = function() {
      var first_sequence = new KJUR.asn1.DERSequence({
        array: [
          new KJUR.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new KJUR.asn1.DERNull()
        ]
      });
      var second_sequence = new KJUR.asn1.DERSequence({
        array: [
          new KJUR.asn1.DERInteger({ bigint: this.n }),
          new KJUR.asn1.DERInteger({ int: this.e })
        ]
      });
      var bit_string = new KJUR.asn1.DERBitString({
        hex: "00" + second_sequence.getEncodedHex()
      });
      var seq = new KJUR.asn1.DERSequence({
        array: [first_sequence, bit_string]
      });
      return seq.getEncodedHex();
    };
    JSEncryptRSAKey.prototype.getPublicBaseKeyB64 = function() {
      return hex2b64(this.getPublicBaseKey());
    };
    JSEncryptRSAKey.wordwrap = function(str, width) {
      width = width || 64;
      if (!str) {
        return str;
      }
      var regex = "(.{1," + width + "})( +|$\n?)|(.{1," + width + "})";
      return str.match(RegExp(regex, "g")).join("\n");
    };
    JSEncryptRSAKey.prototype.getPrivateKey = function() {
      var key = "-----BEGIN RSA PRIVATE KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
      key += "-----END RSA PRIVATE KEY-----";
      return key;
    };
    JSEncryptRSAKey.prototype.getPublicKey = function() {
      var key = "-----BEGIN PUBLIC KEY-----\n";
      key += JSEncryptRSAKey.wordwrap(this.getPublicBaseKeyB64()) + "\n";
      key += "-----END PUBLIC KEY-----";
      return key;
    };
    JSEncryptRSAKey.hasPublicKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e");
    };
    JSEncryptRSAKey.hasPrivateKeyProperty = function(obj) {
      obj = obj || {};
      return obj.hasOwnProperty("n") && obj.hasOwnProperty("e") && obj.hasOwnProperty("d") && obj.hasOwnProperty("p") && obj.hasOwnProperty("q") && obj.hasOwnProperty("dmp1") && obj.hasOwnProperty("dmq1") && obj.hasOwnProperty("coeff");
    };
    JSEncryptRSAKey.prototype.parsePropertiesFrom = function(obj) {
      this.n = obj.n;
      this.e = obj.e;
      if (obj.hasOwnProperty("d")) {
        this.d = obj.d;
        this.p = obj.p;
        this.q = obj.q;
        this.dmp1 = obj.dmp1;
        this.dmq1 = obj.dmq1;
        this.coeff = obj.coeff;
      }
    };
    return JSEncryptRSAKey;
  })(RSAKey);
  var _a;
  typeof process !== "undefined" ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.npm_package_version : void 0;
  const _sfc_main$t = {
    data() {
      return {
        activeColor: "#fff",
        current: 0,
        items: ["免费会员", "VIP会员", "SVPI会员"],
        titleList: ["搜题服务", "文档服务", "刷题服务", "其他服务"],
        styleType: "text",
        vipEquity: [
          {
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
          }
        ],
        documentList: []
      };
    },
    watch: {},
    onLoad() {
      this.postVipList();
    },
    methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex;
          formatAppLog("log", "at pages/vip/vip.vue:113", this.current);
          if (this.current === 0 || this.current === 1) {
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: "#4674F6",
              animation: {
                duration: 400,
                timingFunc: "easeIn"
              }
            });
          } else {
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: "#28241C",
              animation: {
                duration: 400,
                timingFunc: "easeIn"
              }
            });
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
            formatAppLog("log", "at pages/vip/vip.vue:143", res.records, "会员信息");
            this.documentList = res.records.sort((a2, b) => {
              return a2.yearPrice - b.yearPrice;
            });
          }
        };
        this.$http("postVipList", opt);
      },
      userWxPay() {
        formatAppLog("log", "at pages/vip/vip.vue:152", this.current, "this.current");
        uni.navigateTo({
          url: `../pay/pay?current=${this.current}`
        });
      },
      wxRequestPayment(res) {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          //时间戳
          nonceStr: res.nonceStr,
          //随机字符串
          package: res.package,
          //订单详情扩展字符串
          signType: res.signType,
          //签名方式
          paySign: res.paySign,
          success(res2) {
            formatAppLog("log", "at pages/vip/vip.vue:177", "res调用微信支付", res2);
          },
          fail(res2) {
          }
        });
      }
    }
  };
  function _sfc_render$k(_ctx, _cache, $props, $setup, $data, $options) {
    var _a2, _b, _c, _d;
    const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "div",
        {
          class: "header",
          style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "background-color: #4674f6;" : "background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)")
        },
        [
          vue.createElementVNode("view", { class: "uni-padding-wrap uni-common-mt" }, [
            vue.createVNode(_component_uni_segmented_control, {
              current: $data.current,
              values: $data.items,
              "style-type": $data.styleType,
              "active-color": $data.activeColor,
              onClickItem: $options.onClickItem
            }, null, 8, ["current", "values", "style-type", "active-color", "onClickItem"])
          ]),
          vue.createElementVNode("view", { class: "content" }, [
            vue.createElementVNode("view", { class: "Equity_list" }, [
              vue.createCommentVNode(` <view class="Equity_title" :style="current === 0||current === 1?'color:#4674F6':'color:#E2AD58'">\r
						{{item.title}}\r
					</view>\r
					<view class="Equity_item" v-for="(items,indexs) in item.list" :key="indexs">\r
						<text class="name">{{items.name}}</text>\r
						<text class="num">{{items.num[current]}}</text>\r
					</view> `),
              vue.createElementVNode(
                "view",
                {
                  class: "Equity_title",
                  style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "color:#4674F6" : "color:#E2AD58")
                },
                " 搜题服务 ",
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "Equity_item" }, [
                vue.createElementVNode("text", { class: "name" }, "搜题次数"),
                vue.createElementVNode(
                  "text",
                  { class: "num" },
                  vue.toDisplayString((_a2 = $data.documentList[$data.current]) == null ? void 0 : _a2.exerciseRecordMaxDay) + "次/月",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "Equity_title",
                  style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "color:#4674F6" : "color:#E2AD58")
                },
                " 文档服务 ",
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "Equity_item" }, [
                vue.createElementVNode("text", { class: "name" }, "文档下载"),
                vue.createElementVNode(
                  "text",
                  { class: "num" },
                  vue.toDisplayString((_b = $data.documentList[$data.current]) == null ? void 0 : _b.monthDownloadDocNum) + "次/月",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "Equity_title",
                  style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "color:#4674F6" : "color:#E2AD58")
                },
                " 刷题服务 ",
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "Equity_item" }, [
                vue.createElementVNode("text", { class: "name" }, "可刷题库"),
                vue.createElementVNode(
                  "text",
                  { class: "num" },
                  vue.toDisplayString((_c = $data.documentList[$data.current]) == null ? void 0 : _c.monthDownloadDocNum) + "次/月",
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: "Equity_title",
                  style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "color:#4674F6" : "color:#E2AD58")
                },
                " 其他服务 ",
                4
                /* STYLE */
              ),
              vue.createElementVNode("view", { class: "Equity_item" }, [
                vue.createElementVNode("text", { class: "name" }, "APP刷题无广告"),
                vue.createElementVNode(
                  "text",
                  { class: "num" },
                  vue.toDisplayString(((_d = $data.documentList[$data.current]) == null ? void 0 : _d.searchWithoutAds) ? "无广告" : "有广告"),
                  1
                  /* TEXT */
                )
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "btn" }, [
            vue.createElementVNode(
              "view",
              {
                style: vue.normalizeStyle($data.current === 0 || $data.current === 1 ? "background-color: #4674F6;color:#ffffff" : "background: linear-gradient(90deg, #E2AC57 0%, #F7E3B0 100%);color:#6E5019"),
                onClick: _cache[0] || (_cache[0] = (...args) => $options.userWxPay && $options.userWxPay(...args))
              },
              "开通会员",
              4
              /* STYLE */
            )
          ])
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesVipVip = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["render", _sfc_render$k], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/vip/vip.vue"]]);
  const easycom = {
    autoscan: true,
    custom: {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  };
  const pages = [
    {
      path: "pages/index/index",
      style: {
        navigationBarTitleText: "刷题通"
      }
    },
    {
      path: "pages/question/question",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom",
        "app-plus": {
          titleNView: false
        }
      }
    },
    {
      path: "pages/constructor/constructor",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        "app-plus": {
          titleNView: false
        }
      }
    },
    {
      path: "pages/constructor/constructorItem",
      style: {
        navigationBarTitleText: "一级建造师"
      }
    },
    {
      path: "pages/subject/subject",
      style: {
        navigationBarTitleText: "切换科目",
        backgroundColor: "#ddd"
      }
    },
    {
      path: "pages/notes/myNotes",
      style: {
        navigationBarTitleText: "我的笔记",
        backgroundColor: "#ddd"
      }
    },
    {
      path: "pages/my/help/help",
      style: {
        navigationBarTitleText: "帮助中心",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/help/customerService",
      style: {
        navigationBarTitleText: "联系客服",
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: "#4c7cf6",
        navigationBarTextStyle: "white"
      }
    },
    {
      path: "pages/document/document",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom",
        "app-plus": {
          titleNView: false
        }
      }
    },
    {
      path: "pages/wrong/index",
      style: {
        navigationBarTitleText: "",
        navigationBarBackgroundColor: "#4c7cf6",
        navigationBarTextStyle: "white"
      }
    },
    {
      path: "pages/my/my",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/setting",
      style: {
        navigationBarTitleText: "个人信息",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/cdKey/cdKey",
      style: {
        navigationBarTitleText: "邀请码激活",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/login/login",
      style: {
        navigationBarTitleText: "登陆",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/answer/index",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        navigationStyle: "custom"
      },
      autoBackButton: false,
      navigationBarRightButton: {
        hide: true
      }
    },
    {
      path: "pages/vip/vip",
      style: {
        navigationBarTitleText: "特权对比",
        navigationBarBackgroundColor: "#4674f6",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/addErrorQuestion/index",
      style: {
        navigationBarTitleText: "试题报错",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/examination/index",
      style: {
        navigationBarTitleText: "模拟考试",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/examination/examination",
      style: {
        navigationBarTitleText: "考试",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/examination/examScores",
      style: {
        navigationBarTitleText: "模拟考试成绩",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/docView/docView",
      style: {
        navigationBarTitleText: "文档详情",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/search",
      style: {
        navigationBarTitleText: "文字搜索",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/pay/pay",
      style: {
        navigationBarTitleText: "会员开通",
        enablePullDownRefresh: false,
        navigationBarBackgroundColor: "#28241C",
        navigationBarTextStyle: "white"
      }
    },
    {
      path: "pages/questionType/questionType",
      style: {
        navigationBarTitleText: "题型练习",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/categorateType/categorateType",
      style: {
        navigationBarTitleText: "章节练习",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/index/docSearch",
      style: {
        navigationBarTitleText: "文档搜索",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/onlineLearning/onlineLearning",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/myCollect/myCollect",
      style: {
        navigationBarTitleText: "我的收藏",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/docDownList/docDownList",
      style: {
        navigationBarTitleText: "文档下载历史",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/errQuestionList/errQuestionList",
      style: {
        navigationBarTitleText: "全部错题",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/my/searchHistory/searchHistory",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/exerciseResult/exerciseResult",
      style: {
        navigationBarTitleText: "练习成绩",
        enablePullDownRefresh: false,
        navigationBarTextStyle: "white",
        navigationBarBackgroundColor: "#5289f6"
      }
    },
    {
      path: "pages/my/message/message",
      style: {
        navigationBarTitleText: "我的消息",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/examInfo/examInfo",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false
      }
    }
  ];
  const globalStyle = {
    navigationBarTextStyle: "black",
    navigationBarTitleText: "uni-app",
    navigationBarBackgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    "app-plus": {
      background: "#efeff4",
      softinputMode: "adjustResize"
    }
  };
  const tabBar = {
    borderStyle: "black",
    backgroundColor: "#F7F7F7",
    color: "#000000",
    selectedColor: "#07C160",
    list: [
      {
        iconPath: "static/tabBar/home-icon-unactive.png",
        selectedIconPath: "static/tabBar/home-icon-active.png",
        text: "搜题",
        pagePath: "pages/index/index"
      },
      {
        iconPath: "static/tabBar/question-icon-unactive.png",
        selectedIconPath: "static/tabBar/question-icon-active.png",
        text: "刷题",
        pagePath: "pages/question/question"
      },
      {
        iconPath: "static/tabBar/file-icon-unactive.png",
        selectedIconPath: "static/tabBar/file-icon-active.png",
        text: "文档",
        pagePath: "pages/document/document"
      },
      {
        iconPath: "static/tabBar/my-icon-unactive.png",
        selectedIconPath: "static/tabBar/my-icon-active.png",
        text: "我的",
        pagePath: "pages/my/my"
      }
    ]
  };
  const condition = {
    current: 0,
    list: [
      {
        name: "",
        path: "",
        query: ""
      }
    ]
  };
  const t = {
    easycom,
    pages,
    globalStyle,
    tabBar,
    condition
  };
  function n(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
  }
  function s(e, t2, n2) {
    return e(n2 = { path: t2, exports: {}, require: function(e2, t3) {
      return function() {
        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
      }(null == t3 && n2.path);
    } }, n2.exports), n2.exports;
  }
  var r = s(function(e, t2) {
    var n2;
    e.exports = (n2 = n2 || function(e2, t3) {
      var n3 = Object.create || function() {
        function e3() {
        }
        return function(t4) {
          var n4;
          return e3.prototype = t4, n4 = new e3(), e3.prototype = null, n4;
        };
      }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e3) {
        var t4 = n3(this);
        return e3 && t4.mixIn(e3), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
          t4.$super.init.apply(this, arguments);
        }), t4.init.prototype = t4, t4.$super = this, t4;
      }, create: function() {
        var e3 = this.extend();
        return e3.init.apply(e3, arguments), e3;
      }, init: function() {
      }, mixIn: function(e3) {
        for (var t4 in e3)
          e3.hasOwnProperty(t4) && (this[t4] = e3[t4]);
        e3.hasOwnProperty("toString") && (this.toString = e3.toString);
      }, clone: function() {
        return this.init.prototype.extend(this);
      } }, o2 = r2.WordArray = i2.extend({ init: function(e3, n4) {
        e3 = this.words = e3 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e3.length;
      }, toString: function(e3) {
        return (e3 || c2).stringify(this);
      }, concat: function(e3) {
        var t4 = this.words, n4 = e3.words, s3 = this.sigBytes, r3 = e3.sigBytes;
        if (this.clamp(), s3 % 4)
          for (var i3 = 0; i3 < r3; i3++) {
            var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
            t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
          }
        else
          for (i3 = 0; i3 < r3; i3 += 4)
            t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
        return this.sigBytes += r3, this;
      }, clamp: function() {
        var t4 = this.words, n4 = this.sigBytes;
        t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e2.ceil(n4 / 4);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3.words = this.words.slice(0), e3;
      }, random: function(t4) {
        for (var n4, s3 = [], r3 = function(t5) {
          t5 = t5;
          var n5 = 987654321, s4 = 4294967295;
          return function() {
            var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
            return r4 /= 4294967296, (r4 += 0.5) * (e2.random() > 0.5 ? 1 : -1);
          };
        }, i3 = 0; i3 < t4; i3 += 4) {
          var a3 = r3(4294967296 * (n4 || e2.random()));
          n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
        }
        return new o2.init(s3, t4);
      } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
          n4[s3 >>> 3] |= parseInt(e3.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
        return new o2.init(n4, t4 / 2);
      } }, u2 = a2.Latin1 = { stringify: function(e3) {
        for (var t4 = e3.words, n4 = e3.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
          var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          s3.push(String.fromCharCode(i3));
        }
        return s3.join("");
      }, parse: function(e3) {
        for (var t4 = e3.length, n4 = [], s3 = 0; s3 < t4; s3++)
          n4[s3 >>> 2] |= (255 & e3.charCodeAt(s3)) << 24 - s3 % 4 * 8;
        return new o2.init(n4, t4);
      } }, l2 = a2.Utf8 = { stringify: function(e3) {
        try {
          return decodeURIComponent(escape(u2.stringify(e3)));
        } catch (e4) {
          throw new Error("Malformed UTF-8 data");
        }
      }, parse: function(e3) {
        return u2.parse(unescape(encodeURIComponent(e3)));
      } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
        this._data = new o2.init(), this._nDataBytes = 0;
      }, _append: function(e3) {
        "string" == typeof e3 && (e3 = l2.parse(e3)), this._data.concat(e3), this._nDataBytes += e3.sigBytes;
      }, _process: function(t4) {
        var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e2.ceil(a3) : e2.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e2.min(4 * c3, r3);
        if (c3) {
          for (var l3 = 0; l3 < c3; l3 += i3)
            this._doProcessBlock(s3, l3);
          var h3 = s3.splice(0, c3);
          n4.sigBytes -= u3;
        }
        return new o2.init(h3, u3);
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._data = this._data.clone(), e3;
      }, _minBufferSize: 0 });
      r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e3) {
        this.cfg = this.cfg.extend(e3), this.reset();
      }, reset: function() {
        h2.reset.call(this), this._doReset();
      }, update: function(e3) {
        return this._append(e3), this._process(), this;
      }, finalize: function(e3) {
        return e3 && this._append(e3), this._doFinalize();
      }, blockSize: 16, _createHelper: function(e3) {
        return function(t4, n4) {
          return new e3.init(n4).finalize(t4);
        };
      }, _createHmacHelper: function(e3) {
        return function(t4, n4) {
          return new d2.HMAC.init(e3, n4).finalize(t4);
        };
      } });
      var d2 = s2.algo = {};
      return s2;
    }(Math), n2);
  }), i = r, o = (s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function(e2) {
      var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
      !function() {
        for (var t4 = 0; t4 < 64; t4++)
          a2[t4] = 4294967296 * e2.abs(e2.sin(t4 + 1)) | 0;
      }();
      var c2 = o2.MD5 = i2.extend({ _doReset: function() {
        this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
      }, _doProcessBlock: function(e3, t4) {
        for (var n3 = 0; n3 < 16; n3++) {
          var s3 = t4 + n3, r3 = e3[s3];
          e3[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
        }
        var i3 = this._hash.words, o3 = e3[t4 + 0], c3 = e3[t4 + 1], f2 = e3[t4 + 2], p2 = e3[t4 + 3], g2 = e3[t4 + 4], m2 = e3[t4 + 5], y2 = e3[t4 + 6], _2 = e3[t4 + 7], w = e3[t4 + 8], v2 = e3[t4 + 9], S2 = e3[t4 + 10], k2 = e3[t4 + 11], I2 = e3[t4 + 12], b = e3[t4 + 13], T2 = e3[t4 + 14], A2 = e3[t4 + 15], C2 = i3[0], P2 = i3[1], E2 = i3[2], O2 = i3[3];
        C2 = u2(C2, P2, E2, O2, o3, 7, a2[0]), O2 = u2(O2, C2, P2, E2, c3, 12, a2[1]), E2 = u2(E2, O2, C2, P2, f2, 17, a2[2]), P2 = u2(P2, E2, O2, C2, p2, 22, a2[3]), C2 = u2(C2, P2, E2, O2, g2, 7, a2[4]), O2 = u2(O2, C2, P2, E2, m2, 12, a2[5]), E2 = u2(E2, O2, C2, P2, y2, 17, a2[6]), P2 = u2(P2, E2, O2, C2, _2, 22, a2[7]), C2 = u2(C2, P2, E2, O2, w, 7, a2[8]), O2 = u2(O2, C2, P2, E2, v2, 12, a2[9]), E2 = u2(E2, O2, C2, P2, S2, 17, a2[10]), P2 = u2(P2, E2, O2, C2, k2, 22, a2[11]), C2 = u2(C2, P2, E2, O2, I2, 7, a2[12]), O2 = u2(O2, C2, P2, E2, b, 12, a2[13]), E2 = u2(E2, O2, C2, P2, T2, 17, a2[14]), C2 = l2(C2, P2 = u2(P2, E2, O2, C2, A2, 22, a2[15]), E2, O2, c3, 5, a2[16]), O2 = l2(O2, C2, P2, E2, y2, 9, a2[17]), E2 = l2(E2, O2, C2, P2, k2, 14, a2[18]), P2 = l2(P2, E2, O2, C2, o3, 20, a2[19]), C2 = l2(C2, P2, E2, O2, m2, 5, a2[20]), O2 = l2(O2, C2, P2, E2, S2, 9, a2[21]), E2 = l2(E2, O2, C2, P2, A2, 14, a2[22]), P2 = l2(P2, E2, O2, C2, g2, 20, a2[23]), C2 = l2(C2, P2, E2, O2, v2, 5, a2[24]), O2 = l2(O2, C2, P2, E2, T2, 9, a2[25]), E2 = l2(E2, O2, C2, P2, p2, 14, a2[26]), P2 = l2(P2, E2, O2, C2, w, 20, a2[27]), C2 = l2(C2, P2, E2, O2, b, 5, a2[28]), O2 = l2(O2, C2, P2, E2, f2, 9, a2[29]), E2 = l2(E2, O2, C2, P2, _2, 14, a2[30]), C2 = h2(C2, P2 = l2(P2, E2, O2, C2, I2, 20, a2[31]), E2, O2, m2, 4, a2[32]), O2 = h2(O2, C2, P2, E2, w, 11, a2[33]), E2 = h2(E2, O2, C2, P2, k2, 16, a2[34]), P2 = h2(P2, E2, O2, C2, T2, 23, a2[35]), C2 = h2(C2, P2, E2, O2, c3, 4, a2[36]), O2 = h2(O2, C2, P2, E2, g2, 11, a2[37]), E2 = h2(E2, O2, C2, P2, _2, 16, a2[38]), P2 = h2(P2, E2, O2, C2, S2, 23, a2[39]), C2 = h2(C2, P2, E2, O2, b, 4, a2[40]), O2 = h2(O2, C2, P2, E2, o3, 11, a2[41]), E2 = h2(E2, O2, C2, P2, p2, 16, a2[42]), P2 = h2(P2, E2, O2, C2, y2, 23, a2[43]), C2 = h2(C2, P2, E2, O2, v2, 4, a2[44]), O2 = h2(O2, C2, P2, E2, I2, 11, a2[45]), E2 = h2(E2, O2, C2, P2, A2, 16, a2[46]), C2 = d2(C2, P2 = h2(P2, E2, O2, C2, f2, 23, a2[47]), E2, O2, o3, 6, a2[48]), O2 = d2(O2, C2, P2, E2, _2, 10, a2[49]), E2 = d2(E2, O2, C2, P2, T2, 15, a2[50]), P2 = d2(P2, E2, O2, C2, m2, 21, a2[51]), C2 = d2(C2, P2, E2, O2, I2, 6, a2[52]), O2 = d2(O2, C2, P2, E2, p2, 10, a2[53]), E2 = d2(E2, O2, C2, P2, S2, 15, a2[54]), P2 = d2(P2, E2, O2, C2, c3, 21, a2[55]), C2 = d2(C2, P2, E2, O2, w, 6, a2[56]), O2 = d2(O2, C2, P2, E2, A2, 10, a2[57]), E2 = d2(E2, O2, C2, P2, y2, 15, a2[58]), P2 = d2(P2, E2, O2, C2, b, 21, a2[59]), C2 = d2(C2, P2, E2, O2, g2, 6, a2[60]), O2 = d2(O2, C2, P2, E2, k2, 10, a2[61]), E2 = d2(E2, O2, C2, P2, f2, 15, a2[62]), P2 = d2(P2, E2, O2, C2, v2, 21, a2[63]), i3[0] = i3[0] + C2 | 0, i3[1] = i3[1] + P2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O2 | 0;
      }, _doFinalize: function() {
        var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
        n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
        var i3 = e2.floor(s3 / 4294967296), o3 = s3;
        n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
        for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
          var l3 = c3[u3];
          c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
        }
        return a3;
      }, clone: function() {
        var e3 = i2.clone.call(this);
        return e3._hash = this._hash.clone(), e3;
      } });
      function u2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & n3 | ~t4 & s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function l2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 & s3 | n3 & ~s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function h2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (t4 ^ n3 ^ s3) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      function d2(e3, t4, n3, s3, r3, i3, o3) {
        var a3 = e3 + (n3 ^ (t4 | ~s3)) + r3 + o3;
        return (a3 << i3 | a3 >>> 32 - i3) + t4;
      }
      t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
    }(Math), n2.MD5);
  }), s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, void function() {
      var e2 = n2, t3 = e2.lib.Base, s2 = e2.enc.Utf8;
      e2.algo.HMAC = t3.extend({ init: function(e3, t4) {
        e3 = this._hasher = new e3.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
        var n3 = e3.blockSize, r2 = 4 * n3;
        t4.sigBytes > r2 && (t4 = e3.finalize(t4)), t4.clamp();
        for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
          a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
        i2.sigBytes = o2.sigBytes = r2, this.reset();
      }, reset: function() {
        var e3 = this._hasher;
        e3.reset(), e3.update(this._iKey);
      }, update: function(e3) {
        return this._hasher.update(e3), this;
      }, finalize: function(e3) {
        var t4 = this._hasher, n3 = t4.finalize(e3);
        return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
      } });
    }());
  }), s(function(e, t2) {
    e.exports = i.HmacMD5;
  })), a = s(function(e, t2) {
    e.exports = i.enc.Utf8;
  }), c = s(function(e, t2) {
    var n2;
    e.exports = (n2 = i, function() {
      var e2 = n2, t3 = e2.lib.WordArray;
      function s2(e3, n3, s3) {
        for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
          if (o2 % 4) {
            var a2 = s3[e3.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e3.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
            r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
          }
        return t3.create(r2, i2);
      }
      e2.enc.Base64 = { stringify: function(e3) {
        var t4 = e3.words, n3 = e3.sigBytes, s3 = this._map;
        e3.clamp();
        for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
          for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
            r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
        var c2 = s3.charAt(64);
        if (c2)
          for (; r2.length % 4; )
            r2.push(c2);
        return r2.join("");
      }, parse: function(e3) {
        var t4 = e3.length, n3 = this._map, r2 = this._reverseMap;
        if (!r2) {
          r2 = this._reverseMap = [];
          for (var i2 = 0; i2 < n3.length; i2++)
            r2[n3.charCodeAt(i2)] = i2;
        }
        var o2 = n3.charAt(64);
        if (o2) {
          var a2 = e3.indexOf(o2);
          -1 !== a2 && (t4 = a2);
        }
        return s2(e3, t4, r2);
      }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
    }(), n2.enc.Base64);
  });
  const u = "FUNCTION", l = "OBJECT", h = "CLIENT_DB";
  function d(e) {
    return Object.prototype.toString.call(e).slice(8, -1).toLowerCase();
  }
  function f(e) {
    return "object" === d(e);
  }
  function p(e) {
    return "function" == typeof e;
  }
  function g(e) {
    return function() {
      try {
        return e.apply(e, arguments);
      } catch (e2) {
        console.error(e2);
      }
    };
  }
  function m(e) {
    return e && "string" == typeof e ? JSON.parse(e) : e;
  }
  const y = true, _ = "app", v = m([]), S = _, k = m(""), I = m("[]") || [];
  let T = "";
  try {
    T = "__UNI__DED8FF0";
  } catch (e) {
  }
  let A = {};
  function C(e, t2 = {}) {
    var n2, s2;
    return n2 = A, s2 = e, Object.prototype.hasOwnProperty.call(n2, s2) || (A[e] = t2), A[e];
  }
  A = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
  const P = ["invoke", "success", "fail", "complete"], E = C("_globalUniCloudInterceptor");
  function O(e, t2) {
    E[e] || (E[e] = {}), f(t2) && Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e2, t3, n3) {
        let s2 = E[e2][t3];
        s2 || (s2 = E[e2][t3] = []), -1 === s2.indexOf(n3) && p(n3) && s2.push(n3);
      }(e, n2, t2[n2]);
    });
  }
  function x(e, t2) {
    E[e] || (E[e] = {}), f(t2) ? Object.keys(t2).forEach((n2) => {
      P.indexOf(n2) > -1 && function(e2, t3, n3) {
        const s2 = E[e2][t3];
        if (!s2)
          return;
        const r2 = s2.indexOf(n3);
        r2 > -1 && s2.splice(r2, 1);
      }(e, n2, t2[n2]);
    }) : delete E[e];
  }
  function U(e, t2) {
    return e && 0 !== e.length ? e.reduce((e2, n2) => e2.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
  }
  function R(e, t2) {
    return E[e] && E[e][t2] || [];
  }
  function L(e) {
    O("callObject", e);
  }
  const N = C("_globalUniCloudListener"), D = "response", F = "needLogin", q = "refreshToken", K = "clientdb", j = "cloudfunction", M = "cloudobject";
  function B(e) {
    return N[e] || (N[e] = []), N[e];
  }
  function $(e, t2) {
    const n2 = B(e);
    n2.includes(t2) || n2.push(t2);
  }
  function W(e, t2) {
    const n2 = B(e), s2 = n2.indexOf(t2);
    -1 !== s2 && n2.splice(s2, 1);
  }
  function z(e, t2) {
    const n2 = B(e);
    for (let e2 = 0; e2 < n2.length; e2++) {
      (0, n2[e2])(t2);
    }
  }
  let J, H = false;
  function G() {
    return J || (J = new Promise((e) => {
      H && e(), function t2() {
        if ("function" == typeof getCurrentPages) {
          const t3 = getCurrentPages();
          t3 && t3[0] && (H = true, e());
        }
        H || setTimeout(() => {
          t2();
        }, 30);
      }();
    }), J);
  }
  function V(e) {
    const t2 = {};
    for (const n2 in e) {
      const s2 = e[n2];
      p(s2) && (t2[n2] = g(s2));
    }
    return t2;
  }
  function Y(e, t2) {
    return t2 ? function(n2) {
      let s2 = false;
      if ("callFunction" === t2) {
        const e2 = n2 && n2.type || u;
        s2 = e2 !== u;
      }
      const r2 = "callFunction" === t2 && !s2;
      let i2;
      i2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
      const { success: o2, fail: a2, complete: c2 } = V(n2), l2 = i2.then(() => s2 ? Promise.resolve() : U(R(t2, "invoke"), n2)).then(() => e.call(this, n2)).then((e2) => s2 ? Promise.resolve(e2) : U(R(t2, "success"), e2).then(() => U(R(t2, "complete"), e2)).then(() => (r2 && z(D, { type: j, content: e2 }), Promise.resolve(e2))), (e2) => s2 ? Promise.reject(e2) : U(R(t2, "fail"), e2).then(() => U(R(t2, "complete"), e2)).then(() => (z(D, { type: j, content: e2 }), Promise.reject(e2))));
      if (!(o2 || a2 || c2))
        return l2;
      l2.then((e2) => {
        o2 && o2(e2), c2 && c2(e2), r2 && z(D, { type: j, content: e2 });
      }, (e2) => {
        a2 && a2(e2), c2 && c2(e2), r2 && z(D, { type: j, content: e2 });
      });
    } : function(t3) {
      t3 = t3 || {};
      const { success: n2, fail: s2, complete: r2 } = V(t3);
      if (!(n2 || s2 || r2))
        return e.call(this, t3);
      e.call(this, t3).then((e2) => {
        n2 && n2(e2), r2 && r2(e2);
      }, (e2) => {
        s2 && s2(e2), r2 && r2(e2);
      });
    };
  }
  class Q extends Error {
    constructor(e) {
      super(e.message), this.errMsg = e.message || e.errMsg || "unknown system error", this.code = this.errCode = e.code || e.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e.subject || e.errSubject, this.cause = e.cause, this.requestId = e.requestId;
    }
    toJson(e = 0) {
      if (!(e >= 10))
        return e++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e) : this.cause };
    }
  }
  var X = { request: (e) => uni.request(e), uploadFile: (e) => uni.uploadFile(e), setStorageSync: (e, t2) => uni.setStorageSync(e, t2), getStorageSync: (e) => uni.getStorageSync(e), removeStorageSync: (e) => uni.removeStorageSync(e), clearStorageSync: () => uni.clearStorageSync() };
  function Z(e) {
    return e && Z(e.__v_raw) || e;
  }
  function ee() {
    return { token: X.getStorageSync("uni_id_token") || X.getStorageSync("uniIdToken"), tokenExpired: X.getStorageSync("uni_id_token_expired") };
  }
  function te({ token: e, tokenExpired: t2 } = {}) {
    e && X.setStorageSync("uni_id_token", e), t2 && X.setStorageSync("uni_id_token_expired", t2);
  }
  let se, re;
  function ie() {
    return se || (se = uni.getSystemInfoSync()), se;
  }
  function oe() {
    let e, t2;
    try {
      if (uni.getLaunchOptionsSync) {
        if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
          return;
        const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
        e = s2, t2 = n2;
      }
    } catch (e2) {
    }
    return { channel: e, scene: t2 };
  }
  function ae() {
    const e = uni.getLocale && uni.getLocale() || "en";
    if (re)
      return { ...re, locale: e, LOCALE: e };
    const t2 = ie(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
    for (let e2 = 0; e2 < o2.length; e2++) {
      delete t2[o2[e2]];
    }
    return re = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...oe(), ...t2 }, { ...re, locale: e, LOCALE: e };
  }
  var ce = { sign: function(e, t2) {
    let n2 = "";
    return Object.keys(e).sort().forEach(function(t3) {
      e[t3] && (n2 = n2 + "&" + t3 + "=" + e[t3]);
    }), n2 = n2.slice(1), o(n2, t2).toString();
  }, wrappedRequest: function(e, t2) {
    return new Promise((n2, s2) => {
      t2(Object.assign(e, { complete(e2) {
        e2 || (e2 = {});
        const t3 = e2.data && e2.data.header && e2.data.header["x-serverless-request-id"] || e2.header && e2.header["request-id"];
        if (!e2.statusCode || e2.statusCode >= 400)
          return s2(new Q({ code: "SYS_ERR", message: e2.errMsg || "request:fail", requestId: t3 }));
        const r2 = e2.data;
        if (r2.error)
          return s2(new Q({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
        r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
      } }));
    });
  }, toBase64: function(e) {
    return c.stringify(a.parse(e));
  } }, ue = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
  const { t: le } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: ue, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: ue }, "zh-Hans");
  var he = class {
    constructor(e) {
      ["spaceId", "clientSecret"].forEach((t2) => {
        if (!Object.prototype.hasOwnProperty.call(e, t2))
          throw new Error(le("uniCloud.init.paramRequired", { param: t2 }));
      }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = X, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
    }
    get hasAccessToken() {
      return !!this.accessToken;
    }
    setAccessToken(e) {
      this.accessToken = e;
    }
    requestWrapped(e) {
      return ce.wrappedRequest(e, this.adapter.request);
    }
    requestAuth(e) {
      return this.requestWrapped(e);
    }
    request(e, t2) {
      return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e) : this.requestWrapped(e).catch((t3) => new Promise((e2, n2) => {
        !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e2();
      }).then(() => this.getAccessToken()).then(() => {
        const t4 = this.rebuildRequest(e);
        return this.request(t4, true);
      })) : this.getAccessToken().then(() => {
        const t3 = this.rebuildRequest(e);
        return this.request(t3, true);
      }));
    }
    rebuildRequest(e) {
      const t2 = Object.assign({}, e);
      return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = ce.sign(t2.data, this.config.clientSecret), t2;
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
    }
    getAccessToken() {
      if ("pending" === this._getAccessTokenPromiseStatus)
        return this._getAccessTokenPromise;
      this._getAccessTokenPromiseStatus = "pending";
      return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e) => new Promise((t2, n2) => {
        e.result && e.result.accessToken ? (this.setAccessToken(e.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new Q({ code: "AUTH_FAILED", message: "获取accessToken失败" })));
      }), (e) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e))), this._getAccessTokenPromise;
    }
    authorize() {
      this.getAccessToken();
    }
    callFunction(e) {
      const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e.name, functionArgs: e.data || {} }) };
      return this.request(this.setupRequest(t2));
    }
    getOSSUploadOptionsFromPath(e) {
      const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new Q({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    reportOSSUpload(e) {
      const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e) };
      return this.request(this.setupRequest(t2));
    }
    async uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
      if ("string" !== d(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
      if (!(t2 = t2.trim()))
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      if (/:\/\//.test(t2))
        throw new Q({ code: "INVALID_PARAM", message: "cloudPath不合法" });
      const i2 = r2 && r2.envType || this.config.envType, o2 = (await this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 })).result, a2 = "https://" + o2.cdnDomain + "/" + o2.ossPath, { securityToken: c2, accessKeyId: u2, signature: l2, host: h2, ossPath: f2, id: p2, policy: g2, ossCallbackUrl: m2 } = o2, y2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: u2, Signature: l2, host: h2, id: p2, key: f2, policy: g2, success_action_status: 200 };
      if (c2 && (y2["x-oss-security-token"] = c2), m2) {
        const e2 = JSON.stringify({ callbackUrl: m2, callbackBody: JSON.stringify({ fileId: p2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
        y2.callback = ce.toBase64(e2);
      }
      const _2 = { url: "https://" + o2.host, formData: y2, fileName: "file", name: "file", filePath: e, fileType: n2 };
      if (await this.uploadFileToOSS(Object.assign({}, _2, { onUploadProgress: s2 })), m2)
        return { success: true, filePath: e, fileID: a2 };
      if ((await this.reportOSSUpload({ id: p2 })).success)
        return { success: true, filePath: e, fileID: a2 };
      throw new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" });
    }
    getTempFileURL({ fileList: e } = {}) {
      return new Promise((t2, n2) => {
        Array.isArray(e) && 0 !== e.length || n2(new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e.map((e2) => ({ fileID: e2, tempFileURL: e2 })) });
      });
    }
    async getFileInfo({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e.map((e2) => e2.split("?")[0]).join(",") }) };
      return { fileList: (await this.request(this.setupRequest(t2))).result };
    }
  };
  var de = { init(e) {
    const t2 = new he(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  const fe = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
  var pe;
  !function(e) {
    e.local = "local", e.none = "none", e.session = "session";
  }(pe || (pe = {}));
  var ge = function() {
  };
  const me = () => {
    let e;
    if (!Promise) {
      e = () => {
      }, e.promise = {};
      const t3 = () => {
        throw new Q({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
      };
      return Object.defineProperty(e.promise, "then", { get: t3 }), Object.defineProperty(e.promise, "catch", { get: t3 }), e;
    }
    const t2 = new Promise((t3, n2) => {
      e = (e2, s2) => e2 ? n2(e2) : t3(s2);
    });
    return e.promise = t2, e;
  };
  function ye(e) {
    return void 0 === e;
  }
  function _e(e) {
    return "[object Null]" === Object.prototype.toString.call(e);
  }
  var we;
  function ve(e) {
    const t2 = (n2 = e, "[object Array]" === Object.prototype.toString.call(n2) ? e : [e]);
    var n2;
    for (const e2 of t2) {
      const { isMatch: t3, genAdapter: n3, runtime: s2 } = e2;
      if (t3())
        return { adapter: n3(), runtime: s2 };
    }
  }
  !function(e) {
    e.WEB = "web", e.WX_MP = "wx_mp";
  }(we || (we = {}));
  const Se = { adapter: null, runtime: void 0 }, ke = ["anonymousUuidKey"];
  class Ie extends ge {
    constructor() {
      super(), Se.adapter.root.tcbObject || (Se.adapter.root.tcbObject = {});
    }
    setItem(e, t2) {
      Se.adapter.root.tcbObject[e] = t2;
    }
    getItem(e) {
      return Se.adapter.root.tcbObject[e];
    }
    removeItem(e) {
      delete Se.adapter.root.tcbObject[e];
    }
    clear() {
      delete Se.adapter.root.tcbObject;
    }
  }
  function be(e, t2) {
    switch (e) {
      case "local":
        return t2.localStorage || new Ie();
      case "none":
        return new Ie();
      default:
        return t2.sessionStorage || new Ie();
    }
  }
  class Te {
    constructor(e) {
      if (!this._storage) {
        this._persistence = Se.adapter.primaryStorage || e.persistence, this._storage = be(this._persistence, Se.adapter);
        const t2 = `access_token_${e.env}`, n2 = `access_token_expire_${e.env}`, s2 = `refresh_token_${e.env}`, r2 = `anonymous_uuid_${e.env}`, i2 = `login_type_${e.env}`, o2 = `user_info_${e.env}`;
        this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
      }
    }
    updatePersistence(e) {
      if (e === this._persistence)
        return;
      const t2 = "local" === this._persistence;
      this._persistence = e;
      const n2 = be(e, Se.adapter);
      for (const e2 in this.keys) {
        const s2 = this.keys[e2];
        if (t2 && ke.includes(e2))
          continue;
        const r2 = this._storage.getItem(s2);
        ye(r2) || _e(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
      }
      this._storage = n2;
    }
    setStore(e, t2, n2) {
      if (!this._storage)
        return;
      const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
      try {
        this._storage.setItem(e, r2);
      } catch (e2) {
        throw e2;
      }
    }
    getStore(e, t2) {
      try {
        if (!this._storage)
          return;
      } catch (e2) {
        return "";
      }
      t2 = t2 || "localCachev1";
      const n2 = this._storage.getItem(e);
      if (!n2)
        return "";
      if (n2.indexOf(t2) >= 0) {
        return JSON.parse(n2).content;
      }
      return "";
    }
    removeStore(e) {
      this._storage.removeItem(e);
    }
  }
  const Ae = {}, Ce = {};
  function Pe(e) {
    return Ae[e];
  }
  class Ee {
    constructor(e, t2) {
      this.data = t2 || null, this.name = e;
    }
  }
  class Oe extends Ee {
    constructor(e, t2) {
      super("error", { error: e, data: t2 }), this.error = e;
    }
  }
  const xe = new class {
    constructor() {
      this._listeners = {};
    }
    on(e, t2) {
      return function(e2, t3, n2) {
        n2[e2] = n2[e2] || [], n2[e2].push(t3);
      }(e, t2, this._listeners), this;
    }
    off(e, t2) {
      return function(e2, t3, n2) {
        if (n2 && n2[e2]) {
          const s2 = n2[e2].indexOf(t3);
          -1 !== s2 && n2[e2].splice(s2, 1);
        }
      }(e, t2, this._listeners), this;
    }
    fire(e, t2) {
      if (e instanceof Oe)
        return console.error(e.error), this;
      const n2 = "string" == typeof e ? new Ee(e, t2 || {}) : e;
      const s2 = n2.name;
      if (this._listens(s2)) {
        n2.target = this;
        const e2 = this._listeners[s2] ? [...this._listeners[s2]] : [];
        for (const t3 of e2)
          t3.call(this, n2);
      }
      return this;
    }
    _listens(e) {
      return this._listeners[e] && this._listeners[e].length > 0;
    }
  }();
  function Ue(e, t2) {
    xe.on(e, t2);
  }
  function Re(e, t2 = {}) {
    xe.fire(e, t2);
  }
  function Le(e, t2) {
    xe.off(e, t2);
  }
  const Ne = "loginStateChanged", De = "loginStateExpire", Fe = "loginTypeChanged", qe = "anonymousConverted", Ke = "refreshAccessToken";
  var je;
  !function(e) {
    e.ANONYMOUS = "ANONYMOUS", e.WECHAT = "WECHAT", e.WECHAT_PUBLIC = "WECHAT-PUBLIC", e.WECHAT_OPEN = "WECHAT-OPEN", e.CUSTOM = "CUSTOM", e.EMAIL = "EMAIL", e.USERNAME = "USERNAME", e.NULL = "NULL";
  }(je || (je = {}));
  const Me = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Be = { "X-SDK-Version": "1.3.5" };
  function $e(e, t2, n2) {
    const s2 = e[t2];
    e[t2] = function(t3) {
      const r2 = {}, i2 = {};
      n2.forEach((n3) => {
        const { data: s3, headers: o3 } = n3.call(e, t3);
        Object.assign(r2, s3), Object.assign(i2, o3);
      });
      const o2 = t3.data;
      return o2 && (() => {
        var e2;
        if (e2 = o2, "[object FormData]" !== Object.prototype.toString.call(e2))
          t3.data = { ...o2, ...r2 };
        else
          for (const e3 in r2)
            o2.append(e3, r2[e3]);
      })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e, t3);
    };
  }
  function We() {
    const e = Math.random().toString(16).slice(2);
    return { data: { seqId: e }, headers: { ...Be, "x-seqid": e } };
  }
  class ze {
    constructor(e = {}) {
      var t2;
      this.config = e, this._reqClass = new Se.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Pe(this.config.env), this._localCache = (t2 = this.config.env, Ce[t2]), $e(this._reqClass, "post", [We]), $e(this._reqClass, "upload", [We]), $e(this._reqClass, "download", [We]);
    }
    async post(e) {
      return await this._reqClass.post(e);
    }
    async upload(e) {
      return await this._reqClass.upload(e);
    }
    async download(e) {
      return await this._reqClass.download(e);
    }
    async refreshAccessToken() {
      let e, t2;
      this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
      try {
        e = await this._refreshAccessTokenPromise;
      } catch (e2) {
        t2 = e2;
      }
      if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
        throw t2;
      return e;
    }
    async _refreshAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
      this._cache.removeStore(e), this._cache.removeStore(t2);
      let i2 = this._cache.getStore(n2);
      if (!i2)
        throw new Q({ message: "未登录CloudBase" });
      const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
      if (a2.data.code) {
        const { code: e2 } = a2.data;
        if ("SIGN_PARAM_INVALID" === e2 || "REFRESH_TOKEN_EXPIRED" === e2 || "INVALID_REFRESH_TOKEN" === e2) {
          if (this._cache.getStore(s2) === je.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e2) {
            const e3 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e3, refresh_token: t3 });
            return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
          }
          Re(De), this._cache.removeStore(n2);
        }
        throw new Q({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
      }
      if (a2.data.access_token)
        return Re(Ke), this._cache.setStore(e, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
      a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
    }
    async getAccessToken() {
      const { accessTokenKey: e, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
      if (!this._cache.getStore(n2))
        throw new Q({ message: "refresh token不存在，登录状态异常" });
      let s2 = this._cache.getStore(e), r2 = this._cache.getStore(t2), i2 = true;
      return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
    }
    async request(e, t2, n2) {
      const s2 = `x-tcb-trace_${this.config.env}`;
      let r2 = "application/x-www-form-urlencoded";
      const i2 = { action: e, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
      if (-1 === Me.indexOf(e)) {
        const { refreshTokenKey: e2 } = this._cache.keys;
        this._cache.getStore(e2) && (i2.access_token = (await this.getAccessToken()).accessToken);
      }
      let o2;
      if ("storage.uploadFile" === e) {
        o2 = new FormData();
        for (let e2 in o2)
          o2.hasOwnProperty(e2) && void 0 !== o2[e2] && o2.append(e2, i2[e2]);
        r2 = "multipart/form-data";
      } else {
        r2 = "application/json", o2 = {};
        for (let e2 in i2)
          void 0 !== i2[e2] && (o2[e2] = i2[e2]);
      }
      let a2 = { headers: { "content-type": r2 } };
      n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
      const c2 = this._localCache.getStore(s2);
      c2 && (a2.headers["X-TCB-Trace"] = c2);
      const { parse: u2, inQuery: l2, search: h2 } = t2;
      let d2 = { env: this.config.env };
      u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
      let f2 = function(e2, t3, n3 = {}) {
        const s3 = /\?/.test(t3);
        let r3 = "";
        for (let e3 in n3)
          "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e3}=${encodeURIComponent(n3[e3])}`;
        return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e2}${t3}`;
      }(fe, "//tcb-api.tencentcloudapi.com/web", d2);
      h2 && (f2 += h2);
      const p2 = await this.post({ url: f2, data: o2, ...a2 }), g2 = p2.header && p2.header["x-tcb-trace"];
      if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(p2.status) && 200 !== Number(p2.statusCode) || !p2.data)
        throw new Q({ code: "NETWORK_ERROR", message: "network request error" });
      return p2;
    }
    async send(e, t2 = {}) {
      const n2 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
      if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === Me.indexOf(e)) {
        await this.refreshAccessToken();
        const n3 = await this.request(e, t2, { onUploadProgress: t2.onUploadProgress });
        if (n3.data.code)
          throw new Q({ code: n3.data.code, message: n3.data.message });
        return n3.data;
      }
      if (n2.data.code)
        throw new Q({ code: n2.data.code, message: n2.data.message });
      return n2.data;
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
  }
  const Je = {};
  function He(e) {
    return Je[e];
  }
  class Ge {
    constructor(e) {
      this.config = e, this._cache = Pe(e.env), this._request = He(e.env);
    }
    setRefreshToken(e) {
      const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e);
    }
    setAccessToken(e, t2) {
      const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
      this._cache.setStore(n2, e), this._cache.setStore(s2, t2);
    }
    async refreshUserInfo() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e);
    }
  }
  class Ve {
    constructor(e) {
      if (!e)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._envId = e, this._cache = Pe(this._envId), this._request = He(this._envId), this.setUserInfo();
    }
    linkWithTicket(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be string" });
      return this._request.send("auth.linkWithTicket", { ticket: e });
    }
    linkWithRedirect(e) {
      e.signInWithRedirect();
    }
    updatePassword(e, t2) {
      return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e });
    }
    updateEmail(e) {
      return this._request.send("auth.updateEmail", { newEmail: e });
    }
    updateUsername(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      return this._request.send("auth.updateUsername", { username: e });
    }
    async getLinkedUidList() {
      const { data: e } = await this._request.send("auth.getLinkedUidList", {});
      let t2 = false;
      const { users: n2 } = e;
      return n2.forEach((e2) => {
        e2.wxOpenId && e2.wxPublicId && (t2 = true);
      }), { users: n2, hasPrimaryUid: t2 };
    }
    setPrimaryUid(e) {
      return this._request.send("auth.setPrimaryUid", { uid: e });
    }
    unlink(e) {
      return this._request.send("auth.unlink", { platform: e });
    }
    async update(e) {
      const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
      this.setLocalUserInfo(a2);
    }
    async refresh() {
      const { data: e } = await this._request.send("auth.getUserInfo", {});
      return this.setLocalUserInfo(e), e;
    }
    setUserInfo() {
      const { userInfoKey: e } = this._cache.keys, t2 = this._cache.getStore(e);
      ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e2) => {
        this[e2] = t2[e2];
      }), this.location = { country: t2.country, province: t2.province, city: t2.city };
    }
    setLocalUserInfo(e) {
      const { userInfoKey: t2 } = this._cache.keys;
      this._cache.setStore(t2, e), this.setUserInfo();
    }
  }
  class Ye {
    constructor(e) {
      if (!e)
        throw new Q({ code: "PARAM_ERROR", message: "envId is not defined" });
      this._cache = Pe(e);
      const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
      this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ve(e);
    }
    get isAnonymousAuth() {
      return this.loginType === je.ANONYMOUS;
    }
    get isCustomAuth() {
      return this.loginType === je.CUSTOM;
    }
    get isWeixinAuth() {
      return this.loginType === je.WECHAT || this.loginType === je.WECHAT_OPEN || this.loginType === je.WECHAT_PUBLIC;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
  }
  class Qe extends Ge {
    async signIn() {
      this._cache.updatePersistence("local");
      const { anonymousUuidKey: e, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
      if (r2.uuid && r2.refresh_token) {
        this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.ANONYMOUS, persistence: "local" });
        const e2 = new Ye(this.config.env);
        return await e2.user.refresh(), e2;
      }
      throw new Q({ message: "匿名登录失败" });
    }
    async linkAndRetrieveDataWithTicket(e) {
      const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e });
      if (i2.refresh_token)
        return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Re(qe, { env: this.config.env }), Re(Fe, { loginType: je.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
      throw new Q({ message: "匿名转化失败" });
    }
    _setAnonymousUUID(e) {
      const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
      this._cache.removeStore(t2), this._cache.setStore(t2, e), this._cache.setStore(n2, je.ANONYMOUS);
    }
    _clearAnonymousUUID() {
      this._cache.removeStore(this._cache.keys.anonymousUuidKey);
    }
  }
  class Xe extends Ge {
    async signIn(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "ticket must be a string" });
      const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e, refresh_token: this._cache.getStore(t2) || "" });
      if (n2.refresh_token)
        return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ye(this.config.env);
      throw new Q({ message: "自定义登录失败" });
    }
  }
  class Ze extends Ge {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "email must be a string" });
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.EMAIL, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new Q({ message: "邮箱登录失败" });
    }
    async activate(e) {
      return this._request.send("auth.activateEndUserMail", { token: e });
    }
    async resetPasswordWithToken(e, t2) {
      return this._request.send("auth.resetPasswordWithToken", { token: e, newPassword: t2 });
    }
  }
  class et extends Ge {
    async signIn(e, t2) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
      const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: je.USERNAME, username: e, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
      if (r2)
        return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.USERNAME, persistence: this.config.persistence }), new Ye(this.config.env);
      throw s2.code ? new Q({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new Q({ message: "用户名密码登录失败" });
    }
  }
  class tt {
    constructor(e) {
      this.config = e, this._cache = Pe(e.env), this._request = He(e.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Ue(Fe, this._onLoginTypeChanged);
    }
    get currentUser() {
      const e = this.hasLoginState();
      return e && e.user || null;
    }
    get loginType() {
      return this._cache.getStore(this._cache.keys.loginTypeKey);
    }
    anonymousAuthProvider() {
      return new Qe(this.config);
    }
    customAuthProvider() {
      return new Xe(this.config);
    }
    emailAuthProvider() {
      return new Ze(this.config);
    }
    usernameAuthProvider() {
      return new et(this.config);
    }
    async signInAnonymously() {
      return new Qe(this.config).signIn();
    }
    async signInWithEmailAndPassword(e, t2) {
      return new Ze(this.config).signIn(e, t2);
    }
    signInWithUsernameAndPassword(e, t2) {
      return new et(this.config).signIn(e, t2);
    }
    async linkAndRetrieveDataWithTicket(e) {
      this._anonymousAuthProvider || (this._anonymousAuthProvider = new Qe(this.config)), Ue(qe, this._onAnonymousConverted);
      return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e);
    }
    async signOut() {
      if (this.loginType === je.ANONYMOUS)
        throw new Q({ message: "匿名用户不支持登出操作" });
      const { refreshTokenKey: e, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e);
      if (!s2)
        return;
      const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
      return this._cache.removeStore(e), this._cache.removeStore(t2), this._cache.removeStore(n2), Re(Ne), Re(Fe, { env: this.config.env, loginType: je.NULL, persistence: this.config.persistence }), r2;
    }
    async signUpWithEmailAndPassword(e, t2) {
      return this._request.send("auth.signUpWithEmailAndPassword", { email: e, password: t2 });
    }
    async sendPasswordResetEmail(e) {
      return this._request.send("auth.sendPasswordResetEmail", { email: e });
    }
    onLoginStateChanged(e) {
      Ue(Ne, () => {
        const t3 = this.hasLoginState();
        e.call(this, t3);
      });
      const t2 = this.hasLoginState();
      e.call(this, t2);
    }
    onLoginStateExpired(e) {
      Ue(De, e.bind(this));
    }
    onAccessTokenRefreshed(e) {
      Ue(Ke, e.bind(this));
    }
    onAnonymousConverted(e) {
      Ue(qe, e.bind(this));
    }
    onLoginTypeChanged(e) {
      Ue(Fe, () => {
        const t2 = this.hasLoginState();
        e.call(this, t2);
      });
    }
    async getAccessToken() {
      return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
    }
    hasLoginState() {
      const { refreshTokenKey: e } = this._cache.keys;
      return this._cache.getStore(e) ? new Ye(this.config.env) : null;
    }
    async isUsernameRegistered(e) {
      if ("string" != typeof e)
        throw new Q({ code: "PARAM_ERROR", message: "username must be a string" });
      const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e });
      return t2 && t2.isRegistered;
    }
    getLoginState() {
      return Promise.resolve(this.hasLoginState());
    }
    async signInWithTicket(e) {
      return new Xe(this.config).signIn(e);
    }
    shouldRefreshAccessToken(e) {
      this._request._shouldRefreshAccessTokenHook = e.bind(this);
    }
    getUserInfo() {
      return this._request.send("auth.getUserInfo", {}).then((e) => e.code ? e : { ...e.data, requestId: e.seqId });
    }
    getAuthHeader() {
      const { refreshTokenKey: e, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e);
      return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
    }
    _onAnonymousConverted(e) {
      const { env: t2 } = e.data;
      t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
    }
    _onLoginTypeChanged(e) {
      const { loginType: t2, persistence: n2, env: s2 } = e.data;
      s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
    }
  }
  const nt = function(e, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e2, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
      n2.upload({ url: a2, data: f2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e3) => {
        201 === e3.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new Q({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e3.data}` }));
      }).catch((e3) => {
        t2(e3);
      });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, st = function(e, t2) {
    t2 = t2 || me();
    const n2 = He(this.config.env), { cloudPath: s2 } = e;
    return n2.send("storage.getUploadMetadata", { path: s2 }).then((e2) => {
      t2(null, e2);
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, rt = function({ fileList: e }, t2) {
    if (t2 = t2 || me(), !e || !Array.isArray(e))
      return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
    for (let t3 of e)
      if (!t3 || "string" != typeof t3)
        return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
    const n2 = { fileid_list: e };
    return He(this.config.env).send("storage.batchDeleteFile", n2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.delete_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, it = function({ fileList: e }, t2) {
    t2 = t2 || me(), e && Array.isArray(e) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
    let n2 = [];
    for (let s3 of e)
      "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
    const s2 = { file_list: n2 };
    return He(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e2) => {
      e2.code ? t2(null, e2) : t2(null, { fileList: e2.data.download_list, requestId: e2.requestId });
    }).catch((e2) => {
      t2(e2);
    }), t2.promise;
  }, ot = async function({ fileID: e }, t2) {
    const n2 = (await it.call(this, { fileList: [{ fileID: e, maxAge: 600 }] })).fileList[0];
    if ("SUCCESS" !== n2.code)
      return t2 ? t2(n2) : new Promise((e2) => {
        e2(n2);
      });
    const s2 = He(this.config.env);
    let r2 = n2.download_url;
    if (r2 = encodeURI(r2), !t2)
      return s2.download({ url: r2 });
    t2(await s2.download({ url: r2 }));
  }, at = function({ name: e, data: t2, query: n2, parse: s2, search: r2 }, i2) {
    const o2 = i2 || me();
    let a2;
    try {
      a2 = t2 ? JSON.stringify(t2) : "";
    } catch (e2) {
      return Promise.reject(e2);
    }
    if (!e)
      return Promise.reject(new Q({ code: "PARAM_ERROR", message: "函数名不能为空" }));
    const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e, request_data: a2 };
    return He(this.config.env).send("functions.invokeFunction", c2).then((e2) => {
      if (e2.code)
        o2(null, e2);
      else {
        let t3 = e2.data.response_data;
        if (s2)
          o2(null, { result: t3, requestId: e2.requestId });
        else
          try {
            t3 = JSON.parse(e2.data.response_data), o2(null, { result: t3, requestId: e2.requestId });
          } catch (e3) {
            o2(new Q({ message: "response data must be json" }));
          }
      }
      return o2.promise;
    }).catch((e2) => {
      o2(e2);
    }), o2.promise;
  }, ct = { timeout: 15e3, persistence: "session" }, ut = {};
  class lt {
    constructor(e) {
      this.config = e || this.config, this.authObj = void 0;
    }
    init(e) {
      switch (Se.adapter || (this.requestClient = new Se.adapter.reqClass({ timeout: e.timeout || 5e3, timeoutMsg: `请求在${(e.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...ct, ...e }, true) {
        case this.config.timeout > 6e5:
          console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
          break;
        case this.config.timeout < 100:
          console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
      }
      return new lt(this.config);
    }
    auth({ persistence: e } = {}) {
      if (this.authObj)
        return this.authObj;
      const t2 = e || Se.adapter.primaryStorage || ct.persistence;
      var n2;
      return t2 !== this.config.persistence && (this.config.persistence = t2), function(e2) {
        const { env: t3 } = e2;
        Ae[t3] = new Te(e2), Ce[t3] = new Te({ ...e2, persistence: "local" });
      }(this.config), n2 = this.config, Je[n2.env] = new ze(n2), this.authObj = new tt(this.config), this.authObj;
    }
    on(e, t2) {
      return Ue.apply(this, [e, t2]);
    }
    off(e, t2) {
      return Le.apply(this, [e, t2]);
    }
    callFunction(e, t2) {
      return at.apply(this, [e, t2]);
    }
    deleteFile(e, t2) {
      return rt.apply(this, [e, t2]);
    }
    getTempFileURL(e, t2) {
      return it.apply(this, [e, t2]);
    }
    downloadFile(e, t2) {
      return ot.apply(this, [e, t2]);
    }
    uploadFile(e, t2) {
      return nt.apply(this, [e, t2]);
    }
    getUploadMetadata(e, t2) {
      return st.apply(this, [e, t2]);
    }
    registerExtension(e) {
      ut[e.name] = e;
    }
    async invokeExtension(e, t2) {
      const n2 = ut[e];
      if (!n2)
        throw new Q({ message: `扩展${e} 必须先注册` });
      return await n2.invoke(t2, this);
    }
    useAdapters(e) {
      const { adapter: t2, runtime: n2 } = ve(e) || {};
      t2 && (Se.adapter = t2), n2 && (Se.runtime = n2);
    }
  }
  var ht = new lt();
  function dt(e, t2, n2) {
    void 0 === n2 && (n2 = {});
    var s2 = /\?/.test(t2), r2 = "";
    for (var i2 in n2)
      "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
    return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e + t2;
  }
  class ft {
    post(e) {
      const { url: t2, data: n2, headers: s2 } = e;
      return new Promise((e2, r2) => {
        X.request({ url: dt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
          e2(t3);
        }, fail(e3) {
          r2(e3);
        } });
      });
    }
    upload(e) {
      return new Promise((t2, n2) => {
        const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e, c2 = X.uploadFile({ url: dt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e2) {
          const n3 = { statusCode: e2.statusCode, data: e2.data || {} };
          200 === e2.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
        }, fail(e2) {
          n2(new Error(e2.errMsg || "uploadFile:fail"));
        } });
        "function" == typeof e.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
          e.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
        });
      });
    }
  }
  const pt = { setItem(e, t2) {
    X.setStorageSync(e, t2);
  }, getItem: (e) => X.getStorageSync(e), removeItem(e) {
    X.removeStorageSync(e);
  }, clear() {
    X.clearStorageSync();
  } };
  var gt = { genAdapter: function() {
    return { root: {}, reqClass: ft, localStorage: pt, primaryStorage: "local" };
  }, isMatch: function() {
    return true;
  }, runtime: "uni_app" };
  ht.useAdapters(gt);
  const mt = ht, yt = mt.init;
  mt.init = function(e) {
    e.env = e.spaceId;
    const t2 = yt.call(this, e);
    t2.config.provider = "tencent", t2.config.spaceId = e.spaceId;
    const n2 = t2.auth;
    return t2.auth = function(e2) {
      const t3 = n2.call(this, e2);
      return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e3) => {
        t3[e3] = Y(t3[e3]).bind(t3);
      }), t3;
    }, t2.customAuth = t2.auth, t2;
  };
  var _t = mt;
  var wt = class extends he {
    getAccessToken() {
      return new Promise((e, t2) => {
        const n2 = "Anonymous_Access_token";
        this.setAccessToken(n2), e(n2);
      });
    }
    setupRequest(e, t2) {
      const n2 = Object.assign({}, e, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
      "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = ce.sign(n2, this.config.clientSecret);
      const r2 = ae();
      s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
      const { token: i2 } = ee();
      return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
    }
    uploadFileToOSS({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
      return new Promise((o2, a2) => {
        const c2 = this.adapter.uploadFile({ url: e, formData: t2, name: n2, filePath: s2, fileType: r2, success(e2) {
          e2 && e2.statusCode < 400 ? o2(e2) : a2(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e2) {
          a2(new Q({ code: e2.code || "UPLOAD_FAILED", message: e2.message || e2.errMsg || "文件上传失败" }));
        } });
        "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e2) => {
          i2({ loaded: e2.totalBytesSent, total: e2.totalBytesExpectedToSend });
        });
      });
    }
    uploadFile({ filePath: e, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
      if (!t2)
        throw new Q({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
      let r2;
      return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
        const { url: i2, formData: o2, name: a2 } = t3.result;
        r2 = t3.result.fileUrl;
        const c2 = { url: i2, formData: o2, name: a2, filePath: e, fileType: n2 };
        return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
      }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
        t3.success ? n3({ success: true, filePath: e, fileID: r2 }) : s3(new Q({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }));
    }
    deleteFile({ fileList: e }) {
      const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return e2.result;
        throw new Q({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
      });
    }
    getTempFileURL({ fileList: e } = {}) {
      if (!Array.isArray(e) || 0 === e.length)
        throw new Q({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
      const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e }) };
      return this.request(this.setupRequest(t2)).then((e2) => {
        if (e2.success)
          return { fileList: e2.result.fileList.map((e3) => ({ fileID: e3.fileID, tempFileURL: e3.tempFileURL })) };
        throw new Q({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
      });
    }
  };
  var vt = { init(e) {
    const t2 = new wt(e), n2 = { signInAnonymously: function() {
      return t2.authorize();
    }, getLoginState: function() {
      return Promise.resolve(false);
    } };
    return t2.auth = function() {
      return n2;
    }, t2.customAuth = t2.auth, t2;
  } };
  function St({ data: e }) {
    let t2;
    t2 = ae();
    const n2 = JSON.parse(JSON.stringify(e || {}));
    if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
      const { token: e2 } = ee();
      e2 && (n2.uniIdToken = e2);
    }
    return n2;
  }
  function kt({ name: e, data: t2 } = {}) {
    const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e}`;
    return new Promise((t3, n3) => {
      X.request({ method: "POST", url: o2, data: { name: e, platform: S, provider: r2, spaceId: i2 }, timeout: 3e3, success(e2) {
        t3(e2);
      }, fail() {
        t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
      } });
    }).then(({ data: e2 } = {}) => {
      const { code: t3, message: n3 } = e2 || {};
      return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
    }).then(({ code: n3, message: s3 }) => {
      if (0 !== n3) {
        switch (n3) {
          case "MODULE_ENCRYPTED":
            console.error(`此云函数（${e}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "FUNCTION_ENCRYPTED":
            console.error(`此云函数（${e}）已加密不可本地调试，自动切换为云端已部署的云函数`);
            break;
          case "ACTION_ENCRYPTED":
            console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
            break;
          case "NETWORK_ERROR": {
            const e2 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
            throw console.error(e2), new Error(e2);
          }
          case "SWITCH_TO_CLOUD":
            break;
          default: {
            const e2 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
            throw console.error(e2), new Error(e2);
          }
        }
        return this._callCloudFunction({ name: e, data: t2 });
      }
      return new Promise((e2, n4) => {
        const s4 = St.call(this, { data: t2 });
        X.request({ method: "POST", url: a2, data: { provider: r2, platform: S, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new Q({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e2({ result: s5 }), fail(e3) {
          n4(new Q({ code: e3.code || e3.errCode || "SYS_ERR", message: e3.message || e3.errMsg || "request:fail" }));
        } });
      });
    });
  }
  const It = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
  var bt = /[\\^$.*+?()[\]{}|]/g, Tt = RegExp(bt.source);
  function At(e, t2, n2) {
    return e.replace(new RegExp((s2 = t2) && Tt.test(s2) ? s2.replace(bt, "\\$&") : s2, "g"), n2);
    var s2;
  }
  const Pt = "request", Et = "response", Ot = "both";
  const fn = { code: 2e4, message: "System error" }, pn = { code: 20101, message: "Invalid client" };
  function yn(e) {
    const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e || {};
    return new Q({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || fn.code, message: r2 || o2, cause: a2 });
  }
  let wn;
  function bn({ secretType: e } = {}) {
    return e === Pt || e === Et || e === Ot;
  }
  function Tn({ name: e, data: t2 = {} } = {}) {
    return "DCloud-clientDB" === e && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
  }
  function An({ provider: e, spaceId: t2, functionName: n2 } = {}) {
    const { appId: s2, uniPlatform: r2, osName: i2 } = ie();
    let o2 = r2;
    "app" === r2 && (o2 = i2);
    const a2 = function({ provider: e2, spaceId: t3 } = {}) {
      const n3 = v;
      if (!n3)
        return {};
      e2 = function(e3) {
        return "tencent" === e3 ? "tcb" : e3;
      }(e2);
      const s3 = n3.find((n4) => n4.provider === e2 && n4.spaceId === t3);
      return s3 && s3.config;
    }({ provider: e, spaceId: t2 });
    if (!a2 || !a2.accessControl || !a2.accessControl.enable)
      return false;
    const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
    if (0 === u2.length)
      return true;
    const l2 = function(e2, t3) {
      let n3, s3, r3;
      for (let i3 = 0; i3 < e2.length; i3++) {
        const o3 = e2[i3];
        o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e3) => e3.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
      }
      return n3 || s3 || r3;
    }(u2, n2);
    if (!l2)
      return false;
    if ((c2[l2] || []).find((e2 = {}) => e2.appId === s2 && (e2.platform || "").toLowerCase() === o2.toLowerCase()))
      return true;
    throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), yn(pn);
  }
  function Cn({ functionName: e, result: t2, logPvd: n2 }) {
    if (this.__dev__.debugLog && t2 && t2.requestId) {
      const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e, requestId: t2.requestId });
      console.log(`[${n2}-request]${s2}[/${n2}-request]`);
    }
  }
  function Pn(e) {
    const t2 = e.callFunction, n2 = function(n3) {
      const s2 = n3.name;
      n3.data = St.call(e, { data: n3.data });
      const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = bn(n3), o2 = Tn(n3), a2 = i2 || o2;
      return t2.call(this, n3).then((e2) => (e2.errCode = 0, !a2 && Cn.call(this, { functionName: s2, result: e2, logPvd: r2 }), Promise.resolve(e2)), (e2) => (!a2 && Cn.call(this, { functionName: s2, result: e2, logPvd: r2 }), e2 && e2.message && (e2.message = function({ message: e3 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
        for (let s3 = 0; s3 < n4.length; s3++) {
          const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e3.match(r3);
          if (!a3)
            continue;
          let c2 = i3;
          for (let e4 = 1; e4 < a3.length; e4++)
            c2 = At(c2, `{$${e4}}`, a3[e4]);
          for (const e4 in t3)
            c2 = At(c2, `{${e4}}`, t3[e4]);
          return "replace" === o3 ? c2 : e3 + c2;
        }
        return e3;
      }({ message: `[${n3.name}]: ${e2.message}`, formatter: It, extraInfo: { functionName: s2 } })), Promise.reject(e2)));
    };
    e.callFunction = function(t3) {
      const { provider: s2, spaceId: r2 } = e.config, i2 = t3.name;
      let o2, a2;
      if (t3.data = t3.data || {}, e.__dev__.debugInfo && !e.__dev__.debugInfo.forceRemote && I ? (e._callCloudFunction || (e._callCloudFunction = n2, e._callLocalFunction = kt), o2 = kt) : o2 = n2, o2 = o2.bind(e), Tn(t3))
        a2 = n2.call(e, t3);
      else if (bn(t3)) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e }).wrapEncryptDataCallFunction(n2.bind(e))(t3);
      } else if (An({ provider: s2, spaceId: r2, functionName: i2 })) {
        a2 = new wn({ secretType: t3.secretType, uniCloudIns: e }).wrapVerifyClientCallFunction(n2.bind(e))(t3);
      } else
        a2 = o2(t3);
      return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
    };
  }
  wn = class {
    constructor() {
      throw yn({ message: `Platform ${S} is not enabled, please check whether secure network module is enabled in your manifest.json` });
    }
  };
  const En = Symbol("CLIENT_DB_INTERNAL");
  function On(e, t2) {
    return e.then = "DoNotReturnProxyWithAFunctionNamedThen", e._internalType = En, e.inspect = null, e.__v_raw = void 0, new Proxy(e, { get(e2, n2, s2) {
      if ("_uniClient" === n2)
        return null;
      if ("symbol" == typeof n2)
        return e2[n2];
      if (n2 in e2 || "string" != typeof n2) {
        const t3 = e2[n2];
        return "function" == typeof t3 ? t3.bind(e2) : t3;
      }
      return t2.get(e2, n2, s2);
    } });
  }
  function xn(e) {
    return { on: (t2, n2) => {
      e[t2] = e[t2] || [], e[t2].indexOf(n2) > -1 || e[t2].push(n2);
    }, off: (t2, n2) => {
      e[t2] = e[t2] || [];
      const s2 = e[t2].indexOf(n2);
      -1 !== s2 && e[t2].splice(s2, 1);
    } };
  }
  const Un = ["db.Geo", "db.command", "command.aggregate"];
  function Rn(e, t2) {
    return Un.indexOf(`${e}.${t2}`) > -1;
  }
  function Ln(e) {
    switch (d(e = Z(e))) {
      case "array":
        return e.map((e2) => Ln(e2));
      case "object":
        return e._internalType === En || Object.keys(e).forEach((t2) => {
          e[t2] = Ln(e[t2]);
        }), e;
      case "regexp":
        return { $regexp: { source: e.source, flags: e.flags } };
      case "date":
        return { $date: e.toISOString() };
      default:
        return e;
    }
  }
  function Nn(e) {
    return e && e.content && e.content.$method;
  }
  class Dn {
    constructor(e, t2, n2) {
      this.content = e, this.prevStage = t2 || null, this.udb = null, this._database = n2;
    }
    toJSON() {
      let e = this;
      const t2 = [e.content];
      for (; e.prevStage; )
        e = e.prevStage, t2.push(e.content);
      return { $db: t2.reverse().map((e2) => ({ $method: e2.$method, $param: Ln(e2.$param) })) };
    }
    getAction() {
      const e = this.toJSON().$db.find((e2) => "action" === e2.$method);
      return e && e.$param && e.$param[0];
    }
    getCommand() {
      return { $db: this.toJSON().$db.filter((e) => "action" !== e.$method) };
    }
    get isAggregate() {
      let e = this;
      for (; e; ) {
        const t2 = Nn(e), n2 = Nn(e.prevStage);
        if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isCommand() {
      let e = this;
      for (; e; ) {
        if ("command" === Nn(e))
          return true;
        e = e.prevStage;
      }
      return false;
    }
    get isAggregateCommand() {
      let e = this;
      for (; e; ) {
        const t2 = Nn(e), n2 = Nn(e.prevStage);
        if ("aggregate" === t2 && "command" === n2)
          return true;
        e = e.prevStage;
      }
      return false;
    }
    getNextStageFn(e) {
      const t2 = this;
      return function() {
        return Fn({ $method: e, $param: Ln(Array.from(arguments)) }, t2, t2._database);
      };
    }
    get count() {
      return this.isAggregate ? this.getNextStageFn("count") : function() {
        return this._send("count", Array.from(arguments));
      };
    }
    get remove() {
      return this.isCommand ? this.getNextStageFn("remove") : function() {
        return this._send("remove", Array.from(arguments));
      };
    }
    get() {
      return this._send("get", Array.from(arguments));
    }
    get add() {
      return this.isCommand ? this.getNextStageFn("add") : function() {
        return this._send("add", Array.from(arguments));
      };
    }
    update() {
      return this._send("update", Array.from(arguments));
    }
    end() {
      return this._send("end", Array.from(arguments));
    }
    get set() {
      return this.isCommand ? this.getNextStageFn("set") : function() {
        throw new Error("JQL禁止使用set方法");
      };
    }
    _send(e, t2) {
      const n2 = this.getAction(), s2 = this.getCommand();
      if (s2.$db.push({ $method: e, $param: Ln(t2) }), y) {
        const e2 = s2.$db.find((e3) => "collection" === e3.$method), t3 = e2 && e2.$param;
        t3 && 1 === t3.length && "string" == typeof e2.$param[0] && e2.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
      }
      return this._database._callCloudFunction({ action: n2, command: s2 });
    }
  }
  function Fn(e, t2, n2) {
    return On(new Dn(e, t2, n2), { get(e2, t3) {
      let s2 = "db";
      return e2 && e2.content && (s2 = e2.content.$method), Rn(s2, t3) ? Fn({ $method: t3 }, e2, n2) : function() {
        return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, e2, n2);
      };
    } });
  }
  function qn({ path: e, method: t2 }) {
    return class {
      constructor() {
        this.param = Array.from(arguments);
      }
      toJSON() {
        return { $newDb: [...e.map((e2) => ({ $method: e2 })), { $method: t2, $param: this.param }] };
      }
    };
  }
  function Kn(e, t2 = {}) {
    return On(new e(t2), { get: (e2, t3) => Rn("db", t3) ? Fn({ $method: t3 }, null, e2) : function() {
      return Fn({ $method: t3, $param: Ln(Array.from(arguments)) }, null, e2);
    } });
  }
  class jn extends class {
    constructor({ uniClient: e = {}, isJQL: t2 = false } = {}) {
      this._uniClient = e, this._authCallBacks = {}, this._dbCallBacks = {}, e.isDefault && (this._dbCallBacks = C("_globalUniCloudDatabaseCallback")), t2 || (this.auth = xn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, xn(this._dbCallBacks)), this.env = On({}, { get: (e2, t3) => ({ $env: t3 }) }), this.Geo = On({}, { get: (e2, t3) => qn({ path: ["Geo"], method: t3 }) }), this.serverDate = qn({ path: [], method: "serverDate" }), this.RegExp = qn({ path: [], method: "RegExp" });
    }
    getCloudEnv(e) {
      if ("string" != typeof e || !e.trim())
        throw new Error("getCloudEnv参数错误");
      return { $env: e.replace("$cloudEnv_", "") };
    }
    _callback(e, t2) {
      const n2 = this._dbCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    _callbackAuth(e, t2) {
      const n2 = this._authCallBacks;
      n2[e] && n2[e].forEach((e2) => {
        e2(...t2);
      });
    }
    multiSend() {
      const e = Array.from(arguments), t2 = e.map((e2) => {
        const t3 = e2.getAction(), n2 = e2.getCommand();
        if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
          throw new Error("multiSend只支持子命令内使用getTemp");
        return { action: t3, command: n2 };
      });
      return this._callCloudFunction({ multiCommand: t2, queryList: e });
    }
  } {
    _parseResult(e) {
      return this._isJQL ? e.result : e;
    }
    _callCloudFunction({ action: e, command: t2, multiCommand: n2, queryList: s2 }) {
      function r2(e2, t3) {
        if (n2 && s2)
          for (let n3 = 0; n3 < s2.length; n3++) {
            const r3 = s2[n3];
            r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e2.result.dataList[n3]));
          }
      }
      const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
      function a2(e2) {
        return i2._callback("error", [e2]), U(R(o2, "fail"), e2).then(() => U(R(o2, "complete"), e2)).then(() => (r2(null, e2), z(D, { type: K, content: e2 }), Promise.reject(e2)));
      }
      const c2 = U(R(o2, "invoke")), u2 = this._uniClient;
      return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e, command: t2, multiCommand: n2 } })).then((e2) => {
        const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e2.result;
        if (u3)
          for (let e3 = 0; e3 < u3.length; e3++) {
            const { level: t4, message: n4, detail: s4 } = u3[e3], r3 = console["warn" === t4 ? "error" : t4] || console.log;
            let i3 = "[System Info]" + n4;
            s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
          }
        if (t3) {
          return a2(new Q({ code: t3, message: n3, requestId: e2.requestId }));
        }
        e2.result.errCode = e2.result.errCode || e2.result.code, e2.result.errMsg = e2.result.errMsg || e2.result.message, s3 && c3 && (te({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), z(q, { token: s3, tokenExpired: c3 }));
        const l2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
        for (let t4 = 0; t4 < l2.length; t4++) {
          const { prop: n4, tips: s4 } = l2[t4];
          if (n4 in e2.result) {
            const t5 = e2.result[n4];
            Object.defineProperty(e2.result, n4, { get: () => (console.warn(s4), t5) });
          }
        }
        return function(e3) {
          return U(R(o2, "success"), e3).then(() => U(R(o2, "complete"), e3)).then(() => {
            r2(e3, null);
            const t4 = i2._parseResult(e3);
            return z(D, { type: K, content: t4 }), Promise.resolve(t4);
          });
        }(e2);
      }, (e2) => {
        /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e2.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
        return a2(new Q({ code: e2.code || "SYSTEM_ERROR", message: e2.message, requestId: e2.requestId }));
      });
    }
  }
  const Mn = "token无效，跳转登录页面", Bn = "token过期，跳转登录页面", $n = { TOKEN_INVALID_TOKEN_EXPIRED: Bn, TOKEN_INVALID_INVALID_CLIENTID: Mn, TOKEN_INVALID: Mn, TOKEN_INVALID_WRONG_TOKEN: Mn, TOKEN_INVALID_ANONYMOUS_USER: Mn }, Wn = { "uni-id-token-expired": Bn, "uni-id-check-token-failed": Mn, "uni-id-token-not-exist": Mn, "uni-id-check-device-feature-failed": Mn };
  function zn(e, t2) {
    let n2 = "";
    return n2 = e ? `${e}/${t2}` : t2, n2.replace(/^\//, "");
  }
  function Jn(e = [], t2 = "") {
    const n2 = [], s2 = [];
    return e.forEach((e2) => {
      true === e2.needLogin ? n2.push(zn(t2, e2.path)) : false === e2.needLogin && s2.push(zn(t2, e2.path));
    }), { needLoginPage: n2, notNeedLoginPage: s2 };
  }
  function Hn(e) {
    return e.split("?")[0].replace(/^\//, "");
  }
  function Gn() {
    return function(e) {
      let t2 = e && e.$page && e.$page.fullPath || "";
      return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
    }(function() {
      const e = getCurrentPages();
      return e[e.length - 1];
    }());
  }
  function Vn() {
    return Hn(Gn());
  }
  function Yn(e = "", t2 = {}) {
    if (!e)
      return false;
    if (!(t2 && t2.list && t2.list.length))
      return false;
    const n2 = t2.list, s2 = Hn(e);
    return n2.some((e2) => e2.pagePath === s2);
  }
  const Qn = !!t.uniIdRouter;
  const { loginPage: Xn, routerNeedLogin: Zn, resToLogin: es, needLoginPage: ts, notNeedLoginPage: ns, loginPageInTabBar: ss } = function({ pages: e = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = t) {
    const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Jn(e), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e2 = []) {
      const t2 = [], n3 = [];
      return e2.forEach((e3) => {
        const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = Jn(r3, s3);
        t2.push(...i3), n3.push(...o3);
      }), { needLoginPage: t2, notNeedLoginPage: n3 };
    }(n2);
    return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: Yn(i2, r2) };
  }();
  if (ts.indexOf(Xn) > -1)
    throw new Error(`Login page [${Xn}] should not be "needLogin", please check your pages.json`);
  function rs(e) {
    const t2 = Vn();
    if ("/" === e.charAt(0))
      return e;
    const [n2, s2] = e.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
    i2.pop();
    for (let e2 = 0; e2 < r2.length; e2++) {
      const t3 = r2[e2];
      ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
    }
    return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
  }
  function is(e) {
    const t2 = Hn(rs(e));
    return !(ns.indexOf(t2) > -1) && (ts.indexOf(t2) > -1 || Zn.some((t3) => function(e2, t4) {
      return new RegExp(t4).test(e2);
    }(e, t3)));
  }
  function os({ redirect: e }) {
    const t2 = Hn(e), n2 = Hn(Xn);
    return Vn() !== n2 && t2 !== n2;
  }
  function as({ api: e, redirect: t2 } = {}) {
    if (!t2 || !os({ redirect: t2 }))
      return;
    const n2 = function(e2, t3) {
      return "/" !== e2.charAt(0) && (e2 = "/" + e2), t3 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e2;
    }(Xn, t2);
    ss ? "navigateTo" !== e && "redirectTo" !== e || (e = "switchTab") : "switchTab" === e && (e = "navigateTo");
    const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
    setTimeout(() => {
      s2[e]({ url: n2 });
    });
  }
  function cs({ url: e } = {}) {
    const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
      const { token: e2, tokenExpired: t3 } = ee();
      let n3;
      if (e2) {
        if (t3 < Date.now()) {
          const e3 = "uni-id-token-expired";
          n3 = { errCode: e3, errMsg: Wn[e3] };
        }
      } else {
        const e3 = "uni-id-check-token-failed";
        n3 = { errCode: e3, errMsg: Wn[e3] };
      }
      return n3;
    }();
    if (is(e) && n2) {
      n2.uniIdRedirectUrl = e;
      if (B(F).length > 0)
        return setTimeout(() => {
          z(F, n2);
        }, 0), t2.abortLoginPageJump = true, t2;
      t2.autoToLoginPage = true;
    }
    return t2;
  }
  function us() {
    !function() {
      const e2 = Gn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = cs({ url: e2 });
      t2 || n2 && as({ api: "redirectTo", redirect: e2 });
    }();
    const e = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
    for (let t2 = 0; t2 < e.length; t2++) {
      const n2 = e[t2];
      uni.addInterceptor(n2, { invoke(e2) {
        const { abortLoginPageJump: t3, autoToLoginPage: s2 } = cs({ url: e2.url });
        return t3 ? e2 : s2 ? (as({ api: n2, redirect: rs(e2.url) }), false) : e2;
      } });
    }
  }
  function ls() {
    this.onResponse((e) => {
      const { type: t2, content: n2 } = e;
      let s2 = false;
      switch (t2) {
        case "cloudobject":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in Wn;
          }(n2);
          break;
        case "clientdb":
          s2 = function(e2) {
            if ("object" != typeof e2)
              return false;
            const { errCode: t3 } = e2 || {};
            return t3 in $n;
          }(n2);
      }
      s2 && function(e2 = {}) {
        const t3 = B(F);
        G().then(() => {
          const n3 = Gn();
          if (n3 && os({ redirect: n3 }))
            return t3.length > 0 ? z(F, Object.assign({ uniIdRedirectUrl: n3 }, e2)) : void (Xn && as({ api: "navigateTo", redirect: n3 }));
        });
      }(n2);
    });
  }
  function hs(e) {
    !function(e2) {
      e2.onResponse = function(e3) {
        $(D, e3);
      }, e2.offResponse = function(e3) {
        W(D, e3);
      };
    }(e), function(e2) {
      e2.onNeedLogin = function(e3) {
        $(F, e3);
      }, e2.offNeedLogin = function(e3) {
        W(F, e3);
      }, Qn && (C("_globalUniCloudStatus").needLoginInit || (C("_globalUniCloudStatus").needLoginInit = true, G().then(() => {
        us.call(e2);
      }), es && ls.call(e2)));
    }(e), function(e2) {
      e2.onRefreshToken = function(e3) {
        $(q, e3);
      }, e2.offRefreshToken = function(e3) {
        W(q, e3);
      };
    }(e);
  }
  let ds;
  const fs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ps = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
  function gs() {
    const e = ee().token || "", t2 = e.split(".");
    if (!e || 3 !== t2.length)
      return { uid: null, role: [], permission: [], tokenExpired: 0 };
    let n2;
    try {
      n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ds(s2).split("").map(function(e2) {
        return "%" + ("00" + e2.charCodeAt(0).toString(16)).slice(-2);
      }).join(""))));
    } catch (e2) {
      throw new Error("获取当前用户信息出错，详细错误信息为：" + e2.message);
    }
    var s2;
    return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
  }
  ds = "function" != typeof atob ? function(e) {
    if (e = String(e).replace(/[\t\n\f\r ]+/g, ""), !ps.test(e))
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    var t2;
    e += "==".slice(2 - (3 & e.length));
    for (var n2, s2, r2 = "", i2 = 0; i2 < e.length; )
      t2 = fs.indexOf(e.charAt(i2++)) << 18 | fs.indexOf(e.charAt(i2++)) << 12 | (n2 = fs.indexOf(e.charAt(i2++))) << 6 | (s2 = fs.indexOf(e.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
    return r2;
  } : atob;
  var ms = s(function(e, t2) {
    Object.defineProperty(t2, "__esModule", { value: true });
    const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
    function r2(e2, t3) {
      return e2.tempFiles.forEach((e3, n3) => {
        e3.name || (e3.name = e3.path.substring(e3.path.lastIndexOf("/") + 1)), t3 && (e3.fileType = t3), e3.cloudPath = Date.now() + "_" + n3 + e3.name.substring(e3.name.lastIndexOf("."));
      }), e2.tempFilePaths || (e2.tempFilePaths = e2.tempFiles.map((e3) => e3.path)), e2;
    }
    function i2(e2, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
      return t3.then((e3) => {
        if (s3) {
          const t4 = s3(e3);
          if (void 0 !== t4)
            return Promise.resolve(t4).then((t5) => void 0 === t5 ? e3 : t5);
        }
        return e3;
      }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e3, t5, s4 = 5, r4) {
        (t5 = Object.assign({}, t5)).errMsg = n2;
        const i3 = t5.tempFiles, o2 = i3.length;
        let a2 = 0;
        return new Promise((n3) => {
          for (; a2 < s4; )
            c2();
          function c2() {
            const s5 = a2++;
            if (s5 >= o2)
              return void (!i3.find((e4) => !e4.url && !e4.errMsg) && n3(t5));
            const u2 = i3[s5];
            e3.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e4) {
              e4.index = s5, e4.tempFile = u2, e4.tempFilePath = u2.path, r4 && r4(e4);
            } }).then((e4) => {
              u2.url = e4.fileID, s5 < o2 && c2();
            }).catch((e4) => {
              u2.errMsg = e4.errMsg || e4.message, s5 < o2 && c2();
            });
          }
        });
      }(e2, t4, 5, r3));
    }
    t2.initChooseAndUploadFile = function(e2) {
      return function(t3 = { type: "all" }) {
        return "image" === t3.type ? i2(e2, function(e3) {
          const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e3;
          return new Promise((e4, a2) => {
            uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
              e4(r2(t5, "image"));
            }, fail(e5) {
              a2({ errMsg: e5.errMsg.replace("chooseImage:fail", s2) });
            } });
          });
        }(t3), t3) : "video" === t3.type ? i2(e2, function(e3) {
          const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e3;
          return new Promise((e4, c2) => {
            uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
              const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
              e4(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
            }, fail(e5) {
              c2({ errMsg: e5.errMsg.replace("chooseVideo:fail", s2) });
            } });
          });
        }(t3), t3) : i2(e2, function(e3) {
          const { count: t4, extension: n3 } = e3;
          return new Promise((e4, i3) => {
            let o2 = uni.chooseFile;
            if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
              return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
            o2({ type: "all", count: t4, extension: n3, success(t5) {
              e4(r2(t5));
            }, fail(e5) {
              i3({ errMsg: e5.errMsg.replace("chooseFile:fail", s2) });
            } });
          });
        }(t3), t3);
      };
    };
  }), ys = n(ms);
  const _s = "manual";
  function ws(e) {
    return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
      this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
        var e2 = [];
        return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
          e2.push(this[t2]);
        }), e2;
      }, (e2, t2) => {
        if (this.loadtime === _s)
          return;
        let n2 = false;
        const s2 = [];
        for (let r2 = 2; r2 < e2.length; r2++)
          e2[r2] !== t2[r2] && (s2.push(e2[r2]), n2 = true);
        e2[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
      });
    }, methods: { onMixinDatacomPropsChange(e2, t2) {
    }, mixinDatacomEasyGet({ getone: e2 = false, success: t2, fail: n2 } = {}) {
      this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
        this.mixinDatacomLoading = false;
        const { data: s2, count: r2 } = n3.result;
        this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
        const i2 = e2 ? s2.length ? s2[0] : void 0 : s2;
        this.mixinDatacomResData = i2, t2 && t2(i2);
      }).catch((e3) => {
        this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e3, n2 && n2(e3);
      }));
    }, mixinDatacomGet(t2 = {}) {
      let n2 = e.database(this.spaceInfo);
      const s2 = t2.action || this.action;
      s2 && (n2 = n2.action(s2));
      const r2 = t2.collection || this.collection;
      n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
      const i2 = t2.where || this.where;
      i2 && Object.keys(i2).length && (n2 = n2.where(i2));
      const o2 = t2.field || this.field;
      o2 && (n2 = n2.field(o2));
      const a2 = t2.foreignKey || this.foreignKey;
      a2 && (n2 = n2.foreignKey(a2));
      const c2 = t2.groupby || this.groupby;
      c2 && (n2 = n2.groupBy(c2));
      const u2 = t2.groupField || this.groupField;
      u2 && (n2 = n2.groupField(u2));
      true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
      const l2 = t2.orderby || this.orderby;
      l2 && (n2 = n2.orderBy(l2));
      const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, f2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, p2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
      return p2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
    } } };
  }
  function vs(e) {
    return function(t2, n2 = {}) {
      n2 = function(e2, t3 = {}) {
        return e2.customUI = t3.customUI || e2.customUI, e2.parseSystemError = t3.parseSystemError || e2.parseSystemError, Object.assign(e2.loadingOptions, t3.loadingOptions), Object.assign(e2.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e2.secretMethods = t3.secretMethods), e2;
      }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
      const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
      return new Proxy({}, { get: (s3, c2) => function({ fn: e2, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await U(R(t3, "invoke"), { ...r3 }), i3 = await e2(...s4), await U(R(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e3) {
            throw o3 = e3, await U(R(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await U(R(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let h2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: l, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e2, t3) {
          const n3 = t3.data.method, s5 = e2.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let f2 = false;
        try {
          h2 = await e.callFunction(d2);
        } catch (e2) {
          f2 = true, h2 = { result: new Q(e2) };
        }
        const { errSubject: p2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (te(y2), z(q, { ...y2 })), g2) {
          let e2 = m2;
          if (f2 && o2) {
            e2 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: p2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e2, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e3, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e4) {
                      i3(e4);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e2, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new Q({ subject: p2, code: g2, message: m2, requestId: h2.requestId });
          throw n3.detail = h2.result, z(D, { type: M, content: n3 }), n3;
        }
        return z(D, { type: M, content: h2.result }), h2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e2 } = {}) {
        return { objectName: t2, methodName: c2, params: e2 };
      } }) });
    };
  }
  function Ss(e) {
    return C("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e.config.spaceId));
  }
  async function ks({ callLoginByWeixin: e = false } = {}) {
    Ss(this);
    throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${S}\``);
  }
  async function Is(e) {
    const t2 = Ss(this);
    return t2.initPromise || (t2.initPromise = ks.call(this, e)), t2.initPromise;
  }
  function bs(e) {
    return function({ callLoginByWeixin: t2 = false } = {}) {
      return Is.call(e, { callLoginByWeixin: t2 });
    };
  }
  async function Ts(e, t2) {
    const n2 = `http://${e}:${t2}/system/ping`;
    try {
      const e2 = await (s2 = { url: n2, timeout: 500 }, new Promise((e3, t3) => {
        X.request({ ...s2, success(t4) {
          e3(t4);
        }, fail(e4) {
          t3(e4);
        } });
      }));
      return !(!e2.data || 0 !== e2.data.code);
    } catch (e2) {
      return false;
    }
    var s2;
  }
  function As(e) {
    if (e.initUniCloudStatus && "rejected" !== e.initUniCloudStatus)
      return;
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e2) => {
      setTimeout(() => {
        e2();
      }, n2);
    }), e.isReady = false, e.isDefault = false;
    const s2 = e.auth();
    e.initUniCloudStatus = "pending", e.initUniCloud = t2.then(() => s2.getLoginState()).then((e2) => e2 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
      {
        const { osName: e2, osVersion: t3 } = ie();
        "ios" === e2 && function(e3) {
          if (!e3 || "string" != typeof e3)
            return 0;
          const t4 = e3.match(/^(\d+)./);
          return t4 && t4[1] ? parseInt(t4[1]) : 0;
        }(t3) >= 14 && console.warn("iOS 14及以上版本连接uniCloud本地调试服务需要允许客户端查找并连接到本地网络上的设备（仅开发模式生效，发行模式会连接uniCloud云端服务）");
      }
      if (e.__dev__.debugInfo) {
        const { address: t3, servePort: n3 } = e.__dev__.debugInfo;
        return async function(e2, t4) {
          let n4;
          for (let s3 = 0; s3 < e2.length; s3++) {
            const r2 = e2[s3];
            if (await Ts(r2, t4)) {
              n4 = r2;
              break;
            }
          }
          return { address: n4, port: t4 };
        }(t3, n3);
      }
    }).then(({ address: t3, port: n3 } = {}) => {
      const s3 = console["error"];
      if (t3)
        e.__dev__.localAddress = t3, e.__dev__.localPort = n3;
      else if (e.__dev__.debugInfo) {
        let t4 = "";
        "remote" === e.__dev__.debugInfo.initialLaunchType ? (e.__dev__.debugInfo.forceRemote = true, t4 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : t4 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", t4 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === S.indexOf("mp-") && (t4 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s3(t4);
      }
    }).then(() => {
      e.isReady = true, e.initUniCloudStatus = "fulfilled";
    }).catch((t3) => {
      console.error(t3), e.initUniCloudStatus = "rejected";
    });
  }
  const Cs = { tcb: _t, tencent: _t, aliyun: de, private: vt };
  let Ps = new class {
    init(e) {
      let t2 = {};
      const n2 = Cs[e.provider];
      if (!n2)
        throw new Error("未提供正确的provider参数");
      t2 = n2.init(e), t2.__dev__ = {}, t2.__dev__.debugLog = "app" === S;
      const s2 = k;
      s2 && !s2.code && (t2.__dev__.debugInfo = s2), As(t2), t2.reInit = function() {
        As(this);
      }, Pn(t2), function(e2) {
        const t3 = e2.uploadFile;
        e2.uploadFile = function(e3) {
          return t3.call(this, e3);
        };
      }(t2), function(e2) {
        e2.database = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).database();
          if (this._database)
            return this._database;
          const n3 = Kn(jn, { uniClient: e2 });
          return this._database = n3, n3;
        }, e2.databaseForJQL = function(t3) {
          if (t3 && Object.keys(t3).length > 0)
            return e2.init(t3).databaseForJQL();
          if (this._databaseForJQL)
            return this._databaseForJQL;
          const n3 = Kn(jn, { uniClient: e2, isJQL: true });
          return this._databaseForJQL = n3, n3;
        };
      }(t2), function(e2) {
        e2.getCurrentUserInfo = gs, e2.chooseAndUploadFile = ys.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
          return ws(e2);
        } }), e2.importObject = vs(e2), e2.initSecureNetworkByWeixin = bs(e2);
      }(t2);
      return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e2) => {
        if (!t2[e2])
          return;
        const n3 = t2[e2];
        t2[e2] = function() {
          return t2.reInit(), n3.apply(t2, Array.from(arguments));
        }, t2[e2] = Y(t2[e2], e2).bind(t2);
      }), t2.init = this.init, t2;
    }
  }();
  (() => {
    const e = I;
    let t2 = {};
    if (e && 1 === e.length)
      t2 = e[0], Ps = Ps.init(t2), Ps.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e && e.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e2) => {
        Ps[e2] = function() {
          return console.error(n2), Promise.reject(new Q({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(Ps, { get mixinDatacom() {
      return ws(Ps);
    } }), hs(Ps), Ps.addInterceptor = O, Ps.removeInterceptor = x, Ps.interceptObject = L;
  })();
  var Es = Ps;
  const ERR_MSG_OK = "chooseAndUploadFile:ok";
  const ERR_MSG_FAIL = "chooseAndUploadFile:fail";
  function chooseImage(opts) {
    const {
      count: count2,
      sizeType = ["original", "compressed"],
      sourceType = ["album", "camera"],
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseImage({
        count: count2,
        sizeType,
        sourceType,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res, "image"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseImage:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseVideo(opts) {
    const {
      camera,
      compressed,
      maxDuration,
      sourceType = ["album", "camera"],
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      uni.chooseVideo({
        camera,
        compressed,
        maxDuration,
        sourceType,
        extension,
        success(res) {
          const {
            tempFilePath,
            duration,
            size,
            height,
            width
          } = res;
          resolve(normalizeChooseAndUploadFileRes({
            errMsg: "chooseVideo:ok",
            tempFilePaths: [tempFilePath],
            tempFiles: [
              {
                name: res.tempFile && res.tempFile.name || "",
                path: tempFilePath,
                size,
                type: res.tempFile && res.tempFile.type || "",
                width,
                height,
                duration,
                fileType: "video",
                cloudPath: ""
              }
            ]
          }, "video"));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseVideo:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function chooseAll(opts) {
    const {
      count: count2,
      extension
    } = opts;
    return new Promise((resolve, reject) => {
      let chooseFile = uni.chooseFile;
      if (typeof wx !== "undefined" && typeof wx.chooseMessageFile === "function") {
        chooseFile = wx.chooseMessageFile;
      }
      if (typeof chooseFile !== "function") {
        return reject({
          errMsg: ERR_MSG_FAIL + " 请指定 type 类型，该平台仅支持选择 image 或 video。"
        });
      }
      chooseFile({
        type: "all",
        count: count2,
        extension,
        success(res) {
          resolve(normalizeChooseAndUploadFileRes(res));
        },
        fail(res) {
          reject({
            errMsg: res.errMsg.replace("chooseFile:fail", ERR_MSG_FAIL)
          });
        }
      });
    });
  }
  function normalizeChooseAndUploadFileRes(res, fileType) {
    res.tempFiles.forEach((item, index) => {
      if (!item.name) {
        item.name = item.path.substring(item.path.lastIndexOf("/") + 1);
      }
      if (fileType) {
        item.fileType = fileType;
      }
      item.cloudPath = Date.now() + "_" + index + item.name.substring(item.name.lastIndexOf("."));
    });
    if (!res.tempFilePaths) {
      res.tempFilePaths = res.tempFiles.map((file) => file.path);
    }
    return res;
  }
  function uploadCloudFiles(files, max2 = 5, onUploadProgress) {
    files = JSON.parse(JSON.stringify(files));
    const len = files.length;
    let count2 = 0;
    let self2 = this;
    return new Promise((resolve) => {
      while (count2 < max2) {
        next();
      }
      function next() {
        let cur = count2++;
        if (cur >= len) {
          !files.find((item) => !item.url && !item.errMsg) && resolve(files);
          return;
        }
        const fileItem = files[cur];
        const index = self2.files.findIndex((v2) => v2.uuid === fileItem.uuid);
        fileItem.url = "";
        delete fileItem.errMsg;
        Es.uploadFile({
          filePath: fileItem.path,
          cloudPath: fileItem.cloudPath,
          fileType: fileItem.fileType,
          onUploadProgress: (res) => {
            res.index = index;
            onUploadProgress && onUploadProgress(res);
          }
        }).then((res) => {
          fileItem.url = res.fileID;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        }).catch((res) => {
          fileItem.errMsg = res.errMsg || res.message;
          fileItem.index = index;
          if (cur < len) {
            next();
          }
        });
      }
    });
  }
  function uploadFiles(choosePromise, {
    onChooseFile,
    onUploadProgress
  }) {
    return choosePromise.then((res) => {
      if (onChooseFile) {
        const customChooseRes = onChooseFile(res);
        if (typeof customChooseRes !== "undefined") {
          return Promise.resolve(customChooseRes).then((chooseRes) => typeof chooseRes === "undefined" ? res : chooseRes);
        }
      }
      return res;
    }).then((res) => {
      if (res === false) {
        return {
          errMsg: ERR_MSG_OK,
          tempFilePaths: [],
          tempFiles: []
        };
      }
      return res;
    });
  }
  function chooseAndUploadFile(opts = {
    type: "all"
  }) {
    if (opts.type === "image") {
      return uploadFiles(chooseImage(opts), opts);
    } else if (opts.type === "video") {
      return uploadFiles(chooseVideo(opts), opts);
    }
    return uploadFiles(chooseAll(opts), opts);
  }
  const get_file_ext = (name) => {
    const last_len = name.lastIndexOf(".");
    const len = name.length;
    return {
      name: name.substring(0, last_len),
      ext: name.substring(last_len + 1, len)
    };
  };
  const get_extname = (fileExtname) => {
    if (!Array.isArray(fileExtname)) {
      let extname = fileExtname.replace(/(\[|\])/g, "");
      return extname.split(",");
    } else {
      return fileExtname;
    }
  };
  const get_files_and_is_max = (res, _extname) => {
    let filePaths = [];
    let files = [];
    if (!_extname || _extname.length === 0) {
      return {
        filePaths,
        files
      };
    }
    res.tempFiles.forEach((v2) => {
      let fileFullName = get_file_ext(v2.name);
      const extname = fileFullName.ext.toLowerCase();
      if (_extname.indexOf(extname) !== -1) {
        files.push(v2);
        filePaths.push(v2.path);
      }
    });
    if (files.length !== res.tempFiles.length) {
      uni.showToast({
        title: `当前选择了${res.tempFiles.length}个文件 ，${res.tempFiles.length - files.length} 个文件格式不正确`,
        icon: "none",
        duration: 5e3
      });
    }
    return {
      filePaths,
      files
    };
  };
  const get_file_info = (filepath) => {
    return new Promise((resolve, reject) => {
      uni.getImageInfo({
        src: filepath,
        success(res) {
          resolve(res);
        },
        fail(err) {
          reject(err);
        }
      });
    });
  };
  const get_file_data = async (files, type = "image") => {
    let fileFullName = get_file_ext(files.name);
    const extname = fileFullName.ext.toLowerCase();
    let filedata = {
      name: files.name,
      uuid: files.uuid,
      extname: extname || "",
      cloudPath: files.cloudPath,
      fileType: files.fileType,
      url: files.path || files.path,
      size: files.size,
      //单位是字节
      image: {},
      path: files.path,
      video: {}
    };
    if (type === "image") {
      const imageinfo = await get_file_info(files.path);
      delete filedata.video;
      filedata.image.width = imageinfo.width;
      filedata.image.height = imageinfo.height;
      filedata.image.location = imageinfo.path;
    } else {
      delete filedata.image;
    }
    return filedata;
  };
  const _sfc_main$s = {
    name: "uploadImage",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto",
            border: {}
          };
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      styles() {
        let styles = {
          width: "auto",
          height: "auto",
          border: {}
        };
        return Object.assign(styles, this.imageStyles);
      },
      boxStyle() {
        const {
          width = "auto",
          height = "auto"
        } = this.styles;
        let obj = {};
        if (height === "auto") {
          if (width !== "auto") {
            obj.height = this.value2px(width);
            obj["padding-top"] = 0;
          } else {
            obj.height = 0;
          }
        } else {
          obj.height = this.value2px(height);
          obj["padding-top"] = 0;
        }
        if (width === "auto") {
          if (height !== "auto") {
            obj.width = this.value2px(height);
          } else {
            obj.width = "33.3%";
          }
        } else {
          obj.width = this.value2px(width);
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderStyle() {
        let {
          border
        } = this.styles;
        let obj = {};
        const widthDefaultValue = 1;
        const radiusDefaultValue = 3;
        if (typeof border === "boolean") {
          obj.border = border ? "1px #eee solid" : "none";
        } else {
          let width = border && border.width || widthDefaultValue;
          width = this.value2px(width);
          let radius = border && border.radius || radiusDefaultValue;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": border && border.style || "solid",
            "border-color": border && border.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", item);
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      prviewImage(img, index) {
        let urls = [];
        if (Number(this.limit) === 1 && this.disablePreview && !this.disabled) {
          this.$emit("choose");
        }
        if (this.disablePreview)
          return;
        this.filesList.forEach((i2) => {
          urls.push(i2.url);
        });
        uni.previewImage({
          urls,
          current: index
        });
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          if (value.indexOf("%") === -1) {
            value = value.indexOf("px") !== -1 ? value : value + "px";
          }
        }
        return value;
      }
    }
  };
  function _sfc_render$j(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.filesList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock(
            "view",
            {
              class: "file-picker__box",
              key: index,
              style: vue.normalizeStyle($options.boxStyle)
            },
            [
              vue.createElementVNode(
                "view",
                {
                  class: "file-picker__box-content",
                  style: vue.normalizeStyle($options.borderStyle)
                },
                [
                  vue.createElementVNode("image", {
                    class: "file-image",
                    src: item.url,
                    mode: "aspectFill",
                    onClick: vue.withModifiers(($event) => $options.prviewImage(item, index), ["stop"])
                  }, null, 8, ["src", "onClick"]),
                  $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "icon-del-box",
                    onClick: vue.withModifiers(($event) => $options.delFile(index), ["stop"])
                  }, [
                    vue.createElementVNode("view", { class: "icon-del" }),
                    vue.createElementVNode("view", { class: "icon-del rotate" })
                  ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.errMsg ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 2,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                4
                /* STYLE */
              )
            ],
            4
            /* STYLE */
          );
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      $props.filesList.length < $props.limit && !$props.readonly ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: "file-picker__box",
          style: vue.normalizeStyle($options.boxStyle)
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: "file-picker__box-content is-add",
              style: vue.normalizeStyle($options.borderStyle),
              onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
            },
            [
              vue.renderSlot(_ctx.$slots, "default", {}, () => [
                vue.createElementVNode("view", { class: "icon-add" }),
                vue.createElementVNode("view", { class: "icon-add rotate" })
              ], true)
            ],
            4
            /* STYLE */
          )
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadImage = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["render", _sfc_render$j], ["__scopeId", "data-v-bdfc07e0"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-file-picker/components/uni-file-picker/upload-image.vue"]]);
  const _sfc_main$r = {
    name: "uploadFile",
    emits: ["uploadFiles", "choose", "delFile"],
    props: {
      filesList: {
        type: Array,
        default() {
          return [];
        }
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      limit: {
        type: [Number, String],
        default: 9
      },
      showType: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      list() {
        let files = [];
        this.filesList.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      styles() {
        let styles = {
          border: true,
          dividline: true,
          "border-style": {}
        };
        return Object.assign(styles, this.listStyles);
      },
      borderStyle() {
        let {
          borderStyle,
          border
        } = this.styles;
        let obj = {};
        if (!border) {
          obj.border = "none";
        } else {
          let width = borderStyle && borderStyle.width || 1;
          width = this.value2px(width);
          let radius = borderStyle && borderStyle.radius || 5;
          radius = this.value2px(radius);
          obj = {
            "border-width": width,
            "border-style": borderStyle && borderStyle.style || "solid",
            "border-color": borderStyle && borderStyle.color || "#eee",
            "border-radius": radius
          };
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      },
      borderLineStyle() {
        let obj = {};
        let {
          borderStyle
        } = this.styles;
        if (borderStyle && borderStyle.color) {
          obj["border-color"] = borderStyle.color;
        }
        if (borderStyle && borderStyle.width) {
          let width = borderStyle && borderStyle.width || 1;
          let style = borderStyle && borderStyle.style || 0;
          if (typeof width === "number") {
            width += "px";
          } else {
            width = width.indexOf("px") ? width : width + "px";
          }
          obj["border-width"] = width;
          if (typeof style === "number") {
            style += "px";
          } else {
            style = style.indexOf("px") ? style : style + "px";
          }
          obj["border-top-style"] = style;
        }
        let classles = "";
        for (let i2 in obj) {
          classles += `${i2}:${obj[i2]};`;
        }
        return classles;
      }
    },
    methods: {
      uploadFiles(item, index) {
        this.$emit("uploadFiles", {
          item,
          index
        });
      },
      choose() {
        this.$emit("choose");
      },
      delFile(index) {
        this.$emit("delFile", index);
      },
      value2px(value) {
        if (typeof value === "number") {
          value += "px";
        } else {
          value = value.indexOf("px") !== -1 ? value : value + "px";
        }
        return value;
      }
    }
  };
  function _sfc_render$i(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker__files" }, [
      !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "files-button",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.choose && $options.choose(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])) : vue.createCommentVNode("v-if", true),
      vue.createCommentVNode(` :class="{'is-text-box':showType === 'list'}" `),
      $options.list.length > 0 ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: "uni-file-picker__lists is-text-box",
          style: vue.normalizeStyle($options.borderStyle)
        },
        [
          vue.createCommentVNode(" ,'is-list-card':showType === 'list-card' "),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($options.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  class: vue.normalizeClass(["uni-file-picker__lists-box", {
                    "files-border": index !== 0 && $options.styles.dividline
                  }]),
                  key: index,
                  style: vue.normalizeStyle(index !== 0 && $options.styles.dividline && $options.borderLineStyle)
                },
                [
                  vue.createElementVNode("view", { class: "uni-file-picker__item" }, [
                    vue.createCommentVNode(` :class="{'is-text-image':showType === 'list'}" `),
                    vue.createCommentVNode(' 	<view class="files__image is-text-image">\r\n						<image class="header-image" :src="item.logo" mode="aspectFit"></image>\r\n					</view> '),
                    vue.createElementVNode(
                      "view",
                      { class: "files__name" },
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    ),
                    $props.delIcon && !$props.readonly ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 0,
                      class: "icon-del-box icon-files",
                      onClick: ($event) => $options.delFile(index)
                    }, [
                      vue.createElementVNode("view", { class: "icon-del icon-files" }),
                      vue.createElementVNode("view", { class: "icon-del rotate" })
                    ], 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                  ]),
                  item.progress && item.progress !== 100 || item.progress === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "file-picker__progress"
                  }, [
                    vue.createElementVNode("progress", {
                      class: "file-picker__progress-item",
                      percent: item.progress === -1 ? 0 : item.progress,
                      "stroke-width": "4",
                      backgroundColor: item.errMsg ? "#ff5a5f" : "#EBEBEB"
                    }, null, 8, ["percent", "backgroundColor"])
                  ])) : vue.createCommentVNode("v-if", true),
                  item.status === "error" ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 1,
                    class: "file-picker__mask",
                    onClick: vue.withModifiers(($event) => $options.uploadFiles(item, index), ["stop"])
                  }, " 点击重试 ", 8, ["onClick"])) : vue.createCommentVNode("v-if", true)
                ],
                6
                /* CLASS, STYLE */
              );
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ],
        4
        /* STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const uploadFile = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["render", _sfc_render$i], ["__scopeId", "data-v-a54939c6"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-file-picker/components/uni-file-picker/upload-file.vue"]]);
  const _sfc_main$q = {
    name: "uniFilePicker",
    components: {
      uploadImage,
      uploadFile
    },
    options: {
      virtualHost: true
    },
    emits: ["select", "success", "fail", "progress", "delete", "update:modelValue", "input"],
    props: {
      modelValue: {
        type: [Array, Object],
        default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disablePreview: {
        type: Boolean,
        default: false
      },
      delIcon: {
        type: Boolean,
        default: true
      },
      // 自动上传
      autoUpload: {
        type: Boolean,
        default: true
      },
      // 最大选择个数 ，h5只能限制单选或是多选
      limit: {
        type: [Number, String],
        default: 9
      },
      // 列表样式 grid | list | list-card
      mode: {
        type: String,
        default: "grid"
      },
      // 选择文件类型  image/video/all
      fileMediatype: {
        type: String,
        default: "image"
      },
      // 文件类型筛选
      fileExtname: {
        type: [Array, String],
        default() {
          return [];
        }
      },
      title: {
        type: String,
        default: ""
      },
      listStyles: {
        type: Object,
        default() {
          return {
            // 是否显示边框
            border: true,
            // 是否显示分隔线
            dividline: true,
            // 线条样式
            borderStyle: {}
          };
        }
      },
      imageStyles: {
        type: Object,
        default() {
          return {
            width: "auto",
            height: "auto"
          };
        }
      },
      readonly: {
        type: Boolean,
        default: false
      },
      returnType: {
        type: String,
        default: "array"
      },
      sizeType: {
        type: Array,
        default() {
          return ["original", "compressed"];
        }
      }
    },
    data() {
      return {
        files: [],
        localValue: []
      };
    },
    watch: {
      modelValue: {
        handler(newVal, oldVal) {
          this.setValue(newVal, oldVal);
        },
        immediate: true
      }
    },
    computed: {
      filesList() {
        let files = [];
        this.files.forEach((v2) => {
          files.push(v2);
        });
        return files;
      },
      showType() {
        if (this.fileMediatype === "image") {
          return this.mode;
        }
        return "list";
      },
      limitLength() {
        if (this.returnType === "object") {
          return 1;
        }
        if (!this.limit) {
          return 1;
        }
        if (this.limit >= 9) {
          return 9;
        }
        return this.limit;
      }
    },
    created() {
      if (!(Es.config && Es.config.provider)) {
        this.noSpace = true;
        Es.chooseAndUploadFile = chooseAndUploadFile;
      }
      this.form = this.getForm("uniForms");
      this.formItem = this.getForm("uniFormsItem");
      if (this.form && this.formItem) {
        if (this.formItem.name) {
          this.rename = this.formItem.name;
          this.form.inputChildrens.push(this);
        }
      }
    },
    methods: {
      /**
       * 公开用户使用，清空文件
       * @param {Object} index
       */
      clearFiles(index) {
        if (index !== 0 && !index) {
          this.files = [];
          this.$nextTick(() => {
            this.setEmit();
          });
        } else {
          this.files.splice(index, 1);
        }
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 公开用户使用，继续上传
       */
      upload() {
        let files = [];
        this.files.forEach((v2, index) => {
          if (v2.status === "ready" || v2.status === "error") {
            files.push(Object.assign({}, v2));
          }
        });
        return this.uploadFiles(files);
      },
      async setValue(newVal, oldVal) {
        const newData = async (v2) => {
          const reg = /cloud:\/\/([\w.]+\/?)\S*/;
          let url = "";
          if (v2.fileID) {
            url = v2.fileID;
          } else {
            url = v2.url;
          }
          if (reg.test(url)) {
            v2.fileID = url;
            v2.url = await this.getTempFileURL(url);
          }
          if (v2.url)
            v2.path = v2.url;
          return v2;
        };
        if (this.returnType === "object") {
          if (newVal) {
            await newData(newVal);
          } else {
            newVal = {};
          }
        } else {
          if (!newVal)
            newVal = [];
          for (let i2 = 0; i2 < newVal.length; i2++) {
            let v2 = newVal[i2];
            await newData(v2);
          }
        }
        this.localValue = newVal;
        if (this.form && this.formItem && !this.is_reset) {
          this.is_reset = false;
          this.formItem.setValue(this.localValue);
        }
        let filesData = Object.keys(newVal).length > 0 ? newVal : [];
        this.files = [].concat(filesData);
      },
      /**
       * 选择文件
       */
      choose() {
        if (this.disabled)
          return;
        if (this.files.length >= Number(this.limitLength) && this.showType !== "grid" && this.returnType === "array") {
          uni.showToast({
            title: `您最多选择 ${this.limitLength} 个文件`,
            icon: "none"
          });
          return;
        }
        this.chooseFiles();
      },
      /**
       * 选择文件并上传
       */
      chooseFiles() {
        const _extname = get_extname(this.fileExtname);
        Es.chooseAndUploadFile({
          type: this.fileMediatype,
          compressed: false,
          sizeType: this.sizeType,
          // TODO 如果为空，video 有问题
          extension: _extname.length > 0 ? _extname : void 0,
          count: this.limitLength - this.files.length,
          //默认9
          onChooseFile: this.chooseFileCallback,
          onUploadProgress: (progressEvent) => {
            this.setProgress(progressEvent, progressEvent.index);
          }
        }).then((result) => {
          this.setSuccessAndError(result.tempFiles);
        }).catch((err) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:364", "选择失败", err);
        });
      },
      /**
       * 选择文件回调
       * @param {Object} res
       */
      async chooseFileCallback(res) {
        const _extname = get_extname(this.fileExtname);
        const is_one = Number(this.limitLength) === 1 && this.disablePreview && !this.disabled || this.returnType === "object";
        if (is_one) {
          this.files = [];
        }
        let {
          filePaths,
          files
        } = get_files_and_is_max(res, _extname);
        if (!(_extname && _extname.length > 0)) {
          filePaths = res.tempFilePaths;
          files = res.tempFiles;
        }
        let currentData = [];
        for (let i2 = 0; i2 < files.length; i2++) {
          if (this.limitLength - this.files.length <= 0)
            break;
          files[i2].uuid = Date.now();
          let filedata = await get_file_data(files[i2], this.fileMediatype);
          filedata.progress = 0;
          filedata.status = "ready";
          this.files.push(filedata);
          currentData.push({
            ...filedata,
            file: files[i2]
          });
        }
        this.$emit("select", {
          tempFiles: currentData,
          tempFilePaths: filePaths
        });
        res.tempFiles = files;
        if (!this.autoUpload || this.noSpace) {
          res.tempFiles = [];
        }
      },
      /**
       * 批传
       * @param {Object} e
       */
      uploadFiles(files) {
        files = [].concat(files);
        return uploadCloudFiles.call(this, files, 5, (res) => {
          this.setProgress(res, res.index, true);
        }).then((result) => {
          this.setSuccessAndError(result);
          return result;
        }).catch((err) => {
          formatAppLog("log", "at uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue:430", err);
        });
      },
      /**
       * 成功或失败
       */
      async setSuccessAndError(res, fn2) {
        let successData = [];
        let errorData = [];
        let tempFilePath = [];
        let errorTempFilePath = [];
        for (let i2 = 0; i2 < res.length; i2++) {
          const item = res[i2];
          const index = item.uuid ? this.files.findIndex((p2) => p2.uuid === item.uuid) : item.index;
          if (index === -1 || !this.files)
            break;
          if (item.errMsg === "request:fail") {
            this.files[index].url = item.path;
            this.files[index].status = "error";
            this.files[index].errMsg = item.errMsg;
            errorData.push(this.files[index]);
            errorTempFilePath.push(this.files[index].url);
          } else {
            this.files[index].errMsg = "";
            this.files[index].fileID = item.url;
            const reg = /cloud:\/\/([\w.]+\/?)\S*/;
            if (reg.test(item.url)) {
              this.files[index].url = await this.getTempFileURL(item.url);
            } else {
              this.files[index].url = item.url;
            }
            this.files[index].status = "success";
            this.files[index].progress += 1;
            successData.push(this.files[index]);
            tempFilePath.push(this.files[index].fileID);
          }
        }
        if (successData.length > 0) {
          this.setEmit();
          this.$emit("success", {
            tempFiles: this.backObject(successData),
            tempFilePaths: tempFilePath
          });
        }
        if (errorData.length > 0) {
          this.$emit("fail", {
            tempFiles: this.backObject(errorData),
            tempFilePaths: errorTempFilePath
          });
        }
      },
      /**
       * 获取进度
       * @param {Object} progressEvent
       * @param {Object} index
       * @param {Object} type
       */
      setProgress(progressEvent, index, type) {
        this.files.length;
        const percentCompleted = Math.round(progressEvent.loaded * 100 / progressEvent.total);
        let idx = index;
        if (!type) {
          idx = this.files.findIndex((p2) => p2.uuid === progressEvent.tempFile.uuid);
        }
        if (idx === -1 || !this.files[idx])
          return;
        this.files[idx].progress = percentCompleted - 1;
        this.$emit("progress", {
          index: idx,
          progress: parseInt(percentCompleted),
          tempFile: this.files[idx]
        });
      },
      /**
       * 删除文件
       * @param {Object} index
       */
      delFile(index) {
        this.$emit("delete", {
          tempFile: this.files[index],
          tempFilePath: this.files[index].url
        });
        this.files.splice(index, 1);
        this.$nextTick(() => {
          this.setEmit();
        });
      },
      /**
       * 获取文件名和后缀
       * @param {Object} name
       */
      getFileExt(name) {
        const last_len = name.lastIndexOf(".");
        const len = name.length;
        return {
          name: name.substring(0, last_len),
          ext: name.substring(last_len + 1, len)
        };
      },
      /**
       * 处理返回事件
       */
      setEmit() {
        let data = [];
        if (this.returnType === "object") {
          data = this.backObject(this.files)[0];
          this.localValue = data ? data : null;
        } else {
          data = this.backObject(this.files);
          if (!this.localValue) {
            this.localValue = [];
          }
          this.localValue = [...data];
        }
        this.$emit("update:modelValue", this.localValue);
      },
      /**
       * 处理返回参数
       * @param {Object} files
       */
      backObject(files) {
        let newFilesData = [];
        files.forEach((v2) => {
          newFilesData.push({
            extname: v2.extname,
            fileType: v2.fileType,
            image: v2.image,
            name: v2.name,
            path: v2.path,
            size: v2.size,
            fileID: v2.fileID,
            url: v2.url
          });
        });
        return newFilesData;
      },
      async getTempFileURL(fileList) {
        fileList = {
          fileList: [].concat(fileList)
        };
        const urls = await Es.getTempFileURL(fileList);
        return urls.fileList[0].tempFileURL || "";
      },
      /**
       * 获取父元素实例
       */
      getForm(name = "uniForms") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_upload_image = vue.resolveComponent("upload-image");
    const _component_upload_file = vue.resolveComponent("upload-file");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-file-picker" }, [
      $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-file-picker__header"
      }, [
        vue.createElementVNode(
          "text",
          { class: "file-title" },
          vue.toDisplayString($props.title),
          1
          /* TEXT */
        ),
        vue.createElementVNode(
          "text",
          { class: "file-count" },
          vue.toDisplayString($options.filesList.length) + "/" + vue.toDisplayString($options.limitLength),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype === "image" && $options.showType === "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_image, {
        key: 1,
        readonly: $props.readonly,
        "image-styles": $props.imageStyles,
        "files-list": $options.filesList,
        limit: $options.limitLength,
        disablePreview: $props.disablePreview,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("view", { class: "is-add" }, [
              vue.createElementVNode("view", { class: "icon-add" }),
              vue.createElementVNode("view", { class: "icon-add rotate" })
            ])
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "image-styles", "files-list", "limit", "disablePreview", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true),
      $props.fileMediatype !== "image" || $options.showType !== "grid" ? (vue.openBlock(), vue.createBlock(_component_upload_file, {
        key: 2,
        readonly: $props.readonly,
        "list-styles": $props.listStyles,
        "files-list": $options.filesList,
        showType: $options.showType,
        delIcon: $props.delIcon,
        onUploadFiles: $options.uploadFiles,
        onChoose: $options.choose,
        onDelFile: $options.delFile
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createElementVNode("button", {
              type: "primary",
              size: "mini"
            }, "选择文件")
          ], true)
        ]),
        _: 3
        /* FORWARDED */
      }, 8, ["readonly", "list-styles", "files-list", "showType", "delIcon", "onUploadFiles", "onChoose", "onDelFile"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["render", _sfc_render$h], ["__scopeId", "data-v-6223573f"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);
  const _sfc_main$p = {
    onLoad(val) {
      formatAppLog("log", "at pages/addErrorQuestion/index.vue:47", "onLoad", val, val.feedType);
      this.feedType = val.feedType;
    },
    onReady() {
    },
    data() {
      return {
        feedType: "",
        formData: {
          type: "",
          feedbackContent: "",
          questionId: "",
          userId: "",
          notesId: "",
          categoryId: "",
          contact: ""
          //联系方式
        },
        errTypeArr: [{
          isCheck: false,
          value: "答案有问题"
        }, {
          isCheck: false,
          value: "答案与解析不相符"
        }, {
          isCheck: false,
          value: "有错别字"
        }, {
          isCheck: false,
          value: "选项有问题"
        }, {
          isCheck: false,
          value: "其他"
        }],
        feedBack: [{
          isCheck: false,
          value: "答案有问题"
        }, {
          isCheck: false,
          value: "答案与解析不相符"
        }],
        feedBackArr: [{
          isCheck: false,
          value: "功能建议"
        }, {
          isCheck: false,
          value: "其他建议"
        }],
        // 校验规则
        rules: {
          type: {
            rules: [
              {
                required: true,
                errorMessage: "请选择错误类型"
              }
              // {
              //        validateFunction: function(rule, value, data, callback) {
              //          __f__('log','at pages/addErrorQuestion/index.vue:106',rule, value, data, callback, '1111');
              //          callback('请至少勾选两个兴趣爱好')
              //          return true
              //        }
              //      },
            ]
          },
          feedbackContent: {
            rules: [{
              required: true,
              errorMessage: "具体内容不能为空"
            }]
          }
        }
      };
    },
    methods: {
      selectFreePhoto(val) {
        val.tempFilePaths.map((item) => {
          this.imgToBase64(item);
        });
      },
      //图片转base64
      imgToBase64(fileUrl) {
        pathToBase64(fileUrl).then((base64) => {
          let fileStream = this.base64toFile(base64);
          this.uploadFileImg(fileStream);
        }).catch((error) => {
          formatAppLog("error", "at pages/addErrorQuestion/index.vue:138", error);
        });
      },
      selectMoneyPhoto(val) {
        val.tempFilePaths.map((item) => {
          this.imgToBase64(item, "moneyPhoto");
        });
      },
      // 图片上传
      uploadFileImg(file) {
        uni.uploadFile({
          url: baseUrl + "/customer/common/oss/upload",
          header: {
            "Ac-Token": uni.getStorageSync("token") || ""
          },
          file,
          name: "file",
          success: (uploadFileRes) => {
            formatAppLog("log", "at pages/addErrorQuestion/index.vue:156", uploadFileRes, "图片上传成功");
          },
          fail: (err) => {
            formatAppLog("log", "at pages/addErrorQuestion/index.vue:159", "图片上传失败", err);
          }
        });
      },
      // bse64转文件流
      base64toFile(dataurl, filename = "file") {
        let arr = dataurl.split(",");
        let mime = arr[0].match(/:(.*?);/)[1];
        let suffix = mime.split("/")[1];
        let bstr = atob(arr[1]);
        let n2 = bstr.length;
        let u8arr = new Uint8Array(n2);
        while (n2--) {
          u8arr[n2] = bstr.charCodeAt(n2);
        }
        return new File([u8arr], `${filename}.${suffix}`, {
          type: mime
        });
      },
      errTypeChange(item, index) {
        let data = "";
        if (this.feedType == "feedBack") {
          formatAppLog("log", "at pages/addErrorQuestion/index.vue:181", this.feedBackArr, index, item);
          this.feedBackArr[index]["isCheck"] = !item.isCheck;
          this.feedBackArr.map((it2) => {
            if (it2.isCheck) {
              if (data) {
                data += "," + it2.value;
              } else {
                data += it2.value;
              }
            }
          });
        } else {
          this.errTypeArr[index]["isCheck"] = !item.isCheck;
          this.errTypeArr.map((it2) => {
            if (it2.isCheck) {
              if (data) {
                data += "," + it2.value;
              } else {
                data += it2.value;
              }
            }
          });
        }
        this.formData.type = data;
      },
      submit(val) {
        formatAppLog("log", "at pages/addErrorQuestion/index.vue:207", this.formData);
        this.$refs["formRef"].validate((err, formData) => {
          if (!err) {
            this.addFeedBackSubmit();
          }
        });
      },
      addFeedBackSubmit() {
        let questionInfo = uni.getStorageSync("errQuestionDetail");
        let userInfo = uni.getStorageSync("userInfo");
        let opt = {
          params: {
            categoryId: questionInfo.categoryId,
            //当前题目的categoryId  只有错题反馈有
            questionId: questionInfo.questionId,
            //当前题目的questionId  只有错题反馈有
            question: questionInfo,
            feedbackContent: this.formData.feedbackContent,
            type: this.formData.type,
            useFlag: this.feedType === "errAnswerFeed" ? 0 : 1,
            // 错题反馈 false  用户反馈 true
            userId: userInfo.userId
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/addErrorQuestion/index.vue:229", "res", res);
            if (res) {
              uni.showToast({
                title: "反馈成功",
                icon: "success",
                duration: 2e3
              });
              setTimeout(() => {
                uni.navigateBack(-1);
              }, 2e3);
            }
          }
        };
        if (this.feedType == "feedBack") {
          delete opt.params.question;
        }
        this.$http("feedBackInfo", opt);
      }
    }
  };
  function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_3);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
    const _component_uni_file_picker = resolveEasycom(vue.resolveDynamicComponent("uni-file-picker"), __easycom_2$1);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("div", { class: "container" }, [
      vue.createVNode(_component_uni_forms, {
        ref: "formRef",
        modelValue: $data.formData,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData = $event),
        "label-width": "100",
        "label-position": "top",
        rules: $data.rules
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_forms_item, {
            label: "错误类型(可多选)",
            name: "type",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", { class: "button-group" }, [
                $data.feedType == "errAnswerFeed" ? (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 0 },
                  vue.renderList($data.errTypeArr, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("button", {
                      class: vue.normalizeClass([{ "isChecked": item.isCheck ? true : false }, "err-type-button"]),
                      type: "default",
                      key: index,
                      onClick: ($event) => $options.errTypeChange(item, index)
                    }, vue.toDisplayString(item.value), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                $data.feedType == "feedBack" ? (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  { key: 1 },
                  vue.renderList($data.feedBackArr, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("button", {
                      class: vue.normalizeClass([{ "isChecked": item.isCheck ? true : false }, "err-type-button"]),
                      type: "default",
                      key: index,
                      onClick: ($event) => $options.errTypeChange(item, index)
                    }, vue.toDisplayString(item.value), 11, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("div", {
                  class: "err-type-button",
                  style: { "padding-left": "8px" }
                })
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, {
            label: "具体内容",
            name: "feedbackContent",
            required: ""
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "textarea",
                modelValue: $data.formData.feedbackContent,
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.feedbackContent = $event),
                placeholder: "欢迎您指出具体错误所在，并提供对应的正确描述。您的耐心指点，是我们前进的动力"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { label: "上传照片" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "example-body" }, [
                vue.createVNode(_component_uni_file_picker, {
                  limit: "3",
                  title: "最多选择4张图片",
                  "file-mediatype": "image",
                  mode: "grid",
                  onSuccess: _ctx.successFreePhoto,
                  onFail: _ctx.fail,
                  onSelect: $options.selectFreePhoto
                }, null, 8, ["onSuccess", "onFail", "onSelect"]),
                vue.createCommentVNode(' <uni-file-picker limit="4" title="最多选择4张图片"></uni-file-picker> ')
              ])
            ]),
            _: 1
            /* STABLE */
          }),
          vue.createVNode(_component_uni_forms_item, { label: "联系方式" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_uni_easyinput, {
                type: "text",
                modelValue: $data.formData.contact,
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.contact = $event),
                placeholder: "请输入您的qq号或者手机号,方便我们联系您"
              }, null, 8, ["modelValue"])
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }, 8, ["modelValue", "rules"]),
      vue.createElementVNode("button", {
        class: "submit-btn",
        type: "primary",
        onClick: _cache[3] || (_cache[3] = ($event) => $options.submit("valiForm"))
      }, "提交")
    ]);
  }
  const PagesAddErrorQuestionIndex = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["render", _sfc_render$g], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/addErrorQuestion/index.vue"]]);
  const _sfc_main$o = {
    name: "uni-stat-select",
    mixins: [Es.mixinDatacom || {}],
    data() {
      return {
        showSelector: false,
        current: "",
        mixinDatacomResData: [],
        apps: [],
        channels: []
      };
    },
    props: {
      localdata: {
        type: Array,
        default() {
          return [];
        }
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      label: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请选择"
      },
      emptyTips: {
        type: String,
        default: "无选项"
      },
      clear: {
        type: Boolean,
        default: true
      },
      defItem: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.last = `${this.collection}_last_selected_option_value`;
      if (this.collection && !this.localdata.length) {
        this.mixinDatacomEasyGet();
      }
    },
    computed: {
      typePlaceholder() {
        const text = {
          "opendb-stat-app-versions": "版本",
          "opendb-app-channels": "渠道",
          "opendb-app-list": "应用"
        };
        const common = this.placeholder;
        const placeholder = text[this.collection];
        return placeholder ? common + placeholder : common;
      }
    },
    watch: {
      localdata: {
        immediate: true,
        handler(val, old) {
          if (Array.isArray(val) && old !== val) {
            this.mixinDatacomResData = val;
          }
        }
      },
      modelValue() {
        this.initDefVal();
      },
      mixinDatacomResData: {
        immediate: true,
        handler(val) {
          if (val.length) {
            this.initDefVal();
          }
        }
      }
    },
    methods: {
      initDefVal() {
        let defValue = "";
        if ((this.value || this.value === 0) && !this.isDisabled(this.value)) {
          defValue = this.value;
        } else if ((this.modelValue || this.modelValue === 0) && !this.isDisabled(this.modelValue)) {
          defValue = this.modelValue;
        } else {
          let strogeValue;
          if (this.collection) {
            strogeValue = uni.getStorageSync(this.last);
          }
          if (strogeValue || strogeValue === 0) {
            defValue = strogeValue;
          } else {
            let defItem = "";
            if (this.defItem > 0 && this.defItem < this.mixinDatacomResData.length) {
              defItem = this.mixinDatacomResData[this.defItem - 1].value;
            }
            defValue = defItem;
          }
          this.emit(defValue);
        }
        const def = this.mixinDatacomResData.find((item) => item.value === defValue);
        this.current = def ? this.formatItemName(def) : "";
      },
      /**
       * @param {[String, Number]} value
       * 判断用户给的 value 是否同时为禁用状态
       */
      isDisabled(value) {
        let isDisabled = false;
        this.mixinDatacomResData.forEach((item) => {
          if (item.value === value) {
            isDisabled = item.disable;
          }
        });
        return isDisabled;
      },
      clearVal() {
        this.emit("");
        if (this.collection) {
          uni.removeStorageSync(this.last);
        }
      },
      change(item) {
        if (!item.disable) {
          this.showSelector = false;
          this.current = this.formatItemName(item);
          this.emit(item.value);
        }
      },
      emit(val) {
        this.$emit("change", val);
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
        if (this.collection) {
          uni.setStorageSync(this.last, val);
        }
      },
      toggleSelector() {
        if (this.disabled) {
          return;
        }
        this.showSelector = !this.showSelector;
      },
      formatItemName(item) {
        let {
          text,
          value,
          channel_code
        } = item;
        channel_code = channel_code ? `(${channel_code})` : "";
        return this.collection.indexOf("app-list") > 0 ? `${text}(${value})` : text ? text : `未命名${channel_code}`;
      }
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-stat__select" }, [
      $props.label ? (vue.openBlock(), vue.createElementBlock(
        "span",
        {
          key: 0,
          class: "uni-label-text hide-on-phone"
        },
        vue.toDisplayString($props.label + "："),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-stat-box", { "uni-stat__actived": $data.current }])
        },
        [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-select", { "uni-select--disabled": $props.disabled }])
            },
            [
              vue.createElementVNode("view", {
                class: "uni-select__input-box",
                onClick: _cache[0] || (_cache[0] = (...args) => $options.toggleSelector && $options.toggleSelector(...args))
              }, [
                $data.current ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: "uni-select__input-text"
                  },
                  vue.toDisplayString($data.current),
                  1
                  /* TEXT */
                )) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "uni-select__input-text uni-select__input-placeholder"
                  },
                  vue.toDisplayString($options.typePlaceholder),
                  1
                  /* TEXT */
                )),
                $data.current && $props.clear ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 2,
                  type: "clear",
                  color: "#c0c4cc",
                  size: "24",
                  onClick: $options.clearVal
                }, null, 8, ["onClick"])) : (vue.openBlock(), vue.createBlock(_component_uni_icons, {
                  key: 3,
                  type: $data.showSelector ? "top" : "bottom",
                  size: "14",
                  color: "#999"
                }, null, 8, ["type"]))
              ]),
              $data.showSelector ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-select--mask",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleSelector && $options.toggleSelector(...args))
              })) : vue.createCommentVNode("v-if", true),
              $data.showSelector ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-select__selector"
              }, [
                vue.createElementVNode("view", { class: "uni-popper__arrow" }),
                vue.createElementVNode("scroll-view", {
                  "scroll-y": "true",
                  class: "uni-select__selector-scroll"
                }, [
                  $data.mixinDatacomResData.length === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "uni-select__selector-empty"
                  }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString($props.emptyTips),
                      1
                      /* TEXT */
                    )
                  ])) : (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    { key: 1 },
                    vue.renderList($data.mixinDatacomResData, (item, index) => {
                      return vue.openBlock(), vue.createElementBlock("view", {
                        class: "uni-select__selector-item",
                        key: index,
                        onClick: ($event) => $options.change(item)
                      }, [
                        vue.createElementVNode(
                          "text",
                          {
                            class: vue.normalizeClass({ "uni-select__selector__disabled": item.disable })
                          },
                          vue.toDisplayString($options.formatItemName(item)),
                          3
                          /* TEXT, CLASS */
                        )
                      ], 8, ["onClick"]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ])
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ],
        2
        /* CLASS */
      )
    ]);
  }
  const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["render", _sfc_render$f], ["__scopeId", "data-v-ddf9e0a2"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-data-select/components/uni-data-select/uni-data-select.vue"]]);
  const _sfc_main$n = {
    onLoad(res) {
      formatAppLog("log", "at pages/examination/index.vue:154", "模拟考试页面获取的参数", res);
    },
    data() {
      return {
        formData: {
          radio: "10",
          //单选题数
          radioScore: "1",
          //单选分值
          multiple: "10",
          //多选
          multipleScore: "1",
          //多选分值
          examTime: "40",
          //考试时间
          score: "15",
          //及格分数
          showRight: false,
          // 答题后是否显示答案
          optionOrder: false,
          //选项乱序 vip
          worongPrior: false,
          //错题优先
          doneNot: false,
          //未做优先
          moreDataWay: 1
          //多选题得分方式
        },
        range: [
          {
            value: 0,
            text: "漏题，按正常答案选项数，算平均分"
          },
          {
            value: 1,
            text: "全部选对，才算得分"
          },
          {
            value: 2,
            text: "漏选，得 50% 分"
          }
        ],
        rules: {
          radio: {
            rules: [{
              required: true,
              errorMessage: "题目数量必填"
            }, {
              validateFunction: (rule, value, data, callback) => {
                formatAppLog("log", "at pages/examination/index.vue:191", value, "value");
                if (value > 0 && value <= 100) {
                  return true;
                } else {
                  return callback("题目数小于100");
                }
              }
            }]
          },
          radioScore: {
            rules: [
              {
                required: true,
                errorMessage: "分值不能为空"
              },
              {
                validateFunction: (rule, value, data, callback) => {
                  formatAppLog("log", "at pages/examination/index.vue:207", value, "value");
                  if (value > 0 && value <= 10) {
                    return true;
                  } else {
                    return callback("分值必须小于10");
                  }
                }
              }
            ]
          },
          multiple: {
            rules: [
              {
                required: true,
                errorMessage: "多选题目数量不能为空"
              },
              {
                validateFunction: (rule, value, data, callback) => {
                  formatAppLog("log", "at pages/examination/index.vue:224", value, "value");
                  if (value > 0 && value <= 200) {
                    return true;
                  } else {
                    return callback("多选题数量必须小于200");
                  }
                }
              }
            ]
          },
          multipleScore: {
            rules: [
              {
                required: true,
                errorMessage: "多选题目分数不能为空"
              },
              {
                validateFunction: (rule, value, data, callback) => {
                  formatAppLog("log", "at pages/examination/index.vue:241", value, "value");
                  if (value > 0 && value <= 20) {
                    return true;
                  } else {
                    return callback("多选题分数小于20");
                  }
                }
              }
            ]
          },
          examTime: {
            rules: [{
              required: true,
              errorMessage: "考试时间不能为空"
            }]
          },
          score: {
            rules: [{
              required: true,
              errorMessage: "及格分数不能为空"
            }, {
              validateFunction: (rule, value, data, callback) => {
                formatAppLog("log", "at pages/examination/index.vue:263", "及格分数", data);
                let totalScore = (data == null ? void 0 : data.radio) * (data == null ? void 0 : data.radioScore) + (data == null ? void 0 : data.multiple) * (data == null ? void 0 : data.multipleScore);
                if (value >= totalScore) {
                  return callback("及格分数必须小于总分数");
                }
              }
            }]
          }
        }
      };
    },
    methods: {
      vipSwitch(type) {
        debugger;
        formatAppLog("log", "at pages/examination/index.vue:279", type);
        let userInfo = uni.getStorageSync("userInfo");
        if (userInfo.vipFlag !== 1e3) {
          uni.showModal({
            title: "提示",
            content: "该功能为VIP专享服务，请购买VIP",
            confirmText: "前往购买",
            success: (res) => {
              formatAppLog("log", "at pages/examination/index.vue:287", res);
              if (res.confirm) {
                uni.redirectTo({
                  url: "../vip/vip"
                });
              }
            }
          });
        } else {
          if (type == "optionOrder") {
            this.formData.optionOrder = !this.formData.optionOrder;
          } else {
            this.formData.worongPrior = !this.formData.worongPrior;
          }
        }
      },
      submitForm() {
        this.$refs.formData.validate().then((res) => {
          formatAppLog("log", "at pages/examination/index.vue:307", "res", res);
          uni.setStorageSync("examSetting", res);
          uni.setStorageSync("answerDataList", []);
          uni.setStorageSync("exerciseResult", {});
          uni.navigateTo({
            url: "../answer/index?listType=1"
          });
        }).catch((err) => {
          formatAppLog("log", "at pages/examination/index.vue:315", "表单验证错误", err);
        });
      }
    },
    computed: {
      totalTopic() {
        return Number(this.formData.radio) + Number(this.formData.multiple);
      },
      totalScore() {
        return Number(this.formData.radioScore) * Number(this.formData.radio) + Number(this.formData.multipleScore) * Number(this.formData.multiple);
      }
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_col = resolveEasycom(vue.resolveDynamicComponent("uni-col"), __easycom_0$4);
    const _component_uni_row = resolveEasycom(vue.resolveDynamicComponent("uni-row"), __easycom_1$4);
    const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
    const _component_uni_forms_item = resolveEasycom(vue.resolveDynamicComponent("uni-forms-item"), __easycom_3);
    const _component_uni_data_select = resolveEasycom(vue.resolveDynamicComponent("uni-data-select"), __easycom_4);
    const _component_uni_forms = resolveEasycom(vue.resolveDynamicComponent("uni-forms"), __easycom_5);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "" }, [
        vue.createVNode(_component_uni_forms, {
          modelValue: $data.formData,
          ref: "formData",
          rules: $data.rules
        }, {
          default: vue.withCtx(() => [
            vue.createVNode(_component_uni_row, { class: "uni-row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", null, "题型(可多选)")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", null, "题数")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", null, "分值")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uni_row, { class: "uni-row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", null, "单选题")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "radio" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          clearable: false,
                          type: "number",
                          modelValue: $data.formData.radio,
                          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.radio = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "radioScore" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          clearable: false,
                          type: "number",
                          modelValue: $data.formData.radioScore,
                          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.radioScore = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uni_row, { class: "uni-row" }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("span", null, "多选题")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "multiple" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          clearable: false,
                          type: "number",
                          modelValue: $data.formData.multiple,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.multiple = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 8 }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_uni_forms_item, { name: "multipleScore" }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_uni_easyinput, {
                          clearable: false,
                          type: "number",
                          modelValue: $data.formData.multipleScore,
                          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.formData.multipleScore = $event)
                        }, null, 8, ["modelValue"])
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createVNode(_component_uni_row, {
              class: "uni-row",
              style: { "text-align": "center" }
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_uni_col, {
                  offset: 2,
                  span: 10
                }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode(
                      "span",
                      null,
                      "总题:" + vue.toDisplayString($options.totalTopic),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                }),
                vue.createVNode(_component_uni_col, { span: 10 }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode(
                      "span",
                      null,
                      "总分:" + vue.toDisplayString($options.totalScore),
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })
              ]),
              _: 1
              /* STABLE */
            }),
            vue.createElementVNode("view", null, [
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 11 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "考试时间")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 10 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "examTime" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uni_easyinput, {
                            clearable: false,
                            type: "number",
                            modelValue: $data.formData.examTime,
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.formData.examTime = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 3 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "分钟")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 11 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "及格分数")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 10 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "score" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uni_easyinput, {
                            clearable: false,
                            type: "number",
                            modelValue: $data.formData.score,
                            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.formData.score = $event)
                          }, null, 8, ["modelValue"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 3 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "分")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 20 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "答题后,显示答案")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 2 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "showRight" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("switch", {
                            color: "#4674f6",
                            checked: $data.formData.showRight,
                            onChange: _cache[6] || (_cache[6] = () => {
                              this.formData.showRight = !this.formData.showRight;
                            })
                          }, null, 40, ["checked"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 20 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, [
                        vue.createTextVNode("选项乱序 "),
                        vue.createElementVNode("img", {
                          src: "/static/answer/vip.png",
                          style: { "width": "50rpx", "height": "25rpx", "margin-right": "10rpx" },
                          alt: "",
                          srcset: ""
                        })
                      ]),
                      vue.createElementVNode("span", { style: { "color": "#999999", "font-size": "14px" } }, "选项随机排序，避免背答案")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 2 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "optionOrder" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("switch", {
                            color: "#4674f6",
                            checked: $data.formData.optionOrder,
                            onChange: _cache[7] || (_cache[7] = ($event) => $options.vipSwitch("optionOrder"))
                          }, null, 40, ["checked"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 20 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, [
                        vue.createTextVNode("错题优先 "),
                        vue.createElementVNode("img", {
                          src: "/static/answer/vip.png",
                          style: { "width": "50rpx", "height": "25rpx", "margin-right": "10rpx" },
                          alt: "",
                          srcset: ""
                        })
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 2 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "worongPrior" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("switch", {
                            color: "#4674f6",
                            checked: $data.formData.worongPrior,
                            onChange: _cache[8] || (_cache[8] = ($event) => $options.vipSwitch("worongPrior"))
                          }, null, 40, ["checked"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 20 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, [
                        vue.createTextVNode("未做优先 "),
                        vue.createElementVNode("img", {
                          src: "/static/answer/vip.png",
                          style: { "width": "50rpx", "height": "25rpx", "margin-right": "10rpx" },
                          alt: "",
                          srcset: ""
                        })
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 2 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "doneNot" }, {
                        default: vue.withCtx(() => [
                          vue.createElementVNode("switch", {
                            color: "#4674f6",
                            checked: $data.formData.doneNot,
                            onChange: _cache[9] || (_cache[9] = ($event) => $options.vipSwitch("doneNot"))
                          }, null, 40, ["checked"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_col, { span: 5 }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("span", null, "多选计分")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  vue.createVNode(_component_uni_col, { span: 19 }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_forms_item, { name: "moreDataWay" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_uni_data_select, {
                            modelValue: $data.formData.moreDataWay,
                            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.formData.moreDataWay = $event),
                            localdata: $data.range,
                            onChange: _ctx.change,
                            label: "请选择"
                          }, null, 8, ["modelValue", "localdata", "onChange"])
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                _: 1
                /* STABLE */
              }),
              vue.createVNode(_component_uni_row, { class: "uni-row" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("button", {
                    type: "primary",
                    class: "btn-submit",
                    onClick: _cache[11] || (_cache[11] = (...args) => $options.submitForm && $options.submitForm(...args))
                  }, "开始考试")
                ]),
                _: 1
                /* STABLE */
              })
            ])
          ]),
          _: 1
          /* STABLE */
        }, 8, ["modelValue", "rules"])
      ])
    ]);
  }
  const PagesExaminationIndex = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["render", _sfc_render$e], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/examination/index.vue"]]);
  const _sfc_main$m = {
    __name: "examination",
    setup(__props) {
      uni.getWindowInfo().windowWidth + "px";
      uni.getWindowInfo().windowHeight + "px";
      useCategory();
      vue.ref(1);
      vue.ref(true);
      const isRight = vue.ref(0);
      const error = vue.ref(0);
      const type = "单选";
      let questionType = vue.ref(0);
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      wx.getStorageSync("statusBarHeight") + "px";
      wx.getStorageSync("navigationBarHeight") + "px";
      wx.getStorageSync("menuButtonHeight") + "px";
      const navigationBarAndStatusBarHeight = wx.getStorageSync("statusBarHeight") + wx.getStorageSync("navigationBarHeight") + "px";
      const back = () => {
        formatAppLog("log", "at pages/examination/examination.vue:265", "123");
        uni.navigateBack({
          delta: 1
        });
      };
      const popup2 = vue.ref(null);
      let popupType = vue.ref("card");
      const toggle = (type2) => {
        if (type2 == "notes") {
          popupType.value = type2;
        } else {
          popupType.value = type2;
        }
        popup2.value.open("bottom");
      };
      let current = vue.ref(0);
      const changeQuestionCurrentIndex = (index) => {
        current.value = index;
        show.value = false;
        popup2.value.close();
      };
      const switchQuestion = (type2) => {
        questionType.value = type2;
        formatAppLog("log", "at pages/examination/examination.vue:291", questionType, "questionType");
      };
      const show = vue.ref(false);
      const change = (e) => {
        show.value = e.show;
      };
      const closePopup = () => {
        show.value = false;
        popup2.value.close();
      };
      let notesText = vue.ref("");
      const addNotesButton = () => {
        let opt = {
          params: {
            notesContent: notesText.value,
            categoryId: list["value"][current.value].categoryId,
            questionId: list["value"][current.value].questionId,
            userId: wx.getStorageSync("userInfo").userId,
            question: list[current.value]
          },
          callBack: (e) => {
            formatAppLog("log", "at pages/examination/examination.vue:315", "笔记添加成功", e);
            show.value = false;
            popup2.value.close();
            notesText.value = "";
            uni.showToast({
              title: "笔记添加成功",
              icon: "none",
              duration: 2e3
            });
          }
        };
        $http("addNotes", opt);
      };
      vue.ref([{
        content: "内容 A"
      }, {
        content: "内容 B"
      }, {
        content: "内容 C"
      }]);
      let collageTag = vue.ref(false);
      const swiperChange = (e) => {
        current.value = e.detail.current;
        collageTag.value = list["value"][e.detail.current]["collectFlag"];
      };
      const selectOption = (option, optionIndex, list2) => {
        formatAppLog("log", "at pages/examination/examination.vue:345", "选择题选择的时候", option, optionIndex, list2);
        formatAppLog("log", "at pages/examination/examination.vue:346", option, optionIndex, list2, "----");
        if (!list2.isSelected && list2.questionTypeName === "单选题") {
          option.isChecked = true;
          list2.isSelected = true;
          let i2 = 0;
          list2.optionsList.map((item, index) => {
            if (item.isRight) {
              item.isChecked = true;
            }
            if (item.isChecked) {
              i2++;
            }
          });
          if (i2 == 1) {
            list2.isSelectRight = true;
            questionRecordList.push({
              categoryId: list2.categoryId,
              questionId: list2.questionId,
              status: 1,
              questionTypeName: list2.questionTypeName
            });
          } else {
            list2.isSelectRight = false;
            !list2.errorHistoryFlag && addErrorQuestion(
              list2.categoryId,
              list2.questionId,
              2
            );
            questionRecordList.push({
              categoryId: list2.categoryId,
              questionId: list2.questionId,
              status: 2,
              questionTypeName: list2.questionTypeName
            });
          }
          formatAppLog("log", "at pages/examination/examination.vue:383", "处理出错添加的数据", questionRecordList);
        }
        if (!list2.isSelected && list2.questionTypeName === "多选题") {
          formatAppLog("log", "at pages/examination/examination.vue:386", "多选题");
          option.isChecked = true;
        }
      };
      const moreAnswer = (option, index, list2) => {
        list2.isSelected = true;
      };
      const errAnswerPost = (list2) => {
        formatAppLog("log", "at pages/examination/examination.vue:398", "答案报错", list2);
        uni.setStorageSync("errQuestionDetail", list2);
        uni.navigateTo({
          url: `../addErrorQuestion/index?feedType=errAnswerFeed`
        });
      };
      const addErrorQuestion = (categoryId, questionId, status) => {
        let opt = {
          params: {
            "categoryId": categoryId,
            "questionId": questionId,
            "status": status
            // "userId": wx.getStorageSync('userInfo').userId
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examination/examination.vue:420", "错题添加成功", res);
          }
        };
        $http("addErrQuestion", opt);
      };
      const questionRecordList = vue.reactive([]);
      const addErrorQuestionList = () => {
        let opt = {
          params: {
            questionRecordList
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examination/examination.vue:434", "批量添加错题记录", res);
          }
        };
        $http("addErrQuestionList", opt);
      };
      const collectAdd = (tag) => {
        formatAppLog("log", "at pages/examination/examination.vue:441", "收藏问题", tag);
        let opt = {
          params: {
            "categoryId": list["value"][current.value]["categoryId"],
            "questionId": list["value"][current.value]["questionId"]
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examination/examination.vue:448", "问题shouc", res);
            collageTag.value = !collageTag.value;
            list["value"][current.value]["collectFlag"] = !tag;
            uni.showToast({
              title: !tag ? "收藏成功" : "删除成功",
              icon: "none",
              duration: 2e3
            });
          }
        };
        tag ? $http("removeCollectQuestion", opt) : $http("collectQuestion", opt);
      };
      vue.computed(() => {
        return list["value"][current.value]["collectFlag"];
      });
      let list = vue.ref([]);
      const currentPage = vue.reactive({
        page: 1,
        size: 10,
        total: 10
      });
      const optionTag = ["A", "B", "C", "D", "E", "F"];
      const getQuestionList = (id) => {
        let opt = {
          params: {
            categoryId: Number(id),
            page: currentPage.page,
            size: currentPage.size
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examination/examination.vue:486", "res", res.records);
            res.records.map((item, index) => {
              const optionObjects = item.options.map((option) => {
                return {
                  label: option,
                  isChecked: "",
                  isRight: false
                };
              });
              let rightAnswerItem = [];
              item.options.map((opt2, optIdx) => {
                item.rightOptions.map((right, rightIdx) => {
                  if (opt2 === right) {
                    rightAnswerItem.push(optIdx);
                  }
                });
              });
              formatAppLog("log", "at pages/examination/examination.vue:505", "rightAnswerItem", rightAnswerItem);
              item.rightAnswerItem = rightAnswerItem;
              const result = optionObjects.map((optionObj) => {
                if (item.rightOptions.includes(optionObj.label)) {
                  optionObj.isRight = true;
                }
                return optionObj;
              });
              item.optionsList = result;
              item.isSelected = false;
            });
            list.value = res.records;
            collageTag.value = res.records[current.value]["collectFlag"];
            currentPage.page = res.page;
            currentPage.size = res.size;
            currentPage.total = res.total;
          }
        };
        $http("getQuestionList", opt);
      };
      const getErrorQuestionList = () => {
        let opt = {
          params: {
            page: currentPage.page,
            size: currentPage.size
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examination/examination.vue:536", "获取错题数据", res);
            res.records.map((item, index) => {
              const optionObjects = item.question.options.map((option) => {
                return {
                  label: option,
                  isChecked: "",
                  isRight: false
                };
              });
              formatAppLog("log", "at pages/examination/examination.vue:546", "optionObjects", optionObjects);
              const result = optionObjects.map((optionObj) => {
                if (item.question.rightOptions.includes(optionObj.label)) {
                  optionObj.isRight = true;
                }
                return optionObj;
              });
              item.question.optionsList = result;
              item.question.isSelected = false;
            });
            let a2 = res.records.map((item) => {
              return item.question;
            });
            list.value = [...a2];
            collageTag.value = res.records[current.value]["collectFlag"];
            currentPage.page = res.page;
            currentPage.size = res.size;
            currentPage.total = res.total;
          }
        };
        $http("getErrorQuestionList", opt);
      };
      onLoad((params) => {
        formatAppLog("log", "at pages/examination/examination.vue:574", "listType", params);
        params.listType == 0 && getQuestionList(uni.getStorageSync("currentCategoryId"));
        if (params.listType == 11) {
          questionType.value = 1;
          getErrorQuestionList();
        }
      });
      onHide(() => {
        formatAppLog("log", "at pages/examination/examination.vue:585", "隐藏页面");
      });
      onUnload(() => {
        formatAppLog("log", "at pages/examination/examination.vue:589", "页面销毁");
        questionRecordList.length > 0 && addErrorQuestionList();
      });
      onReady(() => {
      });
      return (_ctx, _cache) => {
        const _component_page_meta = resolveEasycom(vue.resolveDynamicComponent("page-meta"), __easycom_0$9);
        const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
        const _component_uni_nav_bar = resolveEasycom(vue.resolveDynamicComponent("uni-nav-bar"), __easycom_2$3);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1$5);
        return vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          [
            vue.createCommentVNode(' <page-meta :root-font-size="getRootFontSize()"></page-meta> '),
            vue.createVNode(_component_page_meta, {
              "page-style": "overflow:" + (show.value ? "hidden" : "visible")
            }, null, 8, ["page-style"]),
            vue.createCommentVNode(` <uni-nav-bar :style="{'height':navigationBarAndStatusBarHeight,display:'flex',width:'100%'}" left-icon="left"\r
		:status-bar="true" :leftWidth="0" :title="''" @clickLeft="back">\r
		<view class="button-group">\r
			<button class="type-button mini-btn" type="default" size="mini">答题</button>\r
			<button class="type-button mini-btn" type="default" size="mini">背题</button>\r
		</view>\r
	</uni-nav-bar> `),
            vue.createVNode(_component_uni_nav_bar, {
              style: vue.normalizeStyle({ "height": navigationBarAndStatusBarHeight, display: "flex", width: "100%" }),
              "status-bar": true,
              title: ""
            }, {
              left: vue.withCtx(() => [
                vue.createVNode(_component_uni_icons, {
                  onClick: back,
                  type: "back",
                  color: "#000",
                  size: "24"
                })
              ]),
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "input-view" }, [
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass(["type-button mini-btn", { "active-btn": !vue.unref(questionType) }]),
                      onClick: _cache[0] || (_cache[0] = ($event) => switchQuestion(0))
                    },
                    "答题",
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "button",
                    {
                      class: vue.normalizeClass(["type-button mini-btn", { "active-btn": vue.unref(questionType) }]),
                      onClick: _cache[1] || (_cache[1] = ($event) => switchQuestion(1))
                    },
                    "背题",
                    2
                    /* CLASS */
                  )
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["style"]),
            vue.createElementVNode("view", {
              class: "container",
              "page-font-size": "{{pageFontSize}}",
              "root-font-size": "{{rootFontSize}}"
            }, [
              vue.createElementVNode("swiper", {
                class: "swiper",
                current: vue.unref(current),
                onChange: swiperChange
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(vue.unref(list), (question, index) => {
                    return vue.openBlock(), vue.createElementBlock("swiper-item", { key: index }, [
                      vue.createElementVNode("view", null, [
                        vue.createElementVNode("view", {
                          class: "question",
                          style: { "padding": "0 20rpx" }
                        }, [
                          vue.createElementVNode("view", { class: "question-title" }, [
                            vue.createElementVNode(
                              "text",
                              { class: "option-tag" },
                              vue.toDisplayString(question.difficulty),
                              1
                              /* TEXT */
                            ),
                            vue.createTextVNode(
                              " " + vue.toDisplayString(index + 1) + "、 " + vue.toDisplayString(question.questionTitle),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createCommentVNode(" 单选题逻辑 "),
                          question.questionTypeName === "单选题" && vue.unref(questionType) === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 0,
                            class: "question-options"
                          }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.optionsList, (option, optionIndex) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "question-option",
                                  key: optionIndex,
                                  onClick: ($event) => selectOption(option, optionIndex, question)
                                }, [
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option", { "option-right": question.isSelected === true && option.isRight, "option-error": option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    [
                                      vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                      !question.isSelected || !option.isChecked ? (vue.openBlock(), vue.createElementBlock(
                                        "text",
                                        { key: 0 },
                                        vue.toDisplayString(optionTag[optionIndex]),
                                        1
                                        /* TEXT */
                                      )) : vue.createCommentVNode("v-if", true),
                                      vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option-item", { "option-right-text": question.optionsList.isSelected === true && option.isRight, "option-error-text": option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    vue.toDisplayString(option["label"]),
                                    3
                                    /* TEXT, CLASS */
                                  )
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 多选题逻辑 "),
                          question.questionTypeName === "多选题" && vue.unref(questionType) === 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.optionsList, (option, optionIndex) => {
                                return vue.openBlock(), vue.createElementBlock("view", {
                                  class: "question-option",
                                  key: optionIndex,
                                  onClick: ($event) => selectOption(option, optionIndex, question)
                                }, [
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option", { "more-option-select": option.isChecked || question.isSelected === true && option.isRight, "more-option-error": question.isSelected === true && option.isChecked === true && option.isChecked !== option.isRight }])
                                    },
                                    [
                                      vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                      vue.createElementVNode(
                                        "text",
                                        null,
                                        vue.toDisplayString(optionTag[optionIndex]),
                                        1
                                        /* TEXT */
                                      ),
                                      vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                    ],
                                    2
                                    /* CLASS */
                                  ),
                                  vue.createElementVNode(
                                    "text",
                                    {
                                      class: vue.normalizeClass(["option-item", { "option-right-text": option.isChecked, "option-error-text": question.isSelected === true && option.isChecked && option.isChecked !== option.isRight }])
                                    },
                                    vue.toDisplayString(option["label"]),
                                    3
                                    /* TEXT, CLASS */
                                  )
                                ], 8, ["onClick"]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(" 背题逻辑 "),
                          vue.unref(questionType) === 1 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
                            question.questionTypeName === "单选题" ? (vue.openBlock(), vue.createElementBlock("view", {
                              key: 0,
                              class: "question-options"
                            }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(question.optionsList, (option, optionIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "question-option",
                                    key: optionIndex
                                  }, [
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option", { "option-right": option.isRight, "option-error": option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      [
                                        vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                        !question.isSelected || !option.isChecked ? (vue.openBlock(), vue.createElementBlock(
                                          "text",
                                          { key: 0 },
                                          vue.toDisplayString(option.isRight ? null : optionTag[optionIndex]),
                                          1
                                          /* TEXT */
                                        )) : vue.createCommentVNode("v-if", true),
                                        vue.createCommentVNode(" <text else>{{optionTag[optionIndex]}}</text> ")
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option-item", { "option-right-text": option.isRight, "option-error-text": option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      vue.toDisplayString(option["label"]),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])) : vue.createCommentVNode("v-if", true),
                            vue.createCommentVNode(" 多选题逻辑 "),
                            question.questionTypeName === "多选题" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                              (vue.openBlock(true), vue.createElementBlock(
                                vue.Fragment,
                                null,
                                vue.renderList(question.optionsList, (option, optionIndex) => {
                                  return vue.openBlock(), vue.createElementBlock("view", {
                                    class: "question-option",
                                    key: optionIndex
                                  }, [
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option", { "more-option-select": option.isRight, "more-option-error": question.isSelected === true && option.isChecked === true && option.isChecked !== option.isRight }])
                                      },
                                      [
                                        vue.createCommentVNode(" 如果已经选中 则判断是否选中正确答案 "),
                                        vue.createElementVNode(
                                          "text",
                                          null,
                                          vue.toDisplayString(optionTag[optionIndex]),
                                          1
                                          /* TEXT */
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    ),
                                    vue.createElementVNode(
                                      "text",
                                      {
                                        class: vue.normalizeClass(["option-item", { "option-right-text": option.isRight, "option-error-text": question.isSelected === true && option.isChecked && option.isChecked !== option.isRight }])
                                      },
                                      vue.toDisplayString(option["label"]),
                                      3
                                      /* TEXT, CLASS */
                                    )
                                  ]);
                                }),
                                128
                                /* KEYED_FRAGMENT */
                              ))
                            ])) : vue.createCommentVNode("v-if", true)
                          ])) : vue.createCommentVNode("v-if", true),
                          vue.unref(questionType) === 0 && question.questionTypeName == "多选题" && !question.isSelected ? (vue.openBlock(), vue.createElementBlock("button", {
                            key: 3,
                            class: "post-answer",
                            onClick: ($event) => moreAnswer(_ctx.option, _ctx.optionIndex, question)
                          }, "提交答案", 8, ["onClick"])) : vue.createCommentVNode("v-if", true),
                          vue.createCommentVNode(' :style="{width:winWidth}" '),
                          vue.createCommentVNode("  "),
                          question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                            key: 4,
                            class: "answer"
                          }, [
                            vue.createElementVNode("text", { style: { "font-weight": "500" } }, "答案 "),
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(question.options, (item, index2) => {
                                return vue.openBlock(), vue.createElementBlock("text", {
                                  style: { "color": "#4674f7" },
                                  key: index2
                                }, [
                                  (vue.openBlock(true), vue.createElementBlock(
                                    vue.Fragment,
                                    null,
                                    vue.renderList(question.rightOptions, (it2, dix) => {
                                      return vue.openBlock(), vue.createElementBlock(
                                        "text",
                                        { key: it2 },
                                        vue.toDisplayString(item == it2 ? optionTag[index2] : ""),
                                        1
                                        /* TEXT */
                                      );
                                    }),
                                    128
                                    /* KEYED_FRAGMENT */
                                  ))
                                ]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            )),
                            vue.createElementVNode(
                              "text",
                              { style: { "color": "#4674f7" } },
                              vue.toDisplayString(_ctx.currentQuestionRightItem),
                              1
                              /* TEXT */
                            ),
                            vue.createElementVNode("text", {
                              style: { "color": "#4674f7", "float": "right" },
                              onClick: ($event) => errAnswerPost(question)
                            }, "报错", 8, ["onClick"])
                          ])) : vue.createCommentVNode("v-if", true)
                        ]),
                        question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 0,
                          style: { "width": "100%", "height": "20rpx", "background-color": "#f3f3f3" }
                        })) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" 解析 "),
                        vue.createCommentVNode("  "),
                        question.isSelected || vue.unref(questionType) == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
                          key: 1,
                          class: "bottom-content"
                        }, [
                          vue.createElementVNode("view", { class: "analysis" }, [
                            vue.createElementVNode("view", { style: { "width": "100%", "height": "60rpx" } }, [
                              vue.createElementVNode("text", { class: "answer-info" }, "解析"),
                              vue.createElementVNode("img", {
                                src: "/static/answer/anwser.png",
                                style: { "width": "35rpx", "height": "35rpx", "margin-right": "10rpx" },
                                alt: ""
                              }),
                              vue.createElementVNode("img", {
                                src: "/static/answer/vip.png",
                                style: { "width": "50rpx", "height": "25rpx", "margin-right": "10rpx" },
                                alt: "",
                                srcset: ""
                              })
                            ]),
                            vue.createElementVNode(
                              "view",
                              { style: { "width": "100%", "min-height": "50rpx", "line-height": "50rpx", "display": "inline-block" } },
                              vue.toDisplayString(question.analysis),
                              1
                              /* TEXT */
                            )
                          ]),
                          vue.createElementVNode("view", { class: "note" }, [
                            vue.createElementVNode("text", { class: "answer-info" }, "笔记"),
                            vue.createElementVNode("text", {
                              style: { "color": "#4674f7", "float": "right" },
                              onClick: _cache[2] || (_cache[2] = ($event) => toggle("notes"))
                            }, "添加笔记")
                          ])
                        ])) : vue.createCommentVNode("v-if", true)
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ], 40, ["current"]),
              vue.createElementVNode("view", { class: "foote" }, [
                vue.createElementVNode("view", null, [
                  vue.createCommentVNode(' <button class="button" type="primary"><text class="button-text">底部</text></button> '),
                  vue.createCommentVNode(" 普通弹窗 "),
                  vue.createElementVNode("view", { class: "popup-header" }, [
                    vue.createElementVNode("view", { class: "popup-left" }, [
                      vue.createElementVNode("view", {
                        class: "icon-item",
                        onClick: _cache[3] || (_cache[3] = ($event) => collectAdd(vue.unref(collageTag)))
                      }, [
                        !vue.unref(collageTag) ? (vue.openBlock(), vue.createElementBlock("img", {
                          key: 0,
                          class: "img",
                          src: "/static/answer/college-f.png",
                          alt: "收藏",
                          srcset: ""
                        })) : (vue.openBlock(), vue.createElementBlock("img", {
                          key: 1,
                          class: "img",
                          src: "/static/answer/college-t.png",
                          alt: "收藏",
                          srcset: ""
                        })),
                        vue.createElementVNode("text", null, "收藏")
                      ]),
                      vue.createElementVNode("view", { class: "icon-item" }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/delete.png",
                          alt: "删除",
                          srcset: ""
                        }),
                        vue.createElementVNode("text", null, "删除")
                      ])
                    ]),
                    vue.createElementVNode("view", { class: "popup-right" }, [
                      vue.createElementVNode("view", { class: "icon-item" }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/isRight.png",
                          alt: "正确"
                        }),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(isRight.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "icon-item" }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/error.png",
                          alt: "错误"
                        }),
                        vue.createElementVNode(
                          "text",
                          null,
                          vue.toDisplayString(error.value),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "icon-item",
                        onClick: _cache[4] || (_cache[4] = ($event) => toggle("card"))
                      }, [
                        vue.createElementVNode("img", {
                          class: "img",
                          src: "/static/answer/pannel.png",
                          alt: "面板"
                        }),
                        vue.createElementVNode("text", null, "答题卡")
                      ])
                    ])
                  ]),
                  vue.createVNode(
                    _component_uni_popup,
                    {
                      ref_key: "popup",
                      ref: popup2,
                      "background-color": "#fff",
                      onChange: change
                    },
                    {
                      default: vue.withCtx(() => [
                        vue.unref(popupType) === "card" ? (vue.openBlock(), vue.createElementBlock(
                          "view",
                          {
                            key: 0,
                            class: vue.normalizeClass(["popup-content", { "popup-height": type === "right" }])
                          },
                          [
                            (vue.openBlock(true), vue.createElementBlock(
                              vue.Fragment,
                              null,
                              vue.renderList(vue.unref(list), (item, index) => {
                                return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                                  vue.createTextVNode(
                                    vue.toDisplayString(item.isSelectRight) + " ",
                                    1
                                    /* TEXT */
                                  ),
                                  vue.createCommentVNode(" 'item-list-error':!item.isSelectRight "),
                                  vue.createElementVNode("view", {
                                    class: vue.normalizeClass(["item-list", { "item-list-isRight": item.errorHistoryFlag, "item-list-error": item.errorHistoryFlag, "item-list-current": vue.unref(current) == index }]),
                                    onClick: ($event) => changeQuestionCurrentIndex(index)
                                  }, [
                                    vue.createTextVNode(
                                      vue.toDisplayString(index + 1) + " ",
                                      1
                                      /* TEXT */
                                    ),
                                    item.collectFlag ? (vue.openBlock(), vue.createElementBlock("img", {
                                      key: 0,
                                      class: "item-icon",
                                      src: "/static/answer/college.png",
                                      alt: ""
                                    })) : vue.createCommentVNode("v-if", true)
                                  ], 10, ["onClick"])
                                ]);
                              }),
                              128
                              /* KEYED_FRAGMENT */
                            ))
                          ],
                          2
                          /* CLASS */
                        )) : vue.createCommentVNode("v-if", true),
                        vue.createCommentVNode(" 添加笔记 "),
                        vue.unref(popupType) === "notes" ? (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
                          vue.createElementVNode("view", { style: { "padding": "0 10rpx", "line-height": "80rpx", "height": "80rpx", "background-color": "#f2f2f2", "display": "flex", "justify-content": "space-between" } }, [
                            vue.createVNode(_component_uni_icons, {
                              type: "closeempty",
                              size: "20",
                              onClick: closePopup
                            }),
                            vue.createElementVNode("span", {
                              style: { "color": "#4674F6" },
                              onClick: addNotesButton
                            }, "确认")
                          ]),
                          vue.withDirectives(vue.createElementVNode(
                            "textarea",
                            {
                              class: "width:100%;height:100rpx",
                              type: "textarea",
                              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => vue.isRef(notesText) ? notesText.value = $event : notesText = $event),
                              placeholder: "请输入笔记"
                            },
                            null,
                            512
                            /* NEED_PATCH */
                          ), [
                            [vue.vModelText, vue.unref(notesText)]
                          ])
                        ])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 1
                      /* STABLE */
                    },
                    512
                    /* NEED_PATCH */
                  )
                ])
              ])
            ])
          ],
          64
          /* STABLE_FRAGMENT */
        );
      };
    }
  };
  const PagesExaminationExamination = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/examination/examination.vue"]]);
  const _sfc_main$l = {};
  function _sfc_render$d(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("span", null, "考试成绩")
    ]);
  }
  const PagesExaminationExamScores = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["render", _sfc_render$d], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/examination/examScores.vue"]]);
  const _sfc_main$k = {
    __name: "docView",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      currentInstance.appContext.config.globalProperties;
      onLoad((params) => {
        formatAppLog("log", "at pages/docView/docView.vue:71", params, "跳转携带的参数", uni.getStorageSync("docDetail"));
      });
      onShow(() => {
        Object.assign(docDetail, {
          ...uni.getStorageSync("docDetail")
        });
      });
      const alertDialog = vue.ref(null);
      const userInfo = uni.getStorageSync("userInfo");
      const downLoadDoc = (url) => {
        if (!userInfo.vipFlag) {
          uni.showModal({
            title: "提示",
            content: "您未开通VIP,开通后可以下载!",
            confirmText: "去开通",
            success: function(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: "../../pages/vip/vip"
                });
              } else if (res.cancel) {
                formatAppLog("log", "at pages/docView/docView.vue:93", "用户点击取消");
              }
            }
          });
          return;
        }
        uni.showToast({
          title: "加载中",
          icon: "loading"
        });
        uni.downloadFile({
          url: `${baseUrl}/document/download?downloadFlag=${url}`,
          //仅为示例，并非真实的资源
          header: {
            "Ac-Token": uni.getStorageSync("token") || ""
          },
          success: (res) => {
            formatAppLog("log", "at pages/docView/docView.vue:110", res, "下载的res");
            if (res.statusCode === 200) {
              if (res.header["Content-Type"] === "application/json;charset=utf-8") {
                formatAppLog("log", "at pages/docView/docView.vue:113", "res----", res);
                uni.showToast({
                  title: `下载次数已上限!`,
                  icon: "error"
                });
                return;
              }
              uni.saveFile({
                tempFilePath: res.tempFilePath,
                //下载成功之后返回的临时路径
                success: (e) => {
                  formatAppLog("log", "at pages/docView/docView.vue:124", "e下载文件的地址", e);
                  setTimeout(() => {
                    uni.hideLoading();
                    uni.openDocument({
                      filePath: e.savedFilePath,
                      success: (res2) => {
                        formatAppLog("log", "at pages/docView/docView.vue:131", "openDocument", res2);
                      },
                      fail: (e2) => {
                        uni.showToast({
                          title: `打开失败` + e2
                        });
                      }
                    });
                  }, 200);
                },
                fail: (e) => {
                  uni.showToast({
                    title: `保存失败` + e
                  });
                }
              });
            }
          },
          fail: (e) => {
            uni.showToast({
              title: `文件下载失败` + e,
              icon: "none"
            });
          }
        });
      };
      let docDetail = vue.reactive({});
      return (_ctx, _cache) => {
        const _component_uni_popup_dialog = resolveEasycom(vue.resolveDynamicComponent("uni-popup-dialog"), __easycom_0$3);
        const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1$5);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { style: { "padding": "20rpx" } }, [
            vue.createElementVNode(
              "p",
              { class: "doc-title" },
              vue.toDisplayString(vue.unref(docDetail).docName) + vue.toDisplayString(vue.unref(docDetail).type),
              1
              /* TEXT */
            ),
            vue.createElementVNode("view", { class: "doc-info" }, [
              vue.createElementVNode("img", {
                src: vue.unref(docDetail).type === ".docx" ? `../../static/doc.png` : `../../static/${vue.unref(docDetail).type}.png`,
                class: "icon-type",
                alt: ""
              }, null, 8, ["src"]),
              vue.createTextVNode("   "),
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(vue.unref(docDetail).updateTime),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "doc-type" }, [
              vue.createElementVNode(
                "text",
                null,
                vue.toDisplayString(vue.unref(docDetail).freeFlag ? "免费" : "开通VIP下载"),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "doc-tag" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(docDetail).tags, (item) => {
                  return vue.openBlock(), vue.createElementBlock(
                    "text",
                    { key: item },
                    "#" + vue.toDisplayString(item) + "#",
                    1
                    /* TEXT */
                  );
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "doc-text" }, [
            vue.createElementVNode("text", null, "文档预览")
          ]),
          vue.createElementVNode("view", {
            class: "img-view",
            alt: ""
          }, [
            vue.createElementVNode("ul", null, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(docDetail).previewImages, (item) => {
                  return vue.openBlock(), vue.createElementBlock("li", { key: item }, [
                    vue.createElementVNode("img", {
                      class: "img-item",
                      src: item,
                      alt: ""
                    }, null, 8, ["src"])
                  ]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createCommentVNode(' <img v-for="item in docDetail.previewImages" width="100%" height="400rpx" :key="item" :src="item" alt="" /> ')
          ]),
          vue.createElementVNode("view", { class: "buttom-view" }, [
            vue.createElementVNode("button", {
              class: "dowload-btn",
              onClick: _cache[0] || (_cache[0] = ($event) => downLoadDoc(vue.unref(docDetail).downloadFlag))
            }, "文档下载")
          ]),
          vue.createCommentVNode(' <view>\r\n			<web-view :webview-styles="webviewStyles"\r\n				:src="`http://view.xdocin.com/xdoc?_xdoc=`+docDetail.docDownloadUrl"></web-view>\r\n		</view> '),
          vue.createElementVNode("view", null, [
            vue.createCommentVNode(" 提示窗示例 "),
            vue.createVNode(
              _component_uni_popup,
              {
                ref_key: "alertDialog",
                ref: alertDialog,
                type: "dialog"
              },
              {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_popup_dialog, {
                    type: "error",
                    cancelText: "取消",
                    confirmText: "去开通",
                    title: "提示",
                    content: "您未开通VIP,开通后可以下载!",
                    onConfirm: _ctx.dialogConfirm,
                    onClose: _ctx.dialogClose
                  }, null, 8, ["onConfirm", "onClose"])
                ]),
                _: 1
                /* STABLE */
              },
              512
              /* NEED_PATCH */
            )
          ]),
          vue.createVNode(_component_uni_popup, {
            ref: "popup",
            "background-color": "#fff",
            onChange: _ctx.change
          }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("view", { class: "popup-content" })
            ]),
            _: 1
            /* STABLE */
          }, 8, ["onChange"])
        ]);
      };
    }
  };
  const PagesDocViewDocView = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/docView/docView.vue"]]);
  const _sfc_main$j = {
    name: "UniTag",
    emits: ["click"],
    props: {
      type: {
        // 标签类型default、primary、success、warning、error、royal
        type: String,
        default: "default"
      },
      size: {
        // 标签大小 normal, small
        type: String,
        default: "normal"
      },
      // 标签内容
      text: {
        type: String,
        default: ""
      },
      disabled: {
        // 是否为禁用状态
        type: [Boolean, String],
        default: false
      },
      inverted: {
        // 是否为空心
        type: [Boolean, String],
        default: false
      },
      circle: {
        // 是否为圆角样式
        type: [Boolean, String],
        default: false
      },
      mark: {
        // 是否为标记样式
        type: [Boolean, String],
        default: false
      },
      customStyle: {
        type: String,
        default: ""
      }
    },
    computed: {
      classes() {
        const {
          type,
          disabled,
          inverted,
          circle,
          mark,
          size,
          isTrue
        } = this;
        const classArr = [
          "uni-tag--" + type,
          "uni-tag--" + size,
          isTrue(disabled) ? "uni-tag--disabled" : "",
          isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
          isTrue(circle) ? "uni-tag--circle" : "",
          isTrue(mark) ? "uni-tag--mark" : "",
          // type === 'default' ? 'uni-tag--default' : 'uni-tag-text',
          isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
          size === "small" ? "uni-tag-text--small" : ""
        ];
        return classArr.join(" ");
      }
    },
    methods: {
      isTrue(value) {
        return value === true || value === "true";
      },
      onClick() {
        if (this.isTrue(this.disabled))
          return;
        this.$emit("click");
      }
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.text ? (vue.openBlock(), vue.createElementBlock(
      "text",
      {
        key: 0,
        class: vue.normalizeClass(["uni-tag", $options.classes]),
        style: vue.normalizeStyle($props.customStyle),
        onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
      },
      vue.toDisplayString($props.text),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1$3 = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["render", _sfc_render$c], ["__scopeId", "data-v-1f94d070"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
  const _sfc_main$i = {
    __name: "search",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let questionTitle = vue.ref("");
      onLoad((params) => {
        formatAppLog("log", "at pages/index/search.vue:58", "params", params);
        if (params.type == 1) {
          let keyWord = uni.getStorageSync("keyword");
          questionTitle.value = keyWord.toString();
          keyWord.map((item) => {
            getSearchData(item, params.type);
          });
        }
      });
      const options = ["A", "B", "C", "D", "E", "F", "G"];
      let search = vue.ref("");
      const pastVal = () => {
        uni.getClipboardData({
          success: function(res) {
            questionTitle.value = res.data;
            if (res.data.length == 0) {
              this.search = "暂无数据";
            }
          }
        });
      };
      const searchDataList = vue.ref([]);
      const getSearchData = (keyword, type = 0) => {
        let opt = {
          params: {
            questionTitle: questionTitle.value,
            page: 1,
            size: 20
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/index/search.vue:89", "查询到的数据", res);
            if (type == 1) {
              searchDataList.value = [...searchDataList.value, ...res.records];
            } else {
              searchDataList.value = res.records;
            }
          }
        };
        $http("getQuestionList", opt);
      };
      const clear = () => {
        questionTitle.value = "";
        searchDataList.value = [];
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        const _component_uni_tag = resolveEasycom(vue.resolveDynamicComponent("uni-tag"), __easycom_1$3);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "searchBlock" }, [
            vue.createVNode(_component_uni_easyinput, {
              borderColor: "#CCCCCC",
              type: "textarea",
              modelValue: vue.unref(questionTitle),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(questionTitle) ? questionTitle.value = $event : questionTitle = $event),
              placeholder: "请输入关键字进行搜索或点击粘贴剪切板内容",
              trim: "true",
              "confirm-type": "search",
              maxlength: "1000"
            }, null, 8, ["modelValue"]),
            vue.createElementVNode("view", { class: "search-area" }, [
              vue.createElementVNode("text", { class: "text-button" }),
              vue.createElementVNode("button", {
                style: { "border": "0", "background-color": "transparent" },
                size: "mini",
                onClick: pastVal
              }, "清除并粘贴"),
              vue.createElementVNode("button", {
                style: { "border": "0", "background-color": "transparent" },
                size: "mini",
                onClick: clear
              }, "清除"),
              vue.createElementVNode("button", {
                class: "btn-search",
                size: "mini",
                onClick: getSearchData
              }, "搜索")
            ])
          ]),
          vue.createElementVNode("view", { style: { "margin-top": "10px" } }, [
            searchDataList.value.length > 0 ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList(searchDataList.value, (item, idx) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: "answerArea",
                  key: item.questionId
                }, [
                  vue.createElementVNode("view", { class: "question-title" }, [
                    vue.createVNode(_component_uni_tag, {
                      text: item.questionTypeName,
                      type: "primary",
                      size: "mini"
                    }, null, 8, ["text"]),
                    vue.createTextVNode(
                      "  " + vue.toDisplayString(idx + 1) + "、" + vue.toDisplayString(item.questionTitle),
                      1
                      /* TEXT */
                    )
                  ]),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item.options, (it2, index) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          class: "question-options",
                          key: index
                        },
                        vue.toDisplayString(options[index]) + "." + vue.toDisplayString(it2),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  vue.createElementVNode("text", { style: { "font-weight": "bold" } }, "正确答案:"),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item.rightOptions, (it2, index) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "view",
                        {
                          class: "question-right",
                          key: index
                        },
                        vue.toDisplayString(it2 + " "),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]);
              }),
              128
              /* KEYED_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              style: { "text-align": "center" }
            }, [
              vue.createElementVNode(
                "view",
                null,
                vue.toDisplayString(vue.unref(search)),
                1
                /* TEXT */
              )
            ]))
          ])
        ]);
      };
    }
  };
  const PagesIndexSearch = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-5aac7367"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/index/search.vue"]]);
  const _sfc_main$h = {
    onShow(res) {
      formatAppLog("log", "at pages/pay/pay.vue:58", "跳转支付页面", res);
    },
    data() {
      return {
        activeColor: "#fff",
        current: 0,
        currentIndex: 0,
        items: ["SVIP会员", "VIP会员"],
        titleList: ["搜题服务", "文档服务", "刷题服务", "其他服务"],
        styleType: "text",
        vipPayType: [],
        vipType: [{
          label: "连续包月",
          priceTotal: "68",
          price: "SVIP特属优惠"
        }, {
          label: "12个月",
          priceTotal: "988",
          price: "82.3/月"
        }, {
          label: "6个月",
          priceTotal: "988",
          price: "82.3/月"
        }, {
          label: "3个月",
          priceTotal: "988",
          price: "82.3/月"
        }],
        documentList: []
      };
    },
    watch: {},
    onLoad() {
      this.postVipList();
    },
    methods: {
      onClickItem(e) {
        if (this.current !== e.currentIndex) {
          this.current = e.currentIndex;
          formatAppLog("log", "at pages/pay/pay.vue:99", "e.currentIndex", e.currentIndex);
          this.currentIndex = 0;
          if (this.current === 1) {
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: "#4674F6",
              animation: {
                duration: 400,
                timingFunc: "easeIn"
              }
            });
          } else {
            this.currentIndex = 0;
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: "#28241C",
              animation: {
                duration: 400,
                timingFunc: "easeIn"
              }
            });
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
            formatAppLog("log", "at pages/pay/pay.vue:131", res.records, "会员信息1");
            let paySvipInfo = [];
            let payVipInfo = [];
            res.records.map((item, index) => {
              if (index === 0) {
                paySvipInfo = [
                  {
                    vipCode: "1002",
                    label: "12个月",
                    priceTotal: item.yearPrice,
                    desc: item.vipType,
                    payType: "year_price",
                    vipId: item.vipConfigId,
                    price: Number((item.yearPrice / 12).toFixed(2)) + "/月"
                  },
                  {
                    vipCode: "1002",
                    label: "3个月",
                    priceTotal: item.quarterPrice,
                    desc: item.vipType,
                    vipId: item.vipConfigId,
                    payType: "quarter_price",
                    price: Number((item.quarterPrice / 3).toFixed(2)) + "/月"
                  },
                  {
                    vipCode: "1002",
                    label: "1个月",
                    priceTotal: item.monthPrice,
                    desc: item.vipType,
                    vipId: item.vipConfigId,
                    payType: "month_price"
                    // price: Number((item.monthPrice / 12).toFixed(2)) + '/月'
                  }
                ];
              }
              if (index === 1) {
                payVipInfo = [
                  {
                    vipCode: "1001",
                    label: "12个月",
                    priceTotal: item.yearPrice,
                    desc: item.vipType,
                    payType: "year_price",
                    vipId: item.vipConfigId,
                    price: Number((item.yearPrice / 12).toFixed(2)) + "/月"
                  },
                  {
                    vipCode: "1001",
                    label: "3个月",
                    priceTotal: item.quarterPrice,
                    desc: item.vipType,
                    vipId: item.vipConfigId,
                    payType: "quarter_price",
                    price: Number((item.quarterPrice / 3).toFixed(2)) + "/月"
                  },
                  {
                    vipCode: "1001",
                    label: "1个月",
                    priceTotal: item.monthPrice,
                    desc: item.vipType,
                    vipId: item.vipConfigId,
                    payType: "month_price"
                    // price: Number((item.monthPrice / 12).toFixed(2)) + '/月'
                  }
                ];
              }
            });
            this.vipPayType = [
              [...paySvipInfo],
              [...payVipInfo]
            ];
          }
        };
        this.$http("postVipList", opt);
      },
      userWxPay(val) {
        formatAppLog("log", "at pages/pay/pay.vue:204", "支付选项", val);
        let opt = {
          params: {
            "vipCode": val.vipCode,
            "desc": val.desc,
            "payType": val.payType,
            "vipId": val.vipId
          },
          callBack: (res) => {
            this.wxRequestPayment(res);
          }
        };
        this.$http("wxPay", opt);
      },
      selectPayType(item, index) {
        this.currentIndex = index;
      },
      wxRequestPayment(res) {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          //时间戳
          nonceStr: res.nonceStr,
          //随机字符串
          package: res.package,
          //订单详情扩展字符串
          signType: res.signType,
          //签名方式
          paySign: res.paySign,
          success(res2) {
            formatAppLog("log", "at pages/pay/pay.vue:232", "res调用微信支付", res2);
            uni.showToast({
              title: "开通成功!",
              icon: "success",
              duration: "1500"
            });
            setTimeout(() => {
            }, 2e3);
          },
          fail(res2) {
          }
        });
      }
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_segmented_control = resolveEasycom(vue.resolveDynamicComponent("uni-segmented-control"), __easycom_0$8);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode(
        "div",
        {
          class: "header",
          style: vue.normalizeStyle($data.current === 1 ? "background-color: #4674f6;" : "background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)")
        },
        [
          vue.createElementVNode("view", { class: "uni-padding-wrap uni-common-mt" }, [
            vue.createVNode(_component_uni_segmented_control, {
              current: $data.current,
              values: $data.items,
              "style-type": $data.styleType,
              "active-color": $data.activeColor,
              onClickItem: $options.onClickItem
            }, null, 8, ["current", "values", "style-type", "active-color", "onClickItem"])
          ]),
          $data.current === 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "content"
          }, [
            vue.createElementVNode("view", { class: "model_scrollx flex_row" }, [
              vue.createElementVNode("scroll-view", {
                "show-scrollbar": false,
                class: "uni-swiper-tab",
                "scroll-x": ""
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.vipPayType[0], (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["scrollx_items", { "currentSelectSvip": $data.current == 0 && $data.currentIndex === index, "currentSelectVip": $data.current == 1 && $data.currentIndex === index }]),
                      key: item,
                      onClick: ($event) => $options.selectPayType(item, index)
                    }, [
                      vue.createElementVNode("view", { class: "item-flex" }, [
                        vue.createElementVNode(
                          "span",
                          {
                            class: vue.normalizeClass(["iteme-text", { "labelSvip": "" }])
                          },
                          vue.toDisplayString(item.label),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode("text", { class: "iteme-text price-total" }, [
                          vue.createTextVNode("￥"),
                          vue.createElementVNode(
                            "text",
                            { style: { "font-size": "60rpx" } },
                            vue.toDisplayString(item.priceTotal),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode(
                          "span",
                          {
                            class: vue.normalizeClass(["iteme-text price", { "currentSelectColor": $data.currentIndex === index }])
                          },
                          vue.toDisplayString(item.price),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("button", {
                class: "pay-btn",
                onClick: _cache[0] || (_cache[0] = ($event) => $options.userWxPay($data.vipPayType[$data.current][$data.currentIndex]))
              }, "立即开通")
            ])
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "content"
          }, [
            vue.createElementVNode("view", { class: "model_scrollx flex_row" }, [
              vue.createElementVNode("scroll-view", {
                "show-scrollbar": false,
                class: "uni-swiper-tab",
                "scroll-x": ""
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($data.vipPayType[1], (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: vue.normalizeClass(["scrollx_items", { "currentSelectVip": $data.currentIndex === index }]),
                      key: index,
                      onClick: ($event) => $options.selectPayType(item, index)
                    }, [
                      vue.createElementVNode("view", { class: "item-flex" }, [
                        vue.createElementVNode(
                          "span",
                          {
                            class: vue.normalizeClass(["iteme-text", { "label-vip": $data.currentIndex === index }])
                          },
                          vue.toDisplayString(item.label),
                          3
                          /* TEXT, CLASS */
                        ),
                        vue.createElementVNode("text", {
                          class: vue.normalizeClass(["iteme-text price-total", { "price-total-vip": true }])
                        }, [
                          vue.createTextVNode("￥"),
                          vue.createElementVNode(
                            "text",
                            { style: { "font-size": "60rpx" } },
                            vue.toDisplayString(item.priceTotal),
                            1
                            /* TEXT */
                          )
                        ]),
                        vue.createElementVNode(
                          "span",
                          {
                            class: vue.normalizeClass(["iteme-text price", { "price-vip": $data.currentIndex === index }])
                          },
                          vue.toDisplayString(item.price),
                          3
                          /* TEXT, CLASS */
                        )
                      ])
                    ], 10, ["onClick"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("button", {
                class: "pay-btn-vip",
                onClick: _cache[1] || (_cache[1] = ($event) => $options.userWxPay($data.vipPayType[$data.current][$data.currentIndex]))
              }, "立即开通")
            ])
          ]))
        ],
        4
        /* STYLE */
      )
    ]);
  }
  const PagesPayPay = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$b], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/pay/pay.vue"]]);
  const _sfc_main$g = {
    name: "UniBadge",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: "error"
      },
      inverted: {
        type: Boolean,
        default: false
      },
      isDot: {
        type: Boolean,
        default: false
      },
      maxNum: {
        type: Number,
        default: 99
      },
      absolute: {
        type: String,
        default: ""
      },
      offset: {
        type: Array,
        default() {
          return [0, 0];
        }
      },
      text: {
        type: [String, Number],
        default: ""
      },
      size: {
        type: String,
        default: "small"
      },
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {};
    },
    computed: {
      width() {
        return String(this.text).length * 8 + 12;
      },
      classNames() {
        const {
          inverted,
          type,
          size,
          absolute
        } = this;
        return [
          inverted ? "uni-badge--" + type + "-inverted" : "",
          "uni-badge--" + type,
          "uni-badge--" + size,
          absolute ? "uni-badge--absolute" : ""
        ].join(" ");
      },
      positionStyle() {
        if (!this.absolute)
          return {};
        let w = this.width / 2, h2 = 10;
        if (this.isDot) {
          w = 5;
          h2 = 5;
        }
        const x2 = `${-w + this.offset[0]}px`;
        const y2 = `${-h2 + this.offset[1]}px`;
        const whiteList = {
          rightTop: {
            right: x2,
            top: y2
          },
          rightBottom: {
            right: x2,
            bottom: y2
          },
          leftBottom: {
            left: x2,
            bottom: y2
          },
          leftTop: {
            left: x2,
            top: y2
          }
        };
        const match = whiteList[this.absolute];
        return match ? match : whiteList["rightTop"];
      },
      dotStyle() {
        if (!this.isDot)
          return {};
        return {
          width: "10px",
          minWidth: "0",
          height: "10px",
          padding: "0",
          borderRadius: "10px"
        };
      },
      displayValue() {
        const {
          isDot,
          text,
          maxNum
        } = this;
        return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
      }
    },
    methods: {
      onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-badge--x" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.text ? (vue.openBlock(), vue.createElementBlock(
        "text",
        {
          key: 0,
          class: vue.normalizeClass([$options.classNames, "uni-badge"]),
          style: vue.normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
        },
        vue.toDisplayString($options.displayValue),
        7
        /* TEXT, CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$a], ["__scopeId", "data-v-c97cb896"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);
  const _sfc_main$f = {
    name: "UniListItem",
    emits: ["click", "switchChange"],
    props: {
      direction: {
        type: String,
        default: "row"
      },
      title: {
        type: String,
        default: ""
      },
      note: {
        type: String,
        default: ""
      },
      ellipsis: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      clickable: {
        type: Boolean,
        default: false
      },
      showArrow: {
        type: [Boolean, String],
        default: false
      },
      link: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: ""
      },
      showBadge: {
        type: [Boolean, String],
        default: false
      },
      showSwitch: {
        type: [Boolean, String],
        default: false
      },
      switchChecked: {
        type: [Boolean, String],
        default: false
      },
      badgeText: {
        type: String,
        default: ""
      },
      badgeType: {
        type: String,
        default: "success"
      },
      badgeStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      rightText: {
        type: String,
        default: ""
      },
      thumb: {
        type: String,
        default: ""
      },
      thumbSize: {
        type: String,
        default: "base"
      },
      showExtraIcon: {
        type: [Boolean, String],
        default: false
      },
      extraIcon: {
        type: Object,
        default() {
          return {
            type: "",
            color: "#000000",
            size: 20
          };
        }
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    // inject: ['list'],
    data() {
      return {
        isFirstChild: false
      };
    },
    mounted() {
      this.list = this.getForm();
      if (this.list) {
        if (!this.list.firstChildAppend) {
          this.list.firstChildAppend = true;
          this.isFirstChild = true;
        }
      }
    },
    methods: {
      /**
       * 获取父元素实例
       */
      getForm(name = "uniList") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      },
      onClick() {
        if (this.to !== "") {
          this.openPage();
          return;
        }
        if (this.clickable || this.link) {
          this.$emit("click", {
            data: {}
          });
        }
      },
      onSwitchChange(e) {
        this.$emit("switchChange", e.detail);
      },
      openPage() {
        if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
          this.pageApi(this.link);
        } else {
          this.pageApi("navigateTo");
        }
      },
      pageApi(api2) {
        let callback = {
          url: this.to,
          success: (res) => {
            this.$emit("click", {
              data: res
            });
          },
          fail: (err) => {
            this.$emit("click", {
              data: err
            });
          }
        };
        switch (api2) {
          case "navigateTo":
            uni.navigateTo(callback);
            break;
          case "redirectTo":
            uni.redirectTo(callback);
            break;
          case "reLaunch":
            uni.reLaunch(callback);
            break;
          case "switchTab":
            uni.switchTab(callback);
            break;
          default:
            uni.navigateTo(callback);
        }
      }
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    const _component_uni_badge = resolveEasycom(vue.resolveDynamicComponent("uni-badge"), __easycom_1$2);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: vue.normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      "hover-class": !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          class: vue.normalizeClass(["border--left", { "uni-list--border": $props.border }])
        },
        null,
        2
        /* CLASS */
      )) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }])
        },
        [
          vue.renderSlot(_ctx.$slots, "header", {}, () => [
            vue.createElementVNode("view", { class: "uni-list-item__header" }, [
              $props.thumb ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-list-item__icon"
              }, [
                vue.createElementVNode("image", {
                  src: $props.thumb,
                  class: vue.normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
                }, null, 10, ["src"])
              ])) : $props.showExtraIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-list-item__icon"
              }, [
                vue.createVNode(_component_uni_icons, {
                  color: $props.extraIcon.color,
                  size: $props.extraIcon.size,
                  type: $props.extraIcon.type
                }, null, 8, ["color", "size", "type"])
              ])) : vue.createCommentVNode("v-if", true)
            ])
          ], true),
          vue.renderSlot(_ctx.$slots, "body", {}, () => [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
              },
              [
                $props.title ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
                  },
                  vue.toDisplayString($props.title),
                  3
                  /* TEXT, CLASS */
                )) : vue.createCommentVNode("v-if", true),
                $props.note ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 1,
                    class: "uni-list-item__content-note"
                  },
                  vue.toDisplayString($props.note),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )
          ], true),
          vue.renderSlot(_ctx.$slots, "footer", {}, () => [
            $props.rightText || $props.showBadge || $props.showSwitch ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
              },
              [
                $props.rightText ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: "uni-list-item__extra-text"
                  },
                  vue.toDisplayString($props.rightText),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true),
                $props.showBadge ? (vue.openBlock(), vue.createBlock(_component_uni_badge, {
                  key: 1,
                  type: $props.badgeType,
                  text: $props.badgeText,
                  "custom-style": $props.badgeStyle
                }, null, 8, ["type", "text", "custom-style"])) : vue.createCommentVNode("v-if", true),
                $props.showSwitch ? (vue.openBlock(), vue.createElementBlock("switch", {
                  key: 2,
                  disabled: $props.disabled,
                  checked: $props.switchChecked,
                  onChange: _cache[0] || (_cache[0] = (...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
                }, null, 40, ["disabled", "checked"])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            )) : vue.createCommentVNode("v-if", true)
          ], true)
        ],
        2
        /* CLASS */
      ),
      $props.showArrow || $props.link ? (vue.openBlock(), vue.createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : vue.createCommentVNode("v-if", true)
    ], 10, ["hover-class"]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$9], ["__scopeId", "data-v-c7524739"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
  const _sfc_main$e = {
    name: "uniList",
    "mp-weixin": {
      options: {
        multipleSlots: false
      }
    },
    props: {
      enableBackToTop: {
        type: [Boolean, String],
        default: false
      },
      scrollY: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: Boolean,
        default: true
      }
    },
    // provide() {
    // 	return {
    // 		list: this
    // 	};
    // },
    created() {
      this.firstChildAppend = false;
    },
    methods: {
      loadMore(e) {
        this.$emit("scrolltolower");
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-list uni-border-top-bottom" }, [
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "uni-list--border-top"
      })) : vue.createCommentVNode("v-if", true),
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      $props.border ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "uni-list--border-bottom"
      })) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$8], ["__scopeId", "data-v-c2f1266a"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-list/components/uni-list/uni-list.vue"]]);
  const _sfc_main$d = {
    data() {
      return {
        dataList: []
      };
    },
    onLoad() {
      this.getQuestionList();
    },
    methods: {
      jumpPage(type, item) {
        formatAppLog("log", "at pages/questionType/questionType.vue:38", "跳转的参数", item);
        if (type === "difficulty") {
          uni.navigateTo({
            url: `../answer/index?listType=4&difficulty=${item.label}`
          });
        } else {
          uni.navigateTo({
            url: `../answer/index?listType=4&questionTypeName=${item.label}`
          });
        }
      },
      getQuestionList() {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/questionType/questionType.vue:56", res, "题型练习的res");
            formatAppLog("log", "at pages/questionType/questionType.vue:57", "data", res);
            let arr = {
              "难度练习": [],
              "题型练习": []
            };
            Object.keys(res["难度练习"]).map((item, index) => {
              arr["难度练习"].push({
                label: item,
                num: res["难度练习"][item]
              });
            });
            Object.keys(res["题型练习"]).map((item, index) => {
              arr["题型练习"].push({
                label: item,
                num: res["题型练习"][item]
              });
            });
            formatAppLog("log", "at pages/questionType/questionType.vue:74", arr, "arr的参数");
            this.dataList = arr;
            formatAppLog("log", "at pages/questionType/questionType.vue:77", "获取的列表", res);
          }
        };
        this.$http("getQuestionType", opt);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    const _component_uni_section = resolveEasycom(vue.resolveDynamicComponent("uni-section"), __easycom_2$4);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("text", null, "题型练习"),
      vue.createVNode(_component_uni_section, {
        class: "mb-10",
        title: "难度练习"
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(' 	<view class="type-item" >\r\n				{{item.label}}:{{item.num}}\r\n			</view> '),
          vue.createVNode(_component_uni_list, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.dataList["难度练习"], (item, index) => {
                  return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                    clickable: "",
                    onClick: ($event) => $options.jumpPage("difficulty", item),
                    key: index,
                    showArrow: "",
                    title: item.label,
                    rightText: String(item.num)
                  }, null, 8, ["onClick", "title", "rightText"]);
                }),
                128
                /* KEYED_FRAGMENT */
              )),
              vue.createCommentVNode(' <uni-list-item showArrow title="列表文字" rightText="右侧文字" /> ')
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_uni_section, {
        style: { "margin": "20rpx 0" },
        class: "mb-10",
        title: "题型练习"
      }, {
        default: vue.withCtx(() => [
          vue.createCommentVNode(` <view class="type-item" v-for="(item,index) in dataList['题型练习']" :key="index"> {{item.label}}:{{item.num}}\r
			</view> `),
          vue.createVNode(_component_uni_list, null, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.dataList["题型练习"], (item, index) => {
                  return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                    clickable: "",
                    onClick: ($event) => $options.jumpPage("questionTypeName", item),
                    key: index,
                    showArrow: "",
                    title: item.label,
                    rightText: String(item.num)
                  }, null, 8, ["onClick", "title", "rightText"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          })
        ]),
        _: 1
        /* STABLE */
      })
    ]);
  }
  const PagesQuestionTypeQuestionType = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$7], ["__scopeId", "data-v-3f0370ec"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/questionType/questionType.vue"]]);
  const _sfc_main$c = {
    name: "uniCollapseItem",
    props: {
      // 列表标题
      title: {
        type: String,
        default: ""
      },
      name: {
        type: [Number, String],
        default: ""
      },
      // 是否禁用
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否显示动画,app 端默认不开启动画，卡顿严重
      showAnimation: {
        type: Boolean,
        default: false
      },
      // 是否展开
      open: {
        type: Boolean,
        default: false
      },
      // 缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 标题分隔线显示类型
      titleBorder: {
        type: String,
        default: "auto"
      },
      border: {
        type: Boolean,
        default: true
      },
      showArrow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
      return {
        isOpen: false,
        isheight: null,
        height: 0,
        elId,
        nameSync: 0
      };
    },
    watch: {
      open(val) {
        this.isOpen = val;
        this.onClick(val, "init");
      }
    },
    updated(e) {
      this.$nextTick(() => {
        this.init(true);
      });
    },
    created() {
      this.collapse = this.getCollapse();
      this.oldHeight = 0;
      this.onClick(this.open, "init");
    },
    // TODO vue3
    unmounted() {
      this.__isUnmounted = true;
      this.uninstall();
    },
    mounted() {
      if (!this.collapse)
        return;
      if (this.name !== "") {
        this.nameSync = this.name;
      } else {
        this.nameSync = this.collapse.childrens.length + "";
      }
      if (this.collapse.names.indexOf(this.nameSync) === -1) {
        this.collapse.names.push(this.nameSync);
      } else {
        formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue:154", `name 值 ${this.nameSync} 重复`);
      }
      if (this.collapse.childrens.indexOf(this) === -1) {
        this.collapse.childrens.push(this);
      }
      this.init();
    },
    methods: {
      init(type) {
        this.getCollapseHeight(type);
      },
      uninstall() {
        if (this.collapse) {
          this.collapse.childrens.forEach((item, index) => {
            if (item === this) {
              this.collapse.childrens.splice(index, 1);
            }
          });
          this.collapse.names.forEach((item, index) => {
            if (item === this.nameSync) {
              this.collapse.names.splice(index, 1);
            }
          });
        }
      },
      onClick(isOpen, type) {
        if (this.disabled)
          return;
        this.isOpen = isOpen;
        if (this.isOpen && this.collapse) {
          this.collapse.setAccordion(this);
        }
        if (type !== "init") {
          this.collapse.onChange(isOpen, this);
        }
      },
      getCollapseHeight(type, index = 0) {
        const views = uni.createSelectorQuery().in(this);
        views.select(`#${this.elId}`).fields({
          size: true
        }, (data) => {
          if (index >= 10)
            return;
          if (!data) {
            index++;
            this.getCollapseHeight(false, index);
            return;
          }
          this.height = data.height;
          this.isheight = true;
          if (type)
            return;
          this.onClick(this.isOpen, "init");
        }).exec();
      },
      getNvueHwight(type) {
        dom.getComponentRect(this.$refs["collapse--hook"], (option) => {
          if (option && option.result && option.size) {
            this.height = option.size.height;
            this.isheight = true;
            if (type)
              return;
            this.onClick(this.open, "init");
          }
        });
      },
      /**
       * 获取父元素实例
       */
      getCollapse(name = "uniCollapse") {
        let parent = this.$parent;
        let parentName = parent.$options.name;
        while (parentName !== name) {
          parent = parent.$parent;
          if (!parent)
            return false;
          parentName = parent.$options.name;
        }
        return parent;
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$6);
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse-item" }, [
      vue.createCommentVNode(" onClick(!isOpen) "),
      vue.createElementVNode(
        "view",
        {
          onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick(!$data.isOpen)),
          class: vue.normalizeClass(["uni-collapse-item__title", { "is-open": $data.isOpen && $props.titleBorder === "auto", "uni-collapse-item-border": $props.titleBorder !== "none" }])
        },
        [
          vue.createElementVNode("view", { class: "uni-collapse-item__title-wrap" }, [
            vue.renderSlot(_ctx.$slots, "title", {}, () => [
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["uni-collapse-item__title-box", { "is-disabled": $props.disabled }])
                },
                [
                  $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    src: $props.thumb,
                    class: "uni-collapse-item__title-img"
                  }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode(
                    "text",
                    { class: "uni-collapse-item__title-text" },
                    vue.toDisplayString($props.title),
                    1
                    /* TEXT */
                  )
                ],
                2
                /* CLASS */
              )
            ], true)
          ]),
          $props.showArrow ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: vue.normalizeClass([{ "uni-collapse-item__title-arrow-active": $data.isOpen, "uni-collapse-item--animation": $props.showAnimation === true }, "uni-collapse-item__title-arrow"])
            },
            [
              vue.createVNode(_component_uni_icons, {
                color: $props.disabled ? "#ddd" : "#bbb",
                size: "14",
                type: "bottom"
              }, null, 8, ["color"])
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["uni-collapse-item__wrap", { "is--transition": $props.showAnimation }]),
          style: vue.normalizeStyle({ height: ($data.isOpen ? $data.height : 0) + "px" })
        },
        [
          vue.createElementVNode("view", {
            id: $data.elId,
            ref: "collapse--hook",
            class: vue.normalizeClass(["uni-collapse-item__wrap-content", { open: $data.isheight, "uni-collapse-item--border": $props.border && $data.isOpen }])
          }, [
            vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
          ], 10, ["id"])
        ],
        6
        /* CLASS, STYLE */
      )
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$6], ["__scopeId", "data-v-3d2dde9f"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.vue"]]);
  const _sfc_main$b = {
    name: "uniCollapse",
    emits: ["change", "activeItem", "input", "update:modelValue"],
    props: {
      value: {
        type: [String, Array],
        default: ""
      },
      modelValue: {
        type: [String, Array],
        default: ""
      },
      accordion: {
        // 是否开启手风琴效果
        type: [Boolean, String],
        default: false
      }
    },
    data() {
      return {};
    },
    computed: {
      // TODO 兼容 vue2 和 vue3
      dataValue() {
        let value = typeof this.value === "string" && this.value === "" || Array.isArray(this.value) && this.value.length === 0;
        let modelValue = typeof this.modelValue === "string" && this.modelValue === "" || Array.isArray(this.modelValue) && this.modelValue.length === 0;
        if (value) {
          return this.modelValue;
        }
        if (modelValue) {
          return this.value;
        }
        return this.value;
      }
    },
    watch: {
      dataValue(val) {
        this.setOpen(val);
      }
    },
    created() {
      this.childrens = [];
      this.names = [];
    },
    mounted() {
      this.$nextTick(() => {
        this.setOpen(this.dataValue);
      });
    },
    methods: {
      setOpen(val) {
        let str = typeof val === "string";
        let arr = Array.isArray(val);
        this.childrens.forEach((vm, index) => {
          if (str) {
            if (val === vm.nameSync) {
              if (!this.accordion) {
                formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:75", "accordion 属性为 false ,v-model 类型应该为 array");
                return;
              }
              vm.isOpen = true;
            }
          }
          if (arr) {
            val.forEach((v2) => {
              if (v2 === vm.nameSync) {
                if (this.accordion) {
                  formatAppLog("warn", "at uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue:85", "accordion 属性为 true ,v-model 类型应该为 string");
                  return;
                }
                vm.isOpen = true;
              }
            });
          }
        });
        this.emit(val);
      },
      setAccordion(self2) {
        if (!this.accordion)
          return;
        this.childrens.forEach((vm, index) => {
          if (self2 !== vm) {
            vm.isOpen = false;
          }
        });
      },
      resize() {
        this.childrens.forEach((vm, index) => {
          vm.getCollapseHeight();
        });
      },
      onChange(isOpen, self2) {
        let activeItem = [];
        if (this.accordion) {
          activeItem = isOpen ? self2.nameSync : "";
        } else {
          this.childrens.forEach((vm, index) => {
            if (vm.isOpen) {
              activeItem.push(vm.nameSync);
            }
          });
        }
        this.$emit("change", activeItem);
        this.emit(activeItem);
      },
      emit(val) {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-collapse" }, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
    ]);
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$5], ["__scopeId", "data-v-3f050360"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-collapse/components/uni-collapse/uni-collapse.vue"]]);
  const _sfc_main$a = {
    data() {
      return {
        dataList: {},
        type: "false"
      };
    },
    onLoad(params) {
      formatAppLog("log", "at pages/categorateType/categorateType.vue:36", "params获取页面跳转过来的数据", params);
      this.type = params.trueQuestionChapterFlag;
      formatAppLog("log", "at pages/categorateType/categorateType.vue:38", this.type);
      if (params.trueQuestionChapterFlag == "true") {
        this.getQuestionList(true);
        uni.setNavigationBarTitle({
          title: "真题练习"
        });
      } else {
        this.getQuestionList(false);
      }
    },
    methods: {
      change(e) {
        formatAppLog("log", "at pages/categorateType/categorateType.vue:51", "e", e);
      },
      jumpPage(item) {
        formatAppLog("log", "at pages/categorateType/categorateType.vue:54", item);
        uni.navigateTo({
          url: `../answer/index?listType=5&paperId=${item.paperId}`
        });
      },
      getQuestionList(flag) {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync(
              "fCurrentCategoryId"
            ),
            trueQuestionChapterFlag: flag
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/categorateType/categorateType.vue:67", "获取的列表", res);
            this.dataList = res;
          }
        };
        this.$http("getCategoryId", opt);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
    const _component_uni_collapse_item = resolveEasycom(vue.resolveDynamicComponent("uni-collapse-item"), __easycom_1);
    const _component_uni_collapse = resolveEasycom(vue.resolveDynamicComponent("uni-collapse"), __easycom_2);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      $data.type == "false" ? (vue.openBlock(), vue.createBlock(_component_uni_list, { key: 0 }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_uni_collapse, {
            ref: "collapse",
            modelValue: _ctx.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.value = $event),
            onChange: $options.change
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.dataList, (item, index) => {
                  return vue.openBlock(), vue.createBlock(_component_uni_collapse_item, {
                    style: { "padding-left": "20rpx" },
                    title: item.chapterName,
                    onClick: ($event) => $options.jumpPage(item),
                    key: index,
                    open: true
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(item.papers, (it2, idx) => {
                          return vue.openBlock(), vue.createBlock(_component_uni_list_item, {
                            open: true,
                            clickable: "",
                            onClick: ($event) => $options.jumpPage(it2),
                            key: idx,
                            showArrow: "",
                            title: it2.paperName,
                            rightText: it2.questionNum + ""
                          }, null, 8, ["onClick", "title", "rightText"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["title", "onClick"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            _: 1
            /* STABLE */
          }, 8, ["modelValue", "onChange"])
        ]),
        _: 1
        /* STABLE */
      })) : (vue.openBlock(), vue.createBlock(_component_uni_list, { key: 1 }, {
        default: vue.withCtx(() => [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.dataList, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(item.papers, (it2, idx) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: idx,
                      class: "list-content"
                    }, [
                      vue.createElementVNode("view", { class: "list-icon" }, [
                        vue.createElementVNode("img", {
                          class: "icon",
                          src: "/static/constructor/answer.png",
                          alt: ""
                        })
                      ]),
                      vue.createElementVNode("view", { class: "text-content" }, [
                        vue.createElementVNode(
                          "view",
                          { class: "list-text" },
                          vue.toDisplayString(it2.paperName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "view",
                          { class: "list-info" },
                          vue.toDisplayString(it2.questionNum) + "道 | " + vue.toDisplayString(it2.createTime),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", {
                        class: "list-btn",
                        onClick: ($event) => $options.jumpPage(it2)
                      }, "练习", 8, ["onClick"])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        _: 1
        /* STABLE */
      }))
    ]);
  }
  const PagesCategorateTypeCategorateType = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$4], ["__scopeId", "data-v-522fb357"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/categorateType/categorateType.vue"]]);
  const _sfc_main$9 = {
    __name: "docSearch",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let tag = vue.ref(0);
      let keyWords = vue.ref("");
      let docDetailList = vue.ref([]);
      const searchKeyWords = () => {
        formatAppLog("log", "at pages/index/docSearch.vue:48", "keyWords", keyWords.value);
        let opt = {
          params: {
            docName: keyWords.value
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/index/docSearch.vue:54", res, "res");
            docDetailList.value = res.records;
            tag.value = 1;
          }
        };
        $http("getDocumentList", opt);
      };
      const goDocument = (item) => {
        formatAppLog("log", "at pages/index/docSearch.vue:62", 123);
        uni.setStorageSync("docDetail", item);
        uni.navigateTo({
          url: `../docView/docView`
        });
      };
      const clearData = () => {
        tag.value = 0;
      };
      return (_ctx, _cache) => {
        const _component_uni_easyinput = resolveEasycom(vue.resolveDynamicComponent("uni-easyinput"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createElementVNode("view", { class: "input" }, [
            vue.createVNode(_component_uni_easyinput, {
              type: "text",
              onConfirm: searchKeyWords,
              onClear: clearData,
              onBlur: searchKeyWords,
              trim: true,
              confirmType: "搜索",
              modelValue: vue.unref(keyWords),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(keyWords) ? keyWords.value = $event : keyWords = $event),
              placeholder: "请输入文档名"
            }, null, 8, ["modelValue"])
          ]),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(vue.unref(docDetailList), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "content",
                key: index,
                onClick: ($event) => goDocument(item)
              }, [
                vue.createElementVNode("view", { class: "item-text" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "item-title" },
                    vue.toDisplayString(item.docName),
                    1
                    /* TEXT */
                  ),
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item.tags, (it2, idx) => {
                      return vue.openBlock(), vue.createElementBlock("text", {
                        class: "item-tags",
                        key: it2
                      }, [
                        vue.createTextVNode(
                          vue.toDisplayString(it2) + "  ",
                          1
                          /* TEXT */
                        ),
                        idx != item.tags.length - 1 ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "| ")) : vue.createCommentVNode("v-if", true)
                      ]);
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  vue.createElementVNode(
                    "view",
                    { class: "item-time" },
                    vue.toDisplayString(item.createTime),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "item-img" }, [
                  vue.createElementVNode("img", {
                    class: "item-img",
                    src: item.coverImage,
                    alt: ""
                  }, null, 8, ["src"])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )),
          vue.unref(tag) == 1 && vue.unref(docDetailList).length == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "null-date"
          }, [
            vue.createCommentVNode(' <img style="width: 500rpx;height: 500rpx;" src="../../static/notes/notes.png"> '),
            vue.createElementVNode("text", null, "暂无数据")
          ])) : vue.createCommentVNode("v-if", true)
        ]);
      };
    }
  };
  const PagesIndexDocSearch = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/index/docSearch.vue"]]);
  const _sfc_main$8 = {
    data() {
      return {
        isActive: 0,
        list: [
          {
            id: 11,
            type: "我的错题",
            date: "2023-03-06",
            time: "12:03更新12:03更新",
            num: "1"
          },
          {
            id: 11,
            type: "我的收藏",
            num: "2",
            date: "2023-03-06",
            time: "12:03更新12:03更新"
          }
        ]
      };
    },
    props: ["exerciseList"],
    //父组件向子组件传值
    mounted() {
    },
    methods: {
      goBack() {
        uni.navigateBack({
          delta: 1
        });
      },
      hrefrouterApp() {
        uni.navigateTo({
          url: "../wrong/wrongQuestion"
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container-box" }, [
      vue.createElementVNode("view", { class: "notes" }, [
        vue.createElementVNode("view", { class: "notes-img" }, [
          vue.createElementVNode("image", {
            src: "/static/notes/notes.png",
            class: "img"
          })
        ]),
        vue.createElementVNode("view", { class: "desc" }, [
          vue.createElementVNode("view", { class: "none" }, " 该功能暂未开放"),
          vue.createElementVNode("view", { class: "tips" }, " 先去看看其他的吧")
        ]),
        vue.createCommentVNode(' <view class="btn" @click="goBack"> 去练习</view> ')
      ])
    ]);
  }
  const PagesOnlineLearningOnlineLearning = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/onlineLearning/onlineLearning.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        collectList: []
      };
    },
    onLoad() {
      this.getUsercategoryList();
    },
    methods: {
      jumpPage(item) {
        uni.redirectTo({
          url: `../../answer/index?categoryId=${item.categoryId}`
        });
      },
      //用户收藏分类统计
      getUsercategoryList() {
        let opt = {
          callBack: (res) => {
            formatAppLog("log", "at pages/my/myCollect/myCollect.vue:33", "用户收藏分类统计", res);
            this.collectList = res;
          }
        };
        this.$http("collectStatus", opt);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.collectList, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "content-item",
            key: index
          }, [
            vue.createElementVNode("view", { class: "text" }, [
              vue.createElementVNode(
                "view",
                { class: "text-title" },
                vue.toDisplayString(item.categoryName),
                1
                /* TEXT */
              ),
              vue.createElementVNode(
                "view",
                { class: "text-num" },
                "收藏" + vue.toDisplayString(item.num) + "道",
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", {
              class: "btn",
              onClick: ($event) => $options.jumpPage(item)
            }, "练习", 8, ["onClick"])
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesMyMyCollectMyCollect = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$2], ["__scopeId", "data-v-1426e218"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/myCollect/myCollect.vue"]]);
  const _sfc_main$6 = {
    __name: "docDownList",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let documentList = vue.ref([]);
      onReady(() => {
        getList();
      });
      const goDocumentView = (item) => {
        formatAppLog("log", "at pages/my/docDownList/docDownList.vue:56", item);
        uni.setStorageSync("docDetail", vue.toRaw(item.document));
        uni.navigateTo({
          url: `../../docView/docView`
        });
      };
      const getList = () => {
        let opt = {
          params: {
            type: 1
          },
          callBack: (res) => {
            documentList.value = [...res];
            formatAppLog("log", "at pages/my/docDownList/docDownList.vue:69", "获取列表", res, documentList);
          }
        };
        $http("getHistoryList", opt);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.createCommentVNode(' <view class="list-item">\r\n			<view class="item-icon"></view>\r\n			<view class="item-title">\r\n				<view class="title-text">2011年一级建造师考试《建设工程经济》真题</view>\r\n				<view class="title-time">2022-09-18</view>\r\n			</view>\r\n			<view class="down-btn">下载</view>\r\n		</view> '),
          vue.unref(documentList).length ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList(vue.unref(documentList), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list-native",
                key: index,
                onClick: ($event) => goDocumentView(item)
              }, [
                vue.createElementVNode("img", {
                  src: item.document.type === ".docx" ? `../../../static/doc.png` : `../../../static/${item.document.type}.png`,
                  class: "icon-type",
                  alt: ""
                }, null, 8, ["src"]),
                vue.createCommentVNode(' <span :class="item.type"></span> '),
                vue.createElementVNode("text", { class: "list-text" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "list-title" },
                    vue.toDisplayString(item.document.docName) + vue.toDisplayString(item.document.type),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "other-text" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "text-down" },
                      vue.toDisplayString(item.createTime),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", { class: "down-btn" }, "下载")
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, "暂无数据"))
        ]);
      };
    }
  };
  const PagesMyDocDownListDocDownList = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/docDownList/docDownList.vue"]]);
  const _sfc_main$5 = {
    __name: "errQuestionList",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let documentList = vue.ref([]);
      onReady(() => {
        getList();
      });
      vue.reactive({
        page: 1,
        size: 10
      });
      const jumpPage = (item) => {
        formatAppLog("log", "at pages/my/errQuestionList/errQuestionList.vue:43", "错题的跳转", item, item.category.parentId);
        uni.setStorageSync("pid", vue.toRefs(item.category.parentId));
        uni.setStorageSync("currentCategoryId", "");
        uni.setStorageSync("currentCategoryDetail", item.category);
        uni.navigateTo({
          url: `../../constructor/constructorItem?categoryId=${item.category.categoryId}&categoryName=${item.category.categoryName}&parentId=${item.category.parentId}`
        });
        uni.setStorageSync("pid", item.category.parentId);
      };
      const getList = () => {
        let opt = {
          // query: `?page=${pageInfo.page}&size=${pageInfo.size}`,
          // params: {
          //   page: 1,
          //   size: 10,
          // },
          callBack: (res) => {
            formatAppLog("log", "at pages/my/errQuestionList/errQuestionList.vue:61", "获取列表", res, documentList);
            documentList.value = [...res];
          }
        };
        $http("getErrQuestionList", opt);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList(vue.unref(documentList), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "content-item",
                key: index
              }, [
                vue.createElementVNode("view", { class: "text" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "text-title" },
                    vue.toDisplayString(item.category.categoryName),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "view",
                    { class: "text-num" },
                    vue.toDisplayString(item.count) + "道错题",
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", {
                  class: "btn",
                  onClick: ($event) => jumpPage(item)
                }, "练习", 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]);
      };
    }
  };
  const PagesMyErrQuestionListErrQuestionList = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-c7992e13"], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/errQuestionList/errQuestionList.vue"]]);
  const _sfc_main$4 = {
    __name: "searchHistory",
    setup(__props) {
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let documentList = vue.ref([]);
      onLoad((params) => {
        getList();
      });
      onReady(() => {
      });
      const searchKey = (item) => {
        uni.setStorageSync("keyword", item.keyword);
        uni.navigateTo({
          url: "../../index/search?type=1"
        });
      };
      const getList = () => {
        let opt = {
          params: {
            type: 2
          },
          callBack: (res) => {
            documentList.value = [...res];
            formatAppLog("log", "at pages/my/searchHistory/searchHistory.vue:57", "获取列表", res, documentList);
          }
        };
        $http("getHistoryList", opt);
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
          vue.unref(documentList).length ? (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            { key: 0 },
            vue.renderList(vue.unref(documentList), (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: "list-native",
                key: index
              }, [
                vue.createElementVNode("view", { class: "list-text" }, [
                  (vue.openBlock(true), vue.createElementBlock(
                    vue.Fragment,
                    null,
                    vue.renderList(item.keyword, (keyword, index2) => {
                      return vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          class: "list-title",
                          key: index2
                        },
                        vue.toDisplayString(keyword),
                        1
                        /* TEXT */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  )),
                  vue.createElementVNode("text", { class: "other-text" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "text-down" },
                      vue.toDisplayString(item.createTime),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                vue.createElementVNode("view", {
                  class: "down-btn",
                  onClick: ($event) => searchKey(item)
                }, "重新搜题", 8, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          )) : (vue.openBlock(), vue.createElementBlock("view", { key: 1 }, [
            vue.createElementVNode("text", null, "暂无数据")
          ]))
        ]);
      };
    }
  };
  const PagesMySearchHistorySearchHistory = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/searchHistory/searchHistory.vue"]]);
  const _sfc_main$3 = {
    onLoad() {
      let info = uni.getStorageSync("exerciseResult");
      this.info = info;
    },
    data() {
      return {
        info: {}
      };
    },
    methods: {
      jumpPage() {
        uni.navigateBack(-1);
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "arer" }, [
          vue.createElementVNode("view", null, "正确率"),
          vue.createElementVNode(
            "view",
            { style: { "color": "#5181ec", "font-size": "50rpx", "font-weight": "bold" } },
            vue.toDisplayString($data.info.answerRate),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "list" }, [
            vue.createElementVNode("view", { class: "list-item" }, [
              vue.createElementVNode("view", { class: "list-title" }, [
                vue.createElementVNode(
                  "text",
                  { style: { "font-size": "48rpx", "font-weight": "bold" } },
                  vue.toDisplayString($data.info.rightNum),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode(" 题")
              ]),
              vue.createElementVNode("view", { class: "list-text" }, "答对")
            ]),
            vue.createElementVNode("view", { class: "list-item" }, [
              vue.createElementVNode("view", { class: "list-title" }, [
                vue.createElementVNode(
                  "text",
                  { style: { "font-size": "48rpx", "font-weight": "bold" } },
                  vue.toDisplayString($data.info.errNum),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode("题")
              ]),
              vue.createElementVNode("view", { class: "list-text" }, "答错")
            ]),
            vue.createElementVNode("view", { class: "list-item" }, [
              vue.createElementVNode("view", { class: "list-title" }, [
                vue.createElementVNode(
                  "text",
                  { style: { "font-size": "48rpx", "font-weight": "bold" } },
                  vue.toDisplayString($data.info.total),
                  1
                  /* TEXT */
                ),
                vue.createTextVNode("题")
              ]),
              vue.createElementVNode("view", { class: "list-text" }, "总题数")
            ])
          ])
        ]),
        vue.createElementVNode("view", { class: "btn" }, [
          vue.createCommentVNode(' <button class="btn-item waring">清空答题记录</button> '),
          vue.createElementVNode("button", {
            class: "btn-item success",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.jumpPage && $options.jumpPage(...args))
          }, "继续练习")
        ])
      ])
    ]);
  }
  const PagesExerciseResultExerciseResult = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$1], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/exerciseResult/exerciseResult.vue"]]);
  const _sfc_main$2 = {
    onLoad() {
      formatAppLog("log", "at pages/my/message/message.vue:16", "onLa");
      this.getMessage();
    },
    data() {
      return {
        messageList: []
      };
    },
    methods: {
      getMessage() {
        let opt = {
          params: {},
          callBack: (res) => {
            formatAppLog("log", "at pages/my/message/message.vue:29", "获取的消息列表", res);
            this.messageList = res.records;
          }
        };
        this.$http("getMessageList", opt);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
    const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.messageList, (item, key) => {
          return vue.openBlock(), vue.createElementBlock("view", { key }, [
            vue.createVNode(
              _component_uni_list,
              null,
              {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_uni_list_item, {
                    title: item.createTime,
                    note: item.messageContent
                  }, null, 8, ["title", "note"])
                ]),
                _: 2
                /* DYNAMIC */
              },
              1024
              /* DYNAMIC_SLOTS */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesMyMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render], ["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/message/message.vue"]]);
  const _sfc_main$1 = {
    __name: "examInfo",
    setup(__props) {
      onLoad((res) => {
        getEeamInfo(res.listType);
      });
      const currentInstance = vue.getCurrentInstance();
      const {
        $http
      } = currentInstance.appContext.config.globalProperties;
      let list = vue.ref([]);
      const getEeamInfo = (type) => {
        let opt = {
          params: {
            categoryId: uni.getStorageSync("currentCategoryId") || uni.getStorageSync("fCurrentCategoryId")
          },
          callBack: (res) => {
            formatAppLog("log", "at pages/examInfo/examInfo.vue:37", "请求获取的数据", res);
            list.value = res["examInfoContent"][type];
            formatAppLog("log", "at pages/examInfo/examInfo.vue:39", "list", list);
          }
        };
        $http("getExamInfoList", opt);
      };
      return (_ctx, _cache) => {
        const _component_uni_list_item = resolveEasycom(vue.resolveDynamicComponent("uni-list-item"), __easycom_0);
        const _component_uni_list = resolveEasycom(vue.resolveDynamicComponent("uni-list"), __easycom_1$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", null, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(vue.unref(list), (item, index) => {
                return vue.openBlock(), vue.createBlock(
                  _component_uni_list,
                  { key: index },
                  {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_uni_list_item, {
                        title: item.title,
                        note: item.content
                      }, null, 8, ["title", "note"])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  },
                  1024
                  /* DYNAMIC_SLOTS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])
        ]);
      };
    }
  };
  const PagesExamInfoExamInfo = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/examInfo/examInfo.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/question/question", PagesQuestionQuestion);
  __definePage("pages/constructor/constructor", PagesConstructorConstructor);
  __definePage("pages/constructor/constructorItem", PagesConstructorConstructorItem);
  __definePage("pages/subject/subject", PagesSubjectSubject);
  __definePage("pages/notes/myNotes", PagesNotesMyNotes);
  __definePage("pages/my/help/help", PagesMyHelpHelp);
  __definePage("pages/my/help/customerService", PagesMyHelpCustomerService);
  __definePage("pages/document/document", PagesDocumentDocument);
  __definePage("pages/wrong/index", PagesWrongIndex);
  __definePage("pages/my/my", PagesMyMy);
  __definePage("pages/my/setting", PagesMySetting);
  __definePage("pages/my/cdKey/cdKey", PagesMyCdKeyCdKey);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/answer/index", PagesAnswerIndex);
  __definePage("pages/vip/vip", PagesVipVip);
  __definePage("pages/addErrorQuestion/index", PagesAddErrorQuestionIndex);
  __definePage("pages/examination/index", PagesExaminationIndex);
  __definePage("pages/examination/examination", PagesExaminationExamination);
  __definePage("pages/examination/examScores", PagesExaminationExamScores);
  __definePage("pages/docView/docView", PagesDocViewDocView);
  __definePage("pages/index/search", PagesIndexSearch);
  __definePage("pages/pay/pay", PagesPayPay);
  __definePage("pages/questionType/questionType", PagesQuestionTypeQuestionType);
  __definePage("pages/categorateType/categorateType", PagesCategorateTypeCategorateType);
  __definePage("pages/index/docSearch", PagesIndexDocSearch);
  __definePage("pages/onlineLearning/onlineLearning", PagesOnlineLearningOnlineLearning);
  __definePage("pages/my/myCollect/myCollect", PagesMyMyCollectMyCollect);
  __definePage("pages/my/docDownList/docDownList", PagesMyDocDownListDocDownList);
  __definePage("pages/my/errQuestionList/errQuestionList", PagesMyErrQuestionListErrQuestionList);
  __definePage("pages/my/searchHistory/searchHistory", PagesMySearchHistorySearchHistory);
  __definePage("pages/exerciseResult/exerciseResult", PagesExerciseResultExerciseResult);
  __definePage("pages/my/message/message", PagesMyMessageMessage);
  __definePage("pages/examInfo/examInfo", PagesExamInfoExamInfo);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    const pinia = createPinia();
    app.use(pinia);
    formatAppLog("log", "at main.js:38", 2);
    app.config.globalProperties.$http = request;
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
