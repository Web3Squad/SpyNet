const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Net Token", function () {
  let Net;
  let net;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const initialSupply = ethers.parseEther("1000000"); 

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    Net = await ethers.getContractFactory("Net");
    net = await Net.deploy(initialSupply);
  });

  describe("Deploy", function () {
    it("Should have correct name", async function () {
      expect(await net.name()).to.equal("Net");
    });

    it("Should have correct symbol", async function () {
      expect(await net.symbol()).to.equal("NET");
    });

    it("Should have correct initial supply", async function () {
      expect(await net.totalSupply()).to.equal(initialSupply);
    });

    it("Should have initial supply in owner", async function () {
      expect(await net.balanceOf(owner.address)).to.equal(initialSupply);
    });
  });

  describe("Transfers", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await net.transfer(addr1.address, transferAmount);
      
      expect(await net.balanceOf(addr1.address)).to.equal(transferAmount);
      expect(await net.balanceOf(owner.address)).to.equal(initialSupply - transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await expect(
        net.connect(addr1).transfer(addr2.address, transferAmount)
      ).to.be.revertedWithCustomError(net, "ERC20InsufficientBalance");
    });

    it("Should allow transfer of 0 tokens", async function () {
      await expect(net.transfer(addr1.address, 0)).to.not.be.reverted;
    });
  });

  describe("Permissions", function () {
    it("Should allow owner to transfer tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      await expect(net.transfer(addr1.address, transferAmount)).to.not.be.reverted;
    });

    it("Should allow any account with tokens to transfer", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await net.transfer(addr1.address, transferAmount);
      
      await expect(net.connect(addr1).transfer(addr2.address, transferAmount)).to.not.be.reverted;
    });
  });

  describe("Events", function () {
    it("Should emit Transfer event when transferring tokens", async function () {
      const transferAmount = ethers.parseEther("100");
      
      await expect(net.transfer(addr1.address, transferAmount))
        .to.emit(net, "Transfer")
        .withArgs(owner.address, addr1.address, transferAmount);
    });
  });

  describe("Decimals", function () {
    it("Should have 18 decimals", async function () {
      expect(await net.decimals()).to.equal(18);
    });
  });
}); 