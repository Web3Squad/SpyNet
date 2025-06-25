// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Net is ERC20 {
    constructor(uint256 initialSupply) ERC20("Net", "NET") {
        _mint(msg.sender, initialSupply);
    }
}
