(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21b517"],{beec:function(e,t,c){"use strict";c.r(t);c("c4bc");var r=c("6573"),o=c.n(r),n=c("7a23"),a=Object(n["createTextVNode"])(" 基于 "),u=Object(n["createTextVNode"])(" clipboard-copy "),l=Object(n["createTextVNode"])(" 的二次封装。 "),i={class:"page-main"},b=Object(n["createTextVNode"])(" 点击复制 "),p={setup:function(e){var t=Object(n["ref"])("连雨不知春去，一晴方觉夏深。"),c=function(e){return o.a.success(e)},r=function(e){return o.a.error(e)};return function(e,o){var p=Object(n["resolveComponent"])("el-link"),d=Object(n["resolveComponent"])("page-header"),s=Object(n["resolveComponent"])("el-input"),j=Object(n["resolveComponent"])("el-button"),O=Object(n["resolveDirective"])("clipboard");return Object(n["openBlock"])(),Object(n["createBlock"])("div",null,[Object(n["createVNode"])(d,{icon:"none","icon-text":"none",title:"文本复制"},{default:Object(n["withCtx"])((function(){return[a,Object(n["createVNode"])(p,{type:"primary",href:"https://github.com/feross/clipboard-copy",target:"_blank"},{default:Object(n["withCtx"])((function(){return[u]})),_:1}),l]})),_:1}),Object(n["createVNode"])("div",i,[Object(n["createVNode"])(s,{modelValue:t.value,"onUpdate:modelValue":o[1]||(o[1]=function(e){return t.value=e}),placeholder:"请输入内容",type:"textarea",rows:3},null,8,["modelValue"]),Object(n["withDirectives"])(Object(n["createVNode"])(j,{type:"primary",style:{"margin-top":"20px"}},{default:Object(n["withCtx"])((function(){return[b]})),_:1},512),[[O,t.value],[O,c,"success"],[O,r,"error"]])])])}}};t["default"]=p}}]);