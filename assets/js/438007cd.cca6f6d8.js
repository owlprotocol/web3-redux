"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[3496],{7522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(9901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,c=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),m=r,y=p["".concat(i,".").concat(m)]||p[m]||d[m]||c;return n?a.createElement(y,o(o({ref:t},u),{},{components:n})):a.createElement(y,o({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var c=n.length,o=new Array(c);o[0]=p;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var s=2;s<c;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6890:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>c,metadata:()=>l,toc:()=>s});var a=n(2875),r=(n(9901),n(7522));const c={sidebar_position:4},o="Contract Call Sync",l={unversionedId:"web3-redux-advanced/sync_contract_call",id:"web3-redux-advanced/sync_contract_call",title:"Contract Call Sync",description:"Web3-Redux offers enhanced customizability of contract call syncing to avoid unecessary rpc calls. Contract call syncing is achieved by refreshing contract calls based on a set of parameters.",source:"@site/docs/web3-redux-advanced/sync_contract_call.md",sourceDirName:"web3-redux-advanced",slug:"/web3-redux-advanced/sync_contract_call",permalink:"/web3-redux/docs/web3-redux-advanced/sync_contract_call",draft:!1,editUrl:"https://github.com/owlprotocol/web3-redux/tree/master/docusaurus/docs/web3-redux-advanced/sync_contract_call.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Sync Middleware",permalink:"/web3-redux/docs/web3-redux-advanced/sync_middleware"},next:{title:"Batching with HTTP",permalink:"/web3-redux/docs/web3-redux-advanced/batching_http"}},i={},s=[{value:"Simple Contract Call",id:"simple-contract-call",level:2},{value:"Generic Sync",id:"generic-sync",level:2},{value:"Optimizing Call Sync",id:"optimizing-call-sync",level:2},{value:"Custom Call Syncs",id:"custom-call-syncs",level:2},{value:"Custom Block Sync",id:"custom-block-sync",level:3},{value:"Custom Transaction Sync",id:"custom-transaction-sync",level:3},{value:"Custom Event Sync",id:"custom-event-sync",level:3}],u={toc:s};function d({components:e,...t}){return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"contract-call-sync"},"Contract Call Sync"),(0,r.kt)("p",null,"Web3-Redux offers enhanced customizability of contract call syncing to avoid unecessary rpc calls. Contract call syncing is achieved by refreshing contract calls based on a set of parameters."),(0,r.kt)("h2",{id:"simple-contract-call"},"Simple Contract Call"),(0,r.kt)("p",null,"TODO"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx"},"")),(0,r.kt)("h2",{id:"generic-sync"},"Generic Sync"),(0,r.kt)("p",null,"This type union of ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#sync"},"Sync")," and some defaults is often used as a parameter in certain hooks such as ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-hooks/Contract/useContractCall"},"useContractCall"),"."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Sync: Regular Sync middleware action."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},'"Block"'),": Sync every block. Represents a ",(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.BlockSync"},"BlockSync")," with ",(0,r.kt)("inlineCode",{parentName:"li"},"matchBlockNumberModulo = 1"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"number"),": Sync every ",(0,r.kt)("inlineCode",{parentName:"li"},"n")," blocks. Represents a ",(0,r.kt)("a",{parentName:"li",href:"/web3-redux/docs/web3-redux-reference/interfaces/Sync.BlockSync"},"BlockSync")," with ",(0,r.kt)("inlineCode",{parentName:"li"},"matchBlockNumberModulo = n"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},'"Transaction"'),": Sync every transaction from ",(0,r.kt)("inlineCode",{parentName:"li"},"sender"),". ",(0,r.kt)("inlineCode",{parentName:"li"},"sender")," is often another parameter in the function."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},'"once"'),": Don't sync. Fetch once and never refresh call."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},'"ifnull"'),": Fetch iff value in store is undefined.")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Reference:")," ",(0,r.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Sync#genericsync"},"GenericSync"),"\n`"),(0,r.kt)("p",null,"In summary, there are 4 types of contract call sync types:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"once"),": Call contract method once"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Block"),": Call contract and refresh every block.\n",(0,r.kt)("inlineCode",{parentName:"li"},"Event"),": Call contract on"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Transaction"),": Call contract and refresh every time a block includes a transaction to the contract. This uses the heuristic that your contract's state only changes when transactions interact with it directly.")),(0,r.kt)("admonition",{type:"note"},(0,r.kt)("p",{parentName:"admonition"},"Both block sync, and transaction sync require an existing block subscription to be first created.")),(0,r.kt)("admonition",{type:"warning"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("inlineCode",{parentName:"p"},"Transaction")," sync's default behaviour might not be correct for your smart contract as state could be modified indirectly by the means of one smart contract calling another. See below for more info")),(0,r.kt)("h2",{id:"optimizing-call-sync"},"Optimizing Call Sync"),(0,r.kt)("p",null,"By default, contracts use Transaction syncing but this can be customized for each specific contract call. This is can be a sub-optimal or even incorrect sync strategy."),(0,r.kt)("p",null,"Transaction syncing can be sub-optimal if a call's return value never changes. For example, an ERC20 token's name or symbol. In this case simply disable syncing with ",(0,r.kt)("inlineCode",{parentName:"p"},"sync: false"),"."),(0,r.kt)("p",null,"Transaction syncing assumes that the contract call values are only dependent on your contract's state and that this state is only changed by direct transactions to your contract. The basic logic for Transaction syncing is as follows: For each transaction in a new block, update contract call if ",(0,r.kt)("inlineCode",{parentName:"p"},"tx.to == contract.address"),".\nExamples of cases where this assumption might be incorrect include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Contract call return value depends on block number"),(0,r.kt)("li",{parentName:"ul"},"Contract state can be changed by a call to some proxy contract")),(0,r.kt)("p",null,"In these cases we recommend switching to Block syncing, which will poll the contract call at every block. For even better optimization, it might be interesting in some cases to use a custom block or transaction sync."),(0,r.kt)("h2",{id:"custom-call-syncs"},"Custom Call Syncs"),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"We recommend using Event Sync when possible as this is often the most optimal solution, only updating when the relevant state is modified.")),(0,r.kt)("h3",{id:"custom-block-sync"},"Custom Block Sync"),(0,r.kt)("p",null,"This might be useful as a quick solution to implement polling behaviour to the way you refresh a smart contract's data. This solution is especially optimal wfor state that depends on the block number (eg. some beacon)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"//Sync every 10 blocks\nSync.create({ id: '1', type: 'Block', matchBlockNumberModulo: 10, actions });\n")),(0,r.kt)("h3",{id:"custom-transaction-sync"},"Custom Transaction Sync"),(0,r.kt)("p",null,"This might be useful when you know that only a set of ",(0,r.kt)("inlineCode",{parentName:"p"},"tx.to")," addresses can initiate modifying the state of the smart contract."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"Sync.create({ id: '1', type: 'Transaction', matchTo: [contractAddress, proxyAddress], actions }));\n")),(0,r.kt)("h3",{id:"custom-event-sync"},"Custom Event Sync"),(0,r.kt)("p",null,"This is often the most optimal solution when you are aware of the contract's logic and how events are emitted when state is updated. As an example, the ",(0,r.kt)("inlineCode",{parentName:"p"},"useERC20")," hook, only refreshes ",(0,r.kt)("inlineCode",{parentName:"p"},"balanceOf")," calls when relevant ",(0,r.kt)("inlineCode",{parentName:"p"},"Transfer")," events are emitted."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-typescript"},"Sync.create({\n    id: '1',\n    type: 'Event',\n    matchAddress: contractAddress,\n    matchName: 'Transfer',\n    matchReturnValues: [{ from: account }, { to: account }],\n    actions,\n});\n")))}d.isMDXComponent=!0}}]);