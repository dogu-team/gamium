"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[8349],{84:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(3289);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},d=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),c=p(a),m=r,u=c["".concat(s,".").concat(m)]||c[m]||k[m]||i;return a?n.createElement(u,l(l({ref:t},d),{},{components:a})):n.createElement(u,l({ref:t},d))}));function u(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},1826:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>k,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(4715),r=(a(3289),a(84));const i={sidebar_position:5,title:"ActionChain",toc_max_heading_level:4},l="ActionChain <s generated />",o={unversionedId:"api/client/python/classes/action-chain",id:"api/client/python/classes/action-chain",title:"ActionChain",description:"This class is used when you want to run multiple actions in a row in Game Controling.",source:"@site/docs/api/client/python/classes/action-chain.mdx",sourceDirName:"api/client/python/classes",slug:"/api/client/python/classes/action-chain",permalink:"/api/client/python/classes/action-chain",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/python/classes/action-chain.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,title:"ActionChain",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"UIElement",permalink:"/api/client/python/classes/ui-element"},next:{title:"By",permalink:"/api/client/python/classes/by"}},s={},p=[{value:"Methods <s generated />",id:"methods-",level:2},{value:"app_quit <s generated />",id:"app_quit-",level:3},{value:"Arguments <s generated />",id:"arguments-",level:5},{value:"click <s generated />",id:"click-",level:3},{value:"Usage",id:"usage",level:5},{value:"Arguments <s generated />",id:"arguments--1",level:5},{value:"drag <s generated />",id:"drag-",level:3},{value:"Usage",id:"usage-1",level:5},{value:"Arguments <s generated />",id:"arguments--2",level:5},{value:"move <s generated />",id:"move-",level:3},{value:"Usage",id:"usage-2",level:5},{value:"Arguments <s generated />",id:"arguments--3",level:5},{value:"move_player <s generated />",id:"move_player-",level:3},{value:"Usage",id:"usage-3",level:5},{value:"Arguments <s generated />",id:"arguments--4",level:5},{value:"perform <s generated />",id:"perform-",level:3},{value:"Return <s generated />",id:"return-",level:5},{value:"scroll <s generated />",id:"scroll-",level:3},{value:"Usage",id:"usage-4",level:5},{value:"Arguments <s generated />",id:"arguments--5",level:5},{value:"send_keys <s generated />",id:"send_keys-",level:3},{value:"Usage",id:"usage-5",level:5},{value:"Arguments <s generated />",id:"arguments--6",level:5},{value:"set_text <s generated />",id:"set_text-",level:3},{value:"Usage",id:"usage-6",level:5},{value:"Arguments <s generated />",id:"arguments--7",level:5},{value:"sleep <s generated />",id:"sleep-",level:3},{value:"Usage",id:"usage-7",level:5},{value:"Arguments <s generated />",id:"arguments--8",level:5}],d={toc:p},c="wrapper";function k(e){let{components:t,...a}=e;return(0,r.kt)(c,(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"actionchain-"},"ActionChain ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("p",null,"This class is used when you want to run multiple actions in a row in ",(0,r.kt)("a",{parentName:"p",href:"/docs/client/game-control"},(0,r.kt)("inlineCode",{parentName:"a"},"Game Controling")),"."),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h2",{id:"methods-"},"Methods ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("h3",{id:"app_quit-"},"app_quit ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h5",{id:"arguments-"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"exit_code ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"delay_ms ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"click-"},"click ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Add the action of clicking on the screen coordinates to the Action Chain."),(0,r.kt)("h5",{id:"usage"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium.actions().click({ x: 0, y: 0 }).perform()\n")),(0,r.kt)("h5",{id:"arguments--1"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"position ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-click-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionClickOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"drag-"},"drag ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Adds an action to ActionChain that drags from one coordinate to another coordinate."),(0,r.kt)("h5",{id:"usage-1"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium.actions().drag(Vector2(0, 0), Vector2(0, 10)).perform()\n")),(0,r.kt)("h5",{id:"arguments--2"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"from_position ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"to_position ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-drag-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionDragOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"move-"},"move ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Add the action of moving the mouse to a specific coordinate to the Action Chain."),(0,r.kt)("h5",{id:"usage-2"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium.actions().move(Vector2(0, 0)).perform()\n")),(0,r.kt)("h5",{id:"arguments--3"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"position ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-move-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionMoveOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"move_player-"},"move_player ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Adds an action to the Action Chain that moves the Player to a specific position."),(0,r.kt)("h5",{id:"usage-3"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium\n  .actions()\n  .move_player(\n    By.path('/PlayerSpawnPoint[1]/WizardCharacter(Clone)[1]'),\n    By.path('/Main Camera[1]'),\n    Vector3(0, 0, 0),\n    MovePlayerOptions(MovePlayerBy.Navigation),\n  )\n  .perform()\n")),(0,r.kt)("h5",{id:"arguments--4"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"player_locator ",(0,r.kt)("a",{parentName:"p",href:"locator"},(0,r.kt)("inlineCode",{parentName:"a"},"Locator"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"camera_locator ",(0,r.kt)("a",{parentName:"p",href:"locator"},(0,r.kt)("inlineCode",{parentName:"a"},"Locator"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"dest ",(0,r.kt)("a",{parentName:"p",href:"vector3"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector3"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"move-player-options"},(0,r.kt)("inlineCode",{parentName:"a"},"MovePlayerOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"perform-"},"perform ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Request actions registered in the AccrtionChain to 'Gamium Engine'."),(0,r.kt)("h5",{id:"return-"},"Return ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#sequence-types-list-tuple-range"},(0,r.kt)("inlineCode",{parentName:"a"},"List")),"[",(0,r.kt)("inlineCode",{parentName:"li"},"ActionResultT"),"]"," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"scroll-"},"scroll ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Adds an action to ActionChain that scrolls by delta from a specific coordinate."),(0,r.kt)("h5",{id:"usage-4"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium.actions().scroll(Vector2(0, 0), Vector2(0, 10)).perform()\n")),(0,r.kt)("h5",{id:"arguments--5"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"position ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"delta ",(0,r.kt)("a",{parentName:"p",href:"vector2"},(0,r.kt)("inlineCode",{parentName:"a"},"Vector2"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"action-scroll-options"},(0,r.kt)("inlineCode",{parentName:"a"},"ActionScrollOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"send_keys-"},"send_keys ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Adds an action to ActionChain that causes specific keystrokes to occur."),(0,r.kt)("h5",{id:"usage-5"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"game\n  .actions()\n  .send_keys([KeyBy.unity_keycode('Space')])\n  .perform()\n")),(0,r.kt)("h5",{id:"arguments--6"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"by_list ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#sequence-types-list-tuple-range"},(0,r.kt)("inlineCode",{parentName:"a"},"List")),"[",(0,r.kt)("a",{parentName:"p",href:"key-by"},(0,r.kt)("inlineCode",{parentName:"a"},"KeyBy")),"] ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"send-key-options"},(0,r.kt)("inlineCode",{parentName:"a"},"SendKeyOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"set_text-"},"set_text ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Adds an action to ActionChain to enter text for a specific object."),(0,r.kt)("h5",{id:"usage-6"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium\n  .actions()\n  .set_text(By.path('/Canvas[1]/Panel[1]/InputField[1]/Text[1]'), 'Hello World')\n  .perform()\n")),(0,r.kt)("h5",{id:"arguments--7"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"locator ",(0,r.kt)("a",{parentName:"p",href:"locator"},(0,r.kt)("inlineCode",{parentName:"a"},"Locator"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"text ",(0,r.kt)("a",{parentName:"p",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"str"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"options ",(0,r.kt)("a",{parentName:"p",href:"set-text-options"},(0,r.kt)("inlineCode",{parentName:"a"},"SetTextOptions"))," ",(0,r.kt)("s",{generated:!0})))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("h3",{id:"sleep-"},"sleep ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("s",{childtag:!0})," ",(0,r.kt)("code",{style:{position:"relative",top:"-20px",fontSize:"70%"},children:"public"})," ",(0,r.kt)("s",{generated:!0}),(0,r.kt)("p",null,"Add an empty time in the middle of the ActionChain."),(0,r.kt)("h5",{id:"usage-7"},"Usage"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"gamium.actions().sleep(300).set_text(text1, 'Hello World').perform()\n")),(0,r.kt)("h5",{id:"arguments--8"},"Arguments ",(0,r.kt)("s",{generated:!0})),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"ms ",(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex"},(0,r.kt)("inlineCode",{parentName:"a"},"int"))," ",(0,r.kt)("s",{generated:!0}))),(0,r.kt)("hr",{class:"solid"}),"  ",(0,r.kt)("s",{generated:!0}))}k.isMDXComponent=!0}}]);