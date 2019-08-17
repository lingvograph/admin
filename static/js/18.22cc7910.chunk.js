(window["webpackJsonplingvograph-admin"]=window["webpackJsonplingvograph-admin"]||[]).push([[18],{296:function(e,t,a){"use strict";a.r(t),a.d(t,"Users",function(){return E});var r=a(0),n=a.n(r),c=a(176),o=a(371),s=a(311),l=a(312),i=a(329),u=a(373),b=a(330),d=a(349),m=a(374),p=a(81),f=a(301),g=a(122),v=a(347),O=a(66),h=a(331),j=a.n(h);const y=e=>{let t=e.user;const a="/users/".concat(t.uid),r=[t.first_name,t.last_name].filter(e=>!!e).join(" ")||t.name,s=t.avatar||Object(O.b)(t.email);return n.a.createElement("tr",{key:t.uid},n.a.createElement("td",null,n.a.createElement(c.a,{to:a},n.a.createElement("img",{className:"img-avatar",src:s,alt:t.email,width:35,height:35,style:{margin:"0 10px"}}),n.a.createElement("span",null,r))),n.a.createElement("td",null,t.email),n.a.createElement("td",null,t.registered_at?n.a.createElement(j.a,{date:t.registered_at,fromNow:!0}):null),n.a.createElement("td",null,t.role),n.a.createElement("td",null,n.a.createElement(c.a,{to:a},n.a.createElement(o.a,{color:(e=>{switch((e||"").toLowerCase()){case"active":return"success";case"inactive":return"secondary";case"pending":return"warning";case"banned":return"danger";default:return"primary"}})(t.status)},t.status))))},E=()=>{const e=Object(f.c)(p.i.list),t=e.result||{},a=t.items,r=void 0===a?[]:a,c=t.total,o=void 0===c?0:c,O=t.limit,h=void 0===O?p.a:O,j=t.page,E=void 0===j?1:j,w=e.pending?n.a.createElement("tr",null,n.a.createElement("td",{colSpan:5},n.a.createElement(g.a,null))):r.map((e,t)=>n.a.createElement(y,{key:t,user:e}));return n.a.createElement("div",{className:"animated fadeIn"},n.a.createElement(s.a,null,n.a.createElement(l.a,{xl:12},n.a.createElement(i.a,null,n.a.createElement(u.a,null,n.a.createElement("i",{className:"fa fa-align-justify"})," Users"),n.a.createElement(b.a,null,n.a.createElement(d.a,{responsive:!0,hover:!0},n.a.createElement("thead",null,n.a.createElement("tr",null,n.a.createElement("th",{scope:"col"},"name"),n.a.createElement("th",{scope:"col"},"email"),n.a.createElement("th",{scope:"col"},"registered"),n.a.createElement("th",{scope:"col"},"role"),n.a.createElement("th",{scope:"col"},"status"))),n.a.createElement("tbody",null,w))),n.a.createElement(m.a,{className:"flex-center"},n.a.createElement(v.a,{page:E,total:o,limit:h}))))))};t.default=E},301:function(e,t,a){"use strict";var r=a(45),n=a(117),c=a(19),o=a(0),s=a(119),l=a(15),i=a(306),u=a.n(i),b=a(16),d=a(81),m=a(47),p=a(303),f=a(48),g=a(120);const v="refresh";function O(e){Object(o.useEffect)(()=>{const t=()=>{e()};return window.addEventListener(v,t),()=>{window.removeEventListener(v,t)}},[e])}var h=a(66);function j(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function y(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?j(a,!0).forEach(function(t){Object(r.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):j(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}const E={started:!1,pending:!0,error:null,result:null,start:null,abort:null,abortController:null},w=(e,t)=>{switch(t.type){case"init":return E;case"ready":return y({},e,{start:t.start,abort:t.abort});case"start":return y({},e,{started:!0,abortController:t.abortController});case"result":return y({},e,{started:!1,pending:!1,result:t.result,abortController:null});case"error":return y({},e,{started:!1,pending:!1,error:t.error,abortController:null});case"abort":return y({},e,{started:!1,pending:!1,abortController:null});default:throw new Error("unexpected action type: ".concat(t.type))}},N=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.delay,r=void 0===a?0:a,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[];const s=Object(o.useReducer)(w,E),l=Object(n.a)(s,2),i=l[0],u=l[1],b=async function(){if(i.started)return;const t=new AbortController;u({type:"start",abortController:t});try{await Object(h.a)(r,t);for(var a=arguments.length,n=new Array(a),c=0;c<a;c++)n[c]=arguments[c];const s=await e(t,...n);return u({type:"result",result:s}),{result:s}}catch(o){return u({type:"error",error:o}),{error:o}}},d=()=>{i.abortController&&(i.abortController.abort(),u({type:"abort"}))};return Object(o.useEffect)(()=>(u({type:"ready",start:b,abort:d}),()=>{u({type:"init"})}),c),i};function P(e){Object(o.useEffect)(()=>{const t=()=>{e&&e.start&&e.start()},a=()=>{t()};return window.addEventListener(v,a),t(),()=>{window.removeEventListener(v,a),e&&e.abort&&e&&e.abort()}},[e&&e.start,e&&e.abort])}function C(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function k(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?C(a,!0).forEach(function(t){Object(r.a)(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):C(a).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}function T(e){const t=Object(s.c)(p.a).cache,a=Object(s.b)();return O(()=>a(Object(m.a)({key:e,value:void 0}))),r=>void 0!==r?(a(Object(m.a)({key:e,value:r})),r):t.get(e)}function x(){const e=Object(o.useState)(f.a.value),t=Object(n.a)(e,2),a=t[0],r=t[1];return Object(o.useEffect)(()=>f.a.subscribe(r),[]),a}function M(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.args,r=void 0===a?[]:a,n=t.norefresh,l=void 0!==n&&n,i=t.onResult,u=void 0===i?c.noop:i;const d=Object(o.useContext)(s.a);return function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];return d.runSaga(function*(){for(var t=arguments.length,a=new Array(t),r=0;r<t;r++)a[r]=arguments[r];const n=yield Object(b.a)(e,...a);return u&&u(n),l||window.dispatchEvent(new CustomEvent(v)),n},...r,...a)}}function S(){return Object(s.c)(p.c).currentUser||{}}function L(){return Object(s.c)(p.b).location}function U(e){const t=Object(s.b)();return a=>{let r=a.pathname,n=a.params;const c=(e?l.e:l.d)({pathname:r,search:n?u.a.stringify(n):void 0});t(c)}}function D(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:c.identity;const t=L(),a=Object(s.b)(),r=new URLSearchParams(t.search),n=e=>{a(Object(l.e)({pathname:t.pathname,search:e.toString()}))};return{location:t,dispatch:a,params:e(r),replaceParams:n,replaceParam(e,t){t?r.set(e,t):r.delete(e),n(r)}}}a.d(t,"a",function(){return T}),a.d(t,"i",function(){return x}),a.d(t,"g",function(){return M}),a.d(t,"b",function(){return S}),a.d(t,"d",function(){return L}),a.d(t,"e",function(){return U}),a.d(t,"h",function(){return D}),a.d(t,"c",function(){return R}),a.d(t,"f",function(){return O});const R=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:()=>({}),a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;const r=L(),n=N(async function(a){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};const c=d.f(r.search),o=t(new URLSearchParams(r.search)),s=Object(g.b)(r),l=s?s.params:{},i=await e(k({abortController:a},n,{},c,{},o,{},l));return k({},i,{},c)},{delay:a},[r]);return P(n),n}},303:function(e,t,a){"use strict";a.d(t,"c",function(){return n}),a.d(t,"a",function(){return c}),a.d(t,"d",function(){return o}),a.d(t,"b",function(){return s});a(82);var r=a(307);a(348);const n=Object(r.a)(e=>e.common.currentUser,e=>({currentUser:e})),c=Object(r.a)(e=>e.common.cache,e=>({cache:e})),o=Object(r.a)(e=>!!e.common.currentUser,e=>({isLoggedIn:e})),s=Object(r.a)(e=>e.router.location||window.location,e=>({location:e}))},347:function(e,t,a){"use strict";var r=a(0),n=a.n(r),c=a(84),o=a.n(c),s=a(119),l=a(371),i=a(4),u=a(8),b=a(1),d=a.n(b),m=a(14),p=a.n(m),f=a(5),g={active:d.a.bool,children:d.a.node,className:d.a.string,cssModule:d.a.object,disabled:d.a.bool,tag:f.l},v=function(e){var t=e.active,a=e.className,r=e.cssModule,c=e.disabled,o=e.tag,s=Object(u.a)(e,["active","className","cssModule","disabled","tag"]),l=Object(f.h)(p()(a,"page-item",{active:t,disabled:c}),r);return n.a.createElement(o,Object(i.a)({},s,{className:l}))};v.propTypes=g,v.defaultProps={tag:"li"};var O=v,h={"aria-label":d.a.string,children:d.a.node,className:d.a.string,cssModule:d.a.object,next:d.a.bool,previous:d.a.bool,first:d.a.bool,last:d.a.bool,tag:f.l},j=function(e){var t,a=e.className,r=e.cssModule,c=e.next,o=e.previous,s=e.first,l=e.last,b=e.tag,d=Object(u.a)(e,["className","cssModule","next","previous","first","last","tag"]),m=Object(f.h)(p()(a,"page-link"),r);o?t="Previous":c?t="Next":s?t="First":l&&(t="Last");var g,v=e["aria-label"]||t;o?g="\u2039":c?g="\u203a":s?g="\xab":l&&(g="\xbb");var O=e.children;return O&&Array.isArray(O)&&0===O.length&&(O=null),d.href||"a"!==b||(b="button"),(o||c||s||l)&&(O=[n.a.createElement("span",{"aria-hidden":"true",key:"caret"},O||g),n.a.createElement("span",{className:"sr-only",key:"sr"},v)]),n.a.createElement(b,Object(i.a)({},d,{className:m,"aria-label":v}),O)};j.propTypes=h,j.defaultProps={tag:"a"};var y=j,E={children:d.a.node,className:d.a.string,listClassName:d.a.string,cssModule:d.a.object,size:d.a.string,tag:f.l,listTag:f.l,"aria-label":d.a.string},w=function(e){var t,a=e.className,r=e.listClassName,c=e.cssModule,o=e.size,s=e.tag,l=e.listTag,b=e["aria-label"],d=Object(u.a)(e,["className","listClassName","cssModule","size","tag","listTag","aria-label"]),m=Object(f.h)(p()(a),c),g=Object(f.h)(p()(r,"pagination",((t={})["pagination-"+o]=!!o,t)),c);return n.a.createElement(s,{className:m,"aria-label":b},n.a.createElement(l,Object(i.a)({},d,{className:g})))};w.propTypes=E,w.defaultProps={tag:"nav",listTag:"ul","aria-label":"pagination"};var N=w,P=a(308),C=a(309);function k(e){return function t(a,r){switch(arguments.length){case 0:return t;case 1:return Object(C.a)(a)?t:Object(P.a)(function(t){return e(a,t)});default:return Object(C.a)(a)&&Object(C.a)(r)?t:Object(C.a)(a)?Object(P.a)(function(t){return e(t,r)}):Object(C.a)(r)?Object(P.a)(function(t){return e(a,t)}):e(a,r)}}}function T(e){return"[object Number]"===Object.prototype.toString.call(e)}var x=k(function(e,t){if(!T(e)||!T(t))throw new TypeError("Both arguments to range must be numbers");for(var a=[],r=e;r<t;)a.push(r),r+=1;return a}),M=a(15),S=a(301);t.a=e=>{let t=e.page,a=e.total,r=e.limit;const c=Math.ceil(a/r),i=function(e){let t=e.page,a=e.pageCount;const r=Object(s.b)(),n=Object(S.d)(),c=e=>{o()(e>=1&&e<=a,"invalid page");const t=new URLSearchParams(n.search);1===e?t.delete("page"):t.set("page",e),r(Object(M.d)({pathname:n.pathname,search:t.toString()}))};return{prev:()=>{if(t-1>=1)return c(t-1)},next:()=>{if(t+1<=a)return c(t+1)},go:c}}({page:t,total:a,limit:r,pageCount:c}),u=i.prev,b=i.next,d=i.go,m=n.a.createElement(l.a,{color:"info",className:"ml-2"},"Total: ",a);if(c<=1)return m;const p=Math.min(5,c),f=Math.max(1,t-p+1),g=x(f,f+p).map((e,a)=>n.a.createElement(O,{key:a,active:e===t},n.a.createElement(y,{tag:"button",onClick:()=>d(e)},e)));return n.a.createElement("div",{className:"flex-center"},n.a.createElement(N,null,n.a.createElement(O,{key:"prev"},n.a.createElement(y,{previous:!0,tag:"button",disabled:1===t,onClick:u})),g,n.a.createElement(O,{key:"next"},n.a.createElement(y,{next:!0,tag:"button",disabled:t===c,onClick:b}))),m)}},349:function(e,t,a){"use strict";var r=a(4),n=a(8),c=a(0),o=a.n(c),s=a(1),l=a.n(s),i=a(14),u=a.n(i),b=a(5),d={className:l.a.string,cssModule:l.a.object,size:l.a.string,bordered:l.a.bool,borderless:l.a.bool,striped:l.a.bool,dark:l.a.bool,hover:l.a.bool,responsive:l.a.oneOfType([l.a.bool,l.a.string]),tag:b.l,responsiveTag:b.l,innerRef:l.a.oneOfType([l.a.func,l.a.string,l.a.object])},m=function(e){var t=e.className,a=e.cssModule,c=e.size,s=e.bordered,l=e.borderless,i=e.striped,d=e.dark,m=e.hover,p=e.responsive,f=e.tag,g=e.responsiveTag,v=e.innerRef,O=Object(n.a)(e,["className","cssModule","size","bordered","borderless","striped","dark","hover","responsive","tag","responsiveTag","innerRef"]),h=Object(b.h)(u()(t,"table",!!c&&"table-"+c,!!s&&"table-bordered",!!l&&"table-borderless",!!i&&"table-striped",!!d&&"table-dark",!!m&&"table-hover"),a),j=o.a.createElement(f,Object(r.a)({},O,{ref:v,className:h}));if(p){var y=Object(b.h)(!0===p?"table-responsive":"table-responsive-"+p,a);return o.a.createElement(g,{className:y},j)}return j};m.propTypes=d,m.defaultProps={tag:"table",responsiveTag:"div"},t.a=m}}]);
//# sourceMappingURL=18.22cc7910.chunk.js.map