import{p as t,t as e,W as a,s,o,d as r,w as c,h as l,m as d,x as i,A as u,F as n,e as p,i as y,j as g,E as f,D as m,G as I}from"./index-708d8c77.js";import{_}from"./uni-icons.45c91a6e.js";import{r as C}from"./uni-app.es.83c46ea6.js";import{_ as h}from"./_plugin-vue_export-helper.1b428a4d.js";const k=h({data:()=>({isActive:0,list:[],categoryId:-1}),onLoad(e){this.getCategoryTypeList(e.categoryId),this.categoryId=t("currentCategoryId")},computed:{isSelectId:()=>t("currentCategoryId")||t("fCurrentCategoryId")},methods:{hrefrouterApp(t){console.log(t,t.categoryId,"item"),e("currentCategoryId",t.categoryId),e("fCurrentCategoryId",0),a({url:`../constructor/constructorItem?categoryId=${t.categoryId}&categoryName=${t.categoryName}&parentId=${t.parentId}`})},getCategoryTypeList(t){s({title:"加载中"});let e={params:{pid:t},callBack:t=>{console.log("获取的列表",t),this.list=t,l()}};this.$http("getCategoryType",e)}}},[["render",function(t,e,a,s,l,h){const k=d,b=f,j=C(m("uni-icons"),_);return o(),r(k,{class:"container-box"},{default:c((()=>[(o(!0),i(n,null,u(l.list,((t,e)=>(o(),r(k,{class:"container",key:e,onClick:e=>h.hrefrouterApp(t)},{default:c((()=>[p(k,{class:"list-box"},{default:c((()=>[p(k,{class:"subject"},{default:c((()=>[p(k,{class:"sub-title"},{default:c((()=>[y(I(t.categoryName),1)])),_:2},1024),p(k,{class:"update-info"},{default:c((()=>[p(b,{class:"num"},{default:c((()=>[y(I(t.questionNum)+"题 ",1)])),_:2},1024),p(b,{class:"date"},{default:c((()=>[y(I(t.updateTime)+" 更新",1)])),_:2},1024)])),_:2},1024)])),_:2},1024),t.categoryId==h.isSelectId?(o(),r(k,{key:0,class:"icon"},{default:c((()=>[p(j,{type:"checkmarkempty",size:"30",color:"#4674F6"})])),_:1})):g("",!0)])),_:2},1024)])),_:2},1032,["onClick"])))),128)),0===l.list.length?(o(),r(k,{key:0},{default:c((()=>[p(b,null,{default:c((()=>[y("暂无科目数据")])),_:1})])),_:1})):g("",!0)])),_:1})}],["__scopeId","data-v-0be95b47"]]);export{k as default};
