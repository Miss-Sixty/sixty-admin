(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20fcf5"],{b4e2:function(e,t,n){"use strict";n.r(t);var c=n("7a23"),o=n("d9cd"),r={style:{"margin-bottom":"20px"}},u=Object(c["createTextVNode"])("显示/隐藏"),a=Object(c["createTextVNode"])("切换"),b=Object(c["createTextVNode"])("清空"),i={props:{type:{type:String,default:"dot"}},setup:function(e){var t=e,n=Object(o["a"])(),i=Object(c["computed"])((function(){return n.dot})),l=Object(c["computed"])((function(){return n.number})),p=Object(c["computed"])((function(){return n.text})),d=function(e){var t={dot:{title:"点标记",content:"搭配 Pinia 可实现动态设置",text:"当前 badge 值：".concat(i.value)},number:{title:"数字标记",content:"搭配 Pinia 可实现动态设置。请控制数字展示长度，避免导航标记覆盖导航标题，为 0 时则隐藏",text:"当前 badge 值：".concat(l.value)},text:{title:"文字标记",content:"搭配 Pinia 可实现动态设置。请控制文字展示长度，避免导航标记覆盖导航标题",text:"当前 badge 值：".concat(p.value)}};return t[e]},j=Object(c["computed"])((function(){return d(t.type)})),O=function(){return n.dot=!n.dot},m=function(e){return n.number=e},f=function(e){if("empty"===e)return n.text="";n.text="热门"===p.value?"活动":"热门"};return function(t,n){var o=Object(c["resolveComponent"])("page-header"),i=Object(c["resolveComponent"])("el-button"),p=Object(c["resolveComponent"])("el-input-number"),d=Object(c["resolveComponent"])("el-button-group"),y=Object(c["resolveComponent"])("page-main");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(o,{"no-icon":"",title:Object(c["unref"])(j).title,content:Object(c["unref"])(j).content},null,8,["title","content"]),Object(c["createVNode"])(y,{style:{margin:"20px"}},{default:Object(c["withCtx"])((function(){return[Object(c["createElementVNode"])("p",r,Object(c["toDisplayString"])(Object(c["unref"])(j).text),1),"dot"===e.type?(Object(c["openBlock"])(),Object(c["createBlock"])(i,{key:0,type:"primary",onClick:O},{default:Object(c["withCtx"])((function(){return[u]})),_:1})):Object(c["createCommentVNode"])("",!0),"number"===e.type?(Object(c["openBlock"])(),Object(c["createBlock"])(p,{key:1,"model-value":Object(c["unref"])(l),onChange:m},null,8,["model-value"])):Object(c["createCommentVNode"])("",!0),"text"===e.type?(Object(c["openBlock"])(),Object(c["createBlock"])(d,{key:2},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(i,{type:"primary",onClick:f},{default:Object(c["withCtx"])((function(){return[a]})),_:1}),Object(c["createVNode"])(i,{type:"primary",onClick:n[0]||(n[0]=function(e){return f("empty")})},{default:Object(c["withCtx"])((function(){return[b]})),_:1})]})),_:1})):Object(c["createCommentVNode"])("",!0)]})),_:1})],64)}}};t["default"]=i}}]);