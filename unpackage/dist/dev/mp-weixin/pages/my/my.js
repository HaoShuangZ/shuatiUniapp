"use strict";const e=require("../../common/vendor.js");require("../../utils/http.js");require("../../utils/config.js");require("../../utils/api.js");const l={onLooad(){console.log("onload")},onShow(){console.log("123---------"),e.index.getStorageSync("token");let t=e.index.getStorageSync("token");console.log("userInfo",t),t?(this.init(),this.getVipStatic(),this.getMessage()):this.userInfo={}},computed:{vipType(){let t=this.userInfo;return{1001:`VIP会员(${t.vipExpirationTime})到期`,1002:`SVIP会员(${t.vipExpirationTime})到期`}[t.vipFlag]},vipDownNum(){let t=this.vipStatistic;return`剩余下载次数${t.downloadCount||0} 剩余搜索次数${t.searchCount||0}`}},data(){return{value:0,userInfo:{},minAppNewUserFlag:!0,vipStatistic:{},iconList:[{img:"../../static/my/collage.png",url:"./myCollect/myCollect",text:"我的收藏"},{img:"../../static/my/history.png",text:"搜题记录",url:"./searchHistory/searchHistory"},{img:"../../static/my/down.png",text:"文档下载",url:"./docDownList/docDownList"},{img:"../../static/my/questionErr.png",text:"全部错题",url:"./errQuestionList/errQuestionList"}],navList:[{img:"../../static/my/Notifications.png",navigator:"./message/message",text:"我的消息"},{img:"../../static/my/inviteCode.png",text:"输入邀请码",navigator:"./cdKey/cdKey"},{img:"../../static/my/help.png",text:"帮助中心",navigator:"./help/help"},{img:"../../static/my/feedback.png",text:"意见反馈",navigator:"../addErrorQuestion/index?feedType=feedBack"},{img:"../../static/my/Settings.png",text:"设置",navigator:"./setting"}]}},methods:{jumpPage(t){e.index.navigateTo({url:t.url})},login(){console.log("navigateTo"),e.index.navigateTo({url:"../login/login",animationType:"slide-in-top",animationDuration:200})},getMessage(){let t={params:{},callBack:s=>{this.messageList=s.records;let r=0;s.records.map(g=>{g.readFlag||(r+=1,console.log("num",r))}),this.value=r}};this.$http("getMessageList",t)},getVipStatic(){let t={params:{},callBack:s=>{console.log("res用户返回的数据",s),e.index.setStorageSync("vipStatistic",s),this.vipStatistic=s}};this.$http("getVipStatic",t)},init(){let t=e.index.getStorageSync("userInfo");t?(this.userInfo=t,this.minAppNewUserFlag=t.minAppNewUserFlag):setTimeout(()=>{this.userInfo=e.index.getStorageSync("userInfo")},500)},navigatorToPage(t){console.log("e",t),e.index.navigateTo({url:t})},bindGetUserInfo(t){e.index.setStorageSync("encryptedDataUserInfo",t.detail.encryptedData),e.index.setStorageSync("ivUserInfo",t.detail.iv)},goVip(){e.index.navigateTo({url:"../vip/vip"})},change(){console.log("点击")}}};if(!Array){const t=e.resolveComponent("uni-col"),s=e.resolveComponent("uni-row"),r=e.resolveComponent("uni-icons"),g=e.resolveComponent("uni-badge");(t+s+r+g)()}const p=()=>"../../uni_modules/uni-row/components/uni-col/uni-col.js",m=()=>"../../uni_modules/uni-row/components/uni-row/uni-row.js",f=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",v=()=>"../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";Math||(p+m+f+v)();function y(t,s,r,g,i,o){return e.e({a:e.p({span:4}),b:!i.userInfo.nickName},i.userInfo.nickName?{f:e.t(i.userInfo.nickName),g:e.t(i.userInfo.mobilephone),h:e.p({span:20})}:{c:e.o((...n)=>o.bindGetUserInfo&&o.bindGetUserInfo(...n)),d:e.o((...n)=>o.login&&o.login(...n)),e:e.p({span:20})},{i:e.f(i.iconList,(n,a,c)=>({a:n.img,b:n.text,c:e.t(n.text),d:"54ea0f28-5-"+c+",54ea0f28-4",e:a,f:a,g:e.o(u=>o.jumpPage(n),a)})),j:e.p({span:6}),k:i.userInfo.vipFlag==1001||i.userInfo.vipFlag==1002},i.userInfo.vipFlag==1001||i.userInfo.vipFlag==1002?{l:e.t(o.vipType),m:e.t(o.vipDownNum),n:e.o((...n)=>o.goVip&&o.goVip(...n))}:{o:e.o((...n)=>o.goVip&&o.goVip(...n))},{p:e.f(i.navList,(n,a,c)=>e.e({a:n.img,b:e.t(n.text),c:a===0&&i.value>0},a===0&&i.value>0?{d:"54ea0f28-9-"+c+","+("54ea0f28-8-"+c),e:e.p({type:"forward",size:"16"}),f:"54ea0f28-8-"+c+",54ea0f28-7",g:e.p({["custom-style"]:{marginTop:"20rpx",marginLeft:"100rpx"},["is-dot"]:t.truea,text:i.value,absolute:"rightTop",size:"small"})}:{h:"54ea0f28-10-"+c+",54ea0f28-7",i:e.p({type:"forward",size:"16"})},{j:e.o(u=>o.navigatorToPage(n.navigator),a),k:a}))})}const d=e._export_sfc(l,[["render",y],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/my.vue"]]);wx.createPage(d);
