// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/functions/dev/v1_X/FunctionsClient.sol";

abstract contract APIKeyValidator is FunctionsClient {
    address public owner;
    bytes32 public lastRequestId;
    bytes32 public constant DON_ID = bytes32(uint256(0x617661782d66756a69));
    mapping(address => bool) public isValidated;

    constructor(address router) FunctionsClient(router) {
        owner = msg.sender;
    }

    function validateAPIKey(bytes memory Cbor_DATA) external {
            lastRequestId = _sendRequest(
            Cbor_DATA,
            0,              
            100000,        
            DON_ID   
        );
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response
    ) internal virtual {
        require(requestId == lastRequestId, "Invalid request");
        uint256 result = abi.decode(response, (uint256));
        if (result == 1) {
            isValidated[msg.sender] = true;
        }
    }
}
