"use strict";const t=require("../../common/vendor.js"),g={onShow(r){console.log("跳转支付页面",r),console.log("分包页面"),console.log("this.globalData.deviceInfo",getApp().globalData)},data(){return{currentImgIndex:0,info:[{colorClass:"uni-bg-red",url:"../../static/vip/vip-closeAd.png",content:"内容 A"}],activeColor:"#fff",current:0,currentIndex:0,items:["SVIP会员","VIP会员"],titleList:["搜题服务","文档服务","刷题服务","其他服务"],styleType:"text",vipPayType:[],vipType:[{label:"连续包月",priceTotal:"68",price:"SVIP特属优惠"},{label:"12个月",priceTotal:"988",price:"82.3/月"},{label:"6个月",priceTotal:"988",price:"82.3/月"},{label:"3个月",priceTotal:"988",price:"82.3/月"}],vipPrivilege:[{img:"../../static/vip/vip-search.png",text1:"搜题服务",text2:"800次/月"},{img:"../../static/vip/vpi-book.png",text1:"可刷题库",text2:"20个/月"},{img:"../../static/vip/vip-down.png",text1:"文档下载",text2:"30个/月"},{img:"../../static/vip/vio-start.png",text1:"收藏题库",text2:"20个/月"},{img:"../../static/vip/vip-exam.png",text1:"题库练习记录",text2:"练习记录保留180天"}],vipPrivilege2:[{img:"../../static/vip/vip-history.png",text1:"模拟考试历史记录",text2:"保留考试历史记录"},{img:"../../static/vip/vip-noAd.png",text1:"APP搜题无广告",text2:"搜题时不显示广告"},{img:"../../static/vip/vip-err.png",text1:"高频错题",text2:"精选高频易错题"},{img:"../../static/vip/vip-exam.png",text1:"模拟考试",text2:"随机抽题仿真模拟"},{img:"../../static/vip/vip-no.png",text1:"App刷题无广告",text2:"刷题时不显示广告"}],vipPrivilege3:[{img:"../../static/vip/1.png",text1:"搜题服务",text2:"800次/月"},{img:"../../static/vip/2.png",text1:"可刷题库",text2:"20个/月"},{img:"../../static/vip/3.png",text1:"文档下载",text2:"30个/月"},{img:"../../static/vip/4.png",text1:"收藏题库",text2:"20个/月"},{img:"../../static/vip/5.png",text1:"题库练习记录",text2:"练习记录保留180天"}],vipPrivilege4:[{img:"../../static/vip/6.png",text1:"模拟考试历史记录",text2:"保留考试历史记录"},{img:"../../static/vip/7.png",text1:"APP搜题无广告",text2:"搜题时不显示广告"},{img:"../../static/vip/8.png",text1:"高频错题",text2:"精选高频易错题"},{img:"../../static/vip/9.png",text1:"模拟考试",text2:"随机抽题仿真模拟"},{img:"../../static/vip/10.png",text1:"App刷题无广告",text2:"刷题时不显示广告"}],documentList:[]}},watch:{},onLoad(){this.postVipList()},isIos(){return getApp().globalData.platform=="ios"},methods:{change(r){this.currentImgIndex=r.detail.current},onClickItem(r){this.current!==r.currentIndex&&(this.current=r.currentIndex,console.log("e.currentIndex",r.currentIndex),this.currentIndex=0,this.current===1?t.index.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#4674F6",animation:{duration:400,timingFunc:"easeIn"}}):(this.currentIndex=0,t.index.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:"#28241C",animation:{duration:400,timingFunc:"easeIn"}})))},postVipList(){let r={params:{type:"",page:"",size:""},callBack:n=>{console.log(n.records,"会员信息1");let o=[],a=[];n.records.map((e,c)=>{c===0&&(o=[{vipCode:"1002",label:"12个月",priceTotal:e.yearPrice,desc:e.vipType,payType:"year_price",vipId:e.vipConfigId,price:Number((e.yearPrice/12).toFixed(2))+"/月"},{vipCode:"1002",label:"3个月",priceTotal:e.quarterPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"quarter_price",price:Number((e.quarterPrice/3).toFixed(2))+"/月"},{vipCode:"1002",label:"1个月",priceTotal:e.monthPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"month_price"}]),c===1&&(a=[{vipCode:"1001",label:"12个月",priceTotal:e.yearPrice,desc:e.vipType,payType:"year_price",vipId:e.vipConfigId,price:Number((e.yearPrice/12).toFixed(2))+"/月"},{vipCode:"1001",label:"3个月",priceTotal:e.quarterPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"quarter_price",price:Number((e.quarterPrice/3).toFixed(2))+"/月"},{vipCode:"1001",label:"1个月",priceTotal:e.monthPrice,desc:e.vipType,vipId:e.vipConfigId,payType:"month_price"}])}),this.vipPayType=[[...o],[...a]]}};this.$http("postVipList",r)},userWxPay(r){console.log("支付选项",r);let n={params:{vipCode:r.vipCode,desc:r.desc,payType:r.payType,vipId:r.vipId},callBack:o=>{console.log("调用微信支付后",o),this.wxRequestPayment(o)}};this.$http("wxPay",n)},selectPayType(r,n){this.currentIndex=n},wxRequestPayment(r){t.wx$1.requestPayment({timeStamp:r.timeStamp,nonceStr:r.nonceStr,package:r.package,signType:r.signType,paySign:r.paySign,success(n){console.log("res调用微信支付",n),t.index.showToast({title:"开通成功!",icon:"success",duration:"1500"}),setTimeout(()=>{},2e3)},fail(n){}})}}};Array||t.resolveComponent("uni-segmented-control")();const v=()=>"../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";Math||v();function u(r,n,o,a,e,c){return t.e({a:t.o(c.onClickItem),b:t.p({current:e.current,values:e.items,["style-type"]:e.styleType,["active-color"]:e.activeColor}),c:e.current===0},e.current===0?t.e({d:t.f(e.vipPayType[0],(i,p,s)=>({a:t.t(i.label),b:t.t(i.priceTotal),c:t.t(i.price),d:e.currentIndex===p?1:"",e:e.current==0&&e.currentIndex===p?1:"",f:e.current==1&&e.currentIndex===p?1:"",g:i,h:t.o(l=>c.selectPayType(i,p),i)})),e:t.f(e.vipPrivilege3,(i,p,s)=>({a:i.img,b:t.t(i.text1),c:t.t(i.text2),d:p})),f:t.f(e.vipPrivilege4,(i,p,s)=>({a:i.img,b:t.t(i.text1),c:t.t(i.text2),d:p})),g:r.isIos},r.isIos?{h:t.o(i=>c.userWxPay(e.vipPayType[e.current][e.currentIndex]))}:{}):t.e({i:t.f(e.vipPayType[1],(i,p,s)=>({a:t.t(i.label),b:e.currentIndex===p?1:"",c:t.t(i.priceTotal),d:t.t(i.price),e:e.currentIndex===p?1:"",f:e.currentIndex===p?1:"",g:p,h:t.o(l=>c.selectPayType(i,p),p)})),j:t.f(e.vipPrivilege,(i,p,s)=>({a:i.img,b:t.t(i.text1),c:t.t(i.text2),d:p})),k:t.f(e.vipPrivilege2,(i,p,s)=>({a:i.img,b:t.t(i.text1),c:t.t(i.text2),d:p})),l:r.isIos},r.isIos?{m:t.o(i=>c.userWxPay(e.vipPayType[e.current][e.currentIndex]))}:{}),{n:t.s(e.current===1?"background-color: #4674f6;":"background: linear-gradient(90deg, #28241C 0%, #4A4133 100%)")})}const y=t._export_sfc(g,[["render",u],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/subPages/pay/pay.vue"]]);wx.createPage(y);