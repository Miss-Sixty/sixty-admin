import{al as n}from"./index.f6fd78f5.js";function a(t){return n({url:"/mock/notice/list",params:t}).then(e=>e.data)}function d(t){return n({url:"/mock/notice/add",method:"post",data:t}).then(e=>e.data)}function i(t){return n({url:"/mock/notice/edit",method:"put",data:t}).then(e=>e.data)}function r(){return n({url:"/mock/notice/del",method:"delete"}).then(t=>t.data)}function c(){return n({url:"/mock/notice/info"}).then(t=>t.data)}export{d as a,r as d,i as e,c as i,a as l};
