(window["webpackJsonplingvograph-admin"]=window["webpackJsonplingvograph-admin"]||[]).push([[21],{443:function(e,a){var t=NaN,s="[object Symbol]",r=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,n=/^0b[01]+$/i,c=/^0o[0-7]+$/i,o=parseInt,i=Object.prototype.toString;function m(e){var a=typeof e;return!!e&&("object"==a||"function"==a)}e.exports=function(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&i.call(e)==s}(e))return t;if(m(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=m(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var u=n.test(e);return u||c.test(e)?o(e.slice(2),u?2:8):l.test(e)?t:+e}},461:function(e,a,t){"use strict";t.r(a);var s=t(118),r=t(0),l=t.n(r),n=t(453),c=t(451),o=t(452),i=t(4),m=t(18),u=t(125),b=t(1),p=t.n(b),d=t(14),v=t.n(d),g=l.a.createContext({}),f=t(5),E={tag:f.l,activeTab:p.a.any,className:p.a.string,cssModule:p.a.object},N=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={activeTab:t.props.activeTab},t}return Object(m.a)(a,e),a.getDerivedStateFromProps=function(e,a){return a.activeTab!==e.activeTab?{activeTab:e.activeTab}:null},a.prototype.render=function(){var e=this.props,a=e.className,t=e.cssModule,s=e.tag,r=Object(f.i)(this.props,Object.keys(E)),n=Object(f.h)(v()("tab-content",a),t);return l.a.createElement(g.Provider,{value:{activeTabId:this.state.activeTab}},l.a.createElement(s,Object(i.a)({},r,{className:n})))},a}(r.Component);Object(u.polyfill)(N);var h=N;N.propTypes=E,N.defaultProps={tag:"div"};var y=t(8),j={tag:f.l,className:p.a.string,cssModule:p.a.object,tabId:p.a.any};function x(e){var a=e.className,t=e.cssModule,s=e.tabId,r=e.tag,n=Object(y.a)(e,["className","cssModule","tabId","tag"]),c=function(e){return Object(f.h)(v()("tab-pane",a,{active:s===e}),t)};return l.a.createElement(g.Consumer,null,function(e){var a=e.activeTabId;return l.a.createElement(r,Object(i.a)({},n,{className:c(a)}))})}x.propTypes=j,x.defaultProps={tag:"div"};var T=t(443),O=t.n(T),C={children:p.a.node,bar:p.a.bool,multi:p.a.bool,tag:f.l,value:p.a.oneOfType([p.a.string,p.a.number]),max:p.a.oneOfType([p.a.string,p.a.number]),animated:p.a.bool,striped:p.a.bool,color:p.a.string,className:p.a.string,barClassName:p.a.string,cssModule:p.a.object},M=function(e){var a=e.children,t=e.className,s=e.barClassName,r=e.cssModule,n=e.value,c=e.max,o=e.animated,m=e.striped,u=e.color,b=e.bar,p=e.multi,d=e.tag,g=Object(y.a)(e,["children","className","barClassName","cssModule","value","max","animated","striped","color","bar","multi","tag"]),E=O()(n)/O()(c)*100,N=Object(f.h)(v()(t,"progress"),r),h=Object(f.h)(v()("progress-bar",b&&t||s,o?"progress-bar-animated":null,u?"bg-"+u:null,m||o?"progress-bar-striped":null),r),j=p?a:l.a.createElement("div",{className:h,style:{width:E+"%"},role:"progressbar","aria-valuenow":n,"aria-valuemin":"0","aria-valuemax":c,children:a});return b?j:l.a.createElement(d,Object(i.a)({},g,{className:N,children:j}))};M.propTypes=C,M.defaultProps={tag:"div",value:0,max:100};var w=M;class S extends r.Component{constructor(e){super(e),this.toggle=this.toggle.bind(this),this.state={activeTab:"1"}}toggle(e){this.state.activeTab!==e&&this.setState({activeTab:e})}render(){const e=this.props;e.children,Object(s.a)(e,["children"]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(n.a,{tabs:!0},l.a.createElement(c.a,null,l.a.createElement(o.a,{className:v()({active:"1"===this.state.activeTab}),onClick:()=>{this.toggle("1")}},l.a.createElement("i",{className:"icon-settings"})))),l.a.createElement(h,{activeTab:this.state.activeTab},l.a.createElement(x,{tabId:"1",className:"p-3"},l.a.createElement("h6",null,"System Utilization"),l.a.createElement("div",{className:"text-uppercase mb-1 mt-4"},l.a.createElement("small",null,l.a.createElement("b",null,"CPU Usage"))),l.a.createElement(w,{className:"progress-xs",color:"info",value:"25"}),l.a.createElement("small",{className:"text-muted"},"348 Processes. 1/4 Cores."),l.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},l.a.createElement("small",null,l.a.createElement("b",null,"Memory Usage"))),l.a.createElement(w,{className:"progress-xs",color:"warning",value:"70"}),l.a.createElement("small",{className:"text-muted"},"11444GB/16384MB"),l.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},l.a.createElement("small",null,l.a.createElement("b",null,"SSD 1 Usage"))),l.a.createElement(w,{className:"progress-xs",color:"danger",value:"95"}),l.a.createElement("small",{className:"text-muted"},"243GB/256GB"),l.a.createElement("div",{className:"text-uppercase mb-1 mt-2"},l.a.createElement("small",null,l.a.createElement("b",null,"SSD 2 Usage"))),l.a.createElement(w,{className:"progress-xs",color:"success",value:"10"}),l.a.createElement("small",{className:"text-muted"},"25GB/256GB"))))}}S.defaultProps={};a.default=S}}]);
//# sourceMappingURL=21.a1ddd5e6.chunk.js.map