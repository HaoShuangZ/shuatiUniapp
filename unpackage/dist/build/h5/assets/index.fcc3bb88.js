import{ax as t}from"./index-708d8c77.js";const e=t({id:"currentCategory",state:()=>({currentInfo:{id:"",name:""}}),getters:{category:t=>(console.log("state",t),t.currentInfo)},actions:{setCategoryInfo(t){this.currentInfo.id=t.categoryId,this.currentInfo.name=t.categoryName,console.log(this.currentInfo,"设置完成后的参数")}}});export{e as u};