(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22cc69"],{f559:function(e,t,c){"use strict";c.r(t);var n=c("7a23"),r=c("4995"),o=c("5550"),a=Object(n["createTextVNode"])(" 使用的是 VueUse 函数库中的 "),l=Object(n["createTextVNode"])(" useClipboard "),i=Object(n["createTextVNode"])(" 函数 "),u=Object(n["createElementVNode"])("p",null,"这是一段供您复制的文字，选中文字后点击右键选择“复制”或按键盘上 Command + C（windows：Ctrl + C） 即可复制选中文字。",-1),b=Object(n["createElementVNode"])("p",null,"此时浏览器会询问是否授权本网站读取剪切板信息，允许后上方便会显示您所复制的具体内容。",-1),d=Object(n["createTextVNode"])(" 复制输入框文字 "),p={setup:function(e){var t=Object(o["d"])("clipboard-read"),c=Object(o["d"])("clipboard-write"),p=Object(n["ref"])("连雨不知春去，一晴方觉夏深。"),j=Object(o["a"])(),O=j.text,s=j.copy,f=j.isSupported,m=function(){try{s(p.value),r["a"].success("复制成功！")}catch(e){r["a"].error("复制失败！")}};return function(e,r){var o=Object(n["resolveComponent"])("el-link"),j=Object(n["resolveComponent"])("page-header"),s=Object(n["resolveComponent"])("el-alert"),V=Object(n["resolveComponent"])("el-tag"),x=Object(n["resolveComponent"])("page-main"),C=Object(n["resolveComponent"])("el-input"),y=Object(n["resolveComponent"])("el-button");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(j,{"no-icon":"",title:"文本复制"},{default:Object(n["withCtx"])((function(){return[a,Object(n["createVNode"])(o,{type:"primary",href:"https://vueuse.org/core/useClipboard/#type-declarations",target:"_blank"},{default:Object(n["withCtx"])((function(){return[l]})),_:1}),i]})),_:1}),Object(n["createVNode"])(s,{title:"选中文字右键点击复制或键盘快捷键复制后，即可读取到复制内容",type:"warning",effect:"dark","show-icon":""}),Object(n["createVNode"])(x,{style:{margin:"20px"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(V,{style:{"margin-right":"10px"},type:"info"},{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])("是否支持剪切板功能："+Object(n["toDisplayString"])(Object(n["unref"])(f)),1)]})),_:1}),Object(n["createVNode"])(V,{style:{"margin-right":"10px"},type:"info"},{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])("剪切板读权限："+Object(n["toDisplayString"])(Object(n["unref"])(t)),1)]})),_:1}),Object(n["createVNode"])(V,{style:{"margin-bottom":"10px"},type:"info"},{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])("剪切板写权限："+Object(n["toDisplayString"])(Object(n["unref"])(c)),1)]})),_:1}),Object(n["createElementVNode"])("p",null,[Object(n["createVNode"])(s,{title:"当前复制内容：".concat(Object(n["unref"])(O)||"none"),type:"success",closable:!1},null,8,["title"])])]})),_:1}),Object(n["createVNode"])(x,{style:{margin:"20px"}},{default:Object(n["withCtx"])((function(){return[u,b,Object(n["createVNode"])(C,{style:{margin:"50px 0 10px"},modelValue:p.value,"onUpdate:modelValue":r[0]||(r[0]=function(e){return p.value=e}),placeholder:"请输入内容"},null,8,["modelValue"]),Object(n["createVNode"])(y,{type:"primary",onClick:m},{default:Object(n["withCtx"])((function(){return[d]})),_:1})]})),_:1})])}}};t["default"]=p}}]);