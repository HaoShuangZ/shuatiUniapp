import{p as e,r as t,t as a,B as s,s as r,o as i,d as o,w as n,h as l,m as c,e as h,H as g,i as u,n as d,x as p,A as y,F as m,G as f,J as C,D as H,S as B}from"./index-25a8f5ab.js";import{_ as k}from"./uni-nav-bar.82c3c019.js";import{r as _}from"./uni-app.es.64b73443.js";import{_ as L}from"./uni-section.45fa45a0.js";import{_ as v}from"./uni-icons.35026b90.js";import{_ as A}from"./_plugin-vue_export-helper.1b428a4d.js";const I=A({data:()=>({searchVal:"",questionList:[],childrenList:[],currentCheckType:"",statusBarHeight:e("statusBarHeight")+"px",navigationBarHeight:e("navigationBarHeight")+"px",menuButtonHeight:e("menuButtonHeight")+"px",navigationBarAndStatusBarHeight:e("statusBarHeight")+e("navigationBarHeight")+"px",screenHeight:e("screenHeight")+"px",safeAreaHeight:e("safeAreaHeight")+"px"}),onLoad(){this.getCategoryTypeList()},onShow(){console.log("navigationBarAndStatusBarHeight",this.navigationBarAndStatusBarHeight),t({success:e=>{console.log("获取当前设备信息",e),console.log("高度",e.screenHeight-e.safeAreaInsets.top-e.safeAreaInsets.bottom),a("screenHeight",e.screenHeight-2*e.safeAreaInsets.top+e.safeAreaInsets.bottom),a("safeAreaHeight",2*e.safeAreaInsets.top+e.safeAreaInsets.bottom)}})},methods:{confirm(e){console.log("搜索",this.searchVal),this.searchVal?this.getCategoryName():this.getCategoryTypeList()},getCategoryName(){let e={params:{keyword:this.searchVal},callBack:e=>{console.log("查询到的详情",e),e[0].line=!0,this.currentCheckType=e[0].categoryName,this.childrenList=e}};this.$http("getCategoryTreeChild",e)},hrefRouterApp(e){console.log("jump",e,e.children),0===e.children.length?(a("pid",e.categoryId),a("currentCategoryId",""),a("currentCategoryDetail",e),s({url:`../constructor/constructorItem?categoryId=${e.categoryId}&categoryName=${e.categoryName}&parentId=${e.parentId}`})):s({url:`../constructor/constructor?categoryf=${this.currentCheckType}&categoryc=${e.categoryName}`,success:t=>{console.log("res.data",e),t.eventChannel.emit("list",{data:e.children})}})},getCategoryTypeList(){r({title:"加载中"});let e={callBack:e=>{console.log("res",e),l(),e.length>1&&a("categoryParams",e),e[0].line=!0,this.currentCheckType=e[0].categoryName,this.questionList=e,this.childrenList=e[0].children}};this.$http("getCategoryType",e)},getCategoryStory(){let t=e("categoryParams");t[0].line=!0,this.currentCheckType=t[0].categoryName,this.questionList=t,this.childrenList=t[0].children},changeCategoryType(e){console.log("item",e),this.delCategoryLine(),e.line=!0,this.currentCheckType=e.categoryName,this.childrenList=e.children},delCategoryLine(){this.questionList.map((e=>{e.line=!1}))},handleSearch(){}}},[["render",function(e,t,a,s,r,l){const A=C,I=c,T=_(H("uni-nav-bar"),k),x=_(H("uni-section"),L),N=_(H("uni-icons"),v),V=B;return i(),o(I,{class:"page"},{default:n((()=>[h(T,{style:d({height:r.navigationBarAndStatusBarHeight,display:"flex"}),"status-bar":!0,leftWidth:0,title:""},{default:n((()=>[h(I,{class:"input-view"},{default:n((()=>[h(A,{modelValue:r.searchVal,"onUpdate:modelValue":t[0]||(t[0]=e=>r.searchVal=e),"confirm-type":"search",class:"nav-bar-input",type:"text",placeholder:"输入搜索关键词",onConfirm:l.confirm},null,8,["modelValue","onConfirm"])])),_:1}),g("template",null,[h(I,{onClick:l.confirm,class:"input-text"},{default:n((()=>[u(" 搜索 ")])),_:1},8,["onClick"])])])),_:1},8,["style"]),g("div",{class:"container"},[h(I,{class:"left"},{default:n((()=>[(i(!0),p(m,null,y(r.questionList,((e,t)=>(i(),o(x,{onClick:t=>l.changeCategoryType(e),title:e.categoryName,type:e.line?"line":"",key:e.categoryId},null,8,["onClick","title","type"])))),128))])),_:1}),h(I,{class:"right"},{default:n((()=>[h(V,{ref:"scrollView",style:{height:"85vh"},"scroll-y":"true","show-scrollbar":!1},{default:n((()=>[h(I,{class:"list-title"},{default:n((()=>[u(f(r.currentCheckType),1)])),_:1}),(i(!0),p(m,null,y(r.childrenList,((e,t)=>(i(),o(I,{onClick:t=>l.hrefRouterApp(e),key:t,class:"list-childer"},{default:n((()=>[u(f(e.categoryName)+" ",1),h(I,{class:"list-right"},{default:n((()=>[h(N,{type:"forward",size:"20"})])),_:1})])),_:2},1032,["onClick"])))),128))])),_:1},512)])),_:1})])])),_:1})}],["__scopeId","data-v-9f59d32e"]]);export{I as default};