"use strict";const t=require("../../common/vendor.js"),h={data(){return{searchVal:"",questionList:[],childrenList:[],currentCheckType:"",statusBarHeight:t.wx$1.getStorageSync("phoneInfo").statusBarHeight+"px",navigationBarHeight:t.wx$1.getStorageSync("navigationBarHeight")+"px",menuButtonHeight:t.wx$1.getStorageSync("menuButtonHeight")+"px",navigationBarAndStatusBarHeight:t.wx$1.getStorageSync("statusBarHeight")+t.wx$1.getStorageSync("navigationBarHeight")+"px",screenHeight:t.wx$1.getStorageSync("screenHeight")+"px",safeAreaHeight:t.wx$1.getStorageSync("safeAreaHeight")+"px"}},onLoad(){},onShow(){this.getCategoryTypeList(),console.log("navigationBarAndStatusBarHeight",this.navigationBarAndStatusBarHeight)},methods:{clear(){this.searchVal="",this.getCategoryTypeList()},confirm(e){console.log("搜索",this.searchVal),this.searchVal?this.getCategoryName():this.getCategoryTypeList()},getCategoryName(){let e={params:{keyword:this.searchVal},callBack:n=>{console.log("查询到的详情",n),n[0].line=!0,this.currentCheckType=n[0].categoryName,this.childrenList=n}};this.$http("getCategoryTreeChild",e)},hrefRouterApp(e){console.log("jump",e,e.children),e.children.length===0?(t.index.setStorageSync("pid",e.categoryId),t.index.setStorageSync("currentCategoryId",""),t.index.setStorageSync("currentCategoryDetail",e),t.index.navigateTo({url:`../constructor/constructorItem?categoryId=${e.categoryId}&categoryName=${e.categoryName}&parentId=${e.parentId}`})):t.index.navigateTo({url:`../constructor/constructor?categoryf=${this.currentCheckType}&categoryc=${e.categoryName}`,success:n=>{console.log("res.data",e),n.eventChannel.emit("list",{data:e.children})}})},getCategoryTypeList(){let e={callBack:n=>{n.length>1&&t.index.setStorageSync("categoryParams",n),n[0].line=!0,this.currentCheckType=n[0].categoryName,this.questionList=n,this.childrenList=n[0].children}};this.$http("getCategoryType",e)},getCategoryStory(){let e=t.index.getStorageSync("categoryParams");e[0].line=!0,this.currentCheckType=e[0].categoryName,this.questionList=e,this.childrenList=e[0].children},changeCategoryType(e){console.log("item",e),this.delCategoryLine(),e.line=!0,this.currentCheckType=e.categoryName,this.childrenList=e.children},delCategoryLine(){this.questionList.map(e=>{e.line=!1})},handleSearch(){}}};if(!Array){const e=t.resolveComponent("uni-search-bar"),n=t.resolveComponent("uni-section"),i=t.resolveComponent("uni-icons");(e+n+i)()}const u=()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js",l=()=>"../../uni_modules/uni-section/components/uni-section/uni-section.js",y=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";Math||(u+l+y)();function p(e,n,i,_,a,o){return{a:t.o(o.confirm),b:t.o(o.clear),c:t.o(r=>a.searchVal=r),d:t.p({placeholder:"请输入要搜索的文档",cancelButton:"none",modelValue:a.searchVal}),e:t.f(a.questionList,(r,c,s)=>({a:t.o(g=>o.changeCategoryType(r),r.categoryId),b:r.categoryId,c:t.n(r.line?"active-line":null),d:"629babec-1-"+s,e:t.p({title:r.categoryName,type:r.line?"line":""})})),f:`calc(100vh - ${a.statusBarHeight})`,g:t.t(a.currentCheckType),h:t.f(a.childrenList,(r,c,s)=>({a:t.t(r.categoryName),b:"629babec-2-"+s,c:t.o(g=>o.hrefRouterApp(r),c),d:c})),i:t.p({type:"forward",size:"20"}),j:`calc(100vh - ${a.statusBarHeight})`}}const d=t._export_sfc(h,[["render",p],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/question/question.vue"]]);wx.createPage(d);