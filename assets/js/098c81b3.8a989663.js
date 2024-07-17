"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[9492],{84:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var a=n(3289);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var m=a.createContext({}),l=function(e){var t=a.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(m.Provider,{value:t},e.children)},s="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,m=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),s=l(n),d=i,g=s["".concat(m,".").concat(d)]||s[d]||c[d]||r;return n?a.createElement(g,o(o({ref:t},p),{},{components:n})):a.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,o=new Array(r);o[0]=d;var u={};for(var m in t)hasOwnProperty.call(t,m)&&(u[m]=t[m]);u.originalType=e,u[s]="string"==typeof e?e:i,o[1]=u;for(var l=2;l<r;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2629:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>o,default:()=>c,frontMatter:()=>r,metadata:()=>u,toc:()=>l});var a=n(4715),i=(n(3289),n(84));const r={sidebar_position:1,title:"Introduction"},o="Introduction",u={unversionedId:"docs/get-started/introduction",id:"docs/get-started/introduction",title:"Introduction",description:"Gamiumis an SDK that can automate gameplay. Gamium provides the ability to script the behavior of game users.",source:"@site/docs/docs/get-started/introduction.mdx",sourceDirName:"docs/get-started",slug:"/docs/get-started/introduction",permalink:"/gamium/docs/get-started/introduction",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/get-started/introduction.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Introduction"},sidebar:"docsSidebar",next:{title:"Quick Start",permalink:"/gamium/docs/get-started/quick-start"}},m={},l=[{value:"Gamium Engine",id:"gamium-engine",level:3},{value:"Gamium Client",id:"gamium-client",level:3},{value:"Diagram",id:"diagram",level:3},{value:"Getting Started",id:"getting-started",level:3}],p={toc:l},s="wrapper";function c(e){let{components:t,...n}=e;return(0,i.kt)(s,(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Gamium"),"is an SDK that can automate gameplay. Gamium provides the ability to script the behavior of game users.\nStarting with the simple ability to click on the UI, you can automate a variety of cases and free yourself from repetitive manual testing."),(0,i.kt)("p",null,"To simulate Gamium gameplay, we developed two components: ",(0,i.kt)("a",{parentName:"p",href:"#gamium-engine"},(0,i.kt)("inlineCode",{parentName:"a"},"Gamium Engine"))," and ",(0,i.kt)("a",{parentName:"p",href:"#gamium-client"},(0,i.kt)("inlineCode",{parentName:"a"},"Gamium Client")),".\nInclude the ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Engine")," in your game build, and use the API provided by the ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Client")," to write your preferred test script"),(0,i.kt)("h3",{id:"gamium-engine"},"Gamium Engine"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Engine")," is responsible for executing the status of the game according to the request, such as virtual input. Start preparing to run the test, including the ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," in the game build."),(0,i.kt)("p",null,"The following ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," are currently supported."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../engine/unity/project-configuration"},"Unity"))),(0,i.kt)("h3",{id:"gamium-client"},"Gamium Client"),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Client")," is a client that communicates with ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Engine"),".\nYou can request virtual input such as a game status query, keyboard, mouse, etc. You can mix virtual inputs and conditional statement iterations to script the inputs in the flow you want. Create and run scripts to automate the tests you want."),(0,i.kt)("p",null,"The following ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Client SDK")," are currently supported."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../client/write-testscript"},"Typescript")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"../client/write-testscript"},"Python"))),(0,i.kt)("h3",{id:"diagram"},"Diagram"),(0,i.kt)("mermaid",{value:"graph RL;\n    subgraph Game Program\n        S[Gamium Engine]\n    end\n    C[Gamium Client]\n    C-- Request --\x3eS -- Response --\x3eC;"}),(0,i.kt)("h3",{id:"getting-started"},"Getting Started"),(0,i.kt)("p",null,"To start gamium, you need a game project with gamium engine, and a code that uses gamium client.\nIt can be difficult to proceed with this process at once.\nTherefore, if you are new to gamium, please refer to the ",(0,i.kt)("a",{parentName:"p",href:"quick-start"},"Quick Start")," guide."),(0,i.kt)("p",null,"If you've used an automation library like ",(0,i.kt)("a",{parentName:"p",href:"https://www.selenium.dev/"},"Selenium"),", ",(0,i.kt)("a",{parentName:"p",href:"https://appium.io/"},"Appium"),", or ",(0,i.kt)("a",{parentName:"p",href:"https://playwright.dev/"},"Playwright")," beforehand, it's also a good idea to look around the ",(0,i.kt)("a",{parentName:"p",href:"../client/write-testscript"},"Client document")," to see what it does."))}c.isMDXComponent=!0}}]);