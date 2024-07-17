"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[8242],{84:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var i=n(3289);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=i.createContext({}),p=function(e){var t=i.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return i.createElement(u.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,u=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=p(n),d=o,g=m["".concat(u,".").concat(d)]||m[d]||s[d]||r;return n?i.createElement(g,a(a({ref:t},c),{},{components:n})):i.createElement(g,a({ref:t},c))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[m]="string"==typeof e?e:o,a[1]=l;for(var p=2;p<r;p++)a[p]=n[p];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4342:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>s,frontMatter:()=>r,metadata:()=>l,toc:()=>p});var i=n(4715),o=(n(3289),n(84));n.p;const r={sidebar_position:2,toc_max_heading_level:4,title:"Unity"},a="Gamium Engine Unity SDK",l={unversionedId:"docs/contributing/engine-development/unity",id:"docs/contributing/engine-development/unity",title:"Unity",description:"Gamium Engine Unity SDK is located in the engine/unity folder from the source root.",source:"@site/docs/docs/contributing/engine-development/unity.mdx",sourceDirName:"docs/contributing/engine-development",slug:"/docs/contributing/engine-development/unity",permalink:"/gamium/docs/contributing/engine-development/unity",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/contributing/engine-development/unity.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,toc_max_heading_level:4,title:"Unity"},sidebar:"docsSidebar",previous:{title:"Protocol Development",permalink:"/gamium/docs/contributing/protocol-development"},next:{title:"TypeScript",permalink:"/gamium/docs/contributing/client-development/typescript"}},u={},p=[{value:"Package Import",id:"package-import",level:3},{value:"Requirements",id:"requirements",level:4},{value:"Install the Unity Editor",id:"install-the-unity-editor",level:4},{value:"Open Unity project",id:"open-unity-project",level:4},{value:"Find local source code path",id:"find-local-source-code-path",level:4},{value:"Import the SDK into your project",id:"import-the-sdk-into-your-project",level:4},{value:"Build and Run",id:"build-and-run",level:3}],c={toc:p},m="wrapper";function s(e){let{components:t,...n}=e;return(0,o.kt)(m,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"gamium-engine-unity-sdk"},"Gamium Engine Unity SDK"),(0,o.kt)("p",null,"Gamium Engine Unity SDK is located in the ",(0,o.kt)("inlineCode",{parentName:"p"},"engine/unity")," folder from the source root."),(0,o.kt)("h3",{id:"package-import"},"Package Import"),(0,o.kt)("h4",{id:"requirements"},"Requirements"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Unity 2020.3.0f1 or later")),(0,o.kt)("h4",{id:"install-the-unity-editor"},"Install the Unity Editor"),(0,o.kt)("p",null,"Please refer to ",(0,o.kt)("a",{parentName:"p",href:"../../engine/unity/project-configuration#requirements"},(0,o.kt)("strong",{parentName:"a"},"Configure Project Requirements"))," for requirements.",(0,o.kt)("br",{parentName:"p"}),"\n","install latest version of Unity Hub and Unity 2020.3.47f1 with Android Build Support. Also, if you want to test iOS and your installation environment is macOS, please also install iOS Build Support too."),(0,o.kt)("h4",{id:"open-unity-project"},"Open Unity project"),(0,o.kt)("p",null,"You need a project to open with the Unity Editor. If there is no Unity project, please use the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dogu-team/gamium-unity-samples"},(0,o.kt)("strong",{parentName:"a"},"sample Gamium Unity project")),".",(0,o.kt)("br",{parentName:"p"}),"\n","or you can use your Unity project."),(0,o.kt)("h4",{id:"find-local-source-code-path"},"Find local source code path"),(0,o.kt)("p",null,"Clone the project on GitHub to local.\nThe Gamium Engine Unity SDK is located in the ",(0,o.kt)("inlineCode",{parentName:"p"},"engine/unity")," folder from the source root."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"$ git clone https://github.com/dogu-team/gamium.git\n$ cd engine/unity\n$ pwd\n")),(0,o.kt)("p",null,"Please remember the path output from pwd. This path is {gamium_engine_unity_local_path} which will be shown below."),(0,o.kt)("h4",{id:"import-the-sdk-into-your-project"},"Import the SDK into your project"),(0,o.kt)("p",null,"The Gamium Engine Unity SDK was developed according to the ",(0,o.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/cus-layout.html"},"Unity Package Layout")," format. Unity supports importing local packages through the Package Manager, which allows you to import the Gamium Engine Unity SDK.",(0,o.kt)("br",{parentName:"p"}),"\n","You can import local unity package through Unity project manifest file.\nThe file is located at ",(0,o.kt)("inlineCode",{parentName:"p"},"{your unity project}/Packages/manifest.json"),".\nLooking for the file and replace ",(0,o.kt)("inlineCode",{parentName:"p"},"{gamium_engine_unity_local_path}")," with the path to the Gamium Engine source code path."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "dependencies": {\n    "com.dogu.gamium.engine.unity": "file:{gamium_engine_unity_local_path}"\n  }\n}\n')),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"If you have any questions about local package import, please refer to ",(0,o.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/upm-localpath.html"},(0,o.kt)("strong",{parentName:"a"},"Unity Package Manager")),".")),(0,o.kt)("h3",{id:"build-and-run"},"Build and Run"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},'If you return to the unity editor the script will build itself with the phrase "Compiling C# Scripts".'),(0,o.kt)("li",{parentName:"ul"},"After that, press Play button to check if it runs normally.")))}s.isMDXComponent=!0}}]);