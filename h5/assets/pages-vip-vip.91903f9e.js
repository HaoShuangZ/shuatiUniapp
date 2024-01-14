import{p as e,a8 as t,B as r,o as s,d as n,w as l,m as a,H as u,e as c,n as o,i,G as d,f as m,j as y,D as f,E as p}from"./index-25a8f5ab.js";import{_}from"./uni-segmented-control.bc5677f5.js";import{r as k}from"./uni-app.es.64b73443.js";import{_ as v}from"./uni-icons.35026b90.js";import"./JSEncrypt.000059c0.js";import{_ as h}from"./_plugin-vue_export-helper.1b428a4d.js";const g=h({data:()=>({phoneInfo:e("phoneInfo"),isVip:e("userInfo"),activeColor:"#fff",current:0,items:["免费会员","VIP会员","SVPI会员"],titleList:["搜题服务","文档服务","刷题服务","其他服务"],styleType:"text",vipEquity:[{title:"搜题服务",list:[{name:"搜题次数",num:["50次/月","800次/月","不限"]}]},{title:"文档服务",list:[{name:"文档下载",num:["5个/月","30个/月","不限"]}]},{title:"刷题服务",list:[{name:"可刷题库",num:["8个","20个/月","不限"]}]},{title:"其它服务",list:[{name:"APP刷题无广告",num:["0","0","1"]}]}],documentList:[]}),watch:{},onLoad(){this.postVipList()},methods:{onClickItem(e){this.current!==e.currentIndex&&(this.current=e.currentIndex,console.log(this.current),0===this.current||1===this.current?t({frontColor:"#ffffff",backgroundColor:"#4674F6",animation:{duration:400,timingFunc:"easeIn"}}):t({frontColor:"#ffffff",backgroundColor:"#28241C",animation:{duration:400,timingFunc:"easeIn"}}))},postVipList(){let e={params:{type:"",page:"",size:""},callBack:e=>{console.log(e.records,"会员信息"),this.documentList=e.records.sort(((e,t)=>e.yearPrice-t.yearPrice))}};this.$http("postVipList",e)},userWxPay(){console.log(this.current,"this.current"),r({url:`../pay/pay?current=${this.current}`})},wxRequestPayment(e){wx.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success(e){console.log("res调用微信支付",e)},fail(e){}})}}},[["render",function(e,t,r,h,g,E){const L=k(f("uni-segmented-control"),_),b=a,q=p,C=k(f("uni-icons"),v);return s(),n(b,null,{default:l((()=>[u("div",{class:"header",style:o(0===g.current||1===g.current?"background-color: #4674f6;":"background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)")},[c(b,{class:"uni-padding-wrap uni-common-mt"},{default:l((()=>[c(L,{current:g.current,values:g.items,"style-type":g.styleType,"active-color":g.activeColor,onClickItem:E.onClickItem},null,8,["current","values","style-type","active-color","onClickItem"])])),_:1}),c(b,{class:"content"},{default:l((()=>[c(b,{class:"Equity_list"},{default:l((()=>{var e,t,r,a,u;return[c(b,{class:"Equity_title",style:o(0===g.current||1===g.current?"color:#4674F6":"color:#E2AD58")},{default:l((()=>[i(" 搜题服务 ")])),_:1},8,["style"]),c(b,{class:"Equity_item"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("搜题次数")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i(d(null==(e=g.documentList[g.current])?void 0:e.exerciseRecordMaxDay)+"次/月",1)]})),_:1})])),_:1}),c(b,{class:"Equity_title",style:o(0===g.current||1===g.current?"color:#4674F6":"color:#E2AD58")},{default:l((()=>[i(" 文档服务 ")])),_:1},8,["style"]),c(b,{class:"Equity_item"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("文档下载")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i(d(null==(e=g.documentList[g.current])?void 0:e.monthDownloadDocNum)+"次/月",1)]})),_:1})])),_:1}),c(b,{class:"Equity_title",style:o(0===g.current||1===g.current?"color:#4674F6":"color:#E2AD58")},{default:l((()=>[i(" 刷题服务 ")])),_:1},8,["style"]),c(b,{class:"Equity_item"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("可刷题库")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i(d(null==(e=g.documentList[g.current])?void 0:e.categoryNum)+"次/月",1)]})),_:1})])),_:1}),c(b,{class:"Equity_item white"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("收藏题库")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i(d(null==(e=g.documentList[g.current])?void 0:e.collectCategoryNum)+"个",1)]})),_:1})])),_:1}),c(b,{class:"Equity_item"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("题库练习记录")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i("保存"+d(null==(e=g.documentList[g.current])?void 0:e.exerciseRecordMaxDay)+"天",1)]})),_:1})])),_:1}),c(b,{class:m(["Equity_item white",{isHidden:!(null==(e=g.documentList[g.current])?void 0:e.highFrequencyError)}])},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("高频错题")])),_:1}),c(b,{class:"num"},{default:l((()=>{var e;return[(null==(e=g.documentList[g.current])?void 0:e.highFrequencyError)?(s(),n(C,{key:0,type:"checkmarkempty",size:"30",color:"#222221"})):(s(),n(C,{key:1,type:"closeempty",size:"30",color:"#b2b2b2"}))]})),_:1})])),_:1},8,["class"]),c(b,{class:m(["Equity_item",{isHidden:!(null==(t=g.documentList[g.current])?void 0:t.mockExamination)}])},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("模拟考试")])),_:1}),c(b,{class:"num"},{default:l((()=>{var e;return[(null==(e=g.documentList[g.current])?void 0:e.mockExamination)?(s(),n(C,{key:0,type:"checkmarkempty",size:"30",color:"#222221"})):(s(),n(C,{key:1,type:"closeempty",size:"30",color:"#b2b2b2"}))]})),_:1})])),_:1},8,["class"]),c(b,{class:m(["Equity_item white",{isHidden:!(null==(r=g.documentList[g.current])?void 0:r.optionOutOfOrder)}])},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("选项乱序")])),_:1}),c(b,{class:"num"},{default:l((()=>{var e;return[(null==(e=g.documentList[g.current])?void 0:e.optionOutOfOrder)?(s(),n(C,{key:0,type:"checkmarkempty",size:"30",color:"#222221"})):(s(),n(C,{key:1,type:"closeempty",size:"30",color:"#b2b2b2"}))]})),_:1})])),_:1},8,["class"]),c(b,{class:m(["Equity_item",{isHidden:!(null==(a=g.documentList[g.current])?void 0:a.errorPriority)}])},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("错题优先")])),_:1}),c(b,{class:"num"},{default:l((()=>{var e;return[(null==(e=g.documentList[g.current])?void 0:e.errorPriority)?(s(),n(C,{key:0,type:"checkmarkempty",size:"30",color:"#222221"})):(s(),n(C,{key:1,type:"closeempty",size:"30",color:"#b2b2b2"}))]})),_:1})])),_:1},8,["class"]),c(b,{class:m(["Equity_item white",{isHidden:!(null==(u=g.documentList[g.current])?void 0:u.undonePriority)}])},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("未做题优先")])),_:1}),c(b,{class:"num"},{default:l((()=>{var e;return[(null==(e=g.documentList[g.current])?void 0:e.undonePriority)?(s(),n(C,{key:0,type:"checkmarkempty",size:"30",color:"#222221"})):(s(),n(C,{key:1,type:"closeempty",size:"30",color:"#b2b2b2"}))]})),_:1})])),_:1},8,["class"]),c(b,{class:"Equity_title",style:o(0===g.current||1===g.current?"color:#4674F6":"color:#E2AD58")},{default:l((()=>[i(" 其他服务 ")])),_:1},8,["style"]),c(b,{class:"Equity_item"},{default:l((()=>[c(q,{class:"name"},{default:l((()=>[i("APP刷题无广告")])),_:1}),c(q,{class:"num"},{default:l((()=>{var e;return[i(d((null==(e=g.documentList[g.current])?void 0:e.searchWithoutAds)?"无广告":"有广告"),1)]})),_:1})])),_:1})]})),_:1})])),_:1}),c(b,{class:"btn"},{default:l((()=>["ios"!=g.phoneInfo.osName?(s(),n(b,{key:0,style:o(0===g.current||1===g.current?"background-color: #4674F6;color:#ffffff":"background: linear-gradient(90deg, #E2AC57 0%, #F7E3B0 100%);color:#6E5019"),onClick:E.userWxPay},{default:l((()=>[i("开通会员")])),_:1},8,["style","onClick"])):y("",!0)])),_:1})],4)])),_:1})}],["__scopeId","data-v-8683da27"]]);export{g as default};
