"use strict";const e=require("../../common/vendor.js"),t={data:()=>({isActive:0,noteList:[]}),onLoad(){this.getUserNoteList()},methods:{getUserNoteList(){let t={params:{categoryId:e.index.getStorageSync("currentCategoryId"),page:1,size:50},callBack:e=>{console.log("获取的笔记",e),this.noteList=e.records}};this.$http("getNodeList",t)},goBack(){e.index.navigateBack({delta:1})},hrefrouterApp(){e.index.navigateTo({url:"../wrong/wrongQuestion"})}}};const o=e._export_sfc(t,[["render",function(t,o,n,s,i,r){return e.e({a:0===i.noteList.length},0===i.noteList.length?{b:e.o(((...e)=>r.goBack&&r.goBack(...e)))}:{c:e.f(i.noteList,((t,o,n)=>({a:e.t(t.createTime),b:e.t(t.notesContent),c:e.t(t.question.questionTypeName),d:e.t(t.question.questionTitle),e:o})))})}]]);wx.createPage(o);