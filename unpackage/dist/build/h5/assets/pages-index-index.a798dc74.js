import{g as t,c as e,s as a,a as i,h as s,b as h,o as l,d as o,w as r,e as c,n,f as d,i as m,j as g,k as f,l as p,m as u,p as w,q as A,r as x,t as y,u as v,v as b,x as C,y as I,F as R,z as D,A as k,B as H,C as U,D as M,E as S,G as N,H as P,I as E}from"./index-708d8c77.js";import{_ as V}from"./page-meta.36056e9b.js";import{o as B,a as G,b as O,r as L}from"./uni-app.es.83c46ea6.js";import{_ as X}from"./uni-segmented-control.9577bcee.js";import{_ as z}from"./uni-section.87462984.js";import{_ as J}from"./uni-popup.231e8e78.js";import{_ as F}from"./answer.1ed4874a.js";import{_ as Y}from"./_plugin-vue_export-helper.1b428a4d.js";import{p as T}from"./index.b1efc826.js";const W=""+new URL("smartResponse-fb480d1e.png",import.meta.url).href,q=""+new URL("text-search-6e2fcda8.png",import.meta.url).href,j=""+new URL("file-search-75b5c8f6.png",import.meta.url).href;var K="",Q=0,Z={left:0,top:0,width:0,height:0},_={left:0,top:0,width:0,height:0},$=[],tt="",et={frame:{left:0,top:0,width:0,height:0},image:{left:0,top:0,width:0,height:0}};function at(t){setTimeout((()=>{it(t)}))}function it(t){t.selectComponent(".frame").setStyle({left:_.left+"px",top:_.top+"px",width:_.width+"px",height:_.height+"px"}),t.selectComponent(".image-wrap").setStyle({left:Z.left+"px",top:Z.top+"px",width:Z.width+"px",height:Z.height+"px"}),t.selectComponent(".image-rect").setStyle({left:Z.left-_.left+"px",top:Z.top-_.top+"px",width:Z.width+"px",height:Z.height+"px"});var e=0,a=0,i=Z.width,s=Z.height;Q%180!=0&&(a=(i=Z.height)/2-(s=Z.width)/2,e=s/2-i/2),t.selectComponent(".image-wrap .image").setStyle({left:e+"px",top:a+"px",width:i+"px",height:s+"px",transform:"rotate("+Q+"deg)"}),t.selectComponent(".image-rect .image").setStyle({left:e+"px",top:a+"px",width:i+"px",height:s+"px",transform:"rotate("+Q+"deg)"})}const st={changeMode:function(t){K=t},changeRotate:function(t,e,a,i){Q=t,at(a)},changeImage:function(t,e,a,i){Z=t,at(a)},changeFrame:function(t,e,a,i){_=t,at(a)},touchstart:function(t,e){t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),$=t.touches;var a=t.instance;return a.hasClass("body")?tt="body":a.hasClass("frame-left-top")?tt="left-top":a.hasClass("frame-left-bottom")?tt="left-bottom":a.hasClass("frame-right-top")?tt="right-top":a.hasClass("frame-right-bottom")&&(tt="right-bottom"),et.frame.left=_.left,et.frame.top=_.top,et.frame.width=_.width,et.frame.height=_.height,et.image.left=Z.left,et.image.top=Z.top,et.image.width=Z.width,et.image.height=Z.height,!1},touchmove:function(t,e){if(t.preventDefault(),t.stopPropagation(),t.instance,1==$.length)"body"==tt?function(t,e,a){var i=e.clientX-t.clientX,s=e.clientY-t.clientY;Z.left=et.image.left+i,Z.top=et.image.top+s;var h=_.left,l=_.top,o=_.width,r=_.height;Z.left>h&&(Z.left=h);Z.top>l&&(Z.top=l);Z.left+Z.width<h+o&&(Z.left=h+o-Z.width);Z.top+Z.height<l+r&&(Z.top=l+r-Z.height);it(a)}($[0],t.touches[0],e):function(t,e,a){var i=e.clientX-t.clientX,s=e.clientY-t.clientY,h=et.frame.left,l=et.frame.top,o=et.frame.left+et.frame.width,r=et.frame.top+et.frame.height,c=!1,n=!1,d=!1,m=!1,g=30,f=_.width/_.height;"left-top"==tt?(h+=i,l+=s,c=!0,n=!0):"left-bottom"==tt?(h+=i,r+=s,c=!0,m=!0):"right-top"==tt?(o+=i,l+=s,d=!0,n=!0):"right-bottom"==tt&&(o+=i,r+=s,d=!0,m=!0);h<Z.left&&(h=Z.left);l<Z.top&&(l=Z.top);o>Z.left+Z.width&&(o=Z.left+Z.width);r>Z.top+Z.height&&(r=Z.top+Z.height);c&&h>o-g&&(h=o-g);n&&l>r-g&&(l=r-g);d&&o<h+g&&(o=h+g);m&&r<l+g&&(r=l+g);if(c){if("free"!=K)h<(p=o-f*(r-l))&&(h=p)}if(n){if("free"!=K)l<(p=r-(o-h)/f)&&(l=p)}if(d){if("free"!=K)o>(p=f*(r-l)+h)&&(o=p)}if(m){var p;if("free"!=K)r>(p=(o-h)/f+l)&&(r=p)}_.left=h,_.top=l,_.width=o-h,_.height=r-l,it(a)}($[0],t.touches[0],e);else if(2==$.length&&2==t.touches.length){var a=$[0],i=$[1],s=t.touches[0],h=t.touches[1];if(a.identifier!=s.identifier){var l=s;s=h,h=l}!function(t,e,a,i,s){var h=t.clientX,l=t.clientY,o=e.clientX,r=e.clientY,c=a.clientX,n=a.clientY,d=i.clientX,m=i.clientY,g=Math.sqrt((h-o)*(h-o)+(l-r)*(l-r)),f=Math.sqrt((c-d)*(c-d)+(n-m)*(n-m)),p=(h+o)/2,u=(l+r)/2,w=(c+d)/2-p,A=(n+m)/2-u,x=f/g;et.image.width*x<_.width&&(x=_.width/et.image.width);et.image.height*x<_.height&&(x=_.height/et.image.height);et.image.width*x<_.width&&(x=_.width/et.image.width);Z.left=et.image.left+w-(p-et.image.left)*(x-1),Z.top=et.image.top+A-(u-et.image.top)*(x-1),Z.width=et.image.width*x,Z.height=et.image.height*x,Z.left>_.left&&(Z.left=_.left);Z.top>_.top&&(Z.top=_.top);Z.left+Z.width<_.left+_.width&&(Z.left=_.left+_.width-Z.width);Z.top+Z.height<_.top+_.height&&(Z.top=_.top+_.height-Z.height);it(s)}(a,i,s,h,e)}},touchend:function(t,e){$=[],e.callMethod("updateData",{frame:_,image:Z})},touchcancel:function(t,e){$=[],e.callMethod("updateData",{frame:_,image:Z})}},ht=t=>{t.$wxs||(t.$wxs=[]),t.$wxs.push("mwx"),t.mixins||(t.mixins=[]),t.mixins.push({beforeCreate(){this.mwx=st}})},lt={props:{mode:{type:String,default:"free"},url:{type:String,default:""},width:{type:Number,default:200},height:{type:Number,default:200},maxWidth:{type:Number,default:1024},maxHeight:{type:Number,default:1024}},data:()=>({canvasId:Math.random().toString(36).slice(-6),real:{width:100,height:100},target:{width:100,height:100},body:{width:100,height:100},frame:{left:50,top:50,width:200,height:300},image:{left:20,top:20,width:300,height:400},rotate:0,transit:!1,modeValue:""}),methods:{imageLoad(a){t({src:this.url,success:t=>{this.real.width=t.width,this.real.height=t.height,this.target={},e().in(this).select(".body").boundingClientRect((t=>{this.body.width=t.width,this.body.height=t.height,this.init()})).exec()}})},init(){console.log("init-------"),this.modeValue=this.mode,this.rotate=0;var t=this.width/this.height,e=.7*this.body.width,a=.7*this.body.height;e/a>t?e=a*t:a=e/t;var i=(this.body.width-e)/2,s=(this.body.height-a)/2;this.frame={left:i,top:s,width:e,height:a},t=this.real.width/this.real.height,(e=this.frame.width)/(a=this.frame.height)>t?a=e/t:e=a*t,i=(this.frame.width-e)/2+this.frame.left,s=(this.frame.height-a)/2+this.frame.top,this.image={left:i,top:s,width:e,height:a}},async updateData(t){this.frame=t.frame,this.image=t.image,await this.$nextTick(),this.trimImage()},trimImage(){var t=this.frame.width/this.frame.height,e=.7*this.body.width,a=.7*this.body.height;e/a>t?e=a*t:a=e/t;var i=(this.body.width-e)/2,s=(this.body.height-a)/2,h=e/this.frame.width,l=this.frame.left-this.image.left,o=this.frame.top-this.image.top;this.frame={left:i,top:s,width:e,height:a},e=this.image.width*h,a=this.image.height*h,i=this.frame.left-l*h,s=this.frame.top-o*h,this.image={left:i,top:s,width:e,height:a},1!=h&&(this.transit=!0,setTimeout((()=>{this.transit=!1}),300))},rotateAngle(){this.rotate-=90;var t=this.image.height,e=this.image.width,a=this.image.left,i=this.image.top,s=t/e;t<this.frame.width&&(e=(t=this.frame.width)/s),e<this.frame.height&&(t=(e=this.frame.height)*s),a>this.frame.left&&(a=this.frame.left),i>this.frame.top&&(i=this.frame.top),a+t<this.frame.left+this.frame.width&&(a=this.frame.left+this.frame.width-t),i+e<this.frame.top+this.frame.height&&(i=this.frame.top+this.frame.height-e),this.image={left:a,top:i,width:t,height:e},this.transit=!0,setTimeout((()=>{this.transit=!1}),300)},onok(){this.cropAppH5()},oncancle(){this.$emit("cancel")},async cropWx(){var t=this.computeMatrix();this.target={width:t.tw,height:t.th};var h=await new Promise((t=>{e().in(this).select(".canvas").fields({node:!0}).exec((e=>{console.log(e,"rst");var a=e[0].node;t(a)}))}));h.width=t.tw,h.height=t.th,a({title:"处理中"}),await new Promise(((t,e)=>{setTimeout(t,200)}));var l=h.getContext("2d"),o=h.createImage();await new Promise(((t,e)=>{o.onload=t,o.onerror=e,o.src=this.url})),l.save(),l.rotate(this.rotate*Math.PI/180),l.drawImage(o,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),l.restore(),i({canvas:h,success:t=>{var e=t.tempFilePath;this.$emit("ok",{path:e})},complete:()=>{s()}})},async cropAppH5(){var t=this.computeMatrix();this.target={width:t.tw,height:t.th},a({title:"处理中"}),await new Promise((t=>{setTimeout(t,200)}));var e=h(this.canvasId,this);e.save(),e.rotate(this.rotate*Math.PI/180),e.drawImage(this.url,t.sx,t.sy,t.sw,t.sh,t.dx,t.dy,t.dw,t.dh),e.restore(),await new Promise((t=>{e.draw(!1,t)})),i({canvasId:this.canvasId,destWidth:t.tw,destHeight:t.th,success:t=>{var e=t.tempFilePath,a=e;e=this.parseBlob(e),this.$emit("ok",{path:e,base64:a})},complete:()=>{s()}},this)},computeMatrix(){var t=this.width,e=this.height,a=this.image.width/this.real.width;this.rotate%180!=0&&(a=this.image.height/this.real.width),"fixed"!=this.mode&&(t=this.frame.width/a,e=this.frame.height/a);var i=t/e;t>this.maxWidth&&(e=(t=this.maxWidth)/i),e>this.maxHeight&&(t=(e=this.maxHeight)*i);var s=(this.frame.left-this.image.left)/a,h=(this.frame.top-this.image.top)/a,l=this.frame.width/a,o=this.frame.height/a,r=s+l/2,c=h+o/2;if(this.rotate%180!=0){var n=l;l=o,o=n}var d=this.rotate%360;if(d<0&&(d+=360),270==d){var m=r;r=g=this.real.width-c,c=m}180==d&&(r=g=this.real.width-r,c=m=this.real.height-c);if(90==d){var g=c;m=this.real.height-r;r=g,c=m}var f={x:0,y:0,w:t,h:e};return{tw:t,th:e,sx:s=r-l/2,sy:h=c-o/2,sw:l,sh:o,dx:(f=this.parseRect(f,-this.rotate)).x,dy:f.y,dw:f.w,dh:f.h}},parsePoint(t,e){var a={};return a.x=t.x*Math.cos(e*Math.PI/180)-t.y*Math.sin(e*Math.PI/180),a.y=t.y*Math.cos(e*Math.PI/180)+t.x*Math.sin(e*Math.PI/180),a},parseRect(t,e){var a=t.x,i=t.y,s=t.x+t.w,h=t.y+t.h,l=this.parsePoint({x:a,y:i},e),o=this.parsePoint({x:s,y:h},e),r={};return r.x=Math.min(l.x,o.x),r.y=Math.min(l.y,o.y),r.w=Math.abs(o.x-l.x),r.h=Math.abs(o.y-l.y),r},parseBlob(t){for(var e=t.split(","),a=e[0].match(/:(.*?);/)[1],i=atob(e[1]),s=i.length,h=new Uint8Array(s),l=0;l<s;l++)h[l]=i.charCodeAt(l);return(URL||webkitURL).createObjectURL(new Blob([h],{type:a}))}}};ht(lt);const ot=Y(lt,[["render",function(t,e,a,i,s,h){const w=f,A=p,x=u;return a.url?(l(),o(x,{key:0,mode:s.modeValue,"change:mode":t.mwx.changeMode,rotate:s.rotate,"change:rotate":t.mwx.changeRotate},{default:r((()=>[c(w,{"canvas-id":s.canvasId,style:n({width:s.target.width+"px",height:s.target.height+"px"})},null,8,["canvas-id","style"]),c(x,{class:"panel"},{default:r((()=>[c(x,{class:"body",onTouchstart:t.mwx.touchstart,onTouchmove:t.mwx.touchmove,onTouchend:t.mwx.touchend,onTouchcancel:t.mwx.touchcancel},{default:r((()=>[c(x,{class:d(["image-wrap",{transit:s.transit}]),"change:rect":t.mwx.changeImage,rect:s.image},{default:r((()=>[c(A,{class:d(["image",{transit:s.transit}]),src:a.url,onLoad:h.imageLoad},null,8,["class","src","onLoad"])])),_:1},8,["class","change:rect","rect"]),c(x,{class:"mask"}),c(x,{class:d(["frame",{transit:s.transit}]),"change:rect":t.mwx.changeFrame,rect:s.frame},{default:r((()=>[c(x,{class:"rect"},{default:r((()=>[c(x,{class:d(["image-rect",{transit:s.transit}])},{default:r((()=>[c(A,{class:d(["image",{transit:s.transit}]),src:a.url},null,8,["class","src"])])),_:1},8,["class"])])),_:1}),c(x,{class:"line-one"}),c(x,{class:"line-two"}),c(x,{class:"line-three"}),c(x,{class:"line-four"}),c(x,{class:"frame-left-top",onTouchstart:t.mwx.touchstart},null,8,["onTouchstart"]),c(x,{class:"frame-left-bottom",onTouchstart:t.mwx.touchstart},null,8,["onTouchstart"]),c(x,{class:"frame-right-top",onTouchstart:t.mwx.touchstart},null,8,["onTouchstart"]),c(x,{class:"frame-right-bottom",onTouchstart:t.mwx.touchstart},null,8,["onTouchstart"])])),_:1},8,["class","change:rect","rect"])])),_:1},8,["onTouchstart","onTouchmove","onTouchend","onTouchcancel"]),c(x,{class:"toolbar"},{default:r((()=>[c(x,{onClick:h.oncancle,class:"btn-cancel"},{default:r((()=>[m("取消")])),_:1},8,["onClick"]),c(x,{onClick:h.rotateAngle,class:"btn-rotate"},{default:r((()=>[m("旋转")])),_:1},8,["onClick"]),c(x,{onClick:h.onok,class:"btn-ok"},{default:r((()=>[m("确定")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1},8,["mode","change:mode","rotate","change:rotate"])):g("",!0)}],["__scopeId","data-v-625ceb3f"]]),rt=Y({__name:"index",setup(t){const e=D(),{$http:i}=e.appContext.config.globalProperties;B((()=>{})),G((()=>{let t=w("token");it(),t&&rt(),!t&&A.wxLogin()})),O((()=>{x({success:t=>{console.log("获取当前设备信息",t),y("phoneInfo",t),console.log("高度",t.screenHeight-t.safeAreaInsets.top-t.safeAreaInsets.bottom),y("screenHeight",t.screenHeight-2*t.safeAreaInsets.top+t.safeAreaInsets.bottom),y("safeAreaHeight",2*t.safeAreaInsets.top+t.safeAreaInsets.bottom)}})}));const h=v(null),d=["A","B","C","D"],f=t=>{H({url:0===t?"../index/search?type=0":"./docSearch"})};let Y=v(["热门文档","我的题库"]),K=v(0);v(0);let Q=v("#007aff"),Z=v("text"),_=v(""),$=v("");v("");let tt=v(!0);const et=b({page:1,size:10});let at=v([]);const it=()=>{let t={params:{page:et.page,size:et.size},callBack:t=>{at.value=t.records.filter((t=>t.hotFlag)),console.log(at,"获取分页文档")}};i("getDocumentList",t)},st=()=>{U({count:1,encoding:"base64",success:t=>{_.value=t.tempFilePaths[0]}})},ht=t=>{tt.value=t.show};let lt=v([]);const rt=()=>{i("indexPageCollectList",{callBack:t=>{console.log("获取的列表",t),lt.value=t}})};let ct=v([]);const nt=t=>{ct.value=[],a({title:"加载中"}),i("imgSearchBase64",{params:{ecode:t,page:1,size:10},callBack:t=>{s(),(t.code=1200)?(ct.value=t.records,h.value.open("bottom")):E({title:t.message,icon:"error",duration:1e3}),console.log("e",t)}})},dt=v(""),mt=t=>{var e;_.value="",dt.value=t.path,e=t.path,T(e).then((t=>{nt(t.split("data:image/png;base64,")[1])})).catch((t=>{console.error(t)}))},gt=()=>{_.value=""},ft=t=>{K.value!==t.currentIndex&&(K.value=t.currentIndex)};return(t,e)=>{const a=L(M("page-meta"),V),i=S,s=p,w=u,A=L(M("uni-segmented-control"),X),x=L(M("uni-section"),z),v=L(M("uni-popup"),J);return l(),C(R,null,[c(a,{"page-style":"overflow:"+(I(tt)?"hidden":"visible")},null,8,["page-style"]),c(w,{class:"container"},{default:r((()=>[c(w,{style:{padding:"20px"}},{default:r((()=>[c(w,{class:"title"},{default:r((()=>[c(i,{class:"text-title"},{default:r((()=>[m("Hey,早上好")])),_:1}),c(s,{class:"img-title",src:"data:image/png;base64,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",alt:"search"})])),_:1}),c(w,{class:"messag-text"},{default:r((()=>[c(i,null,{default:r((()=>[m("一日之计在于晨，快来刷题通一起学习吧")])),_:1})])),_:1}),c(w,{class:"smart-img",onClick:st},{default:r((()=>[c(s,{class:"search-img",src:W,alt:"smartResponse"})])),_:1}),c(w,{class:"text-file-search"},{default:r((()=>[c(s,{class:"search-two",src:q,alt:"",onClick:e[0]||(e[0]=t=>f(0))}),c(s,{class:"search-two",src:j,alt:"",onClick:e[1]||(e[1]=t=>f(1))})])),_:1}),c(x,null,{default:r((()=>[c(w,{class:"uni-padding-wrap uni-common-mt"},{default:r((()=>[c(A,{current:I(K),values:I(Y),"style-type":I(Z),"active-color":I(Q),onClickItem:ft},null,8,["current","values","style-type","active-color"])])),_:1}),c(w,{class:"content"},{default:r((()=>[0===I(K)?(l(),o(w,{key:0,class:"doc",style:n({width:0===I(at).length?"100%":null})},{default:r((()=>[0===I(at).length?(l(),o(w,{key:0,class:"content-text"},{default:r((()=>[m("暂无数据")])),_:1})):(l(!0),C(R,{key:1},k(I(at),(t=>(l(),o(w,{class:"doc-item",onClick:e=>(t=>{console.log(t),y("docDetail",t),H({url:"../docView/docView"})})(t),key:t.docId},{default:r((()=>[c(w,{class:"doc-img"},{default:r((()=>[c(s,{src:t.coverImage,style:{height:"140rpx",width:"110rpx"}},null,8,["src"])])),_:2},1024),c(w,{class:"doc-content"},{default:r((()=>[c(i,{class:"item-title"},{default:r((()=>[m(N(t.docName),1)])),_:2},1024),(l(!0),C(R,null,k(t.tags,((e,a)=>(l(),o(i,{class:"item-tags",key:e},{default:r((()=>[m(N(e)+" ",1),a!=t.tags.length-1?(l(),o(i,{key:0},{default:r((()=>[m("|")])),_:1})):g("",!0)])),_:2},1024)))),128)),c(i,{class:"download-num"},{default:r((()=>[m(N(t.downloadNum)+"下载",1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1},8,["style"])):g("",!0),1===I(K)?(l(),o(w,{key:1,class:"ans",style:n({width:0===I(lt).length?"100%":null})},{default:r((()=>[I(lt).length>0?(l(!0),C(R,{key:0},k(I(lt),((t,e)=>(l(),o(w,{class:"ans-item",key:e,onClick:e=>(t=>{console.log("item",t),y("categoryId",t.categoryId),H({url:`../constructor/constructorItem?categoryId=${t.categoryId}&categoryName=${t.category.categoryName}`})})(t)},{default:r((()=>[c(w,{class:"img-box"},{default:r((()=>[c(s,{class:"ans-icon",src:F,alt:""})])),_:1}),c(w,{class:"ans-content"},{default:r((()=>[c(i,{class:"ans-title"},{default:r((()=>[m(N(t.category&&t.category.categoryName||""),1)])),_:2},1024),c(w,{class:"ans-text"},{default:r((()=>[c(s,{class:"text-icon",src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAArCAYAAAD7YZFOAAAAAXNSR0IArs4c6QAABERJREFUWEftmU2IHEUUgOvVdNfMZtfDJiKBxL/gRcSDSi4GczAHxZuGFS+u7GG6ahYiSkATxGSSgxrMRSdtVxXsHlbwoCEHD/6gHvzDiwYvguAhxhjWgH8IMjPd0/XkNdPLsszsOD2zWcGpU/fU6/e+fvX6vao3wDYMrfUhANjPGKs45zZOb8k955z0tgDg6yAIPs6NQH5hjLmXMfah53k3pmnKEHFLQPopBQBWKpVYp9P5kzF2SEp5MYOLouiecrl8MUmS6wrUz5jv+yxJkvsyOGPM74yxWQBAREwQMQKAP5xza57dSmrOOdkl+zUA8BGR7F4GrfVBIcSnXa/FU1NTO+fn5//eSph+uldWVqabzSYtq0cyYIw5xhh7mW4Q8TWl1DPbAZbb1Fq/DgBHcrg6Y+xkd7IupTy1nXDGGGIhpsxzazfOuVO1Wi2b2K4RRVGdc545awI3zCoU9hxVD0TcR59+L4NAmZSxS+uz/DBg3Zw7/LJaaw8LIc4PStTdBDpXrVbPDwtWGE5rveh5XkilbbNBJShN0yNSynPXDa5bSU465/ZSJellmDI7AFxRSp0uAlbYc0WNDftc4Q9iWENF5CdwRbw2UsxZa+9yzt3aL88NAqItGOf8chAE3/WTLbSs1tqHKpXKB4Py3CBAIQRrNpuPBEHwfi/ZQnBRFB31PO/sqOcKKiKI+JyU8tWxwZEirfU5ANjXL88N8lp3h/ujlHJxrMs6yPC45gst67iMD9IzgRvkobHHXBiGu4UQtznnCp240zQF3/cvVavVa2OFi6LowMzMzBej5jna77VarYPVavXzsaUSrfVxzvlLo7YpKM85544ppc6MDc4YQyfxtxhje4vGEz0HAL+srq7O1ev1ztjgRgEa5tlJKhnGW+tlJ577X3hurcv0X2jkWGtPIGLW6aLm4SLnPOwm13eklI/3yT8HSqXS3c65NgB8IqX8aZilW15evjlJkgcZYzsQ8Vul1Fe9njfGvM0Ym8vgwjC8Y3p6+od2u82otMRxfFgpdYEmwzC80/f9GiIq3/f9/LRPW+12u/2Nc+64UuqjzSC11g8DwOlKpbI/juNMlLoCSZJQe1cDwBtSyu/pd2vto57nXaASSZUk6/lqrT8DgAfo2vM86mj/RtdCiF25wl4AJJskyVXO+YkgCJbXyxhjnkLEV3zf393p9CwGmTi9aBzHmT3P83blsgDwXt6wptL0MwDc1Aui69G/AIBcvlMI8Ri9XV5n6X8E5xy14ik8qCVR5ZzvWH/eKJfL5O13EfEaADzh+/4Nm2wifp2dnd2z1i0npdZazTkPyCM06C2cc28650ytVvsyB19aWiLFL3DOn6ff+m0GutA0f7ZcLr+4sLDQynVYa++ncOGcP5nbo7DpdDoNpdTTWcz18lSj0bhdCJH+m6CPouhZzvlRxtieDbquIuIZpVRj0IdjjLmFZDba+weQnwMprWqhCgAAAABJRU5ErkJggg==",alt:""}),m("  "+N(t.categoryQuestionNum||0)+"题 ",1)])),_:2},1024),c(w,{class:"ans-text"},{default:r((()=>[c(s,{class:"text-icon",src:"data:image/png;base64,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",alt:""}),m("  "+N(t.createTime),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["onClick"])))),128)):(l(),o(w,{key:1,class:"content-text",style:n({width:0===I(lt).length?"100%":null,"text-align":"center"})},{default:r((()=>[m("暂无数据")])),_:1},8,["style"]))])),_:1},8,["style"])):g("",!0)])),_:1})])),_:1})])),_:1}),c(v,{ref_key:"popup",ref:h,"background-color":"#fff",onChange:ht},{default:r((()=>[c(w,{class:"popup-content"},{default:r((()=>[I(ct).length>0?(l(!0),C(R,{key:0},k(I(ct),((t,e)=>(l(),o(w,{class:"popup-text",key:e},{default:r((()=>[c(i,{class:"question-title"},{default:r((()=>[m(N(e+1)+"、"+N(t.questionTitle),1)])),_:2},1024),(l(!0),C(R,null,k(t.options,((t,e)=>(l(),o(i,{class:"question-item",key:e},{default:r((()=>[m(N(d[e])+"、"+N(t),1)])),_:2},1024)))),128)),c(i,{class:"right-item"},{default:r((()=>[m("正确答案:"),(l(!0),C(R,null,k(t.rightOptions,((t,e)=>(l(),o(i,{key:e},{default:r((()=>[m(N(t)+" ",1)])),_:2},1024)))),128))])),_:2},1024),P("br"),c(i,{class:"right-item"},{default:r((()=>[m("解析:"+N(t.analysis||"暂无"),1)])),_:2},1024)])),_:2},1024)))),128)):(l(),o(w,{key:1},{default:r((()=>[m("暂无数据")])),_:1}))])),_:1})])),_:1},512),I($)?(l(),o(s,{key:0,mode:"widthFix",src:I($)},null,8,["src"])):g("",!0),c(I(ot),{mode:"free",width:600,height:440,maxWidth:1024,maxHeight:1024,url:I(_),onCancel:gt,onOk:mt},null,8,["url"])])),_:1})],64)}}},[["__scopeId","data-v-336ce4dc"]]);export{rt as default};
