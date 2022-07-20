"use strict";(globalThis.webpackChunk_owlprotocol_web3_redux_docs=globalThis.webpackChunk_owlprotocol_web3_redux_docs||[]).push([[2882],{7522:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>m});var n=r(9901);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),u=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(r),m=a,k=p["".concat(l,".").concat(m)]||p[m]||d[m]||o;return r?n.createElement(k,i(i({ref:t},c),{},{components:r})):n.createElement(k,i({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},4690:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(9901),a=r(4517);const o="tabItem_DOlp";function i({children:e,hidden:t,className:r}){return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,r),hidden:t},e)}},5108:(e,t,r)=>{r.d(t,{Z:()=>m});var n=r(2875),a=r(9901),o=r(4517),i=r(105),s=r(2869),l=r(4977),u=r(5205);const c="tabList_n405",d="tabItem_hzXM";function p(e){const{lazy:t,block:r,defaultValue:i,values:p,groupId:m,className:k}=e,w=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),b=p??w.map((({props:{value:e,label:t,attributes:r}})=>({value:e,label:t,attributes:r}))),h=(0,s.l)(b,((e,t)=>e.value===t.value));if(h.length>0)throw new Error(`Docusaurus error: Duplicate values "${h.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const f=null===i?i:i??w.find((e=>e.props.default))?.props.value??w[0].props.value;if(null!==f&&!b.some((e=>e.value===f)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${f}" but none of its children has the corresponding value. Available values are: ${b.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:v,setTabGroupChoices:g}=(0,l.U)(),[N,y]=(0,a.useState)(f),x=[],{blockElementScrollPositionUntilNextRender:C}=(0,u.o5)();if(null!=m){const e=v[m];null!=e&&e!==N&&b.some((t=>t.value===e))&&y(e)}const T=e=>{const t=e.currentTarget,r=x.indexOf(t),n=b[r].value;n!==N&&(C(t),y(n),null!=m&&g(m,String(n)))},E=e=>{let t=null;switch(e.key){case"ArrowRight":{const r=x.indexOf(e.currentTarget)+1;t=x[r]??x[0];break}case"ArrowLeft":{const r=x.indexOf(e.currentTarget)-1;t=x[r]??x[x.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,o.Z)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":r},k)},b.map((({value:e,label:t,attributes:r})=>a.createElement("li",(0,n.Z)({role:"tab",tabIndex:N===e?0:-1,"aria-selected":N===e,key:e,ref:e=>x.push(e),onKeyDown:E,onFocus:T,onClick:T},r,{className:(0,o.Z)("tabs__item",d,r?.className,{"tabs__item--active":N===e})}),t??e)))),t?(0,a.cloneElement)(w.filter((e=>e.props.value===N))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},w.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==N})))))}function m(e){const t=(0,i.Z)();return a.createElement(p,(0,n.Z)({key:String(t)},e))}},5421:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>s,metadata:()=>u,toc:()=>d});var n=r(2875),a=(r(9901),r(7522)),o=r(5108),i=r(4690);const s={sidebar_position:3,label:"Configure Network"},l="Configure Network",u={unversionedId:"web3-redux-quickstart/add_network",id:"web3-redux-quickstart/add_network",title:"Configure Network",description:"Network",source:"@site/docs/web3-redux-quickstart/3_add_network.mdx",sourceDirName:"web3-redux-quickstart",slug:"/web3-redux-quickstart/add_network",permalink:"/web3-redux/docs/web3-redux-quickstart/add_network",draft:!1,editUrl:"https://github.com/owlprotocol/web3-redux/tree/master/docusaurus/docs/web3-redux-quickstart/3_add_network.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,label:"Configure Network"},sidebar:"tutorialSidebar",previous:{title:"Initialize the Redux Store",permalink:"/web3-redux/docs/web3-redux-quickstart/add_store"},next:{title:"Configure Contract",permalink:"/web3-redux/docs/web3-redux-quickstart/add_contract"}},c={},d=[{value:"Network",id:"network",level:2},{value:"Add Network",id:"add-network",level:2},{value:"Env Var Config",id:"env-var-config",level:2},{value:"Advanced",id:"advanced",level:2}],p={toc:d};function m({components:e,...t}){return(0,a.kt)("wrapper",(0,n.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"configure-network"},"Configure Network"),(0,a.kt)("h2",{id:"network"},"Network"),(0,a.kt)("p",null,"All entities in the Web3-Redux store are indexed by networkId. Web3-Redux let's you sync multiple networks concurrently (eg. sync Mainnet & Ropsten blocks). The ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/interfaces/Network.Network-1"},"Network")," object is meant to store a global ",(0,a.kt)("inlineCode",{parentName:"p"},"web3")," object that is responsible for connecting to the Ethereum RPC. You must first configure a network by adding it to the store and passing it a web3 instance or an Ethereum RPC."),(0,a.kt)("admonition",{type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"We recomend using a Websocket (",(0,a.kt)("inlineCode",{parentName:"p"},"wss://"),") connection as this enables more advanced usage such as subscriptions.")),(0,a.kt)("admonition",{type:"info"},(0,a.kt)("p",{parentName:"admonition"},"In later sections we will look into connecting the network with Metamask to add a ",(0,a.kt)("inlineCode",{parentName:"p"},"web3Sender")," instance used for sending transactions.")),(0,a.kt)("h2",{id:"add-network"},"Add Network"),(0,a.kt)(o.Z,{groupId:"framework",mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"react",label:"React",mdxType:"TabItem"},(0,a.kt)("p",null,"If using React, you will want to configure the network(s) on app mount with the simple ",(0,a.kt)("inlineCode",{parentName:"p"},"useNetwork")," hook. Under the hood, this uses the ",(0,a.kt)("inlineCode",{parentName:"p"},"useHydrate")," hook to load the IndexedDB persisted configuration or create a new network with the defaultNetwork."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/App.tsx" showLineNumbers',title:'"src/App.tsx"',showLineNumbers:!0},"import { Network } from '@owlprotocol/web3-redux';\n\nconst defaultNetwork = { web3Rpc: 'ws://localhost:8545' }\nconst App = () => {\n    // highlight-start\n    const [network] = Network.hooks.useNetwork('1', defaultNetwork);\n    // highlight-end\n\n    return <>{network.networkId}</>\n};\n")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"The component must have access to the Redux context (see ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-quickstart/add_store"},"Configure Store"),")."))),(0,a.kt)(i.Z,{value:"redux",label:"Redux",mdxType:"TabItem"},(0,a.kt)("p",null,"In pure Redux, the configuration can be dispatched from the store."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/createNetwork.ts" showLineNumbers',title:'"src/createNetwork.ts"',showLineNumbers:!0},"import { store, Network } from '@owlprotocol/web3-redux';\nconst defaultNetwork = { networkId: '1', web3Rpc: 'http://localhost:8545' };\n\n// highlight-start\nstore.dispatch(Network.actions.upsert(defaultNetwork));\n// highlight-end\n")))),(0,a.kt)("h2",{id:"env-var-config"},"Env Var Config"),(0,a.kt)("p",null,"Web3-Redux includes built-in defaults using environment variables to easily configure your store. Environment variables can be as is or prefixed by the following common framework prefixes ",(0,a.kt)("inlineCode",{parentName:"p"},"REACT_APP_"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"NEXT_PUBLIC_"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"VITE_"),"."),(0,a.kt)("p",null,"To enable this, set the ",(0,a.kt)("strong",{parentName:"p"},"one")," of the following envvars in your React App's ",(0,a.kt)("inlineCode",{parentName:"p"},".env")," or ",(0,a.kt)("inlineCode",{parentName:"p"},".env.local")," file:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title=".env"',title:'".env"'},"#Use Infura RPC for supported networks\nREACT_APP_INFURA_API_KEY=<PROJECT_ID>\n#Set Ethereum Mainnet RPC (networkId: 1)\nREACT_APP_MAINNET_RPC=ws://localhost:8545\n")),(0,a.kt)("p",null,"You can configure now configure your network by just passing in the relevant networkId."),(0,a.kt)(o.Z,{groupId:"framework",mdxType:"Tabs"},(0,a.kt)(i.Z,{value:"react",label:"React",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx",metastring:'title="src/App.tsx"',title:'"src/App.tsx"'},"const [network] = Network.hooks.useNetwork('1');\n"))),(0,a.kt)(i.Z,{value:"redux",label:"Redux",mdxType:"TabItem"},(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript",metastring:'title="src/createNetwork.ts"',title:'"src/createNetwork.ts"'},"store.dispatch(Network.actions.upsert({ networkId: '1'}));\n")))),(0,a.kt)("p",null,"Web3-Redux will automatically use the envvar configured RPC as a default for supported networks (Ethereum, Testnets, Polygon). For custom networks, you can manually set the ",(0,a.kt)("inlineCode",{parentName:"p"},"web3Rpc")," parameter as seen in the previous example."),(0,a.kt)("p",null,"For more details on supported envvars (additional default networks), check out ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-reference/namespaces/Environment"},"Reference/Environment"),"."),(0,a.kt)("p",null,"Also see the documentation relevant to your UI Framework:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://create-react-app.dev/docs/adding-custom-environment-variables/"},"React CRA Envvars"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://vitejs.dev/guide/env-and-mode.html"},"Vite Envvars"))),(0,a.kt)("h2",{id:"advanced"},"Advanced"),(0,a.kt)("p",null,"For more dynamic configuration such as integration with Metamask, and setting up a dual configuration with a ",(0,a.kt)("inlineCode",{parentName:"p"},"web3Sender")," object, check out ",(0,a.kt)("a",{parentName:"p",href:"/web3-redux/docs/web3-redux-integrations/metamask"},"Integrations/Metamask"),"."))}m.isMDXComponent=!0}}]);