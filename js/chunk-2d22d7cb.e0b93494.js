(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d7cb"],{f869:function(e,t,n){"use strict";n.r(t);var o=n("7a23"),c={setup:function(e){var t=Object(o["ref"])(["https://picsum.photos/250/150"]),n=function(e){return t.value.push(e.data)};return function(e,c){var l=Object(o["resolveComponent"])("imgs-upload"),u=Object(o["resolveComponent"])("page-main");return Object(o["openBlock"])(),Object(o["createBlock"])(u,{title:"单图上传",style:{margin:"20px"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=function(e){return t.value=e}),action:"/mock/upload",width:"250",height:"150",limit:1,data:{width:250,height:150},tip:"请上传 image/jpeg 、image/png 格式图片！且单张大小不超过 2MB ，建尺寸为 250*150。",onOnSuccess:n},null,8,["modelValue"])]})),_:1})}}},l=c,u={setup:function(e){var t=Object(o["ref"])(["https://picsum.photos/500","https://picsum.photos/600"]),n=function(e){return t.value.push(e.data)};return function(e,c){var l=Object(o["resolveComponent"])("imgs-upload"),u=Object(o["resolveComponent"])("page-main");return Object(o["openBlock"])(),Object(o["createBlock"])(u,{title:"多图上传",style:{margin:"20px"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{modelValue:t.value,"onUpdate:modelValue":c[0]||(c[0]=function(e){return t.value=e}),tip:"",action:"/mock/upload",width:"150",height:"150",onOnSuccess:n},null,8,["modelValue"])]})),_:1})}}},a=u,r=Object(o["createTextVNode"])("点击上传"),i={setup:function(e){var t=Object(o["ref"])([{name:"测试文件.zip",url:"http://xxx"},{name:"测试文件2.zip",url:"http://xxx"}]),n=function(e,t,n){console.log(e),console.log(t),console.log(n)};return function(e,c){var l=Object(o["resolveComponent"])("file-upload"),u=Object(o["resolveComponent"])("el-button"),a=Object(o["resolveComponent"])("el-space"),i=Object(o["resolveComponent"])("page-main");return Object(o["openBlock"])(),Object(o["createBlock"])(i,{title:"文件上传（默认最多3个）",style:{margin:"20px"}},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(a,{alignment:"flex-top",size:30},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{drag:"",files:t.value,action:"/mock/upload",tip:"",onOnSuccess:n},null,8,["files"]),Object(o["createVNode"])(l,{files:t.value,action:"/mock/upload",tip:"",onOnSuccess:n},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(u,{size:"small",type:"primary"},{default:Object(o["withCtx"])((function(){return[r]})),_:1})]})),_:1},8,["files"])]})),_:1})]})),_:1})}}},p=i,s={setup:function(e){return function(e,t){var n=Object(o["resolveComponent"])("page-header"),c=Object(o["resolveComponent"])("el-alert");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",null,[Object(o["createVNode"])(n,{"no-icon":"",title:"上传",content:"使用 Element Plus 的上传组件，二次封装出 图片上传、文件上传组件。"}),Object(o["createVNode"])(c,{title:"上传图片时进度条没有进度的原因是因为数据请求使用mock假数据，改成正式服务器后就能看到完美的进度条了。",type:"warning",effect:"dark","show-icon":""}),Object(o["createVNode"])(Object(o["unref"])(l)),Object(o["createVNode"])(Object(o["unref"])(a)),Object(o["createVNode"])(Object(o["unref"])(p))])}}};t["default"]=s}}]);