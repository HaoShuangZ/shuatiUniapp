"use strict";const e=require("../../common/vendor.js"),o={onLoad(e){console.log("模拟考试页面获取的参数",e)},data:()=>({formData:{radio:"10",radioScore:"1",multiple:"10",multipleScore:"1",examTime:"40",score:"15",showRight:!1,optionOrder:!1,worongPrior:!1,doneNot:!1,moreDataWay:1},range:[{value:0,text:"漏题，按正常答案选项数，算平均分"},{value:1,text:"全部选对，才算得分"},{value:2,text:"漏选，得 50% 分"}],rules:{radio:{rules:[{required:!0,errorMessage:"题目数量必填"},{validateFunction:(e,o,a,r)=>(console.log(o,"value"),o>0&&o<=100||r("题目数小于100"))}]},radioScore:{rules:[{required:!0,errorMessage:"分值不能为空"},{validateFunction:(e,o,a,r)=>(console.log(o,"value"),o>0&&o<=10||r("分值必须小于10"))}]},multiple:{rules:[{required:!0,errorMessage:"多选题目数量不能为空"},{validateFunction:(e,o,a,r)=>(console.log(o,"value"),o>0&&o<=200||r("多选题数量必须小于200"))}]},multipleScore:{rules:[{required:!0,errorMessage:"多选题目分数不能为空"},{validateFunction:(e,o,a,r)=>(console.log(o,"value"),o>0&&o<=20||r("多选题分数小于20"))}]},examTime:{rules:[{required:!0,errorMessage:"考试时间不能为空"}]},score:{rules:[{required:!0,errorMessage:"及格分数不能为空"},{validateFunction:(e,o,a,r)=>{if(console.log("及格分数",a),o>=(null==a?void 0:a.radio)*(null==a?void 0:a.radioScore)+(null==a?void 0:a.multiple)*(null==a?void 0:a.multipleScore))return r("及格分数必须小于总分数")}}]}}}),methods:{vipSwitch(o){console.log(o),1e3!==e.index.getStorageSync("userInfo").vipFlag?e.index.showModal({title:"提示",content:"该功能为VIP专享服务，请购买VIP",confirmText:"前往购买",success:o=>{console.log(o),o.confirm&&e.index.redirectTo({url:"../vip/vip"})}}):"optionOrder"==o?this.formData.optionOrder=!this.formData.optionOrder:this.formData.worongPrior=!this.formData.worongPrior},submitForm(){this.$refs.formData.validate().then((o=>{console.log("res",o),e.index.setStorageSync("examSetting",o),e.index.setStorageSync("answerDataList",[]),e.index.setStorageSync("exerciseResult",{}),e.index.navigateTo({url:"../answer/index?listType=1"})})).catch((e=>{console.log("表单验证错误",e)}))}},computed:{totalTopic(){return Number(this.formData.radio)+Number(this.formData.multiple)},totalScore(){return Number(this.formData.radioScore)*Number(this.formData.radio)+Number(this.formData.multipleScore)*Number(this.formData.multiple)}}};if(!Array){(e.resolveComponent("uni-col")+e.resolveComponent("uni-row")+e.resolveComponent("uni-easyinput")+e.resolveComponent("uni-forms-item")+e.resolveComponent("uni-data-select")+e.resolveComponent("uni-forms"))()}Math||((()=>"../../uni_modules/uni-row/components/uni-col/uni-col.js")+(()=>"../../uni_modules/uni-row/components/uni-row/uni-row.js")+(()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js")+(()=>"../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js")+(()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js"))();const a=e._export_sfc(o,[["render",function(o,a,r,t,n,i){return{a:e.p({span:8}),b:e.p({span:8}),c:e.p({span:8}),d:e.p({span:8}),e:e.o((e=>n.formData.radio=e)),f:e.p({clearable:!1,type:"number",modelValue:n.formData.radio}),g:e.p({name:"radio"}),h:e.p({span:8}),i:e.o((e=>n.formData.radioScore=e)),j:e.p({clearable:!1,type:"number",modelValue:n.formData.radioScore}),k:e.p({name:"radioScore"}),l:e.p({span:8}),m:e.p({span:8}),n:e.o((e=>n.formData.multiple=e)),o:e.p({clearable:!1,type:"number",modelValue:n.formData.multiple}),p:e.p({name:"multiple"}),q:e.p({span:8}),r:e.o((e=>n.formData.multipleScore=e)),s:e.p({clearable:!1,type:"number",modelValue:n.formData.multipleScore}),t:e.p({name:"multipleScore"}),v:e.p({span:8}),w:e.t(i.totalTopic),x:e.p({offset:2,span:10}),y:e.t(i.totalScore),z:e.p({span:10}),A:e.p({span:11}),B:e.o((e=>n.formData.examTime=e)),C:e.p({clearable:!1,type:"number",modelValue:n.formData.examTime}),D:e.p({name:"examTime"}),E:e.p({span:10}),F:e.p({span:3}),G:e.p({span:11}),H:e.o((e=>n.formData.score=e)),I:e.p({clearable:!1,type:"number",modelValue:n.formData.score}),J:e.p({name:"score"}),K:e.p({span:10}),L:e.p({span:3}),M:e.p({span:20}),N:n.formData.showRight,O:e.o((()=>{this.formData.showRight=!this.formData.showRight})),P:e.p({name:"showRight"}),Q:e.p({span:2}),R:e.p({span:20}),S:n.formData.optionOrder,T:e.o((e=>i.vipSwitch("optionOrder"))),U:e.p({name:"optionOrder"}),V:e.p({span:2}),W:e.p({span:20}),X:n.formData.worongPrior,Y:e.o((e=>i.vipSwitch("worongPrior"))),Z:e.p({name:"worongPrior"}),aa:e.p({span:2}),ab:e.p({span:20}),ac:n.formData.doneNot,ad:e.o((e=>i.vipSwitch("doneNot"))),ae:e.p({name:"doneNot"}),af:e.p({span:2}),ag:e.p({span:5}),ah:e.o(o.change),ai:e.o((e=>n.formData.moreDataWay=e)),aj:e.p({localdata:n.range,label:"请选择",modelValue:n.formData.moreDataWay}),ak:e.p({name:"moreDataWay"}),al:e.p({span:19}),am:e.o(((...e)=>i.submitForm&&i.submitForm(...e))),an:e.sr("formData","0f97e6b1-0"),ao:e.p({modelValue:n.formData,rules:n.rules})}}]]);wx.createPage(a);