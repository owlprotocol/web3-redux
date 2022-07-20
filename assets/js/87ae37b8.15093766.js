"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[2535],{7522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>k});var r=n(9901);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var d=r.createContext({}),c=function(e){var t=r.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(d.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,d=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=c(n),k=a,f=u["".concat(d,".").concat(k)]||u[k]||s[k]||i;return n?r.createElement(f,l(l({ref:t},p),{},{components:n})):r.createElement(f,l({ref:t},p))}));function k(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var d in t)hasOwnProperty.call(t,d)&&(o[d]=t[d]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8489:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var r=n(2875),a=(n(9901),n(7522));const i={id:"Contract.Contract-1",title:"Interface: Contract<T>",sidebar_label:"Contract",custom_edit_url:null},l=void 0,o={unversionedId:"web3-redux-reference/interfaces/Contract.Contract-1",id:"web3-redux-reference/interfaces/Contract.Contract-1",title:"Interface: Contract<T>",description:"Contract.Contract",source:"@site/docs/web3-redux-reference/interfaces/Contract.Contract-1.md",sourceDirName:"web3-redux-reference/interfaces",slug:"/web3-redux-reference/interfaces/Contract.Contract-1",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.Contract-1",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"Contract.Contract-1",title:"Interface: Contract<T>",sidebar_label:"Contract",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"CallArgsHash",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.CallArgsHash"},next:{title:"ContractId",permalink:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId"}},d={},c=[{value:"Type parameters",id:"type-parameters",level:2},{value:"Hierarchy",id:"hierarchy",level:2},{value:"Properties",id:"properties",level:2},{value:"abi",id:"abi",level:3},{value:"Defined in",id:"defined-in",level:4},{value:"address",id:"address",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"balance",id:"balance",level:3},{value:"Defined in",id:"defined-in-2",level:4},{value:"code",id:"code",level:3},{value:"Defined in",id:"defined-in-3",level:4},{value:"ens",id:"ens",level:3},{value:"Defined in",id:"defined-in-4",level:4},{value:"eventAbiBySignature",id:"eventabibysignature",level:3},{value:"Index signature",id:"index-signature",level:4},{value:"Defined in",id:"defined-in-5",level:4},{value:"fromTransactions",id:"fromtransactions",level:3},{value:"Defined in",id:"defined-in-6",level:4},{value:"id",id:"id",level:3},{value:"Defined in",id:"defined-in-7",level:4},{value:"label",id:"label",level:3},{value:"Defined in",id:"defined-in-8",level:4},{value:"networkId",id:"networkid",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-9",level:4},{value:"nonce",id:"nonce",level:3},{value:"Defined in",id:"defined-in-10",level:4},{value:"toTransactions",id:"totransactions",level:3},{value:"Defined in",id:"defined-in-11",level:4},{value:"web3Contract",id:"web3contract",level:3},{value:"Defined in",id:"defined-in-12",level:4},{value:"web3SenderContract",id:"web3sendercontract",level:3},{value:"Defined in",id:"defined-in-13",level:4}],p={toc:c};function s({components:e,...t}){return(0,a.kt)("wrapper",(0,r.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Contract"},"Contract"),".Contract"),(0,a.kt)("p",null,"Contract object."),(0,a.kt)("h2",{id:"type-parameters"},"Type parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Type"),(0,a.kt)("th",{parentName:"tr",align:"left"},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("inlineCode",{parentName:"td"},"T")),(0,a.kt)("td",{parentName:"tr",align:"left"},"extends ",(0,a.kt)("a",{parentName:"td",href:"/web3-redux/docs/web3-redux-reference/namespaces/Contract#baseweb3contract"},(0,a.kt)("inlineCode",{parentName:"a"},"BaseWeb3Contract"))," = ",(0,a.kt)("a",{parentName:"td",href:"/web3-redux/docs/web3-redux-reference/namespaces/Contract#baseweb3contract"},(0,a.kt)("inlineCode",{parentName:"a"},"BaseWeb3Contract"))),(0,a.kt)("td",{parentName:"tr",align:"left"},(0,a.kt)("a",{parentName:"td",href:"https://github.com/dethcrypto/TypeChain"},"TypeChain")," web3.js contract. Enables getting type inference for calls and events. Defaults to standard Web3.js contract interface.")))),(0,a.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId"},(0,a.kt)("inlineCode",{parentName:"a"},"ContractId"))),(0,a.kt)("p",{parentName:"li"},"\u21b3 ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("inlineCode",{parentName:"strong"},"Contract"))))),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)("h3",{id:"abi"},"abi"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"abi"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"AbiItem"),"[]"),(0,a.kt)("p",null,"Contract ABI"),(0,a.kt)("h4",{id:"defined-in"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L32"},"src/contract/model/interface.ts:32")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"address"},"address"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"address"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Contract ethereum address"),(0,a.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId"},"ContractId"),".",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId#address"},"address")),(0,a.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L17"},"src/contract/model/interface.ts:17")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"balance"},"balance"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"balance"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Account balance in wei"),(0,a.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L38"},"src/contract/model/interface.ts:38")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"code"},"code"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"code"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Code stored at address"),(0,a.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L42"},"src/contract/model/interface.ts:42")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"ens"},"ens"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"ens"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Ens domain associated with address"),(0,a.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L44"},"src/contract/model/interface.ts:44")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"eventabibysignature"},"eventAbiBySignature"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"eventAbiBySignature"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"Object")),(0,a.kt)("p",null,"Event abis indexed by signature"),(0,a.kt)("h4",{id:"index-signature"},"Index signature"),(0,a.kt)("p",null,"\u25aa ","[k: ",(0,a.kt)("inlineCode",{parentName:"p"},"string"),"]",": ",(0,a.kt)("inlineCode",{parentName:"p"},"AbiItem")),(0,a.kt)("h4",{id:"defined-in-5"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L48"},"src/contract/model/interface.ts:48")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"fromtransactions"},"fromTransactions"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"fromTransactions"),": ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Transaction.Transaction-1"},(0,a.kt)("inlineCode",{parentName:"a"},"Transaction")),"[]"),(0,a.kt)("p",null,"ORM Relational"),(0,a.kt)("h4",{id:"defined-in-6"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L51"},"src/contract/model/interface.ts:51")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"id"},"id"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"id"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Used to index contracts in redux-orm. Computed as ",(0,a.kt)("inlineCode",{parentName:"p"},"${networkId}-${address}")),(0,a.kt)("h4",{id:"defined-in-7"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L30"},"src/contract/model/interface.ts:30")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"label"},"label"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"label"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Custom label set by user for address"),(0,a.kt)("h4",{id:"defined-in-8"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L46"},"src/contract/model/interface.ts:46")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"networkid"},"networkId"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"networkId"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"string")),(0,a.kt)("p",null,"Blockchain network id.\nSee ",(0,a.kt)("a",{parentName:"p",href:"https://chainlist.org/"},"chainlist")," for a list of networks."),(0,a.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId"},"ContractId"),".",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Contract.ContractId#networkid"},"networkId")),(0,a.kt)("h4",{id:"defined-in-9"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L15"},"src/contract/model/interface.ts:15")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"nonce"},"nonce"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"nonce"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"number")),(0,a.kt)("p",null,"Account nonce aka number of transactions sent."),(0,a.kt)("h4",{id:"defined-in-10"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L40"},"src/contract/model/interface.ts:40")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"totransactions"},"toTransactions"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"toTransactions"),": ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Transaction.Transaction-1"},(0,a.kt)("inlineCode",{parentName:"a"},"Transaction")),"[]"),(0,a.kt)("h4",{id:"defined-in-11"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L52"},"src/contract/model/interface.ts:52")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"web3contract"},"web3Contract"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"web3Contract"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"T")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html"},"web3.eth.Contract")," instance"),(0,a.kt)("h4",{id:"defined-in-12"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L34"},"src/contract/model/interface.ts:34")),(0,a.kt)("hr",null),(0,a.kt)("h3",{id:"web3sendercontract"},"web3SenderContract"),(0,a.kt)("p",null,"\u2022 ",(0,a.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,a.kt)("inlineCode",{parentName:"p"},"Readonly")," ",(0,a.kt)("strong",{parentName:"p"},"web3SenderContract"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"T")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html"},"web3.eth.Contract")," instance used for send transactions"),(0,a.kt)("h4",{id:"defined-in-13"},"Defined in"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/leovigna/web3-redux/blob/b877949/packages/web3-redux/src/contract/model/interface.ts#L36"},"src/contract/model/interface.ts:36")))}s.isMDXComponent=!0}}]);