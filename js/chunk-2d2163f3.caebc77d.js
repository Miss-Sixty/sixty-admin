(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2163f3"],{c23a:function(e,t,r){"use strict";r.r(t);var c=r("7a23"),n={"element-loading-text":"切换用户中..."},o={class:"page-main"},i=Object(c["createVNode"])("h3",null,"切换帐号",-1),a=Object(c["createVNode"])("h3",null,"帐号权限",-1),s=Object(c["createVNode"])("h3",null,"鉴权指令（请对照代码查看）",-1),u=Object(c["createTextVNode"])("如果你有 permission.browse 权限则能看到这句话"),l=Object(c["createTextVNode"])("如果你有 permission.create 权限则能看到这句话"),b=Object(c["createTextVNode"])(" 如果你有 permission.browse 或 permission.create 权限则能看到这句话 "),d=Object(c["createTextVNode"])(" 如果你有 permission.browse 和 permission.create 权限则能看到这句话 "),j=Object(c["createVNode"])("h3",null,"鉴权组件（请对照代码查看）",-1),O=Object(c["createTextVNode"])("你有 permission.create 权限"),p=Object(c["createTextVNode"])("你没有 permission.create 权限"),m=Object(c["createTextVNode"])("你有 permission.browse 或 permission.create 权限"),f=Object(c["createTextVNode"])("你没有 permission.browse 或 permission.create 权限"),h=Object(c["createTextVNode"])("你有 permission.browse 和 permission.create 权限"),w=Object(c["createTextVNode"])("你没有 permission.browse 和 permission.create 权限"),V=Object(c["createVNode"])("h3",null,"鉴权函数（请对照代码查看）",-1),N=Object(c["createTextVNode"])("校验 permission.browse 权限"),v=Object(c["createTextVNode"])("校验 permission.create 权限"),x=Object(c["createTextVNode"])("校验 permission.browse 或 permission.create 权限"),C=Object(c["createTextVNode"])("校验 permission.browse 和 permission.create 权限");function g(e,t,r,g,k,_){var T=Object(c["resolveComponent"])("page-header"),y=Object(c["resolveComponent"])("el-radio-button"),D=Object(c["resolveComponent"])("el-radio-group"),A=Object(c["resolveComponent"])("el-tag"),B=Object(c["resolveComponent"])("auth"),J=Object(c["resolveComponent"])("auth-all"),R=Object(c["resolveComponent"])("el-button"),U=Object(c["resolveComponent"])("el-button-group"),I=Object(c["resolveDirective"])("auth"),S=Object(c["resolveDirective"])("auth-all"),q=Object(c["resolveDirective"])("loading");return Object(c["withDirectives"])((Object(c["openBlock"])(),Object(c["createBlock"])("div",n,[Object(c["createVNode"])(T,{title:"权限验证"}),Object(c["createVNode"])("div",o,[i,Object(c["createVNode"])(D,{modelValue:g.account,"onUpdate:modelValue":t[1]||(t[1]=function(e){return g.account=e}),onChange:g.accountChange},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(y,{label:"admin"}),Object(c["createVNode"])(y,{label:"editor"})]})),_:1},8,["modelValue","onChange"]),a,Object(c["createVNode"])("div",null,Object(c["toDisplayString"])(g.roles),1),s,Object(c["createVNode"])("div",null,[Object(c["withDirectives"])(Object(c["createVNode"])("div",null,[u],512),[[I,"permission.browse"]]),Object(c["withDirectives"])(Object(c["createVNode"])("div",null,[l],512),[[I,"permission.create"]]),Object(c["withDirectives"])(Object(c["createVNode"])("div",null,[b],512),[[I,["permission.browse","permission.create"]]]),Object(c["withDirectives"])(Object(c["createVNode"])("div",null,[d],512),[[S,["permission.browse","permission.create"]]])]),j,Object(c["createVNode"])("div",null,[Object(c["createVNode"])(B,{value:"permission.create",style:{"margin-bottom":"10px"}},{"no-auth":Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,{type:"danger"},{default:Object(c["withCtx"])((function(){return[p]})),_:1})]})),default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,null,{default:Object(c["withCtx"])((function(){return[O]})),_:1})]})),_:1}),Object(c["createVNode"])(B,{value:["permission.browse","permission.create"],style:{"margin-bottom":"10px"}},{"no-auth":Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,{type:"danger"},{default:Object(c["withCtx"])((function(){return[f]})),_:1})]})),default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,null,{default:Object(c["withCtx"])((function(){return[m]})),_:1})]})),_:1},8,["value"]),Object(c["createVNode"])(J,{value:["permission.browse","permission.create"]},{"no-auth":Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,{type:"danger"},{default:Object(c["withCtx"])((function(){return[w]})),_:1})]})),default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(A,null,{default:Object(c["withCtx"])((function(){return[h]})),_:1})]})),_:1},8,["value"])]),V,Object(c["createVNode"])("div",null,[Object(c["createVNode"])(U,{style:{display:"block","margin-bottom":"10px"}},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(R,{onClick:t[2]||(t[2]=function(e){return g.permissionCheck("permission.browse")})},{default:Object(c["withCtx"])((function(){return[N]})),_:1}),Object(c["createVNode"])(R,{onClick:t[3]||(t[3]=function(e){return g.permissionCheck("permission.create")})},{default:Object(c["withCtx"])((function(){return[v]})),_:1})]})),_:1}),Object(c["createVNode"])(U,null,{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(R,{onClick:t[4]||(t[4]=function(e){return g.permissionCheck(["permission.browse","permission.create"])})},{default:Object(c["withCtx"])((function(){return[x]})),_:1}),Object(c["createVNode"])(R,{onClick:t[5]||(t[5]=function(e){return g.permissionCheckAll(["permission.browse","permission.create"])})},{default:Object(c["withCtx"])((function(){return[C]})),_:1})]})),_:1})])])],512)),[[q,g.loading,void 0,{fullscreen:!0,lock:!0}]])}r("7f17"),r("f3fc");var k=r("6573"),_=r.n(k),T=r("1da1"),y=(r("96cf"),r("5502")),D=r("ed08"),A={setup:function(){var e=Object(y["b"])(),t=Object(c["ref"])(e.state.user.token),r=Object(c["ref"])(!1),n=function(){var t=Object(T["a"])(regeneratorRuntime.mark((function t(c){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r.value=!0,t.next=4,e.dispatch("user/login",{username:c,password:""});case 4:return t.next=6,e.dispatch("user/getUserInfo");case 6:r.value=!1,location.reload(),t.next=14;break;case 10:t.prev=10,t.t0=t["catch"](0),console.log(t.t0),r.value=!1;case 14:case"end":return t.stop()}}),t,null,[[0,10]])})));return function(e){return t.apply(this,arguments)}}(),o=function(e){Object(D["a"])(e)?_.a.success("校验通过"):_.a.error("校验不通过")},i=function(e){Object(D["b"])(e)?_.a.success("校验通过"):_.a.error("校验不通过")};return{roles:e.state.user.roles,account:t,accountChange:n,permissionCheck:o,permissionCheckAll:i,loading:r}}};A.render=g;t["default"]=A}}]);