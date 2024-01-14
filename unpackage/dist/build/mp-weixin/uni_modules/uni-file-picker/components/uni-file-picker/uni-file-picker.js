"use strict";const e=require("../../../../common/vendor.js"),t=require("./choose-and-upload-file.js"),i=require("./utils.js"),s={name:"uniFilePicker",components:{uploadImage:()=>"./upload-image.js",uploadFile:()=>"./upload-file.js"},options:{virtualHost:!0},emits:["select","success","fail","progress","delete","update:modelValue","input"],props:{modelValue:{type:[Array,Object],default:()=>[]},disabled:{type:Boolean,default:!1},disablePreview:{type:Boolean,default:!1},delIcon:{type:Boolean,default:!0},autoUpload:{type:Boolean,default:!0},limit:{type:[Number,String],default:9},mode:{type:String,default:"grid"},fileMediatype:{type:String,default:"image"},fileExtname:{type:[Array,String],default:()=>[]},title:{type:String,default:""},listStyles:{type:Object,default:()=>({border:!0,dividline:!0,borderStyle:{}})},imageStyles:{type:Object,default:()=>({width:"auto",height:"auto"})},readonly:{type:Boolean,default:!1},returnType:{type:String,default:"array"},sizeType:{type:Array,default:()=>["original","compressed"]}},data:()=>({files:[],localValue:[]}),watch:{modelValue:{handler(e,t){this.setValue(e,t)},immediate:!0}},computed:{filesList(){let e=[];return this.files.forEach((t=>{e.push(t)})),e},showType(){return"image"===this.fileMediatype?this.mode:"list"},limitLength(){return"object"===this.returnType?1:this.limit?this.limit>=9?9:this.limit:1}},created(){e.Es.config&&e.Es.config.provider||(this.noSpace=!0,e.Es.chooseAndUploadFile=t.chooseAndUploadFile),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.rename=this.formItem.name,this.form.inputChildrens.push(this))},methods:{clearFiles(e){0===e||e?this.files.splice(e,1):(this.files=[],this.$nextTick((()=>{this.setEmit()}))),this.$nextTick((()=>{this.setEmit()}))},upload(){let e=[];return this.files.forEach(((t,i)=>{"ready"!==t.status&&"error"!==t.status||e.push(Object.assign({},t))})),this.uploadFiles(e)},async setValue(e,t){const i=async e=>{let t="";return t=e.fileID?e.fileID:e.url,/cloud:\/\/([\w.]+\/?)\S*/.test(t)&&(e.fileID=t,e.url=await this.getTempFileURL(t)),e.url&&(e.path=e.url),e};if("object"===this.returnType)e?await i(e):e={};else{e||(e=[]);for(let t=0;t<e.length;t++){let s=e[t];await i(s)}}this.localValue=e,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(this.localValue));let s=Object.keys(e).length>0?e:[];this.files=[].concat(s)},choose(){this.disabled||(this.files.length>=Number(this.limitLength)&&"grid"!==this.showType&&"array"===this.returnType?e.index.showToast({title:`您最多选择 ${this.limitLength} 个文件`,icon:"none"}):this.chooseFiles())},chooseFiles(){const t=i.get_extname(this.fileExtname);e.Es.chooseAndUploadFile({type:this.fileMediatype,compressed:!1,sizeType:this.sizeType,extension:t.length>0?t:void 0,count:this.limitLength-this.files.length,onChooseFile:this.chooseFileCallback,onUploadProgress:e=>{this.setProgress(e,e.index)}}).then((e=>{this.setSuccessAndError(e.tempFiles)})).catch((e=>{console.log("选择失败",e)}))},async chooseFileCallback(e){const t=i.get_extname(this.fileExtname);(1===Number(this.limitLength)&&this.disablePreview&&!this.disabled||"object"===this.returnType)&&(this.files=[]);let{filePaths:s,files:l}=i.get_files_and_is_max(e,t);t&&t.length>0||(s=e.tempFilePaths,l=e.tempFiles);let a=[];for(let o=0;o<l.length&&!(this.limitLength-this.files.length<=0);o++){l[o].uuid=Date.now();let e=await i.get_file_data(l[o],this.fileMediatype);e.progress=0,e.status="ready",this.files.push(e),a.push({...e,file:l[o]})}this.$emit("select",{tempFiles:a,tempFilePaths:s}),e.tempFiles=l,this.autoUpload&&!this.noSpace||(e.tempFiles=[])},uploadFiles(e){return e=[].concat(e),t.uploadCloudFiles.call(this,e,5,(e=>{this.setProgress(e,e.index,!0)})).then((e=>(this.setSuccessAndError(e),e))).catch((e=>{console.log(e)}))},async setSuccessAndError(e,t){let i=[],s=[],l=[],a=[];for(let o=0;o<e.length;o++){const t=e[o],r=t.uuid?this.files.findIndex((e=>e.uuid===t.uuid)):t.index;if(-1===r||!this.files)break;if("request:fail"===t.errMsg)this.files[r].url=t.path,this.files[r].status="error",this.files[r].errMsg=t.errMsg,s.push(this.files[r]),a.push(this.files[r].url);else{this.files[r].errMsg="",this.files[r].fileID=t.url;/cloud:\/\/([\w.]+\/?)\S*/.test(t.url)?this.files[r].url=await this.getTempFileURL(t.url):this.files[r].url=t.url,this.files[r].status="success",this.files[r].progress+=1,i.push(this.files[r]),l.push(this.files[r].fileID)}}i.length>0&&(this.setEmit(),this.$emit("success",{tempFiles:this.backObject(i),tempFilePaths:l})),s.length>0&&this.$emit("fail",{tempFiles:this.backObject(s),tempFilePaths:a})},setProgress(e,t,i){this.files.length;const s=Math.round(100*e.loaded/e.total);let l=t;i||(l=this.files.findIndex((t=>t.uuid===e.tempFile.uuid))),-1!==l&&this.files[l]&&(this.files[l].progress=s-1,this.$emit("progress",{index:l,progress:parseInt(s),tempFile:this.files[l]}))},delFile(e){this.$emit("delete",{tempFile:this.files[e],tempFilePath:this.files[e].url}),this.files.splice(e,1),this.$nextTick((()=>{this.setEmit()}))},getFileExt(e){const t=e.lastIndexOf("."),i=e.length;return{name:e.substring(0,t),ext:e.substring(t+1,i)}},setEmit(){let e=[];"object"===this.returnType?(e=this.backObject(this.files)[0],this.localValue=e||null):(e=this.backObject(this.files),this.localValue||(this.localValue=[]),this.localValue=[...e]),this.$emit("update:modelValue",this.localValue)},backObject(e){let t=[];return e.forEach((e=>{t.push({extname:e.extname,fileType:e.fileType,image:e.image,name:e.name,path:e.path,size:e.size,fileID:e.fileID,url:e.url})})),t},async getTempFileURL(t){t={fileList:[].concat(t)};return(await e.Es.getTempFileURL(t)).fileList[0].tempFileURL||""},getForm(e="uniForms"){let t=this.$parent,i=t.$options.name;for(;i!==e;){if(t=t.$parent,!t)return!1;i=t.$options.name}return t}}};if(!Array){(e.resolveComponent("upload-image")+e.resolveComponent("upload-file"))()}const l=e._export_sfc(s,[["render",function(t,i,s,l,a,o){return e.e({a:s.title},s.title?{b:e.t(s.title),c:e.t(o.filesList.length),d:e.t(o.limitLength)}:{},{e:"image"===s.fileMediatype&&"grid"===o.showType},"image"===s.fileMediatype&&"grid"===o.showType?{f:e.o(o.uploadFiles),g:e.o(o.choose),h:e.o(o.delFile),i:e.p({readonly:s.readonly,"image-styles":s.imageStyles,"files-list":o.filesList,limit:o.limitLength,disablePreview:s.disablePreview,delIcon:s.delIcon})}:{},{j:"image"!==s.fileMediatype||"grid"!==o.showType},"image"!==s.fileMediatype||"grid"!==o.showType?{k:e.o(o.uploadFiles),l:e.o(o.choose),m:e.o(o.delFile),n:e.p({readonly:s.readonly,"list-styles":s.listStyles,"files-list":o.filesList,showType:o.showType,delIcon:s.delIcon})}:{})}]]);wx.createComponent(l);
