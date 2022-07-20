"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[4594],{7522:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>d});var o=r(9901);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},c=Object.keys(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(o=0;o<c.length;o++)r=c[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),u=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},i=function(e){var t=u(e.components);return o.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},k=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,c=e.originalType,l=e.parentName,i=s(e,["components","mdxType","originalType","parentName"]),k=u(r),d=n,b=k["".concat(l,".").concat(d)]||k[d]||p[d]||c;return r?o.createElement(b,a(a({ref:t},i),{},{components:r})):o.createElement(b,a({ref:t},i))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var c=r.length,a=new Array(c);a[0]=k;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,a[1]=s;for(var u=2;u<c;u++)a[u]=r[u];return o.createElement.apply(null,a)}return o.createElement.apply(null,r)}k.displayName="MDXCreateElement"},1106:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>c,metadata:()=>s,toc:()=>u});var o=r(2875),n=(r(9901),r(7522));const c={},a="useBlockSync",s={unversionedId:"web3-redux-hooks/Block/useBlockSync",id:"web3-redux-hooks/Block/useBlockSync",title:"useBlockSync",description:"Subscribe to new blocks and return all current blocks for network in store.",source:"@site/docs/web3-redux-hooks/6_Block/2_useBlockSync.mdx",sourceDirName:"web3-redux-hooks/6_Block",slug:"/web3-redux-hooks/Block/useBlockSync",permalink:"/web3-redux/docs/web3-redux-hooks/Block/useBlockSync",draft:!1,editUrl:"https://github.com/owlprotocol/web3-redux/tree/master/docusaurus/docs/web3-redux-hooks/6_Block/2_useBlockSync.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"useLatestBlock",permalink:"/web3-redux/docs/web3-redux-hooks/Block/useLatestBlock"},next:{title:"useTransaction",permalink:"/web3-redux/docs/web3-redux-hooks/Transaction/useTransaction"}},l={},u=[],i={toc:u};function p({components:e,...t}){return(0,n.kt)("wrapper",(0,o.Z)({},i,t,{components:e,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"useblocksync"},"useBlockSync"),(0,n.kt)("p",null,"Subscribe to new blocks and return all current blocks for network in store."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-tsx"},"const blocks = Block.hooks.useBlockSync(networkId);\n")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Reference:")," ",(0,n.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Block#useblocksync"},"Block.useBlockSync")),(0,n.kt)("admonition",{type:"caution"},(0,n.kt)("p",{parentName:"admonition"},"While some features of Web3-Redux might work with an HTTP (",(0,n.kt)("inlineCode",{parentName:"p"},"http://"),") connection, subscriptions ",(0,n.kt)("strong",{parentName:"p"},"REQUIRE")," a network configured with a websocket (",(0,n.kt)("inlineCode",{parentName:"p"},"ws://"),") connection.")))}p.isMDXComponent=!0}}]);