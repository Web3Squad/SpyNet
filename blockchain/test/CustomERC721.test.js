const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomERC721", function () {
  let CustomERC721;
  let customERC721;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const tokenName = "API Key NFT";
  const tokenSymbol = "APIK";

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    CustomERC721 = await ethers.getContractFactory("CustomERC721");
    customERC721 = await CustomERC721.deploy(tokenName, tokenSymbol);
  });

  describe("Deploy", function () {
    it("Should deploy successfully", async function () {
      expect(customERC721.address).to.not.equal(ethers.ZeroAddress);
    });

    it("Should have correct name", async function () {
      expect(await customERC721.name()).to.equal(tokenName);
    });

    it("Should have correct symbol", async function () {
      expect(await customERC721.symbol()).to.equal(tokenSymbol);
    });

    it("Should set deployer as owner", async function () {
      expect(await customERC721.owner()).to.equal(owner.address);
    });
  });

  describe("Mint", function () {
    it("Should mint NFT to specified address", async function () {
      await customERC721.mint(addr1.address);

      expect(await customERC721.ownerOf(0)).to.equal(addr1.address);
      expect(await customERC721.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should increment token ID for each mint", async function () {
      await customERC721.mint(addr1.address);
      await customERC721.mint(addr2.address);

      expect(await customERC721.ownerOf(0)).to.equal(addr1.address);
      expect(await customERC721.ownerOf(1)).to.equal(addr2.address);
    });

    it("Should return correct token ID", async function () {
      const tx = await customERC721.mint(addr1.address);
      const receipt = await tx.wait();
      
      const mintEvent = receipt.logs.find(log => {
        try {
          const parsed = customERC721.interface.parseLog(log);
          return parsed.name === "ApiKeyNFTMinted";
        } catch {
          return false;
        }
      });
      
      const parsedEvent = customERC721.interface.parseLog(mintEvent);
      const tokenId = parsedEvent.args.tokenId;
      expect(tokenId).to.equal(0);
    });

    it("Should emit ApiKeyNFTMinted event", async function () {
      await expect(customERC721.mint(addr1.address))
        .to.emit(customERC721, "ApiKeyNFTMinted")
        .withArgs(addr1.address, 0);
    });

    it("Should fail if non-owner tries to mint", async function () {
      await expect(
        customERC721.connect(addr1).mint(addr2.address)
      ).to.be.revertedWithCustomError(customERC721, "OwnableUnauthorizedAccount");
    });
  });

  describe("Burn", function () {
    beforeEach(async function () {
      await customERC721.mint(addr1.address);
    });

    it("Should burn NFT by owner", async function () {
      await customERC721.burn(0);

      await expect(customERC721.ownerOf(0)).to.be.revertedWithCustomError(
        customERC721, 
        "ERC721NonexistentToken"
      );
    });

    it("Should fail if non-owner tries to burn", async function () {
      await expect(
        customERC721.connect(addr1).burn(0)
      ).to.be.revertedWithCustomError(customERC721, "OwnableUnauthorizedAccount");
    });

    it("Should fail if burning non-existent token", async function () {
      await expect(
        customERC721.burn(999)
      ).to.be.revertedWithCustomError(customERC721, "ERC721NonexistentToken");
    });
  });

  describe("Multiple Mints", function () {
    it("Should handle multiple mints correctly", async function () {
      await customERC721.mint(addr1.address);
      await customERC721.mint(addr1.address);
      await customERC721.mint(addr2.address);

      expect(await customERC721.balanceOf(addr1.address)).to.equal(2);
      expect(await customERC721.balanceOf(addr2.address)).to.equal(1);
      expect(await customERC721.ownerOf(0)).to.equal(addr1.address);
      expect(await customERC721.ownerOf(1)).to.equal(addr1.address);
      expect(await customERC721.ownerOf(2)).to.equal(addr2.address);
    });
  });

  describe("ERC721 Standard", function () {
    beforeEach(async function () {
      await customERC721.mint(addr1.address);
    });

    it("Should support ERC721 interface", async function () {
      expect(await customERC721.supportsInterface("0x80ac58cd")).to.be.true;
    });

    it("Should return correct token URI", async function () {
      expect(await customERC721.tokenURI(0)).to.equal("");
    });
  });

  describe("Ownership Transfer", function () {
    it("Should allow owner to transfer ownership", async function () {
      await customERC721.transferOwnership(addr1.address);
      expect(await customERC721.owner()).to.equal(addr1.address);
    });

    it("Should fail if non-owner tries to transfer ownership", async function () {
      await expect(
        customERC721.connect(addr1).transferOwnership(addr2.address)
      ).to.be.revertedWithCustomError(customERC721, "OwnableUnauthorizedAccount");
    });
  });

  describe("Mint and Burn Sequence", function () {
    it("Should handle mint and burn sequence correctly", async function () {
      await customERC721.mint(addr1.address);
      await customERC721.burn(0);
      await customERC721.mint(addr2.address);

      expect(await customERC721.ownerOf(1)).to.equal(addr2.address);
      expect(await customERC721.balanceOf(addr2.address)).to.equal(1);
    });
  });
}); 