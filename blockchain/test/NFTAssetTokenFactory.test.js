const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTAssetTokenFactory", function () {
  let NFTAssetTokenFactory;
  let factory;
  let CustomERC20;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const assetId = 1;
  const tokenName = "Asset Token";
  const tokenSymbol = "ATK";
  const initialSupply = ethers.parseEther("1000000");

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    NFTAssetTokenFactory = await ethers.getContractFactory("NFTAssetTokenFactory");
    factory = await NFTAssetTokenFactory.deploy();
    
    CustomERC20 = await ethers.getContractFactory("CustomERC20");
  });

  describe("Deploy", function () {
    it("Should deploy successfully", async function () {
      expect(factory.address).to.not.equal(ethers.ZeroAddress);
    });
  });

  describe("Create Token", function () {
    it("Should create token for asset", async function () {
      const tx = await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      const receipt = await tx.wait();

      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });

      expect(tokenCreatedEvent).to.not.be.undefined;
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      expect(parsedEvent.args.tokenAddress).to.not.equal(ethers.ZeroAddress);
      expect(parsedEvent.args.name).to.equal(tokenName);
      expect(parsedEvent.args.symbol).to.equal(tokenSymbol);
      expect(parsedEvent.args.supply).to.equal(initialSupply);
      expect(parsedEvent.args.assetId).to.equal(assetId);
    });

    it("Should store token info in mapping", async function () {
      await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);

      const assetToken = await factory.assetTokens(assetId);
      expect(assetToken.tokenAddress).to.not.equal(ethers.ZeroAddress);
      expect(assetToken.name).to.equal(tokenName);
      expect(assetToken.symbol).to.equal(tokenSymbol);
      expect(assetToken.supply).to.equal(initialSupply);
    });

    it("Should return correct token address", async function () {
      const tx = await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      const receipt = await tx.wait();
      
      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      const returnedAddress = parsedEvent.args.tokenAddress;
      
      const assetToken = await factory.assetTokens(assetId);
      expect(returnedAddress).to.equal(assetToken.tokenAddress);
    });

    it("Should create valid CustomERC20 token", async function () {
      const tx = await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      const receipt = await tx.wait();
      
      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      const tokenAddress = parsedEvent.args.tokenAddress;
      
      const token = CustomERC20.attach(tokenAddress);
      expect(await token.name()).to.equal(tokenName);
      expect(await token.symbol()).to.equal(tokenSymbol);
      expect(await token.totalSupply()).to.equal(initialSupply);
      expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
    });
  });

  describe("Duplicate Asset ID", function () {
    it("Should fail when creating token for existing asset ID", async function () {
      await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);

      await expect(
        factory.createTokenForAsset(assetId, "Another Token", "ATK2", initialSupply)
      ).to.be.revertedWith("Token already exists for this asset");
    });
  });

  describe("Multiple Assets", function () {
    it("Should create tokens for different asset IDs", async function () {
      const assetId2 = 2;
      const tokenName2 = "Asset Token 2";
      const tokenSymbol2 = "ATK2";

      await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      await factory.createTokenForAsset(assetId2, tokenName2, tokenSymbol2, initialSupply);

      const assetToken1 = await factory.assetTokens(assetId);
      const assetToken2 = await factory.assetTokens(assetId2);

      expect(assetToken1.tokenAddress).to.not.equal(assetToken2.tokenAddress);
      expect(assetToken1.name).to.equal(tokenName);
      expect(assetToken2.name).to.equal(tokenName2);
    });
  });

  describe("Events", function () {
    it("Should emit TokenCreated event", async function () {
      await expect(factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply))
        .to.emit(factory, "TokenCreated");
    });

    it("Should emit TokenCreated event with correct arguments", async function () {
      const tx = await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      const receipt = await tx.wait();

      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });

      expect(tokenCreatedEvent).to.not.be.undefined;
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      expect(parsedEvent.args.name).to.equal(tokenName);
      expect(parsedEvent.args.symbol).to.equal(tokenSymbol);
      expect(parsedEvent.args.supply).to.equal(initialSupply);
      expect(parsedEvent.args.assetId).to.equal(assetId);
    });
  });

  describe("Token Ownership", function () {
    it("Should set msg.sender as token owner", async function () {
      const tx = await factory.createTokenForAsset(assetId, tokenName, tokenSymbol, initialSupply);
      const receipt = await tx.wait();
      
      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      const tokenAddress = parsedEvent.args.tokenAddress;
      
      const token = CustomERC20.attach(tokenAddress);
      expect(await token.balanceOf(owner.address)).to.equal(initialSupply);
    });

    it("Should allow different callers to create tokens", async function () {
      const tx = await factory.connect(addr1).createTokenForAsset(
        assetId, 
        tokenName, 
        tokenSymbol, 
        initialSupply
      );
      const receipt = await tx.wait();
      
      const tokenCreatedEvent = receipt.logs.find(log => {
        try {
          const parsed = factory.interface.parseLog(log);
          return parsed.name === "TokenCreated";
        } catch {
          return false;
        }
      });
      
      const parsedEvent = factory.interface.parseLog(tokenCreatedEvent);
      const tokenAddress = parsedEvent.args.tokenAddress;
      
      const token = CustomERC20.attach(tokenAddress);
      expect(await token.balanceOf(addr1.address)).to.equal(initialSupply);
    });
  });
}); 