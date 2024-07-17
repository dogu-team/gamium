"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[697],{84:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>h});var r=n(3289);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},m="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,u=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=c(n),p=i,h=m["".concat(u,".").concat(p)]||m[p]||s[p]||o;return n?r.createElement(h,a(a({ref:t},d),{},{components:n})):r.createElement(h,a({ref:t},d))}));function h(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=p;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[m]="string"==typeof e?e:i,a[1]=l;for(var c=2;c<o;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},3472:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>s,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=n(4715),i=(n(3289),n(84));const o={sidebar_position:2,title:"Using GamiumEditor"},a=void 0,l={unversionedId:"docs/engine/unity/query-objects",id:"docs/engine/unity/query-objects",title:"Using GamiumEditor",description:"This article describes how to understand the ObjectPath.",source:"@site/docs/docs/engine/unity/query-objects.mdx",sourceDirName:"docs/engine/unity",slug:"/docs/engine/unity/query-objects",permalink:"/gamium/docs/engine/unity/query-objects",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/engine/unity/query-objects.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Using GamiumEditor"},sidebar:"docsSidebar",previous:{title:"Configure Project",permalink:"/gamium/docs/engine/unity/project-configuration"},next:{title:"Configure Server",permalink:"/gamium/docs/engine/unity/server-configuration"}},u={},c=[{value:"Using the GamiumEditor Window",id:"using-the-gamiumeditor-window",level:2},{value:"GamiumEditor",id:"gamiumeditor",level:2}],d={toc:c},m="wrapper";function s(e){let{components:t,...n}=e;return(0,i.kt)(m,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"This article describes how to understand the ",(0,i.kt)("a",{parentName:"p",href:"../../client/object-path"},(0,i.kt)("inlineCode",{parentName:"a"},"ObjectPath")),".\nThis allows you to write scripts in the ",(0,i.kt)("inlineCode",{parentName:"p"},"Gamium Client"),"."),(0,i.kt)("admonition",{type:"info"},(0,i.kt)("p",{parentName:"admonition"},"The same functionality is available through the browser via the ",(0,i.kt)("a",{parentName:"p",href:"https://docs.dogutech.io/host-and-device/device/streaming-and-remote-control/game-ui-inspector"},(0,i.kt)("inlineCode",{parentName:"a"},"Console Inspector")),".")),(0,i.kt)("h2",{id:"using-the-gamiumeditor-window"},"Using the GamiumEditor Window"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"In an open Unity project, navigate to ",(0,i.kt)("inlineCode",{parentName:"li"},"Window > GamiumEditor"),"."),(0,i.kt)("li",{parentName:"ul"},"The Gamium window window is displayed.")),(0,i.kt)("h2",{id:"gamiumeditor"},"GamiumEditor"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Features"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"GameObjectPath"),(0,i.kt)("td",{parentName:"tr",align:null},"Identifier for searching for the selected GameObject in ",(0,i.kt)("a",{parentName:"td",href:"https://docs.unity3d.com/Manual/Hierarchy.html"},"The Hierarchy window"),". Changes are made each time GameObject is selected.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"UIElement Path"),(0,i.kt)("td",{parentName:"tr",align:null},"Identifier for retrieving the selected UIElement from the UI Toolkit Debugger. UI Toolkit Debugger can be opened from the ",(0,i.kt)("inlineCode",{parentName:"td"},"Window > UI Toolkit > Debugger")," menu. Changes are made every time you select a UIElement. ",(0,i.kt)("br",null),"(Used only if you implemented the UI through the UI Toolkit rather than the UGUI within a Unity project. )")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"World Position"),(0,i.kt)("td",{parentName:"tr",align:null},"World position of GameObject selected in The Hierarchy window.")),(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},"Position Picker"),(0,i.kt)("td",{parentName:"tr",align:null},"Use when you want to find out the world position of the mouse position in the Scene window. Because it uses Raycast, it only works when Collider is present on the Plane.")))),(0,i.kt)("admonition",{type:"tip"},(0,i.kt)("p",{parentName:"admonition"},"The fields in the GamiumEditor have their own functions and you can check the description when you hover the mouse.")))}s.isMDXComponent=!0}}]);