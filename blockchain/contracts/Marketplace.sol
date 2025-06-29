// SPDX-License-Identifier: MIT

// Avalanche Fuji Testnet

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

import "./Net.sol";

interface INetSale {
    function netPerEth() external view returns (uint256);
}

contract NFTMarketplace is ReentrancyGuard, Ownable(msg.sender) {
    struct Listing {
        address seller;
        uint256 price;
        address nftAddress;
        uint256 tokenId;
    }

    Net public paymentToken;
    AggregatorV3Interface internal priceFeed;
    INetSale public netSale;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event Listed(address indexed seller, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event Bought(address indexed buyer, address indexed nftAddress, uint256 indexed tokenId, uint256 price);
    event Cancelled(address indexed seller, address indexed nftAddress, uint256 indexed tokenId);

    constructor(Net _paymentToken, address _priceFeedAddress) {
        paymentToken = _paymentToken;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function listNFT(address _nftAddress, uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price must be greater than zero");
        IERC721 nft = IERC721(_nftAddress);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not the owner");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) || nft.getApproved(_tokenId) == address(this),
            "Marketplace not approved"
        );

        listings[_nftAddress][_tokenId] = Listing(msg.sender, _price, _nftAddress, _tokenId);
        emit Listed(msg.sender, _nftAddress, _tokenId, _price);
    }

    function cancelListing(address _nftAddress, uint256 _tokenId) external {
        Listing memory item = listings[_nftAddress][_tokenId];
        require(item.seller == msg.sender, "Not the seller");

        delete listings[_nftAddress][_tokenId];
        emit Cancelled(msg.sender, _nftAddress, _tokenId);
    }

    function buyNFT(address _nftAddress, uint256 _tokenId) external nonReentrant {
        Listing memory item = listings[_nftAddress][_tokenId];
        require(item.price > 0, "NFT not listed");

        require(paymentToken.transferFrom(msg.sender, item.seller, item.price), "Payment failed");

        IERC721(item.nftAddress).safeTransferFrom(item.seller, msg.sender, item.tokenId);

        delete listings[_nftAddress][_tokenId];
        emit Bought(msg.sender, item.nftAddress, item.tokenId, item.price);
    }

    function getLatestPrice() public view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price; 
    }

    function getPriceInUSD(uint256 priceInNet) public view returns (uint256) {
        int256 ethPrice = getLatestPrice();
        require(ethPrice > 0, "Invalid ETH price");
        uint256 netPerEth = netSale.netPerEth();
        uint256 ethAmount = (priceInNet * 1e18) / netPerEth;
        return (ethAmount * uint256(ethPrice)) / 1e8;
    }
}
