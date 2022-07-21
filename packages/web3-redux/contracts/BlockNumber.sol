// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract BlockNumber {
    uint256 private value;
    event NewValue(uint256 indexed value);

    function blockNumber() public view returns (uint256) {
        return block.number;
    }

    function setValue(uint256 v) public {
        value = v;
        emit NewValue(v);
    }

    function getValue() public view returns (uint256) {
        return value;
    }

    function getNumber(uint256 x) public pure returns (uint256) {
        return x;
    }

    function msgValue() public payable returns (uint256) {
        return msg.value;
    }

    function msgSender() public payable returns (address) {
        return msg.sender;
    }

    function revertTx() public pure {
        revert('Transaction reverted');
    }
}
