"use strict";const i=require("../../../common/vendor.js"),l={onLoad(){console.log("onLa"),this.getMessage()},data(){return{messageList:[]}},methods:{getMessage(){let s={params:{},callBack:e=>{console.log("获取的消息列表",e),this.messageList=e.records,e.records.map(t=>{t.readFlag||t.messageId&&this.viewMessage(t.messageId)})}};this.$http("getMessageList",s)},viewMessage(s){let e={params:{id:s},callBack:t=>{console.log("获取的消息列表",t)}};this.$http("getMessageViewList",e)}}};if(!Array){const s=i.resolveComponent("uni-list-item"),e=i.resolveComponent("uni-list");(s+e)()}const r=()=>"../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js",m=()=>"../../../uni_modules/uni-list/components/uni-list/uni-list.js";Math||(r+m)();function g(s,e,t,_,n,d){return i.e({a:i.f(n.messageList,(a,c,o)=>({a:"29dd9822-1-"+o+","+("29dd9822-0-"+o),b:i.p({title:a.createTime,note:a.messageContent}),c:"29dd9822-0-"+o,d:c})),b:n.messageList.length===0},n.messageList.length===0?{}:{})}const u=i._export_sfc(l,[["render",g],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/pages/my/message/message.vue"]]);wx.createPage(u);
