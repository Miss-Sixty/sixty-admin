(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b517"],{beec:function(e,t,c){"use strict";c.r(t);c("c4bc");var r=c("6573"),n=c.n(r),o=c("7a23"),a=Object(o["createTextVNode"])(" 基于 clipboard 的二次封装，更多的功能请参考 "),l=Object(o["createTextVNode"])(" clipboard 官网 "),u={class:"page-main"},i=Object(o["createTextVNode"])(" 点击复制 "),b={setup:function(e){var t=Object(o["ref"])("连雨不知春去，一晴方觉夏深。"),c=function(){return n.a.success("已复制到剪切板")},r=function(){return n.a.success("复制错误，请重试！")};return function(e,n){var b=Object(o["resolveComponent"])("el-link"),p=Object(o["resolveComponent"])("page-header"),d=Object(o["resolveComponent"])("el-input"),s=Object(o["resolveComponent"])("el-button"),j=Object(o["resolveDirective"])("clipboard");return Object(o["openBlock"])(),Object(o["createBlock"])("div",null,[Object(o["createVNode"])(p,{icon:"none","icon-text":"none",title:"复制文本"},{default:Object(o["withCtx"])((function(){return[a,Object(o["createVNode"])(b,{type:"primary",href:"https://clipboardjs.com/#example-target",target:"_blank"},{default:Object(o["withCtx"])((function(){return[l]})),_:1})]})),_:1}),Object(o["createVNode"])("div",u,[Object(o["createVNode"])(d,{modelValue:t.value,"onUpdate:modelValue":n[1]||(n[1]=function(e){return t.value=e}),placeholder:"请输入内容",type:"textarea",rows:3},null,8,["modelValue"]),Object(o["withDirectives"])(Object(o["createVNode"])(s,{type:"primary",style:{"margin-top":"20px"}},{default:Object(o["withCtx"])((function(){return[i]})),_:1},512),[[j,t.value],[j,c,"success"],[j,r,"error"]])])])}}};t["default"]=b}}]);