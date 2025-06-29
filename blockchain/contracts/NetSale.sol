// SPDX-License-Identifier: MIT

// Avalanche Fuji Testnet

pragma solidity ^0.8.24;

interface ICCIPReceiver {
    function ccipReceive(
        bytes calldata data,
        address sender,
        uint256 value
    ) external;
}

interface INet {
    function mint(address to, uint256 amount) external;
}

contract NetSale is ICCIPReceiver {
    INet public netToken;
    address public owner;
    uint256 public netPerEth = 1000 * 1e18;

    event TokensPurchased(address buyer, uint256 amountNet, uint256 amountEth);

    constructor(address netTokenAddress) {
        netToken = INet(netTokenAddress);
        owner = msg.sender;
    }

    function ccipReceive(bytes calldata data, address sender, uint256 value) external override {
        address buyer = abi.decode(data, (address));
        uint256 amountNet = (value * netPerEth) / 1e18;
        netToken.mint(buyer, amountNet);
        emit TokensPurchased(buyer, amountNet, value);
    }

    function setPrice(uint256 newNetPerEth) external {
        require(msg.sender == owner, "Only owner");
        netPerEth = newNetPerEth;
    }
}
