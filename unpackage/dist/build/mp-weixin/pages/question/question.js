"use strict";const e=require("../../common/vendor.js"),t={data:()=>({searchVal:"",questionList:[],childrenList:[],currentCheckType:"",statusBarHeight:e.wx$1.getStorageSync("statusBarHeight")+"px",navigationBarHeight:e.wx$1.getStorageSync("navigationBarHeight")+"px",menuButtonHeight:e.wx$1.getStorageSync("menuButtonHeight")+"px",navigationBarAndStatusBarHeight:e.wx$1.getStorageSync("statusBarHeight")+e.wx$1.getStorageSync("navigationBarHeight")+"px",screenHeight:e.wx$1.getStorageSync("screenHeight")+"px",safeAreaHeight:e.wx$1.getStorageSync("safeAreaHeight")+"px"}),onLoad(){this.getCategoryTypeList()},onShow(){console.log("navigationBarAndStatusBarHeight",this.navigationBarAndStatusBarHeight),e.index.getSystemInfo({success:t=>{console.log("获取当前设备信息",t),console.log("高度",t.screenHeight-t.safeAreaInsets.top-t.safeAreaInsets.bottom),e.wx$1.setStorageSync("screenHeight",t.screenHeight-2*t.safeAreaInsets.top+t.safeAreaInsets.bottom),e.wx$1.setStorageSync("safeAreaHeight",2*t.safeAreaInsets.top+t.safeAreaInsets.bottom)}})},methods:{confirm(e){console.log("搜索",this.searchVal),this.searchVal?this.getCategoryName():this.getCategoryTypeList()},getCategoryName(){let e={params:{keyword:this.searchVal},callBack:e=>{console.log("查询到的详情",e),e[0].line=!0,this.currentCheckType=e[0].categoryName,this.childrenList=e}};this.$http("getCategoryTreeChild",e)},hrefRouterApp(t){console.log("jump",t,t.children),0===t.children.length?(e.index.navigateTo({url:`../constructor/constructorItem?categoryId=${t.categoryId}&categoryName=${t.categoryName}&parentId=${t.parentId}`}),e.index.setStorageSync("pid",t.categoryId),e.index.setStorageSync("currentCategoryId",""),e.index.setStorageSync("currentCategoryDetail",t)):e.index.navigateTo({url:`../constructor/constructor?categoryf=${this.currentCheckType}&categoryc=${t.categoryName}`,success:e=>{console.log("res.data",t),e.eventChannel.emit("list",{data:t.children})}})},getCategoryTypeList(){e.index.showLoading({title:"加载中"});let t={callBack:t=>{console.log("res",t),e.index.hideLoading(),t.length>1&&e.index.setStorageSync("categoryParams",t),t[0].line=!0,this.currentCheckType=t[0].categoryName,this.questionList=t,this.childrenList=t[0].children}};this.$http("getCategoryType",t)},getCategoryStory(){let t=e.index.getStorageSync("categoryParams");t[0].line=!0,this.currentCheckType=t[0].categoryName,this.questionList=t,this.childrenList=t[0].children},changeCategoryType(e){console.log("item",e),this.delCategoryLine(),e.line=!0,this.currentCheckType=e.categoryName,this.childrenList=e.children},delCategoryLine(){this.questionList.map((e=>{e.line=!1}))},handleSearch(){}}};if(!Array){(e.resolveComponent("uni-nav-bar")+e.resolveComponent("uni-section")+e.resolveComponent("uni-icons"))()}Math||((()=>"../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js")+(()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js")+(()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"))();const a=e._export_sfc(t,[["render",function(t,a,n,o,r,i){return{a:e.o(((...e)=>i.confirm&&i.confirm(...e))),b:r.searchVal,c:e.o((e=>r.searchVal=e.detail.value)),d:e.o(((...e)=>i.confirm&&i.confirm(...e))),e:r.navigationBarAndStatusBarHeight,f:e.p({"status-bar":!0,leftWidth:0,title:""}),g:e.f(r.questionList,((t,a,n)=>({a:e.o((e=>i.changeCategoryType(t)),t.categoryId),b:t.categoryId,c:"629babec-1-"+n,d:e.p({title:t.categoryName,type:t.line?"line":""})}))),h:e.t(r.currentCheckType),i:e.f(r.childrenList,((t,a,n)=>({a:e.t(t.categoryName),b:"629babec-2-"+n,c:e.o((e=>i.hrefRouterApp(t)),a),d:a}))),j:e.p({type:"forward",size:"20"})}}]]);wx.createPage(a);