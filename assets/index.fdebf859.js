var B=Object.defineProperty,F=Object.defineProperties;var q=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var E=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var y=(o,t,e)=>t in o?B(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,b=(o,t)=>{for(var e in t||(t={}))E.call(t,e)&&y(o,e,t[e]);if(g)for(var e of g(t))R.call(t,e)&&y(o,e,t[e]);return o},h=(o,t)=>F(o,q(t));import{m as I,C,q as O,r as i,P as S,J as H,u as s,o as J,h as P,a,w as l,y as k}from"./vendor.444fda8e.js";import{e as x,a as U}from"./type.c74ddb6d.js";import{f as z}from"./useForInData.6b9358e5.js";import{u as G}from"./useAddOrEditSubmit.e0b3fa1f.js";import"./index.6ff1a1dd.js";import"./useFormValid.218cf5b6.js";const K=k("\u53D6\u6D88"),L=k("\u786E\u8BA4\u63D0\u4EA4"),te={setup(o){const t=I(),e=C({loading:!1,pageTitle:{add:"\u65B0\u589E\u7C7B\u578B",edit:"\u7F16\u8F91\u7C7B\u578B"},type:"add",id:null}),p=O(),u=G(p,"NoticeType"),r=C({title:""}),v=async()=>{console.log(x);try{e.type==="add"?u(U,r,e):u(x,h(b({},r),{id:e.id}),e,"\u4FEE\u6539")}catch(d){console.log(d)}};return(()=>{const{params:d,query:c,name:m}=t;if(console.log(d,c,m),m==="NoticeTypeAdd")return e.type="add";e.type="edit",e.id=d.id,z(c,r)})(),(d,c)=>{const m=i("page-header"),_=i("router-link"),T=i("el-input"),j=i("el-form-item"),N=i("el-form"),f=i("el-button"),V=i("FixedActionBar"),w=i("page-main"),A=S("loading");return H((J(),P("div",null,[a(_,{custom:"",to:{name:"NoticeType"}},{default:l(({navigate:n})=>[a(m,{title:s(e).pageTitle[s(e).type],onClick:n},null,8,["title","onClick"])]),_:1}),a(w,{style:{margin:"20px"}},{default:l(()=>[a(N,{ref:(n,D)=>{D.formRef=n,p.value=n},model:s(r),style:{margin:"0 auto",width:"60%"},"label-width":"80px"},{default:l(()=>[a(j,{label:"\u7C7B\u578B\u540D\u79F0",prop:"title",rules:{required:!0,message:"\u7C7B\u578B\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A",trigger:"blur"}},{default:l(()=>[a(T,{modelValue:s(r).title,"onUpdate:modelValue":c[0]||(c[0]=n=>s(r).title=n),clearable:"",placeholder:"\u8BF7\u8F93\u5165\u7C7B\u578B\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),a(V,{style:{"text-align":"center"}},{default:l(()=>[a(_,{custom:"",to:{name:"NoticeType"}},{default:l(({navigate:n})=>[a(f,{onClick:n},{default:l(()=>[K]),_:2},1032,["onClick"])]),_:1}),a(f,{type:"primary",onClick:v},{default:l(()=>[L]),_:1})]),_:1})]),_:1})],512)),[[A,s(e).loading]])}}};export{te as default};
