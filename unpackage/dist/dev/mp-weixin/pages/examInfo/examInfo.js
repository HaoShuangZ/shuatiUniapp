"use strict";const e=require("../../common/vendor.js");if(!Array){const r=e.resolveComponent("uni-list-item"),i=e.resolveComponent("uni-list");(r+i)()}const m=()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js",_=()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js";Math||(m+_)();const f={__name:"examInfo",setup(r){e.onLoad(n=>{console.log("res",n),l(n.listType);const s={examIntroduction:"考试简介",examGuid:"报考指南",examScope:"考试大纲",examArrangements:"考试安排",examCertificate:"成绩证书",examInformation:"考试资讯"};e.index.setNavigationBarTitle({title:s[n.listType]})});const i=e.getCurrentInstance(),{$http:c}=i.appContext.config.globalProperties;let o=e.ref([]);const l=n=>{let s={params:{categoryId:e.index.getStorageSync("currentCategoryId")||e.index.getStorageSync("fCurrentCategoryId")},callBack:t=>{console.log("请求获取的数据",t),o.value=t.examInfoContent[n],console.log("list",o)}};c("getExamInfoList",s)};return(n,s)=>e.e({a:e.unref(o).length>0},e.unref(o).length>0?{b:e.f(e.unref(o),(t,u,a)=>e.e({a:t.title},t.title?{b:"3a9bf868-1-"+a+","+("3a9bf868-0-"+a),c:e.p({title:t.title,note:t.content})}:{},{d:u,e:"3a9bf868-0-"+a}))}:{})}},g=e._export_sfc(f,[["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/examInfo/examInfo.vue"]]);wx.createPage(g);
