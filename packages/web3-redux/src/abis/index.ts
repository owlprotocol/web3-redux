//@ts-nocheck
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

//Imports fail as using json files that are transpiled by esbuild to js modules

//Contracts
export { default as BlockNumber } from './BlockNumber';
export { default as Multicall } from './Multicall';
export { default as WETH } from './WETH';

//Access
export { default as IAccessControlArtifact } from '../artifacts/@openzeppelin/contracts/access/IAccessControl.sol/IAccessControl';
export { default as IAccessControlEnumerableArtifact } from '../artifacts/@openzeppelin/contracts/access/IAccessControlEnumerable.sol/IAccessControlEnumerable';

//Tokens
export { default as IERC20Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20';
export { default as IERC20MetadataArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol/IERC20Metadata';
export { default as ERC20PresetMinterPauserArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol/ERC20PresetMinterPauser';

export { default as IERC721Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/IERC721.sol/IERC721';
export { default as IERC721ReceiverArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol/IERC721Receiver';
export { default as IERC721MetadataArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol/IERC721Metadata';
export { default as IERC721EnumerableArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol/IERC721Enumerable';
export { default as ERC721PresetMinterPauserAutoIdArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol/ERC721PresetMinterPauserAutoId';

export { default as IERC1155Artifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/IERC1155.sol/IERC1155';
export { default as IERC1155ReceiverArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol/IERC1155Receiver';
export { default as IERC1155MetadataURIArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol/IERC1155MetadataURI';
export { default as ERC1155PresetMinterPauserArtifact } from '../artifacts/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol/ERC1155PresetMinterPauser';

//Utils
export { default as IERC165Artifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC165.sol/IERC165';
export { default as ERC165Artifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/ERC165.sol/ERC165';
export { default as IERC1820ImplementerArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC1820Implementer.sol/IERC1820Implementer';
export { default as IERC1820RegistryArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol/IERC1820Registry';
export { default as ERC1820ImplementerArtifact } from '../artifacts/@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol/ERC1820Implementer';
