"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[1077],{84:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(3289);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),l=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(u.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=l(n),g=o,d=c["".concat(u,".").concat(g)]||c[g]||m[g]||i;return n?r.createElement(d,a(a({ref:t},p),{},{components:n})):r.createElement(d,a({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=g;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s[c]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9104:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>a,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(4715),o=(n(3289),n(84));const i={sidebar_position:9,toc_max_heading_level:4,title:"Issues In Gamium"},a="Issues In Gamium",s={unversionedId:"docs/contributing/issues",id:"docs/contributing/issues",title:"Issues In Gamium",description:"How to Contribute to Issues",source:"@site/docs/docs/contributing/issues.mdx",sourceDirName:"docs/contributing",slug:"/docs/contributing/issues",permalink:"/docs/contributing/issues",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/contributing/issues.mdx",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9,toc_max_heading_level:4,title:"Issues In Gamium"},sidebar:"docsSidebar",previous:{title:"Testing",permalink:"/docs/contributing/testing"},next:{title:"Pull Requests",permalink:"/docs/contributing/pull-requests"}},u={},l=[{value:"How to Contribute to Issues",id:"how-to-contribute-to-issues",level:4},{value:"Asking for General Help",id:"asking-for-general-help",level:4},{value:"Submitting a Bug Report",id:"submitting-a-bug-report",level:4},{value:"Triaging a Bug Report",id:"triaging-a-bug-report",level:4},{value:"Resolving a Bug Report",id:"resolving-a-bug-report",level:4}],p={toc:l},c="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(c,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"issues-in-gamium"},"Issues In Gamium"),(0,o.kt)("h4",{id:"how-to-contribute-to-issues"},"How to Contribute to Issues"),(0,o.kt)("p",null,"For any issue, there are fundamentally three ways an individual can contribute:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"By opening the issue for discussion: If you believe that you have found a new bug in Gamium, you should report it by creating a new issue in the ",(0,o.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium/issues"},(0,o.kt)("strong",{parentName:"a"},(0,o.kt)("inlineCode",{parentName:"strong"},"dogu-team/gamium")," issue tracker")),"."),(0,o.kt)("li",{parentName:"ol"},"By helping to triage the issue: You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue."),(0,o.kt)("li",{parentName:"ol"},"By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in dogu-team/gamium in a concrete and reviewable manner.")),(0,o.kt)("h4",{id:"asking-for-general-help"},"Asking for General Help"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://gamium.dogutech.io"},(0,o.kt)("strong",{parentName:"a"},"The Gamium website"))," has a list of resources for getting programming help, contributing, and more. please look at the document and use the issue tracker for unresolved issues."),(0,o.kt)("h4",{id:"submitting-a-bug-report"},"Submitting a Bug Report"),(0,o.kt)("p",null,"To submit a bug report:"),(0,o.kt)("p",null,"When opening a new issue in the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/dogu-team/gamium/issues"},(0,o.kt)("strong",{parentName:"a"},(0,o.kt)("inlineCode",{parentName:"strong"},"dogu-team/gamium")," issue tracker")),", users will be presented with a template that should be filled in."),(0,o.kt)("p",null,"If you believe that you have found a bug in Gamium, please fill out the template to the best of your ability."),(0,o.kt)("p",null,"The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced."),(0,o.kt)("p",null,"See ",(0,o.kt)("a",{parentName:"p",href:"https://stackoverflow.com/help/mcve"},(0,o.kt)("strong",{parentName:"a"},"How to create a Minimal, Complete, and Verifiable example")),"."),(0,o.kt)("h4",{id:"triaging-a-bug-report"},"Triaging a Bug Report"),(0,o.kt)("p",null,"It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional."),(0,o.kt)("p",null,"Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly."),(0,o.kt)("p",null,"Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain ",(0,o.kt)("em",{parentName:"p"},"why")," you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster."),(0,o.kt)("h4",{id:"resolving-a-bug-report"},"Resolving a Bug Report"),(0,o.kt)("p",null,"Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Gamium project."))}m.isMDXComponent=!0}}]);