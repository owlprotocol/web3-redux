"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[292],{7522:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(9901);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),c=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=r,b=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?a.createElement(b,s(s({ref:t},u),{},{components:n})):a.createElement(b,s({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4690:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(9901),r=n(4517);const o="tabItem_DOlp";function s({children:e,hidden:t,className:n}){return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,n),hidden:t},e)}},5108:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(2875),r=n(9901),o=n(4517),s=n(105),i=n(2869),l=n(4977),c=n(5205);const u="tabList_n405",p="tabItem_hzXM";function d(e){const{lazy:t,block:n,defaultValue:s,values:d,groupId:m,className:b}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=d??h.map((({props:{value:e,label:t,attributes:n}})=>({value:e,label:t,attributes:n}))),f=(0,i.l)(v,((e,t)=>e.value===t.value));if(f.length>0)throw new Error(`Docusaurus error: Duplicate values "${f.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===s?s:s??h.find((e=>e.props.default))?.props.value??h[0].props.value;if(null!==k&&!v.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:y}=(0,l.U)(),[w,x]=(0,r.useState)(k),T=[],{blockElementScrollPositionUntilNextRender:C}=(0,c.o5)();if(null!=m){const e=g[m];null!=e&&e!==w&&v.some((t=>t.value===e))&&x(e)}const E=e=>{const t=e.currentTarget,n=T.indexOf(t),a=v[n].value;a!==w&&(C(t),x(a),null!=m&&y(m,String(a)))},N=e=>{let t=null;switch(e.key){case"ArrowRight":{const n=T.indexOf(e.currentTarget)+1;t=T[n]??T[0];break}case"ArrowLeft":{const n=T.indexOf(e.currentTarget)-1;t=T[n]??T[T.length-1];break}}t?.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":n},b)},v.map((({value:e,label:t,attributes:n})=>r.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===e?0:-1,"aria-selected":w===e,key:e,ref:e=>T.push(e),onKeyDown:N,onFocus:E,onClick:E},n,{className:(0,o.Z)("tabs__item",p,n?.className,{"tabs__item--active":w===e})}),t??e)))),t?(0,r.cloneElement)(h.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function m(e){const t=(0,s.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},6142:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var a=n(2875),r=(n(9901),n(7522)),o=n(5108),s=n(4690);const i={sidebar_position:6,label:"Contract Event"},l="Contract Event",c={unversionedId:"web3-redux-quickstart/contract_event",id:"web3-redux-quickstart/contract_event",title:"Contract Event",description:"A contract event log is like notification on the blockchain that some data has changed. Event logs are indexed separately and are an efficient way to get past updates or listen to new ones. The ERC20 token Transfer(from, to, value) event is emitted whenever a token is transferred for example.",source:"@site/docs/web3-redux-quickstart/6_contract_event.mdx",sourceDirName:"web3-redux-quickstart",slug:"/web3-redux-quickstart/contract_event",permalink:"/web3-redux/docs/web3-redux-quickstart/contract_event",draft:!1,editUrl:"https://github.com/owlprotocol/web3-redux/tree/master/docusaurus/docs/web3-redux-quickstart/6_contract_event.mdx",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,label:"Contract Event"},sidebar:"tutorialSidebar",previous:{title:"Contract Call",permalink:"/web3-redux/docs/web3-redux-quickstart/contract_call"},next:{title:"Conclusion",permalink:"/web3-redux/docs/web3-redux-quickstart/conclusion"}},u={},p=[{value:"Past Events",id:"past-events",level:2},{value:"Event Subscription",id:"event-subscription",level:2}],d={toc:p};function m({components:e,...t}){return(0,r.kt)("wrapper",(0,a.Z)({},d,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"contract-event"},"Contract Event"),(0,r.kt)("p",null,"A contract event log is like notification on the blockchain that some data has changed. Event logs are indexed separately and are an efficient way to get past updates or listen to new ones. The ERC20 token ",(0,r.kt)("inlineCode",{parentName:"p"},"Transfer(from, to, value)")," event is emitted whenever a token is transferred for example."),(0,r.kt)("h2",{id:"past-events"},"Past Events"),(0,r.kt)("p",null,"Fetching past events can help you display historical changes in the smart contract's state. Web3-Redux uses the ",(0,r.kt)("a",{parentName:"p",href:"https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#getpastevents"},"web3.eth.Contract.events.getPastEvents")," API to get past events."),(0,r.kt)(o.Z,{groupId:"framework",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"react",label:"React",mdxType:"TabItem"},(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"useEvents")," hook can help us easily achieve fetch contract events. To get past events, enable the ",(0,r.kt)("inlineCode",{parentName:"p"},"past")," option of the hook."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/App.tsx"',title:'"src/App.tsx"'},"import { Abi, Contract, Network } from '@owlprotocol/web3-redux';\n\nconst defaultNetwork = { web3Rpc: 'ws://localhost:8545' };\nconst defaultContract = { abi: Abi.IERC20.abi };\nconst USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';\nconst VITALIK = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';\n\nconst App = () => {\n    const [network] = Network.hooks.useNetwork('1', defaultNetwork)\n    const [contract] = Contract.hooks.useContract('1', USDC, defaultContract);\n    const [balance] = Contract.hooks.useContractCall('1', USDC,\n        'balanceOf', [VITALIK]);\n\n    const filter = { from: VITALIK }\n    // Sync events\n    // highlight-start\n    const [events] = Contract.hooks.useEvents(networkId, USDC,\n        'Transfer',\n        filter,\n        { past: true, fromBlock: 0, toBlock: 'latest'});\n    // highlight-end\n\n    return <>{JSON.stringify(events)}</>\n};\n"))),(0,r.kt)(s.Z,{value:"redux",label:"Redux",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"TBD\n")))),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"The ",(0,r.kt)("inlineCode",{parentName:"p"},"filter")," parameter is used to only query Transfer events from ",(0,r.kt)("inlineCode",{parentName:"p"},"VITALIK"),". This leverages the indexing features of event logs and is often required to efficiently query only the relevent events.")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Getting past events can be an expensive operation. We recommend limiting the amount of data queried using filters or block range parameters."),(0,r.kt)("p",{parentName:"admonition"},"Web3-Redux does implement efficient cache strategies for event logs and dynamically splits block ranges into buckets when the queried block range returns an ",(0,r.kt)("inlineCode",{parentName:"p"},"Returned error: query returned more than 10000 results")," error.")),(0,r.kt)("h2",{id:"event-subscription"},"Event Subscription"),(0,r.kt)("p",null,"Event subscriptions can enable your app to efficiently get updates regarding a smart contract without having to poll every block. Web3-Redux uses the ",(0,r.kt)("a",{parentName:"p",href:"https://web3js.readthedocs.io/en/v1.7.0/web3-eth-contract.html#contract-events"},"web3.eth.Contract.events.MyEvent")," API to sync new events."),(0,r.kt)("p",null,"To get updates on new events, enable the ",(0,r.kt)("inlineCode",{parentName:"p"},"sync"),' option of the hook. The Web3-Redux event subscription hook is configured to automatically start/stop the correct subscription if any relevant parameters of the hook change: this avoids having "zombie" subscriptions that continue syncing a contract that is no longer needed.'),(0,r.kt)(o.Z,{groupId:"framework",mdxType:"Tabs"},(0,r.kt)(s.Z,{value:"react",label:"React",mdxType:"TabItem"},(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/App.tsx" showLineNumbers',title:'"src/App.tsx"',showLineNumbers:!0},"const [events] = Contract.hooks.useEvents(networkId, USDC,\n        'Transfer',\n        filter,\n        { sync: true });\n"))),(0,r.kt)(s.Z,{value:"redux",label:"Redux",mdxType:"TabItem"})),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"To get both past events and sync new ones, simply enable both ",(0,r.kt)("inlineCode",{parentName:"p"},"past")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"sync")," options.")),(0,r.kt)("admonition",{type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"While some features of Web3-Redux might work with an HTTP (",(0,r.kt)("inlineCode",{parentName:"p"},"http://"),") connection, subscriptions ",(0,r.kt)("strong",{parentName:"p"},"REQUIRE")," a network configured with a websocket (",(0,r.kt)("inlineCode",{parentName:"p"},"ws://"),") connection.")))}m.isMDXComponent=!0}}]);