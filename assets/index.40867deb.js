import{s as n}from"./index.36f0d282.js";function d(t){return n({url:"/mock/notice/list",params:t}).then(e=>e.data)}function i(t){return n({url:"/mock/notice/add",method:"post",data:t}).then(e=>e.data)}function a(t){return n({url:"/mock/notice/edit",method:"put",data:t}).then(e=>e.data)}function r(){return n({url:"/mock/notice/del",method:"delete"}).then(t=>t.data)}function c(){return n({url:"/mock/notice/info"}).then(t=>t.data)}export{i as a,r as d,a as e,c as i,d as l};
