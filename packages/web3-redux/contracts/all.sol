// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//Access
import '@openzeppelin/contracts/access/IAccessControl.sol';
import '@openzeppelin/contracts/access/IAccessControlEnumerable.sol';

//Tokens
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';
import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol';

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol';

import '@openzeppelin/contracts/token/ERC1155/IERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';
import '@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol';
import '@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol';

//Utils
import '@openzeppelin/contracts/utils/introspection/IERC165.sol';
import '@openzeppelin/contracts/utils/introspection/ERC165.sol';

import '@openzeppelin/contracts/utils/introspection/IERC1820Implementer.sol';
import '@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol';
import '@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol';
