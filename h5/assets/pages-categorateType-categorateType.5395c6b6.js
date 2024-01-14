import{c as e,D as t,o as s,d as i,w as a,e as l,f as n,ac as o,j as r,i as c,G as h,n as p,l as u,E as d,m,Q as f,B as g,p as y,x as _,A as C,F as k}from"./index-25a8f5ab.js";import{_ as b,a as w}from"./uni-list.21b147be.js";import{r as v}from"./uni-app.es.64b73443.js";import{_ as O}from"./uni-icons.35026b90.js";import{_ as S}from"./_plugin-vue_export-helper.1b428a4d.js";import{_ as x}from"./answer.1ed4874a.js";import"./uni-badge.eda74566.js";const $=S({name:"uniCollapseItem",props:{title:{type:String,default:""},name:{type:[Number,String],default:""},disabled:{type:Boolean,default:!1},showAnimation:{type:Boolean,default:!0},open:{type:Boolean,default:!1},thumb:{type:String,default:""},titleBorder:{type:String,default:"auto"},border:{type:Boolean,default:!0},showArrow:{type:Boolean,default:!0}},data:()=>({isOpen:!1,isheight:null,height:0,elId:`Uni_${Math.ceil(1e6*Math.random()).toString(36)}`,nameSync:0}),watch:{open(e){this.isOpen=e,this.onClick(e,"init")}},updated(e){this.$nextTick((()=>{this.init(!0)}))},created(){this.collapse=this.getCollapse(),this.oldHeight=0,this.onClick(this.open,"init")},unmounted(){this.__isUnmounted=!0,this.uninstall()},mounted(){this.collapse&&(""!==this.name?this.nameSync=this.name:this.nameSync=this.collapse.childrens.length+"",-1===this.collapse.names.indexOf(this.nameSync)?this.collapse.names.push(this.nameSync):console.warn(`name 值 ${this.nameSync} 重复`),-1===this.collapse.childrens.indexOf(this)&&this.collapse.childrens.push(this),this.init())},methods:{init(e){this.getCollapseHeight(e)},uninstall(){this.collapse&&(this.collapse.childrens.forEach(((e,t)=>{e===this&&this.collapse.childrens.splice(t,1)})),this.collapse.names.forEach(((e,t)=>{e===this.nameSync&&this.collapse.names.splice(t,1)})))},onClick(e,t){this.disabled||(this.isOpen=e,this.isOpen&&this.collapse&&this.collapse.setAccordion(this),"init"!==t&&this.collapse.onChange(e,this))},getCollapseHeight(t,s=0){e().in(this).select(`#${this.elId}`).fields({size:!0},(e=>{if(!(s>=10)){if(!e)return s++,void this.getCollapseHeight(!1,s);this.height=e.height,this.isheight=!0,t||this.onClick(this.isOpen,"init")}})).exec()},getNvueHwight(e){dom.getComponentRect(this.$refs["collapse--hook"],(t=>{if(t&&t.result&&t.size){if(this.height=t.size.height,this.isheight=!0,e)return;this.onClick(this.open,"init")}}))},getCollapse(e="uniCollapse"){let t=this.$parent,s=t.$options.name;for(;s!==e;){if(t=t.$parent,!t)return!1;s=t.$options.name}return t}}},[["render",function(e,f,g,y,_,C){const k=u,b=d,w=m,S=v(t("uni-icons"),O);return s(),i(w,{class:"uni-collapse-item"},{default:a((()=>[l(w,{onClick:f[0]||(f[0]=e=>C.onClick(!_.isOpen)),class:n(["uni-collapse-item__title",{"is-open":_.isOpen&&"auto"===g.titleBorder,"uni-collapse-item-border":"none"!==g.titleBorder}])},{default:a((()=>[l(w,{class:"uni-collapse-item__title-wrap"},{default:a((()=>[o(e.$slots,"title",{},(()=>[l(w,{class:n(["uni-collapse-item__title-box",{"is-disabled":g.disabled}])},{default:a((()=>[g.thumb?(s(),i(k,{key:0,src:g.thumb,class:"uni-collapse-item__title-img"},null,8,["src"])):r("",!0),l(b,{class:"uni-collapse-item__title-text"},{default:a((()=>[c(h(g.title),1)])),_:1})])),_:1},8,["class"])]),!0)])),_:3}),g.showArrow?(s(),i(w,{key:0,class:n([{"uni-collapse-item__title-arrow-active":_.isOpen,"uni-collapse-item--animation":!0===g.showAnimation},"uni-collapse-item__title-arrow"])},{default:a((()=>[l(S,{color:g.disabled?"#ddd":"#bbb",size:"14",type:"bottom"},null,8,["color"])])),_:1},8,["class"])):r("",!0)])),_:3},8,["class"]),l(w,{class:n(["uni-collapse-item__wrap",{"is--transition":g.showAnimation}]),style:p({height:(_.isOpen?_.height:0)+"px"})},{default:a((()=>[l(w,{id:_.elId,ref:"collapse--hook",class:n(["uni-collapse-item__wrap-content",{open:_.isheight,"uni-collapse-item--border":g.border&&_.isOpen}])},{default:a((()=>[o(e.$slots,"default",{},void 0,!0)])),_:3},8,["id","class"])])),_:3},8,["class","style"])])),_:3})}],["__scopeId","data-v-d9eb4150"]]);const A=S({name:"uniCollapse",emits:["change","activeItem","input","update:modelValue"],props:{value:{type:[String,Array],default:""},modelValue:{type:[String,Array],default:""},accordion:{type:[Boolean,String],default:!1}},data:()=>({}),computed:{dataValue(){let e="string"==typeof this.value&&""===this.value||Array.isArray(this.value)&&0===this.value.length;"string"==typeof this.modelValue&&""===this.modelValue||Array.isArray(this.modelValue)&&this.modelValue.length;return e?this.modelValue:this.value}},watch:{dataValue(e){this.setOpen(e)}},created(){this.childrens=[],this.names=[]},mounted(){this.$nextTick((()=>{this.setOpen(this.dataValue)}))},methods:{setOpen(e){let t="string"==typeof e,s=Array.isArray(e);this.childrens.forEach(((i,a)=>{if(t&&e===i.nameSync){if(!this.accordion)return void console.warn("accordion 属性为 false ,v-model 类型应该为 array");i.isOpen=!0}s&&e.forEach((e=>{if(e===i.nameSync){if(this.accordion)return void console.warn("accordion 属性为 true ,v-model 类型应该为 string");i.isOpen=!0}}))})),this.emit(e)},setAccordion(e){this.accordion&&this.childrens.forEach(((t,s)=>{e!==t&&(t.isOpen=!1)}))},resize(){this.childrens.forEach(((e,t)=>{e.getCollapseHeight()}))},onChange(e,t){let s=[];this.accordion?s=e?t.nameSync:"":this.childrens.forEach(((e,t)=>{e.isOpen&&s.push(e.nameSync)})),this.$emit("change",s),this.emit(s)},emit(e){this.$emit("input",e),this.$emit("update:modelValue",e)}}},[["render",function(e,t,l,n,r,c){const h=m;return s(),i(h,{class:"uni-collapse"},{default:a((()=>[o(e.$slots,"default",{},void 0,!0)])),_:3})}],["__scopeId","data-v-3aec18a2"]]);const I=S({data:()=>({dataList:{},type:"false"}),onLoad(e){console.log("params获取页面跳转过来的数据",e),this.type=e.trueQuestionChapterFlag,console.log(this.type),"true"==e.trueQuestionChapterFlag?(this.getQuestionList(!0),f({title:"真题练习"})):this.getQuestionList(!1)},methods:{change(e){console.log("e",e)},jumpPage(e){console.log(e),g({url:`../answer/index?listType=5&paperId=${e.paperId}`})},getQuestionList(e){let t={params:{categoryId:y("currentCategoryId")||y("fCurrentCategoryId"),trueQuestionChapterFlag:e},callBack:e=>{console.log("获取的列表",e),this.dataList=e}};this.$http("getCategoryId",t)}}},[["render",function(e,n,o,r,p,d){const f=v(t("uni-list-item"),b),g=v(t("uni-collapse-item"),$),y=v(t("uni-collapse"),A),O=v(t("uni-list"),w),S=u,I=m;return s(),i(I,{class:"container"},{default:a((()=>["false"==p.type?(s(),i(O,{key:0},{default:a((()=>[l(y,{ref:"collapse",modelValue:e.value,"onUpdate:modelValue":n[0]||(n[0]=t=>e.value=t),onChange:d.change},{default:a((()=>[(s(!0),_(k,null,C(p.dataList,((e,t)=>(s(),i(g,{style:{"padding-left":"20rpx"},title:e.chapterName,onClick:t=>d.jumpPage(e),key:t,open:!0},{default:a((()=>[(s(!0),_(k,null,C(e.papers,((e,t)=>(s(),i(f,{open:!0,clickable:"",onClick:t=>d.jumpPage(e),key:t,showArrow:"",title:e.paperName,rightText:e.questionNum+""},null,8,["onClick","title","rightText"])))),128))])),_:2},1032,["title","onClick"])))),128))])),_:1},8,["modelValue","onChange"])])),_:1})):(s(),i(O,{key:1},{default:a((()=>[(s(!0),_(k,null,C(p.dataList,((e,t)=>(s(),i(I,{key:t},{default:a((()=>[(s(!0),_(k,null,C(e.papers,((e,t)=>(s(),i(I,{key:t,class:"list-content"},{default:a((()=>[l(I,{class:"list-icon"},{default:a((()=>[l(S,{class:"icon",src:x,alt:""})])),_:1}),l(I,{class:"text-content"},{default:a((()=>[l(I,{class:"list-text"},{default:a((()=>[c(h(e.paperName),1)])),_:2},1024),l(I,{class:"list-info"},{default:a((()=>[c(h(e.questionNum)+"道 | "+h(e.createTime),1)])),_:2},1024)])),_:2},1024),l(I,{class:"list-btn",onClick:t=>d.jumpPage(e)},{default:a((()=>[c("练习")])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:2},1024)))),128))])),_:1}))])),_:1})}],["__scopeId","data-v-aa97cb0c"]]);export{I as default};
