"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[8319],{84:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>b});var n=a(3289);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function i(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),s=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(a),d=r,b=p["".concat(c,".").concat(d)]||p[d]||m[d]||o;return a?n.createElement(b,l(l({ref:t},u),{},{components:a})):n.createElement(b,l({ref:t},u))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[p]="string"==typeof e?e:r,l[1]=i;for(var s=2;s<o;s++)l[s]=a[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},7196:(e,t,a)=>{a.d(t,{Z:()=>l});var n=a(3289),r=a(8795);const o={tabItem:"tabItem_rIKz"};function l(e){let{children:t,hidden:a,className:l}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,l),hidden:a},t)}},8682:(e,t,a)=>{a.d(t,{Z:()=>m});var n=a(4715),r=a(3289),o=a(8795),l=a(2277),i=a(9548),c=a(1207),s=a(5461);const u={tabList:"tabList_kfFW",tabItem:"tabItem_crRB"};function p(e){const{lazy:t,block:a,defaultValue:l,values:p,groupId:m,className:d}=e,b=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=p??b.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),f=(0,i.l)(h,((e,t)=>e.value===t.value));if(f.length>0)throw new Error(`Docusaurus error: Duplicate values "${f.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===l?l:l??b.find((e=>e.props.default))?.props.value??b[0].props.value;if(null!==y&&!h.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:v}=(0,c.U)(),[k,O]=(0,r.useState)(y),j=[],{blockElementScrollPositionUntilNextRender:N}=(0,s.o5)();if(null!=m){const e=g[m];null!=e&&e!==k&&h.some((t=>t.value===e))&&O(e)}const T=e=>{const t=e.currentTarget,a=j.indexOf(t),n=h[a].value;n!==k&&(N(t),O(n),null!=m&&v(m,String(n)))},w=e=>{let t=null;switch(e.key){case"Enter":T(e);break;case"ArrowRight":{const a=j.indexOf(e.currentTarget)+1;t=j[a]??j[0];break}case"ArrowLeft":{const a=j.indexOf(e.currentTarget)-1;t=j[a]??j[j.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u.tabList)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":a},d)},h.map((e=>{let{value:t,label:a,attributes:l}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:k===t?0:-1,"aria-selected":k===t,key:t,ref:e=>j.push(e),onKeyDown:w,onClick:T},l,{className:(0,o.Z)("tabs__item",u.tabItem,l?.className,{"tabs__item--active":k===t})}),a??t)}))),t?(0,r.cloneElement)(b.filter((e=>e.props.value===k))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==k})))))}function m(e){const t=(0,l.Z)();return r.createElement(p,(0,n.Z)({key:String(t)},e))}},612:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>b,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=a(4715),r=(a(3289),a(84)),o=a(8682),l=a(7196);const i={sidebar_position:2,title:"Query Object Path",toc_max_heading_level:4},c=void 0,s={unversionedId:"docs/client/object-path",id:"docs/client/object-path",title:"Query Object Path",description:"The Object path is used by the Gamium Client to query and manipulate the desired object.",source:"@site/docs/docs/client/object-path.mdx",sourceDirName:"docs/client",slug:"/docs/client/object-path",permalink:"/docs/client/object-path",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/docs/client/object-path.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Query Object Path",toc_max_heading_level:4},sidebar:"docsSidebar",previous:{title:"Write Test Script",permalink:"/docs/client/write-testscript"},next:{title:"Control UI",permalink:"/docs/client/ui"}},u={},p=[],m={toc:p},d="wrapper";function b(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},m,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"Object path")," is used by the ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Client")," to query and manipulate the desired object."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"The Object Path can be found using the methods below."),(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.dogutech.io/host-and-device/device/streaming-and-remote-control/game-ui-inspector"},(0,r.kt)("inlineCode",{parentName:"a"},"Console Inspector"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Unity")," - ",(0,r.kt)("a",{parentName:"li",href:"../../docs/engine/unity/query-objects"},(0,r.kt)("inlineCode",{parentName:"a"},"Gamium Editor"))))),(0,r.kt)("br",null),(0,r.kt)("p",null,"Below is an example of using ",(0,r.kt)("inlineCode",{parentName:"p"},"Object path")," in ",(0,r.kt)("inlineCode",{parentName:"p"},"Gamium Client"),"."),(0,r.kt)(o.Z,{groupId:"language",defaultValue:"ts",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const cameraObj = await gamium.find(By.path('/Main Camera[1]'));\n"))),(0,r.kt)(l.Z,{value:"py",label:"Python",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"cameraObj = gamium.find(By.path('/Main Camera[1]'))\n")))),(0,r.kt)("p",null,"In the example above, we are looking for a camera using the ",(0,r.kt)("inlineCode",{parentName:"p"},"Object path")," called '/Main Camera ","[1]","'. The reason for using the function ",(0,r.kt)("a",{parentName:"p",href:"../../api/client/typescript/classes/by"},(0,r.kt)("inlineCode",{parentName:"a"},"By.path()"))," is to inform you that you are searching through ",(0,r.kt)("inlineCode",{parentName:"p"},"Object path")," among the object search methods."),(0,r.kt)("br",null),(0,r.kt)("p",null,"Alternatively, you can find it using the tag as shown below."),(0,r.kt)(o.Z,{groupId:"language",defaultValue:"ts",mdxType:"Tabs"},(0,r.kt)(l.Z,{value:"ts",label:"TypeScript",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"const cameraObj = await gamium.find(By.tag('MainCamera'));\n"))),(0,r.kt)(l.Z,{value:"py",label:"Python",default:!0,mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"cameraObj = gamium.find(By.tag('MainCamera'))\n")))))}b.isMDXComponent=!0}}]);