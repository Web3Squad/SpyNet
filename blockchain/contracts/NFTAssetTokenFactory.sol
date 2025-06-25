// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./CustomERC20.sol";

contract NFTAssetTokenFactory {
    event TokenCreated(address tokenAddress, string name, string symbol, uint256 supply, uint256 assetId);

    struct AssetToken {
        address tokenAddress;
        string name;
        string symbol;
        uint256 supply;
    }

    mapping(uint256 => AssetToken) public assetTokens;

    function createTokenForAsset(
        uint256 assetId,
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) external returns (address) {
        require(assetTokens[assetId].tokenAddress == address(0), "Token already exists for this asset");

        CustomERC20 token = new CustomERC20(name, symbol, initialSupply, msg.sender);

        assetTokens[assetId] = AssetToken({
            tokenAddress: address(token),
            name: name,
            symbol: symbol,
            supply: initialSupply
        });

        emit TokenCreated(address(token), name, symbol, initialSupply, assetId);
        return address(token);
    }
}
