(window["webpackJsonplingvograph-admin"]=window["webpackJsonplingvograph-admin"]||[]).push([[19],{301:function(e,t,r){"use strict";var n=r(45),a=r(117),c=r(19),o=r(0),l=r(119),u=r(15),s=r(306),i=r.n(s),b=r(16),d=r(81),p=r(47),f=r(303),m=r(48),O=r(120);const j="refresh";function h(e){Object(o.useEffect)(()=>{const t=()=>{e()};return window.addEventListener(j,t),()=>{window.removeEventListener(j,t)}},[e])}var y=r(66);function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function v(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(r,!0).forEach(function(t){Object(n.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}const w={started:!1,pending:!0,error:null,result:null,start:null,abort:null,abortController:null},E=(e,t)=>{switch(t.type){case"init":return w;case"ready":return v({},e,{start:t.start,abort:t.abort});case"start":return v({},e,{started:!0,abortController:t.abortController});case"result":return v({},e,{started:!1,pending:!1,result:t.result,abortController:null});case"error":return v({},e,{started:!1,pending:!1,error:t.error,abortController:null});case"abort":return v({},e,{started:!1,pending:!1,abortController:null});default:throw new Error("unexpected action type: ".concat(t.type))}},P=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.delay,n=void 0===r?0:r,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const l=Object(o.useReducer)(E,w),u=Object(a.a)(l,2),s=u[0],i=u[1],b=async function(){if(s.started)return;const t=new AbortController;i({type:"start",abortController:t});try{await Object(y.a)(n,t);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];const l=await e(t,...a);return i({type:"result",result:l}),{result:l}}catch(o){return i({type:"error",error:o}),{error:o}}},d=()=>{s.abortController&&(s.abortController.abort(),i({type:"abort"}))};return Object(o.useEffect)(()=>(i({type:"ready",start:b,abort:d}),()=>{i({type:"init"})}),c),s};function C(e){Object(o.useEffect)(()=>{const t=()=>{e&&e.start&&e.start()},r=()=>{t()};return window.addEventListener(j,r),t(),()=>{window.removeEventListener(j,r),e&&e.abort&&e&&e.abort()}},[e&&e.start,e&&e.abort])}function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function k(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(r,!0).forEach(function(t){Object(n.a)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function D(e){const t=Object(l.c)(f.a).cache,r=Object(l.b)();return h(()=>r(Object(p.a)({key:e,value:void 0}))),n=>void 0!==n?(r(Object(p.a)({key:e,value:n})),n):t.get(e)}function L(){const e=Object(o.useState)(m.a.value),t=Object(a.a)(e,2),r=t[0],n=t[1];return Object(o.useEffect)(()=>m.a.subscribe(n),[]),r}function x(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=t.args,n=void 0===r?[]:r,a=t.norefresh,u=void 0!==a&&a,s=t.onResult,i=void 0===s?c.noop:s;const d=Object(o.useContext)(l.a);return function(){for(var t=arguments.length,r=new Array(t),a=0;a<t;a++)r[a]=arguments[a];return d.runSaga(function*(){for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];const a=yield Object(b.a)(e,...r);return i&&i(a),u||window.dispatchEvent(new CustomEvent(j)),a},...n,...r)}}function U(){return Object(l.c)(f.c).currentUser||{}}function R(){return Object(l.c)(f.b).location}function A(e){const t=Object(l.b)();return r=>{let n=r.pathname,a=r.params;const c=(e?u.e:u.d)({pathname:n,search:a?i.a.stringify(a):void 0});t(c)}}function z(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c.identity;const t=R(),r=Object(l.b)(),n=new URLSearchParams(t.search),a=e=>{r(Object(u.e)({pathname:t.pathname,search:e.toString()}))};return{location:t,dispatch:r,params:e(n),replaceParams:a,replaceParam(e,t){t?n.set(e,t):n.delete(e),a(n)}}}r.d(t,"a",function(){return D}),r.d(t,"i",function(){return L}),r.d(t,"g",function(){return x}),r.d(t,"b",function(){return U}),r.d(t,"d",function(){return R}),r.d(t,"e",function(){return A}),r.d(t,"h",function(){return z}),r.d(t,"c",function(){return N}),r.d(t,"f",function(){return h});const N=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>({}),r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const n=R(),a=P(async function(r){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const c=d.f(n.search),o=t(new URLSearchParams(n.search)),l=Object(O.b)(n),u=l?l.params:{},s=await e(k({abortController:r},a,{},c,{},o,{},u));return k({},s,{},c)},{delay:r},[n]);return C(a),a}},303:function(e,t,r){"use strict";r.d(t,"c",function(){return a}),r.d(t,"a",function(){return c}),r.d(t,"d",function(){return o}),r.d(t,"b",function(){return l});r(82);var n=r(307);r(348);const a=Object(n.a)(e=>e.common.currentUser,e=>({currentUser:e})),c=Object(n.a)(e=>e.common.cache,e=>({cache:e})),o=Object(n.a)(e=>!!e.common.currentUser,e=>({isLoggedIn:e})),l=Object(n.a)(e=>e.router.location||window.location,e=>({location:e}))},462:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r.n(n),c=r(54),o=r(327),l=r(370),u={items:[{name:"Dashboard",url:"/dashboard",icon:"icon-speedometer"},{title:!0,name:"Resources",wrapper:{element:"",attributes:{}}},{name:"Users",url:"/users"},{name:"Terms",url:"/terms"}]},s=r(120),i=r(118),b=r(119),d=r(303),p=r(301);var f=e=>{let t=e.component,r=e.render,n=Object(i.a)(e,["component","render"]);const o=Object(p.i)(),l=Object(b.c)(d.d).isLoggedIn;return a.a.createElement(c.b,Object.assign({render:e=>{if(o)return l?r?r(e):a.a.createElement(t,e):null;return a.a.createElement(c.a,{to:{pathname:"/login"}})}},n))},m=r(122),O=r(63);const j=a.a.lazy(()=>r.e(21).then(r.bind(null,461))),h=a.a.lazy(()=>r.e(22).then(r.bind(null,460))),y=a.a.lazy(()=>r.e(16).then(r.bind(null,463)));var g=e=>{const t=Object(p.g)(O.b);return a.a.createElement("div",{className:"app"},a.a.createElement(l.e,{fixed:!0},a.a.createElement(n.Suspense,{fallback:Object(m.a)()},a.a.createElement(y,{onLogout:e=>(e=>{e.preventDefault(),t()})(e)}))),a.a.createElement("div",{className:"app-body"},a.a.createElement(l.g,{fixed:!0,display:"lg"},a.a.createElement(l.j,null),a.a.createElement(l.i,null),a.a.createElement(n.Suspense,null,a.a.createElement(l.l,Object.assign({navConfig:u},e))),a.a.createElement(l.h,null),a.a.createElement(l.k,null)),a.a.createElement("main",{className:"main"},a.a.createElement(l.c,{appRoutes:s.a}),a.a.createElement(o.a,{fluid:!0},a.a.createElement(n.Suspense,{fallback:Object(m.a)()},a.a.createElement(c.d,null,s.a.map((e,t)=>e.component?a.a.createElement(f,{key:t,path:e.path,exact:e.exact,name:e.name,render:t=>a.a.createElement(e.component,t)}):null),a.a.createElement(c.a,{from:"/",to:"/dashboard"}))))),a.a.createElement(l.a,{fixed:!0},a.a.createElement(n.Suspense,{fallback:Object(m.a)()},a.a.createElement(j,null)))),a.a.createElement(l.d,null,a.a.createElement(n.Suspense,{fallback:Object(m.a)()},a.a.createElement(h,null))))};t.default=g}}]);
//# sourceMappingURL=19.1c4c2b8b.chunk.js.map