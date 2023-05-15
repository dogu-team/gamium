"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[2721],{84:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>g});var i=n(3289);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var m=i.createContext({}),l=function(e){var t=i.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return i.createElement(m.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},s=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,m=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),d=l(n),s=a,g=d["".concat(m,".").concat(s)]||d[s]||c[s]||r;return n?i.createElement(g,o(o({ref:t},p),{},{components:n})):i.createElement(g,o({ref:t},p))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,o=new Array(r);o[0]=s;var u={};for(var m in t)hasOwnProperty.call(t,m)&&(u[m]=t[m]);u.originalType=e,u[d]="string"==typeof e?e:a,o[1]=u;for(var l=2;l<r;l++)o[l]=n[l];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}s.displayName="MDXCreateElement"},5089:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>m,default:()=>g,frontMatter:()=>u,metadata:()=>l,toc:()=>d});var i=n(4715),a=(n(3289),n(84));const r=n.p+"assets/images/unity_define_symbol-eda12430ad7ec843c20786e3eab15e40.png",o=n.p+"assets/images/unity_gamium_update_log-d0a55180f89edcf957a0684f0dacb844.png",u={sidebar_position:1,title:"Configure Project"},m=void 0,l={unversionedId:"gamium/engine/unity/project-configuration",id:"gamium/engine/unity/project-configuration",title:"Configure Project",description:"To use Gamium, you must add Gamium Engine SDK to your project.",source:"@site/docs/gamium/engine/unity/project-configuration.mdx",sourceDirName:"gamium/engine/unity",slug:"/gamium/engine/unity/project-configuration",permalink:"/gamium/engine/unity/project-configuration",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/gamium/engine/unity/project-configuration.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Configure Project"},sidebar:"docsSidebar",previous:{title:"Quick Start",permalink:"/gamium/get-started/quick-start"},next:{title:"Using GamiumEditor",permalink:"/gamium/engine/unity/query-objects"}},p={},d=[{value:"Requirements",id:"requirements",level:2},{value:"1. Add Gamium Engine SDK",id:"1-add-gamium-engine-sdk",level:2},{value:"2. Add Scripting Define Symbol",id:"2-add-scripting-define-symbol",level:2},{value:"3. Add Initialization Code",id:"3-add-initialization-code",level:2},{value:"4. Check the log",id:"4-check-the-log",level:2},{value:"5. Build",id:"5-build",level:2}],c={toc:d},s="wrapper";function g(e){let{components:t,...n}=e;return(0,a.kt)(s,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"To use ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium"),", you must add ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," to your project.\nThe ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," performs the functions requested by the ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Client")," to help you proceed with automated testing."),(0,a.kt)("h2",{id:"requirements"},"Requirements"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Unity 2020.3.0f1 or higher")),(0,a.kt)("h2",{id:"1-add-gamium-engine-sdk"},"1. Add Gamium Engine SDK"),(0,a.kt)("p",null,"In ",(0,a.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/upm-manifestPrj.html"},"Project manifest"),", add to ",(0,a.kt)("inlineCode",{parentName:"p"},"dependencies")," as follows."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'"com.dogu.gamium.engine.unity": "https://github.com/dogu-team/gamium.git?path=/engine/unity#1.0.0",\n')),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"The source code and example project for the Gamium Engine SDK can be found at the link below"),(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium"},"gamium")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium-unity-samples"},"gamium-unity-samples")))),(0,a.kt)("h2",{id:"2-add-scripting-define-symbol"},"2. Add Scripting Define Symbol"),(0,a.kt)("p",null,"A ",(0,a.kt)("inlineCode",{parentName:"p"},"Scripting Define Symbol")," called ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM"))," is required for ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium")," to work. ",(0,a.kt)("strong",{parentName:"p"},"Only when ",(0,a.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM"))," is set will the ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine")," run normally.\nGo to the topic ",(0,a.kt)("inlineCode",{parentName:"p"},"Script Compilation")," using the ",(0,a.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/CustomScriptingSymbols.html"},"Custom scripting symbols")," guide and add ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM")),")."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"The ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," has been added to the project, but if you do not want to run ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine"),", you must turn off ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM")),".")),(0,a.kt)("img",{src:r,style:{width:500}}),(0,a.kt)("h2",{id:"3-add-initialization-code"},"3. Add Initialization Code"),(0,a.kt)("p",null,"The following code can be added to run ",(0,a.kt)("inlineCode",{parentName:"p"},"Gamium Engine"),".\n",(0,a.kt)("a",{parentName:"p",href:"server-configuration"},"ServerBuilder")," provides functions such as input mapping and event handler registration, and please refer to ",(0,a.kt)("a",{parentName:"p",href:"server-configuration"},"Server Configuration")," for more information."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-csharp"},"using System.Collections.Generic;\nusing Gamium;\nusing UnityEngine;\n\npublic class GamiumServerStarter\n{\n    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]\n    private static void OnLoad()\n    {\n        new ServerBuilder().Run();\n    }\n}\n")),(0,a.kt)("h2",{id:"4-check-the-log"},"4. Check the log"),(0,a.kt)("p",null,"If the following log is output from the 'Unity Editor', the 'Gamium Engine' has been executed normally."),(0,a.kt)("img",{src:o,style:{width:500}}),(0,a.kt)("h2",{id:"5-build"},"5. Build"),(0,a.kt)("p",null,"Check ",(0,a.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/BuildSettings.html"},"Build Settings")," to create an executable after building unity.\nYou can proceed with test automation with that executable file."))}g.isMDXComponent=!0}}]);