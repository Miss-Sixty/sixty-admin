import{u}from"./useFormValid.218cf5b6.js";import{r as d}from"./index.dfa958ae.js";import{U as f,Q as l}from"./vendor.283d6186.js";function y(e,a){const{validForm:n}=u(e);async function o(r,t={},s={},i="\u65B0\u589E"){try{await n(),s.loading=!0;const m=await r(t);if(f.success({title:"\u63D0\u793A",message:m.message}),!a)return;setTimeout(async()=>{await l.confirm(`${i}\u6210\u529F\uFF0C\u662F\u5426\u9000\u51FA${i}\u9875\uFF1F`,"\u63D0\u793A",{type:"warning"}),d.push({name:a})},500)}finally{s.loading=!1}}return o}export{y as u};
