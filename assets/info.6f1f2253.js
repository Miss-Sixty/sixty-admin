import{g as w,y as E,D as h,r as i,Q as I,K as S,u as e,o as m,i as p,a as o,w as s,F as B,aR as H,aB as M,l as x,M as V,m as c,t as u,V as z,aS as F}from"./vendor.4b0db8f4.js";import{f as R}from"./useForInData.6b9358e5.js";import{d as A,i as T}from"./index.fda62872.js";import{_ as j,a as K}from"./index.87f8ca46.js";const Q={key:0},$={style:{"text-align":"center"}},q={style:{"text-align":"center",color:"rgba(0, 0, 0, 0.5)"}},G={style:{"margin-right":"20px"}},J=["innerHTML"],O={setup(P){const v=w(),g=E(),y=K().fullScreen,t=h({loading:!1,info:{},id:null,delLoading:!1,createAdminId:null,is_operate:!1,isAjaxDone:!1}),n=h({title:"",name:"",content:"",date:""}),k=()=>{t.delLoading=!0,A({id:t.id}).then(a=>{z.success({title:"\u63D0\u793A",message:a.message}),v.push({name:"Notice"})}).finally(()=>t.delLoading=!1)};return(()=>{t.loading=!0,console.log(g.params),T(g.params).then(a=>{console.log(a),R(a.data,n,["content"]);const{content:f,name:l,id:r,is_operate:_}=a.data;n.name=l,t.id=r,t.is_operate=_;const d=F(f);console.log(d.getHtml()),n.content=d.getHtml()}).finally(()=>t.loading=!1)})(),(a,f)=>{const l=i("el-button"),r=i("router-link"),_=i("el-popconfirm"),d=i("refresh-button"),C=i("page-header"),D=i("page-main"),b=I("loading");return S((m(),p("div",null,[o(r,{custom:"",to:{name:"Notice"}},{default:s(({navigate:L})=>[o(C,{title:"\u516C\u544A\u8BE6\u60C5",onClick:L},{extra:s(()=>[e(t).id?(m(),p("div",Q,[e(t).is_operate?(m(),p(B,{key:0},[o(r,{custom:"",to:{name:"NoticeEdit",params:{id:e(t).id}}},{default:s(({navigate:N})=>[o(l,{disabled:e(t).delLoading,type:"warning",size:"small",icon:e(H),circle:"",onClick:N},null,8,["disabled","icon","onClick"])]),_:2},1032,["to"]),o(_,{title:"\u786E\u8BA4\u8981\u5220\u9664\u8BE5\u7BC7\u901A\u77E5\u516C\u544A\u5417\uFF1F",onConfirm:k},{reference:s(()=>[o(l,{loading:e(t).delLoading,size:"small",type:"danger",icon:e(M),circle:""},null,8,["loading","icon"])]),_:1})],64)):x("",!0),o(d,{content:"\u6700\u5927\u5316\u663E\u793A"},{default:s(()=>[o(l,{icon:e(V),size:"small",circle:"",onClick:e(y)},null,8,["icon","onClick"])]),_:1})])):x("",!0)]),_:2},1032,["onClick"])]),_:1}),o(D,{class:"content",style:{"max-width":"1000px",margin:"30px auto 0 auto"},padding:"30px 20px 20px"},{default:s(()=>[c("h2",$,u(e(n).title),1),c("p",q,[c("span",G,"\u53D1\u5E03\u4EBA\uFF1A"+u(e(n).name),1),c("span",null,"\u65F6\u95F4\uFF1A"+u(e(n).date),1)]),c("div",{innerHTML:e(n).content},null,8,J)]),_:1})])),[[b,e(t).loading]])}}};var ee=j(O,[["__scopeId","data-v-d4004a1e"]]);export{ee as default};
