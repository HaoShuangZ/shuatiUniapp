import{at as t,au as e,ai as o,av as s,N as a,aw as r,o as l,d as i,w as n,L as u,m as p}from"./index-708d8c77.js";import{_ as d}from"./_plugin-vue_export-helper.1b428a4d.js";const c=d({name:"PageMeta",setup(o,{emit:s}){t((()=>{e((t=>{s("resize",t)}))}))},props:{backgroundTextStyle:{type:String,default:"dark",validator:t=>-1!==["dark","light"].indexOf(t)},backgroundColor:{type:String,default:"#ffffff"},backgroundColorTop:{type:String,default:"#ffffff"},backgroundColorBottom:{type:String,default:"#ffffff"},scrollTop:{type:String,default:""},scrollDuration:{type:Number,default:300},pageStyle:{type:String,default:""},enablePullDownRefresh:{type:[Boolean,String],default:!1},rootFontSize:{type:String,default:""}},created(){const t=o()[0];this.$pageVm=t.$vm||t,this.$watch("backgroundTextStyle",(()=>{this.setBackgroundTextStyle()})),this.$watch((()=>[this.rootFontSize,this.pageStyle]),(()=>{this.setPageMeta()})),this.$watch((()=>[this.backgroundColor,this.backgroundColorTop,this.backgroundColorBottom]),(()=>{this.setBackgroundColor()})),this.$watch((()=>[this.scrollTop,this.scrollDuration]),(()=>{this.pageScrollTo()}))},beforeMount(){this.setBackgroundColor(),(this.rootFontSize||this.pageStyle)&&this.setPageMeta(),this.backgroundTextStyle&&this.setBackgroundTextStyle()},mounted(){this.scrollTop&&this.pageScrollTo()},methods:{setPullDownRefresh(t,e){t.setStyle({pullToRefresh:{support:e,style:"Android"===plus.os.name?"circle":"default"}})},setPageMeta(){s({pageStyle:this.pageStyle,rootFontSize:this.rootFontSize})},setBackgroundTextStyle(){},setBackgroundColor(){},pageScrollTo(){let t=String(this.scrollTop);-1!==t.indexOf("rpx")&&(t=a(t.replace("rpx",""))),t=parseFloat(t),isNaN(t)||r({scrollTop:t,duration:this.scrollDuration,success:()=>{}})}}},[["render",function(t,e,o,s,a,r){const d=p;return l(),i(d,{style:{display:"none"}},{default:n((()=>[u(t.$slots,"default")])),_:3})}]]);export{c as _};
