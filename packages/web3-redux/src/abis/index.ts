//@ts-nocheck
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

//Imports fail as using js files that are transpiled by esbuild to js modules

//Contracts
export { default as BlockNumberArtifact } from '../artifacts/contracts/BlockNumber.sol/BlockNumber.json';
export { default as MulticallArtifact } from '../artifacts/contracts/Multicall.sol/Multicall.json';
export { default as WETH } from './WETH.json';

//Access
export { default as IAccessControlArtifact } from '../artifacts/@openzeppelin/contracts/access/IAccessControl.sol/IAccessControl.json';
export { default as IAccessControlEnumerableArtifact } from '../artifacts/@openzeppelin/contracts/access/IAccessControlEnumerable.sol/IAccessControlEnumerable.json';

//Tokens
export { default as IERC20Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json';
export { default as IERC20MetadataArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol/IERC20Metadata.json';
export { default as ERC20PresetMinterPauserArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol/ERC20PresetMinterPauser.json';

export { default as IERC721Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721.json';
export { default as IERC721ReceiverArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol/IERC721Receiver.json';
export { default as IERC721MetadataArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata.json';
export { default as IERC721EnumerableArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol/IERC721Enumerable.json';
export { default as ERC721PresetMinterPauserAutoIdArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol/ERC721PresetMinterPauserAutoId.json';

export { default as IERC1155Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/IERC1155.sol/IERC1155.json';
export { default as IERC1155ReceiverArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol/IERC1155Receiver.json';
export { default as IERC1155MetadataURIArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol/IERC1155MetadataURI.json';
export { default as ERC1155PresetMinterPauserArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol/ERC1155PresetMinterPauser.json';

//Utils
export { default as IERC165Artifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC165.sol/IERC165.json';
export { default as ERC165Artifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/ERC165.sol/ERC165.json';
export { default as IERC1820ImplementerArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC1820Implementer.sol/IERC1820Implementer.json';
export { default as IERC1820RegistryArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol/IERC1820Registry.json';
export { default as ERC1820ImplementerArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol/ERC1820Implementer.json';

//Types
export type { BlockNumber } from '../typechain/BlockNumber.js';
export type { Multicall } from '../typechain/Multicall.js';

export type { IAccessControl } from '../typechain/IAccessControl.js';
export type { IAccessControlEnumerable } from '../typechain/IAccessControlEnumerable.js';

export type { IERC20 } from '../typechain/IERC20.js';
export type { IERC20Metadata } from '../typechain/IERC20Metadata.js';
export type { ERC20PresetMinterPauser } from '../typechain/ERC20PresetMinterPauser.js';

export type { IERC721 } from '../typechain/IERC721.js';
export type { IERC721Receiver } from '../typechain/IERC721Receiver.js';
export type { IERC721Metadata } from '../typechain/IERC721Metadata.js';
export type { IERC721Enumerable } from '../typechain/IERC721Enumerable.js';
export type { ERC721PresetMinterPauserAutoId } from '../typechain/ERC721PresetMinterPauserAutoId.js';

export type { IERC1155 } from '../typechain/IERC1155.js';
export type { IERC1155Receiver } from '../typechain/IERC1155Receiver.js';
export type { IERC1155MetadataURI } from '../typechain/IERC1155MetadataURI.js';
export type { ERC1155PresetMinterPauser } from '../typechain/ERC1155PresetMinterPauser.js';

export type { IERC165 } from '../typechain/IERC165.js';
export type { ERC165 } from '../typechain/ERC165.js';
export type { IERC1820Implementer } from '../typechain/IERC1820Implementer.js';
export type { IERC1820Registry } from '../typechain/IERC1820Registry.js';
export type { ERC1820Implementer } from '../typechain/ERC1820Implementer.js';
