(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7d4f119e"],{"464c":function(e,t,n){"use strict";n("dcfd")},"62e45":function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n("b775");function c(e){return a["a"].get("/mock/list",{params:e}).then((function(e){return e.data}))}},"7d48":function(e,t,n){"use strict";n.r(t);n("d3b7");var a=n("7a23"),c=n("62e45"),r=Object(a["withScopeId"])("data-v-f2edc8ee");Object(a["pushScopeId"])("data-v-f2edc8ee");var o={class:"watermark-content"},i={class:"page-main"},u={class:"page-main"};Object(a["popScopeId"])();var d={setup:function(e){var t=Object(a["shallowReactive"])({pageSize:10,total:0,currentPage:1,loading:!0,list:[]}),n=function(){return new Promise((function(e){setTimeout((function(){e({message:"更改成功！"})}),1e3)}))},d=function(){t.loading=!0,Object(c["a"])().then((function(e){console.log(e);var n=e.data,a=n.total,c=n.current_page,r=n.list;t.total=a,t.currentPage=c,t.list=r})).finally((function(){return t.loading=!1}))};return d(),function(e,c){var l=Object(a["resolveComponent"])("page-header"),s=Object(a["resolveComponent"])("el-table-column"),b=Object(a["resolveComponent"])("confirm-switch"),p=Object(a["resolveComponent"])("el-table"),f=Object(a["resolveComponent"])("watermark"),O=Object(a["resolveComponent"])("six-pagination"),g=Object(a["resolveDirective"])("loading");return Object(a["openBlock"])(),Object(a["createBlock"])("div",o,[Object(a["createVNode"])(l,{icon:"none","icon-text":"none",title:"页面水印",content:"给页面的某个区域加上水印。"}),Object(a["createVNode"])("div",i,[Object(a["createVNode"])(l,{icon:"none","icon-text":"none",title:"前置水印",content:"水印组件默认实现为前置水印，即设想水印会显示在内容的上方，zIndex 默认设置为 9，如果你不希望水印遮挡上层内容，可以调整该值到小于上层内容的 zIndex。"}),Object(a["createVNode"])(f,null,{default:r((function(){return[Object(a["withDirectives"])(Object(a["createVNode"])(p,{data:Object(a["unref"])(t).list},{default:r((function(){return[Object(a["createVNode"])(s,{prop:"date",label:"日期",width:"180",align:"center"}),Object(a["createVNode"])(s,{prop:"name",label:"姓名",width:"180",align:"center"}),Object(a["createVNode"])(s,{prop:"address",label:"禁用/启用",width:"180",align:"center"},{default:r((function(e){var t=e.row;return[Object(a["createVNode"])(b,{id:t.id,api:n,text:"确定要「".concat(t.status?"禁用":"启用","」该数据吗？"),status:t.status,onOnSuccess:function(e){return t.status=!t.status}},null,8,["id","text","status","onOnSuccess"])]})),_:1}),Object(a["createVNode"])(s,{prop:"address",label:"地址"})]})),_:1},8,["data"]),[[g,Object(a["unref"])(t).loading]])]})),_:1}),Object(a["createVNode"])(O,{pageSize:Object(a["unref"])(t).pageSize,"onUpdate:pageSize":c[1]||(c[1]=function(e){return Object(a["unref"])(t).pageSize=e}),currentPage:Object(a["unref"])(t).currentPage,"onUpdate:currentPage":c[2]||(c[2]=function(e){return Object(a["unref"])(t).currentPage=e}),total:Object(a["unref"])(t).total,onOnChange:d},null,8,["pageSize","currentPage","total"])]),Object(a["createVNode"])("div",u,[Object(a["createVNode"])(l,{icon:"none","icon-text":"none",title:"图片水印",content:"通过 image 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。"}),Object(a["createVNode"])(f,{height:"36",width:"115",image:"https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"},{default:r((function(){return[Object(a["withDirectives"])(Object(a["createVNode"])(p,{data:Object(a["unref"])(t).list},{default:r((function(){return[Object(a["createVNode"])(s,{prop:"date",label:"日期",width:"180",align:"center"}),Object(a["createVNode"])(s,{prop:"name",label:"姓名",width:"180",align:"center"}),Object(a["createVNode"])(s,{prop:"address",label:"禁用/启用",width:"180",align:"center"},{default:r((function(e){var t=e.row;return[Object(a["createVNode"])(b,{id:t.id,api:n,text:"确定要「".concat(t.status?"禁用":"启用","」该数据吗？"),status:t.status,onOnSuccess:function(e){return t.status=!t.status}},null,8,["id","text","status","onOnSuccess"])]})),_:1}),Object(a["createVNode"])(s,{prop:"address",label:"地址"})]})),_:1},8,["data"]),[[g,Object(a["unref"])(t).loading]])]})),_:1}),Object(a["createVNode"])(O,{pageSize:Object(a["unref"])(t).pageSize,"onUpdate:pageSize":c[3]||(c[3]=function(e){return Object(a["unref"])(t).pageSize=e}),currentPage:Object(a["unref"])(t).currentPage,"onUpdate:currentPage":c[4]||(c[4]=function(e){return Object(a["unref"])(t).currentPage=e}),total:Object(a["unref"])(t).total,onOnChange:d},null,8,["pageSize","currentPage","total"])])])}}};n("464c");d.__scopeId="data-v-f2edc8ee";t["default"]=d},dcfd:function(e,t,n){}}]);