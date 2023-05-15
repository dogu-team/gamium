"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[5723],{84:(e,t,a)=>{a.d(t,{Zo:()=>s,kt:()=>b});var n=a(3289);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var u=n.createContext({}),c=function(e){var t=n.useContext(u),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},s=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=c(a),d=r,b=m["".concat(u,".").concat(d)]||m[d]||p[d]||i;return a?n.createElement(b,o(o({ref:t},s),{},{components:a})):n.createElement(b,o({ref:t},s))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=d;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l[m]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=a[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7196:(e,t,a)=>{a.d(t,{Z:()=>o});var n=a(3289),r=a(8795);const i={tabItem:"tabItem_rIKz"};function o(e){let{children:t,hidden:a,className:o}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,o),hidden:a},t)}},8682:(e,t,a)=>{a.d(t,{Z:()=>p});var n=a(4715),r=a(3289),i=a(8795),o=a(2277),l=a(9548),u=a(1207),c=a(5461);const s={tabList:"tabList_kfFW",tabItem:"tabItem_crRB"};function m(e){const{lazy:t,block:a,defaultValue:o,values:m,groupId:p,className:d}=e,b=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=m??b.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),f=(0,l.l)(h,((e,t)=>e.value===t.value));if(f.length>0)throw new Error(`Docusaurus error: Duplicate values "${f.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===o?o:o??b.find((e=>e.props.default))?.props.value??b[0].props.value;if(null!==g&&!h.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:v}=(0,u.U)(),[k,O]=(0,r.useState)(g),j=[],{blockElementScrollPositionUntilNextRender:w}=(0,c.o5)();if(null!=p){const e=y[p];null!=e&&e!==k&&h.some((t=>t.value===e))&&O(e)}const T=e=>{const t=e.currentTarget,a=j.indexOf(t),n=h[a].value;n!==k&&(w(t),O(n),null!=p&&v(p,String(n)))},N=e=>{let t=null;switch(e.key){case"Enter":T(e);break;case"ArrowRight":{const a=j.indexOf(e.currentTarget)+1;t=j[a]??j[0];break}case"ArrowLeft":{const a=j.indexOf(e.currentTarget)-1;t=j[a]??j[j.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,i.Z)("tabs-container",s.tabList)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":a},d)},h.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:k===t?0:-1,"aria-selected":k===t,key:t,ref:e=>j.push(e),onKeyDown:N,onClick:T},o,{className:(0,i.Z)("tabs__item",s.tabItem,o?.className,{"tabs__item--active":k===t})}),a??t)}))),t?(0,r.cloneElement)(b.filter((e=>e.props.value===k))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==k})))))}function p(e){const t=(0,o.Z)();return r.createElement(m,(0,n.Z)({key:String(t)},e))}},8776:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>u,default:()=>b,frontMatter:()=>l,metadata:()=>c,toc:()=>m});var n=a(4715),r=(a(3289),a(84)),i=a(8682),o=a(7196);const l={sidebar_position:2,title:"Query Object Path",toc_max_heading_level:4},u=void 0,c={unversionedId:"gamium/client/object-path",id:"gamium/client/object-path",title:"Query Object Path",description:"The 'Object path' is used by the 'Gamium Client' to query and manipulate the desired object.",source:"@site/docs/gamium/client/object-path.mdx",sourceDirName:"gamium/client",slug:"/gamium/client/object-path",permalink:"/gamium/gamium/client/object-path",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/gamium/client/object-path.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Query Object Path",toc_max_heading_level:4},sidebar:"docsSidebar",previous:{title:"Write Test Script",permalink:"/gamium/gamium/client/write-testscript"},next:{title:"Control UI",permalink:"/gamium/gamium/client/ui"}},s={},m=[],p={toc:m},d="wrapper";function b(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The 'Object path' is used by the 'Gamium Client' to query and manipulate the desired object."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The Object Path can be found using the methods below."),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.dogutech.io/host-and-device/device/streaming-and-remote-control/game-ui-inspector"},(0,r.kt)("inlineCode",{parentName:"a"},"Console Inspector"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Unity")," - ",(0,r.kt)("a",{parentName:"li",href:"gamium/engine/unity/query-objects"},(0,r.kt)("inlineCode",{parentName:"a"},"Gamium Editor"))))),(0,r.kt)("br",null),(0,r.kt)("p",null,"Below is an example of using 'Object path' in 'Gamium Client'."),(0,r.kt)(i.Z,{groupId:"language",defaultValue:"ts",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const cameraObj = await gamium.findObject(By.path('/Main Camera[1]'));\n")))),(0,r.kt)("p",null,"In the example above, we are looking for a camera using the 'Object path' called '/Main Camera ","[1]","'. The reason for using the function ",(0,r.kt)("a",{parentName:"p",href:"api/client/typescript/classes/by"},(0,r.kt)("inlineCode",{parentName:"a"},"By.path()"))," is to inform you that you are searching through 'Object path' among the object search methods."),(0,r.kt)("br",null),(0,r.kt)("p",null,"Alternatively, you can find it using the tag as shown below."),(0,r.kt)(i.Z,{groupId:"language",defaultValue:"ts",mdxType:"Tabs"},(0,r.kt)(o.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const cameraObj = await gamium.findObject(By.tag('MainCamera'));\n")))))}b.isMDXComponent=!0}}]);