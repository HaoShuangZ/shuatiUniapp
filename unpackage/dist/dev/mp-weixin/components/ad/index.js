"use strict";const o=require("../../common/vendor.js"),r={data(){return{title:"ad",isVip:o.index.getStorageSync("userInfo").vipFlag}},mounted(){console.log("isVip",o.index.getStorageSync("userInfo").vipFlag)},methods:{onload(e){console.log("onload")},onclose(e){console.log("onclose: "+e.detail)},onerror(e){console.log("onerror: "+e.detail.errCode+" message:: "+e.detail.errMsg)}}};function s(e,i,c,l,n,a){return o.e({a:n.isVip===1e3},n.isVip===1e3?{}:{})}const t=o._export_sfc(r,[["render",s],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/components/ad/index.vue"]]);wx.createPage(t);