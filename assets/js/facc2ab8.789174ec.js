"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[7239],{7522:(e,t,n)=>{n.d(t,{Zo:()=>k,kt:()=>s});var r=n(9901);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var p=r.createContext({}),d=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},k=function(e){var t=d(e.components);return r.createElement(p.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,l=e.originalType,p=e.parentName,k=o(e,["components","mdxType","originalType","parentName"]),u=d(n),s=i,m=u["".concat(p,".").concat(s)]||u[s]||c[s]||l;return n?r.createElement(m,a(a({ref:t},k),{},{components:n})):r.createElement(m,a({ref:t},k))}));function s(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=n.length,a=new Array(l);a[0]=u;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o.mdxType="string"==typeof e?e:i,a[1]=o;for(var d=2;d<l;d++)a[d]=n[d];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1854:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var r=n(2875),i=(n(9901),n(7522));const l={id:"Network.Network-1",title:"Interface: Network",sidebar_label:"Network",custom_edit_url:null},a=void 0,o={unversionedId:"web3-redux-reference/interfaces/Network.Network-1",id:"web3-redux-reference/interfaces/Network.Network-1",title:"Interface: Network",description:"Network.Network",source:"@site/docs/web3-redux-reference/interfaces/Network.Network-1.md",sourceDirName:"web3-redux-reference/interfaces",slug:"/web3-redux-reference/interfaces/Network.Network-1",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Network.Network-1",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"Network.Network-1",title:"Interface: Network",sidebar_label:"Network",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"IpfsId",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Ipfs.IpfsId"},next:{title:"BlockSync",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.BlockSync"}},p={},d=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"ens",id:"ens",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"explorerApiClient",id:"explorerapiclient",level:3},{value:"Defined in",id:"defined-in-1",level:4},{value:"explorerApiKey",id:"explorerapikey",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"explorerApiUrl",id:"explorerapiurl",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"explorerUrl",id:"explorerurl",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"latestBlockNumber",id:"latestblocknumber",level:3},{value:"Defined in",id:"defined-in-5",level:4},{value:"name",id:"name",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"networkId",id:"networkid",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-7",level:4},{value:"web3",id:"web3",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"web3Rpc",id:"web3rpc",level:3},{value:"Defined in",id:"defined-in-9",level:4},{value:"web3Sender",id:"web3sender",level:3},{value:"Defined in",id:"defined-in-10",level:4}],k={toc:d};function c({components:e,...t}){return(0,i.kt)("wrapper",(0,r.Z)({},k,t,{components:e,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Network"},"Network"),".Network"),(0,i.kt)("p",null,"EVM Network object.\nOther objects are indexed on its networkId, and use it to fetch it to make requests using its web3.js connection."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"NetworkId")),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"Network"))))),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"ens"},"ens"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"ens"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Ens domain"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L43"},"src/network/model/interface.ts:43")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"explorerapiclient"},"explorerApiClient"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"explorerApiClient"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"Axios")),(0,i.kt)("p",null,"Block explorer API HTTP Client"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L41"},"src/network/model/interface.ts:41")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"explorerapikey"},"explorerApiKey"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"explorerApiKey"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Block explorer API key"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L39"},"src/network/model/interface.ts:39")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"explorerapiurl"},"explorerApiUrl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"explorerApiUrl"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Block explorer API url (eg. Etherscan) to use for indexed explorer data"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L37"},"src/network/model/interface.ts:37")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"explorerurl"},"explorerUrl"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"explorerUrl"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Block explorer (eg. Etherscan) to use for network."),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L35"},"src/network/model/interface.ts:35")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"latestblocknumber"},"latestBlockNumber"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"latestBlockNumber"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"number")),(0,i.kt)("p",null,"Latest block nummber. Updated via getBlockNumber() or middleware tracking block subscription updates."),(0,i.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L33"},"src/network/model/interface.ts:33")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"name"},"name"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"name"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Human readable name for the network"),(0,i.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L19"},"src/network/model/interface.ts:19")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"networkid"},"networkId"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"networkId"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Blockchain network id.\nSee ",(0,i.kt)("a",{parentName:"p",href:"https://chainlist.org/"},"chainlist")," for a list of networks."),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"NetworkId.networkId"),(0,i.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L9"},"src/network/model/interface.ts:9")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"web3"},"web3"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"web3"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"default")),(0,i.kt)("p",null,"Web3 object. We recommend using a websocket connection."),(0,i.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L23"},"src/network/model/interface.ts:23")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"web3rpc"},"web3Rpc"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"web3Rpc"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("p",null,"Web3 RPC URL (websocket recommended). Used to generate Web3 instance."),(0,i.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L21"},"src/network/model/interface.ts:21")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"web3sender"},"web3Sender"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,i.kt)("strong",{parentName:"p"},"web3Sender"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"default")),(0,i.kt)("p",null,"Web3 object specialized for sending transactions."),(0,i.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/network/model/interface.ts#L25"},"src/network/model/interface.ts:25")))}c.isMDXComponent=!0}}]);