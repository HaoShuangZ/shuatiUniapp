"use strict";const s=require("../../../../common/vendor.js"),u={name:"UniBadge",emits:["click"],props:{type:{type:String,default:"error"},inverted:{type:Boolean,default:!1},isDot:{type:Boolean,default:!1},maxNum:{type:Number,default:99},absolute:{type:String,default:""},offset:{type:Array,default(){return[0,0]}},text:{type:[String,Number],default:""},size:{type:String,default:"small"},customStyle:{type:Object,default(){return{}}}},data(){return{}},computed:{width(){return String(this.text).length*8+12},classNames(){const{inverted:n,type:e,size:t,absolute:o}=this;return[n?"uni-badge--"+e+"-inverted":"","uni-badge--"+e,"uni-badge--"+t,o?"uni-badge--absolute":""].join(" ")},positionStyle(){if(!this.absolute)return{};let n=this.width/2,e=10;this.isDot&&(n=5,e=5);const t=`${-n+this.offset[0]}px`,o=`${-e+this.offset[1]}px`,r={rightTop:{right:t,top:o},rightBottom:{right:t,bottom:o},leftBottom:{left:t,bottom:o},leftTop:{left:t,top:o}},i=r[this.absolute];return i||r.rightTop},dotStyle(){return this.isDot?{width:"10px",minWidth:"0",height:"10px",padding:"0",borderRadius:"10px"}:{}},displayValue(){const{isDot:n,text:e,maxNum:t}=this;return n?"":Number(e)>t?`${t}+`:e}},methods:{onClick(){this.$emit("click")}}};function a(n,e,t,o,r,i){return s.e({a:t.text},t.text?{b:s.t(i.displayValue),c:s.n(i.classNames),d:s.s(i.positionStyle),e:s.s(t.customStyle),f:s.s(i.dotStyle),g:s.o(d=>i.onClick())}:{})}const l=s._export_sfc(u,[["render",a],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-badge/components/uni-badge/uni-badge.vue"]]);wx.createComponent(l);
