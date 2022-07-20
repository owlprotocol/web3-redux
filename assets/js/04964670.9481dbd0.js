"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[272],{7522:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(9901);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=u(n),m=o,f=d["".concat(c,".").concat(m)]||d[m]||l[m]||a;return n?r.createElement(f,s(s({ref:t},p),{},{components:n})):r.createElement(f,s({ref:t},p))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,s=new Array(a);s[0]=d;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,s[1]=i;for(var u=2;u<a;u++)s[u]=n[u];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>l,frontMatter:()=>a,metadata:()=>i,toc:()=>u});var r=n(2875),o=(n(9901),n(7522));const a={},s="useEvents",i={unversionedId:"web3-redux-hooks/Contract/useEvents",id:"web3-redux-hooks/Contract/useEvents",title:"useEvents",description:"Get past or sync contract event logs.",source:"@site/docs/web3-redux-hooks/0_Contract/1_useEvents.mdx",sourceDirName:"web3-redux-hooks/0_Contract",slug:"/web3-redux-hooks/Contract/useEvents",permalink:"/web3-redux/docs/web3-redux-hooks/Contract/useEvents",draft:!1,editUrl:"https://github.com/owlprotocol/web3-redux/tree/master/docusaurus/docs/web3-redux-hooks/0_Contract/1_useEvents.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useContractCall",permalink:"/web3-redux/docs/web3-redux-hooks/Contract/useContractCall"},next:{title:"useContractSend",permalink:"/web3-redux/docs/web3-redux-hooks/Contract/useContractSend"}},c={},u=[],p={toc:u};function l({components:e,...t}){return(0,o.kt)("wrapper",(0,r.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"useevents"},"useEvents"),(0,o.kt)("p",null,"Get past or sync contract event logs."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-tsx"},"const Transfer = Contract.useEvents(networkId, address, 'Transfer', filter, { past: true, sync: true });\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Reference:")," ",(0,o.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Contract#useevents"},"Contract.useEvents")),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"The ",(0,o.kt)("inlineCode",{parentName:"p"},"filter")," parameter can be used to filter events by indexed ",(0,o.kt)("inlineCode",{parentName:"p"},"returnValues")," fields. This leverages the indexing features of event logs and is often required to efficiently query only the relevent events.")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"Getting past events can be an expensive operation. We recommend limiting the amount of data queried using filters or block range parameters.")),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"While some features of Web3-Redux might work with an HTTP (",(0,o.kt)("inlineCode",{parentName:"p"},"http://"),") connection, subscriptions ",(0,o.kt)("strong",{parentName:"p"},"REQUIRE")," a network configured with a websocket (",(0,o.kt)("inlineCode",{parentName:"p"},"ws://"),") connection.")))}l.isMDXComponent=!0}}]);