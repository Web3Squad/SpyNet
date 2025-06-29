const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CustomERC20 Token", function () {
  let CustomERC20;
  let customERC20;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const tokenName = "Custom Token";
  const tokenSymbol = "CTK";
  const initialSupply = ethers.parseEther("1000000");

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    CustomERC20 = await ethers.getContractFactory("CustomERC20");
    customERC20 = await CustomERC20.deploy(tokenName, tokenSymbol, initialSupply, owner.address);
  });

  describe("Deploy", function () {
    it("Should have correct name", async function () {
      expect(await customERC20.name()).to.equal(tokenName);
    });

    it("Should have correct symbol", async function () {
      expect(await customERC20.symbol()).to.equal(tokenSymbol);
    });

    it("Should have correct initial supply", async function () {
      expect(await customERC20.totalSupply()).to.equal(initialSupply);
    });

    it("Should have initial supply in owner", async function () {
      expect(await customERC20.balanceOf(owner.address)).to.equal(initialSupply);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await customERC20.transfer(addr1.address, transferAmount);
      
      expect(await customERC20.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await customERC20.balanceOf(owner.address)).to.equal(initialSupply - transferAmount);
    });

    it("Should fail if sender has insufficient balance", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await expect(
        customERC20.connect(addr1).transfer(addr2.address, transferAmount)
      ).to.be.revertedWithCustomError(customERC20, "ERC20InsufficientBalance");
    });

    it("Should allow transfer of 0 tokens", async function () {
      await expect(customERC20.transfer(addr1.address, 0)).to.not.be.reverted;
    });
  });

  describe("Permissions", function () {
    it("Should allow owner to transfer tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      await expect(customERC20.transfer(addr1.address, transferAmount)).to.not.be.reverted;
    });

    it("Should allow any account with tokens to transfer", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await customERC20.transfer(addr1.address, transferAmount);
      
      await expect(customERC20.connect(addr1).transfer(addr2.address, transferAmount)).to.not.be.reverted;
    });
  });

  describe("Events", function () {
    it("Should emit Transfer event when transferring tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await expect(customERC20.transfer(addr1.address, transferAmount))
        .to.emit(customERC20, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });
  });

  describe("Decimals", function () {
    it("Should have 18 decimals", async function () {
      expect(await customERC20.decimals()).to.equal(18);
    });
  });

  describe("Constructor Parameters", function () {
    it("Should deploy with custom name and symbol", async function () {
      const customName = "My Token";
      const customSymbol = "MTK";
      const customSupply = ethers.parseEther("500000");
      
      const newToken = await CustomERC20.deploy(customName, customSymbol, customSupply, addr1.address);
      
      expect(await newToken.name()).to.equal(customName);
      expect(await newToken.symbol()).to.equal(customSymbol);
      expect(await newToken.totalSupply()).to.equal(customSupply);
      expect(await newToken.balanceOf(addr1.address)).to.equal(customSupply);
    });
  });
}); 