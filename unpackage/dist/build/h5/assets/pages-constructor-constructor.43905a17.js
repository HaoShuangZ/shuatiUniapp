import{p as t,t as a,B as e,o as s,d as r,w as o,m as i,e as c,i as l,G as n,x as d,A as g,F as y,E as h,D as u}from"./index-708d8c77.js";import{_ as p}from"./uni-icons.45c91a6e.js";import{r as f}from"./uni-app.es.83c46ea6.js";import{_ as m}from"./_plugin-vue_export-helper.1b428a4d.js";const _=m({onLoad(t){if(t){const{categoryc:a,categoryf:e}=t;this.categoryc=a,this.categoryf=e}this.getOpenerEventChannel().on("list",(t=>{this.list=t.data,console.log("this.list",this.list,t)}))},data:()=>({navigationBarAndStatusBarHeight:t("statusBarHeight")+t("navigationBarHeight")+"px",categoryc:"",categoryf:"",list:[],keyword:""}),methods:{hrefrouterApp(t){console.log("item-----------",t),t.children.length>0&&t.parentFlag?(this.categoryf=this.categoryf+`/${t.categoryName}`,this.list=t.children):(a("pid",t.categoryId),a("currentCategoryId",""),a("currentCategoryDetail",t),e({url:`../constructor/constructorItem?categoryId=${t.categoryId}&categoryName=${t.categoryName}&parentId=${t.parentId}`})),a("pid",t.categoryId)},keywordSearch(t){this.keyword}}},[["render",function(t,a,e,m,_,I){const k=h,x=i,B=f(u("uni-icons"),p);return s(),r(x,{class:"navBarBox"},{default:o((()=>[c(x,{class:"right"},{default:o((()=>[c(x,{class:"list-title"},{default:o((()=>[c(k,{class:"arch-text"},{default:o((()=>[l(n(_.categoryf)+" / ",1)])),_:1}),l(n(_.categoryc),1)])),_:1}),(s(!0),d(y,null,g(_.list,((t,a)=>(s(),r(x,{class:"list-item",key:t.categoryId},{default:o((()=>[(s(),r(x,{class:"list-childer",key:a,onClick:a=>I.hrefrouterApp(t)},{default:o((()=>[l(n(t.categoryName)+" ",1),c(x,{class:"list-right"},{default:o((()=>[c(B,{type:"forward",size:"20"})])),_:1})])),_:2},1032,["onClick"]))])),_:2},1024)))),128))])),_:1})])),_:1})}],["__scopeId","data-v-40181625"]]);export{_ as default};