"use strict";const e=require("../../../common/vendor.js"),o={components:{vcodeInput:()=>"../../../components/vcode-input/vcode-input.js"},data:()=>({cdKey:""}),methods:{vcodeInput(e){console.log(e),this.cdKey=e},submit(){if(6==this.cdKey.length){let o={params:{activeCode:this.cdKey},callBack:o=>{console.log("激活结果",o),e.index.showToast({title:"激活成功！",icon:"success",duration:1500}),setTimeout((()=>{e.index.navigateTo({url:"/pages/my/my"})}),1500)}};this.$http("vipActive",o)}else e.index.showToast({title:"激活码错误！",icon:"error"})}}};if(!Array){e.resolveComponent("vcode-input")()}Math;const t=e._export_sfc(o,[["render",function(o,t,s,c,n,i){return{a:e.sr("VcodeInput","5b9dd61d-0"),b:e.o(i.vcodeInput),c:e.p({sum:6,isBorderLine:!1,borderColor:"#f7f7f7",borderValueColor:"#4674F6",borderActiveColor:"#F7F7F7"}),d:e.o(((...e)=>i.submit&&i.submit(...e)))}}]]);wx.createPage(t);