"use strict";const e=require("../../common/vendor.js"),n={data(){return{isActive:0,list:[{id:11,type:"我的错题",date:"2023-03-06",time:"12:03更新12:03更新",num:"1"},{id:11,type:"我的收藏",num:"2",date:"2023-03-06",time:"12:03更新12:03更新"}]}},props:["exerciseList"],mounted(){},methods:{goBack(){e.index.navigateBack({delta:1})},hrefrouterApp(){e.index.navigateTo({url:"../wrong/wrongQuestion"})}}};function t(i,o,s,a,c,u){return{}}const r=e._export_sfc(n,[["render",t],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/onlineLearning/onlineLearning.vue"]]);wx.createPage(r);