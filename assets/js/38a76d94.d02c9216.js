"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[1726],{84:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var a=n(3289);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var o=a.createContext({}),d=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(o.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(n),k=r,g=u["".concat(o,".").concat(k)]||u[k]||c[k]||l;return n?a.createElement(g,i(i({ref:t},p),{},{components:n})):a.createElement(g,i({ref:t},p))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=k;var s={};for(var o in t)hasOwnProperty.call(t,o)&&(s[o]=t[o]);s.originalType=e,s[u]="string"==typeof e?e:r,i[1]=s;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},4411:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>i,default:()=>c,frontMatter:()=>l,metadata:()=>s,toc:()=>d});var a=n(4715),r=(n(3289),n(84));const l={sidebar_position:4,title:"UIElement",toc_max_heading_level:4},i="UIElement <s generated />",s={unversionedId:"api/client/python/classes/ui-element",id:"api/client/python/classes/ui-element",title:"UIElement",description:"Methods",source:"@site/docs/api/client/python/classes/ui-element.mdx",sourceDirName:"api/client/python/classes",slug:"/api/client/python/classes/ui-element",permalink:"/api/client/python/classes/ui-element",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/python/classes/ui-element.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"UIElement",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"Player",permalink:"/api/client/python/classes/player"},next:{title:"ActionChain",permalink:"/api/client/python/classes/action-chain"}},o={},d=[{value:"Methods <s generated />",id:"methods-",level:2},{value:"click <s generated />",id:"click-",level:3},{value:"Usage",id:"usage",level:5},{value:"Arguments <s generated />",id:"arguments-",level:5},{value:"Return <s generated />",id:"return-",level:5},{value:"drag <s generated />",id:"drag-",level:3},{value:"Usage",id:"usage-1",level:5},{value:"Arguments <s generated />",id:"arguments--1",level:5},{value:"Return <s generated />",id:"return--1",level:5},{value:"get_text <s generated />",id:"get_text-",level:3},{value:"Usage",id:"usage-2",level:5},{value:"Return <s generated />",id:"return--2",level:5},{value:"is_interactable <s generated />",id:"is_interactable-",level:3},{value:"Usage",id:"usage-3",level:5},{value:"Arguments <s generated />",id:"arguments--2",level:5},{value:"Return <s generated />",id:"return--3",level:5},{value:"refresh <s generated />",id:"refresh-",level:3},{value:"Usage",id:"usage-4",level:5},{value:"scroll <s generated />",id:"scroll-",level:3},{value:"Usage",id:"usage-5",level:5},{value:"Arguments <s generated />",id:"arguments--3",level:5},{value:"set_text <s generated />",id:"set_text-",level:3},{value:"Usage",id:"usage-6",level:5},{value:"Arguments <s generated />",id:"arguments--4",level:5},{value:"try_is_interactable <s generated />",id:"try_is_interactable-",level:3},{value:"Arguments <s generated />",id:"arguments--5",level:5},{value:"Return <s generated />",id:"return--4",level:5},{value:"try_wait_interactable <s generated />",id:"try_wait_interactable-",level:3},{value:"Arguments <s generated />",id:"arguments--6",level:5},{value:"Return <s generated />",id:"return--5",level:5},{value:"wait_interactable <s generated />",id:"wait_interactable-",level:3},{value:"Usage",id:"usage-7",level:5},{value:"Arguments <s generated />",id:"arguments--7",level:5},{value:"Return <s generated />",id:"return--6",level:5},{value:"Properties <s generated />",id:"properties-",level:2},{value:"info <code>ObjectInfo</code> <s generated />",id:"info-objectinfo-",level:4}],p={toc:d},u="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"uielement-"},"UIElement ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h2",{id:"methods-"},"Methods ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("h3",{id:"click-"},"click ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Click UIElement."),(0,r.kt)("h5",{id:"usage"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"ok_button = ui.find(By.path('Object path'))\ngamium.wait(Until.element_interactable(ok_button))\nok_button.click()\n")),(0,r.kt)("h5",{id:"arguments-"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"options ",(0,r.kt)("a",{parentName:"li",href:"action-click-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionClickOptions"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("h5",{id:"return-"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/constants.html?highlight=none#None"},(0,r.kt)("inlineCode",{parentName:"a"},"None"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"drag-"},"drag ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Drag the UIElement."),(0,r.kt)("h5",{id:"usage-1"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"handle = await ui.find(By.path('Object path'))\ngamium.wait(Until.element_interactable(handle))\nhandle.drag(Vector2(handle.info.screen_position.x - 30, handle.info.screen_position.y), ActionDragOptions(1000, 100))\n")),(0,r.kt)("h5",{id:"arguments--1"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"to ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.Union"},(0,r.kt)("inlineCode",{parentName:"a"},"Union")),"[",(0,r.kt)("a",{parentName:"p",href:"ui-element"},(0,r.kt)("inlineCode",{parentName:"a"},"UIElement")),", ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2")),"] ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-drag-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionDragOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("h5",{id:"return--1"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/constants.html?highlight=none#None"},(0,r.kt)("inlineCode",{parentName:"a"},"None"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"get_text-"},"get_text ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Import text if it is a UIElement that has text."),(0,r.kt)("h5",{id:"usage-2"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"quest_object = await ui.find(By.path('Object path'))\nprogress = quest_object.get_text()\n")),(0,r.kt)("h5",{id:"return--2"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"str"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"is_interactable-"},"is_interactable ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Verify that UIElement is interactive. To return to true, you must pass a number of conditions. Option allows you to override some conditions."),(0,r.kt)("h5",{id:"usage-3"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"ok_button = await ui.find(By.path('Object path'))\nis_interactable = await ok_button.is_interactable()\n")),(0,r.kt)("h5",{id:"arguments--2"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"options ",(0,r.kt)("a",{parentName:"li",href:"query-object-interactable-options"},(0,r.kt)("inlineCode",{parentName:"a"},"QueryObjectInteractableOptions"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("h5",{id:"return--3"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#boolean-values"},(0,r.kt)("inlineCode",{parentName:"a"},"bool"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"refresh-"},"refresh ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Updates the information that the object has."),(0,r.kt)("h5",{id:"usage-4"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"ok_button = await ui.find(By.path('Object path'))\nok_button.refresh()\n")),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"scroll-"},"scroll ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Scroll by delta from UIElement."),(0,r.kt)("h5",{id:"usage-5"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"dragger = ui.find(By.path('Object path'))\ngamium.wait(Until.element_interactable(dragger))\ndragger.scroll(Vector2(0, -0.5), ActionScrollOptions(2000))\n")),(0,r.kt)("h5",{id:"arguments--3"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"delta ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-scroll-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionScrollOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"set_text-"},"set_text ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Enter text in UIElement."),(0,r.kt)("h5",{id:"usage-6"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"text1 = ui.find(By.path('Object path'))\ntext1.set_text('Hello World').perform()\n")),(0,r.kt)("h5",{id:"arguments--4"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"text ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"str"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"set-text-options"},(0,r.kt)("inlineCode",{parentName:"a"},"SetTextOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"try_is_interactable-"},"try_is_interactable ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h5",{id:"arguments--5"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"options ",(0,r.kt)("a",{parentName:"li",href:"query-object-interactable-options"},(0,r.kt)("inlineCode",{parentName:"a"},"QueryObjectInteractableOptions"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("h5",{id:"return--4"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"TryResult"),"[",(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#boolean-values"},(0,r.kt)("inlineCode",{parentName:"a"},"bool")),"] ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"try_wait_interactable-"},"try_wait_interactable ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h5",{id:"arguments--6"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"options ",(0,r.kt)("a",{parentName:"li",href:"query-object-interactable-options"},(0,r.kt)("inlineCode",{parentName:"a"},"QueryObjectInteractableOptions"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("h5",{id:"return--5"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"TryResult"),"[",(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/constants.html?highlight=none#None"},(0,r.kt)("inlineCode",{parentName:"a"},"None")),"] ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"wait_interactable-"},"wait_interactable ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Wait for UIElement to interact.."),(0,r.kt)("h5",{id:"usage-7"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"okButton = ui.find(By.path('Object path'))\nokButton.wait_interactable()\n")),(0,r.kt)("h5",{id:"arguments--7"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"options ",(0,r.kt)("a",{parentName:"li",href:"query-object-interactable-options"},(0,r.kt)("inlineCode",{parentName:"a"},"QueryObjectInteractableOptions"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("h5",{id:"return--6"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/constants.html?highlight=none#None"},(0,r.kt)("inlineCode",{parentName:"a"},"None"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h2",{id:"properties-"},"Properties ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("h4",{id:"info-objectinfo-"},"info ",(0,r.kt)("a",{parentName:"h4",href:"object-info"},(0,r.kt)("inlineCode",{parentName:"a"},"ObjectInfo"))," ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}))}c.isMDXComponent=!0}}]);