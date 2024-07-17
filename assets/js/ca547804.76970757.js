"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[3707],{84:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>k});var a=n(3289);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),u=p(n),m=r,k=u["".concat(s,".").concat(m)]||u[m]||d[m]||i;return n?a.createElement(k,l(l({ref:t},c),{},{components:n})):a.createElement(k,l({ref:t},c))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6286:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var a=n(4715),r=(n(3289),n(84));const i={sidebar_position:9,title:"Until",toc_max_heading_level:4},l="Until <s generated />",o={unversionedId:"api/client/python/classes/until",id:"api/client/python/classes/until",title:"Until",description:"Methods",source:"@site/docs/api/client/python/classes/until.mdx",sourceDirName:"api/client/python/classes",slug:"/api/client/python/classes/until",permalink:"/gamium/api/client/python/classes/until",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/python/classes/until.mdx",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9,title:"Until",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"RpcBy",permalink:"/gamium/api/client/python/classes/rpc-by"},next:{title:"GamiumError",permalink:"/gamium/api/client/python/classes/gamium-error"}},s={},p=[{value:"Methods <s generated />",id:"methods-",level:2},{value:"element_interactable <s generated />",id:"element_interactable-",level:3},{value:"Usage",id:"usage",level:5},{value:"Arguments <s generated />",id:"arguments-",level:5},{value:"Return <s generated />",id:"return-",level:5},{value:"object_located <s generated />",id:"object_located-",level:3},{value:"Usage",id:"usage-1",level:5},{value:"Arguments <s generated />",id:"arguments--1",level:5},{value:"Return <s generated />",id:"return--1",level:5},{value:"objects_located <s generated />",id:"objects_located-",level:3},{value:"Usage",id:"usage-2",level:5},{value:"Arguments <s generated />",id:"arguments--2",level:5},{value:"Return <s generated />",id:"return--2",level:5}],c={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"until-"},"Until ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h2",{id:"methods-"},"Methods ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("h3",{id:"element_interactable-"},"element_interactable ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"static"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Wait until the UIElement received as a factor is interactive.")),(0,r.kt)("h5",{id:"usage"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"ok_button = ui.find(By.path('/Canvas[1]/Register[1]/OkBtn[1]'))\ngamium.wait(Until.element_interactable(ok_button))\nok_button.click()\n")),(0,r.kt)("h5",{id:"arguments-"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"param ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.TypeVar"},(0,r.kt)("inlineCode",{parentName:"a"},"T"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"query-object-interactable-options"},(0,r.kt)("inlineCode",{parentName:"a"},"QueryObjectInteractableOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("h5",{id:"return-"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Condition"),"[",(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.TypeVar"},(0,r.kt)("inlineCode",{parentName:"a"},"T")),"] ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"object_located-"},"object_located ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"static"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Wait until the object is found to the Locator, wait until the object is found.")),(0,r.kt)("h5",{id:"usage-1"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"okButton = gamium.wait(Until.object_located(By.path('/Canvas[1]/Register[1]/OkBtn[1]')))\n")),(0,r.kt)("h5",{id:"arguments--1"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"locator ",(0,r.kt)("a",{parentName:"p",href:"locator"},(0,r.kt)("inlineCode",{parentName:"a"},"Locator"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"find-object-options"},(0,r.kt)("inlineCode",{parentName:"a"},"FindObjectOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("h5",{id:"return--1"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ObjectInfoCondition")," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"objects_located-"},"objects_located ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"static"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Wait until the Objects corresponding to the Locator received as a factor are found.")),(0,r.kt)("h5",{id:"usage-2"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"products = gamium.wait(Until.objects_located(By.path('/Canvas[1]/ShopView[1]//ProductSlot(Clone)')))\n")),(0,r.kt)("h5",{id:"arguments--2"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"locator ",(0,r.kt)("a",{parentName:"p",href:"locator"},(0,r.kt)("inlineCode",{parentName:"a"},"Locator"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"find-object-options"},(0,r.kt)("inlineCode",{parentName:"a"},"FindObjectOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("h5",{id:"return--2"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"ObjectInfosCondition")," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}))}d.isMDXComponent=!0}}]);