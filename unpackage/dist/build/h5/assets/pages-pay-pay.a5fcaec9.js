import{a9 as e,I as t,o as r,d as a,w as i,m as l,H as c,e as s,x as p,A as o,F as n,i as u,n as d,D as y,S as f,T as m,f as v,G as x,E as T}from"./index-708d8c77.js";import{_ as I}from"./uni-segmented-control.9577bcee.js";import{r as _}from"./uni-app.es.83c46ea6.js";import"./JSEncrypt.000059c0.js";import{_ as C}from"./_plugin-vue_export-helper.1b428a4d.js";const g=C({onShow(e){console.log("跳转支付页面",e)},data:()=>({activeColor:"#fff",current:0,currentIndex:0,items:["SVIP会员","VIP会员"],titleList:["搜题服务","文档服务","刷题服务","其他服务"],styleType:"text",vipPayType:[],vipType:[{label:"连续包月",priceTotal:"68",price:"SVIP特属优惠"},{label:"12个月",priceTotal:"988",price:"82.3/月"},{label:"6个月",priceTotal:"988",price:"82.3/月"},{label:"3个月",priceTotal:"988",price:"82.3/月"}],documentList:[]}),watch:{},onLoad(){this.postVipList()},methods:{onClickItem(t){this.current!==t.currentIndex&&(this.current=t.currentIndex,console.log("e.currentIndex",t.currentIndex),this.currentIndex=0,1===this.current?e({frontColor:"#ffffff",backgroundColor:"#4674F6",animation:{duration:400,timingFunc:"easeIn"}}):(this.currentIndex=0,e({frontColor:"#ffffff",backgroundColor:"#28241C",animation:{duration:400,timingFunc:"easeIn"}})))},postVipList(){let e={params:{type:"",page:"",size:""},callBack:e=>{console.log(e.records,"会员信息1");let t=[],r=[];e.records.map(((e,a)=>{0===a&&(t=[{vipCode:"1002",label:"12个月",priceTotal:e.yearPrice,desc:e.vipType,payType:"year_price",vipId:e.vipConfigId,price:Number((e.yearPrice/12).toFixed(2))+"/月"},{vipCode:"1002",label:"3个月",priceTotal:e.quarterPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"quarter_price",price:Number((e.quarterPrice/3).toFixed(2))+"/月"},{vipCode:"1002",label:"1个月",priceTotal:e.monthPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"month_price"}]),1===a&&(r=[{vipCode:"1001",label:"12个月",priceTotal:e.yearPrice,desc:e.vipType,payType:"year_price",vipId:e.vipConfigId,price:Number((e.yearPrice/12).toFixed(2))+"/月"},{vipCode:"1001",label:"3个月",priceTotal:e.quarterPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"quarter_price",price:Number((e.quarterPrice/3).toFixed(2))+"/月"},{vipCode:"1001",label:"1个月",priceTotal:e.monthPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"month_price"}])})),this.vipPayType=[[...t],[...r]]}};this.$http("postVipList",e)},userWxPay(e){console.log("支付选项",e);let t={params:{vipCode:e.vipCode,desc:e.desc,payType:e.payType,vipId:e.vipId},callBack:e=>{console.log("调用微信支付后",e),this.wxRequestPayment(e)}};this.$http("wxH5Pay",t)},selectPayType(e,t){this.currentIndex=t},wxRequestPayment(e){wx.requestPayment({timeStamp:e.timeStamp,nonceStr:e.nonceStr,package:e.package,signType:e.signType,paySign:e.paySign,success(e){console.log("res调用微信支付",e),t({title:"开通成功!",icon:"success",duration:"1500"}),setTimeout((()=>{}),2e3)},fail(e){}})}}},[["render",function(e,t,C,g,b,P){const h=_(y("uni-segmented-control"),I),k=l,S=T,w=f,q=m;return r(),a(k,null,{default:i((()=>[c("div",{class:"header",style:d(1===b.current?"background-color: #4674f6;":"background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)")},[s(k,{class:"uni-padding-wrap uni-common-mt"},{default:i((()=>[s(h,{current:b.current,values:b.items,"style-type":b.styleType,"active-color":b.activeColor,onClickItem:P.onClickItem},null,8,["current","values","style-type","active-color","onClickItem"])])),_:1}),0===b.current?(r(),a(k,{key:0,class:"content"},{default:i((()=>[s(k,{class:"model_scrollx flex_row"},{default:i((()=>[s(w,{"show-scrollbar":!1,class:"uni-swiper-tab","scroll-x":""},{default:i((()=>[(r(!0),p(n,null,o(b.vipPayType[0],((e,t)=>(r(),a(k,{class:v(["scrollx_items",{currentSelectSvip:0==b.current&&b.currentIndex===t,currentSelectVip:1==b.current&&b.currentIndex===t}]),key:e,onClick:r=>P.selectPayType(e,t)},{default:i((()=>[s(k,{class:"item-flex"},{default:i((()=>[s(k,{class:v(["iteme-text",{labelSvip:""}])},{default:i((()=>[u(x(e.label),1)])),_:2},1024),s(S,{class:"iteme-text price-total"},{default:i((()=>[u("￥"),s(S,{style:{"font-size":"60rpx"}},{default:i((()=>[u(x(e.priceTotal),1)])),_:2},1024)])),_:2},1024),s(k,{class:v(["iteme-text price",{currentSelectColor:b.currentIndex===t}])},{default:i((()=>[u(x(e.price),1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1}),s(q,{class:"pay-btn",onClick:t[0]||(t[0]=e=>P.userWxPay(b.vipPayType[b.current][b.currentIndex]))},{default:i((()=>[u("立即开通")])),_:1})])),_:1})])),_:1})):(r(),a(k,{key:1,class:"content"},{default:i((()=>[s(k,{class:"model_scrollx flex_row"},{default:i((()=>[s(w,{"show-scrollbar":!1,class:"uni-swiper-tab","scroll-x":""},{default:i((()=>[(r(!0),p(n,null,o(b.vipPayType[1],((e,t)=>(r(),a(k,{class:v(["scrollx_items",{currentSelectVip:b.currentIndex===t}]),key:t,onClick:r=>P.selectPayType(e,t)},{default:i((()=>[s(k,{class:"item-flex"},{default:i((()=>[s(k,{class:v(["iteme-text",{"label-vip":b.currentIndex===t}])},{default:i((()=>[u(x(e.label),1)])),_:2},1032,["class"]),s(S,{class:v(["iteme-text price-total",{"price-total-vip":!0}])},{default:i((()=>[u("￥"),s(S,{style:{"font-size":"60rpx"}},{default:i((()=>[u(x(e.priceTotal),1)])),_:2},1024)])),_:2},1024),s(k,{class:v(["iteme-text price",{"price-vip":b.currentIndex===t}])},{default:i((()=>[u(x(e.price),1)])),_:2},1032,["class"])])),_:2},1024)])),_:2},1032,["class","onClick"])))),128))])),_:1}),s(q,{class:"pay-btn-vip",onClick:t[1]||(t[1]=e=>P.userWxPay(b.vipPayType[b.current][b.currentIndex]))},{default:i((()=>[u("立即开通")])),_:1})])),_:1})])),_:1}))],4)])),_:1})}],["__scopeId","data-v-580b94b6"]]);export{g as default};
