import{_ as s,a as e}from"./uni-list.21b147be.js";import{o as a,d as t,w as i,m as l,x as o,A as n,F as r,e as g,i as m,j as u,D as d,E as p}from"./index-25a8f5ab.js";import{r as c}from"./uni-app.es.64b73443.js";import{_ as f}from"./_plugin-vue_export-helper.1b428a4d.js";import"./uni-icons.35026b90.js";import"./uni-badge.eda74566.js";const h=f({onLoad(){console.log("onLa"),this.getMessage()},data:()=>({messageList:[]}),methods:{getMessage(){let s={params:{},callBack:s=>{console.log("获取的消息列表",s),this.messageList=s.records,s.records.map((s=>{s.readFlag||s.messageId&&this.viewMessage(s.messageId)}))}};this.$http("getMessageList",s)},viewMessage(s){let e={params:{id:s},callBack:s=>{console.log("获取的消息列表",s)}};this.$http("getMessageViewList",e)}}},[["render",function(f,h,_,L,j,M){const k=c(d("uni-list-item"),s),w=c(d("uni-list"),e),x=l,v=p;return a(),t(x,{class:"container"},{default:i((()=>[(a(!0),o(r,null,n(j.messageList,((s,e)=>(a(),t(x,{key:e},{default:i((()=>[g(w,null,{default:i((()=>[g(k,{title:s.createTime,note:s.messageContent},null,8,["title","note"])])),_:2},1024)])),_:2},1024)))),128)),0===j.messageList.length?(a(),t(x,{key:0},{default:i((()=>[g(v,null,{default:i((()=>[m("暂无消息")])),_:1})])),_:1})):u("",!0)])),_:1})}]]);export{h as default};