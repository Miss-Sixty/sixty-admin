import{b as h}from"./index.55ccc005.js";import{f as g,g as k,r as o,o as r,h as y,a as n,w as e,u as a,c as N,k as b,l as i,t as x,y as t}from"./vendor.444fda8e.js";const C=t(" \u4F7F\u7528\u63D2\u4EF6 "),w=t(" Push.js "),j=t(" \u6B64\u529F\u80FD\u53EA\u80FD\u5728\u6253\u5F00\u9875\u9762\u7684\u65F6\u5019\u4F7F\u7528\uFF0C\u5982\u679C\u60F3\u8981\u5B9E\u73B0\u5173\u95ED\u7F51\u9875\u7684\u60C5\u51B5\u4E0B\u63A8\u9001\u6D88\u606F\u5219\u9700\u8981\u7528\u5230 serviceWorker \u914D\u5408\u5B9E\u73B0\u3002 "),v=t(" \u5EFA\u8BAE\u5F00\u542F\u901A\u77E5\u6743\u9650\u4EE5\u53CA\u65F6\u83B7\u53D6\u540E\u53F0\u901A\u77E5\u3002 \u6253\u5F00\u65B9\u6CD5\uFF1A\u8BBE\u7F6E->\u9690\u79C1\u8BBE\u7F6E\u548C\u5B89\u5168\u6027->\u9009\u62E9\u6B64\u7F51\u7AD9->\u901A\u77E5->\u5141\u8BB8\u3002 \u5730\u5740\uFF1Achrome://settings/content "),B=i("p",{style:{"margin-top":"0"}},"\u8BF4\u660E\uFF1Adefault-\u672A\u83B7\u5F97\u6743\u9650 granted-\u5DF2\u83B7\u5F97\u6743\u9650 denied-\u5DF2\u62D2\u7EDD\u6743\u9650",-1),V={style:{"margin-top":"0"}},S=t("\u83B7\u53D6\u901A\u77E5"),T=t("\u6E05\u9664\u901A\u77E5"),W={setup(P){const _=g(),s=h(),l=k(()=>s.permissionType),p=()=>{s.notification(null,{body:"\u60A8\u521A\u521A\u70B9\u51FB\u4E86\u83B7\u53D6\u901A\u77E5\u3002"},function(){_.push({name:"Notice"}),window.focus()})};return(A,D)=>{const d=o("el-link"),u=o("page-header"),m=o("el-alert"),c=o("el-button"),f=o("page-main");return r(),y("div",null,[n(u,{"no-icon":"",title:"\u684C\u9762\u901A\u77E5"},{default:e(()=>[C,n(d,{type:"primary",href:"https://pushjs.org/",target:"_blank"},{default:e(()=>[w]),_:1}),j]),_:1}),a(l)==="denied"?(r(),N(m,{key:0,title:"\u65E0\u6D4F\u89C8\u5668\u901A\u77E5\u6743\u9650",type:"error"},{default:e(()=>[v]),_:1})):b("",!0),n(f,{style:{margin:"20px"}},{default:e(()=>[B,i("p",V,"\u5F53\u524D\u901A\u77E5\u6743\u9650\uFF1A"+x(a(s).permissionType),1),n(c,{onClick:p},{default:e(()=>[S]),_:1}),n(c,{onClick:a(s).clearNotification},{default:e(()=>[T]),_:1},8,["onClick"])]),_:1})])}}};export{W as default};
