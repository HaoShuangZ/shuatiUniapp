"use strict";const e=require("../common/vendor.js").defineStore({id:"currentCategory",state:()=>({currentInfo:{id:"",name:""}}),getters:{category:e=>(console.log("state",e),e.currentInfo)},actions:{setCategoryInfo(e){this.currentInfo.id=e.categoryId,this.currentInfo.name=e.categoryName,console.log(this.currentInfo,"设置完成后的参数")}}});exports.useCategory=e;
