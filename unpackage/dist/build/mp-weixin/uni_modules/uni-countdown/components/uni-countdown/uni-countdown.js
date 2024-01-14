"use strict";const t=require("../../../../common/vendor.js"),e=require("./i18n/index.js"),{t:s}=t.initVueI18n(e.messages),o={name:"UniCountdown",emits:["timeup"],props:{showDay:{type:Boolean,default:!0},showColon:{type:Boolean,default:!0},start:{type:Boolean,default:!0},backgroundColor:{type:String,default:""},color:{type:String,default:"#333"},fontSize:{type:Number,default:14},splitorColor:{type:String,default:"#333"},day:{type:Number,default:0},hour:{type:Number,default:0},minute:{type:Number,default:0},second:{type:Number,default:0},timestamp:{type:Number,default:0}},data:()=>({timer:null,syncFlag:!1,d:"00",h:"00",i:"00",s:"00",leftTime:0,seconds:0}),computed:{dayText:()=>s("uni-countdown.day"),hourText:t=>s("uni-countdown.h"),minuteText:t=>s("uni-countdown.m"),secondText:t=>s("uni-countdown.s"),timeStyle(){const{color:t,backgroundColor:e,fontSize:s}=this;return{color:t,backgroundColor:e,fontSize:`${s}px`,width:22*s/14+"px",lineHeight:20*s/14+"px",borderRadius:3*s/14+"px"}},splitorStyle(){const{splitorColor:t,fontSize:e,backgroundColor:s}=this;return{color:t,fontSize:12*e/14+"px",margin:s?4*e/14+"px":""}}},watch:{day(t){this.changeFlag()},hour(t){this.changeFlag()},minute(t){this.changeFlag()},second(t){this.changeFlag()},start:{immediate:!0,handler(t,e){if(t)this.startData();else{if(!e)return;clearInterval(this.timer)}}}},created:function(t){this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.countDown()},unmounted(){clearInterval(this.timer)},methods:{toSeconds:(t,e,s,o,i)=>t?t-parseInt((new Date).getTime()/1e3,10):60*e*60*24+60*s*60+60*o+i,timeUp(){clearInterval(this.timer),this.$emit("timeup")},countDown(){let t=this.seconds,[e,s,o,i]=[0,0,0,0];t>0?(e=Math.floor(t/86400),s=Math.floor(t/3600)-24*e,o=Math.floor(t/60)-24*e*60-60*s,i=Math.floor(t)-24*e*60*60-60*s*60-60*o):this.timeUp(),e<10&&(e="0"+e),s<10&&(s="0"+s),o<10&&(o="0"+o),i<10&&(i="0"+i),this.d=e,this.h=s,this.i=o,this.s=i},startData(){if(this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.seconds<=0)return this.seconds=this.toSeconds(0,0,0,0,0),void this.countDown();clearInterval(this.timer),this.countDown(),this.timer=setInterval((()=>{this.seconds--,this.seconds<0?this.timeUp():this.countDown()}),1e3)},update(){this.startData()},changeFlag(){this.syncFlag||(this.seconds=this.toSeconds(this.timestamp,this.day,this.hour,this.minute,this.second),this.startData(),this.syncFlag=!0)}}};const i=t._export_sfc(o,[["render",function(e,s,o,i,n,a){return t.e({a:o.showDay},o.showDay?{b:t.t(n.d),c:t.s(a.timeStyle)}:{},{d:o.showDay},o.showDay?{e:t.t(a.dayText),f:t.s(a.splitorStyle)}:{},{g:t.t(n.h),h:t.s(a.timeStyle),i:t.t(o.showColon?":":a.hourText),j:t.s(a.splitorStyle),k:t.t(n.i),l:t.s(a.timeStyle),m:t.t(o.showColon?":":a.minuteText),n:t.s(a.splitorStyle),o:t.t(n.s),p:t.s(a.timeStyle),q:!o.showColon},o.showColon?{}:{r:t.t(a.secondText),s:t.s(a.splitorStyle)})}],["__scopeId","data-v-c27d693f"]]);wx.createComponent(i);
