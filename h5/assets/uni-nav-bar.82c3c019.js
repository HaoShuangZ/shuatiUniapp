import{_ as t}from"./uni-icons.35026b90.js";import{ao as e,o as a,d as l,w as i,ac as n,n as r,m as s,V as o,D as u,e as h,f as d,j as c,i as f,G as g,E as _}from"./index-25a8f5ab.js";import{r as y}from"./uni-app.es.64b73443.js";import{_ as b}from"./_plugin-vue_export-helper.1b428a4d.js";const p=t=>"number"==typeof t?t+"px":t;const k=b({name:"UniNavBar",components:{statusBar:b({name:"UniStatusBar",data:()=>({statusBarHeight:20}),mounted(){this.statusBarHeight=e().statusBarHeight+"px"}},[["render",function(t,e,o,u,h,d){const c=s;return a(),l(c,{style:r({height:h.statusBarHeight}),class:"uni-status-bar"},{default:i((()=>[n(t.$slots,"default",{},void 0,!0)])),_:3},8,["style"])}],["__scopeId","data-v-40847dd0"]])},emits:["clickLeft","clickRight","clickTitle"],props:{dark:{type:Boolean,default:!1},title:{type:String,default:""},leftText:{type:String,default:""},rightText:{type:String,default:""},leftIcon:{type:String,default:""},rightIcon:{type:String,default:""},fixed:{type:[Boolean,String],default:!1},color:{type:String,default:""},backgroundColor:{type:String,default:""},statusBar:{type:[Boolean,String],default:!1},shadow:{type:[Boolean,String],default:!1},border:{type:[Boolean,String],default:!0},height:{type:[Number,String],default:44},leftWidth:{type:[Number,String],default:60},rightWidth:{type:[Number,String],default:60},stat:{type:[Boolean,String],default:""}},computed:{themeBgColor(){return this.dark?this.backgroundColor?this.backgroundColor:this.dark?"#333":"#FFF":this.backgroundColor||"#FFF"},themeColor(){return this.dark?this.color?this.color:this.dark?"#fff":"#333":this.color||"#333"},navbarHeight(){return p(this.height)},leftIconWidth(){return p(this.leftWidth)},rightIconWidth(){return p(this.rightWidth)}},mounted(){uni.report&&this.stat&&""!==this.title&&uni.report("title",this.title)},methods:{onClickLeft(){this.$emit("clickLeft")},onClickRight(){this.$emit("clickRight")},onClickTitle(){this.$emit("clickTitle")}}},[["render",function(e,b,p,k,m,v){const C=o("status-bar"),x=y(u("uni-icons"),t),B=s,S=_;return a(),l(B,{class:d(["uni-navbar",{"uni-dark":p.dark,"uni-nvue-fixed":p.fixed}])},{default:i((()=>[h(B,{class:d(["uni-navbar__content",{"uni-navbar--fixed":p.fixed,"uni-navbar--shadow":p.shadow,"uni-navbar--border":p.border}]),style:r({"background-color":v.themeBgColor})},{default:i((()=>[p.statusBar?(a(),l(C,{key:0})):c("",!0),h(B,{style:r({color:v.themeColor,backgroundColor:v.themeBgColor,height:v.navbarHeight}),class:"uni-navbar__header"},{default:i((()=>[h(B,{onClick:v.onClickLeft,class:"uni-navbar__header-btns uni-navbar__header-btns-left",style:r({width:v.leftIconWidth})},{default:i((()=>[n(e.$slots,"left",{},(()=>[p.leftIcon.length>0?(a(),l(B,{key:0,class:"uni-navbar__content_view"},{default:i((()=>[h(x,{color:v.themeColor,type:p.leftIcon,size:"20"},null,8,["color","type"])])),_:1})):c("",!0),p.leftText.length?(a(),l(B,{key:1,class:d([{"uni-navbar-btn-icon-left":!p.leftIcon.length>0},"uni-navbar-btn-text"])},{default:i((()=>[h(S,{style:r({color:v.themeColor,fontSize:"12px"})},{default:i((()=>[f(g(p.leftText),1)])),_:1},8,["style"])])),_:1},8,["class"])):c("",!0)]),!0)])),_:3},8,["onClick","style"]),h(B,{class:"uni-navbar__header-container",onClick:v.onClickTitle},{default:i((()=>[n(e.$slots,"default",{},(()=>[p.title.length>0?(a(),l(B,{key:0,class:"uni-navbar__header-container-inner"},{default:i((()=>[h(S,{class:"uni-nav-bar-text uni-ellipsis-1",style:r({color:v.themeColor})},{default:i((()=>[f(g(p.title),1)])),_:1},8,["style"])])),_:1})):c("",!0)]),!0)])),_:3},8,["onClick"]),h(B,{onClick:v.onClickRight,class:"uni-navbar__header-btns uni-navbar__header-btns-right",style:r({width:v.rightIconWidth})},{default:i((()=>[n(e.$slots,"right",{},(()=>[p.rightIcon.length?(a(),l(B,{key:0},{default:i((()=>[h(x,{color:v.themeColor,type:p.rightIcon,size:"22"},null,8,["color","type"])])),_:1})):c("",!0),p.rightText.length&&!p.rightIcon.length?(a(),l(B,{key:1,class:"uni-navbar-btn-text"},{default:i((()=>[h(S,{class:"uni-nav-bar-right-text",style:r({color:v.themeColor})},{default:i((()=>[f(g(p.rightText),1)])),_:1},8,["style"])])),_:1})):c("",!0)]),!0)])),_:3},8,["onClick","style"])])),_:3},8,["style"])])),_:3},8,["class","style"]),p.fixed?(a(),l(B,{key:0,class:"uni-navbar__placeholder"},{default:i((()=>[p.statusBar?(a(),l(C,{key:0})):c("",!0),h(B,{class:"uni-navbar__placeholder-view",style:r({height:v.navbarHeight})},null,8,["style"])])),_:1})):c("",!0)])),_:3},8,["class"])}],["__scopeId","data-v-4a9dc8f8"]]);export{k as _};
