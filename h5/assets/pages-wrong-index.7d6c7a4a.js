import{I as t,B as e,p as l,o as s,d as o,w as a,m as r,e as n,f as i,i as c,H as u,G as f,j as d,X as p,D as _,E as m,P as h}from"./index-25a8f5ab.js";import{_ as g}from"./uni-icons.35026b90.js";import{r as y}from"./uni-app.es.64b73443.js";import{_ as I}from"./_plugin-vue_export-helper.1b428a4d.js";const C=I({data:()=>({screenHeight:0,isChecked:!1,progressWidth:40,type:0,listInfo:{},list:[{id:11,type:"错题分布",num:1,icon:"icon-cuowukongxin"},{id:11,type:"单选题",num:99,icon:"icon-shoucang"}],percent:10,arrInfo:[]}),onLoad(t){console.log("res",t),this.type=11==t.listType?0:1,console.log(this.screenHeight+"this.screenHeight"),this.getPageInfo(t.listType)},options:{styleIsolation:"shared"},options:{addGlobalClass:!0},methods:{jumpErrorQuestion(){if(0!==this.listInfo.errorNum)if(0===this.type)e({url:"../answer/index?listType=11"});else{if(0==this.listInfo.allCollectNum)return void t({title:"暂无收藏数据",icon:"error"});e({url:"../answer/index?listType=12"})}else t({title:"暂无错题数据",icon:"error"})},clearBtn(t){console.log(t,"按钮点击"),0===t&&this.clearErrorQuestionList(2),1===t&&this.clearCollect(t),this.getPageInfo()},clearErrorQuestionList(e){let l={params:{type:e},callBack:e=>{t(e?{title:"清除成功!"}:{title:"没有错题数据!",icon:"error"})}};this.$http("clearCollectAll",l)},getPageInfo(t){let e={params:{categoryId:l("currentCategoryId")||l("fCurrentCategoryId")},callBack:e=>{console.log("获取的统计信息",e),this.arrInfo=e,this.listInfo=11==t?e.questionStatistic:e.collectStatistic}};this.$http("getUserCategory",e)},clearCollect(e){let l={params:{type:2},callBack:e=>{console.log("清除数据",e),t(e?{title:"清除成功!"}:{title:"没有收藏数据!",icon:"error"})}};this.$http("clearCollectAll",l)},getCollectStatistic(){let t={params:{categoryId:l("currentCategoryId")},callBack:t=>{console.log("获取的数据",t)}};this.$http("collectStatus",t)},change(){},onChange(t){console.log("type",t),this.type=t,this.isChecked=!this.isChecked,this.listInfo=1===t?this.arrInfo.collectStatistic:this.arrInfo.questionStatistic},hrefrouterApp(){e({url:"../constructor/constructor"})}}},[["render",function(t,e,l,I,C,b){const k=r,x=p,w=y(_("uni-icons"),g),q=m,E=h;return s(),o(k,{class:"wrong-wrap"},{default:a((()=>[n(k,{class:"content-wrap"},{default:a((()=>[n(k,{class:"toggle-button-wrapper top-wrap"},{default:a((()=>[n(k,{for:"toggle-button"},{default:a((()=>[n(k,{class:"default"},{default:a((()=>[n(k,{class:i(["wrong-question wrong",[0===C.type?"isChecked":""]]),onClick:e[0]||(e[0]=t=>b.onChange(0))},{default:a((()=>[c("错题 ")])),_:1},8,["class"]),n(k,{class:i(["collection-question wrong",[1===C.type?"isChecked":""]]),onClick:e[1]||(e[1]=t=>b.onChange(1))},{default:a((()=>[c(" 收藏题")])),_:1},8,["class"])])),_:1})])),_:1})])),_:1}),n(k,{class:"center-wrap"},{default:a((()=>[n(k,{class:"center",onClick:b.jumpErrorQuestion},{default:a((()=>[u("p",{class:"number"},f(0===C.type?C.listInfo.errorNum||0:C.listInfo.allCollectNum||0),1),u("p",{class:"all"},f(0===C.type?"全部错题":"全部收藏"),1)])),_:1},8,["onClick"])])),_:1}),n(k,{class:"progress-box"},{default:a((()=>[n(k,{class:"progres-content"},{default:a((()=>[n(x,{"stroke-width":"6.9",percent:C.percent,activeColor:"red",backgroundColor:"#E2E2E2","border-radius":"40"},null,8,["percent"]),0===C.type?(s(),o(k,{key:0,class:"problems-box"},{default:a((()=>[n(k,{class:"left"},{default:a((()=>[c(" 已答题目"+f(C.listInfo.allNum)+"，错题"+f(C.listInfo.errorNum)+"题 ",1)])),_:1}),n(k,{class:"right"},{default:a((()=>[c(" 未做题"+f(C.listInfo.totalQuestionNum-C.listInfo.todayErrorNum)+"题",1)])),_:1})])),_:1})):(s(),o(k,{key:1,class:"problems-box"},{default:a((()=>[n(k,{class:"left"},{default:a((()=>[c(" 今日收藏"+f(C.listInfo.todayCollectNum||0)+"题",1)])),_:1})])),_:1}))])),_:1})])),_:1})])),_:1}),n(k,{class:"banner"},{default:a((()=>[0===C.type?(s(),o(k,{key:0,class:"vip-box"},{default:a((()=>[n(k,{class:"vip-icon"},{default:a((()=>[n(w,{"custom-prefix":"iconfont",type:"icon-zaixianxuexi",size:"30"})])),_:1}),n(k,{class:"vip-text"},{default:a((()=>[u("p",null,"高频错题 快速提高 "),u("p",null,"精选易错题 难题，更多专属权益 ")])),_:1}),n(k,{class:"vip-btn"},{default:a((()=>[c(" 升级VIP")])),_:1})])),_:1})):d("",!0),n(k,{class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(f(0===C.type?"错题分布":"收藏分布"),1)])),_:1})])),_:1}),C.listInfo["判断题"]>0?(s(),o(k,{key:1,class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(" 判断题 ")])),_:1}),n(k,{class:"num-problems"},{default:a((()=>[n(q,null,{default:a((()=>[c(f(C.listInfo["判断题"])+" 题 ",1)])),_:1})])),_:1})])),_:1})):d("",!0),C.listInfo["单选题"]>0?(s(),o(k,{key:2,class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(" 单选题 ")])),_:1}),n(k,{class:"num-problems"},{default:a((()=>[n(q,null,{default:a((()=>[c(f(C.listInfo["单选题"])+" 题 ",1)])),_:1})])),_:1})])),_:1})):d("",!0),C.listInfo["填空题"]>0?(s(),o(k,{key:3,class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(" 填空题 ")])),_:1}),n(k,{class:"num-problems"},{default:a((()=>[n(q,null,{default:a((()=>[c(f(C.listInfo["填空题"])+" 题 ",1)])),_:1})])),_:1})])),_:1})):d("",!0),C.listInfo["多选题"]>0?(s(),o(k,{key:4,class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(" 多选题 ")])),_:1}),n(k,{class:"num-problems"},{default:a((()=>[n(q,null,{default:a((()=>[c(f(C.listInfo["多选题"])+" 题 ",1)])),_:1})])),_:1})])),_:1})):d("",!0),C.listInfo["简答题"]>0?(s(),o(k,{key:5,class:"total-box"},{default:a((()=>[n(k,{class:"ques-form"},{default:a((()=>[c(" 简答题 ")])),_:1}),n(k,{class:"num-problems"},{default:a((()=>[n(q,null,{default:a((()=>[c(f(C.listInfo["简答题"])+" 题 ",1)])),_:1})])),_:1})])),_:1})):d("",!0)])),_:1}),n(E,{class:"clear-btn",onClick:e[2]||(e[2]=t=>b.clearBtn(C.type))},{default:a((()=>[c(f(0===C.type?"清空错题":"清空收藏"),1)])),_:1})])),_:1})}],["__scopeId","data-v-58f5e9ba"]]);export{C as default};
