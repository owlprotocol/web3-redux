"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[8636],{7522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>u});var a=n(9901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function d(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},o={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=d(e,["components","mdxType","originalType","parentName"]),k=c(n),u=r,m=k["".concat(s,".").concat(u)]||k[u]||o[u]||i;return n?a.createElement(m,l(l({ref:t},p),{},{components:n})):a.createElement(m,l({ref:t},p))}));function u(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=k;var d={};for(var s in t)hasOwnProperty.call(t,s)&&(d[s]=t[s]);d.originalType=e,d.mdxType="string"==typeof e?e:r,l[1]=d;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},3383:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>o,frontMatter:()=>i,metadata:()=>d,toc:()=>c});var a=n(2875),r=(n(9901),n(7522));const i={id:"Sync",title:"Namespace: Sync",sidebar_label:"Sync",sidebar_position:0,custom_edit_url:null},l=void 0,d={unversionedId:"web3-redux-reference/namespaces/Sync",id:"web3-redux-reference/namespaces/Sync",title:"Namespace: Sync",description:"Comments on Sync module",source:"@site/docs/web3-redux-reference/namespaces/Sync.md",sourceDirName:"web3-redux-reference/namespaces",slug:"/web3-redux-reference/namespaces/Sync",permalink:"/web3-redux/docs/web3-redux-reference/namespaces/Sync",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"Sync",title:"Namespace: Sync",sidebar_label:"Sync",sidebar_position:0,custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"Network",permalink:"/web3-redux/docs/web3-redux-reference/namespaces/Network"},next:{title:"TestData",permalink:"/web3-redux/docs/web3-redux-reference/namespaces/TestData"}},s={},c=[{value:"Interfaces",id:"interfaces",level:2},{value:"Actions Variables",id:"actions-variables",level:2},{value:"Other Variables",id:"other-variables",level:2},{value:"Actions Functions",id:"actions-functions",level:2},{value:"Other Functions",id:"other-functions",level:2},{value:"Selectors Functions",id:"selectors-functions",level:2},{value:"Type aliases",id:"type-aliases",level:2},{value:"Action",id:"action",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"CreateAction",id:"createaction",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"GenericSync",id:"genericsync",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"ReducerAction",id:"reduceraction",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"RemoveAction",id:"removeaction",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"Sync",id:"sync",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"UpdateAction",id:"updateaction",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"Actions Variables",id:"actions-variables-1",level:2},{value:"create",id:"create",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"remove",id:"remove",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"update",id:"update",level:3},{value:"Defined in",id:"defined-in-9",level:4},{value:"Other Variables",id:"other-variables-1",level:2},{value:"CREATE",id:"create-1",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"REMOVE",id:"remove-1",level:3},{value:"Defined in",id:"defined-in-11",level:4},{value:"UPDATE",id:"update-1",level:3},{value:"Defined in",id:"defined-in-12",level:4},{value:"Actions Functions",id:"actions-functions-1",level:2},{value:"createSyncForActions",id:"createsyncforactions",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Returns",id:"returns",level:4},{value:"Defined in",id:"defined-in-13",level:4},{value:"Other Functions",id:"other-functions-1",level:2},{value:"isAction",id:"isaction",level:3},{value:"Parameters",id:"parameters-1",level:4},{value:"Returns",id:"returns-1",level:4},{value:"Defined in",id:"defined-in-14",level:4},{value:"isCreateAction",id:"iscreateaction",level:3},{value:"Parameters",id:"parameters-2",level:4},{value:"Returns",id:"returns-2",level:4},{value:"Defined in",id:"defined-in-15",level:4},{value:"isReducerAction",id:"isreduceraction",level:3},{value:"Parameters",id:"parameters-3",level:4},{value:"Returns",id:"returns-3",level:4},{value:"Defined in",id:"defined-in-16",level:4},{value:"isRemoveAction",id:"isremoveaction",level:3},{value:"Parameters",id:"parameters-4",level:4},{value:"Returns",id:"returns-4",level:4},{value:"Defined in",id:"defined-in-17",level:4},{value:"isUpdateAction",id:"isupdateaction",level:3},{value:"Parameters",id:"parameters-5",level:4},{value:"Returns",id:"returns-5",level:4},{value:"Defined in",id:"defined-in-18",level:4},{value:"reducer",id:"reducer",level:3},{value:"Parameters",id:"parameters-6",level:4},{value:"Returns",id:"returns-6",level:4},{value:"Defined in",id:"defined-in-19",level:4},{value:"Selectors Functions",id:"selectors-functions-1",level:2},{value:"selectByIdExists",id:"selectbyidexists",level:3},{value:"Parameters",id:"parameters-7",level:4},{value:"Returns",id:"returns-7",level:4},{value:"Defined in",id:"defined-in-20",level:4},{value:"selectByIdMany",id:"selectbyidmany",level:3},{value:"Parameters",id:"parameters-8",level:4},{value:"Returns",id:"returns-8",level:4},{value:"Defined in",id:"defined-in-21",level:4},{value:"selectByIdSingle",id:"selectbyidsingle",level:3},{value:"Parameters",id:"parameters-9",level:4},{value:"Returns",id:"returns-9",level:4},{value:"Defined in",id:"defined-in-22",level:4}],p={toc:c};function o({components:e,...t}){return(0,r.kt)("wrapper",(0,a.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"Comments on Sync module"),(0,r.kt)("h2",{id:"interfaces"},"Interfaces"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.BlockSync"},"BlockSync")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.EventSync"},"EventSync")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.TransactionSync"},"TransactionSync"))),(0,r.kt)("h2",{id:"actions-variables"},"Actions Variables"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#create"},"create")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#remove"},"remove")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#update"},"update"))),(0,r.kt)("h2",{id:"other-variables"},"Other Variables"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#create"},"CREATE")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#remove"},"REMOVE")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#update"},"UPDATE"))),(0,r.kt)("h2",{id:"actions-functions"},"Actions Functions"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#createsyncforactions"},"createSyncForActions"))),(0,r.kt)("h2",{id:"other-functions"},"Other Functions"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#isaction"},"isAction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#iscreateaction"},"isCreateAction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#isreduceraction"},"isReducerAction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#isremoveaction"},"isRemoveAction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#isupdateaction"},"isUpdateAction")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#reducer"},"reducer"))),(0,r.kt)("h2",{id:"selectors-functions"},"Selectors Functions"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#selectbyidexists"},"selectByIdExists")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#selectbyidmany"},"selectByIdMany")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#selectbyidsingle"},"selectByIdSingle"))),(0,r.kt)("h2",{id:"type-aliases"},"Type aliases"),(0,r.kt)("h3",{id:"action"},"Action"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"Action"),": ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#reduceraction"},(0,r.kt)("inlineCode",{parentName:"a"},"ReducerAction"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/index.ts#L13"},"src/sync/actions/index.ts:13")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"createaction"},"CreateAction"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"CreateAction"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#create"},(0,r.kt)("inlineCode",{parentName:"a"},"create")),">"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/create.ts#L11"},"src/sync/actions/create.ts:11")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"genericsync"},"GenericSync"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"GenericSync"),": ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.EventSync"},(0,r.kt)("inlineCode",{parentName:"a"},"EventSync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"Block"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"Transaction"')," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"number")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},'"once"')),(0,r.kt)("p",null,"Sync Middleware Type + simplified notation"),(0,r.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/model/index.ts#L15"},"src/sync/model/index.ts:15")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"reduceraction"},"ReducerAction"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"ReducerAction"),": ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#createaction"},(0,r.kt)("inlineCode",{parentName:"a"},"CreateAction"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#removeaction"},(0,r.kt)("inlineCode",{parentName:"a"},"RemoveAction"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#updateaction"},(0,r.kt)("inlineCode",{parentName:"a"},"UpdateAction"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/index.ts#L6"},"src/sync/actions/index.ts:6")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"removeaction"},"RemoveAction"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"RemoveAction"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#remove"},(0,r.kt)("inlineCode",{parentName:"a"},"remove")),">"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/remove.ts#L10"},"src/sync/actions/remove.ts:10")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"sync"},"Sync"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"Sync"),": ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.BlockSync"},(0,r.kt)("inlineCode",{parentName:"a"},"BlockSync"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.TransactionSync"},(0,r.kt)("inlineCode",{parentName:"a"},"TransactionSync"))," ","|"," ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.EventSync"},(0,r.kt)("inlineCode",{parentName:"a"},"EventSync"))),(0,r.kt)("p",null,"Sync Middleware Type"),(0,r.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/model/index.ts#L9"},"src/sync/model/index.ts:9")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"updateaction"},"UpdateAction"),(0,r.kt)("p",null,"\u01ac ",(0,r.kt)("strong",{parentName:"p"},"UpdateAction"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ReturnType"),"<typeof ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#update"},(0,r.kt)("inlineCode",{parentName:"a"},"update")),">"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/update.ts#L11"},"src/sync/actions/update.ts:11")),(0,r.kt)("h2",{id:"actions-variables-1"},"Actions Variables"),(0,r.kt)("h3",{id:"create"},"create"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"create"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ActionCreatorWithPayload"),"<",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync")),", ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,r.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/create.ts#L8"},"src/sync/actions/create.ts:8")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"remove"},"remove"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"remove"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ActionCreatorWithPayload"),"<",(0,r.kt)("inlineCode",{parentName:"p"},"string"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,r.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/remove.ts#L7"},"src/sync/actions/remove.ts:7")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"update"},"update"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"update"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"ActionCreatorWithPayload"),"<",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync")),", ",(0,r.kt)("inlineCode",{parentName:"p"},"string"),">"),(0,r.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/update.ts#L8"},"src/sync/actions/update.ts:8")),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"other-variables-1"},"Other Variables"),(0,r.kt)("h3",{id:"create-1"},"CREATE"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"CREATE"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/create.ts#L6"},"src/sync/actions/create.ts:6")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"remove-1"},"REMOVE"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"REMOVE"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/remove.ts#L5"},"src/sync/actions/remove.ts:5")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"update-1"},"UPDATE"),(0,r.kt)("p",null,"\u2022 ",(0,r.kt)("inlineCode",{parentName:"p"},"Const")," ",(0,r.kt)("strong",{parentName:"p"},"UPDATE"),": ",(0,r.kt)("inlineCode",{parentName:"p"},"string")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/update.ts#L6"},"src/sync/actions/update.ts:6")),(0,r.kt)("h2",{id:"actions-functions-1"},"Actions Functions"),(0,r.kt)("h3",{id:"createsyncforactions"},"createSyncForActions"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"createSyncForActions"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"networkId"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"actions"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"sync"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"address"),"): ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")),(0,r.kt)("p",null,"Create a Sync object from generic parameters"),(0,r.kt)("h4",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"networkId")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"actions")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"AnyAction"),"[]")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"sync")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#genericsync"},(0,r.kt)("inlineCode",{parentName:"a"},"GenericSync")))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"address")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")),(0,r.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/model/index.ts#L20"},"src/sync/model/index.ts:20")),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"other-functions-1"},"Other Functions"),(0,r.kt)("h3",{id:"isaction"},"isAction"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isAction"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): action is ReducerAction"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"parameters-1"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Object"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action.type")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-1"},"Returns"),(0,r.kt)("p",null,"action is ReducerAction"),(0,r.kt)("h4",{id:"defined-in-14"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/index.ts#L15"},"src/sync/actions/index.ts:15")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"iscreateaction"},"isCreateAction"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isCreateAction"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): action is Object"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"parameters-2"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Action"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"unknown"),">")))),(0,r.kt)("h4",{id:"returns-2"},"Returns"),(0,r.kt)("p",null,"action is Object"),(0,r.kt)("h4",{id:"defined-in-15"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/create.ts#L13"},"src/sync/actions/create.ts:13")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"isreduceraction"},"isReducerAction"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isReducerAction"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): action is ReducerAction"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"parameters-3"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Object"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action.type")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-3"},"Returns"),(0,r.kt)("p",null,"action is ReducerAction"),(0,r.kt)("h4",{id:"defined-in-16"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/index.ts#L8"},"src/sync/actions/index.ts:8")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"isremoveaction"},"isRemoveAction"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isRemoveAction"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): action is Object"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"parameters-4"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Action"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"unknown"),">")))),(0,r.kt)("h4",{id:"returns-4"},"Returns"),(0,r.kt)("p",null,"action is Object"),(0,r.kt)("h4",{id:"defined-in-17"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/remove.ts#L12"},"src/sync/actions/remove.ts:12")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"isupdateaction"},"isUpdateAction"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"isUpdateAction"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): action is Object"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("inlineCode",{parentName:"strong"},"internal"))),(0,r.kt)("h4",{id:"parameters-5"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"Action"),"<",(0,r.kt)("inlineCode",{parentName:"td"},"unknown"),">")))),(0,r.kt)("h4",{id:"returns-5"},"Returns"),(0,r.kt)("p",null,"action is Object"),(0,r.kt)("h4",{id:"defined-in-18"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/actions/update.ts#L13"},"src/sync/actions/update.ts:13")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"reducer"},"reducer"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"reducer"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"sess"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"action"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"any")),(0,r.kt)("h4",{id:"parameters-6"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"sess")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"action")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("a",{parentName:"td",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#reduceraction"},(0,r.kt)("inlineCode",{parentName:"a"},"ReducerAction")))))),(0,r.kt)("h4",{id:"returns-6"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"any")),(0,r.kt)("h4",{id:"defined-in-19"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/reducer.ts#L3"},"src/sync/reducer.ts:3")),(0,r.kt)("hr",null),(0,r.kt)("h2",{id:"selectors-functions-1"},"Selectors Functions"),(0,r.kt)("h3",{id:"selectbyidexists"},"selectByIdExists"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"selectByIdExists"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"state"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"parameters-7"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"state")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"id")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"undefined")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-7"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"boolean")),(0,r.kt)("h4",{id:"defined-in-20"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/selector/selectByIdExists.ts#L4"},"src/sync/selector/selectByIdExists.ts:4")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"selectbyidmany"},"selectByIdMany"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"selectByIdMany"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"state"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"ids?"),"): (",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),")[]"),(0,r.kt)("h4",{id:"parameters-8"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"state")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"ids?")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"string"),"[]")))),(0,r.kt)("h4",{id:"returns-8"},"Returns"),(0,r.kt)("p",null,"(",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"null"),")[]"),(0,r.kt)("h4",{id:"defined-in-21"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/selector/selectByIdMany.ts#L5"},"src/sync/selector/selectByIdMany.ts:5")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"selectbyidsingle"},"selectByIdSingle"),(0,r.kt)("p",null,"\u25b8 ",(0,r.kt)("strong",{parentName:"p"},"selectByIdSingle"),"(",(0,r.kt)("inlineCode",{parentName:"p"},"state"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"id"),"): ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")),(0,r.kt)("h4",{id:"parameters-9"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,r.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"state")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"any"))),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"id")),(0,r.kt)("td",{parentName:"tr",align:"left"},(0,r.kt)("inlineCode",{parentName:"td"},"undefined")," ","|"," ",(0,r.kt)("inlineCode",{parentName:"td"},"string"))))),(0,r.kt)("h4",{id:"returns-9"},"Returns"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},(0,r.kt)("inlineCode",{parentName:"a"},"Sync"))," ","|"," ",(0,r.kt)("inlineCode",{parentName:"p"},"undefined")),(0,r.kt)("h4",{id:"defined-in-22"},"Defined in"),(0,r.kt)("p",null,(0,r.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/sync/selector/selectByIdSingle.ts#L5"},"src/sync/selector/selectByIdSingle.ts:5")))}o.isMDXComponent=!0}}]);