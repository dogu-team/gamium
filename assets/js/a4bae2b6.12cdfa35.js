"use strict";(self.webpackChunkgamium_docs=self.webpackChunkgamium_docs||[]).push([[1209],{84:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>g});var r=n(3289);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var a=r.createContext({}),l=function(e){var t=r.useContext(a),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(a.Provider,{value:t},e.children)},s="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,a=e.parentName,u=d(e,["components","mdxType","originalType","parentName"]),s=l(n),m=o,g=s["".concat(a,".").concat(m)]||s[m]||p[m]||c;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,i=new Array(c);i[0]=m;var d={};for(var a in t)hasOwnProperty.call(t,a)&&(d[a]=t[a]);d.originalType=e,d[s]="string"==typeof e?e:o,i[1]=d;for(var l=2;l<c;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3305:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>c,metadata:()=>d,toc:()=>l});var r=n(4715),o=(n(3289),n(84));const c={sidebar_position:99,title:"ErrorCode",toc_max_heading_level:4},i="ErrorCode <s generated />",d={unversionedId:"api/client/typescript/enums/error-code",id:"api/client/typescript/enums/error-code",title:"ErrorCode",description:"Defines the error code that occurs in communication between the Gamium Engine and the Gamium Client.",source:"@site/docs/api/client/typescript/enums/error-code.mdx",sourceDirName:"api/client/typescript/enums",slug:"/api/client/typescript/enums/error-code",permalink:"/gamium/api/client/typescript/enums/error-code",draft:!1,editUrl:"https://github.com/dogu-team/gamium/tree/main/docs/docs/api/client/typescript/enums/error-code.mdx",tags:[],version:"current",sidebarPosition:99,frontMatter:{sidebar_position:99,title:"ErrorCode",toc_max_heading_level:4},sidebar:"apiSidebar",previous:{title:"UnityKeyboard",permalink:"/gamium/api/client/typescript/enums/unity-keyboard"},next:{title:"GamiumClient",permalink:"/gamium/api/client/python/classes/gamium-client"}},a={},l=[{value:"None <s generated />",id:"none-",level:4},{value:"Unknown <s generated />",id:"unknown-",level:4},{value:"Disconnected <s generated />",id:"disconnected-",level:4},{value:"Timeout <s generated />",id:"timeout-",level:4},{value:"SockerError <s generated />",id:"sockererror-",level:4},{value:"InternalError <s generated />",id:"internalerror-",level:4},{value:"InvalidParameter <s generated />",id:"invalidparameter-",level:4},{value:"MethodNotFound <s generated />",id:"methodnotfound-",level:4},{value:"ObjectNotFound <s generated />",id:"objectnotfound-",level:4},{value:"MultipleObjectFound <s generated />",id:"multipleobjectfound-",level:4},{value:"ObjectComponentNotFound <s generated />",id:"objectcomponentnotfound-",level:4},{value:"ObjectMultipleComponentFound <s generated />",id:"objectmultiplecomponentfound-",level:4},{value:"ObjectIsNotActive <s generated />",id:"objectisnotactive-",level:4},{value:"ObjectIsNotInteractable <s generated />",id:"objectisnotinteractable-",level:4},{value:"ObjectIsMoving <s generated />",id:"objectismoving-",level:4},{value:"ObjectSizeIsZero <s generated />",id:"objectsizeiszero-",level:4},{value:"ObjectNothingRaycasted <s generated />",id:"objectnothingraycasted-",level:4},{value:"ObjectRaycastedIsAnother <s generated />",id:"objectraycastedisanother-",level:4},{value:"InputNotAvailable <s generated />",id:"inputnotavailable-",level:4},{value:"ExecuteRpcFailed <s generated />",id:"executerpcfailed-",level:4},{value:"ExecuteRpcInvalidJson <s generated />",id:"executerpcinvalidjson-",level:4},{value:"ExecuteRpcInternalError <s generated />",id:"executerpcinternalerror-",level:4},{value:"ExecuteRpcClassNotFound <s generated />",id:"executerpcclassnotfound-",level:4},{value:"ExecuteRpcMultipleClassFound <s generated />",id:"executerpcmultipleclassfound-",level:4},{value:"ExecuteRpcMethodNotFound <s generated />",id:"executerpcmethodnotfound-",level:4},{value:"ExecuteRpcMultipleMethodFound <s generated />",id:"executerpcmultiplemethodfound-",level:4},{value:"ExecuteRpcMethodArgumentsLengthMismatch <s generated />",id:"executerpcmethodargumentslengthmismatch-",level:4},{value:"ExecuteRpcMethodArgumentTypeMismatch <s generated />",id:"executerpcmethodargumenttypemismatch-",level:4},{value:"ExecuteRpcFieldNotFound <s generated />",id:"executerpcfieldnotfound-",level:4},{value:"ExecuteRpcMultipleFieldFound <s generated />",id:"executerpcmultiplefieldfound-",level:4},{value:"ExecuteRpcPropertyNotFound <s generated />",id:"executerpcpropertynotfound-",level:4},{value:"ExecuteRpcMultiplePropertyFound <s generated />",id:"executerpcmultiplepropertyfound-",level:4},{value:"ExecuteRpcNotSupportedType <s generated />",id:"executerpcnotsupportedtype-",level:4}],u={toc:l},s="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(s,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"errorcode-"},"ErrorCode ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("p",null,"Defines the error code that occurs in communication between the Gamium Engine and the Gamium Client."),(0,o.kt)("h4",{id:"none-"},"None ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"unknown-"},"Unknown ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"disconnected-"},"Disconnected ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"timeout-"},"Timeout ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"sockererror-"},"SockerError ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"internalerror-"},"InternalError ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"invalidparameter-"},"InvalidParameter ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"methodnotfound-"},"MethodNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectnotfound-"},"ObjectNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"multipleobjectfound-"},"MultipleObjectFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectcomponentnotfound-"},"ObjectComponentNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectmultiplecomponentfound-"},"ObjectMultipleComponentFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectisnotactive-"},"ObjectIsNotActive ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectisnotinteractable-"},"ObjectIsNotInteractable ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectismoving-"},"ObjectIsMoving ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectsizeiszero-"},"ObjectSizeIsZero ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectnothingraycasted-"},"ObjectNothingRaycasted ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"objectraycastedisanother-"},"ObjectRaycastedIsAnother ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"inputnotavailable-"},"InputNotAvailable ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcfailed-"},"ExecuteRpcFailed ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcinvalidjson-"},"ExecuteRpcInvalidJson ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcinternalerror-"},"ExecuteRpcInternalError ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcclassnotfound-"},"ExecuteRpcClassNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmultipleclassfound-"},"ExecuteRpcMultipleClassFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmethodnotfound-"},"ExecuteRpcMethodNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmultiplemethodfound-"},"ExecuteRpcMultipleMethodFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmethodargumentslengthmismatch-"},"ExecuteRpcMethodArgumentsLengthMismatch ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmethodargumenttypemismatch-"},"ExecuteRpcMethodArgumentTypeMismatch ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcfieldnotfound-"},"ExecuteRpcFieldNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmultiplefieldfound-"},"ExecuteRpcMultipleFieldFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcpropertynotfound-"},"ExecuteRpcPropertyNotFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcmultiplepropertyfound-"},"ExecuteRpcMultiplePropertyFound ",(0,o.kt)("s",{generated:!0})),(0,o.kt)("h4",{id:"executerpcnotsupportedtype-"},"ExecuteRpcNotSupportedType ",(0,o.kt)("s",{generated:!0})))}p.isMDXComponent=!0}}]);