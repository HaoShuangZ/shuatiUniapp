"use strict";const e=require("../../common/vendor.js"),o={onLoad(){let t=e.index.getStorageSync("exerciseResult");this.info=t},data(){return{info:{}}},methods:{jumpPage(){e.index.navigateBack(-1)}}};function i(t,u,a,f,r,n){return{a:e.t(r.info.answerRate),b:e.t(r.info.rightNum),c:e.t(r.info.errNum),d:e.t(r.info.total),e:e.o((...s)=>n.jumpPage&&n.jumpPage(...s))}}const c=e._export_sfc(o,[["render",i],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/exerciseResult/exerciseResult.vue"]]);wx.createPage(c);
