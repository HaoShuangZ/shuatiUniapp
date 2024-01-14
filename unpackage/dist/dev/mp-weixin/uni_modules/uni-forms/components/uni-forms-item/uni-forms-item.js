"use strict";const n=require("../../../../common/vendor.js"),c={name:"uniFormsItem",options:{virtualHost:!0},provide(){return{uniFormItem:this}},inject:{form:{from:"uniForm",default:null}},props:{rules:{type:Array,default(){return null}},name:{type:[String,Array],default:""},required:{type:Boolean,default:!1},label:{type:String,default:""},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:""},errorMessage:{type:[String,Boolean],default:""},leftIcon:String,iconColor:{type:String,default:"#606266"}},data(){return{errMsg:"",isRequired:!1,userRules:null,localLabelAlign:"left",localLabelWidth:"65px",localLabelPos:"left",border:!1,isFirstBorder:!1}},computed:{msg(){return this.errorMessage||this.errMsg}},watch:{"form.formRules"(e){this.init()},"form.labelWidth"(e){this.localLabelWidth=this._labelWidthUnit(e)},"form.labelPosition"(e){this.localLabelPos=this._labelPosition()},"form.labelAlign"(e){}},created(){this.init(!0),this.name&&this.form&&this.$watch(()=>this.form._getDataValue(this.name,this.form.localData),(e,t)=>{if(!this.form._isEqual(e,t)){const l=this.itemSetValue(e);this.onFieldChange(l,!1)}},{immediate:!1})},unmounted(){this.__isUnmounted=!0,this.unInit()},methods:{setRules(e=null){this.userRules=e,this.init(!1)},setValue(){},async onFieldChange(e,t=!0){const{formData:i,localData:l,errShowType:r,validateCheck:o,validateTrigger:h,_isRequiredField:f,_realName:m}=this.form,d=m(this.name);e||(e=this.form.formData[d]);const a=this.itemRules.rules&&this.itemRules.rules.length;if(!this.validator||!a||a===0)return;const u=f(this.itemRules.rules||[]);let s=null;return h==="bind"||t?(s=await this.validator.validateUpdate({[d]:e},i),!u&&(e===void 0||e==="")&&(s=null),s&&s.errorMessage?(r==="undertext"&&(this.errMsg=s?s.errorMessage:""),r==="toast"&&n.index.showToast({title:s.errorMessage||"校验错误",icon:"none"}),r==="modal"&&n.index.showModal({title:"提示",content:s.errorMessage||"校验错误"})):this.errMsg="",o(s||null)):this.errMsg="",s||null},init(e=!1){const{validator:t,formRules:i,childrens:l,formData:r,localData:o,_realName:h,labelWidth:f,_getDataValue:m,_setDataValue:d}=this.form||{};if(this.localLabelAlign=this._justifyContent(),this.localLabelWidth=this._labelWidthUnit(f),this.localLabelPos=this._labelPosition(),this.isRequired=this.required,this.form&&e&&l.push(this),!t||!i)return;this.form.isFirstBorder||(this.form.isFirstBorder=!0,this.isFirstBorder=!0),this.group&&(this.group.isFirstBorder||(this.group.isFirstBorder=!0,this.isFirstBorder=!0)),this.border=this.form.border;const a=h(this.name),u=this.userRules||this.rules;typeof i=="object"&&u&&(i[a]={rules:u},t.updateSchema(i));const s=i[a]||{};this.itemRules=s,this.validator=t,this.itemSetValue(m(this.name,o)),this.isRequired=this._isRequired()},unInit(){if(this.form){const{childrens:e,formData:t,_realName:i}=this.form;e.forEach((l,r)=>{l===this&&(this.form.childrens.splice(r,1),delete t[i(l.name)])})}},itemSetValue(e){const t=this.form._realName(this.name),i=this.itemRules.rules||[],l=this.form._getValue(t,e,i);return this.form._setDataValue(t,this.form.formData,l),l},clearValidate(){this.errMsg=""},_isRequired(){return this.required},_justifyContent(){if(this.form){const{labelAlign:e}=this.form;let t=this.labelAlign?this.labelAlign:e;if(t==="left")return"flex-start";if(t==="center")return"center";if(t==="right")return"flex-end"}return"flex-start"},_labelWidthUnit(e){return this.num2px(this.labelWidth?this.labelWidth:e||(this.label?65:"auto"))},_labelPosition(){return this.form&&this.form.labelPosition||"left"},isTrigger(e,t,i){return e==="submit"||!e?e===void 0?t!=="bind"?t?"submit":i===""?"bind":"submit":"bind":"submit":"bind"},num2px(e){return typeof e=="number"?`${e}px`:e}}};function b(e,t,i,l,r,o){return n.e({a:r.isRequired},r.isRequired?{}:{},{b:n.t(i.label),c:!i.label&&!r.isRequired?1:"",d:r.localLabelWidth,e:r.localLabelAlign,f:n.t(o.msg),g:o.msg?1:"",h:n.n("is-direction-"+r.localLabelPos),i:n.n(r.border?"uni-forms-item--border":""),j:n.n(r.border&&r.isFirstBorder?"is-first-border":"")})}const g=n._export_sfc(c,[["render",b],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.vue"]]);wx.createComponent(g);