"use strict";const e=require("../../../../common/vendor.js"),r="uni-row",n="--",s={name:"uniRow",componentName:"uniRow",options:{virtualHost:!0},props:{type:String,gutter:Number,justify:{type:String,default:"start"},align:{type:String,default:"top"},width:{type:[String,Number],default:750}},created(){},computed:{marginValue(){return this.gutter?-(this.gutter/2):0},typeClass(){return this.type==="flex"?`${r+n}flex`:""},justifyClass(){return this.justify!=="start"?`${r+n}flex-justify-${this.justify}`:""},alignClass(){return this.align!=="top"?`${r+n}flex-align-${this.align}`:""}}};function u(a,o,l,c,f,t){return{a:e.n(t.typeClass),b:e.n(t.justifyClass),c:e.n(t.alignClass),d:`${Number(t.marginValue)}rpx`,e:`${Number(t.marginValue)}rpx`}}const i=e._export_sfc(s,[["render",u],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-row/components/uni-row/uni-row.vue"]]);wx.createComponent(i);