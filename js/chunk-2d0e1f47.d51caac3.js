(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e1f47"],{"7d48":function(e,t,a){"use strict";a.r(t);var n=a("7a23"),o={setup:function(e){var t=[{date:"2016-05-02",name:"王小虎",address:"上海市普陀区金沙江路 1518 弄"},{date:"2016-05-04",name:"王小虎",address:"上海市普陀区金沙江路 1517 弄"},{date:"2016-05-01",name:"王小虎",address:"上海市普陀区金沙江路 1519 弄"},{date:"2016-05-03",name:"王小虎",address:"上海市普陀区金沙江路 1516 弄"}];return function(e,a){var o=Object(n["resolveComponent"])("page-header"),c=Object(n["resolveComponent"])("el-alert"),r=Object(n["resolveComponent"])("el-table-column"),d=Object(n["resolveComponent"])("el-table"),l=Object(n["resolveComponent"])("watermark"),b=Object(n["resolveComponent"])("page-main");return Object(n["openBlock"])(),Object(n["createElementBlock"])("div",null,[Object(n["createVNode"])(o,{"no-icon":"",title:"页面水印",content:"给页面的某个区域加上水印。"}),Object(n["createVNode"])(b,{title:"前置水印",style:{margin:"20px"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{style:{"margin-bottom":"20px"},title:"水印组件默认实现为前置水印，即设想水印会显示在内容的上方，zIndex 默认设置为\n        9，如果你不希望水印遮挡上层内容，可以调整该值到小于上层内容的 zIndex。",type:"warning",closable:!1}),Object(n["createVNode"])(l,null,{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(d,{data:t},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(r,{prop:"date",label:"日期",width:"180"}),Object(n["createVNode"])(r,{prop:"name",label:"姓名",width:"180"}),Object(n["createVNode"])(r,{prop:"address",label:"地址"})]})),_:1})]})),_:1})]})),_:1}),Object(n["createVNode"])(b,{title:"图片水印",style:{margin:"20px"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(c,{style:{"margin-bottom":"20px"},title:"通过 image 指定图片地址。为保证图片高清且不被拉伸，请传入水印图片的宽高 width 和 height, 并上传至少两倍的宽高的 logo 图片地址。\n     ",type:"warning",closable:!1}),Object(n["createVNode"])(l,{height:"36",width:"115",image:"https://gw.alipayobjects.com/zos/bmw-prod/59a18171-ae17-4fc5-93a0-2645f64a3aca.svg"},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(d,{data:t,style:{width:"100%"}},{default:Object(n["withCtx"])((function(){return[Object(n["createVNode"])(r,{prop:"date",label:"日期",width:"180"}),Object(n["createVNode"])(r,{prop:"name",label:"姓名",width:"180"}),Object(n["createVNode"])(r,{prop:"address",label:"地址"})]})),_:1})]})),_:1})]})),_:1})])}}};const c=o;t["default"]=c}}]);