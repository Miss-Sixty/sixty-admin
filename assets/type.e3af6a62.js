import{s as n}from"./index.55ccc005.js";function d(t){return n({url:"/mock/noticeType/list",params:t}).then(e=>e.data)}function a(t){return n({url:"/mock/noticeType/add",method:"post",data:t}).then(e=>e.data)}function c(t){return n({url:"/mock/noticeType/edit",method:"put",data:t}).then(e=>e.data)}function r(){return n({url:"/mock/noticeType/del",method:"delete"}).then(t=>t.data)}export{a,r as d,c as e,d as l};
