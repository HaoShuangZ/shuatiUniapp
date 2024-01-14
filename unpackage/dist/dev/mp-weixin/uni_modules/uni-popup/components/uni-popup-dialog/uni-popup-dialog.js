"use strict";const l=require("../uni-popup/popup.js"),e=require("../../../../common/vendor.js"),s=require("../uni-popup/i18n/index.js"),{t:n}=e.initVueI18n(s.messages),r={name:"uniPopupDialog",mixins:[l.popup],emits:["confirm","close"],props:{value:{type:[String,Number],default:""},placeholder:{type:[String,Number],default:""},type:{type:String,default:"error"},mode:{type:String,default:"base"},title:{type:String,default:""},content:{type:String,default:""},beforeClose:{type:Boolean,default:!1},cancelText:{type:String,default:""},confirmText:{type:String,default:""}},data(){return{dialogType:"error",focus:!1,val:""}},computed:{okText(){return this.confirmText||n("uni-popup.ok")},closeText(){return this.cancelText||n("uni-popup.cancel")},placeholderText(){return this.placeholder||n("uni-popup.placeholder")},titleText(){return this.title||n("uni-popup.title")}},watch:{type(o){this.dialogType=o},mode(o){o==="input"&&(this.dialogType="info")},value(o){this.val=o}},created(){this.popup.disableMask(),this.mode==="input"?(this.dialogType="info",this.val=this.value):this.dialogType=this.type},mounted(){this.focus=!0},methods:{onOk(){this.mode==="input"?this.$emit("confirm",this.val):this.$emit("confirm"),!this.beforeClose&&this.popup.close()},closeDialog(){this.$emit("close"),!this.beforeClose&&this.popup.close()},close(){this.popup.close()}}};function c(o,d,p,f,u,t){return e.e({a:e.t(t.titleText),b:e.n("uni-popup__"+u.dialogType),c:p.mode==="base"},p.mode==="base"?{d:e.t(p.content)}:{e:t.placeholderText,f:u.focus,g:u.val,h:e.o(i=>u.val=i.detail.value)},{i:e.t(t.closeText),j:e.o((...i)=>t.closeDialog&&t.closeDialog(...i)),k:e.t(t.okText),l:e.o((...i)=>t.onOk&&t.onOk(...i))})}const a=e._export_sfc(r,[["render",c],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue"]]);wx.createComponent(a);