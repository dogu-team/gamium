"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[4598],{84:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var i=n(3289);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=i.createContext({}),m=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},d=function(e){var t=m(e.components);return i.createElement(l.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},s=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,d=u(e,["components","mdxType","originalType","parentName"]),p=m(n),s=r,g=p["".concat(l,".").concat(s)]||p[s]||c[s]||a;return n?i.createElement(g,o(o({ref:t},d),{},{components:n})):i.createElement(g,o({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=s;var u={};for(var l in t)hasOwnProperty.call(t,l)&&(u[l]=t[l]);u.originalType=e,u[p]="string"==typeof e?e:r,o[1]=u;for(var m=2;m<a;m++)o[m]=n[m];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}s.displayName="MDXCreateElement"},9185:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>g,frontMatter:()=>u,metadata:()=>m,toc:()=>p});var i=n(4715),r=(n(3289),n(84));const a=n.p+"assets/images/unity_define_symbol-eda12430ad7ec843c20786e3eab15e40.png",o=n.p+"assets/images/unity_gamium_update_log-7ee44a436939e88f0bf2a7f95efe40f1.png",u={sidebar_position:1,title:"Configure Project"},l=void 0,m={unversionedId:"docs/engine/unity/project-configuration",id:"docs/engine/unity/project-configuration",title:"Configure Project",description:"To use Gamium, you must add Gamium Engine SDK to your project.",source:"@site/docs/docs/engine/unity/project-configuration.mdx",sourceDirName:"docs/engine/unity",slug:"/docs/engine/unity/project-configuration",permalink:"/docs/engine/unity/project-configuration",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/engine/unity/project-configuration.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"Configure Project"},sidebar:"docsSidebar",previous:{title:"Play with a device",permalink:"/docs/get-started/play-with-a-device"},next:{title:"Using GamiumEditor",permalink:"/docs/engine/unity/query-objects"}},d={},p=[{value:"Requirements",id:"requirements",level:2},{value:"1. Add Gamium Engine SDK",id:"1-add-gamium-engine-sdk",level:2},{value:"2. Add Scripting Define Symbol",id:"2-add-scripting-define-symbol",level:2},{value:"3. Add Initialization Code",id:"3-add-initialization-code",level:2},{value:"4. Check the log",id:"4-check-the-log",level:2},{value:"5. Build",id:"5-build",level:2}],c={toc:p},s="wrapper";function g(e){let{components:t,...n}=e;return(0,r.kt)(s,(0,i.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"To use ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium"),", you must add ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," to your project.\nThe ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," performs the functions requested by the ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Client")," to help you proceed with automated testing."),(0,r.kt)("h2",{id:"requirements"},"Requirements"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Unity 2020.3.0f1 or higher")),(0,r.kt)("h2",{id:"1-add-gamium-engine-sdk"},"1. Add Gamium Engine SDK"),(0,r.kt)("p",null,"In ",(0,r.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/upm-manifestPrj.html"},"Project manifest"),", add to ",(0,r.kt)("inlineCode",{parentName:"p"},"dependencies")," as follows."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'"com.dogu.gamium.engine.unity": "https://github.com/dogu-team/gamium.git?path=/engine/unity#latest",\n')),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The source code and example project for the Gamium Engine SDK can be found at the link below"),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium"},"gamium")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium-unity-samples"},"gamium-unity-samples")))),(0,r.kt)("h2",{id:"2-add-scripting-define-symbol"},"2. Add Scripting Define Symbol"),(0,r.kt)("p",null,"A ",(0,r.kt)("inlineCode",{parentName:"p"},"Scripting Define Symbol")," called ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM"))," is required for ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium")," to work. ",(0,r.kt)("strong",{parentName:"p"},"Only when ",(0,r.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM"))," is defined will the ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine")," run normally.\nGo to ",(0,r.kt)("inlineCode",{parentName:"p"},"Edit -> Project Settings -> Player -> Other Settings -> Script Compilation")," using the ",(0,r.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/CustomScriptingSymbols.html"},"Custom scripting symbols")," guide and add ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM")),")."),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine SDK")," has been added to the project, but if you do not want to run ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine"),", you must turn off ",(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"USE_GAMIUM")),".")),(0,r.kt)("img",{src:a,style:{width:500}}),(0,r.kt)("h2",{id:"3-add-initialization-code"},"3. Add Initialization Code"),(0,r.kt)("p",null,"The following code can be added to run ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine"),".\n",(0,r.kt)("a",{parentName:"p",href:"server-configuration"},"ServerBuilder")," provides functions such as input mapping and event handler registration, and please refer to ",(0,r.kt)("a",{parentName:"p",href:"server-configuration"},"Server Configuration")," for more information."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-csharp"},"using System.Collections.Generic;\nusing Gamium;\nusing UnityEngine;\n\npublic class GamiumServerStarter\n{\n    [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]\n    private static void OnLoad()\n    {\n        new ServerBuilder().Run();\n    }\n}\n")),(0,r.kt)("h2",{id:"4-check-the-log"},"4. Check the log"),(0,r.kt)("p",null,"If the following log is output from the ",(0,r.kt)("inlineCode",{parentName:"p"},"Unity Editor"),", the ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Engine")," has been executed normally."),(0,r.kt)("img",{src:o,style:{width:500}}),(0,r.kt)("h2",{id:"5-build"},"5. Build"),(0,r.kt)("p",null,"Check ",(0,r.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/Manual/BuildSettings.html"},"Build Settings")," to create an executable after building unity.\nYou can proceed with test automation with that executable file."))}g.isMDXComponent=!0}}]);