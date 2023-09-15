"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[9640],{84:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>g});var n=r(3289);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),s=u(r),d=o,g=s["".concat(c,".").concat(d)]||s[d]||m[d]||i;return r?n.createElement(g,a(a({ref:t},p),{},{components:r})):n.createElement(g,a({ref:t},p))}));function g(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2605:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=r(4715),o=(r(3289),r(84));const i={sidebar_position:1,toc_max_heading_level:4,title:"Source Code Organization"},a="Source Code Organization",l={unversionedId:"docs/contributing/source-code-organization",id:"docs/contributing/source-code-organization",title:"Source Code Organization",description:"A quick look at how the gamium repository is structured.",source:"@site/docs/docs/contributing/source-code-organization.mdx",sourceDirName:"docs/contributing",slug:"/docs/contributing/source-code-organization",permalink:"/docs/contributing/source-code-organization",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/contributing/source-code-organization.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,toc_max_heading_level:4,title:"Source Code Organization"},sidebar:"docsSidebar",previous:{title:"Trigger Remote Procedure Call",permalink:"/docs/client/rpc"},next:{title:"Protocol Development",permalink:"/docs/contributing/protocol-development"}},c={},u=[{value:"Directory tree",id:"directory-tree",level:4}],p={toc:u},s="wrapper";function m(e){let{components:t,...r}=e;return(0,o.kt)(s,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"source-code-organization"},"Source Code Organization"),(0,o.kt)("p",null,"A quick look at how the gamium repository is structured."),(0,o.kt)("h4",{id:"directory-tree"},"Directory tree"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"client"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This is where client libraries for controlling the Gamium Engine are created."),(0,o.kt)("li",{parentName:"ul"},"For details, please refer to the documentation for each language.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./client-development/typescript"},"TypeScript")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./client-development/python"},"Python")))))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"docs"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This is where the documents to create the current page ",(0,o.kt)("a",{parentName:"li",href:"https://gamium.dogutech.io/"},"https://gamium.dogutech.io/")," are written. Created via ",(0,o.kt)("a",{parentName:"li",href:"https://docusaurus.io/"},"Docusaurus"),"."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"engine"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Gamium Engine codes applied to various game engines are located."),(0,o.kt)("li",{parentName:"ul"},"For details, please refer to the documentation for each engine.",(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"./engine-development/unity"},"Unity")))))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"protocol"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This is where the protocol for communication between the Gamium Client and the Gamium Engine is defined.. This protocol was defined using ",(0,o.kt)("a",{parentName:"li",href:"https://google.github.io/flatbuffers/"},"FlatBuffers"),". For more information, please refer to ",(0,o.kt)("a",{parentName:"li",href:"./protocol-development"},"Protocol Development"),"."))),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"utils"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"This is where various functions used during development are gathered. For example, ",(0,o.kt)("inlineCode",{parentName:"li"},"docs-api-gen")," is used to generate API documentation for the Gamium Client in typescript and python codes.")))))}m.isMDXComponent=!0}}]);