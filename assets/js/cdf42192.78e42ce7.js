"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[6240],{84:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var r=n(3289);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),u=i,g=d["".concat(l,".").concat(u)]||d[u]||m[u]||o;return n?r.createElement(g,a(a({ref:t},p),{},{components:n})):r.createElement(g,a({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,a[1]=s;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},2857:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(4715),i=(n(3289),n(84));const o={title:"ActionDragOptions",toc_max_heading_level:4},a="ActionDragOptions <s generated />",s={unversionedId:"api/client/python/classes/action-drag-options",id:"api/client/python/classes/action-drag-options",title:"ActionDragOptions",description:"Properties",source:"@site/docs/api/client/python/classes/action-drag-options.mdx",sourceDirName:"api/client/python/classes",slug:"/api/client/python/classes/action-drag-options",permalink:"/gamium/api/client/python/classes/action-drag-options",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/python/classes/action-drag-options.mdx",tags:[],version:"current",frontMatter:{title:"ActionDragOptions",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"ActionClickOptions",permalink:"/gamium/api/client/python/classes/action-click-options"},next:{title:"ActionMoveOptions",permalink:"/gamium/api/client/python/classes/action-move-options"}},l={},c=[{value:"Properties <s generated />",id:"properties-",level:2},{value:"duration_ms <code>int</code> <s generated />",id:"duration_ms-int-",level:4},{value:"interval_ms <code>int</code> <s generated />",id:"interval_ms-int-",level:4}],p={toc:c},d="wrapper";function m(e){let{components:t,...n}=e;return(0,i.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"actiondragoptions-"},"ActionDragOptions ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h2",{id:"properties-"},"Properties ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("h4",{id:"duration_ms-int-"},"duration_ms ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,i.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Specifies the overall drag duration miliseconds. The default is 300.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h4",{id:"interval_ms-int-"},"interval_ms ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,i.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"When dragging, I send the mouse move several times by dividing it into small pieces. Specifies the interval milliseconds for each mouse move event. The default is 60.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}))}m.isMDXComponent=!0}}]);