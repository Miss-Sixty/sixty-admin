(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76e51842"],{"7c40":function(e,t,r){},c23a:function(e,t,r){"use strict";r.r(t);var c=r("1da1"),n=(r("96cf"),r("d3b7"),r("3ca3"),r("ddb0"),r("7a23")),o=r("0f9a"),i=r("5a79"),a=r("4995"),u=r("6c02"),s=r("1b9e"),b=function(e){return Object(n["pushScopeId"])("data-v-666bc705"),e=e(),Object(n["popScopeId"])(),e},l={class:"box"},d=b((function(){return Object(n["createElementVNode"])("p",null,"切换帐号",-1)})),j={class:"box"},O=b((function(){return Object(n["createElementVNode"])("p",null,"帐号权限",-1)})),p={class:"box"},f=b((function(){return Object(n["createElementVNode"])("p",null,"鉴权指令（请对照代码查看）",-1)})),m=Object(n["createTextVNode"])("如果你有 permission.browse 权限则能看到这句话"),w=Object(n["createTextVNode"])("如果你有 permission.create 权限则能看到这句话"),V=Object(n["createTextVNode"])(" 如果你有 permission.browse 或 permission.create 权限则能看到这句话 "),x=Object(n["createTextVNode"])(" 如果你有 permission.browse 和 permission.create 权限则能看到这句话 "),N={class:"box"},h=b((function(){return Object(n["createElementVNode"])("p",null,"鉴权组件（请对照代码查看）",-1)})),C=Object(n["createTextVNode"])("你有 permission.create 权限"),v=Object(n["createTextVNode"])("你没有 permission.browse 权限"),_=Object(n["createTextVNode"])("你有 permission.create 权限"),T=Object(n["createTextVNode"])("你没有 permission.create 权限"),g=Object(n["createTextVNode"])("你有 permission.browse 或 permission.create 权限"),k=Object(n["createTextVNode"])("你没有 permission.browse 或 permission.create 权限"),E=Object(n["createTextVNode"])("你有 permission.browse 和 permission.create 权限"),y=Object(n["createTextVNode"])("你没有 permission.browse 和 permission.create 权限"),D={class:"box"},R=b((function(){return Object(n["createElementVNode"])("p",null,"鉴权函数（请对照代码查看）",-1)})),z=Object(n["createTextVNode"])("校验 permission.browse 权限"),I=Object(n["createTextVNode"])("校验 permission.create 权限"),S=Object(n["createTextVNode"])(" 校验 permission.browse 或 permission.create 权限 "),B=Object(n["createTextVNode"])(" 校验 permission.browse 和 permission.create 权限 "),J={setup:function(e){var t=Object(o["a"])(),r=Object(u["d"])(),b=t.token,J=t.roles,U=function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(c){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=i["a"].service({text:"切换权限中..."}),e.next=3,t.getToken({username:c,password:""});case 3:return e.next=5,Promise.all([t.getRoleList(),t.getUserInfo()]);case 5:return e.next=7,r.push({name:"Reload"});case 7:n.close();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),L=function(e){Object(s["a"])(e)?a["a"].success("校验通过"):a["a"].error("校验不通过")},P=function(e){Object(s["b"])(e)?a["a"].success("校验通过"):a["a"].error("校验不通过")};return function(e,t){var r=Object(n["resolveComponent"])("page-header"),c=Object(n["resolveComponent"])("el-radio-button"),o=Object(n["resolveComponent"])("el-radio-group"),i=Object(n["resolveComponent"])("el-tag"),a=Object(n["resolveComponent"])("el-space"),u=Object(n["resolveComponent"])("auth"),s=Object(n["resolveComponent"])("auth-all"),q=Object(n["resolveComponent"])("el-button"),A=Object(n["resolveComponent"])("page-main"),F=Object(n["resolveDirective"])("auth"),G=Object(n["resolveDirective"])("auth-all");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(r,{"no-icon":"",title:"权限验证"}),Object(n["createVNode"])(A,{style:{margin:"20px"}},{default:Object(n["withCtx"])((function(){return[Object(n["createElementVNode"])("div",l,[d,Object(n["createVNode"])(o,{modelValue:Object(n["unref"])(b),"onUpdate:modelValue":t[0]||(t[0]=function(e){return Object(n["isRef"])(b)?b.value=e:null}),onChange:U},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{label:"admin"}),Object(n["createVNode"])(c,{label:"editor"})]})),_:1},8,["modelValue"])]),Object(n["createElementVNode"])("div",j,[O,Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[Object(n["createTextVNode"])(Object(n["toDisplayString"])(Object(n["unref"])(J)),1)]})),_:1})]),Object(n["createElementVNode"])("div",p,[f,Object(n["createVNode"])(a,{wrap:""},{default:Object(n["withCtx"])((function(){return[Object(n["withDirectives"])(Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[m]})),_:1},512),[[F,"permission.browse"]]),Object(n["withDirectives"])(Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[w]})),_:1},512),[[F,"permission.create"]]),Object(n["withDirectives"])(Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[V]})),_:1},512),[[F,["permission.browse","permission.create"]]]),Object(n["withDirectives"])(Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[x]})),_:1},512),[[G,["permission.browse","permission.create"]]])]})),_:1})]),Object(n["createElementVNode"])("div",N,[h,Object(n["createVNode"])(a,{wrap:""},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(u,{value:"permission.browse"},{"no-auth":Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{type:"danger"},{default:Object(n["withCtx"])((function(){return[v]})),_:1})]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[C]})),_:1})]})),_:1}),Object(n["createVNode"])(u,{value:"permission.create"},{"no-auth":Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{type:"danger"},{default:Object(n["withCtx"])((function(){return[T]})),_:1})]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[_]})),_:1})]})),_:1}),Object(n["createVNode"])(u,{value:["permission.browse","permission.create"]},{"no-auth":Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{type:"danger"},{default:Object(n["withCtx"])((function(){return[k]})),_:1})]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[g]})),_:1})]})),_:1},8,["value"]),Object(n["createVNode"])(s,{value:["permission.browse","permission.create"]},{"no-auth":Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,{type:"danger"},{default:Object(n["withCtx"])((function(){return[y]})),_:1})]})),default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(i,null,{default:Object(n["withCtx"])((function(){return[E]})),_:1})]})),_:1},8,["value"])]})),_:1})]),Object(n["createElementVNode"])("div",D,[R,Object(n["createVNode"])(a,{wrap:""},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(q,{size:"small",onClick:t[1]||(t[1]=function(e){return L("permission.browse")})},{default:Object(n["withCtx"])((function(){return[z]})),_:1}),Object(n["createVNode"])(q,{size:"small",onClick:t[2]||(t[2]=function(e){return L("permission.create")})},{default:Object(n["withCtx"])((function(){return[I]})),_:1}),Object(n["createVNode"])(q,{size:"small",onClick:t[3]||(t[3]=function(e){return L(["permission.browse","permission.create"])})},{default:Object(n["withCtx"])((function(){return[S]})),_:1}),Object(n["createVNode"])(q,{size:"small",onClick:t[4]||(t[4]=function(e){return P(["permission.browse","permission.create"])})},{default:Object(n["withCtx"])((function(){return[B]})),_:1})]})),_:1})])]})),_:1})])}}},U=(r("d416"),r("6b0d")),L=r.n(U);const P=L()(J,[["__scopeId","data-v-666bc705"]]);t["default"]=P},d416:function(e,t,r){"use strict";r("7c40")}}]);