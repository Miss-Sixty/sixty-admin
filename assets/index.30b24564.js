import{_ as $,a as B,c as E,f as N}from"./index.d934d21b.js";import{f as U,r as a,O as x,o as j,h as L,a as s,w as e,l as i,u as C,au as T,y as o,t as G,I as u,C as M,D as O,Q as P,G as m}from"./vendor.ac8c9492.js";const c=d=>(M("data-v-6123cb53"),d=d(),O(),d),Q={class:"box"},q=c(()=>i("p",null,"\u5207\u6362\u5E10\u53F7",-1)),F={class:"box"},H=c(()=>i("p",null,"\u5E10\u53F7\u6743\u9650",-1)),J={class:"box"},K=c(()=>i("p",null,"\u9274\u6743\u6307\u4EE4\uFF08\u8BF7\u5BF9\u7167\u4EE3\u7801\u67E5\u770B\uFF09",-1)),W=o("\u5982\u679C\u4F60\u6709 permission.browse \u6743\u9650\u5219\u80FD\u770B\u5230\u8FD9\u53E5\u8BDD"),X=o("\u5982\u679C\u4F60\u6709 permission.create \u6743\u9650\u5219\u80FD\u770B\u5230\u8FD9\u53E5\u8BDD"),Y=o(" \u5982\u679C\u4F60\u6709 permission.browse \u6216 permission.create \u6743\u9650\u5219\u80FD\u770B\u5230\u8FD9\u53E5\u8BDD "),Z=o(" \u5982\u679C\u4F60\u6709 permission.browse \u548C permission.create \u6743\u9650\u5219\u80FD\u770B\u5230\u8FD9\u53E5\u8BDD "),ee={class:"box"},se=c(()=>i("p",null,"\u9274\u6743\u7EC4\u4EF6\uFF08\u8BF7\u5BF9\u7167\u4EE3\u7801\u67E5\u770B\uFF09",-1)),oe=o("\u4F60\u6709 permission.create \u6743\u9650"),te=o("\u4F60\u6CA1\u6709 permission.browse \u6743\u9650"),ne=o("\u4F60\u6709 permission.create \u6743\u9650"),ie=o("\u4F60\u6CA1\u6709 permission.create \u6743\u9650"),ae=o("\u4F60\u6709 permission.browse \u6216 permission.create \u6743\u9650"),re=o("\u4F60\u6CA1\u6709 permission.browse \u6216 permission.create \u6743\u9650"),le=o("\u4F60\u6709 permission.browse \u548C permission.create \u6743\u9650"),_e=o("\u4F60\u6CA1\u6709 permission.browse \u548C permission.create \u6743\u9650"),ce={class:"box"},de=c(()=>i("p",null,"\u9274\u6743\u51FD\u6570\uFF08\u8BF7\u5BF9\u7167\u4EE3\u7801\u67E5\u770B\uFF09",-1)),pe=o("\u6821\u9A8C permission.browse \u6743\u9650"),ue=o("\u6821\u9A8C permission.create \u6743\u9650"),me=o(" \u6821\u9A8C permission.browse \u6216 permission.create \u6743\u9650 "),he=o(" \u6821\u9A8C permission.browse \u548C permission.create \u6743\u9650 "),fe={setup(d){const l=B(),k=U(),h=l.token,y=l.roles,I=async r=>{let n=P.service({text:"\u5207\u6362\u6743\u9650\u4E2D..."});await l.getToken({username:r,password:""}),await Promise.all([l.getRoleList(),l.getUserInfo()]),await k.push({name:"Reload"}),n.close()},f=r=>{E(r)?m.success("\u6821\u9A8C\u901A\u8FC7"):m.error("\u6821\u9A8C\u4E0D\u901A\u8FC7")},S=r=>{N(r)?m.success("\u6821\u9A8C\u901A\u8FC7"):m.error("\u6821\u9A8C\u4E0D\u901A\u8FC7")};return(r,n)=>{const V=a("page-header"),g=a("el-radio-button"),z=a("el-radio-group"),t=a("el-tag"),b=a("el-space"),v=a("auth"),A=a("auth-all"),p=a("el-button"),D=a("page-main"),w=x("auth"),R=x("auth-all");return j(),L("div",null,[s(V,{"no-icon":"",title:"\u6743\u9650\u9A8C\u8BC1"}),s(D,{style:{margin:"20px"}},{default:e(()=>[i("div",Q,[q,s(z,{modelValue:C(h),"onUpdate:modelValue":n[0]||(n[0]=_=>T(h)?h.value=_:null),onChange:I},{default:e(()=>[s(g,{label:"admin"}),s(g,{label:"editor"})]),_:1},8,["modelValue"])]),i("div",F,[H,s(t,null,{default:e(()=>[o(G(C(y)),1)]),_:1})]),i("div",J,[K,s(b,{wrap:""},{default:e(()=>[u(s(t,null,{default:e(()=>[W]),_:1},512),[[w,"permission.browse"]]),u(s(t,null,{default:e(()=>[X]),_:1},512),[[w,"permission.create"]]),u(s(t,null,{default:e(()=>[Y]),_:1},512),[[w,["permission.browse","permission.create"]]]),u(s(t,null,{default:e(()=>[Z]),_:1},512),[[R,["permission.browse","permission.create"]]])]),_:1})]),i("div",ee,[se,s(b,{wrap:""},{default:e(()=>[s(v,{value:"permission.browse"},{"no-auth":e(()=>[s(t,{type:"danger"},{default:e(()=>[te]),_:1})]),default:e(()=>[s(t,null,{default:e(()=>[oe]),_:1})]),_:1}),s(v,{value:"permission.create"},{"no-auth":e(()=>[s(t,{type:"danger"},{default:e(()=>[ie]),_:1})]),default:e(()=>[s(t,null,{default:e(()=>[ne]),_:1})]),_:1}),s(v,{value:["permission.browse","permission.create"]},{"no-auth":e(()=>[s(t,{type:"danger"},{default:e(()=>[re]),_:1})]),default:e(()=>[s(t,null,{default:e(()=>[ae]),_:1})]),_:1},8,["value"]),s(A,{value:["permission.browse","permission.create"]},{"no-auth":e(()=>[s(t,{type:"danger"},{default:e(()=>[_e]),_:1})]),default:e(()=>[s(t,null,{default:e(()=>[le]),_:1})]),_:1},8,["value"])]),_:1})]),i("div",ce,[de,s(b,{wrap:""},{default:e(()=>[s(p,{size:"small",onClick:n[1]||(n[1]=_=>f("permission.browse"))},{default:e(()=>[pe]),_:1}),s(p,{size:"small",onClick:n[2]||(n[2]=_=>f("permission.create"))},{default:e(()=>[ue]),_:1}),s(p,{size:"small",onClick:n[3]||(n[3]=_=>f(["permission.browse","permission.create"]))},{default:e(()=>[me]),_:1}),s(p,{size:"small",onClick:n[4]||(n[4]=_=>S(["permission.browse","permission.create"]))},{default:e(()=>[he]),_:1})]),_:1})])]),_:1})])}}};var we=$(fe,[["__scopeId","data-v-6123cb53"]]);export{we as default};
