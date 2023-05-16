"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[5584],{84:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>h});var n=a(3289);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),c=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(a),m=r,h=u["".concat(s,".").concat(m)]||u[m]||d[m]||l;return a?n.createElement(h,i(i({ref:t},p),{},{components:a})):n.createElement(h,i({ref:t},p))}));function h(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,i[1]=o;for(var c=2;c<l;c++)i[c]=a[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},4270:(e,t,a)=>{a.d(t,{Z:()=>b});var n=a(4715),r=a(3289),l=a(8795),i=a(2277),o=a(4008);const s={details:"details_YjHO",isBrowser:"isBrowser_JQgt",collapsibleContent:"collapsibleContent_WnUy"};function c(e){return!!e&&("SUMMARY"===e.tagName||c(e.parentElement))}function p(e,t){return!!e&&(e===t||p(e.parentElement,t))}function u(e){let{summary:t,children:a,...u}=e;const d=(0,i.Z)(),m=(0,r.useRef)(null),{collapsed:h,setCollapsed:b}=(0,o.u)({initialState:!u.open}),[k,f]=(0,r.useState)(u.open);return r.createElement("details",(0,n.Z)({},u,{ref:m,open:k,"data-collapsed":h,className:(0,l.Z)(s.details,d&&s.isBrowser,u.className),onMouseDown:e=>{c(e.target)&&e.detail>1&&e.preventDefault()},onClick:e=>{e.stopPropagation();const t=e.target;c(t)&&p(t,m.current)&&(e.preventDefault(),h?(b(!1),f(!0)):b(!0))}}),t??r.createElement("summary",null,"Details"),r.createElement(o.z,{lazy:!1,collapsed:h,disableSSRStyle:!0,onCollapseTransitionEnd:e=>{b(e),f(!e)}},r.createElement("div",{className:s.collapsibleContent},a)))}const d={details:"details_wnSW"},m="alert alert--info";function h(e){let{...t}=e;return r.createElement(u,(0,n.Z)({},t,{className:(0,l.Z)(m,d.details,t.className)}))}function b(e){const t=r.Children.toArray(e.children),a=t.find((e=>r.isValidElement(e)&&"summary"===e.props?.mdxType)),l=r.createElement(r.Fragment,null,t.filter((e=>e!==a)));return r.createElement(h,(0,n.Z)({},e,{summary:a}),l)}},7196:(e,t,a)=>{a.d(t,{Z:()=>i});var n=a(3289),r=a(8795);const l={tabItem:"tabItem_rIKz"};function i(e){let{children:t,hidden:a,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,r.Z)(l.tabItem,i),hidden:a},t)}},8682:(e,t,a)=>{a.d(t,{Z:()=>d});var n=a(4715),r=a(3289),l=a(8795),i=a(2277),o=a(9548),s=a(1207),c=a(5461);const p={tabList:"tabList_kfFW",tabItem:"tabItem_crRB"};function u(e){const{lazy:t,block:a,defaultValue:i,values:u,groupId:d,className:m}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=u??h.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),k=(0,o.l)(b,((e,t)=>e.value===t.value));if(k.length>0)throw new Error(`Docusaurus error: Duplicate values "${k.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const f=null===i?i:i??h.find((e=>e.props.default))?.props.value??h[0].props.value;if(null!==f&&!b.some((e=>e.value===f)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${f}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:v}=(0,s.U)(),[N,y]=(0,r.useState)(f),w=[],{blockElementScrollPositionUntilNextRender:O}=(0,c.o5)();if(null!=d){const e=g[d];null!=e&&e!==N&&b.some((t=>t.value===e))&&y(e)}const E=e=>{const t=e.currentTarget,a=w.indexOf(t),n=b[a].value;n!==N&&(O(t),y(n),null!=d&&v(d,String(n)))},P=e=>{let t=null;switch(e.key){case"Enter":E(e);break;case"ArrowRight":{const a=w.indexOf(e.currentTarget)+1;t=w[a]??w[0];break}case"ArrowLeft":{const a=w.indexOf(e.currentTarget)-1;t=w[a]??w[w.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,l.Z)("tabs-container",p.tabList)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":a},m)},b.map((e=>{let{value:t,label:a,attributes:i}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:N===t?0:-1,"aria-selected":N===t,key:t,ref:e=>w.push(e),onKeyDown:P,onClick:E},i,{className:(0,l.Z)("tabs__item",p.tabItem,i?.className,{"tabs__item--active":N===t})}),a??t)}))),t?(0,r.cloneElement)(h.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function d(e){const t=(0,i.Z)();return r.createElement(u,(0,n.Z)({key:String(t)},e))}},6716:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>p});var n=a(4715),r=(a(3289),a(84)),l=(a(8682),a(7196),a(4270));const i={sidebar_position:3,title:"Real Device"},o=void 0,s={unversionedId:"gamium/get-started/real-device",id:"gamium/get-started/real-device",title:"Real Device",description:"Gamium connection is possible not only on the editor but also on the actual built app.",source:"@site/docs/gamium/get-started/real-device.mdx",sourceDirName:"gamium/get-started",slug:"/gamium/get-started/real-device",permalink:"/gamium/get-started/real-device",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/gamium/get-started/real-device.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Real Device"},sidebar:"docsSidebar",previous:{title:"Quick Start",permalink:"/gamium/get-started/quick-start"},next:{title:"Configure Project",permalink:"/gamium/engine/unity/project-configuration"}},c={},p=[{value:"Build",id:"build",level:3},{value:"Prepare connect",id:"prepare-connect",level:3},{value:"Port forward",id:"port-forward",level:4},{value:"Device to PC",id:"device-to-pc",level:4},{value:"Install adb",id:"install-adb",level:4},{value:"adb forward",id:"adb-forward",level:4},{value:"Device to PC",id:"device-to-pc-1",level:4},{value:"Install mobiledevice",id:"install-mobiledevice",level:4},{value:"mobiledevice forward",id:"mobiledevice-forward",level:4},{value:"Connect to the engine",id:"connect-to-the-engine",level:3}],u={toc:p},d="wrapper";function m(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Gamium connection is possible not only on the editor but also on the actual built app."),(0,r.kt)("h3",{id:"build"},"Build"),(0,r.kt)("p",null,"First, build it with the gamium engine sdk included and make an executable file.\nFor example, please create an executable file with the following file extension"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Platform"),(0,r.kt)("th",{parentName:"tr",align:null},"File Extension"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Windows"),(0,r.kt)("td",{parentName:"tr",align:null},".exe")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"macOS"),(0,r.kt)("td",{parentName:"tr",align:null},".app")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Android"),(0,r.kt)("td",{parentName:"tr",align:null},".apk .aab")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"iOS"),(0,r.kt)("td",{parentName:"tr",align:null},".ipa")))),(0,r.kt)("h3",{id:"prepare-connect"},"Prepare connect"),(0,r.kt)("h4",{id:"port-forward"},"Port forward"),(0,r.kt)("p",null,"In an environment where the gamium client and the app run on the same device, forward is not required. ( ex. Windows, macOS )"),(0,r.kt)("p",null,"However, mobile devices such as Android and iOS need port forwarding to connect to the network.\nThis will be explained in the following sections."),(0,r.kt)(l.Z,{mdxType:"Details"},(0,r.kt)("summary",{mdxType:"summary"},"Android"),(0,r.kt)("h4",{id:"device-to-pc"},"Device to PC"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Please connect the Android device and PC with a USB cable, and keep it connected."),(0,r.kt)("li",{parentName:"ul"},"Please use a USB cable that supports data transfer."),(0,r.kt)("li",{parentName:"ul"},"Enable Developer Options"),(0,r.kt)("li",{parentName:"ul"},"Enable USB Debugging"),(0,r.kt)("li",{parentName:"ul"},'When the message "Do you want to allow USB debugging?" appears on the Android device screen, always check Allow on this computer and click OK to accept it.')),(0,r.kt)("h4",{id:"install-adb"},"Install ",(0,r.kt)("a",{parentName:"h4",href:"https://developer.android.com/tools/adb"},"adb")),(0,r.kt)("p",null,"You need a tool called adb. If you already have adb installed, you can skip this course. If not please install ",(0,r.kt)("a",{parentName:"p",href:"https://developer.android.com/tools/releases/platform-tools"},"Android Platform Tools")," on your PC."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Run a shell such as CMD, Terminal, etc. on your PC.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Navigate to the decompressed platform tools folder")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Please check if the connected device comes out when executing the command below"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./adb devices\n")),(0,r.kt)("p",{parentName:"li"},"If the output is as shown below, the device connection is successful."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"List of devices attached\nSOMETHING_LIKE_ID    device\n")))),(0,r.kt)("h4",{id:"adb-forward"},"adb forward"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Please execute the command below to port forward."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./adb forward tcp:50061 tcp:50061\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Please check whether port forward is completed"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./adb forward --list\n")),(0,r.kt)("p",{parentName:"li"},"If it's printed as below, it's done."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SOMETHING_LIKE_ID tcp:50061 tcp:50061\n"))))),(0,r.kt)(l.Z,{mdxType:"Details"},(0,r.kt)("summary",{mdxType:"summary"},"iOS"),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"iOS devices can only be connected if the PC is macOS.")),(0,r.kt)("h4",{id:"device-to-pc-1"},"Device to PC"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Please connect the iOS device and macOS PC with a USB cable, and keep it connected."),(0,r.kt)("li",{parentName:"ul"},"Please use a USB cable that supports data transfer.")),(0,r.kt)("h4",{id:"install-mobiledevice"},"Install ",(0,r.kt)("a",{parentName:"h4",href:"https://github.com/imkira/mobiledevice"},"mobiledevice")),(0,r.kt)("p",null,"There may be various methods for iOS port forwarding, but we prefer to use the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/imkira/mobiledevice"},"mobiledevice"),".\nIf you already have mobiledevice installed, you can skip this course. If not please install ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/imkira/mobiledevice"},"mobiledevice")," on your PC."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Run a shell such as Terminal, etc. on your PC.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Please check if the connected device comes out when executing the command below"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mobiledevice list_devices\n")),(0,r.kt)("p",{parentName:"li"},"If the output is as shown below, the device connection is successful."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"SOMETHING_LIKE_ID\n")))),(0,r.kt)("h4",{id:"mobiledevice-forward"},"mobiledevice forward"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Please execute the command below to port forward."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"./mobiledevice tunnel 50061 50061\n")),(0,r.kt)("p",{parentName:"li"},"If it is printed as below, the forwarding is in progress. ",(0,r.kt)("inlineCode",{parentName:"p"},"Please keep the window without closing the terminal"),". Closing the window interrupts forwarding."),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"Tunneling from local port 50061 to device port 50061...\n"))))),(0,r.kt)("h3",{id:"connect-to-the-engine"},"Connect to the engine"),(0,r.kt)("p",null,"Install the built executables and run them on the machine. (For example, run .exe for Windows, and run the app after installing .apk for Android)"),(0,r.kt)("p",null,"After that, it's the same process that we did at ",(0,r.kt)("a",{parentName:"p",href:"quick-start#connect-to-the-engine"},"Quickstart")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Clone the ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/dogu-team/gamium-unity-samples"},"gamium-unity-samples")," git repository."),(0,r.kt)("li",{parentName:"ul"},"Open the ",(0,r.kt)("inlineCode",{parentName:"li"},"gamium-unity-samples/client/typescript")," directory with Visual Studio Code."),(0,r.kt)("li",{parentName:"ul"},"Open the terminal and execute the following command.",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"This command initializes the automation script project, connects to the running gamium engine, and runs the automation script.")))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"yarn install\nyarn run:DoguRpgSample\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"If the connection is not working properly. Please check the log. The message ",(0,r.kt)("inlineCode",{parentName:"p"},'"Gamium Engine Update Running"')," should be printed.",(0,r.kt)("br",{parentName:"p"}),"\n","The log path for programs built through Unity can be found in ",(0,r.kt)("a",{parentName:"p",href:"https://docs.unity3d.com/2021.3/Documentation/Manual/LogFiles.html"},"here"),'. Check out "Player-related log locations" section')))}m.isMDXComponent=!0}}]);