"use strict";const e=require("../../../common/vendor.js"),t={__name:"errQuestionList",setup(t){const r=e.getCurrentInstance(),{$http:o}=r.appContext.config.globalProperties;let a=e.ref([]);e.onReady((()=>{c()})),e.reactive({page:1,size:10});const c=()=>{o("getErrorQuestionList",{params:{page:1,size:10},callBack:e=>{a.value=[...e.records],console.log("获取列表",e,a)}})};return(t,r)=>({a:e.f(e.unref(a),((t,r,o)=>({a:e.t(t.category.categoryName),b:e.o((r=>(t=>{console.log(t),e.index.navigateTo({url:`../../constructor/constructorItem?categoryId=${t.categoryId}&categoryName=${t.category.categoryName}&parentId=${t.category.parentId}`}),e.index.setStorageSync("pid",t.parentId)})(t)),r),c:r})))})}},r=e._export_sfc(t,[["__scopeId","data-v-792c16f6"]]);wx.createPage(r);