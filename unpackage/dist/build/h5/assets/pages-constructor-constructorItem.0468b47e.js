import{N as e,O as t,P as s,o as l,d as a,w as i,e as o,Q as c,n,i as r,x as u,F as d,A as g,G as h,j as p,m,l as f,E as y,S as C,R as x,p as A,I as k,B as I,T as b,D as _,f as T,U as F,V as L,t as v,W as j,X as w,h as M,Y as B}from"./index-708d8c77.js";import{_ as N}from"./uni-icons.45c91a6e.js";import{r as Q}from"./uni-app.es.83c46ea6.js";import{_ as Y}from"./_plugin-vue_export-helper.1b428a4d.js";import{u as z}from"./index.fcc3bb88.js";const D=Y({data:()=>({transform:"translateY(50vh)",timer:0,backgroundColor:"rgba(0,0,0,0)",show:!1,config:{}}),props:{contentHeight:{type:Number,default:0},hasTabbar:{type:Boolean,default:!1},shareList:{type:Array,default:function(){return[]}}},created(){const t=e(this.contentHeight)+"px";this.config={height:t,transform:`translateY(${t})`,backgroundColor:"rgba(0,0,0,.4)"},this.transform=this.config.transform},methods:{toggleMask(){if(1!=this.timer){if(this.timer=1,setTimeout((()=>{this.timer=0}),500),this.show)return this.transform=this.config.transform,this.backgroundColor="rgba(0,0,0,0)",void setTimeout((()=>{this.show=!1,this.hasTabbar&&t()}),200);this.show=!0,this.hasTabbar?s({success:()=>{setTimeout((()=>{this.backgroundColor=this.config.backgroundColor,this.transform="translateY(0px)"}),10)}}):setTimeout((()=>{this.backgroundColor=this.config.backgroundColor,this.transform="translateY(0px)"}),10)}},stopPrevent(){},shareToFriend(e){this.$emit("click",e),this.toggleMask()}}},[["render",function(e,t,s,x,A,k){const I=m,b=f,_=y,T=C;return A.show?(l(),a(I,{key:0,class:"mask",onClick:k.toggleMask,onTouchmove:c(k.stopPrevent,["stop","prevent"]),style:n({backgroundColor:A.backgroundColor})},{default:i((()=>[o(I,{class:"mask-content",onClick:c(k.stopPrevent,["stop","prevent"]),style:n([{height:A.config.height,transform:A.transform}])},{default:i((()=>[o(T,{class:"view-content","scroll-y":""},{default:i((()=>[o(I,{class:"share-header"},{default:i((()=>[r(" 分享内容 ")])),_:1}),o(I,{class:"share-list"},{default:i((()=>[(l(!0),u(d,null,g(s.shareList,((e,t)=>(l(),a(I,{key:t,class:"share-item",onClick:t=>k.shareToFriend(e.text)},{default:i((()=>[o(b,{src:e.icon,mode:""},null,8,["src"]),o(_,null,{default:i((()=>[r(h(e.text),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),o(I,{class:"bottom b-t",onClick:k.toggleMask},{default:i((()=>[r("取消")])),_:1},8,["onClick"])])),_:1},8,["onClick","style"])])),_:1},8,["onClick","onTouchmove","style"])):p("",!0)}],["__scopeId","data-v-125beb4e"]]);const $=Y({components:{tabItem:Y({watch:{userCollectFlag(e,t){this.isCollectFlag=!!e}},data:()=>({shareList:[],isCollectFlag:!1,isActive:0,list:[{id:11,type:"我的错题",num:"1"},{id:12,type:"我的收藏",num:"2"},{id:13,type:"我的笔记",num:"8"},{id:11,type:"在线学习",num:""}]}),props:["exerciseList","userCollectFlag"],mounted(){console.log("userCollectFlag",this.userCollectFlag),this.shareList=[{type:1,icon:"/static/login/weixin.png",text:"微信好友"}]},methods:{goShareClick(){this.$refs.share.toggleMask()},shareMenuClick(e){x({title:"温馨提示",content:"点击的分享菜单名称是 = "+e})},collectAdd(){console.log("this.userCollectFlag",this.userCollectFlag),this.isCollectFlag?this.delcollect():this.addCollect()},addCollect(){let e={params:{collectType:1,categoryId:Number(A("currentCategoryDetail").categoryId)},callBack:e=>{console.log("收藏分类",e),this.isCollectFlag=!0,k({title:"收藏成功"})}};this.$http("collectQuestion",e)},delcollect(){let e={params:{collectType:1,categoryId:Number(A("currentCategoryDetail").categoryId)},callBack:e=>{this.isCollectFlag=!1,k({title:"取消收藏成功"})}};this.$http("delCollectSubject",e)},checked(e){this.isActive=e},jumpPage(e){console.log("jumpPage",e,e.index);let t=e.index;0==t&&I({url:"../answer/index?listType=0"}),1==t&&I({url:`../examination/index?listType=${e.index}`}),2==t&&I({url:"../answer/index?listType=2"}),3==t&&I({url:"../answer/index?listType=3"}),4==t&&I({url:"../questionType/questionType?listType=4"}),5==t&&I({url:"../categorateType/categorateType?listType=5&trueQuestionChapterFlag=false"}),6==t&&I({url:"../categorateType/categorateType?listType=6&trueQuestionChapterFlag=true"}),7==t&&I({url:"../index/search?listType=7"}),9==t&&I({url:`../onlineLearning/onlineLearning?listType=${e.index}`}),10==t&&I({url:"../examInfo/examInfo?listType=examIntroduction"}),11==t&&I({url:"../examInfo/examInfo?listType=examGuid"}),12==t&&I({url:"../examInfo/examInfo?listType=examScope"}),13==t&&I({url:"../examInfo/examInfo?listType=examArrangements"}),14==t&&I({url:"../examInfo/examInfo?listType=examCertificate"}),15==t&&I({url:"../examInfo/examInfo?listType=examInformation"})}}},[["render",function(e,t,s,c,n,p){const y=m,C=f,x=b,A=Q(_("cc-shareMenu"),D);return l(),a(y,{class:"container"},{default:i((()=>[o(y,{class:"list-content"},{default:i((()=>[o(y,{class:"list-box"},{default:i((()=>[(l(!0),u(d,null,g(s.exerciseList,((e,t)=>(l(),a(y,{class:"list",key:t},{default:i((()=>[o(y,{class:"exercise-list",onClick:t=>p.jumpPage(e)},{default:i((()=>[o(y,{class:"left"},{default:i((()=>[o(y,{class:T({title:e.index<=3})},{default:i((()=>[r(h(e.title),1)])),_:2},1032,["class"]),o(y,{class:"desc"},{default:i((()=>[r(h(e.desc),1)])),_:2},1024)])),_:2},1024),o(y,{class:"right"},{default:i((()=>[o(C,{class:"icon-img",src:`../../static/constructor/icon${e.index+1}.png`,alt:""},null,8,["src"])])),_:2},1024)])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})])),_:1}),o(y,{class:"border-tb share-btn"},{default:i((()=>[o(x,{type:"primary","open-type":"share",size:"default",style:{width:"300rpx","margin-right":"0"},class:"share button-com"},{default:i((()=>[r(" 分享 ")])),_:1}),o(x,{type:"primary",size:"default",style:{width:"300rpx"},class:"collect button-com",onClick:t[0]||(t[0]=e=>p.collectAdd())},{default:i((()=>[r(h(s.userCollectFlag||n.isCollectFlag?"取消收藏":"收藏"),1)])),_:1})])),_:1}),o(A,{ref:"share",contentHeight:380,shareList:n.shareList,onClick:p.shareMenuClick},null,8,["shareList","onClick"])])),_:1})}],["__scopeId","data-v-39f19045"]])},onLoad(e){A("currentCategoryId")&&(this.title=e.categoryName),this.categoryId=e.categoryId,this.setCategoryInfo(e),F({title:A("currentCategoryDetail").categoryName})},onShow(){this.getCategoryTypeList()},data:()=>({userCollectFlag:!1,shareList:[],title:"",categoryId:"",trueQuestionChapterFlag:!1,isActive:0,collectText:"收藏",navList:[{index:0,title:"题库练习"},{index:1,title:"考试信息"}],list:[{id:11,type:"我的错题",num:0,icon:"icon-cuowukongxin"},{id:12,type:"我的收藏",num:0,icon:"icon-shoucang"},{id:13,type:"我的笔记",num:0,icon:"icon-youliaobiji"}],exerciseList:[{index:0,title:"顺序练习",desc:"1/1000",icon:"icon-shoucang"},{index:1,title:"模拟考试",desc:"随机抽题仿真模拟",icon:"icon-zaixianxuexi"},{index:2,title:"高频错题",desc:"精选高频易错题",icon:"icon-shoucang"},{index:3,title:"随机练习",desc:"试题顺序打乱练习",icon:"icon-shoucang"},{index:4,title:"题型练习",desc:"按题型分类练习",icon:"icon-shoucang"},{index:5,title:"章节练习",desc:"按章节分类练习",icon:"icon-shoucang"},{index:6,title:"历年真题",desc:"往年真题/模拟题",icon:"icon-shoucang"},{index:7,title:"试题搜索",desc:"快速从题库中查找",icon:"icon-shoucang"}],infoList:[{index:10,title:"考试简介",desc:"考试用途 发展方向",icon:"icon-shoucang"},{index:11,title:"报考指南",desc:"报考条件 时间流程",icon:"icon-shoucang"},{index:12,title:"考试大纲",desc:"官方发布 复习导航",icon:"icon-shoucang"},{index:13,title:"考试安排",desc:"考试科目 题型一览",icon:"icon-shoucang"},{index:14,title:"成绩证书",desc:"成绩信息 证书领取",icon:"icon-shoucang"},{index:15,title:"考试资讯",desc:"最新动态 快速浏览",icon:"icon-shoucang"}]}),methods:{...L(z,["setCategoryInfo"]),getCategoryTypeList(){let e={params:{pid:A("pid")},callBack:e=>{if(console.log("获取的列表",e),e.length>0){this.categoryId=e[0].categoryId,v("fCurrentCategoryId",e[0].categoryId);let t=A("currentCategoryId");t?e.map((e=>{e.categoryId==t&&e.userCollectFlag?this.userCollectFlag=!0:this.userCollectFlag=!1})):(this.title=e[0].categoryName,e[0].userCollectFlag?this.userCollectFlag=!0:this.userCollectFlag=!1),this.byGetCategoryIdDetail()}}};this.$http("getCategoryType",e)},hrefrouterApp(){I({url:"../constructor/constructorItem"})},switchObject(){let e=A("pid");A("fCurrentCategoryId"),j({url:`../subject/subject?categoryId=${e}`})},checked(e){this.isActive=e},getList(){let e={params:{trueQuestionChapterFlag:this.trueQuestionChapterFlag,categoryId:this.categoryId},callBack:e=>{console.log("获取参数jjj",e)}};this.$http("getCategoryId",e)},jumpQuestionList(e){console.log("笔记",e),13==e.id?I({url:`../notes/myNotes?listType=${w(e.id)}`}):I({url:`../wrong/index?listType=${w(e.id)}`})},byGetCategoryIdDetail(){let e={params:{categoryId:A("currentCategoryId")||A("fCurrentCategoryId")},callBack:e=>{M(),console.log("获取用户刷题页详情数据",e),this.list[0].num=e.errorNum,this.list[1].num=e.collectNum,this.list[2].num=e.notesNum,this.exerciseList[0].desc=`1/${e.questionNum}`}};this.$http("getCategoryIdDetail",e)}}},[["render",function(e,t,s,c,n,C){const x=y,A=f,k=m,I=Q(_("uni-icons"),N),b=B("tab-item");return l(),a(k,{class:"container"},{default:i((()=>[o(k,{class:"header"},{default:i((()=>[o(x,{class:"top-nav"},{default:i((()=>[r(h(n.title),1)])),_:1}),o(k,{class:"top-btn"},{default:i((()=>[o(A,{class:"vectorIcon",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAETSURBVHgB7ZXvDYJADMXfOYEjMIIj6AZuYJxAnUCcQDcQN2AD2UA2gA1kg9oGiMdJjDHQfuGXlIMD8t71/hQYESKKYAWLn6mmMDFCXfRNsGAymfjFhAs+XnKzwfCsOebec8mxcs6VvviCdLmL7sxztYAuy9BAijo1WpzkEq4BmaehMxFxnNFdAyee/xhjI6u9WfU+MTQwFW8M2Ik3Bp5m4o2Btex1jj3+hX/ecVzIqJwew1PLSlx4QIse8UJtCizEnS/OTey9qzgOGL4+5HwMV52enpGPSUF1zXlnQHqhy5azkMhNW44z6JK3N20GIm5kr0feRzJPKYbnxqPPPnqpv3pdoclk4psJaBOYuMAKGvkofgGn6ItR/DK+HgAAAABJRU5ErkJggg==",alt:""}),o(k,{class:"top-text",onClick:t[0]||(t[0]=e=>C.switchObject())},{default:i((()=>[r(" 切换科目 ")])),_:1})])),_:1})])),_:1}),o(k,{class:"content"},{default:i((()=>[(l(!0),u(d,null,g(n.list,((e,t)=>(l(),a(k,{key:t,class:"item"},{default:i((()=>[o(k,{class:"list",onClick:t=>C.jumpQuestionList(e)},{default:i((()=>[o(k,{class:"icon"},{default:i((()=>[o(I,{"custom-prefix":"iconfont",type:e.icon,size:"34"},null,8,["type"])])),_:2},1024),o(k,{class:"nav"},{default:i((()=>[r(h(e.type),1)])),_:2},1024)])),_:2},1032,["onClick"]),o(k,{class:"num"},{default:i((()=>[r("("+h(e.num)+")",1)])),_:2},1024)])),_:2},1024)))),128))])),_:1}),o(k,null,{default:i((()=>[o(k,{class:"border-tb tab_nav"},{default:i((()=>[(l(!0),u(d,null,g(n.navList,((e,t)=>(l(),a(k,{class:"navTitle",key:t},{default:i((()=>[o(k,{class:T({active:n.isActive===t}),onClick:e=>C.checked(t)},{default:i((()=>[r(h(e.title),1)])),_:2},1032,["class","onClick"])])),_:2},1024)))),128))])),_:1}),0==n.isActive?(l(),a(k,{key:0},{default:i((()=>[o(b,{exerciseList:n.exerciseList,userCollectFlag:n.userCollectFlag},null,8,["exerciseList","userCollectFlag"])])),_:1})):p("",!0),1==n.isActive?(l(),a(k,{key:1},{default:i((()=>[o(b,{exerciseList:n.infoList,userCollectFlag:n.userCollectFlag},null,8,["exerciseList","userCollectFlag"])])),_:1})):p("",!0)])),_:1})])),_:1})}],["__scopeId","data-v-6c58061d"]]);export{$ as default};
