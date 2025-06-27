// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CustomERC721 is ERC721, Ownable(msg.sender) {

    uint256 private _nextTokenId;

    event ApiKeyNFTMinted(address indexed to, uint256 indexed tokenId);

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(to, tokenId);
        emit ApiKeyNFTMinted(to, tokenId);
        return tokenId;
    }

    function burn(uint256 tokenId) external onlyOwner {
        _burn(tokenId);
    }
}
