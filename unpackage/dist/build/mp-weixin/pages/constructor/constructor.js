"use strict";const t=require("../../common/vendor.js"),e={onLoad(t){if(console.log("option",t),t){const{categoryc:e,categoryf:o}=t;this.categoryc=e,this.categoryf=o}this.getOpenerEventChannel().on("list",(t=>{this.list=t.data,console.log("this.list",this.list,t)}))},data:()=>({navigationBarAndStatusBarHeight:t.wx$1.getStorageSync("statusBarHeight")+t.wx$1.getStorageSync("navigationBarHeight")+"px",categoryc:"",categoryf:"",list:[],keyword:""}),methods:{hrefrouterApp(e){console.log("item",e),t.index.navigateTo({url:`../constructor/constructorItem?categoryId=${e.categoryId}&categoryName=${e.categoryName}&parentId=${e.categoryName.parentId}`}),t.index.setStorageSync("pid",e.categoryId)},keywordSearch(t){this.keyword}}};if(!Array){t.resolveComponent("uni-icons")()}Math;const o=t._export_sfc(e,[["render",function(e,o,r,a,c,n){return{a:t.t(c.categoryf),b:t.t(c.categoryc),c:t.f(c.list,((e,o,r)=>({a:t.t(e.categoryName),b:"560882a2-0-"+r,c:o,d:t.o((t=>n.hrefrouterApp(e)),o),e:e.categoryId}))),d:t.p({type:"forward",size:"20"})}}]]);wx.createPage(o);