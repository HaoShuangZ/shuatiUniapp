import{p as e,Z as t,B as s,o as a,d as o,w as n,m as l,e as i,i as c,x as r,A as u,F as d,l as f,G as _}from"./index-708d8c77.js";import{_ as p}from"./notes.59b46941.js";import{_ as g}from"./_plugin-vue_export-helper.1b428a4d.js";const m=g({data:()=>({isActive:0,noteList:[]}),onLoad(){this.getUserNoteList()},methods:{getUserNoteList(){let t={params:{categoryId:e("currentCategoryId"),page:1,size:50},callBack:e=>{console.log("获取的笔记",e),this.noteList=e.records}};this.$http("getNodeList",t)},goBack(){t({delta:1})},hrefrouterApp(){s({url:"../wrong/wrongQuestion"})}}},[["render",function(e,t,s,g,m,h){const k=f,L=l;return a(),o(L,{class:"container-box"},{default:n((()=>[0===m.noteList.length?(a(),o(L,{key:0,class:"notes"},{default:n((()=>[i(L,{class:"notes-img"},{default:n((()=>[i(k,{src:p,class:"img"})])),_:1}),i(L,{class:"desc"},{default:n((()=>[i(L,{class:"none"},{default:n((()=>[c(" 没有笔记")])),_:1}),i(L,{class:"tips"},{default:n((()=>[c(" 没有笔记练习时，可以记录笔记内容，方便记忆理解哦")])),_:1})])),_:1}),i(L,{class:"btn",onClick:h.goBack},{default:n((()=>[c(" 去练习")])),_:1},8,["onClick"])])),_:1})):(a(),o(L,{key:1},{default:n((()=>[(a(!0),r(d,null,u(m.noteList,((e,t)=>(a(),o(L,{key:t},{default:n((()=>[i(L,{class:"note-create"},{default:n((()=>[c(_(e.createTime),1)])),_:2},1024),i(L,{class:"note-content"},{default:n((()=>[c(_(e.notesContent),1)])),_:2},1024),i(L,{class:"item-question"},{default:n((()=>[i(L,{class:"question-type"},{default:n((()=>[c(_(e.question.questionTypeName),1)])),_:2},1024),c(_(e.question.questionTitle),1)])),_:2},1024)])),_:2},1024)))),128))])),_:1}))])),_:1})}],["__scopeId","data-v-696a3c9c"]]);export{m as default};
