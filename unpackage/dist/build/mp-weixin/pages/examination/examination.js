"use strict";const e=require("../../common/vendor.js"),t=require("../../store/index.js");if(!Array){(e.resolveComponent("uni-icons")+e.resolveComponent("uni-nav-bar")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js")+(()=>"../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const o={__name:"examination",setup(o){e.index.getWindowInfo().windowWidth,e.index.getWindowInfo().windowHeight,t.useCategory(),e.ref(1),e.ref(!0);const i=e.ref(0),s=e.ref(0);let n=e.ref(0);const l=e.getCurrentInstance(),{$http:a}=l.appContext.config.globalProperties;e.wx$1.getStorageSync("statusBarHeight"),e.wx$1.getStorageSync("navigationBarHeight"),e.wx$1.getStorageSync("menuButtonHeight");const c=e.wx$1.getStorageSync("statusBarHeight")+e.wx$1.getStorageSync("navigationBarHeight")+"px",r=()=>{console.log("123"),e.index.navigateBack({delta:1})},u=e.ref(null);let d=e.ref("card");const g=e=>{d.value=e,u.value.open("bottom")};let p=e.ref(0);const h=e=>{n.value=e,console.log(n,"questionType")},f=e.ref(!1),v=e=>{f.value=e.show},m=()=>{f.value=!1,u.value.close()};let y=e.ref("");const S=()=>{let t={params:{notesContent:y.value,categoryId:R.value[p.value].categoryId,questionId:R.value[p.value].questionId,userId:e.wx$1.getStorageSync("userInfo").userId,question:R[p.value]},callBack:t=>{console.log("笔记添加成功",t),f.value=!1,u.value.close(),y.value="",e.index.showToast({title:"笔记添加成功",icon:"none",duration:2e3})}};a("addNotes",t)};e.ref([{content:"内容 A"},{content:"内容 B"},{content:"内容 C"}]);let k=e.ref(!1);const C=e=>{p.value=e.detail.current,k.value=R.value[e.detail.current].collectFlag},q=(e,t,o)=>{if(console.log("选择题选择的时候",e,t,o),console.log(e,t,o,"----"),!o.isSelected&&"单选题"===o.questionTypeName){e.isChecked=!0,o.isSelected=!0;let t=0;o.optionsList.map(((e,o)=>{e.isRight&&(e.isChecked=!0),e.isChecked&&t++})),1==t?(o.isSelectRight=!0,b.push({categoryId:o.categoryId,questionId:o.questionId,status:1,questionTypeName:o.questionTypeName})):(o.isSelectRight=!1,!o.errorHistoryFlag&&I(o.categoryId,o.questionId,2),b.push({categoryId:o.categoryId,questionId:o.questionId,status:2,questionTypeName:o.questionTypeName})),console.log("处理出错添加的数据",b)}o.isSelected||"多选题"!==o.questionTypeName||(console.log("多选题"),e.isChecked=!0)},I=(e,t,o)=>{a("addErrQuestion",{params:{categoryId:e,questionId:t,status:o},callBack:e=>{console.log("错题添加成功",e)}})},b=e.reactive([]);e.computed((()=>R.value[p.value].collectFlag));let R=e.ref([]);const T=e.reactive({page:1,size:10,total:10}),w=["A","B","C","D","E","F"];return e.onLoad((t=>{console.log("listType",t),0==t.listType&&(e=>{let t={params:{categoryId:Number(e),page:T.page,size:T.size},callBack:e=>{console.log("res",e.records),e.records.map(((e,t)=>{const o=e.options.map((e=>({label:e,isChecked:"",isRight:!1})));let i=[];e.options.map(((t,o)=>{e.rightOptions.map(((e,s)=>{t===e&&i.push(o)}))})),console.log("rightAnswerItem",i),e.rightAnswerItem=i;const s=o.map((t=>(e.rightOptions.includes(t.label)&&(t.isRight=!0),t)));e.optionsList=s,e.isSelected=!1})),R.value=e.records,k.value=e.records[p.value].collectFlag,T.page=e.page,T.size=e.size,T.total=e.total}};a("getQuestionList",t)})(e.index.getStorageSync("currentCategoryId")),11==t.listType&&(n.value=1,(()=>{let e={params:{page:T.page,size:T.size},callBack:e=>{console.log("获取错题数据",e),e.records.map(((e,t)=>{const o=e.question.options.map((e=>({label:e,isChecked:"",isRight:!1})));console.log("optionObjects",o);const i=o.map((t=>(e.question.rightOptions.includes(t.label)&&(t.isRight=!0),t)));e.question.optionsList=i,e.question.isSelected=!1}));let t=e.records.map((e=>e.question));R.value=[...t],k.value=e.records[p.value].collectFlag,T.page=e.page,T.size=e.size,T.total=e.total}};a("getErrorQuestionList",e)})())})),e.onHide((()=>{console.log("隐藏页面")})),e.onUnload((()=>{console.log("页面销毁"),b.length>0&&a("addErrQuestionList",{params:{questionRecordList:b},callBack:e=>{console.log("批量添加错题记录",e)}})})),e.onReady((()=>{})),(t,o)=>e.e({a:"overflow:"+(f.value?"hidden":"visible"),b:e.o(r),c:e.p({type:"back",color:"#000",size:"24"}),d:e.o((e=>h(0))),e:e.unref(n)?"":1,f:e.o((e=>h(1))),g:e.unref(n)?1:"",h:c,i:e.p({"status-bar":!0,title:""}),j:e.f(e.unref(R),((o,i,s)=>e.e({a:e.t(o.difficulty),b:e.t(i+1),c:e.t(o.questionTitle),d:"单选题"===o.questionTypeName&&0===e.unref(n)},"单选题"===o.questionTypeName&&0===e.unref(n)?{e:e.f(o.optionsList,((t,i,s)=>e.e({a:!o.isSelected||!t.isChecked},o.isSelected&&t.isChecked?{}:{b:e.t(w[i])},{c:!0===o.isSelected&&t.isRight?1:"",d:!0===t.isChecked&&t.isChecked!==t.isRight?1:"",e:e.t(t.label),f:!0===o.optionsList.isSelected&&t.isRight?1:"",g:!0===t.isChecked&&t.isChecked!==t.isRight?1:"",h:i,i:e.o((e=>q(t,i,o)),i)})))}:{},{f:"多选题"===o.questionTypeName&&0===e.unref(n)},"多选题"===o.questionTypeName&&0===e.unref(n)?{g:e.f(o.optionsList,((t,i,s)=>({a:e.t(w[i]),b:t.isChecked||!0===o.isSelected&&t.isRight?1:"",c:!0===o.isSelected&&!0===t.isChecked&&t.isChecked!==t.isRight?1:"",d:e.t(t.label),e:t.isChecked?1:"",f:!0===o.isSelected&&t.isChecked&&t.isChecked!==t.isRight?1:"",g:i,h:e.o((e=>q(t,i,o)),i)})))}:{},1===e.unref(n)?e.e({h:"单选题"===o.questionTypeName},"单选题"===o.questionTypeName?{i:e.f(o.optionsList,((t,i,s)=>e.e({a:!o.isSelected||!t.isChecked},o.isSelected&&t.isChecked?{}:{b:e.t(t.isRight?null:w[i])},{c:t.isRight?1:"",d:!0===t.isChecked&&t.isChecked!==t.isRight?1:"",e:e.t(t.label),f:t.isRight?1:"",g:!0===t.isChecked&&t.isChecked!==t.isRight?1:"",h:i})))}:{},{j:"多选题"===o.questionTypeName},"多选题"===o.questionTypeName?{k:e.f(o.optionsList,((t,i,s)=>({a:e.t(w[i]),b:t.isRight?1:"",c:!0===o.isSelected&&!0===t.isChecked&&t.isChecked!==t.isRight?1:"",d:e.t(t.label),e:t.isRight?1:"",f:!0===o.isSelected&&t.isChecked&&t.isChecked!==t.isRight?1:"",g:i})))}:{}):{},{l:0===e.unref(n)&&"多选题"==o.questionTypeName&&!o.isSelected},0!==e.unref(n)||"多选题"!=o.questionTypeName||o.isSelected?{}:{m:e.o((e=>(t.option,t.optionIndex,void(o.isSelected=!0))),i)},{n:o.isSelected||1==e.unref(n)},o.isSelected||1==e.unref(n)?{o:e.f(o.options,((t,i,s)=>({a:e.f(o.rightOptions,((o,s,n)=>({a:e.t(t==o?w[i]:""),b:o}))),b:i}))),p:e.t(t.currentQuestionRightItem),q:e.o((t=>{return i=o,console.log("答案报错",i),e.index.setStorageSync("errQuestionDetail",i),void e.index.navigateTo({url:"../addErrorQuestion/index?feedType=errAnswerFeed"});var i}),i)}:{},{r:o.isSelected||1==e.unref(n)},(o.isSelected||e.unref(n),{}),{s:o.isSelected||1==e.unref(n)},o.isSelected||1==e.unref(n)?{t:e.t(o.analysis),v:e.o((e=>g("notes")),i)}:{},{w:i}))),k:1===e.unref(n),l:e.unref(p),m:e.o(C),n:!e.unref(k)},(e.unref(k),{}),{o:e.o((t=>(t=>{console.log("收藏问题",t);let o={params:{categoryId:R.value[p.value].categoryId,questionId:R.value[p.value].questionId},callBack:o=>{console.log("问题shouc",o),k.value=!k.value,R.value[p.value].collectFlag=!t,e.index.showToast({title:t?"删除成功":"收藏成功",icon:"none",duration:2e3})}};a(t?"removeCollectQuestion":"collectQuestion",o)})(e.unref(k)))),p:e.t(i.value),q:e.t(s.value),r:e.o((e=>g("card"))),s:"card"===e.unref(d)},"card"===e.unref(d)?{t:e.f(e.unref(R),((t,o,i)=>e.e({a:e.t(t.isSelectRight),b:e.t(o+1),c:t.collectFlag},(t.collectFlag,{}),{d:t.errorHistoryFlag?1:"",e:t.errorHistoryFlag?1:"",f:e.unref(p)==o?1:"",g:e.o((e=>(e=>{p.value=e,f.value=!1,u.value.close()})(o)),o),h:o}))),v:""}:{},{w:"notes"===e.unref(d)},"notes"===e.unref(d)?{x:e.o(m),y:e.p({type:"closeempty",size:"20"}),z:e.o(S),A:e.unref(y),B:e.o((t=>e.isRef(y)?y.value=t.detail.value:y=t.detail.value))}:{},{C:e.sr(u,"6aa1d910-2",{k:"popup"}),D:e.o(v),E:e.p({"background-color":"#fff"})})}};wx.createPage(o);
