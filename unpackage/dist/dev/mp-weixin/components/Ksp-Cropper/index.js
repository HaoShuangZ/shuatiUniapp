"use strict";const o=require("../../common/vendor.js"),c=t=>{t.wxsCallMethods||(t.wxsCallMethods=[]),t.wxsCallMethods.push("updateData")},v={props:{mode:{type:String,default:"free"},url:{type:String,default:""},width:{type:Number,default:200},height:{type:Number,default:200},maxWidth:{type:Number,default:1024},maxHeight:{type:Number,default:1024}},data(){return{canvasId:Math.random().toString(36).slice(-6),real:{width:100,height:100},target:{width:100,height:100},body:{width:100,height:100},frame:{left:50,top:50,width:200,height:300},image:{left:20,top:20,width:300,height:400},rotate:0,transit:!1,modeValue:""}},methods:{imageLoad(t){o.index.getImageInfo({src:this.url,success:e=>{this.real.width=e.width,this.real.height=e.height,this.target={};var i=o.index.createSelectorQuery().in(this);i.select(".body").boundingClientRect(r=>{this.body.width=r.width,this.body.height=r.height,this.init()}).exec()}})},init(){console.log("init-------"),this.modeValue=this.mode,this.rotate=0;var t=this.width/this.height,e=this.body.width*.7,i=this.body.height*.7;e/i>t?e=i*t:i=e/t;var r=(this.body.width-e)/2,h=(this.body.height-i)/2;this.frame={left:r,top:h,width:e,height:i},t=this.real.width/this.real.height,e=this.frame.width,i=this.frame.height,e/i>t?i=e/t:e=i*t,r=(this.frame.width-e)/2+this.frame.left,h=(this.frame.height-i)/2+this.frame.top,this.image={left:r,top:h,width:e,height:i}},async updateData(t){this.frame=t.frame,this.image=t.image,await this.$nextTick(),this.trimImage()},trimImage(){var t=this.frame.width/this.frame.height,e=this.body.width*.7,i=this.body.height*.7;e/i>t?e=i*t:i=e/t;var r=(this.body.width-e)/2,h=(this.body.height-i)/2,a=e/this.frame.width,s=this.frame.left-this.image.left,d=this.frame.top-this.image.top;this.frame={left:r,top:h,width:e,height:i},e=this.image.width*a,i=this.image.height*a,r=this.frame.left-s*a,h=this.frame.top-d*a,this.image={left:r,top:h,width:e,height:i},a!=1&&(this.transit=!0,setTimeout(()=>{this.transit=!1},300))},rotateAngle(){this.rotate-=90;var t=this.image.height,e=this.image.width,i=this.image.left,r=this.image.top,h=t/e;t<this.frame.width&&(t=this.frame.width,e=t/h),e<this.frame.height&&(e=this.frame.height,t=e*h),i>this.frame.left&&(i=this.frame.left),r>this.frame.top&&(r=this.frame.top),i+t<this.frame.left+this.frame.width&&(i=this.frame.left+this.frame.width-t),r+e<this.frame.top+this.frame.height&&(r=this.frame.top+this.frame.height-e),this.image={left:i,top:r,width:t,height:e},this.transit=!0,setTimeout(()=>{this.transit=!1},300)},onok(){this.cropWx()},oncancle(){this.$emit("cancel")},async cropWx(){var t=this.computeMatrix();this.target={width:t.tw,height:t.th};var e=await new Promise(h=>{o.index.createSelectorQuery().in(this).select(".canvas").fields({node:!0}).exec(a=>{console.log(a,"rst");var s=a[0].node;h(s)})});e.width=t.tw,e.height=t.th,o.index.showLoading({title:"处理中"}),await new Promise((h,a)=>{setTimeout(h,200)});var i=e.getContext("2d"),r=e.createImage();await new Promise((h,a)=>{r.onload=h,r.onerror=a,r.src=this.url}),i.save(),i.rotate(this.rotate*Math.PI/180),i.drawImage(r,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),i.restore(),o.wx$1.canvasToTempFilePath({canvas:e,success:h=>{var a=h.tempFilePath;this.$emit("ok",{path:a})},complete:()=>{o.index.hideLoading()}})},async cropAppH5(){var t=this.computeMatrix();this.target={width:t.tw,height:t.th},o.index.showLoading({title:"处理中"}),await new Promise(i=>{setTimeout(i,200)});var e=o.index.createCanvasContext(this.canvasId,this);e.save(),e.rotate(this.rotate*Math.PI/180),e.drawImage(this.url,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),e.restore(),await new Promise(i=>{e.draw(!1,i)}),o.index.canvasToTempFilePath({canvasId:this.canvasId,destWidth:t.tw,destHeight:t.th,success:i=>{i.tempFilePath},complete:()=>{o.index.hideLoading()}},this)},computeMatrix(){var t=this.width,e=this.height,i=this.image.width/this.real.width;this.rotate%180!=0&&(i=this.image.height/this.real.width),this.mode!="fixed"&&(t=this.frame.width/i,e=this.frame.height/i);var r=t/e;t>this.maxWidth&&(t=this.maxWidth,e=t/r),e>this.maxHeight&&(e=this.maxHeight,t=e*r);var h=(this.frame.left-this.image.left)/i,a=(this.frame.top-this.image.top)/i,s=this.frame.width/i,d=this.frame.height/i,m=h+s/2,f=a+d/2;if(this.rotate%180!=0){var x=s;s=d,d=x}var l=this.rotate%360;if(l<0&&(l+=360),l==270){var g=this.real.width-f,w=m;m=g,f=w}if(l==180){var g=this.real.width-m,w=this.real.height-f;m=g,f=w}if(l==90){var g=f,w=this.real.height-m;m=g,f=w}h=m-s/2,a=f-d/2;var n={x:0,y:0,w:t,h:e};return n=this.parseRect(n,-this.rotate),{tw:t,th:e,sx:h,sy:a,sw:s,sh:d,dx:n.x,dy:n.y,dw:n.w,dh:n.h}},parsePoint(t,e){var i={};return i.x=t.x*Math.cos(e*Math.PI/180)-t.y*Math.sin(e*Math.PI/180),i.y=t.y*Math.cos(e*Math.PI/180)+t.x*Math.sin(e*Math.PI/180),i},parseRect(t,e){var i=t.x,r=t.y,h=t.x+t.w,a=t.y+t.h,s=this.parsePoint({x:i,y:r},e),d=this.parsePoint({x:h,y:a},e),m={};return m.x=Math.min(s.x,d.x),m.y=Math.min(s.y,d.y),m.w=Math.abs(d.x-s.x),m.h=Math.abs(d.y-s.y),m},parseBlob(t){for(var e=t.split(","),i=e[0].match(/:(.*?);/)[1],r=atob(e[1]),h=r.length,a=new Uint8Array(h),s=0;s<h;s++)a[s]=r.charCodeAt(s);var d=URL||webkitURL;return d.createObjectURL(new Blob([a],{type:i}))}}};function u(t,e,i,r,h,a){return o.e({a:i.url},i.url?{b:h.target.width+"px",c:h.target.height+"px",d:h.transit?1:"",e:i.url,f:o.o((...s)=>a.imageLoad&&a.imageLoad(...s)),g:h.transit?1:"",h:h.image,i:h.transit?1:"",j:i.url,k:h.transit?1:"",l:h.transit?1:"",m:h.frame,n:o.o((...s)=>a.oncancle&&a.oncancle(...s)),o:o.o((...s)=>a.rotateAngle&&a.rotateAngle(...s)),p:o.o((...s)=>a.onok&&a.onok(...s)),q:h.modeValue,r:h.rotate}:{})}typeof c=="function"&&c(v);const y=o._export_sfc(v,[["render",u],["__scopeId","data-v-ea78cbfb"],["__file","C:/Users/sygen/Documents/HBuilderProjects/brushQuestion-front/components/Ksp-Cropper/index.vue"]]);wx.createComponent(y);