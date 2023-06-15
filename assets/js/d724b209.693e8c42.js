"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[7882],{84:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(3289);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),p=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=p(e.components);return n.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=p(r),m=i,h=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return r?n.createElement(h,o(o({ref:t},c),{},{components:r})):n.createElement(h,o({ref:t},c))}));function h(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:i,o[1]=s;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},7734:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>p});var n=r(4715),i=(r(3289),r(84));const a={title:"WaitOptions",toc_max_heading_level:4},o="WaitOptions <s generated />",s={unversionedId:"api/client/python/classes/wait-options",id:"api/client/python/classes/wait-options",title:"WaitOptions",description:"Properties",source:"@site/docs/api/client/python/classes/wait-options.mdx",sourceDirName:"api/client/python/classes",slug:"/api/client/python/classes/wait-options",permalink:"/api/client/python/classes/wait-options",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/python/classes/wait-options.mdx",tags:[],version:"current",frontMatter:{title:"WaitOptions",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"Vector4",permalink:"/api/client/python/classes/vector4"}},l={},p=[{value:"Properties <s generated />",id:"properties-",level:2},{value:"timeout_ms <code>int</code> <s generated />",id:"timeout_ms-int-",level:4},{value:"message <code>str</code> <s generated />",id:"message-str-",level:4},{value:"interval_ms <code>int</code> <s generated />",id:"interval_ms-int-",level:4},{value:"ignore_error <code>bool</code> <s generated />",id:"ignore_error-bool-",level:4}],c={toc:p},d="wrapper";function u(e){let{components:t,...r}=e;return(0,i.kt)(d,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"waitoptions-"},"WaitOptions ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h2",{id:"properties-"},"Properties ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("h4",{id:"timeout_ms-int-"},"timeout_ms ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,i.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Maximum time milliseconds to try until successful. The default is 5000.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h4",{id:"message-str-"},"message ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,i.kt)("inlineCode",{parentName:"a"},"str"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"This is a message that will be displayed together in the event of an error.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h4",{id:"interval_ms-int-"},"interval_ms ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,i.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Interval milliseconds for retry attempts. The default is 100.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}),(0,i.kt)("h4",{id:"ignore_error-bool-"},"ignore_error ",(0,i.kt)("a",{parentName:"h4",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#boolean-values"},(0,i.kt)("inlineCode",{parentName:"a"},"bool"))," ",(0,i.kt)("s",{generated:!0})),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Whether to ignore errors. The default is true.")),(0,i.kt)("hr",{class:"solid"}),"  ",(0,i.kt)("s",{generated:!0}))}u.isMDXComponent=!0}}]);