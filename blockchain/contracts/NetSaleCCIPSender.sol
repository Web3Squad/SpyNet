// SPDX-License-Identifier: MIT

// Ethereum Sepolia

pragma solidity ^0.8.24;

interface ICCIPRouter {
    struct EVM2AnyMessage {
        address receiver;
        bytes data;
        uint64 gasLimit;
        uint256 feePayment;
        address feeToken;
    }

    function sendEVM2AnyMessage(EVM2AnyMessage calldata message) external payable returns (bytes32);
}

contract NetSaleCCIPSender {
    ICCIPRouter public immutable ccipRouter;
    address public immutable netsaleAvalanche;

    event MessageSent(bytes32 indexed messageId, address indexed buyer);

    constructor(address _ccipRouter, address _netsaleAvalanche) {
        ccipRouter = ICCIPRouter(_ccipRouter);
        netsaleAvalanche = _netsaleAvalanche;
    }

    function buyTokens() external payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        bytes memory data = abi.encode(msg.sender);

        ICCIPRouter.EVM2AnyMessage memory message = ICCIPRouter.EVM2AnyMessage({
            receiver: netsaleAvalanche,
            data: data,
            gasLimit: 200000,
            feePayment: 0,
            feeToken: address(0)
        });

        bytes32 messageId = ccipRouter.sendEVM2AnyMessage{value: msg.value}(message);

        emit MessageSent(messageId, msg.sender);
    }
}
