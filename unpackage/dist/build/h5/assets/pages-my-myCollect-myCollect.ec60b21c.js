import{W as t,o as e,d as a,w as s,m as l,x as c,A as o,F as n,e as r,i,G as d}from"./index-708d8c77.js";import{_ as u}from"./_plugin-vue_export-helper.1b428a4d.js";const m=u({data:()=>({collectList:[]}),onLoad(){this.getUsercategoryList()},methods:{jumpPage(e){t({url:`../../answer/index?categoryId=${e.categoryId}`})},getUsercategoryList(){let t={callBack:t=>{console.log("用户收藏分类统计",t),this.collectList=t}};this.$http("collectStatus",t)}}},[["render",function(t,u,m,g,_,f){const p=l;return e(),a(p,{class:"container"},{default:s((()=>[(e(!0),c(n,null,o(_.collectList,((t,l)=>(e(),a(p,{class:"content-item",key:l},{default:s((()=>[r(p,{class:"text"},{default:s((()=>[r(p,{class:"text-title"},{default:s((()=>[i(d(t.categoryName),1)])),_:2},1024),r(p,{class:"text-num"},{default:s((()=>[i("收藏"+d(t.num)+"道",1)])),_:2},1024)])),_:2},1024),r(p,{class:"btn",onClick:e=>f.jumpPage(t)},{default:s((()=>[i("练习")])),_:2},1032,["onClick"])])),_:2},1024)))),128))])),_:1})}],["__scopeId","data-v-7b00cd05"]]);export{m as default};
