"use strict";const e=require("../../common/vendor.js"),t={data:()=>({dataList:[]}),onLoad(){this.getQuestionList()},methods:{jumpPage(t,i){console.log("跳转的参数",i),"difficulty"===t?e.index.navigateTo({url:`../answer/index?listType=4&difficulty=${i.label}`}):e.index.navigateTo({url:`../answer/index?listType=4&questionTypeName=${i.label}`})},getQuestionList(){let t={params:{categoryId:e.index.getStorageSync("currentCategoryId")||e.index.getStorageSync("fCurrentCategoryId")},callBack:e=>{console.log(e,"题型练习的res"),console.log("data",e);let t={"难度练习":[],"题型练习":[]};Object.keys(e["难度练习"]).map(((i,n)=>{t["难度练习"].push({label:i,num:e["难度练习"][i]})})),Object.keys(e["题型练习"]).map(((i,n)=>{t["题型练习"].push({label:i,num:e["题型练习"][i]})})),console.log(t,"arr的参数"),this.dataList=t,console.log("获取的列表",e)}};this.$http("getQuestionType",t)}}};if(!Array){(e.resolveComponent("uni-list-item")+e.resolveComponent("uni-list")+e.resolveComponent("uni-section"))()}Math||((()=>"../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js")+(()=>"../../uni_modules/uni-list/components/uni-list/uni-list.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js"))();const i=e._export_sfc(t,[["render",function(t,i,n,o,s,l){return{a:e.f(s.dataList["难度练习"],((t,i,n)=>({a:e.o((e=>l.jumpPage("difficulty",t)),i),b:i,c:"499ec8b2-2-"+n+",499ec8b2-1",d:e.p({clickable:!0,showArrow:!0,title:t.label,rightText:String(t.num)})}))),b:e.p({title:"难度练习"}),c:e.f(s.dataList["题型练习"],((t,i,n)=>({a:e.o((e=>l.jumpPage("questionTypeName",t)),i),b:i,c:"499ec8b2-5-"+n+",499ec8b2-4",d:e.p({clickable:!0,showArrow:!0,title:t.label,rightText:String(t.num)})}))),d:e.p({title:"题型练习"})}}],["__scopeId","data-v-499ec8b2"]]);wx.createPage(i);